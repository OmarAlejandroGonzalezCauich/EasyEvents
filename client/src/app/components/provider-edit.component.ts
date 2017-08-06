import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { ProviderService } from '../services/provider.service';
import { Provider } from '../models/provider';

@Component({
	selector: 'provider-edit',
	templateUrl: '../views/provider-add.html',
	providers: [UserService, ProviderService, UploadService]
})

export class ProviderEditComponent implements OnInit{
	public titulo: string;
	public provider: Provider;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit = true;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _providerService: ProviderService,
		private _uploadService: UploadService
	){
		this.titulo = 'Editar proveedor';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.provider = new Provider('','','','','','','','','','','','');
		this.is_edit= true;
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

	onSubmit(){
		console.log(this.provider);

		this._route.params.forEach((params: Params) => {
			// recoger la id que llega por la url 
			let id = params['id'];

		this._providerService.editProvider(this.token, id, this.provider).subscribe(
			response => {
				
				if (!response.provider) {
					this.alertMessage='Err1or en el servidor';
				}else{
					// El objeto que devuelva this. provider se guarda en el objeto de provider
					this.alertMessage='El proveedor se ha actualizado correctamente';
					
					// Subir la imagen del proveedor 

					this._uploadService.makeFileRequest(this.url+'upload-image-provider/'+id, [], this.filesToUpload, this.token, 'image')
					.then(
						(result) => {
							this._router.navigate(['/providers', 1]);
						}, 
						(error) => {
							console.log(error);
						}
						);
					//this.provider = response.provider;
					// Redirecciona al formulario para editar
					//this._router.navigate(['/edit-provider', response.provider._id]);
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
	});
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}