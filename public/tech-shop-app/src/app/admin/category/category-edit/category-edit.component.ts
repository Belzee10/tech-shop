import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  title = "Category Edit";
  categoryForm: FormGroup;
  name: FormControl; 
  categoryId: number;
  categoryEdit: Category = new Category();  
  messageAlert: string;
  showAlert: boolean = false;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService) {     
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.categoryId = params['id']
    );
    
    this.getCategory();
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

  getCategory() {
    this.categoryService.getCategory(this.categoryId)
      .subscribe(
        data => {         
          this.categoryEdit = data['data'];                   
        },
        error => {
          console.log("Error "+error);
        }
      )      
  }

  editCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryEdit)
        .subscribe(
          data => {
            this.showAlert = true;
            this.messageAlert = "Category updated!";
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
