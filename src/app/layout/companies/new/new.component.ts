import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { PersonTypeEnum } from '../../../models/persontype.enum';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  companyForm: FormGroup;
  personTypeList: any = [];
  hiddenCPF: Boolean = true;
  hiddenCNPJ: Boolean = true;
  departaments: any = [];

  constructor(
    private fb: FormBuilder,
  ) { 
    this.personTypeList = PersonTypeEnum;
    console.log(this.personTypeList)
    
    this.companyForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      adress: this.fb.control('', [Validators.required]),
      province: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      fone: this.fb.control('', [Validators.required]),
      answerable: this.fb.control('', [Validators.required]),
      typePerson: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('', [Validators.required]),
      cnpj: this.fb.control('', [Validators.required]),
      departaments: this.fb.array(this.departaments),
    });
  }

  get name() { return this.companyForm.get('name'); }
  get adress() { return this.companyForm.get('adress'); }
  get province() { return this.companyForm.get('province'); }
  get city() { return this.companyForm.get('city'); }
  get fone() { return this.companyForm.get('fone'); }
  get answerable() { return this.companyForm.get('answerable'); }
  get typePerson() { return this.companyForm.get('typePerson'); }
  get cnpj() { return this.companyForm.get('cnpj'); }
  get cpf() { return this.companyForm.get('cpf'); }

  
  ngOnInit() {
  }

  removeDepartament(e) {
    this.departaments.removeAt(e)
  }

  createDepartament(): FormGroup {
    return this.fb.group({
      departamentName: '',
      company: ''
    });
  }

  addDepartament(): void {
    this.departaments = this.companyForm.get('departaments') as FormArray;
    this.departaments.push(this.createDepartament());
  }

  postCompany() {
    console.log(this.companyForm.value);
  }

  typePersonChange() {
    console.log(this.companyForm.value.typePerson);
    switch (this.companyForm.value.typePerson) {
      case 'JURIDICA':
          this.hiddenCPF = true;
          this.hiddenCNPJ = false;
          this.companyForm.addControl('cnpj', new FormControl('', [Validators.required]));
          this.companyForm.removeControl('cpf');
        break;
      case 'FISICA':
          this.hiddenCNPJ = true;
          this.hiddenCPF = false;
          this.companyForm.addControl('cpf', new FormControl('', [Validators.required]));
          this.companyForm.addControl('cnpj', new FormControl(''));
        break;
    }
  }
}

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}
