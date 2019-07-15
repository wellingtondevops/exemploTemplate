import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompaniesList } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  companies: CompaniesList;
  volumeForm: FormGroup;

  constructor(
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
  ) {
    this.volumeForm = this.fb.group({
      companie: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      guardType: this.fb.control('', [Validators.required]),
      volumeType: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companiesSrv.companies(null).subscribe(data => {
      this.companies = data;
    }, (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  selectEvent(item) {
    console.log('selectEvent', item);
    // do something with selected item
  }

  onChangeSearch(val: string) {
    console.log('onChangeSearch', val);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log('onFocused', e);
    // do something when input is focused
  }

  postVolume() {

  }
}
