import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
                console.error('ErrorInterceptor',err);
                // Check if the error response indicates an expired token
                if (err.error && err.error.message === 'Token expired') {
                    // Call refreshToken method
                    return this.accountService.refreshToken().pipe(
                        switchMap((res) => {
                            console.info('Token refreshed',res);
                            const user = this.accountService.userValue||{} ;
                            // Update the user object with new tokens
                            user.token = res.newAccessToken;
                            user.refreshToken = res.refreshToken;
                            request = request.clone({
                                setHeaders: {
                                    'Content-Type': 'application/json',
                                    Authorization: `access ${user.token}`,
                                    'RefreshToken': user.refreshToken || ''
                                }
                            });
                            this.accountService.userSubject.next(user);
                            //localStorage.setItem('user', JSON.stringify(user));

                            // Retry the original request with the new token
                            return next.handle(request);
                        }),
                        catchError(() => {         
                           // Logout if refreshToken fails

                            console.error('Token refresh failed');
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "You session is expired on  this page (Token refresh failed)!",
                               // footer: '<a href="#">Why do I have this issue?</a>'
                              });
                            this.accountService.logout();
                            return throwError(() => 'Token refresh failed');
                        })
                    );
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You Have no right to do anything here please contact the supervisors !",
                       // footer: '<a href="#">Why do I have this issue?</a>'
                      });
                    // Logout user for other 401 or 403 errors
                    //alert('You session is expired on  this page');
                   // this.accountService.logout();
                }
            }

            // Pass the error through if it's not a 401 or 403 error
            return throwError(() => err);
        }));
    }
}
