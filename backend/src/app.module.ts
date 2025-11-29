import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/new-recipe-app'),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
