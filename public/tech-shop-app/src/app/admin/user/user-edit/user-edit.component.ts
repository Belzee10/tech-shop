import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  title: string = 'User Edit';
  userForm: FormGroup;
  name: FormControl;
  lastName: FormControl;
  email: FormControl;
  role: FormControl;
  roles: string[] = ['admin', 'member'];
  userId: number;
  userEdit: User = new User(); 
  messageAlert: string;
  showAlert: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.userId = params['id']
    );

    this.getUser();  
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
    this.role = new FormControl('', Validators.required);
  }

  createForm() {
    this.userForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      role: this.role
    });
  }

  getUser() {
    this.userService.getUser(this.userId)
      .subscribe(
        data => {         
          this.userEdit = data['data'];  
          this.splitName(this.userEdit);
          this.role.setValue(this.userEdit.role);                           
        },
        error => {
          console.log("Error "+error);
        }
      )      
  }

  splitName(userEdit: User) {
    let result:string = ''; 
    let value = userEdit.name.split(' ');
    this.userEdit.name = value[0];
    if (value.length > 1) {
      for (let i = 1; i < value.length; i++) {
        result += value[i];
        if ( i+1 != value.length ) {
          result += ' ';
        }
        this.userEdit.lastName = result;        
      }      
    }
    else {
      this.userEdit.lastName = '';
    }    
  }

  editUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userEdit, this.userForm.value)
        .subscribe(
          data => {
            this.showAlert = true;
            this.messageAlert = "User updated!";
            setTimeout(()=>{    
                this.showAlert = false;
              },1500);
          },
          error => {
            console.log("Error "+error);
          }
        )
    }
  }

}
