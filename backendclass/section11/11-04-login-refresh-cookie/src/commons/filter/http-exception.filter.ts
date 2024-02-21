import { Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException) //HttpException이 발생하면 나 실행시켜줘야 돼
export class HttpExceptionFilter implements ExceptionFilter {
    // ExceptionFilter는 nestjs에서 제공하는 exception filter type
    catch(exception: HttpException) {
        const status = exception.getStatus();
        const message = exception.message;

        console.log("예외가 발생했습니다.");
        console.log("예외내용: ", message);
        console.log("예외코드: ", status);
    }
}
