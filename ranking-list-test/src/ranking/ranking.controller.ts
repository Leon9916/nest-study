import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  @Inject(RankingService)
  rankingService: RankingService;

  @Get('join') // 加入
  async join(@Query('name') name: string) {
    await this.rankingService.join(name);
    return 'success';
  }

  @Get('learn') // 增加
  async addLearnTime(@Query('name') name: string, @Query('time') time: string) {
    await this.rankingService.addLearnTime(name, parseFloat(time));
    return 'success';
  }

  @Get('monthRanking') // 月榜
  async getMounthRanking() {
    return this.rankingService.getMonthRanking();
  }

  @Get('yearRanking') // 年榜
  async getYearRanking() {
    return this.rankingService.getYearRanking();
  }

  @Get('selfRanking')
  async getSelfRanking(@Query('name') name: string) {
    return this.rankingService.getSelfRank(name);
  }
}
