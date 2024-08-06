import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './Service/interceptors/jwt-interceptor.interceptor';
// import { InterceptorService } from './Service/interceptors/interceptor.service';
// import { ErrorInterceptorService } from './Service/auth/error-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))
  ]
};
