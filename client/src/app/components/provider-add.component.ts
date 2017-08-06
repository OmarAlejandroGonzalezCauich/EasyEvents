import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProviderService } from '../services/provider.service';
import { Provider } from '../models/provider';

@Component({
	selector: 'provider-add',
	templateUrl: '../views/provider-add.html',
	providers: [UserService, ProviderService]
})

export class ProviderAddComponent implements OnInit{
	public titulo: string;
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
		this.titulo = 'Crear nuevo proveedor';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.provider = new Provider('','','','','','','','','','','','');
	}

	ngOnInit(){
		console.log('provider-add.component.ts Cargando');
	}

	onSubmit(){
		console.log(this.provider);
		this._providerService.addProvider(this.token, this.provider).subscribe(
			response => {
				
				if (!response.provider) {
					this.alertMessage='Error en el servidor';
				}else{
					// El objeto que devuelva this. provider se guarda en el objeto de provider
					alert('El proveedor se ha creado correctamente');
					this.provider = response.provider;
					// Redirecciona al formulario para editar
					this._router.navigate(['/edit-provider', response.provider._id]);
				}
			}, 
			error => {
				var errorMessage = <any>error;

                  if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                  }
                }
		);
	}
}