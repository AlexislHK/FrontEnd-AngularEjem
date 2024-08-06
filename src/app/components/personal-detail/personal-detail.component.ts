import { Component, OnInit } from '@angular/core';
import { User } from '../../Service/auth/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent implements OnInit{

  errorMenssage:string=''
  user?:User= localStorage.getItem('user') as User;

  constructor(private userService:UserService, private _route:ActivatedRoute){
  }

  
  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params:Params) => {
        this.userService.getUser().subscribe({
          next:(data:User | null) => {
            console.log(data)
            localStorage.setItem('user',JSON.stringify(data));
          },
          error: (error:any)=>{
            this.errorMenssage = error;
          }
        })
      }, 
      error:(error:any)=>{
        this.errorMenssage = error;
      }
    });

    // this.userService.getUser().subscribe({
    //   next: (userData) => {
    //     console.log(userData)
    //     this.user = userData
    //   },
    //   error: (errorData) => {
    //     this.errorMenssage = errorData
    //   },
    //   complete:() => {
    //     console.info("User Data OK");
    //   }
    // })
    
  }

}
