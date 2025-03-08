import { InputType, PartialType, Field, ID } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string
}
