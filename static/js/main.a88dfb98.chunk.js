(this["webpackJsonparound-react"]=this["webpackJsonparound-react"]||[]).push([[0],{13:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),i=a(6),o=a.n(i),r=(a(13),a(2)),s=a.p+"static/media/Logo_vector.e57222ff.svg",l=a(0),u=function(){return Object(l.jsx)("div",{children:Object(l.jsx)("header",{className:"header",children:Object(l.jsx)("img",{className:"header__logo",src:s,alt:"site's logo"})})})},d=a(3),p=a.n(d),b=a(5),j=function(e){var t=c.a.createRef(),a=c.a.useState(e.cardData),n=Object(r.a)(a,2),i=n[0],o=n[1],s=i.name,u=i.likes,d=i.link,p=i._id,b=c.a.useState((function(){return u.some((function(t){return t._id===e.userId}))})),j=Object(r.a)(b,2),h=j[0],m=j[1],f=c.a.useState(!1),_=Object(r.a)(f,2),O=_[0],x=_[1];c.a.useLayoutEffect((function(){t.current.clientWidth<t.current.scrollWidth&&x(!0)}),[t]);return Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"card",children:[i.owner._id===e.userId&&Object(l.jsx)("button",{className:"button button_type_delete",type:"click"}),Object(l.jsx)("img",{alt:s,src:d,className:"card__image",onClick:function(){return e.onClick(i)}}),Object(l.jsxs)("div",{className:"card__footer",children:[Object(l.jsx)("h2",{ref:t,className:"card__text",children:s}),Object(l.jsxs)("div",{className:"card__likes-container",children:[Object(l.jsx)("button",{className:"button card__like-button ".concat(h&&"card__like-button_active"),id:"likebtn","aria-label":"heart icon (like)",onClick:function(){e.onCardLike(p,h).then((function(e){return o(e)})),m(!h)}}),Object(l.jsx)("label",{className:"card__like-label",htmlFor:"likebtn",style:{visibility:u.length?"visible":"hidden"},children:"".concat(u.length)})]}),O&&Object(l.jsx)("div",{className:"card__overflow-tooltip",children:s})]})]})})},h=a(7),m=a(8),f=function(e,t){return fetch(e,t).then((function(e){return e.ok?e.json():Promise.reject("Failed with status:( ".concat(e.status," ").concat(e.statusText,")"))})).catch((function(e){return console.log(e)}))},_=new(function(){function e(t){var a=t.groupId,n=t.apiKey,c=t.baseUrl;Object(h.a)(this,e),this.groupId=a,this.apiKey=n,this.baseUrl=c}return Object(m.a)(e,[{key:"getInitialCards",value:function(){return f("".concat(this.baseUrl).concat(this.groupId,"/cards"),{headers:{authorization:"".concat(this.apiKey),"Content-Type":"application/json"}})}},{key:"postNewCard",value:function(e){return f("".concat(this.baseUrl).concat(this.groupId,"/cards/"),{method:"POST",headers:{authorization:"".concat(this.apiKey),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e.name),link:"".concat(e.link)})})}},{key:"deleteCardPost",value:function(e){return f("".concat(this.baseUrl).concat(this.groupId,"/cards/").concat(e),{method:"DELETE",headers:{authorization:"".concat(this.apiKey)}})}},{key:"getProfile",value:function(){return f("".concat(this.baseUrl).concat(this.groupId,"/users/me"),{headers:{authorization:"".concat(this.apiKey)}})}},{key:"updateProfile",value:function(e){var t=e.name,a=e.about;return f("".concat(this.baseUrl).concat(this.groupId,"/users/me"),{method:"PATCH",headers:{authorization:"".concat(this.apiKey),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(t),about:"".concat(a),_id:"".concat(this.apiKey),cohort:"".concat(this.groupId)})})}},{key:"updateProfilePhoto",value:function(e){return f("".concat(this.baseUrl).concat(this.groupId,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"".concat(this.apiKey),"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(e)})})}},{key:"likePhoto",value:function(e){return f("".concat(this.baseUrl).concat(this.groupId,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:"".concat(this.apiKey)}})}},{key:"dislikePhoto",value:function(e){return f("".concat(this.baseUrl).concat(this.groupId,"/cards/likes/").concat(e),{method:"Delete",headers:{authorization:"".concat(this.apiKey)}})}}]),e}())({baseUrl:"https://around.nomoreparties.co/v1/",apiKey:"69483cc0-2fd4-4d47-b549-ff7c13f67c88",groupId:"group-12"}),O=a.p+"static/media/avatar_photo.15862bec.png",x=function(e){var t=c.a.useState([]),a=Object(r.a)(t,2),n=a[0],i=a[1],o=c.a.useState({}),s=Object(r.a)(o,2),u=s[0],d=s[1],h=function(){var e=Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.getInitialCards();case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(b.a)(p.a.mark((function e(t,a){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=6;break}return e.next=3,_.dislikePhoto(t);case 3:e.t0=e.sent,e.next=9;break;case 6:return e.next=8,_.likePhoto(t);case 8:e.t0=e.sent;case 9:return n=e.t0,e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return c.a.useEffect((function(){h().then((function(e){return i(e)})).catch((function(e){i(),console.log("".concat(e))}))}),[]),c.a.useEffect((function(){_.getProfile().then((function(e){return d(e)}))}),[]),Object(l.jsx)("div",{children:Object(l.jsxs)("main",{children:[Object(l.jsxs)("section",{className:"profile",children:[Object(l.jsxs)("div",{className:"profile__photo-container",children:[Object(l.jsx)("img",{className:"profile__photo",src:u?u.avatar:O,alt:u?"Photo of ".concat(u.name):"Photo of Kristine Weiss"}),Object(l.jsxs)("div",{className:"profile__photo-buttons",children:[Object(l.jsx)("button",{className:"button button_type_edit-profile-image",onClick:e.onEditAvatarClick}),Object(l.jsx)("button",{className:"button button_type_enlarge-profile-image",onClick:function(){e.onEnlargeAvatarClick(u)}})]})]}),Object(l.jsxs)("div",{className:"profile__description",children:[Object(l.jsx)("h1",{className:"profile__name",children:u?u.name:"Kristine Weiss"}),Object(l.jsx)("button",{className:"button profile__button-edit",type:"button","aria-label":"Edit profile",onClick:e.onEditProfileClick}),Object(l.jsx)("p",{className:"profile__about",children:u?u.about:"Travel guide, food enthusiastic and culture lover"})]}),Object(l.jsx)("button",{className:"button profile__button-add",type:"button","aria-label":"Add or create new profile",onClick:e.onAddPlaceClick})]}),Object(l.jsx)("section",{className:"locations",children:n&&n.map((function(t){return Object(l.jsx)(j,{onClick:e.onCardClick,cardData:t,userId:u._id,onCardLike:m},t._id)}))})]})})},g=function(){return Object(l.jsx)("div",{children:Object(l.jsx)("footer",{className:"footer",children:Object(l.jsx)("p",{className:"footer__about",children:"\xa9 2020 Around The U.S."})})})},v=function(e){return Object(l.jsx)("div",{className:"popup ".concat(e.isOpen?"popup_active":""),onClick:e.onClose,children:Object(l.jsxs)("div",{className:"popup__window",id:e.id,children:[Object(l.jsx)("button",{className:"button button_type_close",type:"button","aria-label":"Close window",onClick:e.onClose}),Object(l.jsx)("h2",{className:"popup__title",children:e.formHeader}),Object(l.jsxs)("form",{className:"form",name:"".concat(e.formName),children:[e.children,Object(l.jsx)("button",{className:"button button_type_submit button_disabled",type:"submit",children:"Save"})]})]})})},N=function(e){var t=e.navigation,a=e.targetObj,n=a.link,c=a.name,i=a.avatar,o=[Object(l.jsx)("div",{className:"navigation-arrow navigation-arrow_left"},"leftNav"),Object(l.jsx)("div",{className:"navigation-arrow navigation-arrow_right"},"rightNav")];return Object(l.jsx)("div",{className:"popup popup_gallery ".concat(e.isOpen?"popup_active":""),children:Object(l.jsxs)("div",{className:"popup__gallery",id:"props.id",children:[Object(l.jsx)("button",{className:"button button_type_close",type:"button","aria-label":"Close window",onClick:e.onClose}),Object(l.jsx)("img",{className:"popup__img",src:n||(i||""),alt:c}),Object(l.jsx)("h2",{className:"popup__place-name",children:c}),t&&o]})})};var k=function(){var e=c.a.useState(!1),t=Object(r.a)(e,2),a=t[0],n=t[1],i=c.a.useState(!1),o=Object(r.a)(i,2),s=o[0],d=o[1],p=c.a.useState(!1),b=Object(r.a)(p,2),j=b[0],h=b[1],m=c.a.useState(!1),f=Object(r.a)(m,2),_=f[0],O=f[1],k=c.a.useState(!1),y=Object(r.a)(k,2),C=y[0],w=y[1],I=c.a.useState({}),P=Object(r.a)(I,2),S=P[0],E=P[1],T=c.a.useState({}),K=Object(r.a)(T,2),L=K[0],U=K[1],F=function(){w(!1),O(!1),h(!1),d(!1),n(!1)};return Object(l.jsx)("div",{className:"page",children:Object(l.jsxs)("div",{className:"page__wrap",children:[Object(l.jsx)(u,{}),Object(l.jsx)(x,{onEditProfileClick:function(){n(!0)},onAddPlaceClick:function(){d(!0)},onEditAvatarClick:function(){h(!0)},onEnlargeAvatarClick:function(e){U(e),O(!0)},onCardClick:function(e){E(e),w(!0)}}),Object(l.jsx)(g,{}),Object(l.jsxs)(v,{isOpen:a,onClose:F,windowId:"w-edit",formHeader:"Edit Profile",formName:"editWindow",children:[Object(l.jsxs)("label",{htmlFor:"name",className:"form__field",children:[Object(l.jsx)("input",{className:"form__input",type:"text",name:"name",id:"name",placeholder:"Insert name here...",required:!0,minLength:"2",maxLength:"40"}),Object(l.jsx)("span",{className:"form__input-error"})]}),Object(l.jsxs)("label",{htmlFor:"about",className:"form__field",children:[Object(l.jsx)("input",{className:"form__input",type:"text",name:"about",id:"about",placeholder:"Insert job here...",required:!0,minLength:"2",maxLength:"200"}),Object(l.jsx)("span",{className:"form__input-error"})]})]}),Object(l.jsxs)(v,{isOpen:s,onClose:F,windowId:"w-add",formHeader:"New place",formName:"addWindow",children:[Object(l.jsxs)("label",{htmlFor:"place-title",className:"form__field",children:[Object(l.jsx)("input",{className:"form__input",type:"text",name:"name",id:"place-title",placeholder:"Title",required:!0,minLength:"1",maxLength:"30"}),Object(l.jsx)("span",{className:"form__input-error"})]}),Object(l.jsxs)("label",{htmlFor:"image-link",className:"form__field",children:[Object(l.jsx)("input",{className:"form__input",type:"url",name:"link",id:"image-link",placeholder:"Image link",required:!0}),Object(l.jsx)("span",{className:"form__input-error"})]})]}),Object(l.jsx)(v,{isOpen:j,onClose:F,windowId:"w-editpic",formHeader:"Change profile picture",formName:"editprofpic",children:Object(l.jsxs)("label",{htmlFor:"pictureurl",className:"form__field",children:[Object(l.jsx)("input",{className:"form__input",type:"url",name:"avatar",id:"pictureurl",placeholder:"insert url for picture",required:!0}),Object(l.jsx)("span",{className:"form__input-error"})]})}),Object(l.jsx)(N,{isOpen:C,onClose:F,id:"w-img",targetObj:S,navigation:!0}),Object(l.jsx)(N,{isOpen:_,onClose:F,id:"w-piclrg",targetObj:L,navigation:!1})]})})},y=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,17)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),i(e),o(e)}))};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(k,{})}),document.getElementById("root")),y()}},[[16,1,2]]]);
//# sourceMappingURL=main.a88dfb98.chunk.js.map