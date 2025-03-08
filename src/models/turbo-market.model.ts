import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from './user.model'
import { UserProfile } from './user-profile'

@ObjectType()
export class TurboMarket {
  @Field(() => ID)
  id: string

  @Field()
  userId: string

  @Field(() => UserProfile)
  user: UserProfile

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
