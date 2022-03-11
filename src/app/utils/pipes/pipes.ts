import { NgIf } from '@angular/common';
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
        if (records === true) {
            return `
                <abbr title="Possui arquivos"><i class="mdi mdi-archive mdi-36px"></i></abbr>`;
        } else {
            return `
                <abbr title="Não possui arquivos"><i class="mdi mdi-archive-remove mdi-36px"></abbr>`;
        }
        // const myRecords = (records === true ? 'Possui Arquivos' : 'Não Possui Arquivos');
        // return myRecords;
    }

    statusVolume(value: any, ...args: any[]) {
        if (value == 'ATIVO') {
            return `<abbr title="ARQUIVO">
                        <i class="mdi mdi-alpha-a-circle mdi-36px"></i>
                    </abbr>`;
        } if (value == 'BAIXADO') {
            return `<abbr title="BAIXADO" >
                        <i class="mdi mdi-alpha-b-circle mdi-36px"></i>
                    </abbr>`;
        }if (value == 'EMPRESTADO') {
            return `<abbr title="EMPRESTADO" >
                        <i class="mdi mdi-alpha-e-circle mdi-36px"></i>
                    </abbr>`;
        }
    }

    guardTypeVolume(value: any, ...args: any[]) {
        if (value == 'SIMPLES') {
            return `<abbr title="Tipo de guarda SIMPLES">
                        <i class="mdi mdi-alpha-s-circle mdi-36px"></i>
                    </abbr>`;
        } if (value == 'GERENCIADA') {
            return `<abbr title="Tipo de guarda GERENCIADA" >
                        <i class="mdi mdi-alpha-g-circle mdi-36px"></i>
                    </abbr>`;
        }
    }

    boxType(closeBox: boolean) {
        if (closeBox === true) {
            return `
                <abbr title="Volume fechado"><i class="mdi mdi-archive-lock mdi-36px"></i></abbr>`;
        } else {
            return `
                <abbr title="Volume aberto"><i class="mdi mdi-archive-eye mdi-36px"></abbr>`;
        }
        // const box = (closeBox === true ? 'Volume Fechado' : 'Volume Aberto');
        // return box;
    }

}


