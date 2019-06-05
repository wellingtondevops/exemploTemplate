import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [routerTransition()]
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(
    private usersSrv: UsersService
  ) { }

  ngOnInit() {
    this.usersList();
  }

  usersList(){
    this.usersSrv.users().subscribe(
      (data) => { this.users = data.items }
    )
  }

}
