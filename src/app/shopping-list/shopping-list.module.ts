import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../auth/auth.module";

@NgModule({

    declarations:[    
        ShoppingListComponent,
        ShoppingEditComponent,
    ],

    imports:[ 
        SharedModule,
        FormsModule,
        ShoppingListRoutingModule
    ],

    exports:[
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingListModule{

}