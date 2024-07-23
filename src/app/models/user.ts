import { Building } from './building'

export class User {

	get hasRegistered () : boolean {return (this.isACustomer? true: false)}
	get isSignedIn()  {return this.email !== ' '} 
	isACustomer = 0 
	email		= ' '
	license		= ' '
	businessName= ' '
	firstName	= 'Not Logged In' // Unpaid so far
	lastName	= ' ' 
	favs		: Array<Building> = []

}
