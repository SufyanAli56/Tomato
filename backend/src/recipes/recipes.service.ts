import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

  create(dto: CreateRecipeDto) {
    const recipe = new this.recipeModel(dto);
    return recipe.save();
  }

  findAll() {
    return this.recipeModel.find().exec();
  }

  findOne(id: string) {
    return this.recipeModel.findById(id).exec();
  }

  update(id: string, dto: UpdateRecipeDto) {
    return this.recipeModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
