import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu
import { CustomerService } from '../services/customer.service'
import { User } from '../models/user'
import { Building } from '../models/building'
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gfg : MegaMenuItem[] = []

  gfgTemplate: MegaMenuItem[] = [
      {
        label: 'About',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: ['/main']
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/register']
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-building',
        routerLink: ['/search']
      }
  ]

  constructor (private customerService : CustomerService ) {}

  private buildingChanged (building : Building ) : void {
    this.gfg.push(
      {
        label: building.address.streetNumber + ' ' + building.address.streetName + ', ' + building.address.boro,
        icon: 'pi pi-fw pi-building',
        routerLink: ['/building'],
        state : { bin : building.BIN }
      }
    )
  }

  private userLoaded(user : User) {

    this.gfg = []
    for (const building of this.gfgTemplate) {
      this.gfg.push(building)
    }
    for (const building of user.favs){
      this.gfg.push(
        {
          label: building.address.streetNumber + ' ' + building.address.streetName + ', ' + building.address.boro,
          icon: 'pi pi-fw pi-building',
          routerLink: ['/building'],
          state : { bin : building.BIN }
        }
      )
    }

  }

  ngOnInit() {

    this.customerService.user$.subscribe((user: User)=>{this.userLoaded(user)})
    this.customerService.building$.subscribe((building: Building) => this.buildingChanged(building))
    this.gfg = this.gfgTemplate

  }
}

