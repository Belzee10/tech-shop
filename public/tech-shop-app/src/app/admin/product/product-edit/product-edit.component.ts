import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { Product } from '../product';

@Component({
    selector: 'app-product-edit',
    templateUrl: 'product-edit.component.html',
    styleUrls: ['product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
    
    title: string = "Product Edit";
    productId: number;
    productEdit: Product = new Product(); 
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
                private categoryService: CategoryService,
                private route: ActivatedRoute) { }

    ngOnInit() { 
        this.route.params.subscribe(
            params => this.productId = params['id']
          );
        this.getProduct();  
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

    getProduct() {
        this.productService.getProductDetails(this.productId)
            .subscribe(
                data => {
                    this.productEdit = data['data'];
                    this.category_id.setValue(this.productEdit.category.id);
                    this.fileName = this.productEdit.image ? "Image of: "+this.productEdit.name : "No Image ):";
                },
                error => {
                    console.log("Error "+error);
                  } 
            )
    }  

    updateProduct() {
        if (this.productForm.valid) {            
            this.productService.updateProduct(this.productEdit, this.productForm.value, this.fileToUpload) 
                .subscribe(
                    data => {
                        this.showAlert = true;
                        this.messageAlert = "Product Updated!";
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

    handleFileInput(files: FileList) {
        if (files.item(0)) {
            this.fileToUpload = files.item(0);
            this.fileName = this.fileToUpload.name;
        }       
      }

   
}