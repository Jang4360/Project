import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FilesService } from "./files.service";
import { FileUpload, GraphQLUpload } from "graphql-upload";
@Resolver()
export class FilesResolver {
    constructor(
        private readonly filesService: FilesService, //
    ) {}

    @Mutation(() => [String])
    uploadFile(
        @Args({ name: "files", type: () => [GraphQLUpload] })
        files: FileUpload[], //file이 typescript type과 graphql type이 다를 때
    ): Promise<string[]> {
        return this.filesService.upload({ files });
    }
}
