import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  title: string = 'User New';
  userForm: FormGroup;
  name: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  role: FormControl;
  roles: string[] = ['admin', 'member'];
  messageAlert: string;
  showAlert: boolean = false; 

  constructor(private userService: UserService) { }

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
    this.role = new FormControl('', Validators.required);
  }

  createForm() {
    this.userForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  createUser() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value)
        .subscribe(
          () => {
            this.showAlert = true;
            this.messageAlert = "You have created a user!";
            setTimeout(()=>{    
              this.showAlert = false;
            },1500);
          }
        )
        this.userForm.reset();
    }
  }

}
