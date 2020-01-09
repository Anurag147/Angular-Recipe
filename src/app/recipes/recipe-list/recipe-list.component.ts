import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  router:Router;
  currentRoute:ActivatedRoute;
  recipeService: RecipeService

  constructor(recipeService: RecipeService,router:Router,currentRoute:ActivatedRoute) {
    this.router=router;
    this.recipeService=recipeService;
    this.currentRoute=currentRoute;
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    });
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.currentRoute});
    //relativeTo:this.currentRoute is used to form correct url which is
    //This route +/new in this case
  }
}
