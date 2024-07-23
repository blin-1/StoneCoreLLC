import { Component, OnInit } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { CustomerService } from '../services/customer.service'
import { Building, PropertyDetails } from '../models/building' 
import { Address } from '../models/address'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  buildings: Array<Building> = []
  selectedBuildings: Array<Building> = []
  loading: boolean = false;
  searchAddress: Address = new Address();
  addressForm : FormGroup = {} as FormGroup

  streetNumber = new FormControl('')
  streetName =  new FormControl('')
  boro = new FormControl('')

  detailForm: FormGroup = {} as FormGroup
  
  BIN = new FormControl ('')
  BISViolation =  new FormControl ('')

  error : string = ''

  constructor(public customerService: CustomerService,  private primengConfig: PrimeNGConfig) { }

buildingDisplay(value : any){

  this.BIN.setValue(value.PropertyDetails.BIN)
  this.BISViolation.setValue(value.PropertyViolation?.BISViolation)
  this.error = value.ErrorDescription
  //console.log(value)

  const currentBuilding : Building = new Building(value.PropertyDetails.BIN)
  currentBuilding.details = value.PropertyDetails
  currentBuilding.address.boro = value.PropertyDetails.Borough
  currentBuilding.address.streetName = value.PropertyDetails.StreetName
  currentBuilding.address.streetNumber = value.PropertyDetails.HouseNo
  currentBuilding.permits = [] 
  currentBuilding.violations = []
  this.customerService.building$.next(currentBuilding)

}

onAdressLookup(event : any){
	
	this.customerService.getAddress(
		{
			streetNumber : this.streetNumber.value,
			streetName : this.streetName.value,
			boro : this.boro.value
		}).then((value)=>this.buildingDisplay(value))
}


  ngOnInit() {
		
	
	this.primengConfig.ripple = true
    this.loading = true

	this.addressForm = new FormGroup({
	    streetNumber : this.streetNumber,
	    streetname : this.streetName,
	    boro : this.boro
  	});

    this.detailForm = new FormGroup({
      BIN : this.BIN,
      BISViolation : this.BISViolation
  	});






 /*     this.customerService.searchBuildings(address).then(
      success => {
                  this.buildings = success 
                  this.loading = false
                },
      failure => console.log(failure)
      ) */

  }
  
  onSearch() { 
	console.log(this.searchAddress)
  }
  
}
