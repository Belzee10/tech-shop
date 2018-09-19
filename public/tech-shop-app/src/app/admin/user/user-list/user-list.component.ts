import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Output() destroyUserEvent = new EventEmitter<User>();
  title: string = "User List";
  modelName: string = "user";
  term: string;

  constructor() { }

  ngOnInit() {
  }

  destroy(user: User) {
    this.destroyUserEvent.emit(user);
  }

  searchTerm(term: string) {
    this.term = term;
  }

}
