import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../category';
import { Title } from '@angular/platform-browser/src/browser/title';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'] 
})
export class CategoryListComponent implements OnInit {
  
  @Input() categories: Category[];
  @Output() destroyCategoryEvent = new EventEmitter<Category>();
  title: string = "Category List";
  modelName: string = "category";
  term: string;

  constructor() {    
  }

  ngOnInit() { 
  }

  destroy(category: Category) {
    this.destroyCategoryEvent.emit(category);
  }

  searchTerm(term: string) {
    this.term = term;
  }
}
