import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule, //Authentication Module
    //RecipesModule, //A custom module created by us, do not load this here as we are using Lazy loading in this module
    //ShoppingListModule, //A custom module created by us,
    SharedModule, //Shared module between all the modules
    CoreModule //Module to hold all the service providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
