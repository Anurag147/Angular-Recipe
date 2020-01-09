import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";

const routes:Routes = [
    {path:'', component: ShoppingListComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],//Set up routes only for this module
    exports:[RouterModule]
})
export class ShoppingListRoutingModule{

}