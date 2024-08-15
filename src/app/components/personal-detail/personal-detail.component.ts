import { Component, OnInit } from '@angular/core';
import { User } from '../../Service/auth/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent implements OnInit{

  errorMenssage:string=''
  user?:User;

  constructor(private userService:UserService, private _route:ActivatedRoute){
  }

  async getUserData() {
    try {
      const data: User | null = await firstValueFrom(this.userService.getUser());
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      this.user = data;
    } catch (error: any) {
      console.log('error de getuser')
      this.errorMenssage = error;
    }
  }
  
  ngOnInit() {
    this.getUserData();
    
  }

}
