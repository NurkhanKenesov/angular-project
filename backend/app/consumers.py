import json
from mailbox import Message
from channels.generic.websocket import AsyncWebsocketConsumer # type: ignore
from channels.db import database_sync_to_async # type: ignore
from django.contrib.auth.models import AnonymousUser
from .models import User, Item

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.item_id = self.scope['url_route']['kwargs']['item_id']
        self.room_group_name = f'chat_{self.item_id}'
        
        if self.scope['user'] == AnonymousUser():
            await self.close()
            return
        
        if not await self.is_participant():
            await self.close()
            return
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        recipient_id = text_data_json['recipient_id']
        
        saved_message = await self.save_message(message, recipient_id)
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': self.scope['user'].username,
                'timestamp': saved_message.timestamp.isoformat(),
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
        }))
    
    @database_sync_to_async
    def is_participant(self):
        item = Item.objects.get(pk=self.item_id)
        return (self.scope['user'] == item.user or 
                self.scope['user'].items.exists())
    
    @database_sync_to_async
    def save_message(self, content, recipient_id):
        item = Item.objects.get(pk=self.item_id)
        recipient = User.objects.get(pk=recipient_id)
        return Message.objects.create(
            sender=self.scope['user'],
            recipient=recipient,
            item=item,
            content=content
        )