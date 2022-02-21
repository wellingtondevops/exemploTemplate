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
                        element: '#passo1',
                        intro:
                            'Nesta área você pode utilizar os filtros de pesquisa, para ter uma busca com melhores resultados.',
                    },
                    {
                        element: '#passo2',
                        intro:
                            'Ultilize a <strong>Lupa</strong> para realizar sua pesquisa, caso queira realizar outra busca, basta utilizar <strong>Limpar Campos</strong> para limpar os campos dos filtros.',
                        tooltipPosition: 'bottom',
                    }, {
                        element: '#passo3',
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
                        element: '#passo1',
                        intro:
                            '<strong>Bem-vindo a criação de Usuário!</strong></br>Preencha estes capos com as informações do novo usuário.',
                    },
                    {
                        element: '#passo2',
                        intro:
                            'Marque as opções para dar permissão ou desmarque para não permitir',
                    },
                    {
                        element: '#passo3',
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
                        element: '#passo1',
                        intro:
                            '<strong>Bem-vindo as informações do Usuário!</strong></br>Utilize a seta para retornar a página de pesquisa.<br/> <strong>Alterar</strong> para alterar informações do usuário ou <strong>Excluir </strong> para deletar o usuário.',
                    },
                    {
                        element: '#passo2',
                        intro:
                            'Informações referentes ao usuário, podem ser <strong>Editadas </strong>, utilizando o botão <strong>Alterar</strong>',
                    },
                    {
                        element: '#passo3',
                        intro:
                            'Lista das <strong>Empresas </strong> que o usuário tem permissão, empresas adicionadas aparecerão aqui.<br/> <strong>Clique</strong> sobre o nome da empresa, para adicionar documentos.',
                    },
                    {
                        element: '#passo4',
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
                        element: '#passo1',
                        intro:
                            '<strong>Bem-vindo a edição de Usuário!</strong></br>Altere informações ou permissões do usuário.',
                    },
                    {
                        element: '#passo2',
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
                        element: '#passo1',
                        intro:
                            '<strong>Bem-vindo as informações de permissões do Usuário!</strong></br>Nome da <strong>Empresa</strong> que está adicionando permissões.',
                    },
                    {
                        element: '#passo2',
                        intro:
                            'Utilize a <strong>Seta </strong> para, retornar a página anterior ou, o botão <strong>Excluir</strong>, para remover a empresa da lista de permissões do usuário.',
                    },
                    {
                        element: '#passo3',
                        intro:
                            'Lista de <strong>Documentos </strong> que o usuário tem permissão, documentos adicionadas ou removidos aparecerão aqui.',
                    },
                    {
                        element: '#passo4',
                        intro:
                            'Utilize o botão para <strong>Adicionar</strong>, documentos permitidos ao usuário. Marque as opções para adicionar e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#passo5',
                        intro:
                            'Utilize o botão para <strong>Remover</strong>, documentos permitidos ao usuário. Desmarque as opções para remover e, não se esqueça de <strong>Salvar</strong>.',
                    },
                    {
                        element: '#passo6',
                        intro:
                            'Lista de <strong>Perfis </strong> que o usuário possui, perfis adicionadas ou removidos aparecerão aqui.',
                    },
                    {
                        element: '#passo7',
                        intro:
                            'Utilize o botão para <strong>Adicionar</strong>, perfis de permissões ao usuário. Marque as opções para adicionar e, não se esqueça de <strong>Salvar',
                    },
                    {
                        element: '#passo8',
                        intro:
                            'Utilize o botão para <strong>Remover</strong>, perfis de permissão ao usuário. Desmarque as opções para remover e, não se esqueça de <strong>Salvar',
                    },
                ]
            })
            .start();
    }

    featureTwo() {
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
                            '<strong>Bem-vindo a pesquisa de Arquivos!</strong><br/> Nesta área você possui filtros de pesquisa, sendo a Empresa um campo <strong>obrigatório</strong> e o restante dos campos opcionais.',
                    },
                    {
                        element: '#step2',
                        intro:
                            '<strong>Botões de Pesquisa</strong></br>Inicie sua pesquisa para buscar documentos conforme filtros ou limpe os campos, para uma nova pesquisa.',
                    },
                    {
                        element: '#step3',
                        intro:
                            'Nesta área vocẽ é exibido os resultados da pesquisa, e clicando na linha desejada terá acesso ao documento!',
                        tooltipPosition: 'bottom',
                    },
                ]
            })
            .start();
    }
}
