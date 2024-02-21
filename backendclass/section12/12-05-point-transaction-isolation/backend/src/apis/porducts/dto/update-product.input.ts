import { InputType, PartialType } from "@nestjs/graphql";
import { CreateProductInput } from "./create-product.input";

@InputType()
//graphql에서 CreateProductInput 클래스를 가져와 PartialType으로 감싸서 객체 값들이 필수가 아닌 UpdateProductInput 클래스를 만듦
export class UpdateProductInput extends PartialType(CreateProductInput) {
    //아래 내용들을 상속받음
    // name?: string;
    // description?: string;
    // price?: number;
}

// PickType(CreateProductInput, ["name", "description"]);  => 뽑기
// OmitType(CreateProductInput, ["name"]);                 => 빼기
// PartialType(CreateProductInput);                        => 물음표(필수가 아닌 값으로 만들기)
