import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";

interface IFileServiceUpload {
    file: FileUpload;
}

@Injectable()
export class FilesService {
    async upload({ file }: IFileServiceUpload): Promise<string> {
        console.log(file);
        //1. 파일을 클라우드 스토리지에 저장하는 로직
        //1-1) 스토리지 세팅하기
        const storage = new Storage({
            projectId: "backend-414706",
            keyFilename: "gcp-file-storage.json", //권한
        }).bucket("backend-class-storage"); // 스토리지 폴더(버핏)세팅
        //1-2) 스토리지에 파일 업로드하기
        await new Promise((resolve, reject) => {
            file.createReadStream()
                .pipe(
                    //파일이 파이프로 들어오면 스토리지에 저장
                    storage.file(file.filename).createWriteStream(),
                )
                .on("finish", () => {
                    console.log("성공");
                    resolve("성공");
                })
                .on("error", () => {
                    console.log("실패");
                    reject("실패");
                });
        });

        console.log("파일 업로드 완료!");
        return "끝";
    }
}
