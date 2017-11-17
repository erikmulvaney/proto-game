import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverworldComponent } from './containers/overworld/overworld.component';
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  { path: '', component: OverworldComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
