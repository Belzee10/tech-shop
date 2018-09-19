import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { environment } from '../../../environments/environment';
import { Category } from '../category/category';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class ProductService {

    private url = environment.apiUrl+'/products';    

    constructor(private http: HttpClient,
                private authService: AuthService) {        
     }

     getProducts(page: number) {
        return this.http.get<Product[]>(`${this.url}?page=${page}`)
     }

     getAllProducts(): Observable<Product[]> {
        const userId = this.authService.getUser().id; 
        return this.http.get<Product[]>(`${this.url}/all/${userId}`);
     }

     getProductsBy(category: Category): Observable<Product[]> {
        const userId = this.authService.getUser().id;
        return this.http.get<Product[]>(`${this.url}/product-by/${category.id}/${userId}`);
     }

     getProduct(productId: number) {//get product details public
        const userId = this.authService.getUser().id;
        return this.http.get<Product>(`${this.url}/details/${productId}/${userId}`)
     }

     getProductDetails(productId: number) {//get product details admin only
        return this.http.get<Product>(`${this.url}/${productId}`)
     }

     createProduct(product: Product, fileToUpload: File) {
         const formData: FormData = new FormData();         
         formData.append('name', product.name);
         formData.append('price', product.price.toString());
         formData.append('image', fileToUpload, fileToUpload.name);
         formData.append('brand', product.brand);
         formData.append('description', product.description);
         formData.append('category_id', product.category_id.toString());
         
        return this.http.post<Product>(`${this.url}`, formData)
     }

     updateProduct(productEdit: Product, product: Product, fileToUpload: File) {
         const formData: FormData = new FormData();   
         formData.append('name', product.name);
         formData.append('price', product.price.toString());                  
         formData.append('brand', product.brand);
         formData.append('description', product.description);
         formData.append('category_id', product.category_id.toString());
         if (fileToUpload) {
            formData.append('image', fileToUpload, fileToUpload.name);
         }

        return this.http.post<Product>(`${this.url}/${productEdit.id}`, formData)
     }

     destroyProduct(product: Product) {
        return this.http.delete<Product>(`${this.url}/${product.id}`)
     }
    
}