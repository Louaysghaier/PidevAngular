import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginforgetpasswordComponent } from './pages/loginforgetpassword/loginforgetpassword.component';
import { VerificationComponent } from './pages/verification/verification.component';

const routes: Routes = [
  {
    path:'signup',
    component : SignupComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component : LoginComponent,
    
  },
  { path: 'forgetpassword', component: LoginforgetpasswordComponent},
  { path: 'verification', component: VerificationComponent},
  {
    path:"admin",
    component : AllTemplateBackComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component : UserDashboardComponent,
    pathMatch:'full',
    canActivate: [NormalGuard],
  },
  {path:"",
  component: AllTemplateFrontComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
