import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Meta } from '../../shared/components/pagination/meta';
import { Links } from '../../shared/components/pagination/links';

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})

export class ProductComponent implements OnInit {

    products: Product[];
    meta: Meta;
    links: Links;
    page: number = 1;

    constructor(private productService: ProductService) {
     }

    ngOnInit() { 
        this.getProducts(this.page);
    }

    getProducts(page: number) {
        this.productService.getProducts(page)
            .subscribe(
                data => {
                    this.products = data['data'];
                    this.meta = data['meta'];
                    this.links = data['links'];
                },
                error => {
                    console.log("Error "+error);
                  }
            );
    }

    destroyProduct(product: Product) {
        this.productService.destroyProduct(product)
            .subscribe(
                () => {
                    this.getProducts(this.page);
                },
                error => {
                    console.log("Error "+error);
                  } 
            );
    }

    nextPage(next: number) {
        this.getProducts(next);
      }

}