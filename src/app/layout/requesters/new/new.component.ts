import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  storeHouse: Object;
  requesterForm: FormGroup;
  loading: Boolean = false;

  constructor(
    private requestersSrv: RequestersService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router
  ) { }

  ngOnInit() {
    this.requesterForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      fone: this.fb.control('', [Validators.required]),
      docts: this.fb.control('', [Validators.required])
    });
  }

  get name() {
    return this.requesterForm.get('name');
  }

  postRequester() {
    this.loading = true;
    this.requestersSrv.newRequester(this.requesterForm.value).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.requesterForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            name: this.fb.control('', [Validators.required]),
            email: this.fb.control('', [Validators.required]),
            fone: this.fb.control('', [Validators.required]),
            docts: this.fb.control('', [Validators.required])
          });
          this.successMsgSrv.successMessages('Depósito cadastrado com sucesso.');
          this._route.navigate(['/storehouses']);
        }
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

}
