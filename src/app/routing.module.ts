import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { OrderListComponent } from './order-list/order-list.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard'

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'orderList', 
  component: OrderListComponent, 
  canActivate: [AuthGuard],
  data: {}
}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
