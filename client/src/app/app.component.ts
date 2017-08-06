import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from './models/user';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Easy Event';
  public user: User; 
  public user_register: User; 
  public identity; 
  public token;
  public errorMessage;
  public alertRegister;
  public alertRegisterEmail;
  public url:string;

  constructor(
  	
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService

  	){
  	this.user = new User("","","","","","","","","","","","");
    this.user_register = new User("","","","","","","","","","","","");
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit(){
  	console.log(this.user);

    //Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response);
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        }else{
          // Crear elemento en el locastorage al usuario de sesion 
          localStorage.setItem('identity', JSON.stringify(identity));
          // conseguir el token para enviarselo a cada peticion http
                    this._userService.signup(this.user, 'true').subscribe(
                response => {
                  console.log(response);
                  let token = response.token;
                  this.token = token;

                  if (this.token.length <= 0) {
                    alert("El token no se ha generado");
                  }else{
                    // Crear elemento en el local storage para tener un token disponible
                    localStorage.setItem('token', token);
                    console.log(token);
                    console.log(identity);
                    this.user = new User("","","","","","","","","","","","");
                  }
                },
                error => {
                  var errorMessage = <any>error;

                  if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                    console.log(error);
                  }
                }
                );
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
      );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if (!user._id) {
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+this.user_register.email;
          this.user_register = new User("","","","","","","","","","","","");
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
      );
  }

}
