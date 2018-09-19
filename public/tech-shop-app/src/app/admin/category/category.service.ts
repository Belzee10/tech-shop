import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {

  private url = environment.apiUrl+'/categories';

  constructor(private http: HttpClient) {    
   }

   getCategories(page: number): Observable<Category[]> {   
    return this.http.get<Category[]>(`${this.url}?page=${page}`);          
   }

   getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/all`);
   }

   getCategory(categoryId: number) {
    return this.http.get<Category>(`${this.url}/${categoryId}`);
   }

   createCategory(category: Category) {
    return this.http.post<Category>(`${this.url}`, category);
   }

   updateCategory(category: Category) {
    return this.http.put<Category>(`${this.url}/${category.id}`, category);
   }

   destroyCategory(category: Category) {
    return this.http.delete<Category>(`${this.url}/${category.id}`);
   }

}
