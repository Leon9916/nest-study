import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { RegisterUserDto } from './dto/register-user-dto';
import { md5 } from './utils';


@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(RedisService)
  private redisService: RedisService;

  private logger = new Logger();

  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`)
    console.log(captcha, user.captcha);
    
    if(!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST)
    }

    if(user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
    }

    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username: user.username
      }
    })

    if(foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
    }

    try{
      return await this.prismaService.user.create({
        data: {
          username: user.username,
          password: md5(user.password),
          email: user.email
        },
        select: {
          id: true,
          username: true,
          email: true,
          createTime: true
        }
      })
    } catch(e) {
      this.logger.error(e, UserService)
      return null
    }
  }
}
