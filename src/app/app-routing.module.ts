import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes:Routes = [
    {
        path:'', 
        redirectTo:'/recipes',
        pathMatch:'full'
    },
    {
        path:'recipes', 
        loadChildren:'./recipes/recipes.module#RecipesModule'
    },
    {
        path:'shopping-list',
        loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'
    }
    //Implement lazy loading in the recipes module
    //When recipes route is hit only then recipes module related files will be downloaded
    //Thus making the whole process efficient 
    //Default redirect to recipes module, pathMatch:'full' is used to allow this route only for the home page without
];

@NgModule({
imports:[RouterModule.forRoot(appRoutes , {preloadingStrategy:PreloadAllModules})], 
//Initialise this route
//preloadingStrategy is used for efficient lazy loading technique

exports:[RouterModule]//Export this to main app module where it can be referenced
})

export class AppRoutingModule{

}