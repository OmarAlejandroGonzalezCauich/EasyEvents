export class User{
	constructor(
			public _id: string,
			public name: string,
			public surname: string,
			public email: string,
			public password: string, 
			public telephone: string, 
			public address: string,
			public city: string,
			public state: string,
			public zip: string,
			public rfc: string,
			public img: string
		){}
}