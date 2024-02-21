import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FilesService } from "./files.service";
import { FileUpload, GraphQLUpload } from "graphql-upload";
@Resolver()
export class FilesResolver {
    constructor(
        private readonly filesService: FilesService, //
    ) {}

    @Mutation(() => String)
    uploadFile(
        @Args({ name: "file", type: () => GraphQLUpload }) file: FileUpload, //file이 typescript type과 graphql type이 다를 때
    ): string {
        return this.filesService.upload({ file });
    }
}
