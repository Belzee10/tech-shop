import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import {Router} from '@angular/router';
import { Product } from '../../../admin/product/product';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  title: string = 'Shipping';
  orderForm: FormGroup;
  address: FormControl;
  city: FormControl;
  products: Product[];
  total: number = 0;
  totalProducts: number = 0;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getShoppingCart();
  }

  createFormControls() {
    this.address = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
  }

  createForm() {
    this.orderForm = new FormGroup({
      address: this.address,
      city: this.city
    });
  }

  getShoppingCart() {
    this.orderService.getShoppingCart()
      .subscribe(
        data => {
          this.products = data;
          this.getTotal();
        },
        error => {
          console.log('Error Error to get products in shopping cart');
        }
      )
  }

  getTotal() {
    if (this.products) {
      for (const product of this.products) {
        const amount = product.price * product.pivot.cant;
        this.total += amount;
        this.totalProducts += product.pivot.cant;
      }
    }    
  }

  completeOrder() {
    if (this.orderForm.valid) {
      this.orderService.completeOrder(this.orderForm.value.address, this.orderForm.value.city)
        .subscribe(
          data => {
            this.orderService.change(0);
            this.goThankYou();
          },
          error => {
            console.log('Error Error to complete order');
          }
        )
    }
  }

  goThankYou() {
    this.router.navigate(['thank-you']);
  }

}
