import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'archivos',component:FileUploadComponent},
    {path:'**',redirectTo:'',pathMatch:'full'}
];
