import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {

    public userSubject: BehaviorSubject<any | null> = new BehaviorSubject<User | null>(null);
    public accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public accesstoken: Observable<string | null> = this.accessTokenSubject.asObservable();
    public refreshtoken: Observable<string | null> = this.refreshTokenSubject.asObservable();
    public user: Observable<User | null> = this.userSubject.asObservable();
    isconn: any = false;
    public userid: any;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

        // Inside your component or service
        const cookieString = document.cookie;

        // Parse the JSON data from the user part of the cookie
        const userData = this.parseCookieData(cookieString, 'user');
        this.userid = userData?.id ?? 1;
        //console.log('user is' + this.userid);

        this.userSubject.next(userData);

        // Extract accessToken and refreshToken from the cookie
        const accessToken = this.parseCookieData(cookieString, 'accessToken');
        const refreshToken = this.parseCookieData(cookieString, 'refreshToken');
        this.accessTokenSubject.next(accessToken);
        this.refreshTokenSubject.next(refreshToken);
    }

    private parseCookieData(cookieString: string, key: string): any {
        const cookies = cookieString.split('; ');
        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.split('=');
            if (cookieKey.trim() === key) {
                try {
                    return JSON.parse(decodeURIComponent(cookieValue));
                } catch (error) {
                    console.error(`Error parsing cookie data for key ${key}: ${error}`);
                    return null;
                }
            }
        }
        return null;
    }



    public get userValue() {
        return this.userSubject.value;
    }
    public get getrefresgtoken() {
        return this.refreshTokenSubject.value;
    }
    public get getaccesstoken() {
        return this.accessTokenSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signIn`, { email, password })
            .pipe(map(user => {
                // const token = response.accessToken; 
                //        if (rememberMe) {
                // localStorage.setItem('access_token', token);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // sessionStorage.setItem('userid',user);
                console.info(user);
                this.userSubject.next(user);
                this.isconn = true;

                return user;
            }));
    }
    getIsConnected() {
        return this.userValue != null;
    }
    getUserRole() {
        const userAuthorities = this.userValue;
        return userAuthorities.authorities[0].authority;

    }
    logout() {
        // remove user from local storage and set current user to null

        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User, roleName: string) {
        return this.http.post(`${environment.apiUrl}/api/auth/signup/employee/${roleName}`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/api/user/currentuser/${id}`);
    }
    getCurrentUser(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/user/Currentuser/${id}`);
    }
    getAuthToken(): string {
        const token = localStorage.getItem('access_token');
        console.log('SERVICE token is' + token)

        return token || 'EMPTY';
    }
    forgetPassword(username: String, resetPass: any) {
        return this.http.put(`${environment.apiUrl}/api/user/forgetpass/${username}`, resetPass);
    }
    userForgetPassword(email: String) {
        return this.http.post(`${environment.apiUrl}/api/user/forgetpassword/${email}`, null);
    }
    forgetPasswordbyemail(email: String, resetPass: any) {
        return this.http.put(`${environment.apiUrl}/api/user/forgetpassbyemail/${email}`, resetPass);
    }



    refreshToken(): Observable<any> {
        // Implement logic to call the token refresh API
        return this.http.post<any>(`${environment.apiUrl}/api/auth/refreshToken`, { refreshToken: this.getrefresgtoken });
    }

}