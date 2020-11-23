import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompanyServicesService } from 'src/app/services/company-services/company-services.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import * as moment from 'moment';
import { CompanyServices } from 'src/app/models/service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
  companyservice: any;
  serviceForm: FormGroup;
  profilesList: any = [];
  loading: Boolean = false;
  companies: any = [];
  documentsAll: any = [];
  searchSubscribe = '';
  services: any = [];
  userExternal = false;
  public mask = [/[1-4]/, /\d/, /\d/, /\d/, ',', /\d/, /\d/]
  permissionEdit: any;
  permissionDelete: any;
  id: any;


  constructor(
    private route: ActivatedRoute,
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
      company: this.fb.control({ value: '', disabled: true },[Validators.required]),
      services: this.fb.array(this.services)
    });

    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompanies();
    this.getCompanyService();

    // this.addService();
  }

  getCompanyService() {
    this.companyServiceSrv.service(this.id).subscribe(data => {
      
      // this.companyservice = data;
      data.services = this.getDescriptionService(data.services);
      console.log(data);
      this.companyservice = {
        _links: data._links,
        _id: data._id,
        company: data.company,
        // dateCreated: data.dateCreated,
        services: data.services
      };
      

      // this.services = this.getDescriptionService(data.services);

      this.serviceForm.patchValue({
        company: data.company,
        services: data.services
      });

      console.log(this.serviceForm.value)

      this.companyservice.services.map(item => {
        this.addServiceExist(item);
      });

      console.log(this.serviceForm.value)

    }, error => {
      console.log('ERROR:', error);
    })
  }

  getDescriptionService(items) {
    let newItems = [];
    items.forEach((item, i) => {
      newItems.push({
        description: item.description.descriptionService,
        price: item.price,
      })
    });
    console.log('nI', newItems)
    return newItems;
  }

  createServiceExist(item): FormGroup {
    return this.fb.group({
      description: { value: item.description, disabled: true },
      price: { value: item.price, disabled: true }
    });
  }

  addServiceExist(item): void {
    this.services = this.serviceForm.get('services') as FormArray;
    this.services.push(this.createServiceExist(item));
  }

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

  returnFormatCompanyPermissions() {
    this.serviceForm.value.company = this.serviceForm.value.company._id;
    const newArray = [];
    this.serviceForm.value.services.map((item) => {
      var priceStr = item.price.replace(',', '.')
      var priceFloat = parseFloat(priceStr)
      newArray.push({ description: item.description, price: priceFloat });
    });
    this.serviceForm.value.services = newArray;
  }

  postCompanyService() {
    this.loading = true;
    this.returnFormatCompanyPermissions();

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
