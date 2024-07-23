import { Component, OnInit } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { CustomerService } from '../services/customer.service'
import { Permit } from '../models/permit'

@Component({
  selector: 'app-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.scss']
})
export class PermitsComponent implements OnInit {

  permits: Array<Permit> = []
  selectedPermits: Array<Permit> = []
  loading: boolean = false;
  constructor(public customerService: CustomerService,  private primengConfig: PrimeNGConfig) { }

  ngOnInit() {

    this.primengConfig.ripple = true
    this.loading = true
    this.customerService.getPermits(history.state.bin).then(
      success => {
                  this.permits = success 
                  this.loading = false
                },
      failure => console.log(failure)
      )

  }

}
