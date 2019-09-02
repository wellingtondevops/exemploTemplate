import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  registerFileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.registerFileForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      location: this.fb.control('')
    });
  }

}
