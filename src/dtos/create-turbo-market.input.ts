import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTurboMarketInput {
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
  year: string;

  @Field()
  mileage: string;

  @Field()
  fuelType: string;

  @Field()
  transmission: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  location: string;
}
