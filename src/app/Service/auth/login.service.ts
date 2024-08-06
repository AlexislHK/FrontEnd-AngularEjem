import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("")

  constructor(private httpClient:HttpClient) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");

  }

 public login(credentials:LoginRequest): Observable<any>{
    return this.httpClient.post<any>(environment.urlHost +'users/login',credentials).pipe(
      tap((userData)=>{    //Entrega la informacacion de la fuente 
        sessionStorage.setItem('token',userData.token)
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  logout():void{
    sessionStorage.clear();
    localStorage.clear();
    this.currentUserLoginOn.next(false);
  }


  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error',error.error)
    }else{
      console.log('Backend retorno el codigo de estado ',error.status,error.error)
    }
    return throwError(() => new Error('Algo fallo, Por favor intente nuevamente'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
