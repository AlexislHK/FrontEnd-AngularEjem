import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({email:''})

  private baseURL = 'http://localhost:8080/users';

  constructor(private httpClient:HttpClient) { }

 public login(credentials:LoginRequest): Observable<User>{
    console.log(credentials)
    return this.httpClient.post<User>(this.baseURL+'/login',credentials).pipe(
      tap((userData:User)=>{    //Entrega la informacacion de la fuente 
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error',error.error)
    }else{
      console.log('Backend retorno el codigo de estado ',error.status,error.error)
    }
    return throwError(() => new Error('Algo fallo, Por favor intente nuevamente'));
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
