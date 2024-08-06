import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { EmailValidator, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/auth/login.service';
import { LoginRequest } from '../../Service/auth/loginRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private loginService: LoginService
  ){}

  loginError?:string;

  loginForm = this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  hasErrors(controlName: string, errorType: string) {
    return (
      this.loginForm.get(controlName)?.hasError(errorType) &&
      this.loginForm.get(controlName)?.touched
    );
  }

  enviar() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData)=>{
          console.log("si funciona",userData) 
        },
        error:(errorData)=>{
          console.log(errorData)
          this.loginError = errorData
        },
        complete:()=>{
          console.log('El login esta completo.');
          this.router.navigateByUrl('');
          this.loginForm.reset();
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    } 
  }

}
