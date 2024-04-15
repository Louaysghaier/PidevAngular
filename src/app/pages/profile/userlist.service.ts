import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
  private baseURL  ="http://localhost:8082/api/user/list-user";
  private baseURLactive  ="http://localhost:8082/api/user/validate-user/";
  private baseUserRole  ="http://localhost:8082/api/user/list-RolesName/";
  private baseBlockedUser="http://localhost:8082/api/user/bloque-user/"
  private basedebloquerBlockedUser="http://localhost:8082/api/user/debloque-user/"


  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseURL);
  }
  
  activateUser(id:Number): Observable<any> {
    return this.httpClient.put(this.baseURLactive, id);
    }

  getUserByRoles(RolesName:String):Observable<any>{
    const url = `${this.baseUserRole}`+RolesName;
    return this.httpClient.get<any>(url);
  }

  bloquerUser(id:Number):Observable<any>{
    return this.httpClient.put(this.baseBlockedUser+id, id);
  }
debloqueruser(id:Number):Observable<any>{
  return this.httpClient.put(this.basedebloquerBlockedUser+id, id);}

}