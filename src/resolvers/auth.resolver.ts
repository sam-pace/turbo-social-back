import { LoginResponse } from '@dtos/login-response';
import { UserLogin } from '@dtos/user-login.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('userLogin') userLogin: UserLogin): Promise<LoginResponse> {
    return this.authService.login(userLogin);
  }

  @Mutation(() => String)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
