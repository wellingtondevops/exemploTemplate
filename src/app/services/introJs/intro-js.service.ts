import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';

@Injectable({
    providedIn: 'root'
})
export class IntroJsService {
    introJS = null;

    constructor() { }

    ListUser() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#newUser',
                        intro:
                            '<strong>Bem-vindo a pesquisa de Usuário!</strong></br>Para criar um novo usuário, basta usar esta opção.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo a criação de Usuário!</strong></br>Preencha estes capos com as informações do novo usuário.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo as informações do Usuário!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações do usuário ou <strong>Excluir </strong> para deletar o usuário.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo a edição de Usuário!</strong></br>Altere informações ou permissões do usuário.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo as informações de permissões do Usuário!</strong></br>Nome da <strong>Empresa</strong> que está adicionando permissões.',
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

    ListAccess() {
        this.introJS = introJs();
        this.introJS.start();

        this.introJS
            .setOptions({
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo a pesquisa de Perfis!</strong></br>Para criar um novo perfil, basta usar esta opção.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo a criação de Perfis!</strong></br>Preencha estes capos com as informações do novo perfil.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo as informações de Perfis!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações do perfil ou <strong>Excluir </strong> para deletar o perfil.',
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
                nextLabel: 'Proximo',
                prevLabel: 'Anterior',
                doneLabel: 'Finalizar',
                showProgress: true,
                showBullets: false,
                steps: [
                    {
                        element: '#step1',
                        intro:
                            '<strong>Bem-vindo a edição de Perfis!</strong></br>Altere informações, referentes ao perfil.',
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
}
