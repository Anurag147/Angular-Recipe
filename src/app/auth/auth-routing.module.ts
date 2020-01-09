import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";

const childRoutes:Routes = [
    {path:'auth', component: AuthComponent}
];

@NgModule({
    imports:[RouterModule.forChild(childRoutes)], //Initialise this route,
    exports:[RouterModule]//Export this to main app module where it can be referenced
})

export class AuthRoutingModule{

}