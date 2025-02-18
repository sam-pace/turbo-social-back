import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from '@controllers/app.controller';
import { AppService } from '@services/app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user.module';
import { UserResolver } from 'src/resolvers/user.resolver';
import { TurboMarketResolver } from 'src/resolvers/turbo-market.resolver';
import { TurboMarketModule } from './turbo-market.module';
import { CommentResolver } from 'src/resolvers/comment.resolver';
import { PostResolver } from 'src/resolvers/post.resolver';
import { CommentModule } from './comment.module';
import { PostModule } from './post.module';
import { LoggingInterceptor } from 'lib/logInterceptor';
import { AuthResolver } from '@resolvers/auth.resolver';
import { authModule } from './auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/config/schema.gql'),
      playground: true,
      sortSchema: true,
    }),
    UserModule,
    TurboMarketModule,
    PostModule,
    CommentModule,
    authModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    TurboMarketResolver,
    CommentResolver,
    PostResolver,
    AuthResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
