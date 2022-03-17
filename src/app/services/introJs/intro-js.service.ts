import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
@Injectable({
    providedIn: 'root'
})


export class IntroJsService {
    introJS = null;

    constructor() { }

    // Depósitos
    ListStoreHouse() {
        this.introJS = introJs();
        this.introJS.start();
        this.introJS.dark();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Despósitos!</strong>.<br/> Clique em <strong>Novo Depósito</strong>, para criar um depósito.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar o filtro de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no depósito desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewStoreHouse() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Depósitos!</strong></br>Preencha estes campos com as informações do novo Depósito.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo depósito ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowStoreHouse() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Depósito!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o depósito.',
                    },
                    {
                        element: '#tab1',
                        intro:
                            'Informações gerais sobre o depósito, para saber mais informações navegue entre as abas',
                    },
                    {
                        element: '#tab2',
                        intro:
                            'Utilize esta aba para pesquisar posições disponiveis no depósito, para uma pesquisa mais refinada, utilize as opções de filtros.',
                    },
                    {
                        element: '#tab3',
                        intro:
                            'Informações gráficas referentes ao depósito.',
                    },
                ]
            })
            .start();
    }

    EditStoreHouse() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Depósito!</strong></br>Altere informações ou permissões.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    // Empresas
    ListCompany() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Empresas!</strong>.<br/> Clique em <strong>Nova Empresa</strong>, para criar uma Empresa.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar o filtro de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no depósito desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewCompany() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Empresas!</strong></br>Preencha estes campos com as informações da nova Empresa.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação da  nova empresa ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowCompany() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações da Empresa!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar a empresa.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre a Empresa, para saber mais informações navegue entre as abas',
                    }
                ]
            })
            .start();
    }

    EditCompany() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Empresa!</strong></br>Altere informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    // Departamentos
    ListDepartment() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Departamentos!</strong>.<br/> Clique em <strong>Novo Departamento</strong>, para criar um departamento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar o filtro de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no depósito desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewDepartment() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Departamento!</strong></br>Preencha estes campos com as informações do novo departamento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação da  nova empresa ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowDepartment() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Departamento!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Departamento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre o Departamento',
                    }
                ]
            })
            .start();
    }

    EditDepartment() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Empresa!</strong></br>Altere informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    // Volumes
    importVolumes() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a importação de Volumes!</strong></br>Adicione as informações referentes ao volume. <br/> Todos os campos são obrigatorios!',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Clique  em <strong>Escolher Arquivo </strong> e selecione o arquivo que deseja importar.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Depois de escolher o aquivo, utilize <strong>Salvar</strong>, para concluir a importação ou, <strong>Voltar</strong> para retornar sem importar.',
                    },
                ]
            })
            .start();
    }

    volumeErrors() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de erros de importação de volumes! <br/> </strong>Nesta área você pode utilizar o filtro de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, clique em <strong>Download</strong> para baixar o arquivo desejado.'
                    }
                ]
            })
            .start();
    }

    ListVolumes() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Volumes!</strong>.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no volume desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewVolume() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Volume!</strong></br>Preencha estes campos com as informações do novo volume.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo volume ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowVolumes() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Volume!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Volume.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre o Departamento',
                    }
                ]
            })
            .start();
    }

    EditVolumes() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Volumes!</strong></br>Altere informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    // Documentos
    ListDocuments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de documentos!</strong><br/> Clique em <strong>Novo Documento</strong>, para criar um documento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no documento desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewDocuments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Documento!</strong></br>Preencha estes campos com as informações do novo documento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo documento ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowDocuments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Documento!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Documento.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre o Documento',
                    }
                ]
            })
            .start();
    }

    EditDocuments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Documentos!</strong></br>Altere informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    //Plano de Classificação
    ListDocStructur() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Plano de Classificação!</strong><br/> Clique em <strong>Novo Plano de Classificação</strong>, para criar um plano de classificação.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Aqui é exibido os <strong>Planos de Classificação</strong>, para mais detalhes basta clicar, no plano desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewDocStructur() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Estrutura Documental!</strong></br>Preencha estes campos com as informações do novo estrutura.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação da nova estrutura ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowDocStructur() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Plano de Classificação!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Plano de Classificação.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre a <strong>Estrutura Documental</strong>',
                    }
                ]
            })
            .start();
    }

    EditDocStructur() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Estrutura Documental!</strong></br>Altere informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }
    // Arquivos
    importArchives() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a importação de Arquivos!</strong></br>Adicione as informações referentes ao arquivo. <br/> Todos os campos são obrigatorios!',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Clique  em <strong>Escolher Arquivo </strong> e selecione o arquivo que deseja importar. Depois de escolher o aquivo, utilize <strong>Importar</strong>, para concluir a importação.',
                    },
                ]
            })
            .start();
    }

    archivesErrors() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de erros de importação de arquivos! <br/> </strong>Nesta área você pode utilizar o filtro de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, clique em <strong>Download</strong> para baixar o arquivo desejado.'
                    }
                ]
            })
            .start();
    }

    ListArchives() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Arquivos!</strong>.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Os campos <strong>Documento</strong> e <strong>Índice</strong> podem ser utilizados para uma melhor filtragem de arquivos.',
                        tooltipPosition: 'bottom',
                    },
                    {
                        element: '#step4',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step5',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no arquivo desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    ShowArchives() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Arquivo!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Arquivo.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais sobre o Arquivo',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Para solicitar uma <strong>Alterção </strong> no arquivo, informe o tipo de alteração e solicite, utilizando o botão enviar.(Obeservções não são obrigatórias)',
                    }
                    ,
                    {
                        element: '#step4',
                        intro:
                            'Prévia do Arquivo',
                    },
                    {
                        element: '#step5',
                        intro:
                            'Informações referentes a temporalidade do arquivo',
                    },
                    {
                        element: '#step6',
                        intro:
                            'Informações sobre o  autor do arquivo',
                    }
                ]
            })
            .start();
    }

    EditArchives() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Arquivos!</strong></br>Utilize, <strong>Cancelar</strong> para retornar sem alterar as informações.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Os seguintes <strong>Campos </strong> podem ser alterados, utilize <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    //Digitalizacao
    ListBatches() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Lotes!</strong><br/> Clique em <strong>Novo Lote</strong>, para criar um lote.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no lote desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewBatches() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Lotes!</strong></br>Preencha estes campos com as informações do novo lote.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo lote ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ControlBatches() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) ao Controle de Lote!</strong></br>Utilize a seta para retornar a página anterior.',
                    },
                    {
                        element: '#tab1',
                        intro:
                            'Navegue entre as abas, para obter informações gerais sobre o Lote',
                    },
                    {
                        element: '#tab2',
                        intro:
                            'Utilize esta aba para obter dados da Planilha ou importar novas Planilhas',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações gerais referentes ao lote, previa dos arquivos.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Utilize <strong>Indexar</strong> para ir a indexação dos arquivos, <strong>Excluir Lote</strong> para excluir o lote atual.',
                    },
                    {
                        element: '#step4',
                        intro:
                            'Escolha os arquivos e clique em importar, para importar novos arquivos',
                    }
                ]
            })
            .start();
    }

    indexNew() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a Indexação!</strong></br>Utilize a seta para retornar a página anterior.<br/>Utilize <strong>Excluir </strong> para deletar o Lote.',
                    },
                    {
                        element: '#dados',
                        intro:
                            'Informações gerais sobre o Lote',
                    },
                    {
                        element: '#position',
                        intro:
                            'Utilize para pesquisar Posições',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações referentes a empresa',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Informe os campos, e utiliza salvar, para indexar e ir para o proximo arquivo',
                    }
                ]
            })
            .start();
    }

    //Movimentacoes
    ListMoviments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de movimentações!</strong><br/> Clique em <strong>Nova Movimentação</strong>, para criar uma movimentação.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, na movimentação desejada.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewMoviments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Movimentações!</strong></br>Preencha estes campos com as informações da nova movimentação.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação da nova movimentação.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowMoviments() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações da Movimentação!</strong></br>Utilize a seta para retornar a página de pesquisa.',
                    },
                    {
                        element: '#tab1',
                        intro:
                            'Navegue entre as <strong>Abas</strong> para mais informações',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Informações referentes a <strong>Movimentação</strong>',
                    }
                ]
            })
            .start();
    }

    //Relatorios
    ListReports() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de relatórios!</strong><br/>Utilize os filtros de pesquisa, para ter uma busca com melhores resultados.<br/> O campo <strong>Empresa</strong>, é obrigatorio para efetuar uma pesquisa, os demais campos são opcionais.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área será exibido o resultado da pesquisa,'
                    },
                ]
            })
            .start();
    }

    // Usuario
    ListUser() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#newUser',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Usuário!</strong></br>Para criar um novo usuário, basta usar esta opção.',
                    },
                    {
                        element: '#step1',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step3',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no usuário desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewUser() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Usuário!</strong></br>Preencha estes capos com as informações do novo usuário.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Marque as opções para dar permissão ou desmarque para não permitir',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo usuário ou <strong>Voltar</strong> para retornar a pagina de pesquisa. <br/> Documentos que o usuário terá acesso, são adicionados na proxima pagina!',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowUser() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do Usuário!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações do usuário ou <strong>Excluir </strong> para deletar o usuário.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações referentes ao usuário, podem ser <strong>Editadas </strong>, utilizando o botão <strong>Alterar</strong>',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Lista das <strong>Empresas </strong> que o usuário tem permissão, empresas adicionadas aparecerão aqui.<br/> <strong>Clique</strong> sobre o nome da empresa, para adicionar documentos.',
                    },
                    {
                        element: '#step4',
                        intro:
                            'Use este botão para <strong>Adicionar </strong> mais empresas a lista.',
                    },
                ]
            })
            .start();
    }

    EditUser() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Usuário!</strong></br>Altere informações ou permissões do usuário.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    UserPermission() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações de permissões do Usuário!</strong></br>Nome da <strong>Empresa</strong> que está adicionando permissões.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Utilize a <strong>Seta </strong> para, retornar a página anterior ou, o botão <strong>Excluir</strong>, para remover a empresa da lista de permissões do usuário.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Lista de <strong>Documentos </strong> que o usuário tem permissão, documentos adicionados ou removidos aparecerão aqui.',
                    },
                    {
                        element: '#step4',
                        intro:
                            'Utilize o botão para <strong>Adicionar</strong>, documentos permitidos ao usuário. Marque as opções para adicionar e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#step5',
                        intro:
                            'Utilize o botão para <strong>Remover</strong>, documentos permitidos ao usuário. Desmarque as opções para remover e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#step6',
                        intro:
                            'Lista de <strong>Perfis </strong> que o usuário possui, perfis adicionados ou removidos aparecerão aqui.',
                    },
                    {
                        element: '#step7',
                        intro:
                            'Utilize o botão para <strong>Adicionar</strong>, perfis de permissões ao usuário. Marque as opções para adicionar e, não se esqueça de <strong>Salvar',
                    },
                    {
                        element: '#step8',
                        intro:
                            'Utilize o botão para <strong>Remover</strong>, perfis de permissão ao usuário. Desmarque as opções para remover e, não se esqueça de <strong>Salvar',
                    },
                ]
            })
            .start();
    }

    // Perfis de Acesso
    ListAccess() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Perfis!</strong></br>Para criar um novo perfil, basta usar esta opção.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no usuário desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewAccess() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Perfis!</strong></br>Preencha estes capos com as informações do novo perfil.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Ultilize <strong>Salvar </strong> para concluir a criação do novo perfil ou <strong>Voltar</strong> para retornar a pagina de pesquisa.',
                        tooltipPosition: 'bottom',
                    }
                ]
            })
            .start();
    }

    ShowAccess() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações de Perfis!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações do perfil ou <strong>Excluir </strong> para deletar o perfil.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações referentes ao perfil, podem ser <strong>Editadas</strong>, utilizando o botão <strong>Alterar</strong>',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Lista das <strong>Permissões</strong> que o perfil possui.<br/> <strong>Clique</strong> para exibir os documentos permitidos.',
                    }
                ]
            })
            .start();
    }

    EditAccess() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Perfis!</strong></br>Altere informações, referentes ao perfil.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Lista de <strong>Permissões</strong> do perfil, documentos adicionados ou retirados aparecerão aqui.',
                    }, {
                        element: '#step3',
                        intro:
                            'Utilize o botão para <strong>Adicionar</strong> documentos permitidos ao perfil. Marque as opções para adicionar e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#step4',
                        intro:
                            'Utilize o botão para <strong>Remover</strong> documentos permitidos ao perfil. Desmarque as opções para remover e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#step5',
                        intro:
                            'Utilize <strong>Cancelar </strong> para retornar a página anterior, sem efetuar alterações ou, <strong>Salvar</strong>, para retornar a pagina anterior com as alterações feitas.',
                    },
                ]
            })
            .start();
    }

    //Valores dos Serviços
    ListCompServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Valores de Serviços!</strong><br/> Clique em <strong>Novos Valores de Serviços</strong>, para criar um Serviço.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no serviço desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewCompServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Valores de Serviços!</strong></br>Preencha os campos com as informações do novo serviço.<br/> Ultilize <strong>Salvar </strong> para concluir a criação do novo serviço ou voltar para retornar a pesquisa.',
                    }
                ]
            })
            .start();
    }

    ShowCompServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a informações de Valores de Serviços!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Serviço.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informções referentes a valores de serviço',
                    }
                ]
            })
            .start();
    }

    EditCompServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Valores de Serviços!</strong></br>Altere o campo com a informações do serviço.<br/> Ultilize <strong>Salvar </strong> para concluir a edição do serviço ou voltar para retornar a pesquisa.',
                    }
                ]
            })
            .start();
    }

    //Serviços
    ListMenuServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a pesquisa de Serviços!</strong><br/> Clique em <strong>Novo Serviço</strong>, para criar um Serviço.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#step4',
                        intro:
                            'Aqui será exibido o <strong>Resultado</strong> de sua pesquisa, para mais detalhes basta clicar, no serviço desejado.',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }

    NewMenuServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a criação de Serviços!</strong></br>Preencha o campo com as informações do novo serviço.<br/> Ultilize <strong>Salvar </strong> para concluir a criação do novo serviço ou voltar para retornar a pesquisa.',
                    }
                ]
            })
            .start();
    }

    ShowMenuServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a informações de Serviços!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações ou <strong>Excluir </strong> para deletar o Serviço.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informções referentes ao serviço',
                    }
                ]
            })
            .start();
    }

    EditarMenuServices() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a edição de Serviços!</strong></br>Altere o campo com a informações do serviço.<br/> Ultilize <strong>Salvar </strong> para concluir a edição do serviço ou voltar para retornar a pesquisa.',
                    }
                ]
            })
            .start();
    }

    // Emaisl
    ListEmails() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) a caixa de e-mails!</strong><br/>Utilize o botão para <strong>Atualizar</strong>, a lista de e-mails.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Nesta área estão todos seus e-mails.<br/> Clique para obter mais informções. <br/>Na lista, e-mails com a coloração branca, ainda não foram visualizados.',
                    }
                ]
            })
            .start();
    }

    ShowEmails() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                tooltipClass: 'customTooltip',
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo(a) as informações do E-mail!</strong></br>Utilize a seta para retornar.<br/>Utilize <strong>Excluir </strong> para deletar o E-mail.',
                    },
                    {
                        element: '#step2',
                        intro:
                            'Informações sobre o <strong>Solicitante</strong>.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Informações referentes a <strong>Solicitação</strong>. <br/>Utilize <strong>Ver Aquivo</strong>, para ser direcionado ao arquivo.',
                    }
                ]
            })
            .start();
    }
}
