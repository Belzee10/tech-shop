import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Meta } from '../../shared/components/pagination/meta';
import { Links } from '../../shared/components/pagination/links';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  meta: Meta;
  links: Links;
  page: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers(this.page);
  }

  getUsers(page: number) {
    this.userService.getUsers(page)
      .subscribe(
        data => {
          this.users = data['data'];
          this.meta = data['meta'];
          this.links = data['links'];
        },
        error => {
          console.log("Error "+error);
        }
      )
  }

  destroyUser(user: User) {
    this.userService.destroyUser(user)
      .subscribe(
        () => {
          this.getUsers(this.meta.current_page);
        },
        error => {
          console.log("Error "+error);
        } 
      )
  }

  nextPage(next: number) {
    this.getUsers(next);
  } 

}
