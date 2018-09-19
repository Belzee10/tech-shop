import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { OrderService } from '../../../dashboard/order/order.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  email: FormControl;
  password: FormControl;  
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();   
  }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.signinForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  signin() {
    if (this.signinForm.valid) {
      this.authService.signin(this.signinForm.value)
        .subscribe(
          data => {   
            this.getShoppingCart();
            this.goHome();
          },
          error => {
            this.errorMessage = error;
            console.log('Error: Error to authenticate');
          }
        )
    }
  }  

  getShoppingCart() {
    this.orderService.getShoppingCart()
      .subscribe(
        () => {
          //
        },
        error => {
          console.log('Error Error to get cant of items in the shooping cart');
        } 
      )
  }  
  
  goHome() {
    this.router.navigate(['home']);
  }
  
}
