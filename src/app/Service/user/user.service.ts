import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser():Observable<User>{
    return this.http.get<User>(environment.urlHost+'users/getUser/1').pipe(
      catchError(this.handleError))
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error',error.error)
    }else{
      console.log('Backend retorno el codigo de estado ',error)
    }
    return throwError(() => new Error('Algo fallo, Por favor intente nuevamente1'));
  }


}
