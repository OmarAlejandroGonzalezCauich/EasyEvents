import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProviderService } from '../services/provider.service';
import { Provider } from '../models/provider';

@Component({
	selector: 'provider-detail',
	templateUrl: '../views/provider-detail.html',
	providers: [UserService, ProviderService]
})

export class ProviderDetailComponent implements OnInit{
	public provider: Provider;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _providerService: ProviderService
	){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('provider-edit.component.ts Cargando');
		//llamar al metodo del api para sacar un proveedor en base a su id 
		this.getProvider();
	}

	getProvider(){
		//recoger los parametros que vengan por la url
		this._route.params.forEach((params: Params) => {
			// recoger la id que llega por la url 
			let id = params['id'];
			// hacer una peticion
			this._providerService.getProvider(this.token, id).subscribe(
				response => {
					
					if (!response.provider) {
						this._router.navigate(['/']);
					}else{
						this.provider = response.provider;

						// Sacar los eventos 
					}
				}, 
				error => {
					var errorMessage = <any>error;
					if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                  }
				}
				);
		});
	}
}