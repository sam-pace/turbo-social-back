import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TurboMarketService } from 'src/services/turbo-market.service';
import { TurboMarket } from '../models/turbo-market.model';
import { CreateTurboMarketInput } from '../dtos/create-turbo-market.input';
import { UpdateTurboMarketInput } from '../dtos/update-turbo-market.input';

@Resolver(() => TurboMarket)
export class TurboMarketResolver {
  constructor(private readonly turboMarketService: TurboMarketService) {}

  @Mutation(() => TurboMarket)
  createTurboMarket(@Args('data') data: CreateTurboMarketInput) {
    return this.turboMarketService.create(data);
  }

  @Query(() => [TurboMarket], { name: 'turboMarket' })
  findAll() {
    return this.turboMarketService.findAll();
  }

  @Query(() => TurboMarket, { name: 'turboMarket' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.turboMarketService.findOne(id);
  }

  @Mutation(() => TurboMarket)
  updateTurboMarket(
    @Args('updateTurboMarketInput')
    updateTurboMarketInput: UpdateTurboMarketInput,
  ) {
    return this.turboMarketService.update(
      updateTurboMarketInput.id,
      updateTurboMarketInput,
    );
  }

  @Mutation(() => TurboMarket)
  removeTurboMarket(@Args('id', { type: () => String }) id: string) {
    return this.turboMarketService.remove(id);
  }
}
