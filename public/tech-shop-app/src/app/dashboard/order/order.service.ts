import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../admin/user/user';
import { AuthService } from '../../shared/services/auth.service';
import { Product } from '../../admin/product/product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';
import { Order } from './order';

@Injectable()
export class OrderService {

  private url = environment.apiUrl+'/orders';
  private currentUser;
  private cantSource = new BehaviorSubject<number>(0);
  cant = this.cantSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
      this.currentUser = authService.getUser();
  }

  addToCart(productId: number) {//add to cart
    this.currentUser = this.authService.getUser();
    const request = JSON.stringify({product_id: productId, user_id: this.currentUser.id});
    return this.http.post(`${this.url}`, JSON.parse(request));
  }

  getShoppingCart(): Observable<Product[]> {//get products in shopping cart
    return this.http.get<Product[]>(`${this.url}/shoppingCart`)  
      .pipe(
        tap(
          res => {
            let cant: number = 0;
            for (const product of res) {
              cant += product.pivot.cant;
            }
            this.change(cant);
          }
        )
      )   
  }

  completeOrder(address: string, city: string) {//complete order (ckeck-out)
    this.currentUser = this.authService.getUser();
    const request = JSON.stringify({user_id: this.currentUser.id, address: address, city: city});
    return this.http.post(`${this.url}/complete`, JSON.parse(request));
  }  

  getOrders(): Observable<Order[]> {//get orders by user
    return this.http.get<Order[]>(`${this.url}`);
  }

  getAllOrders(): Observable<Order[]> {//get all orders
    return this.http.get<Order[]>(`${this.url}/all`);
  }

  getOrder(order_id: number): Observable<Order> {//order details
    return this.http.get<Order>(`${this.url}/${order_id}/details`);
  }

  deleteProduct(product_id: number) {//delete product from cart
    return this.http.delete(`${this.url}/${product_id}`);
  }

  removeProduct(product_id: number) {//remove product from cart
    return this.http.delete(`${this.url}/remove/${product_id}`)
  }

  change(cant: number) {
    this.cantSource.next(cant);
  } 
  
}
