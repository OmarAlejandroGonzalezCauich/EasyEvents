export class Event{
	constructor(
			public _id: string,
			public date: Date,
			public method_payment: string,
			public time_lapse: string,
			public quantity: number, 
			public extras: string,
			public description: string,
			public discount: string,
			public client: string
		){}
}