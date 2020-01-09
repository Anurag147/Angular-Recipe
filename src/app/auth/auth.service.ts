import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import {environment} from '../../environments/environment'

interface AuthResponseData{
    idToken:string;	
    email:string;
    refreshToken:string;	
    expiresIn:number;	
    localId:string;
    registered?:boolean;//Optional as this is valid only for login and not for sign up
}

@Injectable()
export class AuthService{
    http:HttpClient;
    router:Router;
    private tokenExpirationTimer:any;
    
    user = new BehaviorSubject<User>(null);
    //Define a new user, inform clients if user is changed also let client access current user state

    constructor(http:HttpClient,router:Router){
        this.http=http;
        this.router=router;
    }

    //Logic to send a sign up request to firebase sign up user API will return data in form of AuthResponseData
    signUp(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken: true
        })
        //tap is used to set some data after the response is successfully recieved
        .pipe(tap(resData=>{
            const expirationDate=new Date(new Date().getTime() + resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
            this.user.next(user);
            this.autoLogOut(resData.expiresIn * 1000);
            localStorage.setItem('userData',JSON.stringify(user));//Set user to local storage
        }));
    }

    logIn(email:string,password:string){
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken: true
        })
        //tap is used to set some data after the response is successfully recieved
        .pipe(tap(resData=>{
            const expirationDate=new Date(new Date().getTime() + resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
            this.user.next(user);
            this.autoLogOut(resData.expiresIn * 1000);
            localStorage.setItem('userData',JSON.stringify(user));//Set user to local storage
        }));
    }

    autoLogIn(){

        let loadedUser:User=null;

        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }  =  JSON.parse(localStorage.getItem('userData'));//Retrieve user data from local storage
        
        if(!userData){
            return;
        }
            loadedUser=new User(
                userData.email,
                userData.id, 
                userData._token,
                 new Date(userData._tokenExpirationDate));

                 //If user token is valid
                 if(loadedUser.token){
                     this.user.next(loadedUser);
                     const tokenExpirationDuration =  
                     new Date(userData._tokenExpirationDate).getTime()
                     - new Date().getTime();
                 this.autoLogOut(tokenExpirationDuration);
                 }
    }

    //Automatically logs out the user once token expiration time is reached
    autoLogOut(expirationDuration:number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();//Call logout method once expirationDuration is encountered
        }, expirationDuration);
    }

    logOut(){
        this.user.next(null);//Make user null when logged out
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');//Clear the data from local storage on click of log out
        
        //Clear timeout once logout is clicked
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
}