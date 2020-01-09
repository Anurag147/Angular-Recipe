import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    authService:AuthService;
    router:Router;
    constructor(authService:AuthService,router:Router){
        this.authService=authService;
        this.router=router;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean | UrlTree>{
        return this.authService.user.pipe(
            take(1),
            map(userData=>{
            let isAuth = !!userData;
            if(isAuth){
                return true;
            }
            else{
                return this.router.createUrlTree(['/auth']);//redirect to auth if user do not exists
            }
        }));
    }

}