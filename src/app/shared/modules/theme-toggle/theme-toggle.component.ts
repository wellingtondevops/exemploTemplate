import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
    themeForm: FormGroup;
    loading: Boolean = true;
    user: any;
    id: string;
    theme: string;
    saveTheme: any;

    constructor(
        private themeService: ThemeService,
        private userSrv: UsersService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) { }

    ngOnInit(): void {
        this.id = localStorage.getItem('id');
        this.getUserTheme();
        this.themeForm = this.fb.group({
            _id: '',
            theme: this.fb.control(''),
        });
    }

    getUserTheme() {
        this.userSrv.userTheme(this.id).subscribe(
            data => {
                this.user = data;
                this.themeForm.patchValue({
                    _id: this.user._id,
                    theme: data.theme
                });
                this.theme = data.theme;
                this.themeService.setTheme(this.theme);
                this.loading = false;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    toggleTheme() {
        if (this.theme === 'bootstrap') {
            this.theme = 'bootstrap-dark';
        } else {
            this.theme = 'bootstrap';
        }
        this.themeService.setTheme(this.theme);
        this.themeForm.patchValue({
            theme: this.theme
        });
        this.updateTheme();
    }

    updateTheme() {
        this.userSrv.updateTheme(this.themeForm.value).subscribe(
            data => {
                this.user = data;
                this.themeForm.patchValue({
                    theme: data.theme
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
