import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./commons/filter/http-exception.filter";
import { graphqlUploadExpress } from "graphql-upload";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "http://127.0.0.1:5500",
        // credentials: true, //쿠키를 주고받을 수 있게 해줌
    });
    app.useGlobalPipes(new ValidationPipe()); // 모든 요청에 대해 유효성 검사를 하겠다는 의미, 검증 파이프를 거처야 컨트롤러로 들어감
    app.useGlobalFilters(new HttpExceptionFilter()); //모든 요청에 대해 try catch문으로 예외처리를 하겠다는 의미
    app.use(graphqlUploadExpress());
    await app.listen(3000);
}
bootstrap();
