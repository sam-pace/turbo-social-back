import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateTurboMarketInput {
  @Field()
  userId: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  price: string

  @Field()
  brand: string

  @Field()
  model: string

  @Field()
  year: string

  @Field()
  mileage: string

  @Field()
  fuelType: string

  @Field()
  transmission: string

  @Field({ nullable: true })
  imageUrl?: string

  @Field()
  location: string
}
