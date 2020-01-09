import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import {tap} from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{

    http:HttpClient;
    recipesService:RecipeService;
    authService:AuthService;

    constructor(http:HttpClient,recipesService:RecipeService,authService:AuthService){
        this.http=http;
        this.recipesService=recipesService;
        this.authService=authService;
    }

    storeRecipes(){
        const recipes= this.recipesService.getRecipes();
        this.http.put('https://ng-recipe-book-c8828.firebaseio.com/recipes.json',recipes)
        .subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>
        ('https://ng-recipe-book-c8828.firebaseio.com/recipes.json')
        .pipe(tap(recipes=>{
            this.recipesService.setRecipes(recipes);//After recipes are recieved set recipes object
        }));
    }
    }
