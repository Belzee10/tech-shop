import { Category } from '../category/category';

export class Product {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
    category: Category;
    description: string;
    pivot: any;
    cant: number;
    category_id: number;
    created_at: string;
    updated_at: string;
}