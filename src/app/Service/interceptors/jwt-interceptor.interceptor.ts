import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem("token");

  if (!req.url.includes('/login')){
      // clonamos la solicitud y le agregamos el encabezado de solictud
    const authReq = req.clone({
      setHeaders:{
        'Content-Type':'application/json;charset=utf-8',
        'Accept':'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq).pipe(
      tap({
        next: event => {
          if (event.type === HttpEventType.Response) {
              if (event.status === 302) {
                  // Manejar la redirección aquí
                  const redirectUrl = event.headers.get('');
                  if (redirectUrl) {
                      window.location.href = redirectUrl;
                  }
              }
          }
      },
      error: (error: HttpErrorResponse) => {
          if (error.status === 302) {
              // Extraer información del error
              const errorData = error.error;
              console.log('Error Data:', errorData);

              const userData = JSON.stringify(errorData)
              localStorage.setItem('user',userData)
              

          }
      }
    })






      // catchError((err:any) =>{
      //   if(err instanceof HttpErrorResponse){
      //     if (err.status === 401){
      //       //Manejo especifico para errores de autorizacion
      //       console.error('Solicitud no authorizada:',err)
      //     } else {
      //       //Manejar otro codigos de errores de HTTP
      //       console.error('Http error:',err)
      //     }
      //   }else{
      //     //Manejar errores que no son de HTTP
      //     console.error('Ocurrio un error:',err)
      //   }

      //   return throwError(()=>err)
        
      // })
    )
  }else{
     return next(req);
  }

};
