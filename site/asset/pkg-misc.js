define("modules/clean/browse/browse_drag_utils",["require","exports","jquery"],function(t,e,o){"use strict";function n(t){if(!t||!t.types)return null;var e=function(t,e){for(var o=0,n=t;o<n.length;o++){if(e===n[o])return!0}return!1},n=e(t.types,"Files"),i=e(t.types,"text/html")&&o(t.getData("text/html")).attr("draggable")||e(t.types,"text/uri-list")&&"about:blank"===t.getData("text/uri-list")||e(t.types,"Url")&&"about:blank"===t.getData("Url");if(n||i)return null;var r,s=null;try{r=t.getData("text/x-moz-url")}catch(t){}if(null!=r){var u=r.split("\n");u.length>=1&&(s=u[0])}if(!s)try{s=t.getData("text/uri-list")}catch(t){}if(!s)try{s=t.getData("Url")}catch(t){}return s||(s=null),s}function i(t){return"[InternetShortcut]\r\nURL="+t+"\r\n"}function r(){for(var t=0,e=h;t<e.length;t++){if(!(0,e[t])())return!1}return!0}function s(t){h.push(t)}function u(t){var e=h.indexOf(t);e>=0&&h.splice(e,1)}function a(){h=[]}Object.defineProperty(e,"__esModule",{value:!0});var h=[];e.getDraggedLink=n,e.buildUrlLinkfileContents=i,e.isFileDragEnabled=r,e.addFileDragEnabledCheck=s,e.removeFileDragEnabledCheck=u,e.removeAllFileDragEnabledChecks=a}),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define("modules/clean/legacy_pyxl_controllers/bubble_dropdown",["jquery","modules/core/dom","external/underscore","modules/clean/keycode"],function(e,o,n,i){var r;return r=i.KeyCode,(function(){function i(o,r,s,u,a,h,l){var c,d;this.$root=o,this.arrow_direction=r,this.show_on_hover=s,this.show_close_button=u,this.shown_by_default=a,this.top_adjustment=null!=h?h:0,this.tabindex=l,this._hide_bubble=t(this._hide_bubble,this),this._show_bubble=t(this._show_bubble,this),this._toggle_bubble=t(this._toggle_bubble,this),this._on_global_hover=t(this._on_global_hover,this),this._on_mouseout=t(this._on_mouseout,this),this._on_mouseover=t(this._on_mouseover,this),this._onDropdownKeydown=t(this._onDropdownKeydown,this),this._onTargetKeydown=t(this._onTargetKeydown,this),this._activateNonButton=t(this._activateNonButton,this),this.repositionDropdown=t(this.repositionDropdown,this),this.openDropdown=t(this.openDropdown,this),this.closeDropdown=t(this.closeDropdown,this),this.$target=this.$root.find(".bubble-dropdown-target"),this.$dropdown=this.$root.find(".bubble-dropdown"),this.$arrow_anchor=this.$root.find(".bubble-dropdown-arrow-anchor"),this.$arrow=this.$dropdown.find(".bubble-arrow"),this.target_position={top:"bottom",left:"right",bottom:"top",right:"left"}[this.arrow_direction],this.$target.on("keydown",this._onTargetKeydown),this.$dropdown.on("keydown",this._onDropdownKeydown),this.$target.attr("aria-expanded",!1),this.show_close_button?this.$root.find(".bubble-dropdown-x").on("click",this.closeDropdown):this.show_on_hover?(this.$target.on("mouseover",this._on_mouseover),this.$dropdown.on("mouseover",this._on_mouseover),this.$target.on("mouseout",this._on_mouseout),this.$dropdown.on("mouseout",this._on_mouseout),this.$target.attr("tabindex",0).on("focus",this._show_bubble),0===this.$dropdown.find(this._focus_selectors).length&&(c=n.uniqueId("bubble-dropdown-tooltip-"),this.$dropdown.attr({id:c,role:"tooltip"}),this.$target.attr("aria-describedby",c)),e(document).on(i.HOVER_SHOWN,this._on_global_hover)):(this.$target.click(this._toggle_bubble),d=0,this.tabindex&&(d=this.tabindex),"BUTTON"!==this.$target.get(0).tagName&&this.$target.attr({role:"button",tabindex:d}).on("keyup",this._activateNonButton),e("body").on("click",(function(t){return function(o){var n;return!!e(o.target).is("select")||(n=e(o.target).closest(t.$target).length||e(o.target).closest(t.$dropdown).length,n||t._hide_bubble(),!0)}})(this))),this.shown_by_default&&this.openDropdown()}return i.HOVER_SHOWN="bubble:hover:shown",i.prototype._dropdown_shown=!1,i.prototype._focus_selectors="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",i.prototype.closeDropdown=function(){if(this._dropdown_shown)return this._hide_bubble()},i.prototype.openDropdown=function(){if(!this._dropdown_shown)return this._show_bubble()},i.prototype.repositionDropdown=function(){if(this._dropdown_shown)return this._show_bubble()},i.prototype._activateNonButton=function(t){var e;if((e=t.keyCode)===r.ENTER||e===r.SPACE)return this._toggle_bubble(),!1},i.prototype._onTargetKeydown=function(t){return(t.keyCode===r.ESC&&!this.show_on_hover||t.keyCode===r.TAB&&t.shiftKey||t.keyCode===r.TAB&&1===this.$root.find(this._focus_selectors).length)&&this._hide_bubble(),!0},i.prototype._onDropdownKeydown=function(t){var e;return this.show_on_hover||t.keyCode!==r.ESC?t.keyCode!==r.TAB||t.shiftKey||(e=this.$root.find(this._focus_selectors),t.target===e[e.length-1]&&this._hide_bubble(!this.show_on_hover)):this._hide_bubble(!0),!0},i.prototype._on_mouseover=function(){return e(document).trigger(i.HOVER_SHOWN,this.$target),this._show_bubble(),clearTimeout(this.$dropdown.data("timeout_id"))},i.prototype._on_mouseout=function(){var t;return t=setTimeout(this._hide_bubble,200),this.$dropdown.data("timeout_id",t)},i.prototype._on_global_hover=function(t,e){if(this._dropdown_shown&&e!==this.$target)return this._hide_bubble(),clearTimeout(this.$dropdown.data("timeout_id"))},i.prototype._toggle_bubble=function(){return this._dropdown_shown?this._hide_bubble():this._show_bubble(),!0},i.prototype._show_bubble=function(){var t,e,n,i,r;if(!this.$target.hasClass("disabled")){switch(this.$dropdown.show(),t=this.$arrow_anchor.length?this.$arrow_anchor:this.$target,r=this.$arrow.position().top,e=this.$arrow.position().left,this.arrow_direction){case"left":n=t.outerWidth()+this.$arrow.outerWidth(),i=t.outerHeight()/2-r;break;case"right":n=-1*(this.$dropdown.outerWidth()+this.$arrow.outerWidth()),i=t.outerHeight()/2-r;break;case"top":n=t.outerWidth()/2-e,i=t.outerHeight()+this.$arrow.outerHeight()-this.top_adjustment;break;case"bottom":n=t.outerWidth()/2-e,i=-1*(this.$dropdown.outerHeight()+this.$arrow.outerHeight()+this.top_adjustment)}return o.clone_position(this.$dropdown,t,{setHeight:!1,setWidth:!1,offsetLeft:n,offsetTop:i}),this._dropdown_shown=!0,this.$target.addClass("bubble-dropdown-target--active").attr("aria-expanded",!0)}},i.prototype._hide_bubble=function(t){if(this.$dropdown.hide(),this._dropdown_shown=!1,this.$target.removeClass("bubble-dropdown-target--active").attr("aria-expanded",!1),t)return this.$target.focus()},i})()})}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty;define("modules/clean/legacy_pyxl_controllers/bubble_menu",["jquery","modules/clean/keycode","modules/clean/legacy_pyxl_controllers/bubble_dropdown"],function(o,n,i){var r;return r=n.KeyCode,(function(n){function i(e,o,n,r){this.$root=e,this.arrow_direction=o,this.show_on_hover=n,this.top_adjustment=null!=r?r:0,this.onKeyDown=t(this.onKeyDown,this),this.onMouseEnter=t(this.onMouseEnter,this),this.$target=this.$root.find(".bubble-dropdown-target"),this.$target.on("keydown",this.onKeyDown),this.$menu=this.$root.find('*[role="menu"]'),this.$menuitems=this.$root.find('*[role="menuitem"]'),this.$menuitems.attr("role","menuitem"),this.$menuitems.on("keydown",this.onKeyDown),this.$menuitems.on("mouseenter",this.onMouseEnter),i.__super__.constructor.apply(this,arguments)}return e(i,n),i.prototype.focusPrevious=function(t){var e;return e=this.$menuitems.index(t),e=e===-1||0===e?this.$menuitems.length-1:e-1,this.$menuitems.get(e).focus()},i.prototype.focusNext=function(t){var e;return e=this.$menuitems.index(t),e=e===-1||e===this.$menuitems.length-1?0:e+1,this.$menuitems.get(e).focus()},i.prototype.onMouseEnter=function(t){return o(this.$menu).removeClass("bubble-menu--keyboard")},i.prototype.onKeyDown=function(t){return o(this.$menu).addClass("bubble-menu--keyboard"),t.keyCode===r.DOWN?(this.focusNext(t.target),t.stopPropagation(),t.preventDefault()):t.keyCode===r.UP?(this.focusPrevious(t.target),t.stopPropagation(),t.preventDefault()):void 0},i})(i)})}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty;define("modules/clean/legacy_pyxl_controllers/input",["jquery","modules/clean/accessibility/tabbable","modules/core/i18n","modules/core/exception","require"],function(o,n,i,r,s){var u,a,h,l,c,assert;return l=i._,assert=r.assert,c=function(t){var e;return e=o.data(t,"input-element"),assert(e.length,"TextInput element has no related input element please ensure it was setup correctly"),e},o.valHooks.textinput={get:function(t){return c(t).val()},set:function(t,e){return c(t).val(e).trigger("input")}},h=(function(n){function i(e){this.$text_input=e,this._on_change=t(this._on_change,this),this.persistent_label=this.$text_input.is(".label-above"),this.$input=this.$text_input.find(".text-input-input"),this.$text_input.data("input-element",this.$input),this.$label=this.$text_input.find("label"),this.$text_input.find(".error-message").length&&this.$input.addClass("input-error"),this.$text_input.each(function(t,e){return e.type="textinput"}),this.$text_input.focus((function(t){return function(){return setTimeout(function(){return t.$input.focus()},0)}})(this)),o(function(){var t;if("BODY"===(null!=(t=document.activeElement)?t.tagName:void 0))return o(".autofocus:visible").first().focus()}),this._listen(),this._on_change(),i.__super__.constructor.call(this)}return e(i,n),i.prototype._listen=function(){return this.$input.on("keydown keyup paste input blur",(function(t){return function(){return t._on_change()}})(this)),this.$input.on("blur",(function(t){return function(e){return t.$text_input.trigger(e)}})(this)),this.$input.on("focus",(function(t){return function(){return t.$input.removeClass("input-error")}})(this))},i.prototype._on_change=function(){var t;if(this.persistent_label||this.$label.toggle(!this.$input.val()),t=this.$text_input.find(".error-message"),t.length)return t[0].remove()},i})(n),u=(function(t){function o(t){this.$text_input=t,this.$caps=this.$text_input.find(".password-caps-indicator"),this.$caps_lock=!1,this.$text_input.on("keypress",(function(t){return function(e){var o,n,i,r,s;return r=/Mac/.test(navigator.platform),n=null!=(s=e.charCode)?s:e.keyCode,o=String.fromCharCode(n),o.toLowerCase()===o.toUpperCase()?i=void 0:o===o.toLowerCase()?i=e.shiftKey:o!==o.toUpperCase()||e.shiftKey&&r||(i=!e.shiftKey),null!=i&&(t.$caps_lock=i),t.$caps_lock?t.$caps.addClass("password-caps-indicator-activated"):t.$caps.removeClass("password-caps-indicator-activated")}})(this)),o.__super__.constructor.apply(this,arguments)}return e(o,t),o})(h),a=(function(n){function i(e){this.$text_input=e,this._on_change=t(this._on_change,this),this.$bubble_title=this.$text_input.find(".password-bubble-title"),this.$bubble_desc=this.$text_input.find(".password-bubble-desc"),this.$meter=this.$text_input.find(".password-input-meter"),this.$default_bubble_text=this.$bubble_desc.text(),this.$last_pwd="",s(["external/zxcvbn"],(function(t){return function(e){return t.zxcvbn=e}})(this)),i.__super__.constructor.call(this,this.$text_input)}return e(i,n),i.prototype._on_change=function(){var t,e,o,n,r;if(e=this.$input.val(),this.$last_pwd!==e)return this.$last_pwd=e,"correcthorsebatterystaple"===e||"Tr0ub4dour&3"===e||"Tr0ub4dor&3"===e?(o=0,n=l("lol",{comment:"'lol'='laugh out loud'"}),this.$bubble_title.text(n),"correcthorsebatterystaple"===e?(t=l("Whoa there, don't take advice from a webcomic too literally ;)",{comment:"This text is displayed rarely, whenever a user selects a password that is from this comic: http://imgs.xkcd.com/comics/password_strength.png"}),this.$bubble_desc.text(t)):(t=l("Guess again",{comment:"this text is displayed rarely, whenever a user selects a password that is from this comic: http://imgs.xkcd.com/comics/password_strength.png"}),this.$bubble_desc.text(t))):(r=["",l("Weak"),l("So-so"),l("Good"),l("Great!")],o=this._score(e),n=r[o],this.$bubble_title.text(n),this.$bubble_desc.text(this.$default_bubble_text)),this.$meter.find(".password-input-dot").removeClass("password-input-dot-selected"),this.$meter.find(".password-input-dot").slice(4-o,4).addClass("password-input-dot-selected"),i.__super__._on_change.apply(this,arguments)},i.prototype._get_user_inputs=function(){var t,e,n,i,r;for(n=["dropbox"],r=this.$text_input.closest("form").find("input[type=text], input[type=email]"),e=0,i=r.length;e<i;e++)t=r[e],n.push(o(t).val());return n},i.prototype._score=function(t){return this.zxcvbn&&t?Math.max(1,this.zxcvbn(t,this._get_user_inputs()).score):0},i})(u),{TextInput:h,PasswordInput:u,PasswordWatchInput:a}})}.call(this),function(){var t=[].indexOf||function(t){for(var e=0,o=this.length;e<o;e++)if(e in this&&this[e]===t)return e;return-1};define("modules/clean/react/browse/comment_status",["modules/clean/activity/constants","modules/clean/comments/utils","modules/clean/file_activity/api","modules/clean/flux/dispatcher","modules/clean/filetypes","modules/clean/react/browse/actions","modules/clean/react/browse/constants","modules/clean/react/browse/store"],function(e,o,n,i,r,s,u,a){var h,l,c,d,p,_,b,f,w,m,g,y,$,v,x,k,C,D;return h=e.ActivityContext,c=r.FileTypes,d=s.browseActions,l=u.BrowseActionTypes,p=a.browseStore,C={},_=function(t){var e;return n.fetchCommentStatusBatch({actorId:null!=(e=p.user())?e.id:void 0,context:h.BROWSE_FILE_VIEWER,contextDataList:t,isBackgroundRequest:!0})},f=function(t){return null==t.feedback_off&&null==t.comment_count&&null==t.unresolved_comment_count},w=function(t){return t.type===c.FILE},m=function(t){return null!=t.after},b=function(e){var o,n;if(o=e.files,n=o.filter(w).filter(f).map(function(t){return t.fq_path}),n.length>0)return _(n).then(function(e){return t.call(window,"requestIdleCallback")>=0?window.requestIdleCallback(function(){return d.addCommentStatusBatch({commentStatusByFqPath:e})}):d.addCommentStatusBatch({commentStatusByFqPath:e})})},x=b,$=b,y=b,v=function(t){var e,o;return e=t.fileDeltas,t.path,o=e.filter(m).map(function(t){return t.after}),b({files:o})},g=function(t){var e;switch(e=t.action,e.type){case l.LOAD_PATH:return x(e.data);case l.ADD_FILES:return $(e.data);case l.INITIALIZE_EVERYTHING:return y(e.data);case l.CHANGE_FILES:return v(e.data)}},k=function(t){return null==t&&(t=i),C={dispatcher:t,dispatchToken:t.register(g)},b({files:p.files().toArray()})},D=function(){return C.dispatcher.unregister(C.dispatchToken),C={}},{setup:k,teardown:D}})}.call(this);
//# sourceMappingURL=pkg-misc.min.js-vflOZ9yT1.map