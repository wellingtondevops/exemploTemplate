import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Pipes {
  datePipe(value: any, ...args: any[]) {
    return new Date(value).toLocaleDateString('pt-BR').split(',')[0];
  }
  guardType(value: any, ...args: any[]) {
    let res = '';
    switch (value) {
      case 'GERENCIADA':
        res = 'G';
        break;
      case 'SIMPLES':
        res = 'S';
        break;
    }
    return res;
  }

  status(value: any, ...args: any[]) {
    return `<i class="fa fa-circle color-${value[0]}"></i>`;
  }

}


