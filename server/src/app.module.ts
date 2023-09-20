import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EpubsModule } from './epubs/epubs.module';
import { UrlRewriteMiddleware } from './middleware/url-rewite.middleware';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/public',
  }),EpubsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UrlRewriteMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
