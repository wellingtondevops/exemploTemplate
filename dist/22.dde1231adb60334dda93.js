(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"/cdV":function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),r=e("4GxJ"),a=e("Ip0R"),i=e("ZYCi"),d=e("A7o+"),s=function(){function n(n,l){var e=this;this.translate=n,this.router=l,this.email="",this.router.events.subscribe(function(n){n instanceof i.d&&window.innerWidth<=992&&e.isToggled()&&e.toggleSidebar()})}return n.prototype.ngOnInit=function(){this.pushRightClass="push-right",this.email=window.localStorage.getItem("email")},n.prototype.isToggled=function(){return document.querySelector("body").classList.contains(this.pushRightClass)},n.prototype.toggleSidebar=function(){document.querySelector("body").classList.toggle(this.pushRightClass)},n.prototype.rltAndLtr=function(){document.querySelector("body").classList.toggle("rtl")},n.prototype.onLoggedout=function(){localStorage.removeItem("isLoggedin"),localStorage.removeItem("token"),localStorage.removeItem("email"),localStorage.removeItem("profiles")},n.prototype.changeLang=function(n){this.translate.use(n)},n}(),c=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]{background-color:#222}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{color:#999}[_nghost-%COMP%]   .navbar[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{color:#fff}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]{width:300px}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media[_ngcontent-%COMP%]{border-bottom:1px solid #ddd;padding:5px 10px}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media[_ngcontent-%COMP%]:last-child{border-bottom:none}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:13px;font-weight:600}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .media-body[_ngcontent-%COMP%]   .last[_ngcontent-%COMP%]{font-size:12px;margin:0}"]],data:{}});function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,34,"nav",[["class","navbar navbar-expand-lg fixed-top"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"a",[["class","navbar-brand"],["href","#"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["ARCHIO"])),(n()(),t["\u0275eld"](3,0,null,null,1,"button",[["class","navbar-toggler"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.toggleSidebar()&&t),t},null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-bars text-muted"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,29,"div",[["class","collapse navbar-collapse"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,28,"ul",[["class","navbar-nav ml-auto"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,27,"li",[["class","nav-item dropdown"],["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t["\u0275did"](8,212992,null,2,r.v,[t.ChangeDetectorRef,r.w,a.DOCUMENT,t.NgZone],null,null),t["\u0275qud"](335544320,1,{_menu:0}),t["\u0275qud"](335544320,2,{_anchor:0}),(n()(),t["\u0275eld"](11,0,null,null,5,"a",[["aria-haspopup","true"],["class","nav-link dropdown-toggle"],["href","javascript:void(0)"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,12).toggleOpen()&&o),o},null,null)),t["\u0275did"](12,16384,null,0,r.sb,[r.v,t.ElementRef],null,null),t["\u0275prd"](2048,[[2,4]],r.rb,null,[r.sb]),(n()(),t["\u0275eld"](14,0,null,null,0,"i",[["class","fa fa-user"]],null,null,null,null,null)),(n()(),t["\u0275ted"](15,null,[" "," "])),(n()(),t["\u0275eld"](16,0,null,null,0,"b",[["class","caret"]],null,null,null,null,null)),(n()(),t["\u0275eld"](17,0,null,null,17,"div",[["class","dropdown-menu-right"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],null,null,null,null)),t["\u0275did"](18,16384,[[1,4]],0,r.qb,[r.v,t.ElementRef,t.Renderer2],null,null),(n()(),t["\u0275eld"](19,0,null,null,9,"a",[["class","dropdown-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,20).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](20,671744,[[4,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](21,1),t["\u0275did"](22,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,3,{links:1}),t["\u0275qud"](603979776,4,{linksWithHrefs:1}),t["\u0275pad"](25,1),(n()(),t["\u0275eld"](26,0,null,null,0,"i",[["class","fa fa-fw fa-user"]],null,null,null,null,null)),(n()(),t["\u0275ted"](27,null,[" "," "])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](29,0,null,null,5,"a",[["class","dropdown-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0,u=n.component;return"click"===l&&(o=!1!==t["\u0275nov"](n,30).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),"click"===l&&(o=!1!==u.onLoggedout()&&o),o},null,null)),t["\u0275did"](30,671744,null,0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](31,1),(n()(),t["\u0275eld"](32,0,null,null,0,"i",[["class","fa fa-fw fa-power-off"]],null,null,null,null,null)),(n()(),t["\u0275ted"](33,null,[" "," "])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){n(l,8,0);var e=n(l,21,0,"/users/alter");n(l,20,0,e);var t=n(l,25,0,"router-link-active");n(l,22,0,t);var o=n(l,31,0,"/login");n(l,30,0,o)},function(n,l){var e=l.component;n(l,7,0,t["\u0275nov"](l,8).isOpen()),n(l,11,0,t["\u0275nov"](l,12).dropdown.isOpen()),n(l,15,0,e.email),n(l,17,0,!0,t["\u0275nov"](l,18).dropdown.isOpen(),t["\u0275nov"](l,18).placement),n(l,19,0,t["\u0275nov"](l,20).target,t["\u0275nov"](l,20).href),n(l,27,0,t["\u0275unv"](l,27,0,t["\u0275nov"](l,28).transform("Alter Dados"))),n(l,29,0,t["\u0275nov"](l,30).target,t["\u0275nov"](l,30).href),n(l,33,0,t["\u0275unv"](l,33,0,t["\u0275nov"](l,34).transform("Log Out")))})}var p=function(){function n(n,l){var e=this;this.translate=n,this.router=l,this.collapsedEvent=new t.EventEmitter,this.router.events.subscribe(function(n){n instanceof i.d&&window.innerWidth<=992&&e.isToggled()&&e.toggleSidebar()})}return n.prototype.ngOnInit=function(){this.isActive=!1,this.collapsed=!1,this.showMenu="",this.pushRightClass="push-right",this.permission=this.isAdmin()},n.prototype.eventCalled=function(){this.isActive=!this.isActive},n.prototype.isAdmin=function(){var n=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(l){"DAENERYS"===l&&(n=!0)}),n},n.prototype.addExpandClass=function(n){this.showMenu=n===this.showMenu?"0":n},n.prototype.toggleCollapsed=function(){this.collapsed=!this.collapsed,this.collapsedEvent.emit(this.collapsed)},n.prototype.isToggled=function(){return document.querySelector("body").classList.contains(this.pushRightClass)},n.prototype.toggleSidebar=function(){document.querySelector("body").classList.toggle(this.pushRightClass)},n.prototype.rltAndLtr=function(){document.querySelector("body").classList.toggle("rtl")},n.prototype.changeLang=function(n){this.translate.use(n)},n.prototype.onLoggedout=function(){localStorage.removeItem("isLoggedin")},n}(),f=t["\u0275crt"]({encapsulation:0,styles:[[".sidebar[_ngcontent-%COMP%]{border-radius:0;position:fixed;z-index:1000;top:56px;left:235px;width:235px;margin-left:-235px;margin-bottom:48px;border:none;overflow-y:auto;background-color:#222;bottom:0;overflow-x:hidden;padding-bottom:40px;white-space:nowrap;-webkit-transition:.2s ease-in-out;transition:all .2s ease-in-out}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.list-group-item[_ngcontent-%COMP%]{padding-left:25px;background:#222;border:0;border-radius:0;color:#999;text-decoration:none}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.list-group-item[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{margin-right:10px}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a.router-link-active[_ngcontent-%COMP%], .sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{padding-left:20px;border-left:5px solid;background:#151515;color:#fff}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .header-fields[_ngcontent-%COMP%]{padding-top:10px}.sidebar[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .header-fields[_ngcontent-%COMP%] > .list-group-item[_ngcontent-%COMP%]:first-child{border-top:1px solid rgba(255,255,255,.2)}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:focus{border-radius:none;border:none}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]{font-size:1rem;height:50px;margin-bottom:0}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#999;text-decoration:none;font-weight:400;background:#222}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;display:block;padding:1rem 1.5rem .75rem}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff;outline:0;outline-offset:-2px}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]:hover{background:#151515}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]{border-radious:0;border:none}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border-radius:0;background-color:#222;border:0 solid transparent}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#999}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}.sidebar[_ngcontent-%COMP%]   .sidebar-dropdown[_ngcontent-%COMP%]   .panel-collapse[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background:#151515}.nested-menu[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{cursor:pointer}.nested-menu[_ngcontent-%COMP%]   .nested[_ngcontent-%COMP%]{list-style-type:none}.nested-menu[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]{display:none;height:0}.nested-menu[_ngcontent-%COMP%]   .expand[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]{display:block;list-style-type:none;height:auto}.nested-menu[_ngcontent-%COMP%]   .expand[_ngcontent-%COMP%]   ul.submenu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;padding:10px;display:block}@media screen and (max-width:992px){.sidebar[_ngcontent-%COMP%]{top:54px;left:0}}@media print{.sidebar[_ngcontent-%COMP%]{display:none!important}}@media (min-width:992px){.header-fields[_ngcontent-%COMP%]{display:none}}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 0 #fff;border-radius:3px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{border-radius:3px;-webkit-box-shadow:inset 0 0 3px #fff}.toggle-button[_ngcontent-%COMP%]{position:fixed;width:236px;cursor:pointer;padding:12px;bottom:0;color:#999;background:#212529;border-top:1px solid #999;-webkit-transition:.2s ease-in-out;transition:all .2s ease-in-out}.toggle-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:23px}.toggle-button[_ngcontent-%COMP%]:hover{background:#151515;color:#fff}.collapsed[_ngcontent-%COMP%]{width:60px}.collapsed[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}"]],data:{}});function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,21,"div",[["class","nested-menu"]],null,null,null,null,null)),t["\u0275did"](1,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,17,{links:1}),t["\u0275qud"](603979776,18,{linksWithHrefs:1}),t["\u0275pad"](4,1),(n()(),t["\u0275eld"](5,0,null,null,5,"a",[["class","list-group-item"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.addExpandClass("pages")&&t),t},null,null)),(n()(),t["\u0275eld"](6,0,null,null,0,"i",[["class","fa fa-cog"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](8,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](9,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](11,0,null,null,10,"li",[["class","nested"]],[[2,"expand",null]],null,null,null,null)),(n()(),t["\u0275eld"](12,0,null,null,9,"ul",[["class","submenu"]],null,null,null,null,null)),(n()(),t["\u0275eld"](13,0,null,null,8,"li",[],null,null,null,null,null)),(n()(),t["\u0275eld"](14,0,null,null,7,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,15).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](15,671744,[[18,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](16,1),(n()(),t["\u0275eld"](17,0,null,null,0,"i",[["class","fa fa-monument"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](19,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](20,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef])],function(n,l){var e=n(l,4,0,"router-link-active");n(l,1,0,e);var t=n(l,16,0,"/users");n(l,15,0,t)},function(n,l){var e=l.component;n(l,9,0,t["\u0275unv"](l,9,0,t["\u0275nov"](l,10).transform("Configura\xe7\xf5es"))),n(l,11,0,"pages"===e.showMenu),n(l,14,0,t["\u0275nov"](l,15).target,t["\u0275nov"](l,15).href),n(l,20,0,t["\u0275unv"](l,20,0,t["\u0275nov"](l,21).transform("Usu\xe1rios")))})}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,107,"nav",[["class","sidebar"]],null,null,null,null,null)),t["\u0275did"](1,278528,null,0,a.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](2,{sidebarPushRight:0,collapsed:1}),(n()(),t["\u0275eld"](3,0,null,null,98,"div",[["class","list-group"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,5).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](5,671744,[[2,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](6,1),t["\u0275did"](7,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,1,{links:1}),t["\u0275qud"](603979776,2,{linksWithHrefs:1}),t["\u0275pad"](10,1),(n()(),t["\u0275eld"](11,0,null,null,0,"i",[["class","fa fa-envelope fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](13,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](14,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](16,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,17).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](17,671744,[[4,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](18,1),t["\u0275did"](19,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,3,{links:1}),t["\u0275qud"](603979776,4,{linksWithHrefs:1}),t["\u0275pad"](22,1),(n()(),t["\u0275eld"](23,0,null,null,0,"i",[["class","fa fa-home fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](25,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](26,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](28,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,29).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](29,671744,[[6,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](30,1),t["\u0275did"](31,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,5,{links:1}),t["\u0275qud"](603979776,6,{linksWithHrefs:1}),t["\u0275pad"](34,1),(n()(),t["\u0275eld"](35,0,null,null,0,"i",[["class","fa fa-building fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](37,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](38,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](40,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,41).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](41,671744,[[8,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](42,1),t["\u0275did"](43,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,7,{links:1}),t["\u0275qud"](603979776,8,{linksWithHrefs:1}),t["\u0275pad"](46,1),(n()(),t["\u0275eld"](47,0,null,null,0,"i",[["class","fa fa-archive fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](49,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](50,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](52,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,53).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](53,671744,[[10,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](54,1),t["\u0275did"](55,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,9,{links:1}),t["\u0275qud"](603979776,10,{linksWithHrefs:1}),t["\u0275pad"](58,1),(n()(),t["\u0275eld"](59,0,null,null,0,"i",[["class","fa fa-book fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](61,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](62,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](64,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,65).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](65,671744,[[12,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](66,1),t["\u0275did"](67,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,11,{links:1}),t["\u0275qud"](603979776,12,{linksWithHrefs:1}),t["\u0275pad"](70,1),(n()(),t["\u0275eld"](71,0,null,null,0,"i",[["class","fa fa-wpforms fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](73,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](74,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](76,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,77).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](77,671744,[[14,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](78,1),t["\u0275did"](79,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,13,{links:1}),t["\u0275qud"](603979776,14,{linksWithHrefs:1}),t["\u0275pad"](82,1),(n()(),t["\u0275eld"](83,0,null,null,0,"i",[["class","fa fa-search fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](85,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](86,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275eld"](88,0,null,null,11,"a",[["class","list-group-item"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,89).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&o),o},null,null)),t["\u0275did"](89,671744,[[16,4]],0,i.o,[i.l,i.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](90,1),t["\u0275did"](91,1720320,null,2,i.n,[i.l,t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),t["\u0275qud"](603979776,15,{links:1}),t["\u0275qud"](603979776,16,{linksWithHrefs:1}),t["\u0275pad"](94,1),(n()(),t["\u0275eld"](95,0,null,null,0,"i",[["class","fa fa-truck fa-2x"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](97,0,null,null,2,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](98,null,["",""])),t["\u0275pid"](131072,d.i,[d.j,t.ChangeDetectorRef]),(n()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](101,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](102,0,null,null,5,"div",[["class","toggle-button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.toggleCollapsed()&&t),t},null,null)),t["\u0275did"](103,278528,null,0,a.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](104,{collapsed:0}),(n()(),t["\u0275eld"](105,0,null,null,0,"i",[],[[8,"className",0]],null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xa0 "])),(n()(),t["\u0275eld"](107,0,null,null,0,"span",[],null,null,null,null,null))],function(n,l){var e=l.component,t=n(l,2,0,e.isActive,e.collapsed);n(l,1,0,"sidebar",t);var o=n(l,6,0,"/not-found");n(l,5,0,o);var u=n(l,10,0,"router-link-active");n(l,7,0,u);var r=n(l,18,0,"/storehouses");n(l,17,0,r);var a=n(l,22,0,"router-link-active");n(l,19,0,a);var i=n(l,30,0,"/companies");n(l,29,0,i);var d=n(l,34,0,"router-link-active");n(l,31,0,d);var s=n(l,42,0,"/volumes");n(l,41,0,s);var c=n(l,46,0,"router-link-active");n(l,43,0,c);var g=n(l,54,0,"/documents");n(l,53,0,g);var p=n(l,58,0,"router-link-active");n(l,55,0,p);var f=n(l,66,0,"/not-found");n(l,65,0,f);var m=n(l,70,0,"router-link-active");n(l,67,0,m);var h=n(l,78,0,"/archives");n(l,77,0,h);var v=n(l,82,0,"router-link-active");n(l,79,0,v);var C=n(l,90,0,"/not-found");n(l,89,0,C);var b=n(l,94,0,"router-link-active");n(l,91,0,b),n(l,101,0,e.permission);var k=n(l,104,0,e.collapsed);n(l,103,0,"toggle-button",k)},function(n,l){var e=l.component;n(l,4,0,t["\u0275nov"](l,5).target,t["\u0275nov"](l,5).href),n(l,14,0,t["\u0275unv"](l,14,0,t["\u0275nov"](l,15).transform("Solicitantes "))),n(l,16,0,t["\u0275nov"](l,17).target,t["\u0275nov"](l,17).href),n(l,26,0,t["\u0275unv"](l,26,0,t["\u0275nov"](l,27).transform("Armaz\xe9ns"))),n(l,28,0,t["\u0275nov"](l,29).target,t["\u0275nov"](l,29).href),n(l,38,0,t["\u0275unv"](l,38,0,t["\u0275nov"](l,39).transform("Empresas"))),n(l,40,0,t["\u0275nov"](l,41).target,t["\u0275nov"](l,41).href),n(l,50,0,t["\u0275unv"](l,50,0,t["\u0275nov"](l,51).transform("Volumes"))),n(l,52,0,t["\u0275nov"](l,53).target,t["\u0275nov"](l,53).href),n(l,62,0,t["\u0275unv"](l,62,0,t["\u0275nov"](l,63).transform("Documentos"))),n(l,64,0,t["\u0275nov"](l,65).target,t["\u0275nov"](l,65).href),n(l,74,0,t["\u0275unv"](l,74,0,t["\u0275nov"](l,75).transform("Regristro Arquivos"))),n(l,76,0,t["\u0275nov"](l,77).target,t["\u0275nov"](l,77).href),n(l,86,0,t["\u0275unv"](l,86,0,t["\u0275nov"](l,87).transform("Procurar Arquivos"))),n(l,88,0,t["\u0275nov"](l,89).target,t["\u0275nov"](l,89).href),n(l,98,0,t["\u0275unv"](l,98,0,t["\u0275nov"](l,99).transform("Movimenta\xe7\xf5es"))),n(l,105,0,t["\u0275inlineInterpolate"](1,"fa fa-fw fa-angle-double-",e.collapsed?"right":"left",""))})}var v=function(){function n(){}return n.prototype.ngOnInit=function(){},n.prototype.receiveCollapsed=function(n){this.collapedSideBar=n},n}(),C=t["\u0275crt"]({encapsulation:0,styles:[["*[_ngcontent-%COMP%]{-webkit-transition:margin-left .2s ease-in-out;transition:margin-left .2s ease-in-out}.main-container[_ngcontent-%COMP%]{margin-top:56px;margin-left:235px;padding:15px;-ms-overflow-x:hidden;overflow-x:hidden;overflow-y:scroll;position:relative;overflow:hidden}.collapsed[_ngcontent-%COMP%]{margin-left:60px}.disabled[_ngcontent-%COMP%]{display:none}@media screen and (max-width:992px){.main-container[_ngcontent-%COMP%]{margin-left:0!important}}@media print{.main-container[_ngcontent-%COMP%]{margin-top:0!important;margin-left:0!important}}"]],data:{}});function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-header",[],null,null,null,g,c)),t["\u0275did"](1,114688,null,0,s,[d.j,i.l],null,null),(n()(),t["\u0275eld"](2,0,null,null,1,"app-sidebar",[],null,[[null,"collapsedEvent"]],function(n,l,e){var t=!0;return"collapsedEvent"===l&&(t=!1!==n.component.receiveCollapsed(e)&&t),t},h,f)),t["\u0275did"](3,114688,null,0,p,[d.j,i.l],null,{collapsedEvent:"collapsedEvent"}),(n()(),t["\u0275eld"](4,0,null,null,4,"section",[["class","main-container"]],null,null,null,null,null)),t["\u0275did"](5,278528,null,0,a.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275pod"](6,{collapsed:0}),(n()(),t["\u0275eld"](7,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t["\u0275did"](8,212992,null,0,i.q,[i.b,t.ViewContainerRef,t.ComponentFactoryResolver,[8,null],t.ChangeDetectorRef],null,null)],function(n,l){var e=l.component;n(l,1,0),n(l,3,0);var t=n(l,6,0,e.collapedSideBar);n(l,5,0,"main-container",t),n(l,8,0)},null)}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-layout",[],null,null,null,b,C)),t["\u0275did"](1,114688,null,0,v,[],null,null)],function(n,l){n(l,1,0)},null)}var M=t["\u0275ccf"]("app-layout",v,k,{},{},[]),O=e("9AJC"),_=e("ypTU"),P=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"],["id","modal-title"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Deletar Armaz\xe9m"])),(n()(),t["\u0275eld"](3,0,null,null,2,"button",[["aria-describedby","modal-title"],["class","close"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.modal.dismiss("Cross click")&&t),t},null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\xd7"])),(n()(),t["\u0275eld"](6,0,null,null,7,"div",[["class","modal-body"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,2,"p",[],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](9,null,["",""])),(n()(),t["\u0275eld"](10,0,null,null,3,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](11,null,[""," "])),(n()(),t["\u0275eld"](12,0,null,null,1,"span",[["class","text-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Essa opera\xe7\xe3o poder\xe1 n\xe3o ser desfeita."])),(n()(),t["\u0275eld"](14,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-outline-secondary"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.modal.dismiss("cancel click")&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Cancel"])),(n()(),t["\u0275eld"](17,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0,o=n.component;return"click"===l&&(t=!1!==o.modal.close(o.deleteBack())&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Ok"]))],null,function(n,l){var e=l.component;n(l,9,0,e.data.msgQuestionDeleteOne),n(l,11,0,e.data.msgQuestionDeleteTwo)})}function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ngbd-modal-confirm",[],null,null,null,y,P)),t["\u0275did"](1,49152,null,0,_.a,[r.e],null,null)],null,null)}var L=t["\u0275ccf"]("ngbd-modal-confirm",_.a,w,{item:"item",data:"data"},{delete:"delete"},[]),x=e("0QQi"),R=function(){return function(){}}(),D=e("m9XU");e.d(l,"LayoutModuleNgFactory",function(){return A});var A=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,M,O.u,O.q,L]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,r.A,r.A,[t.ComponentFactoryResolver,t.Injector,r.kb,r.B]),t["\u0275mpd"](4608,x.a,x.a,[]),t["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["\u0275mpd"](1073742336,i.p,i.p,[[2,i.v],[2,i.l]]),t["\u0275mpd"](1073742336,R,R,[]),t["\u0275mpd"](1073742336,d.g,d.g,[]),t["\u0275mpd"](1073742336,r.x,r.x,[]),t["\u0275mpd"](1073742336,r.C,r.C,[]),t["\u0275mpd"](1073742336,D.a,D.a,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,i.j,function(){return[[{path:"",component:v,children:[{path:"",redirectTo:"dashboard",pathMatch:"prefix"},{path:"dashboard",loadChildren:"./dashboard/dashboard.module#DashboardModule"},{path:"users",loadChildren:"./users/users.module#UsersModule"},{path:"companies",loadChildren:"./companies/companies.module#CompaniesModule"},{path:"storehouses",loadChildren:"./storehouses/storehouses.module#StorehousesModule"},{path:"archives",loadChildren:"./archives/archives.module#ArchivesModule"},{path:"volumes",loadChildren:"./volumes/volumes.module#VolumesModule"},{path:"documents",loadChildren:"./documents/documents.module#DocumentsModule"},{path:"charts",loadChildren:"./charts/charts.module#ChartsModule"},{path:"tables",loadChildren:"./tables/tables.module#TablesModule"},{path:"forms",loadChildren:"./form/form.module#FormModule"},{path:"bs-element",loadChildren:"./bs-element/bs-element.module#BsElementModule"},{path:"grid",loadChildren:"./grid/grid.module#GridModule"},{path:"components",loadChildren:"./bs-component/bs-component.module#BsComponentModule"},{path:"blank-page",loadChildren:"./blank-page/blank-page.module#BlankPageModule"}]}]]},[])])})},ypTU:function(n,l,e){"use strict";e.d(l,"a",function(){return o});var t=e("CcnG"),o=function(){function n(n){this.modal=n,this.data={msgQuestionDeleteOne:"",msgQuestionDeleteTwo:""},this.delete=new t.EventEmitter}return n.prototype.deleteBack=function(){this.delete.emit(this.item)},n}()}}]);