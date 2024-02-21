import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";

interface IFileServiceUpload {
    files: FileUpload[];
}

@Injectable()
export class FilesService {
    async upload({ files }: IFileServiceUpload): Promise<string[]> {
        console.log(files);

        const waitedFiles = [];
        waitedFiles[0] = await files[0];
        waitedFiles[1] = await files[1];

        //1. 파일을 클라우드 스토리지에 저장하는 로직
        //1-1) 스토리지 세팅하기
        const storage = new Storage({
            projectId: "backend-414706",
            keyFilename: "gcp-file-storage.json", //권한
        }).bucket("backend-class-storage"); // 스토리지 폴더(버핏)세팅

        //1-2) 스토리지에 파일 업로드하기
        console.time("파일업로드시간");
        const results = [];
        for (let i = 0; i < waitedFiles.length; i++) {
            results[i] = await new Promise((resolve, reject) => {
                waitedFiles[i]
                    .createReadStream()
                    .pipe(
                        storage
                            .file(waitedFiles[i].filename)
                            .createWriteStream(),
                    )
                    .on("finish", () => resolve("성공"))
                    .on("error", () => reject("실패"));
            });
        }
        console.timeEnd("파일업로드시간");
        console.log("파일 업로드 완료!");
        return ["끝", "끝2"];
    }
}
