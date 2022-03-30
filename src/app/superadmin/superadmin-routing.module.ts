import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard/auth.guard';
import { HardwaresComponent } from './hardwares/hardwares.component';
import { HomeComponent } from './home/home.component';
import { OrgsComponent } from './orgs/orgs.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard], children: [
      { path: 'orgs', component: OrgsComponent, pathMatch: 'full'},
      { path: 'hardwares', component: HardwaresComponent, pathMatch: 'full'},
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
