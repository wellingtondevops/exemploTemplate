(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{Aier:function(n,o,e){"use strict";e.d(o,"a",function(){return r});var t=e("CcnG"),i=e("SZbH"),r=function(){function n(n){this.toastr=n}return n.prototype.errorMessages=function(n){var o={message:"",status:0};switch(n.status){case 400:case 403:case 404:case 405:case 500:case 0:o.message=n.error.message,o.status=n.status}return this.showError(o),o},n.prototype.showError=function(n){this.toastr.error("Erro "+n.status,n.message)},n.ngInjectableDef=t.defineInjectable({factory:function(){return new n(t.inject(i.j))},token:n,providedIn:"root"}),n}()},RygT:function(n,o,e){"use strict";e.d(o,"c",function(){return c}),e.d(o,"a",function(){return s}),e.d(o,"b",function(){return a});var t=e("CcnG"),i=function(){return function(n){void 0===n&&(n={}),this.backdropBorderRadius=n.backdropBorderRadius,this.backdropBackgroundColour=n.backdropBackgroundColour,this.fullScreenBackdrop=n.fullScreenBackdrop,this.animationType=n.animationType,this.primaryColour=n.primaryColour,this.secondaryColour=n.secondaryColour,this.tertiaryColour=n.tertiaryColour}}(),r={chasingDots:"chasing-dots",circle:"sk-circle",circleSwish:"circleSwish",cubeGrid:"sk-cube-grid",doubleBounce:"double-bounce",none:"none",pulse:"pulse",rectangleBounce:"rectangle-bounce",rotatingPlane:"rotating-plane",threeBounce:"three-bounce",wanderingCubes:"wandering-cubes"},c=function(){function n(n){this.config=n,this.loadingConfig=this.config||new i}return n.ngInjectableDef=Object(t.defineInjectable)({factory:function(){return new n(Object(t.inject)("loadingConfig",8))},token:n,providedIn:"root"}),n}(),s=function(){function n(n,o){this.LoadingService=n,this.changeDetectorRef=o,this.config=new i,this.defaultConfig={animationType:r.threeBounce,backdropBackgroundColour:"rgba(0, 0, 0, 0.3)",backdropBorderRadius:"0px",fullScreenBackdrop:!1,primaryColour:"#ffffff",secondaryColour:"#ffffff",tertiaryColour:"#ffffff"},this.ngxLoadingAnimationTypes=r}return n.prototype.ngOnInit=function(){this.setupConfig()},n.prototype.setupConfig=function(){for(var n in this.defaultConfig)if("boolean"==typeof this.config[n]){if(null!=this.config[n])continue;this.config[n]=null!=this.LoadingService.loadingConfig[n]?this.LoadingService.loadingConfig[n]:this.defaultConfig[n]}else{if(null!=this.config[n])continue;this.config[n]=null!=this.LoadingService.loadingConfig[n]?this.LoadingService.loadingConfig[n]:this.defaultConfig[n]}},n.prototype.setShow=function(n){this.show=n,this.changeDetectorRef.markForCheck()},n}(),a=function(){function n(){}return n.forRoot=function(o){return{ngModule:n,providers:[{provide:"loadingConfig",useValue:o}]}},n}()}}]);