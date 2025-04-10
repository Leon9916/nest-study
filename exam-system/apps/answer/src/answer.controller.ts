import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ReuqireLogin, UserInfo } from '@app/common/custom.decorator';
import { AnswerAddDto } from './dto/answer-add.dto';
import { ExcelService } from '@app/excel';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Inject('EXAM_SERVICE')
  private examClient: ClientProxy;

  @Inject(ExcelService)
  excelService: ExcelService;

  @Get()
  async getHello() {
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]));
    return this.answerService.getHello() + ' ' + value;
  }

  @Post('add')
  @ReuqireLogin()
  async add(@Body() addDto: AnswerAddDto, @UserInfo('userId') userId: number) {
    return this.answerService.add(addDto, userId);
  }

  @Get('list')
  @ReuqireLogin()
  async list(@Query('examId') examId: string) {
    if (!examId) {
      throw new BadRequestException('examid 不能为空');
    }
    return this.answerService.list(+examId);
  }

  @Get('find/:id')
  @ReuqireLogin()
  async find(@Param('id') id: string) {
    return this.answerService.find(+id);
  }

  @Get('export')
  async export(@Query('examId') examId: string) {
    if (!examId) {
      throw new BadRequestException('examID 不能为空');
    }
    const data = await this.answerService.list(+examId);
    const columns = [
      { header: 'ID', key: 'id', width: 20 },
      { header: '分数', key: 'score', width: 30 },
      { header: '答题人', key: 'answerer', width: 30 },
      { header: '试卷', key: 'exam', width: 30 },
      { header: '创建时间', key: 'createTime', width: 30 },
    ];
    const res = data.map((item) => {
      return {
        id: item.id,
        score: item.score,
        answerer: item.answerer.username,
        exam: item.exam.name,
        createTime: item.createTime,
      };
    });
    return this.excelService.export(columns, res, 'answers.xlsx');
  }
}
