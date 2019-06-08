import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

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
    private _route: Router
  ) { }

  ngOnInit() {
    this.usersList();
  }

  usersList(){
    this.usersSrv.users().subscribe(
      (data) => { this.users = data.items },
      (error) => { console.log('ERROR: ', error) }
    )
  }

  getUser(user){
    console.log(user);
    this._route.navigate(['ShowComponent'], user);
  }

}
