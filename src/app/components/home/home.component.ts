import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../Service/auth/login.service';
import { User } from '../../Service/auth/user';
import { PersonalDetailComponent } from "../personal-detail/personal-detail.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PersonalDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userLoginOn:boolean = false;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn
      }
    })

  }
}
