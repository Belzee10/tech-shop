import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../admin/category/category.service';
import { Category } from '../../admin/category/category';
import { ProductService } from '../../admin/product/product.service';
import { Product } from '../../admin/product/product';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {    
    
    navigationSubscription; 
    categories: Category[];
    products: Product[];
    page: number = 1;
    cols: string = 'col-lg-3';
    term: string;

    constructor(private categoryService: CategoryService,
                private productService: ProductService,
                private router: Router) {

        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
            this.initialiseHome();
            }
        });
        
    }

    ngOnInit() {
        this.getAllCategories();
        this.getAllProducts();
     }

     getAllCategories() {
        this.categoryService.getAllCategories()
            .subscribe(
                data => {
                    this.categories = data['data'];
                },
                error => {
                    console.log('Error Error to load all categories');
                }
            )
     }

     getAllProducts() {
         this.productService.getAllProducts()
            .subscribe(
                data => {
                    this.products = data;  
                },
                error => {
                    console.log('Error Error to load products');
                }
            )
     }    
    
    productsBy(category: Category) {
        if (category) {
            this.productService.getProductsBy(category)
            .subscribe(
                data => {
                    this.products = data;   
                },
                error => {
                    console.log('Error Error to load products');
                }
            )
        }
        else {
            this.getAllProducts();
        }        
    }

    fourCol() {       
        this.cols = 'col-lg-3';
    }

    threeCol() {
        this.cols = 'col-lg-4';
    }

    initialiseHome() {
        this.getAllProducts();
    }

    ngOnDestroy(): void {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    searchTerm(term: string) {
        this.term = term;
    }
}