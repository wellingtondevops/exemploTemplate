import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';
import { DISABLED } from '@angular/forms/src/model';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
  id: String;
  user: Object;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userSrv: UsersService,
    private fb: FormBuilder,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      dateCreated: ''
    }, );

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getUser();
  }

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        this.userForm.patchValue({
          email: data.email,
          name: data.name,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD')
        });
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

}
