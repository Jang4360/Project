import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
    getHello(): string {
        return '나는 가짜다';
    }
}

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useClass: MockAppService, //AppService 자리에 MockAppService를 사용하겠다.
                },
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('getHello', () => {
        it('이 테스트의 검증 결과는 Hello World! 리턴해야 한다.', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
