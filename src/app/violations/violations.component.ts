import { Component, OnInit} from '@angular/core'
import { CustomerService } from '../services/customer.service';
import { Violation } from '../models/violation'
import { PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-violations',
  templateUrl: './violations.component.html',
  styleUrls: ['./violations.component.scss']
})
export class ViolationsComponent implements OnInit {

  violations: Array<Violation> = []
  selectedViolations: Array<Violation> = []
  loading: boolean = false;

  constructor(public customerService: CustomerService,  private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    
    this.primengConfig.ripple = true
    this.loading = true
    this.customerService.getViolations(history.state.bin).then(
      success => {
                  this.violations = success 
                  this.loading = false
                },
      failure => console.log(failure)
      )

  }

}
