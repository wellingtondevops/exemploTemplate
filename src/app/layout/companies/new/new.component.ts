import { Component, OnInit } from '@angular/core';
import { PersonTypeEnum } from '../../../models/persontype.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  companyForm: FormGroup;
  personTypeList: any = [];

  constructor(
    private fb: FormBuilder,
  ) { 
    this.personTypeList = PersonTypeEnum;

    this.companyForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      adress: this.fb.control('', [Validators.required]),
      province: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      fone: this.fb.control('', [Validators.required]),
      answerable: this.fb.control('', [Validators.required]),
      typePerson: this.fb.control('', Validators.required),
      cnpj: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('',Validators.required)
    });
  }

  get name() { return this.companyForm.get('name'); }
  get adress() { return this.companyForm.get('adress'); }
  get province() { return this.companyForm.get('province'); }
  get city() { return this.companyForm.get('city'); }
  get fone() { return this.companyForm.get('fone'); }
  get aswerable() { return this.companyForm.get('aswerable'); }
  get personType() { return this.companyForm.get('personType'); }
  get cnpj() { return this.companyForm.get('cnpj'); }
  get cpf() { return this.companyForm.get('cpf'); }

  
  ngOnInit() {
  }

  postCompany() {
    console.log(this.companyForm.value);
  }

}
