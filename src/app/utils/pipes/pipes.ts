import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Pipes {
  datePipe(value: any, ...args: any[]) {
    return new Date(value).toLocaleDateString('pt-BR').split(',')[0];
  }
}
