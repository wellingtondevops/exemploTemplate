import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Pipes {
    datePipe(value: any, ...args: any[]) {
        if (value) {
            return new Date(value).toLocaleDateString('pt-BR').split(',')[0];
        }
        return null;
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


    isPdf(url: string) {
        if (url.indexOf('.pdf') !== -1) {
            return true;
        }
        return false;
    }

    recordsType(records: boolean) {
        const myRecords = (records === true ? 'Possui Arquivos' : 'Não Possui Arquivos');
        return myRecords;
    }

    boxType(closeBox: boolean) {
        const box = (closeBox === true ? 'Volume Fechado' : 'Volume Aberto');
        return box;
    }


}


