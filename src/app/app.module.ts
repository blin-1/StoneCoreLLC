import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from './register/register.component';

import { AppMainComponent } from './app-main/app-main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { AccordionModule } from 'primeng/accordion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { SearchComponent } from './search/search.component';
import { BuildingComponent } from './building/building.component';
import { ViolationsComponent } from './violations/violations.component';
import { PermitsComponent } from './permits/permits.component';
import { MenuComponent } from './menu/menu.component';
import { EcbviolationsComponent } from './ecbviolations/ecbviolations.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    SearchComponent,
    BuildingComponent,
    ViolationsComponent,
    PermitsComponent,
    EcbviolationsComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    MegaMenuModule,
    AccordionModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
