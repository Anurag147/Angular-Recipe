import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

//Intercoptor is called for every outgoing http request
@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    authService:AuthService;

    constructor(authService:AuthService){
        this.authService=authService;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler){

        //Pipe will take only one user from the behaviour subject
        //Exhaust map is used to chain two observables
        //Here the output of first observable will be passed to second observable and then
        //Second observable will become the main observable

        return this.authService.user.pipe(take(1),exhaustMap(user=>{

            //Return normal request if user is not logged in like sign up page, login page
            if(!user){
                return next.handle(request);
            }

            //Return updated request if user is logged in
            //It automatically sets the auth parameter for all get posts request
            const modifiedRequest=request.clone({
                params:new HttpParams().set('auth',user.token)
            });//Add params to existing request
            return next.handle(modifiedRequest);
        }));
    }

}