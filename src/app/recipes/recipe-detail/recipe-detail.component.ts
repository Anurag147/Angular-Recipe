import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  currentRoute:ActivatedRoute;
  recipeId:number;
  recipeService: RecipeService;
  router:Router;

  constructor(recipeService: RecipeService,currentRoute:ActivatedRoute,router:Router) {
    this.currentRoute=currentRoute;
    this.recipeService=recipeService;
    this.router=router;
   }

  ngOnInit() {
    this.currentRoute.params.subscribe((params:Params)=>{
      this.recipeId=+params['id'];
      this.recipe=this.recipeService.getRecipe(this.recipeId);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.currentRoute});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

}
