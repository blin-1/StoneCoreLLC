import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'
import { User } from '../models/user'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Building, PropertyDetails }  from '../models/building'
import { Violation } from '../models/violation'
import { Permit } from '../models/permit'
import { BehaviorSubject } from 'rxjs'
import { Address } from '../models/address'
import { urlencoded } from 'body-parser'
import { EcbViolation } from '../models/ecb-violation'

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  public user : User = new User()
  public building : Building = new Building('')

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user)
  public building$: BehaviorSubject<Building> = new BehaviorSubject<Building>(this.building)

  private auth2: any

  constructor(private http : HttpClient) {

      const self = this
      gapi.load('auth2', function() { // gapi is google API loader
        const signinChanged = async function () {
            if (self.auth2.isSignedIn.get()) {
                const googleUser  = self.auth2.currentUser.get()
                self.user.email = googleUser.getBasicProfile().getEmail()
                self.user.firstName = googleUser.getBasicProfile().getGivenName()
                self.user.lastName = googleUser.getBasicProfile().getFamilyName()
                console.log('Logged in as ' +  self.user.email )

                await self.getUser(self.user.email).then(
                  (response) => {
                                self.user.isACustomer = response[0].isACustomer
	                              self.user.email		=  response[0].email
                                self.user.license		=  response[0].license
                                self.user.businessName=  response[0].businessName
                              },

                  (error) => {console.error(error)}
                )

                await self.getFavorites(self.user.email).then(
                  response => {
                      if (self.user.favs) {
                          for (const building of response){
                             self.user.favs.push(new Building (building.BIN))
                          }
                      }
                  },
                  error => console.log(error)
                )                
    
                await self.getAdresses(self.user.favs).then(
                  response => self.user.favs = response,
                  error => console.log(error)
                )                
                self.user$.next(self.user)


            }else{
                self.signOut()
            }
        }
        self.auth2 = gapi.auth2.init({
          client_id: environment.OATH2_CLIENT_ID,
          scope: 'profile'
        })
        self.auth2.isSignedIn.listen (signinChanged)
      })
 
  }

  async signIn() {

    if (this.auth2) this.auth2.signIn()

 /*    this.user.email = 'y.monsoon@gmail.com'
    this.user.firstName = '*Joker'
 
    let self = this
    await self.getUser(self.user.email).then(
                  (response) => {
                                self.user.isACustomer = response[0].isACustomer
	                              self.user.email		=  response[0].email
                                self.user.license		=  response[0].license
                                self.user.businessName=  response[0].businessName
                              },

                  (error) => {console.error(error)}
                )
    await self.getBuildings(self.user.email).then(
                  response => {
                      if (self.user.favs) {
                          for (const building of response){
                             self.user.favs.push(new Building (building.BIN))
                          }
                      }
                  },
                  error => console.log(error)
                )                
    
    await self.getAdresses(self.user.favs).then(
                  response => self.user.favs = response,
                  error => console.log(error)
                )                

    self.user$.next(self.user)  */
   
  }

  signOut() {
    
    this.auth2.signOut()
    this.user = new User()
    this.user$.next(this.user) 
  
  }

  async getAdresses (buildings : Array<Building>  ): Promise<any> {

    for (const building of buildings) {
          await this.getViolations(building.BIN).then(
          (response : Array<Violation>) => {  building.address.boro = response[0].boro
                                              building.address.streetNumber = response[0].house_number
                                              building.address.streetName = response[0].street
                                          }
        )    
    }
    return Promise.resolve(buildings)
  }

  async getFavorites (email: string): Promise<Array<Building>>{

    return this.http.get('/favs/' + email).toPromise() as Promise<Array<Building>>

  }

  async getUser (email: string): Promise<Array<User>>{

    return this.http.get('/users/' + email).toPromise() as Promise<Array<User>>

  }

  async getViolations(bin: string): Promise<Array<Violation>>{

    const headers = new HttpHeaders()
    const params  = new HttpParams ().set('bin', bin)
    return this.http.get('/violations', { headers: headers,  params: params }).toPromise() as Promise<Array<Violation>>

  }
  
  async getPermits(bin: string): Promise<Array<Permit>>{

    const headers = new HttpHeaders()
    const params  = new HttpParams ().set('bin', bin)
    return this.http.get('/permits', { headers: headers,  params: params }).toPromise() as Promise<Array<Permit>>

  }

  async getEcbViolations(bin: string): Promise<Array<EcbViolation>>{

    const headers = new HttpHeaders()
    const params  = new HttpParams ().set('bin', bin)
    return this.http.get('/ecbViolations', { headers: headers,  params: params }).toPromise() as Promise<Array<EcbViolation>>

  }
  
  getAddress (address : Address) :  Promise<PropertyDetails>{

    return this.http.get(
    'https://a810-dobnow.nyc.gov/Publish/WrapperPP/PublicPortal.svc/getPublicPortalPropertyDetailsGet/'
    + '1%7C' 
    + encodeURIComponent(address.streetNumber) 
    + '%7C'
    + encodeURIComponent(address.streetName) 
    +'%7C'
    + encodeURIComponent(address.boro)).toPromise() as Promise<PropertyDetails>

  }

}