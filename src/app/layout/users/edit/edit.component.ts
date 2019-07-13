import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  id: String;
  user: any;
  userForm: FormGroup;
  profilesList: any;

  constructor(
    private route: ActivatedRoute,
    private userSrv: UsersService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService
  ) {
    this.profilesList = ProfileEnum;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      _id: '',
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      profiles: this.fb.control('', [Validators.required])
    }, );

    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get profiles() { return this.userForm.get('profiles'); }

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        this.user = data;
        console.log(data);
        this.userForm.patchValue({
          _id: this.user._id,
          email: this.user.email,
          name: data.name,
          profiles: data.profiles
        });
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

  updateUser() {
    this.userSrv.updateUser(this.userForm.value).subscribe(data => {
      this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
      this.user = data;
      this.userForm.patchValue({
        _id: this.user._id,
        email: this.user.email,
        name: data.name
      });
    },
    (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

}
