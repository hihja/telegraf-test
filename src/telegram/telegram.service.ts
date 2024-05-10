import {Injectable, NotFoundException} from '@nestjs/common';
import axios from 'axios';
import {Context, Telegraf} from "telegraf";

@Injectable()
export class TelegramService {
  readonly botTokens: string[] = [
    "6569767142:AAH-WjRmTbkz3jHntGqRqG6robKKKJL5aqI",
    "5793103786:AAEzzqYgEsO1H3XooWP-szS5cuL1v72lwjM"
  ]

  constructor() {
    this.setupWebhooks();
  }

  async setupWebhooks() {
    for (const token of this.botTokens) {
      const webhookURL = `${process.env.API_URL}/api/webhook/${token}`
      await this.setWebhook(token, webhookURL)
    }
  }

  async setWebhook(token: string, webhookURL: string) {
    try {
      const response = await axios.get(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookURL}`)
      console.log(`Установка вебхука для бота с токеном ${token}:`, response.data)
    } catch (error) {
      console.error(`Ошибка установки вебхука для бота с токеном ${token}:`, error.response.data)
    }
  }

  async handleUpdate(update: any, token: string): Promise<any> {
    if (!this.botTokens.includes(token)) {
      throw new NotFoundException('Бот с этим токеном не найден')
    }

    const bot = new Telegraf<Context>(token)

    bot.command('start', async (ctx) => {
      await this.handleStart(ctx)
    })

    return new Promise((resolve, reject) => {
      bot.handleUpdate(update).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  private async handleStart(ctx: Context) {
    const botInfo = ctx.botInfo;
    if (botInfo) {
      await ctx.reply(`Имя бота: ${botInfo.username}`);
    }
  }
}
