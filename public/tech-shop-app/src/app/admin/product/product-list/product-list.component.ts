import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Product } from '../product';

@Component({
    selector: 'app-product-list',
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit {

    title = "Product List";
    modelName: string = "product";        
    @Input() products: Product[];
    @Output() destroyProductEvent = new EventEmitter<Product>();
    term: string;

    constructor() { }

    ngOnInit() {        
     }

     destroy(product: Product) {
        this.destroyProductEvent.emit(product);
     }

     searchTerm(term: string) {
        this.term = term;
    }
}