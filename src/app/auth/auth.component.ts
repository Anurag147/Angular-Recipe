import { Component, ComponentFactoryResolver } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    isLoginMode:boolean = true;
    isLoading:boolean = false;
    authService:AuthService;
    error:string=null;
    router:Router;
    componentFactoryResolver:ComponentFactoryResolver;

    constructor(authService:AuthService,router:Router, componentFactoryResolver:ComponentFactoryResolver){
        this.authService=authService;
        this.router=router;
        this.componentFactoryResolver=componentFactoryResolver;
    }

    
    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode; //Reverse the value
    }

    onHandleError(){
        this.error=null;
    }

    onSubmit(form:NgForm){

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading=true;//Set the loader to true as submit request has fired
        this.error="";//Reset the error

        //If login mode call Login Api else call Sign up Api
        if(this.isLoginMode){
            this.authService.logIn(email,password).subscribe((resData)=>{
                console.log(resData);//Request sent successfully
                this.isLoading=false;
                this.router.navigate(['/recipes']);
            },(errorData)=>{
                console.log(errorData);
                switch (errorData.error.error.message){//firebase syntax to hold error messages
                    
                    case 'INVALID_PASSWORD':
                        this.error = 'Provided password is incorrect !';
                        break;

                        case 'EMAIL_NOT_FOUND':
                            this.error = 'Provided user is incorrect !';
                            break;

                        default:
                            this.error="An error has occured!";

                }
                this.isLoading=false;
            });//Send http post call to firebase API to log in the user
        }
        else{
            this.authService.signUp(email,password).subscribe((resData)=>{
                console.log(resData);//Request sent successfully
                this.isLoading=false;
                this.router.navigate(['/recipes']);
            },(errorData)=>{
                console.log(errorData);
                switch (errorData.error.error.message){//firebase syntax to hold error messages
                    case 'EMAIL_EXISTS':
                        this.error = 'This email is already registered!';
                        break;
                        default:
                            this.error="An error has occured!";

                }
                this.isLoading=false;
            });//Send http post call to firebase API to sign up the user
        }
        form.reset();
    }

    //Dynamically create an error component in case of any error occurred
    showAlertComponent(message:string){
        const alertComponentFactory = 
        this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    }
}