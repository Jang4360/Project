// import { Controller, Get } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}
  @Mutation(() => String)
  fetchBoard() {
    return '게시글 보내기';
  }
}
