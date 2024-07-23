import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { BuildingComponent } from './building/building.component';
import { ViolationsComponent } from './violations/violations.component';
import { EcbviolationsComponent } from './ecbviolations/ecbviolations.component';

const routes: Routes = [
  { path: 'main', component: AppMainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'building', component: BuildingComponent },
  { path: 'violations', component: ViolationsComponent },
  { path: 'ecbviolations', component: EcbviolationsComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
