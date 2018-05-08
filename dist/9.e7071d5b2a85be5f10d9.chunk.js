webpackJsonp([9],{LfWX:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=u("LMZF"),t=function(){},d=u("wC3u"),a=u("697t"),s=u("c4k3"),i=u("oXAn"),o=u("v/qN"),r=u("e3up"),c=u("VnGV"),m=u("8ly9"),p=u("lvpt"),g=u("wdXM"),f=u("i0AX"),v=u("UHIZ"),h=u("6lRS"),b=u("gOac"),_=function(){function l(l,n,u,e){var t=this;this.general=l,this.auth=n,this.route=u,this.router=e,this.displayedColumns=["user_id","full_name"],this.assignment=new b.a,this.loading=!1,this.route.params.subscribe(function(l){t.assignment.assignment_id=l.id}),this.getAssignment(this.assignment.assignment_id)}return l.prototype.ngOnInit=function(){},l.prototype.getAssignment=function(l){var n=this;this.loading=!0,this.auth.postData(this.general.getAuthObject(),"api/assignment/get/"+l).then(function(l){var u=l;"0"==u.status?(alert(u.message),n.loading=!1):u.error?(alert(u.error.text),console.log(u.error.text),n.loading=!1):(n.assignment.assignment_id=u.data.assignment_id,n.assignment.user_id=u.data.user_id,n.assignment.team=u.data.team,n.assignment.address=u.data.address,n.assignment.remark=u.data.remark,n.assignment.createdBy=u.data.full_name,n.assignment.date=n.general.toDateDisplayFormat(u.data.date),n.assignment.pa_full_name=u.data.pa_full_name,n.assignment.pka_full_name=u.data.pka_full_name,n.auth.postData(n.general.getAuthObject(),"api/assignment_admin/getList/"+n.assignment.assignment_id).then(function(l){var u=l;if("0"==u.status)alert(u.message);else if(u.error)console.log(u.error.text);else{var e=[];u.data.forEach(function(l){var n=new b.c;n.user_id=l.user_id,n.full_name=l.full_name,e.push(n)}),n.dataSource=new h.a(e),n.dataSource.paginator=n.paginator,n.dataSource.sort=n.sort}n.loading=!1},function(l){n.loading=!1,console.log(l),n.general.displayErrorAlert("get assignment users list")}))},function(l){n.loading=!1,n.general.displayErrorAlert("get assignment data"),console.log(l)})},l.prototype.editBtn=function(){this.router.navigate(["/addEditPDKAssignment","2",this.assignment.assignment_id])},l.prototype.deleteBtn=function(){var l=this;confirm("Confirm to delete assignment?")&&(this.loading=!0,this.auth.postData(this.general.getAuthObject(),"api/assignment/delete/"+this.assignment.assignment_id).then(function(n){var u=n;l.loading=!1,"0"==u.status?alert(u.message):u.error?console.log(u.error.text):(alert("Assignment has been deleted successfully"),l.router.navigate(["/managePDK"]))},function(n){l.loading=!1,l.general.displayErrorAlert("delete assignment"),console.log(n)}))},l}(),y=u("UoW6"),w=u("JZIl"),C=e["\u0275crt"]({encapsulation:0,styles:[[".tbl-userlst[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%], .tbl-userlst[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%]{-webkit-box-flex:unset;-ms-flex:unset;flex:unset}.tbl-userlst[_ngcontent-%COMP%]   .mat-column-user_id[_ngcontent-%COMP%]{width:10%}.tbl-userlst[_ngcontent-%COMP%]   .mat-column-full_name[_ngcontent-%COMP%]{width:90%}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[{type:0,name:"void",styles:{type:6,styles:{},offset:null},options:void 0},{type:0,name:"*",styles:{type:6,styles:{},offset:null},options:void 0},{type:1,expr:":enter",animation:[{type:6,styles:{transform:"translateY(-100%)"},offset:null},{type:4,styles:{type:6,styles:{transform:"translateY(0%)"},offset:null},timings:"0.5s ease-in-out"}],options:null},{type:1,expr:":leave",animation:[{type:6,styles:{transform:"translateY(0%)"},offset:null},{type:4,styles:{type:6,styles:{transform:"translateY(100%)"},offset:null},timings:"0.5s ease-in-out"}],options:null}],options:{}}]}});function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"mat-header-cell",[["class","mat-header-cell"],["mat-sort-header",""],["role","columnheader"]],[[2,"mat-sort-header-disabled",null]],[[null,"click"],[null,"mouseenter"],[null,"longpress"],[null,"mouseleave"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,2)._handleClick()&&t),"mouseenter"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!0)&&t),"longpress"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!0)&&t),"mouseleave"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!1)&&t),t},d.b,d.a)),e["\u0275did"](1,16384,null,0,a.d,[s.d,e.ElementRef],null,null),e["\u0275did"](2,245760,null,0,i.c,[i.d,e.ChangeDetectorRef,[2,i.b],[2,s.d]],{id:[0,"id"]},null),(l()(),e["\u0275ted"](-1,0,[" ID "]))],function(l,n){l(n,2,0,"")},function(l,n){l(n,0,0,e["\u0275nov"](n,2)._isDisabled())})}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"mat-cell",[["class","mat-cell"],["role","gridcell"]],null,null,null,null,null)),e["\u0275did"](1,16384,null,0,a.a,[s.d,e.ElementRef],null,null),(l()(),e["\u0275ted"](2,null,[" "," "]))],null,function(l,n){l(n,2,0,n.context.$implicit.user_id)})}function D(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"mat-header-cell",[["class","mat-header-cell"],["mat-sort-header",""],["role","columnheader"]],[[2,"mat-sort-header-disabled",null]],[[null,"click"],[null,"mouseenter"],[null,"longpress"],[null,"mouseleave"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,2)._handleClick()&&t),"mouseenter"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!0)&&t),"longpress"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!0)&&t),"mouseleave"===n&&(t=!1!==e["\u0275nov"](l,2)._setIndicatorHintVisible(!1)&&t),t},d.b,d.a)),e["\u0275did"](1,16384,null,0,a.d,[s.d,e.ElementRef],null,null),e["\u0275did"](2,245760,null,0,i.c,[i.d,e.ChangeDetectorRef,[2,i.b],[2,s.d]],{id:[0,"id"]},null),(l()(),e["\u0275ted"](-1,0,[" Full Name "]))],function(l,n){l(n,2,0,"")},function(l,n){l(n,0,0,e["\u0275nov"](n,2)._isDisabled())})}function A(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"mat-cell",[["class","mat-cell"],["role","gridcell"]],null,null,null,null,null)),e["\u0275did"](1,16384,null,0,a.a,[s.d,e.ElementRef],null,null),(l()(),e["\u0275ted"](2,null,[" "," "]))],null,function(l,n){l(n,2,0,n.context.$implicit.full_name)})}function x(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"mat-header-row",[["class","mat-header-row"],["role","row"]],null,null,null,o.d,o.a)),e["\u0275did"](1,49152,null,0,a.f,[],null,null)],null,null)}function O(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"mat-row",[["class","mat-row"],["role","row"]],null,null,null,o.e,o.b)),e["\u0275did"](1,49152,null,0,a.h,[],null,null)],null,null)}function I(l){return e["\u0275vid"](0,[e["\u0275qud"](402653184,1,{paginator:0}),e["\u0275qud"](402653184,2,{sort:0}),(l()(),e["\u0275eld"](2,0,null,null,209,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"app-page-header",[],null,null,null,r.b,r.a)),e["\u0275did"](5,114688,null,0,c.a,[],{heading:[0,"heading"],icon:[1,"icon"]},null),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275eld"](7,0,null,null,2,"ngx-loading",[],null,null,null,m.b,m.a)),e["\u0275did"](8,114688,null,0,p.b,[p.c],{show:[0,"show"],config:[1,"config"]},null),e["\u0275pod"](9,{fullScreenBackdrop:0}),(l()(),e["\u0275ted"](-1,null,["    \n    "])),(l()(),e["\u0275eld"](11,0,null,null,199,"div",[["class","col-lg-12 col-xl-12 col-centered"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275eld"](13,0,null,null,196,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275eld"](15,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["View Assignment"])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275eld"](18,0,null,null,165,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275eld"](20,0,null,null,162,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](22,0,null,null,97,"div",[["class","col-lg-6"],["style","word-wrap:break-word"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](24,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](26,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](28,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Assignment ID"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](32,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](33,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](36,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](38,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](40,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Team"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](44,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](45,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](48,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](50,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](52,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["PKA (Pembantu Kesihatan Am)"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](56,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](57,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](60,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](62,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](64,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["PA (Pembantu Am)"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](68,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](69,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](72,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](74,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](76,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Date"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](80,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](81,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](84,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](86,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](88,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Created by"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](92,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](93,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](96,0,null,null,10,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](98,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](100,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Address"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](104,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](105,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](108,0,null,null,10,"div",[["class","row"]],[[4,"padding",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](110,0,null,null,4,"div",[["class","col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](112,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Remark"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](116,0,null,null,1,"div",[["class","col-lg-8"]],null,null,null,null,null)),(l()(),e["\u0275ted"](117,null,["\n                                ","\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](121,0,null,null,60,"div",[["class","col-lg-6"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](123,0,null,null,57,"div",[["class","row"]],[[4,"padding-top",null]],null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](125,0,null,null,54,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](127,0,null,null,51,"div",[["class","mat-elevation-z8 tbl-userlst"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](129,0,null,null,44,"mat-table",[["class","mat-table"],["matSort",""]],null,null,null,o.f,o.c)),e["\u0275did"](130,2342912,null,3,a.j,[e.IterableDiffers,e.ChangeDetectorRef,e.ElementRef,[8,null]],{dataSource:[0,"dataSource"]},null),e["\u0275qud"](603979776,3,{_contentColumnDefs:1}),e["\u0275qud"](603979776,4,{_contentRowDefs:1}),e["\u0275qud"](335544320,5,{_headerRowDef:0}),e["\u0275did"](134,671744,[[2,4]],0,i.b,[],null,null),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](136,0,null,null,13,null,null,null,null,null,null,null)),e["\u0275did"](137,16384,null,2,a.c,[],{name:[0,"name"]},null),e["\u0275qud"](335544320,6,{cell:0}),e["\u0275qud"](335544320,7,{headerCell:0}),e["\u0275prd"](2048,[[3,4]],s.d,null,[a.c]),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275and"](0,null,null,2,null,k)),e["\u0275did"](143,16384,null,0,a.e,[e.TemplateRef],null,null),e["\u0275prd"](2048,[[7,4]],s.f,null,[a.e]),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275and"](0,null,null,2,null,R)),e["\u0275did"](147,16384,null,0,a.b,[e.TemplateRef],null,null),e["\u0275prd"](2048,[[6,4]],s.b,null,[a.b]),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](151,0,null,null,13,null,null,null,null,null,null,null)),e["\u0275did"](152,16384,null,2,a.c,[],{name:[0,"name"]},null),e["\u0275qud"](335544320,8,{cell:0}),e["\u0275qud"](335544320,9,{headerCell:0}),e["\u0275prd"](2048,[[3,4]],s.d,null,[a.c]),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275and"](0,null,null,2,null,D)),e["\u0275did"](158,16384,null,0,a.e,[e.TemplateRef],null,null),e["\u0275prd"](2048,[[9,4]],s.f,null,[a.e]),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275and"](0,null,null,2,null,A)),e["\u0275did"](162,16384,null,0,a.b,[e.TemplateRef],null,null),e["\u0275prd"](2048,[[8,4]],s.b,null,[a.b]),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275and"](0,null,null,2,null,x)),e["\u0275did"](167,540672,null,0,a.g,[e.TemplateRef,e.IterableDiffers],{columns:[0,"columns"]},null),e["\u0275prd"](2048,[[5,4]],s.h,null,[a.g]),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275and"](0,null,null,2,null,O)),e["\u0275did"](171,540672,null,0,a.i,[e.TemplateRef,e.IterableDiffers],{columns:[0,"columns"]},null),e["\u0275prd"](2048,[[4,4]],s.j,null,[a.i]),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](175,0,null,null,2,"mat-paginator",[["class","mat-paginator"]],null,null,null,g.b,g.a)),e["\u0275did"](176,245760,[[1,4]],0,f.b,[f.c,e.ChangeDetectorRef],{pageSizeOptions:[0,"pageSizeOptions"]},null),e["\u0275pad"](177,4),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275ted"](-1,null,["\n\n            "])),(l()(),e["\u0275eld"](185,0,null,null,23,"div",[["class","card-footer"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275eld"](187,0,null,null,20,"div",[["class","col col-lg-12"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](189,0,null,null,3,"button",[["class","btn btn-outline-primary mr-3"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.editBtn()&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](191,0,null,null,0,"i",[["class","fa fa-pencil"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Edit Assignment\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](194,0,null,null,3,"button",[["class","btn btn-outline-danger mr-3"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.deleteBtn()&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](196,0,null,null,0,"i",[["class","fa fa-pencil"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Delete Assignment\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](199,0,null,null,7,"button",[["class","btn btn-outline-secondary"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,200).onClick()&&t),t},null,null)),e["\u0275did"](200,16384,[[10,4]],0,v.m,[v.l,v.a,[8,null],e.Renderer2,e.ElementRef],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](201,1),e["\u0275did"](202,1720320,null,2,v.n,[v.l,e.ElementRef,e.Renderer2,e.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),e["\u0275qud"](603979776,10,{links:1}),e["\u0275qud"](603979776,11,{linksWithHrefs:1}),e["\u0275pad"](205,1),(l()(),e["\u0275ted"](-1,null,["\n                        Cancel\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275ted"](-1,null,["\n"]))],function(l,n){var u=n.component;l(n,5,0,"View Assignment","fa-file"),l(n,8,0,u.loading,l(n,9,0,!0)),l(n,130,0,u.dataSource),l(n,137,0,"user_id"),l(n,152,0,"full_name"),l(n,167,0,u.displayedColumns),l(n,171,0,u.displayedColumns),l(n,176,0,l(n,177,0,5,10,25,100)),l(n,200,0,l(n,201,0,"/managePDK")),l(n,202,0,l(n,205,0,"router-link-active"))},function(l,n){var u=n.component;l(n,2,0,void 0),l(n,33,0,u.assignment.assignment_id),l(n,36,0,"15px"),l(n,45,0,u.assignment.team),l(n,48,0,"15px"),l(n,57,0,u.assignment.pka_full_name),l(n,60,0,"15px"),l(n,69,0,u.assignment.pa_full_name),l(n,72,0,"15px"),l(n,81,0,u.assignment.date),l(n,84,0,"15px"),l(n,93,0,u.assignment.createdBy),l(n,96,0,"15px"),l(n,105,0,u.assignment.address),l(n,108,0,"15px 0 15px 0"),l(n,117,0,u.assignment.remark),l(n,123,0,"15px")})}var P=e["\u0275ccf"]("view-assignment",_,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"view-assignment",[],null,null,null,I,C)),e["\u0275did"](1,114688,null,0,_,[y.a,w.a,v.a,v.l],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),E=u("911F"),j=u("Un6q"),q=u("l6RC"),M=u("V8+5"),N=u("8Xfy"),V=u("4jwp"),S=u("OFGE"),Z=u("gOiy"),F=u("j5BN"),L=u("3Czw"),H=u("jk5D"),T=u("tCmA"),B=function(){},K=u("ghl+"),X=u("CZgk"),z=u("Lpd/");u.d(n,"ViewAssignmentModuleNgFactory",function(){return Y});var Y=e["\u0275cmf"](t,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[P,E.a]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,j.n,j.m,[e.LOCALE_ID,[2,j.w]]),e["\u0275mpd"](4608,p.c,p.c,[[2,"loadingConfig"]]),e["\u0275mpd"](6144,q.b,null,[j.d]),e["\u0275mpd"](4608,q.c,q.c,[[2,q.b]]),e["\u0275mpd"](4608,M.a,M.a,[]),e["\u0275mpd"](4608,N.i,N.i,[M.a]),e["\u0275mpd"](4608,N.h,N.h,[N.i,e.NgZone,j.d]),e["\u0275mpd"](136192,N.d,N.b,[[3,N.d],j.d]),e["\u0275mpd"](5120,N.l,N.k,[[3,N.l],[2,N.j],j.d]),e["\u0275mpd"](5120,N.g,N.e,[[3,N.g],e.NgZone,M.a]),e["\u0275mpd"](5120,V.c,V.a,[[3,V.c],e.NgZone,M.a]),e["\u0275mpd"](5120,V.f,V.e,[[3,V.f],M.a,e.NgZone]),e["\u0275mpd"](4608,S.i,S.i,[V.c,V.f,e.NgZone,j.d]),e["\u0275mpd"](5120,S.e,S.j,[[3,S.e],j.d]),e["\u0275mpd"](4608,S.h,S.h,[V.f,j.d]),e["\u0275mpd"](5120,S.f,S.m,[[3,S.f],j.d]),e["\u0275mpd"](4608,S.c,S.c,[S.i,S.e,e.ComponentFactoryResolver,S.h,S.f,e.ApplicationRef,e.Injector,e.NgZone,j.d]),e["\u0275mpd"](5120,S.k,S.l,[S.c]),e["\u0275mpd"](5120,Z.a,Z.b,[S.c]),e["\u0275mpd"](4608,F.d,F.d,[]),e["\u0275mpd"](4608,L.d,L.d,[M.a]),e["\u0275mpd"](135680,L.a,L.a,[L.d,e.NgZone]),e["\u0275mpd"](5120,H.b,H.c,[S.c]),e["\u0275mpd"](5120,f.c,f.a,[[3,f.c]]),e["\u0275mpd"](5120,i.d,i.a,[[3,i.d]]),e["\u0275mpd"](512,j.c,j.c,[]),e["\u0275mpd"](512,v.p,v.p,[[2,v.u],[2,v.l]]),e["\u0275mpd"](512,T.a,T.a,[]),e["\u0275mpd"](512,B,B,[]),e["\u0275mpd"](512,p.a,p.a,[]),e["\u0275mpd"](512,s.l,s.l,[]),e["\u0275mpd"](512,q.a,q.a,[]),e["\u0275mpd"](256,F.e,!0,[]),e["\u0275mpd"](512,F.l,F.l,[[2,F.e]]),e["\u0275mpd"](512,a.l,a.l,[]),e["\u0275mpd"](512,M.b,M.b,[]),e["\u0275mpd"](512,F.v,F.v,[]),e["\u0275mpd"](512,N.a,N.a,[]),e["\u0275mpd"](512,K.c,K.c,[]),e["\u0275mpd"](512,X.g,X.g,[]),e["\u0275mpd"](512,V.b,V.b,[]),e["\u0275mpd"](512,S.g,S.g,[]),e["\u0275mpd"](512,F.t,F.t,[]),e["\u0275mpd"](512,F.r,F.r,[]),e["\u0275mpd"](512,z.c,z.c,[]),e["\u0275mpd"](512,Z.d,Z.d,[]),e["\u0275mpd"](512,L.c,L.c,[]),e["\u0275mpd"](512,H.e,H.e,[]),e["\u0275mpd"](512,f.d,f.d,[]),e["\u0275mpd"](512,i.e,i.e,[]),e["\u0275mpd"](512,t,t,[]),e["\u0275mpd"](1024,v.j,function(){return[[{path:"",component:_}]]},[]),e["\u0275mpd"](256,H.a,{showDelay:0,hideDelay:0,touchendHideDelay:1500},[])])})}});