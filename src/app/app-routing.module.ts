import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { LoginComponent } from './components/login/login.component';
import { WebGlComponent } from './components/workshop/web-gl/web-gl.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: WebGlComponent
  },
  {
    path: 'workshop',
    component: WorkshopComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '3D',
        component: WebGlComponent
      }
    ]
  },
  {
    path: 'login/:workshopId',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
