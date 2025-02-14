import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TurboMarket {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  year: number;

  @Field()
  mileage: number;

  @Field()
  fuelType: string;

  @Field()
  transmission: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  location: string;
}
