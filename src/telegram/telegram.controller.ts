import {Body, Controller, Param, Post} from '@nestjs/common';
import {TelegramService} from './telegram.service';

@Controller('webhook')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post(':token')
  async handleWebhook(@Body() update: any, @Param('token') token: string) {
    try {
      const res = await this.telegramService.handleUpdate(update, token)
      console.log(update)
      return res
    } catch (error) {
      console.error('Ошибка:', error)
      throw error
    }
  }
}
