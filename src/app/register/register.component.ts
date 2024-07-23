import { Component, OnInit } from '@angular/core'
import { CustomerService } from '../services/customer.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _customerService: CustomerService) { }

  get customerService() { return this._customerService }
  get header(): string {

    let value: string
    switch (true) {

      case (!this.customerService.user.isSignedIn): value = 'Please sign in with Google to get access to some features'; break
      case (!this.customerService.user.hasRegistered): value = 'Please register to get access to all features'; break
      default: value = 'Welcome'

    }

    return value

  }

  ngOnInit(): void {
  }

  register() { this.customerService.user.isACustomer = 1 }



}
