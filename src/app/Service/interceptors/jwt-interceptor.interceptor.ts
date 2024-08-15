import { HttpErrorResponse, HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';

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
          if (event instanceof HttpErrorResponse && event.status === 302) {
            // Modificar el estado a 200
            const modifiedResponse = event.clone({ status: 200 });
            return of(modifiedResponse);
          }
          return event; // Asegúrate de retornar el evento si no es 302
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 302) {
            // Extraer información del error
            const errorData = error.error;
            console.log('Error Data:', errorData);

            const userData = JSON.stringify(errorData);
            localStorage.setItem('user', userData);

            // Crear una respuesta exitosa con los datos del error
            const modifiedResponse = new HttpResponse({
              body: errorData,
              status: 200,
              statusText: 'OK',
              headers: error.headers
              //url: error.url
            });

            return of(modifiedResponse);
          }
          return (error); // Asegúrate de retornar el error si no es 302
        }
      })
    );
    
    
    
    
    // .pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse && event.status === 302) {
    //       // Modificar el estado a 200
    //       const modifiedResponse = event.clone({ status: 200 });
    //       return of(modifiedResponse);
    //     }
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 302) {
    //       // Extraer información del error
    //       const errorData = error.error;
    //       console.log('Error Data:', errorData);
    
    //       const userData = JSON.stringify(errorData);
    //       localStorage.setItem('user', userData);
    
    //       // Crear una respuesta exitosa con los datos del error
    //       const modifiedResponse = new HttpResponse({
    //         body: errorData,
    //         status: 200,
    //         statusText: 'OK',
    //         headers: error.headers
    //         //url: error.url
    //       });
    
    //       return of(modifiedResponse);
    //     }
    //     return throwError(error)
    //   })
    // );
    
    
    
    
    
    
    
    
  }else{
     return next(req);
  }

};