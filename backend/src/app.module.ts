import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { ProductModule } from './product/product.module';
import { ProductGenreModule } from './product-genre/product-genre.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewArrivalModule } from './newarrival/newarrival.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    GenreModule,
    ProductModule,
    ProductGenreModule,
    NewArrivalModule,
    DatabaseModule,
    RecommendationModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
