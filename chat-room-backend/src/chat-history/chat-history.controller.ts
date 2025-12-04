import { Controller, Get } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { Query } from '@nestjs/common';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get('list')
  async list(@Query('chatroomId') chatroomId: string) {
    return this.chatHistoryService.list(+chatroomId);
  }
}
