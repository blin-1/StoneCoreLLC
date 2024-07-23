import { Component, OnInit } from '@angular/core';
import { EcbViolation } from '../models/ecb-violation';
import { CustomerService } from '../services/customer.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-ecbviolations',
  templateUrl: './ecbviolations.component.html',
  styleUrls: ['./ecbviolations.component.scss'],
})
export class EcbviolationsComponent implements OnInit {
  ecbViolations: Array<EcbViolation> = [];
  selectedEcbViolations: Array<EcbViolation> = [];
  loading: boolean = false;

  constructor(
    public customerService: CustomerService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loading = true;
    this.customerService.getEcbViolations(history.state.bin).then(
      (success) => {
        this.ecbViolations = success;
        this.loading = false;
      },
      (failure) => console.log(failure)
    );
  }
}
