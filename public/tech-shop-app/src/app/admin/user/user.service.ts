import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from './user';

@Injectable()
export class UserService {

  private url = environment.apiUrl+'/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?page=${page}`);
  }  

  getUser(userId: number) {
    return this.http.get(`${this.url}/${userId}`)
  }

  createUser(user: User) {
    return this.http.post(`${this.url}`, user);
  }

  updateUser(userEdit: User, user: User) {
    return this.http.put(`${this.url}/${userEdit.id}`, user);
  }

  destroyUser(user: User) {
    return this.http.delete(`${this.url}/${user.id}`);
  }

}
