import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Injectable()
export class Masks {
  fone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cep = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  cnpj = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cpf = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  money = function (value: string) {
    let numberMask = createNumberMask({
      prefix: 'R$ ',
      includeThousandsSeparator: false,
      allowDecimal: false,
      allowFloat: true,
      decimalSymbol: ',',
      integerLimit: null,
      requireDecimal: true
    })
		let mask = numberMask(value);
		return mask;
  }

}
