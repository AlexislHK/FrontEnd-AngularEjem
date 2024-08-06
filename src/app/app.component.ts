import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoginService } from './Service/auth/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FileUploadComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userLoginOn:boolean = false

  constructor(private loginService:LoginService ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn
      }
    })
  }

  logout():void{
    this.loginService.logout();
  }

  
}
