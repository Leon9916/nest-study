import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RedisService } from '@app/redis';
import { userInfo } from 'os';
import { ExamAddDto } from './dto/exam-add.dto';
import { ReuqireLogin, UserInfo } from '@app/common/custom.decorator';
import { ExamSaveDto } from './dto/exam-save.dto';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.examService.getHello() + keys;
  }

  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((total, item) => total + item, 0);
  }

  @Post('add')
  @ReuqireLogin()
  async add(@Body() dto: ExamAddDto, @UserInfo('userId') userId: number) {
    return this.examService.add(dto, userId);
  }

  @Get('list')
  @ReuqireLogin()
  async list(@UserInfo('userId') userId: number, @Query('bin') bin: string) {
    return this.examService.list(userId, bin);
  }

  @Delete('delete/:id')
  @ReuqireLogin()
  async del(@UserInfo('userId') userId: number, @Param('id') id: string) {
    return this.examService.delete(userId, +id);
  }

  @Post('save')
  @ReuqireLogin()
  async save(@Body() dto: ExamSaveDto) {
    return this.examService.save(dto);
  }

  @Get('publish/:id')
  @ReuqireLogin()
  async publish(@UserInfo('userId') userId: number, @Param('id') id: string) {
    return this.examService.publish(userId, +id);
  }
}
