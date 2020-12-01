import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CompanyServicesService } from 'src/app/services/company-services/company-services.service';
import { CurrencyPipe } from '@angular/common';
import { Masks } from 'src/app/utils/masks';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  companyservice: Object;
  serviceForm: FormGroup;
  profilesList: any = [];
  loading: Boolean = false;
  companies: any = [];
  documentsAll: any = [];
  searchSubscribe = '';
  services: any = [];
  userExternal = false;
  // public mask = [/[1-4]/, /\d/, /\d/, /\d/, ',',/\d/,/\d/]

  constructor(
    private mask: Masks,
    private _route: Router,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private companyServiceSrv: CompanyServicesService,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      services: this.fb.array(this.services)
    });
    this.getCompanies();
    this.addService();
  }

  /* changePrice(event) {
    return `${event.target.value}-teste`
  }


  onValueChanged(data?: any): void {
    var diff = _.omitBy(data, function (v, k) {
      // console.log(k, v)
      console.log(this.services.value)
      this.services[k] = `${v}-teste`
      //return lastFormValue[k] === v;
    });
    console.log(this.services)
    this.serviceForm.setValue({
      services: this.services
    })
    //this.lastFormValue = this.myFormArray.value; // Update for future requests
    // diff will contain the properties if the form that changed.

  } */

  get company() {
    return this.serviceForm.get('company');
  }


  createService(): FormGroup {
    return this.fb.group({
      description: '',
      price: ''
    });
  }



  addService(): void {
    this.services = this.serviceForm.get('services') as FormArray;
    this.services.push(this.createService());
  }

  removeService(e) {
    this.services.removeAt(e);
  }



  formatter = (x: { name: string }) => x.name;

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res;
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10); }
        return res;
      })
    )

  returnFormatCompanyServices() {
    this.serviceForm.value.company = this.serviceForm.value.company._id;
    const newArray = [];
    this.serviceForm.value.services.map((item) => {
      var priceStr = item.price.replace(',','.')
      priceStr = priceStr.replace('R$', '')
      var priceFloat = parseFloat(priceStr)
      newArray.push({ description: item.description, price: priceFloat });
    });
    this.serviceForm.value.services = newArray;
  } 

  postCompanyService() {
    this.loading = true;
    this.returnFormatCompanyServices();

    this.companyServiceSrv.newService(this.serviceForm.value).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Serviço Empresarial cadastrado com sucesso.');
          this._route.navigate(['/company-services']);
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
