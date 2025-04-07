import { IsNotEmpty, IsString } from 'class-validator';

export class ExamSaveDto {
  @IsNotEmpty({
    message: '考试ID不能为空',
  })
  id: number;

  @IsString()
  content: string;
}
