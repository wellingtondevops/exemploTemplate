(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"/cdV":function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),r=e("4GxJ"),i=e("Ip0R"),a=e("ZYCi"),d=e("A7o+"),s=function(){function n(n,l){var e=this;this.translate=n,this.router=l,this.email="",this.router.events.subscribe(function(n){n instanceof a.d&&window.innerWidth<=992&&e.isToggled()&&e.toggleSidebar()})}return n.prototype.ngOnInit=function(){this.pushRightClass="push-right",this.email=window.localStorage.getItem("email")},n.prototype.isToggled=function(){return document.querySelector("body").classList.contains(this.pushRightClass)},n.prototype.toggleSidebar=function(){document.querySelector("body").classList.toggle(this.pushRightClass)},n.prototype.rltAndLtr=function(){document.querySelector("body").classList.toggle("rtl")},n.prototype.onLoggedout=function(){localStorage.removeItem("isLoggedin"),localStorage.removeItem("token"),localStorage.removeItem("email"),localStorage.removeItem("profiles")},n.prototype.changeLang=function(n){this.translate.use(n)},n}(),c=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]{background-color:#222}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{color:#999}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{color:#fff}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]{width:300px}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media[_ngcontent-%COMP%]{border-bottom:1px solid #ddd;padding:5px 10px}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media[_ngcontent-%COMP%]:last-child{border-bottom:none}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:13px;font-weight:600}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   .last[_ngcontent-%COMP%]{font-size:12px;margin:0}"]],data:{}});function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,34,"nav",[["class","navbar navbar-expand-lg fixed-top"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"a",[["class","navbar-brand"],["href","#"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["ARCHIO"])),(n()(),t["\u0275eld"](3,0,null,null,1,"button",[["class","navbar-toggler"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.toggleSidebar()&&t),t},null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-bars text-muted"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,29,"div",[["class","collapse navbar-collapse"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,28,"ul",[["class","navbar-nav ml-auto"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,27,"li",[["class","nav-item dropdown"],["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t["\u0275did"](8,212992,null,2,r.v,[t.ChangeDetectorRef,r.w,i.DOCUMENT,t.NgZone],null,null),t["\u0275qud"](335544320,1,{_menu:0}),t["\u0275qud"](335544320,2,{_anchor:0}),(n()(),t["\u0275eld"](11,0,null,null,5,"a",[["aria-haspopup","true"],["class","nav-link dropdown-toggle"],["href","javascript:void(0)"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,12).toggleOpen()&&o),o},null,null)),t["\u0275did"](12,16384,null,0,r.sb,[r.v,t.ElementRef],null,null),t["\u0275prd"](2048,[[2,4]],r.rb,null,[r.sb]),(n()(),t["\u0275eld"](14,0,null,null,0,"i",[["class","fa fa-user"]],null,null,null,null,null)),(n()(),t["\u0275ted"](15,null,[" "," "])),(n()(),t["\u0275eld"](16,0,null,null,0,"b",[["class","caret"]],null,null,null,null,null)),(n()(),t["\u0275eld"](17,0,null,null,17,"div",[["class","dropdown-menu-right"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],null,null,null,null)),t["\u0275did"](18,16384,[[1,4]],0,r.qb,[r.v,t.ElementRef,t.Renderer2],null,null),(n()(),t["\u0275eld"](19,0,null,null,9,"a",[["class","dropdown-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,20).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](20,671744,[[4,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](21,1),t["\u0275did"](22,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,3,{links:1}),t["\u0275qud"](603979776,4,{linksWithHrefs:1}),t["\u0275pad"](25,1),(n()(),t["\u0275eld"](26,0,null,null,0,"i",[["class","fa fa-fw fa-user"]],null,null,null,null,null)),(n()(),t["\u0275ted"](27,null,[" "," "])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](29,0,null,null,5,"a",[["class","dropdown-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0,u=n.component;return"click"===l&&(o=!1!==t["\u0275nov"](n,30).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),"click"===l&&(o=!1!==u.onLoggedout()&&o),o},null,null)),t["\u0275did"](30,671744,null,0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](31,1),(n()(),t["\u0275eld"](32,0,null,null,0,"i",[["class","fa fa-fw fa-power-off"]],null,null,null,null,null)),(n()(),t["\u0275ted"](33,null,[" "," "])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){n(l,8,0);var e=n(l,21,0,"/users/alter");n(l,20,0,e);var t=n(l,25,0,"router-link-active");n(l,22,0,t);var o=n(l,31,0,"/login");n(l,30,0,o)},function(n,l){var e=l.component;n(l,7,0,t["\u0275nov"](l,8).isOpen()),n(l,11,0,t["\u0275nov"](l,12).dropdown.isOpen()),n(l,15,0,e.email),n(l,17,0,!0,t["\u0275nov"](l,18).dropdown.isOpen(),t["\u0275nov"](l,18).placement),n(l,19,0,t["\u0275nov"](l,20).target,t["\u0275nov"](l,20).href),n(l,27,0,t["\u0275unv"](l,27,0,t["\u0275nov"](l,28).transform("Alter Dados"))),n(l,29,0,t["\u0275nov"](l,30).target,t["\u0275nov"](l,30).href),n(l,33,0,t["\u0275unv"](l,33,0,t["\u0275nov"](l,34).transform("Log Out")))})}var g=function(){function n(n,l){var e=this;this.translate=n,this.router=l,this.collapsedEvent=new t.EventEmitter,this.router.events.subscribe(function(n){n instanceof a.d&&window.innerWidth<=992&&e.isToggled()&&e.toggleSidebar()})}return n.prototype.ngOnInit=function(){this.isActive=!1,this.collapsed=!1,this.showMenu="",this.pushRightClass="push-right",this.permissionAdmin=this.isAdmin(),this.permissionArquivador=this.isTywin(),this.permissionPesquisador=this.isSnow()},n.prototype.eventCalled=function(){this.isActive=!this.isActive},n.prototype.isAdmin=function(){var n=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(l){"DAENERYS"===l&&(n=!0)}),n},n.prototype.isSnow=function(){var n=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(l){"SNOW"===l&&(n=!0)}),n},n.prototype.isTywin=function(){var n=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(l){"TYWIN"===l&&(n=!0)}),n},n.prototype.addExpandClass=function(n){this.showMenu=n===this.showMenu?"0":n},n.prototype.toggleCollapsed=function(){this.collapsed=!this.collapsed,this.collapsedEvent.emit(this.collapsed)},n.prototype.isToggled=function(){return document.querySelector("body").classList.contains(this.pushRightClass)},n.prototype.toggleSidebar=function(){document.querySelector("body").classList.toggle(this.pushRightClass)},n.prototype.rltAndLtr=function(){document.querySelector("body").classList.toggle("rtl")},n.prototype.changeLang=function(n){this.translate.use(n)},n.prototype.onLoggedout=function(){localStorage.removeItem("isLoggedin")},n}(),f=t["\u0275crt"]({encapsulation:0,styles:[[".sidebar[_ngcontent-%COMP%]{border-radius:0;position:fixed;z-index:1000;top:56px;left:235px;width:235px;margin-left:-235px;margin-bottom:48px;border:none;overflow-y:auto;background-color:#222;bottom:0;overflow-x:hidden;padding-bottom:40px;white-space:nowrap;transition:all .2s ease-in-out}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.list-group-item[_ngcontent-%COMP%]{padding-left:25px;background:#222;border:0;border-radius:0;color:#999;text-decoration:none}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.list-group-item[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{margin-right:10px}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.router-link-active[_ngcontent-%COMP%], .sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{padding-left:20px;border-left:5px solid;background:#151515;color:#fff}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .header-fields[_ngcontent-%COMP%]{padding-top:10px}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .header-fields[_ngcontent-%COMP%] > .list-group-item[_ngcontent-%COMP%]:first-child{border-top:1px solid rgba(255,255,255,.2)}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:focus{border-radius:none;border:none}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]{font-size:1rem;height:50px;margin-bottom:0}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#999;text-decoration:none;font-weight:400;background:#222}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;display:block;padding:1rem 1.5rem .75rem}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff;outline:0;outline-offset:-2px}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]:hover{background:#151515}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]{border-radious:0;border:none}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border-radius:0;background-color:#222;border:0 solid transparent}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#999}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background:#151515}.nested-menu[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{cursor:pointer}.nested-menu[_ngcontent-%COMP%]   .nested[_ngcontent-%COMP%]{list-style-type:none}.nested-menu[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]{display:none;height:0}.nested-menu[_ngcontent-%COMP%]   .expand[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]{display:block;list-style-type:none;height:auto}.nested-menu[_ngcontent-%COMP%]   .expand[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;padding:10px;display:block}@media screen and (max-width:992px){.sidebar[_ngcontent-%COMP%]{top:54px;left:0}}@media print{.sidebar[_ngcontent-%COMP%]{display:none!important}}@media (min-width:992px){.header-fields[_ngcontent-%COMP%]{display:none}}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 0 #fff;border-radius:3px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{border-radius:3px;-webkit-box-shadow:inset 0 0 3px #fff}.toggle-button[_ngcontent-%COMP%]{position:fixed;width:236px;cursor:pointer;padding:12px;bottom:0;color:#999;background:#212529;border-top:1px solid #999;transition:all .2s ease-in-out}.toggle-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:23px}.toggle-button[_ngcontent-%COMP%]:hover{background:#151515;color:#fff}.collapsed[_ngcontent-%COMP%]{width:60px}.collapsed[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}"]],data:{}});function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[2,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,1,{links:1}),t["\u0275qud"](603979776,2,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-envelope fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/not-found");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Solicitantes ")))})}function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[4,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,3,{links:1}),t["\u0275qud"](603979776,4,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-home fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/storehouses");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Armaz\xe9ns")))})}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[6,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,5,{links:1}),t["\u0275qud"](603979776,6,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-building fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/companies");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Empresas")))})}function C(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[8,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,7,{links:1}),t["\u0275qud"](603979776,8,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-archive fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/volumes");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Volumes")))})}function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[10,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,9,{links:1}),t["\u0275qud"](603979776,10,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-book fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/documents");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Documentos")))})}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[12,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,11,{links:1}),t["\u0275qud"](603979776,12,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-wpforms fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/register-file");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Regristro Arquivos")))})}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[14,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,13,{links:1}),t["\u0275qud"](603979776,14,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-search fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/archives");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Procurar Arquivos")))})}function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](1,671744,[[16,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),t["\u0275did"](3,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,15,{links:1}),t["\u0275qud"](603979776,16,{linksWithHrefs:1}),t["\u0275pad"](6,1),(n()(),t["\u0275eld"](7,0,null,null,0,"i",[["class","fa fa-truck fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](9,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](10,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,2,0,"/not-found");n(l,1,0,e);var t=n(l,6,0,"router-link-active");n(l,3,0,t)},function(n,l){n(l,0,0,t["\u0275nov"](l,1).target,t["\u0275nov"](l,1).href),n(l,10,0,t["\u0275unv"](l,10,0,t["\u0275nov"](l,11).transform("Movimenta\xe7\xf5es")))})}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,21,"div",[["class","nested-menu"]],null,null,null,null,null)),t["\u0275did"](1,1720320,null,2,a.n,[a.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,17,{links:1}),t["\u0275qud"](603979776,18,{linksWithHrefs:1}),t["\u0275pad"](4,1),(n()(),t["\u0275eld"](5,0,null,null,5,"a",[["class","list-group-item"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.addExpandClass("pages")&&t),t},null,null)),(n()(),t["\u0275eld"](6,0,null,null,0,"i",[["class","fa fa-cog"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](8,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](9,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](11,0,null,null,10,"li",[["class","nested"]],[[2,"expand",null]],null,null,null,null)),(n()(),t["\u0275eld"](12,0,null,null,9,"ul",[["class","submenu"]],null,null,null,null,null)),(n()(),t["\u0275eld"](13,0,null,null,8,"li",[],null,null,null,null,null)),(n()(),t["\u0275eld"](14,0,null,null,7,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,15).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](15,671744,[[18,4]],0,a.o,[a.l,a.a,i.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](16,1),(n()(),t["\u0275eld"](17,0,null,null,0,"i",[["class","fa fa-monument"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](19,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](20,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,4,0,"router-link-active");n(l,1,0,e);var t=n(l,16,0,"/users");n(l,15,0,t)},function(n,l){var e=l.component;n(l,9,0,t["\u0275unv"](l,9,0,t["\u0275nov"](l,10).transform("Configura\xe7\xf5es"))),n(l,11,0,"pages"===e.showMenu),n(l,14,0,t["\u0275nov"](l,15).target,t["\u0275nov"](l,15).href),n(l,20,0,t["\u0275unv"](l,20,0,t["\u0275nov"](l,21).transform("Usu\xe1rios")))})}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,27,"nav",[["class","sidebar"]],null,null,null,null,null)),t["\u0275did"](1,278528,null,0,i.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](2,{sidebarPushRight:0,collapsed:1}),(n()(),t["\u0275eld"](3,0,null,null,18,"div",[["class","list-group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](5,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](7,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](9,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](11,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](13,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](15,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](17,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](19,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](21,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](22,0,null,null,5,"div",[["class","toggle-button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.toggleCollapsed()&&t),t},null,null)),t["\u0275did"](23,278528,null,0,i.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](24,{collapsed:0}),(n()(),t["\u0275eld"](25,0,null,null,0,"i",[],[[8,"className",0]],null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](27,0,null,null,0,"span",[],null,null,null,null,null))],function(n,l){var e=l.component,t=n(l,2,0,e.isActive,e.collapsed);n(l,1,0,"sidebar",t),n(l,5,0,e.permissionAdmin||e.permissionArquivador),n(l,7,0,e.permissionAdmin||e.permissionArquivador),n(l,9,0,e.permissionAdmin||e.permissionArquivador),n(l,11,0,e.permissionAdmin||e.permissionArquivador),n(l,13,0,e.permissionAdmin||e.permissionArquivador),n(l,15,0,e.permissionAdmin||e.permissionArquivador),n(l,17,0,e.permissionAdmin||e.permissionArquivador||e.permissionPesquisador),n(l,19,0,e.permissionAdmin||e.permissionArquivador),n(l,21,0,e.permissionAdmin);var o=n(l,24,0,e.collapsed);n(l,23,0,"toggle-button",o)},function(n,l){n(l,25,0,t["\u0275inlineInterpolate"](1,"fa fa-fw fa-angle-double-",l.component.collapsed?"right":"left",""))})}var y=function(){function n(){}return n.prototype.ngOnInit=function(){},n.prototype.receiveCollapsed=function(n){this.collapedSideBar=n},n}(),w=t["\u0275crt"]({encapsulation:0,styles:[["*[_ngcontent-%COMP%]{transition:margin-left .2s ease-in-out}.main-container[_ngcontent-%COMP%]{margin-top:56px;margin-left:235px;padding:15px;-ms-overflow-x:hidden;overflow-x:hidden;overflow-y:scroll;position:relative;overflow:hidden}.collapsed[_ngcontent-%COMP%]{margin-left:60px}.disabled[_ngcontent-%COMP%]{display:none}@media screen and (max-width:992px){.main-container[_ngcontent-%COMP%]{margin-left:0!important}}@media print{.main-container[_ngcontent-%COMP%]{margin-top:0!important;margin-left:0!important}}"]],data:{}});function R(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-header",[],null,null,null,p,c)),t["\u0275did"](1,114688,null,0,s,[d.j,a.l],null,null),(n()(),t["\u0275eld"](2,0,null,null,1,"app-sidebar",[],null,[[null,"collapsedEvent"]],function(n,l,e){var t=!0;return"collapsedEvent"===l&&(t=!1!==n.component.receiveCollapsed(e)&&t),t},P,f)),t["\u0275did"](3,114688,null,0,g,[d.j,a.l],null,{collapsedEvent:"collapsedEvent"}),(n()(),t["\u0275eld"](4,0,null,null,4,"section",[["class","main-container"]],null,null,null,null,null)),t["\u0275did"](5,278528,null,0,i.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](6,{collapsed:0}),(n()(),t["\u0275eld"](7,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t["\u0275did"](8,212992,null,0,a.q,[a.b,t.ViewContainerRef,t.ComponentFactoryResolver,[8,null],t.ChangeDetectorRef],null,null)],function(n,l){var e=l.component;n(l,1,0),n(l,3,0);var t=n(l,6,0,e.collapedSideBar);n(l,5,0,"main-container",t),n(l,8,0)},null)}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-layout",[],null,null,null,R,w)),t["\u0275did"](1,114688,null,0,y,[],null,null)],function(n,l){n(l,1,0)},null)}var x=t["\u0275ccf"]("app-layout",y,L,{},{},[]),A=e("9AJC"),I=e("ypTU"),q=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"],["id","modal-title"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Deletar Armaz\xe9m"])),(n()(),t["\u0275eld"](3,0,null,null,2,"button",[["aria-describedby","modal-title"],["class","close"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.modal.dismiss("Cross click")&&t),t},null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xd7"])),(n()(),t["\u0275eld"](6,0,null,null,7,"div",[["class","modal-body"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,2,"p",[],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](9,null,["",""])),(n()(),t["\u0275eld"](10,0,null,null,3,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](11,null,[""," "])),(n()(),t["\u0275eld"](12,0,null,null,1,"span",[["class","text-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Essa opera\xe7\xe3o poder\xe1 n\xe3o ser desfeita."])),(n()(),t["\u0275eld"](14,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-outline-secondary"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.modal.dismiss("cancel click")&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Cancel"])),(n()(),t["\u0275eld"](17,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0,o=n.component;return"click"===l&&(t=!1!==o.modal.close(o.deleteBack())&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Ok"]))],null,function(n,l){var e=l.component;n(l,9,0,e.data.msgQuestionDeleteOne),n(l,11,0,e.data.msgQuestionDeleteTwo)})}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ngbd-modal-confirm",[],null,null,null,D,q)),t["\u0275did"](1,49152,null,0,I.a,[r.e],null,null)],null,null)}var K=t["\u0275ccf"]("ngbd-modal-confirm",I.a,S,{item:"item",data:"data"},{delete:"delete"},[]),E=e("0QQi"),N=function(){return function(){}}(),T=e("m9XU");e.d(l,"LayoutModuleNgFactory",function(){return j});var j=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,x,A.u,A.q,K]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[t.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,r.A,r.A,[t.ComponentFactoryResolver,t.Injector,r.kb,r.B]),t["\u0275mpd"](4608,E.a,E.a,[]),t["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),t["\u0275mpd"](1073742336,a.p,a.p,[[2,a.v],[2,a.l]]),t["\u0275mpd"](1073742336,N,N,[]),t["\u0275mpd"](1073742336,d.g,d.g,[]),t["\u0275mpd"](1073742336,r.x,r.x,[]),t["\u0275mpd"](1073742336,r.C,r.C,[]),t["\u0275mpd"](1073742336,T.a,T.a,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,a.j,function(){return[[{path:"",component:y,children:[{path:"",redirectTo:"dashboard",pathMatch:"prefix"},{path:"dashboard",loadChildren:"./dashboard/dashboard.module#DashboardModule"},{path:"users",loadChildren:"./users/users.module#UsersModule"},{path:"companies",loadChildren:"./companies/companies.module#CompaniesModule"},{path:"storehouses",loadChildren:"./storehouses/storehouses.module#StorehousesModule"},{path:"register-file",loadChildren:"./register-file/register-file.module#RegisterFileModule"},{path:"archives",loadChildren:"./archives/archives.module#ArchivesModule"},{path:"volumes",loadChildren:"./volumes/volumes.module#VolumesModule"},{path:"documents",loadChildren:"./documents/documents.module#DocumentsModule"},{path:"charts",loadChildren:"./charts/charts.module#ChartsModule"},{path:"tables",loadChildren:"./tables/tables.module#TablesModule"},{path:"forms",loadChildren:"./form/form.module#FormModule"},{path:"bs-element",loadChildren:"./bs-element/bs-element.module#BsElementModule"},{path:"grid",loadChildren:"./grid/grid.module#GridModule"},{path:"components",loadChildren:"./bs-component/bs-component.module#BsComponentModule"},{path:"blank-page",loadChildren:"./blank-page/blank-page.module#BlankPageModule"}]}]]},[])])})}}]);