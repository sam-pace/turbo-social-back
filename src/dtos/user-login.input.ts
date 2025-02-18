import { Field, InputType, PartialType } from "@nestjs/graphql";
import { UpdateUserInput } from "./update-user.input";

@InputType()
export class UserLogin {

    @Field()
    username: string

    @Field()
    password: string
}