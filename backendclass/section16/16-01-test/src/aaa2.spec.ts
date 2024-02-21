import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appService: AppService;
    let appController: AppController;
    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(appService);
    });
    describe('getHello', () => {
        it('이 테스트의 검증 결과는 Hello World! 리턴해야 한다.', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
    // describe('fetchBoards',()=>{

    // })
    // describe('createBoards',()=>{

    // })
});
