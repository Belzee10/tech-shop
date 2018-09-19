import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../admin/category/category';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  @Input() categories: Category[];
  @Output() selectCategoryEvent = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  selectCategory(category?: Category) {
    this.selectCategoryEvent.emit(category);
  }

}
