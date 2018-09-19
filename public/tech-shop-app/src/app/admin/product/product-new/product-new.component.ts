import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';

@Component({
    selector: 'app-product-new',
    templateUrl: 'product-new.component.html',
    styleUrls: ['product-new.component.css']
})

export class ProductNewComponent implements OnInit {

    title: string = "Product New";
    productForm: FormGroup;
    name: FormControl;
    price: FormControl;
    image: FormControl;
    brand: FormControl;
    category_id: FormControl;
    description: FormControl;
    categories: Category[];
    messageAlert: string;
    showAlert: boolean = false;
    fileToUpload: File = null;
    fileName: string = "Choose image...";

    constructor(private productService: ProductService,
                private categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategories();
        this.createFormControls();
        this.createForm();
     }

    createFormControls() {
        this.name = new FormControl('', Validators.required);
        this.price = new FormControl('', [
            Validators.required,
            Validators.pattern('(^[0-9]+$)|(^-$)')
        ]);
        this.image = new FormControl('');
        this.brand = new FormControl('', Validators.required);
        this.category_id = new FormControl('', Validators.required);
        this.description = new FormControl('');
      }
    
      createForm() {
        this.productForm = new FormGroup({
          name: this.name,
          price: this.price,
          image: this.image,
          brand: this.brand,
          category_id: this.category_id,
          description: this.description,
        });
      }

      createProduct() {
          if (this.productForm.valid) {
              this.productService.createProduct(this.productForm.value, this.fileToUpload)
                .subscribe(
                    data => {
                        this.showAlert = true;
                        this.messageAlert = "You have created a Product!";
                        setTimeout(()=>{    
                            this.showAlert = false;
                          },1500);
                    },
                    error => {
                        console.log("Error "+error);
                      }
                )
                this.fileName = "Choose image...";
                this.productForm.reset();
          }
      }

      getCategories() {
          this.categoryService.getAllCategories()
            .subscribe(
                data => {
                    this.categories = data['data'];
                },
                error => {
                    console.log("Error "+error);
                  } 
            )
      }

      handleFileInput(files: FileList) {
        if (files.item(0)) {
            this.fileToUpload = files.item(0);
            this.fileName = this.fileToUpload.name;
        }       
        else {
            this.fileToUpload = null;
            this.fileName = "Choose image...";
        }
      }


}