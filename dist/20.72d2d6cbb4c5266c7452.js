(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{UE8e:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=function(){return function(){}}(),i=u("9AJC"),r=u("pMnS"),a=u("ZYCi"),d=u("Ip0R"),o=u("rn77"),s=function(){function l(l){this.daenerysGuard=l,this.alerts=[],this.sliders=[],this.sliders.push({imagePath:"assets/images/slider1.jpg",label:"First slide label",text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},{imagePath:"assets/images/slider2.jpg",label:"Second slide label",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{imagePath:"assets/images/slider3.jpg",label:"Third slide label",text:"Praesent commodo cursus magna, vel scelerisque nisl consectetur."}),this.alerts.push({id:1,type:"success",message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n                Voluptates est animi quibusdam praesentium quam, et perspiciatis,\n                consectetur velit culpa molestias dignissimos\n                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum"},{id:2,type:"warning",message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n                Voluptates est animi quibusdam praesentium quam, et perspiciatis,\n                consectetur velit culpa molestias dignissimos\n                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum"})}return l.prototype.ngOnInit=function(){this.permissionAdmin=this.isAdmin(),this.permissionPesquisador=this.isSnow(),this.permissionArquivador=this.isTywin()},l.prototype.isAdmin=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"DAENERYS"===n&&(l=!0)}),l},l.prototype.isSnow=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"SNOW"===n&&(l=!0)}),l},l.prototype.isTywin=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"TYWIN"===n&&(l=!0)}),l},l.prototype.closeAlert=function(l){var n=this.alerts.indexOf(l);this.alerts.splice(n,1)},l}(),c=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function f(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-12"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[2,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,1,{links:1}),e["\u0275qud"](603979776,2,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-search fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["PROCURAR"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Pesquisa de Documentos"]))],function(l,n){var u=l(n,2,0,"/archives");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function m(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[4,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,3,{links:1}),e["\u0275qud"](603979776,4,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-users fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Usu\xe1rios"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Cria\xe7\xe3o de Usu\xe1rios"]))],function(l,n){var u=l(n,2,0,"/users");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[6,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,5,{links:1}),e["\u0275qud"](603979776,6,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-envelope fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Solicitantes de Documentos"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Cria\xe7\xe3o de Usu\xe1rios que solicitam documenta\xe7\xe3o F\xedsica"]))],function(l,n){var u=l(n,2,0,"/not-found");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function p(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[8,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,7,{links:1}),e["\u0275qud"](603979776,8,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-home fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Dep\xf3sitos"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Configura\xe7\xf5es e Cria\xe7\xe3o de Dep\xf3sitos"]))],function(l,n){var u=l(n,2,0,"/storehouses");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[10,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,9,{links:1}),e["\u0275qud"](603979776,10,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-building fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Empresas"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Empresas Cadastradas"]))],function(l,n){var u=l(n,2,0,"/companies");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function g(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[12,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,11,{links:1}),e["\u0275qud"](603979776,12,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-archive fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Volumes"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Configura\xe7\xf5es e Cria\xe7\xe3o de Volumes"]))],function(l,n){var u=l(n,2,0,"/volumes");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,15,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[14,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,13,{links:1}),e["\u0275qud"](603979776,14,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-book fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Documentos"])),(l()(),e["\u0275eld"](14,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Configura\xe7\xf5es e Cria\xe7\xe3o de Documentos"]))],function(l,n){var u=l(n,2,0,"/documents");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,14,"a",[["class","col-sm-4"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](1,671744,[[16,4]],0,a.o,[a.l,a.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](2,1),e["\u0275did"](3,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,15,{links:1}),e["\u0275qud"](603979776,16,{linksWithHrefs:1}),e["\u0275pad"](6,1),(l()(),e["\u0275eld"](7,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-wpforms fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Registro de Arquivos"])),(l()(),e["\u0275eld"](13,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Indexa\xe7\xe3o ou Cataloga\xe7\xe3o"]))],function(l,n){var u=l(n,2,0,"/archives");l(n,1,0,u);var e=l(n,6,0,"router-link-active");l(n,3,0,e)},function(l,n){l(n,0,0,e["\u0275nov"](n,1).target,e["\u0275nov"](n,1).href)})}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,12,"div",[["class","col-sm-4"]],null,null,null,null,null)),e["\u0275did"](1,1720320,null,2,a.n,[a.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,17,{links:1}),e["\u0275qud"](603979776,18,{linksWithHrefs:1}),e["\u0275pad"](4,1),(l()(),e["\u0275eld"](5,0,null,null,7,"div",[["class","card text-white bg-dark mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-truck fa-4x"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Movimenta\xe7\xf5es"])),(l()(),e["\u0275eld"](11,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Emprestar Documentos F\xedsicos"]))],function(l,n){var u=l(n,4,0,"router-link-active");l(n,1,0,u)},null)}function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,22,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h2",[["class","text-muted"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Dashboard"])),(l()(),e["\u0275eld"](3,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,18,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,f)),e["\u0275did"](6,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,m)),e["\u0275did"](8,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,v)),e["\u0275did"](10,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,p)),e["\u0275did"](12,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,h)),e["\u0275did"](14,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,g)),e["\u0275did"](16,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,k)),e["\u0275did"](18,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](20,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](22,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,6,0,u.permissionPesquisador||u.permissionArquivador||u.permissionAdmin),l(n,8,0,u.permissionAdmin),l(n,10,0,u.permissionAdmin),l(n,12,0,u.permissionAdmin||u.permissionArquivador),l(n,14,0,u.permissionAdmin||u.permissionArquivador),l(n,16,0,u.permissionAdmin||u.permissionArquivador),l(n,18,0,u.permissionAdmin||u.permissionArquivador),l(n,20,0,u.permissionAdmin||u.permissionArquivador),l(n,22,0,u.permissionAdmin)},function(l,n){l(n,0,0,void 0)})}function L(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-dashboard",[],null,null,null,b,c)),e["\u0275did"](1,114688,null,0,s,[o.a],null,null)],function(l,n){l(n,1,0)},null)}var C=e["\u0275ccf"]("app-dashboard",s,L,{},{},[]),A=u("4GxJ"),w=function(){return function(){}}(),q=u("MviD");u.d(n,"DashboardModuleNgFactory",function(){return I});var I=e["\u0275cmf"](t,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,r.a,C]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[e.LOCALE_ID,[2,d["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](1073742336,d.CommonModule,d.CommonModule,[]),e["\u0275mpd"](1073742336,A.n,A.n,[]),e["\u0275mpd"](1073742336,A.h,A.h,[]),e["\u0275mpd"](1073742336,a.p,a.p,[[2,a.v],[2,a.l]]),e["\u0275mpd"](1073742336,w,w,[]),e["\u0275mpd"](1073742336,q.a,q.a,[]),e["\u0275mpd"](1073742336,t,t,[]),e["\u0275mpd"](1024,a.j,function(){return[[{path:"",component:s}]]},[])])})},rn77:function(l,n,u){"use strict";u.d(n,"a",function(){return i});var e=u("CcnG"),t=u("ZYCi"),i=function(){function l(l){this.router=l}return l.isDaenerys=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"DAENERYS"===n&&(l=!0)}),l},l.prototype.canActivate=function(n,u){return!!l.isDaenerys()||(this.router.navigate(["/not-authorized"]),!1)},l.ngInjectableDef=e.defineInjectable({factory:function(){return new l(e.inject(t.l))},token:l,providedIn:"root"}),l}()}}]);