import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Meta } from '../../shared/components/pagination/meta';
import { Links } from '../../shared/components/pagination/links';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  meta: Meta;
  links: Links;
  page: number = 1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories(this.page); 
  } 

  getCategories(page: number) {
    this.categoryService.getCategories(page)
      .subscribe(
        data => {
          this.categories = data['data']; 
          this.meta = data['meta'];
          this.links = data['links'];
        },
        error => {
          console.log("Error "+error);
        });
  }

  destroyCategory(category: Category) {
    this.categoryService.destroyCategory(category)
      .subscribe(
        () => {
          this.getCategories(this.meta.current_page);
        },
        error => {
          console.log("Error "+error);
        } 
      );
  } 

  nextPage(next: number) {
    this.getCategories(next);
  } 
}
