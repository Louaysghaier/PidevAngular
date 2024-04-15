import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from 'src/environments/environment';
import { OTP } from '../models/OTP';

@Injectable({ providedIn: 'root' })
export class OTPSERVICE {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    
    generateOTP(): Observable<OTP> {
        return this.http.post<OTP>(`${environment.apiUrl}/OTP/GenerateOTp`, {});
    }
    verifyOTP(identification: string): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/OTP/VerifOTP/${identification}`, {})
        
    }
    getOTPbyId(){}
    resendOTP(email: string): Observable<OTP> {
        return this.http.post<OTP>(`${environment.apiUrl}/OTP/ResendOTP/${email}`, null);
    }
    userstatus(email:string, result:boolean): Observable<void>{
        return this.http.post<void>(`${environment.apiUrl}/OTP/userstatus/${email}/${result}`, null);
    }
}

