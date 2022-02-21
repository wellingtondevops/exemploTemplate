import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';

@Injectable({
    providedIn: 'root'
})
export class IntroJsService {
    introJS = null;

    constructor() { }

    IntroUser() {
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

    IntroNewUser() {
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

    IntroShowUser() {
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
