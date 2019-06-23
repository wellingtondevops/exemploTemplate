import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  public isCollapsed = false;
  users: User[];

  constructor(
    private usersSrv: UsersService,
    private _route: Router,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    this.usersList();
  }

  usersList() {
    this.usersSrv.users().subscribe(
      (data) => { this.users = data.items; },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getUser(user) {
    console.log(user);
    this._route.navigate(['ShowComponent'], user);
  }

}
