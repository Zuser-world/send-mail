import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SendMailComponent } from '../send-mail/send-mail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'send-mail', component: SendMailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
