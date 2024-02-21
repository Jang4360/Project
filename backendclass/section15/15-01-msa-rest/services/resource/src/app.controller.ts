import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}
  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoard() {
    //데이터 조회하기
    return '게시글 보내주기';
  }
}
