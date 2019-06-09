import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      dateCreated: ''
    })

    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
    this.getUser()
  }

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        console.log(data);
        console.log(moment(data.dateCreated).format('DD/MM/YYYY'))
        this.userForm.patchValue({
          email: data.email,
          name: data.name,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD')
        });
      },
      (error) => {
        console.log(error)
      })
  }

}
