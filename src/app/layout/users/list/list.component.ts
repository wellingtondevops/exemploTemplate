import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { UsersService } from '../../../services/users/users.service';
import { UserList } from '../../../models/user';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from 'src/app/utils/pipes/pipes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  public isCollapsed = false;
  users: UserList;
  page = {
    currentPage: 0,
    totalPage: 0
  };


  columns = [
    {name: 'Nome', prop: 'name'},
    {name: 'E-mail', prop: 'email'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
  ];

  constructor(
    private usersSrv: UsersService,
    private _route: Router,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.setPage({offset: 1});
    this.usersList();
  }

  usersList() {
    this.usersSrv.users(null).subscribe(
      (data) => {
        this.users = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getUser(user) {
    this._route.navigate(['/users/get', user]);
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;

    if (pageInfo.offset >= 1) {
      this.page.currentPage = pageInfo.offset + 1;
    }

    this.usersSrv.users(this.page).subscribe(
      (data) => {
        this.users = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

}
