import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompanyServicesService } from 'src/app/services/company-services/company-services.service';
import { MenuService } from 'src/app/services/menu-services/menu-services.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    service: Object;
    serviceForm: FormGroup;
    profilesList: any = [];
    loading: Boolean = false;
    companies: any = [];
    documentsAll: any = [];
    searchSubscribe = '';
    services: any = [];
    userExternal = false;
    public mask = [/[1-4]/, /\d/, /\d/, /\d/, ',', /\d/, /\d/]

    constructor(
        private _route: Router,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private menuSrv: MenuService,
        private introService: IntroJsService,
    ) {
    }

    ngOnInit() {
        this.serviceForm = this.fb.group({
            descriptionService: this.fb.control('', [Validators.required])
        });
    }

    get descriptionService() {
        return this.serviceForm.get('descriptionService');
    }

    postMenuService() {
        this.loading = true;
        this.menuSrv.newService(this.serviceForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Menu cadastrado com sucesso.');
                    this._route.navigate(['/menu-services']);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    help() {
        this.introService.NewMenuServices();
    }
}
