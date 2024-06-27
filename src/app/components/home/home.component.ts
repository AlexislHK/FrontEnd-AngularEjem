import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../Service/auth/login.service';
import { User } from '../../Service/auth/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  userLoginOn:boolean = false;
  userData?:User;

  constructor(private loginService:LoginService){}
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn
      }
    })

    this.loginService.currentUserData.subscribe({
      next:(userData) =>{
        this.userData = userData;
      }
    })
  }
}
