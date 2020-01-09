import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ],
    exports:[AuthComponent]
})
export class AuthModule{

}