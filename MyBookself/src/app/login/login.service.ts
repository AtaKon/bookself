import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject?: BehaviorSubject<any>;
  public currentUser?: Observable<any>;
  token!:string;

  constructor(private http:HttpClient) {
    this.token=localStorage.getItem('token') as string;
    if(this.token){
      if(this.tokenExpired(this.token))
      {
        this.logout()
      }
    }

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as string));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject?.value;
}

private tokenExpired(token: string) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}


  login(obj:any){
    return this.http.post<any>('http://localhost:3000/user/login',obj)
    .pipe(map((user:any) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', user['token']);

      this.currentUserSubject?.next(user);
      return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject?.next(null);
  }
}
