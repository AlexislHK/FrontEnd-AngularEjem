import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = 'http://localhost:8080/users';

  constructor(private httpClient:HttpClient) { }

 login(credentials:LoginRequest): Observable<User>{
    console.log(credentials)
    return this.httpClient.post<User>(this.baseURL+'/login',credentials).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error',error.error)
    }else{console.log('Backend retorno el codigo de estado ',error.status,error.error)}
    return throwError(() => new Error('Algo fallo, Por favor intente nuevamente'));
  }
}
