import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { ProductModule } from './product/product.module';
import { ProductGenreModule } from './product-genre/product-genre.module';
import { PromotionModule } from './promotion/promotion.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { TelegramModule } from './telegram/telegram.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RecommendationModule } from './recommendation/recommendation.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { DatabaseModule } from './Database/database.module';
import { NewArrivalModule } from './newarrival/newarrival.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'postgres',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'bookstore',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // serve /uploads folder
      serveRoot: '/uploads', // URL path prefix
    }),
    GenreModule,
    ProductModule,
    ProductGenreModule,
    PromotionModule,
    CouponModule,
    OrderModule,
    TelegramModule,
    InvoiceModule,
    NewArrivalModule,
    DatabaseModule,
    RecommendationModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
