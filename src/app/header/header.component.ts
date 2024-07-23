import { Component, OnInit } from '@angular/core'
import { CustomerService } from '../services/customer.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public customerService : CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.customerService.signIn()

  }

}
