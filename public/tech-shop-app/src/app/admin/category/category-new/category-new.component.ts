import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  title: string = "Category New";
  categoryForm: FormGroup;
  name: FormControl;
  messageAlert: string;
  showAlert: boolean = false;  

  constructor(private categoryService: CategoryService) {    
   }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.categoryForm = new FormGroup({
      name: this.name
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value)
        .subscribe(
          data => {
            this.showAlert = true;
            this.messageAlert = "You have created a category!";
            setTimeout(()=>{    
              this.showAlert = false;
            },1500);
          },
          error => {
            console.log("Error "+error);
          }
        )
      this.categoryForm.reset();
    }    
  } 

}
