import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from '@services/user.service'
import { User } from '@models/user.model'
import { CreateUserInput } from '@dtos/create-user.input'
import { UpdateUserInput } from 'src/dtos/update-user.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll()
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data)
  }

  @Mutation(() => [User])
  async registerMany(
    @Args('data', { type: () => [CreateUserInput] }) data: CreateUserInput[]
  ) {
    return this.userService.registerMany(data)
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id)
  }
}
