import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../admin/user/user';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private url = environment.apiUrl;

  public currentUser;
  private emailSource = new BehaviorSubject<string>('');
  private roleSource = new BehaviorSubject<string>('');
  email = this.emailSource.asObservable();
  role = this.roleSource.asObservable();  

  constructor(private http: HttpClient) {        
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.emailSource.next(this.currentUser.email);
      this.roleSource.next(this.currentUser.role);
    }    
  }  

  signup(user: User): Observable<any> {
    return this.http.post<any>(this.url+'/signup', user)
      .pipe(
        tap(
          res => {
            let data = res['user'];
            if (data) {
              localStorage.setItem('currentUser', JSON.stringify({id: data.id, name: data.name, lastName: data.lastName, email: data.email, role: data.role, token: data.token}));
              this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
              this.change(this.currentUser.email, this.currentUser.role);               
            }                       
          })
      )
      .catch(this.errorHandler)
  }

  signin(user: User): Observable<any> {    
    return this.http.post<any>(this.url+'/signin', user)
      .pipe(
        tap(
          res => {            
            let data = res['user'];
            if (data) {
              localStorage.setItem('currentUser', JSON.stringify({id: data.id, name: data.name, lastName: data.lastName, email: data.email, role: data.role, token: data.token}));
              this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
              this.change(this.currentUser.email, this.currentUser.role);               
            }   
          })
      )
      .catch(this.errorHandler)
    }

  logout(): Observable<string> {   
    return this.http.delete<string>(this.url+'/logout?token='+this.currentUser.token)
      .pipe(
        tap(
          () => {
            localStorage.removeItem('currentUser');
            this.currentUser = '';
            this.change('', '');
          })
      )}  
      
  change(email: string, role: string) {
    this.emailSource.next(email);
    this.roleSource.next(role);
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : '';
  }
  
  getUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser : '';
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error.error) {
      errorMessage = error.error.error;
    }
    else if (error.error.errors.email){
      errorMessage = error.error.errors.email;
    }    
    return Observable.throw(errorMessage);
  } 

}
