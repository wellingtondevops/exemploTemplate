(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{YIYR:function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){return function(){}}(),o=e("9AJC"),i=e("pMnS"),a=e("gIcY"),r=e("Ip0R"),d=e("iAfa"),s=e("RygT"),c=e("rMXk"),p=e("3zLz"),m=e("4GxJ"),g=e("R/X1"),f=e("3/HP"),v=e("FO+L"),h=e("nhM1"),b=e("BARL"),C=e("jvuA"),w=e("UReH"),y=e("Y0Co"),T=e("8iEZ"),D=e("+j4G"),R=e("Aier"),_=e("PMS6"),S=function(){function l(l,n,e,u){this.archiveSrv=l,this.errorMsg=n,this._route=e,this.fb=u,this.page=new _.a,this.loading=!1}return l.prototype.ngOnInit=function(){this.searchForm=this.fb.group({search:this.fb.control("")})},l.prototype.setPage=function(l){var n=this;this.loading=!0,this.page.pageNumber=l.offset,this.archiveSrv.archives(this.page,null,this.searchForm.value.search).subscribe(function(l){n.page.pageNumber=l._links.currentPage-1,n.page.totalElements=l._links.foundItems,n.archives=l.items,n.loading=!1},function(l){n.loading=!1,console.log("ERROR: ",l)})},l.prototype.toggleExpandRow=function(l){this.table.rowDetail.toggleExpandRow(l)},l.prototype.onDetailToggle=function(l){},l.prototype.showView=function(l){"click"===l.type?this._route.navigate(["/archives",l.row._id]):"mouseenter"===l.type&&this.toggleExpandRow(l.row)},l.prototype.guardType=function(l){var n="";switch(l){case"GERENCIADA":n="G"}return n},l.prototype.getArchive=function(){this.setPage({offset:0})},l}(),x=e("ZYCi"),F=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,0,"i",[["class","fa fa-filter"],["style","margin-right: 5px"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Filtros"]))],null,null)}function q(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,16,"form",[["class","form-inline"],["novalidate",""],["role","FormGroup"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,e){var t=!0,o=l.component;return"submit"===n&&(t=!1!==u["\u0275nov"](l,2).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,2).onReset()&&t),"ngSubmit"===n&&(t=!1!==o.getArchive()&&t),t},null,null)),u["\u0275did"](1,16384,null,0,a["\u0275angular_packages_forms_forms_bh"],[],null,null),u["\u0275did"](2,540672,null,0,a.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),u["\u0275prd"](2048,null,a.ControlContainer,null,[a.FormGroupDirective]),u["\u0275did"](4,16384,null,0,a.NgControlStatusGroup,[[4,a.ControlContainer]],null,null),(l()(),u["\u0275eld"](5,0,null,null,8,"div",[["class","form-group mb-2 col-11"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,1,"label",[["for","search_archive"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Pesquisar Arquivo"])),(l()(),u["\u0275eld"](8,0,null,null,5,"input",[["class","form-control col-12"],["formControlName","search"],["id","search_archive"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var t=!0;return"input"===n&&(t=!1!==u["\u0275nov"](l,9)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,9).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,9)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,9)._compositionEnd(e.target.value)&&t),t},null,null)),u["\u0275did"](9,16384,null,0,a.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,a.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,a.NG_VALUE_ACCESSOR,function(l){return[l]},[a.DefaultValueAccessor]),u["\u0275did"](11,671744,null,0,a.FormControlName,[[3,a.ControlContainer],[8,null],[8,null],[6,a.NG_VALUE_ACCESSOR],[2,a["\u0275angular_packages_forms_forms_k"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,a.NgControl,null,[a.FormControlName]),u["\u0275did"](13,16384,null,0,a.NgControlStatus,[[4,a.NgControl]],null,null),(l()(),u["\u0275eld"](14,0,null,null,2,"div",[["class","form-group mb-2 col-1"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-default pull-right"],["style","margin-top:20px"],["type","submit"]],null,null,null,null,null)),(l()(),u["\u0275eld"](16,0,null,null,0,"i",[["class","fa fa-search"]],null,null,null,null,null))],function(l,n){l(n,2,0,n.component.searchForm),l(n,11,0,"search")},function(l,n){l(n,0,0,u["\u0275nov"](n,4).ngClassUntouched,u["\u0275nov"](n,4).ngClassTouched,u["\u0275nov"](n,4).ngClassPristine,u["\u0275nov"](n,4).ngClassDirty,u["\u0275nov"](n,4).ngClassValid,u["\u0275nov"](n,4).ngClassInvalid,u["\u0275nov"](n,4).ngClassPending),l(n,8,0,u["\u0275nov"](n,13).ngClassUntouched,u["\u0275nov"](n,13).ngClassTouched,u["\u0275nov"](n,13).ngClassPristine,u["\u0275nov"](n,13).ngClassDirty,u["\u0275nov"](n,13).ngClassValid,u["\u0275nov"](n,13).ngClassInvalid,u["\u0275nov"](n,13).ngClassPending)})}function I(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,["",": "]))],null,function(l,n){l(n,2,0,n.context.$implicit.namefield)})}function A(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),u["\u0275ted"](1,null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit)})}function N(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,7,"div",[["class","container"],["style","padding-bottom: 10px"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,2,"div",[["class","col-2"],["style","padding-left:35px;"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,I)),u["\u0275did"](4,278528,null,0,r.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275eld"](5,0,null,null,2,"div",[["class","col-4"],["style","padding-left:35px;"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,A)),u["\u0275did"](7,278528,null,0,r.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,4,0,n.context.row.doct.label),l(n,7,0,n.context.row.tag)},null)}function O(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"a",[["href","javascript:void(0)"],["title","Expand/Collapse Row"]],[[2,"datatable-icon-right",null],[2,"datatable-icon-down",null]],[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.toggleExpandRow(l.context.row)&&u),u},null,null))],null,function(l,n){l(n,0,0,!n.context.expanded,n.context.expanded)})}function k(l){return u["\u0275vid"](0,[(l()(),u["\u0275ted"](0,null,[" "," "]))],null,function(l,n){l(n,0,0,n.component.guardType(n.context.value))})}function M(l){return u["\u0275vid"](0,[(l()(),u["\u0275ted"](0,null,[" "," "])),u["\u0275ppd"](1,2)],null,function(l,n){var e=u["\u0275unv"](n,0,0,l(n,1,0,u["\u0275nov"](n.parent,0),n.context.value,"dd/MM/yyyy"));l(n,0,0,e)})}function P(l){return u["\u0275vid"](0,[u["\u0275pid"](0,r.DatePipe,[u.LOCALE_ID]),u["\u0275qud"](402653184,1,{table:0}),(l()(),u["\u0275eld"](2,0,null,null,70,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,2,"ngx-loading",[],null,null,null,d.b,d.a)),u["\u0275did"](4,114688,null,0,s.a,[s.c,u.ChangeDetectorRef],{show:[0,"show"],config:[1,"config"]},null),u["\u0275pod"](5,{backdropBorderRadius:0,fullScreenBackdrop:1,primaryColour:2,secondaryColour:3,tertiaryColour:4}),(l()(),u["\u0275eld"](6,0,null,null,1,"app-page-header",[],null,null,null,c.b,c.a)),u["\u0275did"](7,114688,null,0,p.a,[],{heading:[0,"heading"],icon:[1,"icon"]},null),(l()(),u["\u0275eld"](8,0,null,null,11,"ngb-accordion",[["activeIds","ngb-panel-0"],["class","accordion"],["role","tablist"]],[[1,"aria-multiselectable",0]],null,null,o.k,o.c)),u["\u0275did"](9,2146304,[["acc",4]],1,m.b,[m.c],{activeIds:[0,"activeIds"]},null),u["\u0275qud"](603979776,2,{panels:1}),(l()(),u["\u0275eld"](11,0,null,null,8,"ngb-panel",[],null,null,null,null,null)),u["\u0275did"](12,2113536,[[2,4]],3,m.L,[],null,null),u["\u0275qud"](603979776,3,{titleTpls:1}),u["\u0275qud"](603979776,4,{headerTpls:1}),u["\u0275qud"](603979776,5,{contentTpls:1}),(l()(),u["\u0275and"](0,null,null,1,null,E)),u["\u0275did"](17,16384,[[3,4]],0,m.O,[u.TemplateRef],null,null),(l()(),u["\u0275and"](0,null,null,1,null,q)),u["\u0275did"](19,16384,[[5,4]],0,m.M,[u.TemplateRef],null,null),(l()(),u["\u0275eld"](20,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),u["\u0275eld"](21,0,null,null,51,"ngx-datatable",[["class","material ngx-datatable"]],[[2,"fixed-header",null],[2,"fixed-row",null],[2,"scroll-vertical",null],[2,"virtualized",null],[2,"scroll-horz",null],[2,"selectable",null],[2,"checkbox-selection",null],[2,"cell-selection",null],[2,"single-selection",null],[2,"multi-selection",null],[2,"multi-click-selection",null]],[[null,"page"],[null,"activate"],["window","resize"]],function(l,n,e){var t=!0,o=l.component;return"window:resize"===n&&(t=!1!==u["\u0275nov"](l,22).onWindowResize()&&t),"page"===n&&(t=!1!==o.setPage(e)&&t),"activate"===n&&(t=!1!==o.showView(e)&&t),t},g.b,g.a)),u["\u0275did"](22,5750784,[[1,4],["myTable",4]],4,f.DatatableComponent,[[1,v.ScrollbarHelper],[1,h.DimensionsHelper],u.ChangeDetectorRef,u.ElementRef,u.KeyValueDiffers,b.ColumnChangesService],{rows:[0,"rows"],rowHeight:[1,"rowHeight"],columnMode:[2,"columnMode"],headerHeight:[3,"headerHeight"],footerHeight:[4,"footerHeight"],externalPaging:[5,"externalPaging"],limit:[6,"limit"],count:[7,"count"],offset:[8,"offset"]},{activate:"activate",page:"page"}),u["\u0275qud"](603979776,6,{columnTemplates:1}),u["\u0275qud"](335544320,7,{rowDetail:0}),u["\u0275qud"](335544320,8,{groupHeader:0}),u["\u0275qud"](335544320,9,{footer:0}),(l()(),u["\u0275eld"](27,0,[["myDetailRow",1]],null,4,"ngx-datatable-row-detail",[],null,[[null,"toggle"]],function(l,n,e){var u=!0;return"toggle"===n&&(u=!1!==l.component.onDetailToggle(e)&&u),u},null,null)),u["\u0275did"](28,16384,[[7,4]],1,C.DatatableRowDetailDirective,[],{rowHeight:[0,"rowHeight"]},{toggle:"toggle"}),u["\u0275qud"](335544320,10,{template:0}),(l()(),u["\u0275and"](0,[[10,2]],null,1,null,N)),u["\u0275did"](31,16384,null,0,w.DatatableRowDetailTemplateDirective,[u.TemplateRef],null,null),(l()(),u["\u0275eld"](32,0,null,null,6,"ngx-datatable-column",[],null,null,null,null,null)),u["\u0275did"](33,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{resizeable:[0,"resizeable"],sortable:[1,"sortable"],draggable:[2,"draggable"],canAutoResize:[3,"canAutoResize"],width:[4,"width"]},null),u["\u0275qud"](335544320,11,{cellTemplate:0}),u["\u0275qud"](335544320,12,{headerTemplate:0}),u["\u0275qud"](335544320,13,{treeToggleTemplate:0}),(l()(),u["\u0275and"](0,[[11,2]],null,1,null,O)),u["\u0275did"](38,16384,null,0,T.DataTableColumnCellDirective,[u.TemplateRef],null,null),(l()(),u["\u0275eld"](39,0,null,null,4,"ngx-datatable-column",[["name","Localiza\xe7\xe3o"],["prop","volume.location"]],null,null,null,null,null)),u["\u0275did"](40,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,14,{cellTemplate:0}),u["\u0275qud"](335544320,15,{headerTemplate:0}),u["\u0275qud"](335544320,16,{treeToggleTemplate:0}),(l()(),u["\u0275eld"](44,0,null,null,4,"ngx-datatable-column",[["name","Descri\xe7\xe3o"],["prop","volume.description"]],null,null,null,null,null)),u["\u0275did"](45,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,17,{cellTemplate:0}),u["\u0275qud"](335544320,18,{headerTemplate:0}),u["\u0275qud"](335544320,19,{treeToggleTemplate:0}),(l()(),u["\u0275eld"](49,0,null,null,6,"ngx-datatable-column",[["name","Guarda"],["prop","volume.guardType"]],null,null,null,null,null)),u["\u0275did"](50,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,20,{cellTemplate:0}),u["\u0275qud"](335544320,21,{headerTemplate:0}),u["\u0275qud"](335544320,22,{treeToggleTemplate:0}),(l()(),u["\u0275and"](0,[[20,2]],null,1,null,k)),u["\u0275did"](55,16384,null,0,T.DataTableColumnCellDirective,[u.TemplateRef],null,null),(l()(),u["\u0275eld"](56,0,null,null,4,"ngx-datatable-column",[["name","Armaz\xe9m"],["prop","storehouse.name"]],null,null,null,null,null)),u["\u0275did"](57,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,23,{cellTemplate:0}),u["\u0275qud"](335544320,24,{headerTemplate:0}),u["\u0275qud"](335544320,25,{treeToggleTemplate:0}),(l()(),u["\u0275eld"](61,0,null,null,4,"ngx-datatable-column",[["name","Empresa"],["prop","company.name"]],null,null,null,null,null)),u["\u0275did"](62,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,26,{cellTemplate:0}),u["\u0275qud"](335544320,27,{headerTemplate:0}),u["\u0275qud"](335544320,28,{treeToggleTemplate:0}),(l()(),u["\u0275eld"](66,0,null,null,6,"ngx-datatable-column",[["name","Criado em"],["prop","create"]],null,null,null,null,null)),u["\u0275did"](67,540672,[[6,4]],3,y.DataTableColumnDirective,[b.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),u["\u0275qud"](335544320,29,{cellTemplate:0}),u["\u0275qud"](335544320,30,{headerTemplate:0}),u["\u0275qud"](335544320,31,{treeToggleTemplate:0}),(l()(),u["\u0275and"](0,[[29,2]],null,1,null,M)),u["\u0275did"](72,16384,null,0,T.DataTableColumnCellDirective,[u.TemplateRef],null,null)],function(l,n){var e=n.component,u=e.loading,t=l(n,5,0,"3px",!0,"#222","#222","#222");l(n,4,0,u,t),l(n,7,0,"Arquivos","fa-table"),l(n,9,0,"ngb-panel-0"),l(n,22,0,e.archives,"auto","force",50,50,!0,10,e.page.totalElements,e.page.pageNumber),l(n,28,0,"auto"),l(n,33,0,!1,!1,!1,!1,50),l(n,40,0,"Localiza\xe7\xe3o","volume.location",200),l(n,45,0,"Descri\xe7\xe3o","volume.description",200),l(n,50,0,"Guarda","volume.guardType",150),l(n,57,0,"Armaz\xe9m","storehouse.name",200),l(n,62,0,"Empresa","company.name",300),l(n,67,0,"Criado em","create",300)},function(l,n){l(n,2,0,void 0),l(n,8,0,!u["\u0275nov"](n,9).closeOtherPanels),l(n,21,1,[u["\u0275nov"](n,22).isFixedHeader,u["\u0275nov"](n,22).isFixedRow,u["\u0275nov"](n,22).isVertScroll,u["\u0275nov"](n,22).isVirtualized,u["\u0275nov"](n,22).isHorScroll,u["\u0275nov"](n,22).isSelectable,u["\u0275nov"](n,22).isCheckboxSelection,u["\u0275nov"](n,22).isCellSelection,u["\u0275nov"](n,22).isSingleSelection,u["\u0275nov"](n,22).isMultiSelection,u["\u0275nov"](n,22).isMultiClickSelection])})}function V(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-list",[],null,null,null,P,F)),u["\u0275did"](1,114688,null,0,S,[D.a,R.a,x.l,a.FormBuilder],null,null)],function(l,n){l(n,1,0)},null)}var G=u["\u0275ccf"]("app-list",S,V,{},{},[]),H=e("UIfG"),j=e("QQT3"),z=e("dhOI"),L=e("yUoD"),U=e("I9/A"),Y=e("ILT9"),B=function(){function l(l){this.host=l,this.file=null,this.postFile=new u.EventEmitter}return l.prototype.emitFiles=function(l){var n=l&&l.item(0);this.onChange(n),this.file=n,this.postFile.emit(this.file)},l.prototype.writeValue=function(l){this.host.nativeElement.value="",this.file=null},l.prototype.registerOnChange=function(l){this.onChange=l},l.prototype.registerOnTouched=function(l){},l}(),J=u["\u0275crt"]({encapsulation:0,styles:[["@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);.file-drop-area[_ngcontent-%COMP%]{border:1px dashed #000;border-radius:3px;position:relative;max-width:100%;padding:26px 20px 30px;transition:.2s}.file-drop-area.is-active[_ngcontent-%COMP%]{background-color:#000}.fake-btn[_ngcontent-%COMP%]{color:#fff;background-color:#000}.file-msg[_ngcontent-%COMP%]{font-size:small;font-weight:300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block;max-width:calc(100% - 130px);vertical-align:middle}.file-input[_ngcontent-%COMP%]{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.file-input[_ngcontent-%COMP%]:focus{outline:0}"]],data:{}});function W(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"span",[["class","btn fake-btn"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Escolha o arquivo"])),(l()(),u["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,["",""])),(l()(),u["\u0275eld"](5,0,null,null,0,"input",[["class","file-input"],["type","file"]],null,null,null,null,null))],null,function(l,n){var e=n.component;l(n,4,0,e.file?e.file.name:" ou arraste o arquivo aqui")})}function Z(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,0,"img",[["style","margin-right:10px"],["width","100px"]],[[8,"src",4]],null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,1,"button",[["class","btn btn-default"],["type","button"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Excluir"]))],null,function(l,n){l(n,1,0,n.component.archive.url)})}function K(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["class","file-drop-area"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,W)),u["\u0275did"](2,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,Z)),u["\u0275did"](4,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,2,0,!e.file&&!e.archive),l(n,4,0,e.archive)},null)}var Q=e("xMyE"),X=e("AytR"),$=e("t/Na"),ll=X.a.apiUrl,nl=function(){function l(l){this.http=l}return l.prototype.file=function(l){return this.http.post("https://archioqa.appspot.com/posts",l).pipe(Object(Q.a)(function(l){return l}))},l.prototype.getFile=function(l){return this.http.get(ll+"/pictures?archive="+l).pipe(Object(Q.a)(function(l){return l}))},l.ngInjectableDef=u.defineInjectable({factory:function(){return new l(u.inject($.c))},token:l,providedIn:"root"}),l}(),el=e("GYnv"),ul=function(){function l(l,n,e,u,t,o){this._route=l,this.route=n,this.archiveSrv=e,this.filesSrv=u,this.successMsgSrv=t,this.errorMsg=o,this.loading=!0,this.uploadFile=new a.FormGroup({storehouse:new a.FormControl(""),volume:new a.FormControl(""),archive:new a.FormControl(""),file:new a.FormControl(null,[a.Validators.required])})}return l.prototype.ngOnInit=function(){this.id=this.route.snapshot.paramMap.get("id"),this.getArquive()},l.prototype.getArquive=function(){var l=this;this.archiveSrv.archive(this.id).subscribe(function(n){l.archive=n,l.getFile(l.archive._id),l.loading=!1},function(n){console.log("ERROR: ",n),l.loading=!1})},l.prototype.getFile=function(l){var n=this;this.filesSrv.getFile(l).subscribe(function(l){n.file=l})},l.prototype.mapLabel=function(l,n){var e="";return l.map(function(u,t){e+=t===l.length-1?u.namefield+": "+n[t]:u.namefield+": "+n[t]+" | "}),e},l.prototype.postFile=function(l){this.uploadFile.patchValue({archive:this.archive._id,volume:this.archive.volume._id,storehouse:this.archive.storehouse._id,file:l}),this.submit()},l.prototype.submit=function(){var l=this;this.loading=!0;var n=new FormData;n.append("file",this.uploadFile.get("file").value),n.append("storehouse",this.uploadFile.get("storehouse").value),n.append("volume",this.uploadFile.get("volume").value),n.append("archive",this.uploadFile.get("archive").value),this.filesSrv.file(n).subscribe(function(n){n._id&&(l.loading=!1,l.successMsgSrv.successMessages("Imagem anexada com sucesso.")),l.getFile(l.archive._id)},function(n){l.loading=!1,l.errorMsg.errorMessages(n),console.log("ERROR ",n)})},l}(),tl=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function ol(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"app-buttons-custom",[],null,null,null,H.b,H.a)),u["\u0275did"](1,114688,null,0,j.a,[a.FormBuilder],{id:[0,"id"],permissionEdit:[1,"permissionEdit"],permissionDelete:[2,"permissionDelete"]},null),u["\u0275pad"](2,1),u["\u0275pad"](3,1)],function(l,n){var e=n.component.archive._id,u=l(n,2,0,"DAENERYS"),t=l(n,3,0,"DAENERYS");l(n,1,0,e,u,t)},null)}function il(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,28,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"ngx-loading",[],null,null,null,d.b,d.a)),u["\u0275did"](2,114688,null,0,s.a,[s.c,u.ChangeDetectorRef],{show:[0,"show"],config:[1,"config"]},null),u["\u0275pod"](3,{backdropBorderRadius:0,fullScreenBackdrop:1,primaryColour:2,secondaryColour:3,tertiaryColour:4}),(l()(),u["\u0275eld"](4,0,null,null,1,"app-page-header",[],null,null,null,c.b,c.a)),u["\u0275did"](5,114688,null,0,p.a,[],{heading:[0,"heading"],icon:[1,"icon"]},null),(l()(),u["\u0275eld"](6,0,null,null,5,"div",[["style","margin-bottom: 10px"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"app-button-back",[],null,null,null,z.b,z.a)),u["\u0275did"](8,49152,null,0,L.a,[x.l],{redirectTo:[0,"redirectTo"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,ol)),u["\u0275did"](10,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](11,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),u["\u0275eld"](12,0,null,null,16,"div",[["class","card bg-light mb-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](13,0,null,null,15,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,1,"app-form-index",[],null,null,null,U.b,U.a)),u["\u0275did"](15,573440,null,0,Y.a,[],{data:[0,"data"],isArchive:[1,"isArchive"]},null),(l()(),u["\u0275eld"](16,0,null,null,12,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,11,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,e){var t=!0,o=l.component;return"submit"===n&&(t=!1!==u["\u0275nov"](l,19).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,19).onReset()&&t),"ngSubmit"===n&&(t=!1!==o.submit()&&t),t},null,null)),u["\u0275did"](18,16384,null,0,a["\u0275angular_packages_forms_forms_bh"],[],null,null),u["\u0275did"](19,540672,null,0,a.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),u["\u0275prd"](2048,null,a.ControlContainer,null,[a.FormGroupDirective]),u["\u0275did"](21,16384,null,0,a.NgControlStatusGroup,[[4,a.ControlContainer]],null,null),(l()(),u["\u0275eld"](22,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,5,"app-form-upload",[["formControlName","file"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"postFile"],[null,"change"]],function(l,n,e){var t=!0,o=l.component;return"change"===n&&(t=!1!==u["\u0275nov"](l,24).emitFiles(e.target.files)&&t),"postFile"===n&&(t=!1!==o.postFile(e)&&t),t},K,J)),u["\u0275did"](24,49152,null,0,B,[u.ElementRef],{archive:[0,"archive"]},{postFile:"postFile"}),u["\u0275prd"](1024,null,a.NG_VALUE_ACCESSOR,function(l){return[l]},[B]),u["\u0275did"](26,671744,null,0,a.FormControlName,[[3,a.ControlContainer],[8,null],[8,null],[6,a.NG_VALUE_ACCESSOR],[2,a["\u0275angular_packages_forms_forms_k"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,a.NgControl,null,[a.FormControlName]),u["\u0275did"](28,16384,null,0,a.NgControlStatus,[[4,a.NgControl]],null,null)],function(l,n){var e=n.component,u=e.loading,t=l(n,3,0,"3px",!0,"#222","#222","#222");l(n,2,0,u,t),l(n,5,0,"Arquivo","fa-user"),l(n,8,0,"archives"),l(n,10,0,e.archive),l(n,15,0,e.archive,!0),l(n,19,0,e.uploadFile),l(n,24,0,e.file),l(n,26,0,"file")},function(l,n){l(n,0,0,void 0),l(n,17,0,u["\u0275nov"](n,21).ngClassUntouched,u["\u0275nov"](n,21).ngClassTouched,u["\u0275nov"](n,21).ngClassPristine,u["\u0275nov"](n,21).ngClassDirty,u["\u0275nov"](n,21).ngClassValid,u["\u0275nov"](n,21).ngClassInvalid,u["\u0275nov"](n,21).ngClassPending),l(n,23,0,u["\u0275nov"](n,28).ngClassUntouched,u["\u0275nov"](n,28).ngClassTouched,u["\u0275nov"](n,28).ngClassPristine,u["\u0275nov"](n,28).ngClassDirty,u["\u0275nov"](n,28).ngClassValid,u["\u0275nov"](n,28).ngClassInvalid,u["\u0275nov"](n,28).ngClassPending)})}function al(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-show",[],null,null,null,il,tl)),u["\u0275did"](1,114688,null,0,ul,[x.l,x.a,D.a,nl,el.a,R.a],null,null)],function(l,n){l(n,1,0)},null)}var rl=u["\u0275ccf"]("app-show",ul,al,{},{},[]),dl=e("YImT"),sl=e("1R5E"),cl=e("fS5t"),pl=e("vZwA"),ml=function(){function l(l){this.router=l}return l.prototype.canActivate=function(l,n){return!!this.isDaenerysOrTywinOrSnow()||(this.router.navigate(["/not-authorized"]),!1)},l.prototype.isDaenerysOrTywinOrSnow=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"DAENERYS"!==n&&"TYWIN"!==n&&"SNOW"!==n||(l=!0)}),l},l.ngInjectableDef=u.defineInjectable({factory:function(){return new l(u.inject(x.l))},token:l,providedIn:"root"}),l}(),gl=function(){return function(){}}(),fl=e("+Sv0"),vl=e("F8xH"),hl=e("Nycf"),bl=e("6jVp"),Cl=e("W6HM"),wl=e("Aq+q"),yl=e("D1ZJ"),Tl=e("10iu"),Dl=e("sCsO");e.d(n,"ArchivesModuleNgFactory",function(){return Rl});var Rl=u["\u0275cmf"](t,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,o.b,o.v,o.w,o.s,o.t,o.u,i.a,G,rl,dl.e,dl.f,sl.a,cl.b,cl.a,cl.d,cl.e,cl.f,cl.c,cl.g]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[u.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,a["\u0275angular_packages_forms_forms_j"],a["\u0275angular_packages_forms_forms_j"],[]),u["\u0275mpd"](4608,m.E,m.E,[u.ComponentFactoryResolver,u.Injector,m.Eb,m.F]),u["\u0275mpd"](4608,a.FormBuilder,a.FormBuilder,[]),u["\u0275mpd"](4608,v.ScrollbarHelper,v.ScrollbarHelper,[r.DOCUMENT]),u["\u0275mpd"](4608,h.DimensionsHelper,h.DimensionsHelper,[]),u["\u0275mpd"](4608,b.ColumnChangesService,b.ColumnChangesService,[]),u["\u0275mpd"](4608,pl.h,pl.h,[pl.e,u.ComponentFactoryResolver,u.Injector]),u["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),u["\u0275mpd"](1073742336,m.d,m.d,[]),u["\u0275mpd"](1073742336,m.h,m.h,[]),u["\u0275mpd"](1073742336,m.j,m.j,[]),u["\u0275mpd"](1073742336,m.n,m.n,[]),u["\u0275mpd"](1073742336,m.p,m.p,[]),u["\u0275mpd"](1073742336,a["\u0275angular_packages_forms_forms_bc"],a["\u0275angular_packages_forms_forms_bc"],[]),u["\u0275mpd"](1073742336,a.FormsModule,a.FormsModule,[]),u["\u0275mpd"](1073742336,m.v,m.v,[]),u["\u0275mpd"](1073742336,m.A,m.A,[]),u["\u0275mpd"](1073742336,m.G,m.G,[]),u["\u0275mpd"](1073742336,m.K,m.K,[]),u["\u0275mpd"](1073742336,m.S,m.S,[]),u["\u0275mpd"](1073742336,m.V,m.V,[]),u["\u0275mpd"](1073742336,m.ab,m.ab,[]),u["\u0275mpd"](1073742336,m.gb,m.gb,[]),u["\u0275mpd"](1073742336,m.kb,m.kb,[]),u["\u0275mpd"](1073742336,m.nb,m.nb,[]),u["\u0275mpd"](1073742336,m.qb,m.qb,[]),u["\u0275mpd"](1073742336,m.H,m.H,[]),u["\u0275mpd"](1073742336,x.p,x.p,[[2,x.v],[2,x.l]]),u["\u0275mpd"](1073742336,gl,gl,[]),u["\u0275mpd"](1073742336,fl.a,fl.a,[]),u["\u0275mpd"](1073742336,a.ReactiveFormsModule,a.ReactiveFormsModule,[]),u["\u0275mpd"](1073742336,vl.NgxDatatableModule,vl.NgxDatatableModule,[]),u["\u0275mpd"](1073742336,hl.a,hl.a,[]),u["\u0275mpd"](1073742336,bl.a,bl.a,[]),u["\u0275mpd"](1073742336,Cl.a,Cl.a,[]),u["\u0275mpd"](512,pl.e,pl.e,[]),u["\u0275mpd"](1024,pl.a,function(l){return[{wrappers:[{name:"addons",component:wl.b}],extensions:[{name:"addons",extension:{postPopulate:wl.c}}]},{types:[{name:"input",component:yl.c,wrappers:["form-field"]},{name:"checkbox",component:yl.b,wrappers:["form-field"]},{name:"radio",component:yl.e,wrappers:["form-field"]},{name:"select",component:yl.f,wrappers:["form-field"]},{name:"textarea",component:yl.g,wrappers:["form-field"]},{name:"multicheckbox",component:yl.d,wrappers:["form-field"]}],wrappers:[{name:"form-field",component:yl.h}]},pl.j(l),{}]},[pl.e]),u["\u0275mpd"](1073742336,pl.i,pl.i,[pl.e,[2,pl.a]]),u["\u0275mpd"](1073742336,Tl.a,Tl.a,[]),u["\u0275mpd"](1073742336,wl.a,wl.a,[]),u["\u0275mpd"](1073742336,yl.a,yl.a,[]),u["\u0275mpd"](1073742336,Dl.a,Dl.a,[]),u["\u0275mpd"](1073742336,s.b,s.b,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,x.j,function(){return[[{path:"",component:S,canActivate:[ml]},{path:":id",component:ul,canActivate:[ml]}]]},[]),u["\u0275mpd"](256,"loadingConfig",{},[])])})}}]);