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
  user: any;
  userForm: FormGroup;
  changeUp = false;

  constructor(
    private route: ActivatedRoute,
    private userSrv: UsersService,
    private fb: FormBuilder,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      _id: '',
      email: this.fb.control({value: '', disabled: true}, [Validators.required, Validators.email]),
      name: this.fb.control({value: '', disabled: true},  [Validators.required]),
      dateCreated: this.fb.control({value: '', disabled: true}),
    }, );

    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        this.user = data;
        this.userForm.patchValue({
          _id: data._id,
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

  changeUpdate() {
    !this.changeUp ? this.changeUp = true : this.changeUp = false;
    if (this.changeUp) {
      this.userForm.reset({
        _id: this.user._id,
        email: {value: this.user.email, disabled: false},
        name: {value: this.user.name, disabled: false},
        dateCreated: {value: moment(this.user.dateCreated).format('YYYY-MM-DD'), disabled: true}
      });
    }
  }

  updateUser() {
    this.userSrv.updateUser(this.userForm.value).subscribe(data => {
      console.log(data);
    });
  }

}
