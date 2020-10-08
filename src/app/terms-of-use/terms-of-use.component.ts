import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import * as moment from 'moment';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
  animations: [routerTransition()]
})
export class TermsOfUseComponent implements OnInit {

  constructor(
    public userSrv: UsersService,
    public router: Router,
  ) { }


  ngOnInit() {

  }

  updateUser() {
    const dateNow = moment().format('DD/MM/YYYY');
    const user = {
      _id: window.localStorage.getItem('id'),
      DateAcceptanceTerm: dateNow,
      acceptanceTerm: true
    };
    this.userSrv.updateUser(user).subscribe((data) => {
      if (data.acceptanceTerm) {
        window.localStorage.removeItem('acceptanceTerm');
        window.localStorage.setItem('acceptanceTerm', JSON.stringify(data.acceptanceTerm));
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
