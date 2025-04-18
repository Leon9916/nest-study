import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RankingService {
  @Inject(RedisService)
  redisService: RedisService;

  private getMonthKey() {
    const dateStr = dayjs().format('YYYY-MM');
    return `learning-ranking-month:${dateStr}`;
  }

  private getYearKey() {
    const dateStr = dayjs().format('YYYY');
    return `learning-ranking-tear:${dateStr}`;
  }

  async join(name: string) {
    await this.redisService.zAdd(this.getMonthKey(), { [name]: 0 });
  }

  async addLearnTime(name: string, time: number) {
    await this.redisService.zIncr(this.getMonthKey(), name, time);
  }

  async getMonthRanking() {
    return this.redisService.zRankingList(this.getMonthKey(), 0, 10);
  }

  async getYearRanking() {
    const dateStr = dayjs().format('YYYY');
    const keys = await this.redisService.keys(
      `learning-ranking-month:${dateStr}-*`,
    );

    return this.redisService.zUnion(this.getYearKey(), keys);
  }

  async getSelfRank(name: string) {
    return this.redisService.zRank(this.getMonthKey(), name);
  }
}
