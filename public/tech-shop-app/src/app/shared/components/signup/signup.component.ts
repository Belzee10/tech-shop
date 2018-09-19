import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../admin/user/user';
import {Router} from '@angular/router';
import { OrderService } from '../../../dashboard/order/order.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  name: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  errorMessage: string = '';
  user = new User();

  constructor(private authService: AuthService,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required, 
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
  }

  createForm() {
    this.signupForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }

  signup() {
    if (this.signupForm.valid) {      
      this.user = this.signupForm.value;
      this.user.role = 'member';      
      this.authService.signup(this.user)
        .subscribe(
          data => {
            this.getShoppingCart();
            this.signupForm.reset();
            this.goHome();
          },
          error => {
            this.errorMessage = error;
            console.log('Error: Error to signed');
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
