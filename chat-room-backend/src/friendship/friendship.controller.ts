import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { RequireLogin, UserInfo } from 'custom.decorator';
import { FriendAddDto } from './dto/friend-add.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get('list')
  @RequireLogin()
  async fiendship(@UserInfo('userId') userId: number) {
    return this.friendshipService.getFriendship(userId);
  }

  @Post('add')
  @RequireLogin()
  async add(
    @Body() friendAddDto: FriendAddDto,
    @UserInfo('userId') userId: number,
  ) {
    return this.friendshipService.add(friendAddDto, userId);
  }

  @Get('request_list')
  @RequireLogin()
  async list(@UserInfo('userId') userId: number) {
    return this.friendshipService.list(userId);
  }

  @Get('agree/:id')
  @RequireLogin()
  async agree(
    @Param('id') friendId: number,
    @UserInfo('userId') userId: number,
  ) {
    if (!friendId) {
      throw new BadRequestException('请选择好友');
    }
    return this.friendshipService.agree(friendId, userId);
  }

  @Get('reject/:id')
  @RequireLogin()
  async reject(
    @Param('id') friendId: number,
    @UserInfo('userId') userId: number,
  ) {
    if (!friendId) {
      throw new BadRequestException('请选择好友');
    }
    return this.friendshipService.reject(friendId, userId);
  }

  @Get('remove/:id')
  @RequireLogin()
  async remove(
    @Param('id') friendId: number,
    @UserInfo('userId') userId: number,
  ) {
    return this.friendshipService.remove(friendId, userId);
  }
}
