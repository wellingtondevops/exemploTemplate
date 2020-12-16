import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { CompaniesRoutingModule } from '../layout/companies/companies-routing.module';

@Injectable()
export class CaseInsensitive {
  constructor(){

  }

  replaceSpecialChars = function(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[éèê]/, "e");
    str = str.replace(/[óòôõ]/, "o");
    str = str.replace(/[ÈÉÊË]/, "E");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");
    // o resto

    return str.replace(/[^a-z0-9]/gi, '');
  }
}