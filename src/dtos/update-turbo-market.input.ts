import { InputType, PartialType, Field, ID } from '@nestjs/graphql'
import { CreateTurboMarketInput } from './create-turbo-market.input'

@InputType()
export class UpdateTurboMarketInput extends PartialType(
  CreateTurboMarketInput
) {
  @Field(() => ID)
  id: string
}
