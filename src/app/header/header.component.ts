import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  dataService:DataStorageService;
  authService:AuthService;
  userSubscription:Subscription;
  isAuthenticated:boolean = false;

  constructor(dataService:DataStorageService, authService:AuthService){
    this.dataService=dataService;
    this.authService=authService;
  }

  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe((user)=>{
      this.isAuthenticated = !user ? false : true; //If user is valid set this value to true
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onLogOut(){
    this.authService.logOut();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }
}
