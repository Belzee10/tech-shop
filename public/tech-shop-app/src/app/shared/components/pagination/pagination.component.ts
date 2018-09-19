import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Meta } from './meta';
import { Links } from './links';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() meta: Meta;
  @Input() links: Links;
  @Output() nextPageEvent = new EventEmitter<number>();
  totalPages: number[];
  cantPages: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.meta) {
      this.totalPages = Array.from(Array(this.meta.last_page),(x,i)=>i+1);        
      this.cantPages = this.totalPages.length;
      }  
  }

  goToPage(page: number) {
    this.nextPageEvent.emit(page);
  }
    
}
