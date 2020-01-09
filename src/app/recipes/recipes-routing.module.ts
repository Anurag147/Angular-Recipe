import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "./recipes-resolver.service";

const routes:Routes = [
    {path:'', component: RecipesComponent,canActivate:[AuthGuard], children:[
        {path:'', component: RecipeStartComponent},
        {path:'new', component: RecipeEditComponent},//New recipe,
        {path:':id', component: RecipeDetailComponent,resolve:[RecipeResolverService]},//RecipeResolverService will run before the route loads
        {path:':id/edit', component: RecipeEditComponent}//Edit existing recipe
    ]},
];

@NgModule({
    imports:[RouterModule.forChild(routes)],//Set up routes only for this module
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}

