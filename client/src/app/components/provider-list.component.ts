import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProviderService } from '../services/provider.service';
import { Provider } from '../models/provider';

@Component({
	selector: 'provider-list',
	templateUrl: '../views/provider-list.html',
	providers: [UserService, ProviderService]
})

export class ProviderListComponent implements OnInit{
	public titulo: string;
	public providers: Provider[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public prev_page;
	public confirmed;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _providerService: ProviderService
		){
		this.titulo = 'Proveedores';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('provider-list.component.ts cargado');

		// Conseguir el listado de proveedores
		this.getProviders();
	}

	getProviders(){
		this._route.params.forEach((params: Params) =>{
				let page = +params['page'];
				if(!page){
					page = 1;
				}else{
					this.next_page = page+1;
					this.prev_page = page-1;

					if(this.prev_page == 0){
						this.prev_page = 1;
					}
				}

				this._providerService.getProviders(this.token, page).subscribe(
					response => {
						if(!response.providers){
							this._router.navigate(['/']);
						}else{
							this.providers = response.providers;
						}
					},
					error => {
						var errorMessage = <any>error;

				        if(errorMessage != null){
				          var body = JSON.parse(error._body);
				          //this.alertMessage = body.message;

				          console.log(error);
				        }
					}	
				);
		});
	}

	onDeleteConfirm(id){
		this.confirmed = id;
	}

	onCancelProvider(){
		this.confirmed = null;
	}

	onDeleteProvider(id){
		this._providerService.deleteProvider(this.token, id).subscribe(
			response => {
					
				if (!response.provider) {
					alert('Error en el servidor');
				}
				this.getProviders();
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
	}

}
