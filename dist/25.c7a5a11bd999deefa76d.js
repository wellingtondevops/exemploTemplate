(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{YIYR:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),i=e("Ip0R"),a=e("iAfa"),r=e("RygT"),d=e("rMXk"),c=e("3zLz"),p=e("R/X1"),s=e("3/HP"),m=e("FO+L"),g=e("nhM1"),f=e("BARL"),v=e("jvuA"),h=e("UReH"),b=e("Y0Co"),C=e("8iEZ"),w=e("+j4G"),y=e("Aier"),T=e("PMS6"),D=function(){function l(l,n,e){this.archiveSrv=l,this.errorMsg=n,this._route=e,this.page=new T.a,this.loading=!1}return l.prototype.ngOnInit=function(){this.setPage({offset:0})},l.prototype.setPage=function(l){var n=this;this.loading=!0,this.page.pageNumber=l.offset,console.log(this.page),this.archiveSrv.archives(this.page).subscribe(function(l){n.page.pageNumber=l._links.currentPage-1,n.page.totalElements=l._links.foundItems,n.archives=l.items,n.loading=!1,console.log(n.page)},function(l){n.loading=!1,console.log("ERROR: ",l)})},l.prototype.toggleExpandRow=function(l){this.table.rowDetail.toggleExpandRow(l)},l.prototype.onDetailToggle=function(l){},l.prototype.showView=function(l){"click"==l.type&&this._route.navigate(["/archives/get",l.row._id])},l.prototype.guardType=function(l){var n="";switch(l){case"GERENCIADA":n="G"}return n},l}(),x=e("ZYCi"),R=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t["\u0275ted"](2,null,["",": "]))],null,function(l,n){l(n,2,0,n.context.$implicit.namefield)})}function F(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit)})}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"div",[["class","container"],["style","padding-bottom: 10px"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,2,"div",[["class","col-2"],["style","padding-left:35px;"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](4,278528,null,0,i.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](5,0,null,null,2,"div",[["class","col-4"],["style","padding-left:35px;"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](7,278528,null,0,i.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,4,0,n.context.row.doct.label),l(n,7,0,n.context.row.tag)},null)}function q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,0,"a",[["href","javascript:void(0)"],["title","Expand/Collapse Row"]],[[2,"datatable-icon-right",null],[2,"datatable-icon-down",null]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toggleExpandRow(l.context.row)&&t),t},null,null))],null,function(l,n){l(n,0,0,!n.context.expanded,n.context.expanded)})}function M(l){return t["\u0275vid"](0,[(l()(),t["\u0275ted"](0,null,[" "," "]))],null,function(l,n){l(n,0,0,n.component.guardType(n.context.value))})}function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275ted"](0,null,[" "," "])),t["\u0275ppd"](1,2)],null,function(l,n){var e=t["\u0275unv"](n,0,0,l(n,1,0,t["\u0275nov"](n.parent,0),n.context.value,"dd/MM/yyyy"));l(n,0,0,e)})}function I(l){return t["\u0275vid"](0,[t["\u0275pid"](0,i.DatePipe,[t.LOCALE_ID]),t["\u0275qud"](402653184,1,{table:0}),(l()(),t["\u0275eld"](2,0,null,null,57,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,2,"ngx-loading",[],null,null,null,a.b,a.a)),t["\u0275did"](4,114688,null,0,r.a,[r.c,t.ChangeDetectorRef],{show:[0,"show"],config:[1,"config"]},null),t["\u0275pod"](5,{backdropBorderRadius:0,fullScreenBackdrop:1,primaryColour:2,secondaryColour:3,tertiaryColour:4}),(l()(),t["\u0275eld"](6,0,null,null,1,"app-page-header",[],null,null,null,d.b,d.a)),t["\u0275did"](7,114688,null,0,c.a,[],{heading:[0,"heading"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](8,0,null,null,51,"ngx-datatable",[["class","material ngx-datatable"]],[[2,"fixed-header",null],[2,"fixed-row",null],[2,"scroll-vertical",null],[2,"virtualized",null],[2,"scroll-horz",null],[2,"selectable",null],[2,"checkbox-selection",null],[2,"cell-selection",null],[2,"single-selection",null],[2,"multi-selection",null],[2,"multi-click-selection",null]],[[null,"page"],[null,"activate"],["window","resize"]],function(l,n,e){var o=!0,u=l.component;return"window:resize"===n&&(o=!1!==t["\u0275nov"](l,9).onWindowResize()&&o),"page"===n&&(o=!1!==u.setPage(e)&&o),"activate"===n&&(o=!1!==u.showView(e)&&o),o},p.b,p.a)),t["\u0275did"](9,5750784,[[1,4],["myTable",4]],4,s.DatatableComponent,[[1,m.ScrollbarHelper],[1,g.DimensionsHelper],t.ChangeDetectorRef,t.ElementRef,t.KeyValueDiffers,f.ColumnChangesService],{rows:[0,"rows"],rowHeight:[1,"rowHeight"],columnMode:[2,"columnMode"],headerHeight:[3,"headerHeight"],footerHeight:[4,"footerHeight"],externalPaging:[5,"externalPaging"],limit:[6,"limit"],count:[7,"count"],offset:[8,"offset"]},{activate:"activate",page:"page"}),t["\u0275qud"](603979776,2,{columnTemplates:1}),t["\u0275qud"](335544320,3,{rowDetail:0}),t["\u0275qud"](335544320,4,{groupHeader:0}),t["\u0275qud"](335544320,5,{footer:0}),(l()(),t["\u0275eld"](14,0,[["myDetailRow",1]],null,4,"ngx-datatable-row-detail",[],null,[[null,"toggle"]],function(l,n,e){var t=!0;return"toggle"===n&&(t=!1!==l.component.onDetailToggle(e)&&t),t},null,null)),t["\u0275did"](15,16384,[[3,4]],1,v.DatatableRowDetailDirective,[],{rowHeight:[0,"rowHeight"]},{toggle:"toggle"}),t["\u0275qud"](335544320,6,{template:0}),(l()(),t["\u0275and"](0,[[6,2]],null,1,null,_)),t["\u0275did"](18,16384,null,0,h.DatatableRowDetailTemplateDirective,[t.TemplateRef],null,null),(l()(),t["\u0275eld"](19,0,null,null,6,"ngx-datatable-column",[],null,null,null,null,null)),t["\u0275did"](20,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{resizeable:[0,"resizeable"],sortable:[1,"sortable"],draggable:[2,"draggable"],canAutoResize:[3,"canAutoResize"],width:[4,"width"]},null),t["\u0275qud"](335544320,7,{cellTemplate:0}),t["\u0275qud"](335544320,8,{headerTemplate:0}),t["\u0275qud"](335544320,9,{treeToggleTemplate:0}),(l()(),t["\u0275and"](0,[[7,2]],null,1,null,q)),t["\u0275did"](25,16384,null,0,C.DataTableColumnCellDirective,[t.TemplateRef],null,null),(l()(),t["\u0275eld"](26,0,null,null,4,"ngx-datatable-column",[["name","Localiza\xe7\xe3o"],["prop","volume.location"]],null,null,null,null,null)),t["\u0275did"](27,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,10,{cellTemplate:0}),t["\u0275qud"](335544320,11,{headerTemplate:0}),t["\u0275qud"](335544320,12,{treeToggleTemplate:0}),(l()(),t["\u0275eld"](31,0,null,null,4,"ngx-datatable-column",[["name","Descri\xe7\xe3o"],["prop","volume.description"]],null,null,null,null,null)),t["\u0275did"](32,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,13,{cellTemplate:0}),t["\u0275qud"](335544320,14,{headerTemplate:0}),t["\u0275qud"](335544320,15,{treeToggleTemplate:0}),(l()(),t["\u0275eld"](36,0,null,null,6,"ngx-datatable-column",[["name","Guarda"],["prop","volume.guardType"]],null,null,null,null,null)),t["\u0275did"](37,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,16,{cellTemplate:0}),t["\u0275qud"](335544320,17,{headerTemplate:0}),t["\u0275qud"](335544320,18,{treeToggleTemplate:0}),(l()(),t["\u0275and"](0,[[16,2]],null,1,null,M)),t["\u0275did"](42,16384,null,0,C.DataTableColumnCellDirective,[t.TemplateRef],null,null),(l()(),t["\u0275eld"](43,0,null,null,4,"ngx-datatable-column",[["name","Armaz\xe9m"],["prop","storehouse.name"]],null,null,null,null,null)),t["\u0275did"](44,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,19,{cellTemplate:0}),t["\u0275qud"](335544320,20,{headerTemplate:0}),t["\u0275qud"](335544320,21,{treeToggleTemplate:0}),(l()(),t["\u0275eld"](48,0,null,null,4,"ngx-datatable-column",[["name","Empresa"],["prop","company.name"]],null,null,null,null,null)),t["\u0275did"](49,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,22,{cellTemplate:0}),t["\u0275qud"](335544320,23,{headerTemplate:0}),t["\u0275qud"](335544320,24,{treeToggleTemplate:0}),(l()(),t["\u0275eld"](53,0,null,null,6,"ngx-datatable-column",[["name","Criado em"],["prop","create"]],null,null,null,null,null)),t["\u0275did"](54,540672,[[2,4]],3,b.DataTableColumnDirective,[f.ColumnChangesService],{name:[0,"name"],prop:[1,"prop"],width:[2,"width"]},null),t["\u0275qud"](335544320,25,{cellTemplate:0}),t["\u0275qud"](335544320,26,{headerTemplate:0}),t["\u0275qud"](335544320,27,{treeToggleTemplate:0}),(l()(),t["\u0275and"](0,[[25,2]],null,1,null,E)),t["\u0275did"](59,16384,null,0,C.DataTableColumnCellDirective,[t.TemplateRef],null,null)],function(l,n){var e=n.component,t=e.loading,o=l(n,5,0,"3px",!0,"#222","#222","#222");l(n,4,0,t,o),l(n,7,0,"Arquivos","fa-table"),l(n,9,0,e.archives,"auto","force",50,50,!0,10,e.page.totalElements,e.page.pageNumber),l(n,15,0,"auto"),l(n,20,0,!1,!1,!1,!1,50),l(n,27,0,"Localiza\xe7\xe3o","volume.location",200),l(n,32,0,"Descri\xe7\xe3o","volume.description",200),l(n,37,0,"Guarda","volume.guardType",150),l(n,44,0,"Armaz\xe9m","storehouse.name",200),l(n,49,0,"Empresa","company.name",300),l(n,54,0,"Criado em","create",300)},function(l,n){l(n,2,0,void 0),l(n,8,1,[t["\u0275nov"](n,9).isFixedHeader,t["\u0275nov"](n,9).isFixedRow,t["\u0275nov"](n,9).isVertScroll,t["\u0275nov"](n,9).isVirtualized,t["\u0275nov"](n,9).isHorScroll,t["\u0275nov"](n,9).isSelectable,t["\u0275nov"](n,9).isCheckboxSelection,t["\u0275nov"](n,9).isCellSelection,t["\u0275nov"](n,9).isSingleSelection,t["\u0275nov"](n,9).isMultiSelection,t["\u0275nov"](n,9).isMultiClickSelection])})}function A(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-list",[],null,null,null,I,R)),t["\u0275did"](1,114688,null,0,D,[w.a,y.a,x.l],null,null)],function(l,n){l(n,1,0)},null)}var k=t["\u0275ccf"]("app-list",D,A,{},{},[]),O=e("UIfG"),N=e("QQT3"),H=e("gIcY"),z=e("dhOI"),P=e("yUoD"),j=e("I9/A"),V=e("ILT9"),G=function(){function l(l){this.host=l,this.file=null,this.postFile=new t.EventEmitter}return l.prototype.emitFiles=function(l){var n=l&&l.item(0);this.onChange(n),this.file=n,this.postFile.emit(this.file)},l.prototype.writeValue=function(l){this.host.nativeElement.value="",this.file=null},l.prototype.registerOnChange=function(l){this.onChange=l},l.prototype.registerOnTouched=function(l){},l}(),L=t["\u0275crt"]({encapsulation:0,styles:[["@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);.file-drop-area[_ngcontent-%COMP%]{border:1px dashed #000;border-radius:3px;position:relative;max-width:100%;padding:26px 20px 30px;transition:.2s}.file-drop-area.is-active[_ngcontent-%COMP%]{background-color:#000}.fake-btn[_ngcontent-%COMP%]{color:#fff;background-color:#000}.file-msg[_ngcontent-%COMP%]{font-size:small;font-weight:300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block;max-width:calc(100% - 130px);vertical-align:middle}.file-input[_ngcontent-%COMP%]{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.file-input[_ngcontent-%COMP%]:focus{outline:0}"]],data:{}});function Y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"span",[["class","btn fake-btn"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Escolha o arquivo"])),(l()(),t["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](4,null,["",""])),(l()(),t["\u0275eld"](5,0,null,null,0,"input",[["class","file-input"],["type","file"]],null,null,null,null,null))],null,function(l,n){var e=n.component;l(n,4,0,e.file?e.file.name:" ou arraste o arquivo aqui")})}function B(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"img",[["style","margin-right:10px"],["width","100px"]],[[8,"src",4]],null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","btn btn-default"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Excluir"]))],null,function(l,n){l(n,1,0,n.component.archive.url)})}function U(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","file-drop-area"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,Y)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,B)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,2,0,!e.file&&!e.archive),l(n,4,0,e.archive)},null)}var J=e("xMyE"),W=e("AytR"),Q=e("t/Na"),Z=W.a.apiUrl,X=function(){function l(l){this.http=l}return l.prototype.file=function(l){return this.http.post("https://archioqa.appspot.com/posts",l).pipe(Object(J.a)(function(l){return l}))},l.prototype.getFile=function(l){return this.http.get(Z+"/pictures?archive="+l).pipe(Object(J.a)(function(l){return l}))},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(Q.c))},token:l,providedIn:"root"}),l}(),$=e("GYnv"),K=function(){function l(l,n,e,t,o,u){this._route=l,this.route=n,this.archiveSrv=e,this.filesSrv=t,this.successMsgSrv=o,this.errorMsg=u,this.loading=!0,this.uploadFile=new H.FormGroup({storehouse:new H.FormControl(""),volume:new H.FormControl(""),archive:new H.FormControl(""),file:new H.FormControl(null,[H.Validators.required])})}return l.prototype.ngOnInit=function(){this.id=this.route.snapshot.paramMap.get("id"),this.getArquive()},l.prototype.getArquive=function(){var l=this;this.archiveSrv.archive(this.id).subscribe(function(n){l.archive=n,l.getFile(l.archive._id),l.loading=!1},function(n){console.log("ERROR: ",n),l.loading=!1})},l.prototype.getFile=function(l){var n=this;this.filesSrv.getFile(l).subscribe(function(l){n.file=l})},l.prototype.mapLabel=function(l,n){var e="";return l.map(function(t,o){e+=o===l.length-1?t.namefield+": "+n[o]:t.namefield+": "+n[o]+" | "}),e},l.prototype.postFile=function(l){this.uploadFile.patchValue({archive:this.archive._id,volume:this.archive.volume._id,storehouse:this.archive.storehouse._id,file:l}),this.submit()},l.prototype.submit=function(){var l=this;this.loading=!0;var n=new FormData;n.append("file",this.uploadFile.get("file").value),n.append("storehouse",this.uploadFile.get("storehouse").value),n.append("volume",this.uploadFile.get("volume").value),n.append("archive",this.uploadFile.get("archive").value),this.filesSrv.file(n).subscribe(function(n){n._id&&(l.loading=!1,l.successMsgSrv.successMessages("Imagem anexada com sucesso.")),l.getFile(l.archive._id)},function(n){l.loading=!1,l.errorMsg.errorMessages(n),console.log("ERROR ",n)})},l}(),ll=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function nl(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"app-buttons-custom",[],null,null,null,O.b,O.a)),t["\u0275did"](1,114688,null,0,N.a,[H.FormBuilder],{id:[0,"id"],permissionEdit:[1,"permissionEdit"],permissionDelete:[2,"permissionDelete"]},null),t["\u0275pad"](2,1),t["\u0275pad"](3,1)],function(l,n){var e=n.component.archive._id,t=l(n,2,0,"DAENERYS"),o=l(n,3,0,"DAENERYS");l(n,1,0,e,t,o)},null)}function el(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,28,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"ngx-loading",[],null,null,null,a.b,a.a)),t["\u0275did"](2,114688,null,0,r.a,[r.c,t.ChangeDetectorRef],{show:[0,"show"],config:[1,"config"]},null),t["\u0275pod"](3,{backdropBorderRadius:0,fullScreenBackdrop:1,primaryColour:2,secondaryColour:3,tertiaryColour:4}),(l()(),t["\u0275eld"](4,0,null,null,1,"app-page-header",[],null,null,null,d.b,d.a)),t["\u0275did"](5,114688,null,0,c.a,[],{heading:[0,"heading"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](6,0,null,null,5,"div",[["style","margin-bottom: 10px"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"app-button-back",[],null,null,null,z.b,z.a)),t["\u0275did"](8,49152,null,0,P.a,[x.l],{redirectTo:[0,"redirectTo"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,nl)),t["\u0275did"](10,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](11,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,16,"div",[["class","card bg-light mb-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,15,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,1,"app-form-index",[],null,null,null,j.b,j.a)),t["\u0275did"](15,573440,null,0,V.a,[],{data:[0,"data"],isArchive:[1,"isArchive"]},null),(l()(),t["\u0275eld"](16,0,null,null,12,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,11,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,e){var o=!0,u=l.component;return"submit"===n&&(o=!1!==t["\u0275nov"](l,19).onSubmit(e)&&o),"reset"===n&&(o=!1!==t["\u0275nov"](l,19).onReset()&&o),"ngSubmit"===n&&(o=!1!==u.submit()&&o),o},null,null)),t["\u0275did"](18,16384,null,0,H["\u0275angular_packages_forms_forms_bh"],[],null,null),t["\u0275did"](19,540672,null,0,H.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),t["\u0275prd"](2048,null,H.ControlContainer,null,[H.FormGroupDirective]),t["\u0275did"](21,16384,null,0,H.NgControlStatusGroup,[[4,H.ControlContainer]],null,null),(l()(),t["\u0275eld"](22,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,5,"app-form-upload",[["formControlName","file"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"postFile"],[null,"change"]],function(l,n,e){var o=!0,u=l.component;return"change"===n&&(o=!1!==t["\u0275nov"](l,24).emitFiles(e.target.files)&&o),"postFile"===n&&(o=!1!==u.postFile(e)&&o),o},U,L)),t["\u0275did"](24,49152,null,0,G,[t.ElementRef],{archive:[0,"archive"]},{postFile:"postFile"}),t["\u0275prd"](1024,null,H.NG_VALUE_ACCESSOR,function(l){return[l]},[G]),t["\u0275did"](26,671744,null,0,H.FormControlName,[[3,H.ControlContainer],[8,null],[8,null],[6,H.NG_VALUE_ACCESSOR],[2,H["\u0275angular_packages_forms_forms_k"]]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,H.NgControl,null,[H.FormControlName]),t["\u0275did"](28,16384,null,0,H.NgControlStatus,[[4,H.NgControl]],null,null)],function(l,n){var e=n.component,t=e.loading,o=l(n,3,0,"3px",!0,"#222","#222","#222");l(n,2,0,t,o),l(n,5,0,"Arquivo","fa-user"),l(n,8,0,"archives"),l(n,10,0,e.archive),l(n,15,0,e.archive,!0),l(n,19,0,e.uploadFile),l(n,24,0,e.file),l(n,26,0,"file")},function(l,n){l(n,0,0,void 0),l(n,17,0,t["\u0275nov"](n,21).ngClassUntouched,t["\u0275nov"](n,21).ngClassTouched,t["\u0275nov"](n,21).ngClassPristine,t["\u0275nov"](n,21).ngClassDirty,t["\u0275nov"](n,21).ngClassValid,t["\u0275nov"](n,21).ngClassInvalid,t["\u0275nov"](n,21).ngClassPending),l(n,23,0,t["\u0275nov"](n,28).ngClassUntouched,t["\u0275nov"](n,28).ngClassTouched,t["\u0275nov"](n,28).ngClassPristine,t["\u0275nov"](n,28).ngClassDirty,t["\u0275nov"](n,28).ngClassValid,t["\u0275nov"](n,28).ngClassInvalid,t["\u0275nov"](n,28).ngClassPending)})}function tl(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-show",[],null,null,null,el,ll)),t["\u0275did"](1,114688,null,0,K,[x.l,x.a,w.a,X,$.a,y.a],null,null)],function(l,n){l(n,1,0)},null)}var ol=t["\u0275ccf"]("app-show",K,tl,{},{},[]),ul=e("9AJC"),il=e("YImT"),al=e("1R5E"),rl=e("fS5t"),dl=e("4GxJ"),cl=e("vZwA"),pl=function(){function l(l){this.router=l}return l.prototype.canActivate=function(l,n){return!!this.isDaenerysOrTywinOrSnow()||(this.router.navigate(["/not-authorized"]),!1)},l.prototype.isDaenerysOrTywinOrSnow=function(){var l=!1;return JSON.parse(window.localStorage.getItem("profiles")).map(function(n){"DAENERYS"!==n&&"TYWIN"!==n&&"SNOW"!==n||(l=!0)}),l},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(x.l))},token:l,providedIn:"root"}),l}(),sl=function(){return function(){}}(),ml=e("+Sv0"),gl=e("F8xH"),fl=e("Nycf"),vl=e("6jVp"),hl=e("W6HM"),bl=e("Aq+q"),Cl=e("D1ZJ"),wl=e("10iu"),yl=e("sCsO");e.d(n,"ArchivesModuleNgFactory",function(){return Tl});var Tl=t["\u0275cmf"](o,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,k,ol,ul.a,ul.b,ul.u,ul.q,ul.r,ul.s,ul.t,il.e,il.f,al.a,rl.b,rl.a,rl.d,rl.e,rl.f,rl.c,rl.g]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[t.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,H.FormBuilder,H.FormBuilder,[]),t["\u0275mpd"](4608,H["\u0275angular_packages_forms_forms_j"],H["\u0275angular_packages_forms_forms_j"],[]),t["\u0275mpd"](4608,m.ScrollbarHelper,m.ScrollbarHelper,[i.DOCUMENT]),t["\u0275mpd"](4608,g.DimensionsHelper,g.DimensionsHelper,[]),t["\u0275mpd"](4608,f.ColumnChangesService,f.ColumnChangesService,[]),t["\u0275mpd"](4608,dl.A,dl.A,[t.ComponentFactoryResolver,t.Injector,dl.kb,dl.B]),t["\u0275mpd"](4608,cl.h,cl.h,[cl.e,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),t["\u0275mpd"](1073742336,x.p,x.p,[[2,x.v],[2,x.l]]),t["\u0275mpd"](1073742336,sl,sl,[]),t["\u0275mpd"](1073742336,ml.a,ml.a,[]),t["\u0275mpd"](1073742336,H["\u0275angular_packages_forms_forms_bc"],H["\u0275angular_packages_forms_forms_bc"],[]),t["\u0275mpd"](1073742336,H.ReactiveFormsModule,H.ReactiveFormsModule,[]),t["\u0275mpd"](1073742336,gl.NgxDatatableModule,gl.NgxDatatableModule,[]),t["\u0275mpd"](1073742336,H.FormsModule,H.FormsModule,[]),t["\u0275mpd"](1073742336,dl.d,dl.d,[]),t["\u0275mpd"](1073742336,dl.h,dl.h,[]),t["\u0275mpd"](1073742336,dl.i,dl.i,[]),t["\u0275mpd"](1073742336,dl.m,dl.m,[]),t["\u0275mpd"](1073742336,dl.o,dl.o,[]),t["\u0275mpd"](1073742336,dl.u,dl.u,[]),t["\u0275mpd"](1073742336,dl.x,dl.x,[]),t["\u0275mpd"](1073742336,dl.C,dl.C,[]),t["\u0275mpd"](1073742336,dl.G,dl.G,[]),t["\u0275mpd"](1073742336,dl.J,dl.J,[]),t["\u0275mpd"](1073742336,dl.M,dl.M,[]),t["\u0275mpd"](1073742336,dl.Q,dl.Q,[]),t["\u0275mpd"](1073742336,dl.W,dl.W,[]),t["\u0275mpd"](1073742336,dl.ab,dl.ab,[]),t["\u0275mpd"](1073742336,dl.db,dl.db,[]),t["\u0275mpd"](1073742336,dl.gb,dl.gb,[]),t["\u0275mpd"](1073742336,dl.D,dl.D,[]),t["\u0275mpd"](1073742336,fl.a,fl.a,[]),t["\u0275mpd"](1073742336,vl.a,vl.a,[]),t["\u0275mpd"](1073742336,hl.a,hl.a,[]),t["\u0275mpd"](512,cl.e,cl.e,[]),t["\u0275mpd"](1024,cl.a,function(l){return[{wrappers:[{name:"addons",component:bl.b}],extensions:[{name:"addons",extension:{postPopulate:bl.c}}]},{types:[{name:"input",component:Cl.c,wrappers:["form-field"]},{name:"checkbox",component:Cl.b,wrappers:["form-field"]},{name:"radio",component:Cl.e,wrappers:["form-field"]},{name:"select",component:Cl.f,wrappers:["form-field"]},{name:"textarea",component:Cl.g,wrappers:["form-field"]},{name:"multicheckbox",component:Cl.d,wrappers:["form-field"]}],wrappers:[{name:"form-field",component:Cl.h}]},cl.j(l),{}]},[cl.e]),t["\u0275mpd"](1073742336,cl.i,cl.i,[cl.e,[2,cl.a]]),t["\u0275mpd"](1073742336,wl.a,wl.a,[]),t["\u0275mpd"](1073742336,bl.a,bl.a,[]),t["\u0275mpd"](1073742336,Cl.a,Cl.a,[]),t["\u0275mpd"](1073742336,yl.a,yl.a,[]),t["\u0275mpd"](1073742336,r.b,r.b,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,x.j,function(){return[[{path:"",component:D,canActivate:[pl]},{path:"get/:id",component:K,canActivate:[pl]}]]},[]),t["\u0275mpd"](256,"loadingConfig",{},[])])})}}]);