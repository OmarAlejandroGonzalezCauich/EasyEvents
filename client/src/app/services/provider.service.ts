import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Provider } from '../models/Provider';

@Injectable()
export class ProviderService{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	getProviders(token, page){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'providers/'+page, options)
						 .map(res => res.json());
	}

	getProvider(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'provider/'+id, options)
						 .map(res => res.json());
	}

	addProvider(token, provider: Provider){
		let params = JSON.stringify(provider);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'provider', params, {headers: headers})
						 .map(res => res.json());
	}
	
	editProvider(token, id:string, provider: Provider){
		let params = JSON.stringify(provider);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'provider/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteProvider(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'provider/'+id, options)
						 .map(res => res.json());
	}

}