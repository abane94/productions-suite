(self.webpackChunkproduction_suite=self.webpackChunkproduction_suite||[]).push([[910],{910:(e,t,r)=>{"use strict";r.r(t),r.d(t,{CustomersModule:()=>A});var l=r(8583),c=r(7902),i=r(4762),n=r(3018),o=r(3943),d=r(3293),a=r(7345),s=r(4981),g=r(9962);function u(e,t){if(1&e&&(n.TgZ(0,"clr-dg-row",17),n.TgZ(1,"clr-dg-cell"),n._uU(2),n.qZA(),n.TgZ(3,"clr-dg-cell"),n._uU(4),n.qZA(),n.qZA()),2&e){const e=t.$implicit;n.Q6J("clrDgItem",e),n.xp6(2),n.Oqu(e.name),n.xp6(2),n.Oqu(e.description)}}function p(e,t){if(1&e&&(n.TgZ(0,"clr-dg-row"),n.TgZ(1,"clr-dg-cell"),n._uU(2),n.qZA(),n.TgZ(3,"clr-dg-cell"),n._uU(4),n.qZA(),n.TgZ(5,"clr-dg-cell"),n._uU(6),n.qZA(),n.TgZ(7,"clr-dg-cell"),n._uU(8),n.qZA(),n.TgZ(9,"clr-dg-cell"),n._uU(10),n.qZA(),n.TgZ(11,"clr-dg-cell"),n._uU(12),n.qZA(),n.qZA()),2&e){const e=t.$implicit;n.xp6(2),n.Oqu(e.id),n.xp6(2),n.Oqu(e.name),n.xp6(2),n.Oqu(e.description),n.xp6(2),n.Oqu(e.email),n.xp6(2),n.Oqu(e.primaryPhone),n.xp6(2),n.Oqu(e.mobile)}}function m(e,t){if(1&e&&(n.TgZ(0,"clr-datagrid"),n.TgZ(1,"clr-dg-column",11),n._uU(2,"Contact ID"),n.qZA(),n.TgZ(3,"clr-dg-column",11),n._uU(4,"Name"),n.qZA(),n.TgZ(5,"clr-dg-column",11),n._uU(6,"description"),n.qZA(),n.TgZ(7,"clr-dg-column",11),n._uU(8,"Email"),n.qZA(),n.TgZ(9,"clr-dg-column",11),n._uU(10,"Primary Phone"),n.qZA(),n.TgZ(11,"clr-dg-column",11),n._uU(12,"Mobile"),n.qZA(),n.YNc(13,p,13,6,"clr-dg-row",22),n.TgZ(14,"clr-dg-footer"),n._uU(15),n.qZA(),n.qZA()),2&e){const e=n.oxw(3);n.xp6(1),n.Q6J("clrDgField","id"),n.xp6(2),n.Q6J("clrDgField","name"),n.xp6(2),n.Q6J("clrDgField","description"),n.xp6(2),n.Q6J("clrDgField","email"),n.xp6(2),n.Q6J("clrDgField","primaryPhone"),n.xp6(2),n.Q6J("clrDgField","mobile"),n.xp6(2),n.Q6J("clrDgItemsOf",e.contacts),n.xp6(2),n.hij("",e.contacts.length," contacts")}}function f(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"clr-dg-detail",18),n.NdJ("clrIfDetailChange",function(t){return n.CHM(e),n.oxw(2).onDetailOpen(t)}),n.TgZ(1,"clr-dg-detail-header"),n._uU(2),n.qZA(),n.TgZ(3,"app-general-editor",19),n.NdJ("save",function(t){return n.CHM(e),n.oxw(2).onSave(t)}),n.qZA(),n._UZ(4,"br"),n._UZ(5,"app-user-defined-form-data-display",20),n.TgZ(6,"h3"),n._uU(7,"Contacts"),n.qZA(),n.TgZ(8,"button",9),n.NdJ("click",function(){const t=n.CHM(e).$implicit;return n.oxw(2).onDetailOpen(t)}),n._uU(9,"Load"),n.qZA(),n.YNc(10,m,16,8,"clr-datagrid",21),n.qZA()}if(2&e){const e=t.$implicit,r=n.oxw(2);n.xp6(2),n.Oqu(e.name),n.xp6(1),n.Q6J("value",e)("formDef",r.formDef),n.xp6(2),n.Q6J("data",e)("formDef",r.formDef)("nestedDisplayField",r.nestedDisplayField),n.xp6(5),n.Q6J("ngIf",r.contacts)}}const Z=function(){return[1,2,5,10]};function h(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"clr-datagrid",10),n.NdJ("clrDgRefresh",function(t){return n.CHM(e),n.oxw().gridHandler.refresh(t)})("clrDgSelectedChange",function(t){return n.CHM(e),n.oxw().selected=t}),n.TgZ(1,"clr-dg-column",11),n._uU(2,"Name"),n.qZA(),n.TgZ(3,"clr-dg-column",11),n._uU(4,"Description"),n.qZA(),n.TgZ(5,"clr-dg-placeholder"),n._uU(6,"We couldn't find any customers!"),n.qZA(),n.YNc(7,u,5,3,"clr-dg-row",12),n.YNc(8,f,11,7,"clr-dg-detail",13),n.TgZ(9,"clr-dg-footer"),n.TgZ(10,"clr-dg-pagination",14,15),n.TgZ(12,"clr-dg-page-size",16),n._uU(13,"Customers per page"),n.qZA(),n._uU(14),n.qZA(),n.qZA(),n.qZA()}if(2&e){const e=n.MAs(11),t=n.oxw();n.Q6J("clrDgLoading",t.gridHandler.loading)("clrDgSelected",t.selected),n.xp6(1),n.Q6J("clrDgField","name"),n.xp6(2),n.Q6J("clrDgField","description"),n.xp6(4),n.Q6J("ngForOf",t.customers)("ngForTrackBy",t.trackBy),n.xp6(3),n.Q6J("clrDgPageSize",2)("clrDgTotalItems",t.gridHandler.total),n.xp6(2),n.Q6J("clrPageSizeOptions",n.DdM(12,Z)),n.xp6(2),n.lnq(" ",e.firstItem+1," - ",e.lastItem+1," of ",e.totalItems," users ")}}const D=[{path:"",component:(()=>{class e{constructor(e,t){this.CustomerService=e,this.gridHandler=t,this.addModalIsOpen=!1,this.nestedDisplayField={CustomerOptions:{field:"name",nested:{SelectionsInnerForm:{field:"display"}}}},this.customers=[],this.contacts=null,this.current=null,t.setService(e),t.onItems$.subscribe(e=>this.customers=e),this.setup()}setup(){return(0,i.mG)(this,void 0,void 0,function*(){this.customers=(yield this.CustomerService.get()).items,this.formDef={key:"sdgdf",fields:[{type:"HIDDEN",key:"id",label:"ID"},{type:"TEXT",key:"name",label:"Name",placeholder:"",required:!0},{type:"TEXT",key:"description",label:"Description",placeholder:"",required:!0}]},this.contactFormDef={key:"sdgdf",fields:[{type:"HIDDEN",key:"id",label:"ID"},{type:"TEXT",key:"name",label:"Name",placeholder:"",required:!0},{type:"TEXT",key:"description",label:"Description",placeholder:"",required:!0},{type:"TEXT",key:"email",label:"Email"},{type:"TEXT",key:"primaryPhone",label:"Primary Phone"},{type:"TEXT",key:"mobile",label:"Mobile"},{type:"TEXT",key:"ext",label:"Ext."}]}})}onSave(e){console.log("Saved!"),console.log(e);let t=-1;for(let r=0;r<this.customers.length;r++)if(this.customers[r].name===e.name){t=r;break}}ngOnInit(){}addCustomer(e,t){return(0,i.mG)(this,void 0,void 0,function*(){this.addModalIsOpen=!1,yield this.CustomerService.addCustomer(e,t),this.customers=(yield this.CustomerService.get()).items})}onDetailOpen(e){if(this.current!==e){if(this.current=e,null===e)return this.contacts=null;this.CustomerService.getContacts(e.id).then(e=>{this.contacts=e})}}trackBy(e,t){return t.id}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(o.v),n.Y36(d.j))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-customers-list-page"]],decls:16,vars:6,consts:[[1,"btn","btn-primary",3,"click"],["shape","plus"],["style","height: 80vh",3,"clrDgLoading","clrDgSelected","clrDgRefresh","clrDgSelectedChange",4,"ngIf"],[3,"clrModalOpen","clrModalOpenChange"],[1,"modal-title"],[1,"modal-body"],[3,"formDef","hideSave"],["cusEditor",""],["contactEditor",""],[3,"click"],[2,"height","80vh",3,"clrDgLoading","clrDgSelected","clrDgRefresh","clrDgSelectedChange"],[3,"clrDgField"],[3,"clrDgItem",4,"ngFor","ngForOf","ngForTrackBy"],[3,"clrIfDetailChange",4,"clrIfDetail"],[3,"clrDgPageSize","clrDgTotalItems"],["pagination",""],[3,"clrPageSizeOptions"],[3,"clrDgItem"],[3,"clrIfDetailChange"],[3,"value","formDef","save"],[3,"data","formDef","nestedDisplayField"],[4,"ngIf"],[4,"clrDgItems","clrDgItemsOf"]],template:function(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"button",0),n.NdJ("click",function(){return t.addModalIsOpen=!0}),n._UZ(1,"cds-icon",1),n._uU(2," Add\n"),n.qZA(),n.YNc(3,h,15,13,"clr-datagrid",2),n.TgZ(4,"clr-modal",3),n.NdJ("clrModalOpenChange",function(e){return t.addModalIsOpen=e}),n.TgZ(5,"h3",4),n._uU(6,"Add Customer"),n.qZA(),n.TgZ(7,"div",5),n._UZ(8,"app-general-editor",6,7),n.TgZ(10,"h3"),n._uU(11,"Default Contact:"),n.qZA(),n._UZ(12,"app-general-editor",6,8),n.TgZ(14,"button",9),n.NdJ("click",function(){n.CHM(e);const r=n.MAs(9),l=n.MAs(13);return t.addCustomer(r.getValue(),l.getValue())}),n._uU(15,"Get Value"),n.qZA(),n.qZA(),n.qZA()}2&e&&(n.xp6(3),n.Q6J("ngIf",t.formDef),n.xp6(1),n.Q6J("clrModalOpen",t.addModalIsOpen),n.xp6(4),n.Q6J("formDef",t.formDef)("hideSave",!0),n.xp6(4),n.Q6J("formDef",t.contactFormDef)("hideSave",!0))},directives:[a.nkF,l.O5,a.qAN,a.VLi,s.x,a.C9t,a.PDs,a.Nh1,a.dml,a.K8c,a.m4W,a.KHL,a.F7K,l.sg,a.q0d,a.i6Q,a.dRQ,a.Ltv,a.YYR,a.Z4N,a.Gcc,a.fv_,a.jND,a.c2j,a.ygj,g.g,a.f6],styles:[""]}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[c.Bz.forChild(D)],c.Bz]}),e})();var q=r(665),y=r(7822);let A=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[l.ez,T,a.K6A,y.u,q.u5,q.UX]]}),e})()}}]);