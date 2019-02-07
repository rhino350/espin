(function(e,n){function t(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function r(e){return void 0===e}if(e){var i={},c=e.TraceKit,l=[].slice;i.noConflict=function(){return e.TraceKit=c,i},i.wrap=function(e){function n(){try{return e.apply(this,arguments)}catch(e){throw i.report(e),e}}return n},i.report=(function(){function n(e){u(),g.push(e)}function r(e){for(var n=g.length-1;n>=0;--n)g[n]===e&&g.splice(n,1)}function c(e,n){var r=null;if(!n||i.collectWindowErrors){for(var c in g)if(t(g,c))try{g[c].apply(null,[e].concat(l.call(arguments,2)))}catch(e){r=e}if(r)throw r}}function o(e,n,t,r,l){var o=null;if(x)i.computeStackTrace.augmentStackTraceWithInitialElement(x,n,t,e),a();else if(l)o=i.computeStackTrace(l),c(o,!0);else{var u={url:n,line:t,column:r};u.func=i.computeStackTrace.guessFunctionName(u.url,u.line),u.context=i.computeStackTrace.gatherContext(u.url,u.line),o={mode:"onerror",message:e,stack:[u]},c(o,!0)}return!!f&&f.apply(this,arguments)}function u(){p!==!0&&(f=e.onerror,e.onerror=o,p=!0)}function a(){var e=x,n=m;m=null,x=null,d=null,c.apply(null,[e,!1].concat(n))}function s(n){if(x){if(d===n)return;a()}var t=i.computeStackTrace(n);throw x=t,d=n,m=l.call(arguments,1),e.setTimeout(function(){d===n&&a()},t.incomplete?2e3:0),n}var f,p,g=[],m=null,d=null,x=null;return s.subscribe=n,s.unsubscribe=r,s})(),i.computeStackTrace=(function(){function n(n){if(!i.remoteFetching)return"";try{var t=function(){try{return new e.XMLHttpRequest}catch(n){return new e.ActiveXObject("Microsoft.XMLHTTP")}},r=t();return r.open("GET",n,!1),r.send(""),r.responseText}catch(e){return""}}function c(r){if("string"!=typeof r)return[];if(!t(k,r)){var i="",c="";try{c=e.document.domain}catch(e){}var l=/(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(r);l&&l[2]===c&&(i=n(r)),k[r]=i?i.split("\n"):[]}return k[r]}function l(e,n){var t,i=/function ([^(]*)\(([^)]*)\)/,l=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,o="",u=c(e);if(!u.length)return"?";for(var a=0;a<10;++a)if(o=u[n-a]+o,!r(o)){if(t=l.exec(o))return t[1];if(t=i.exec(o))return t[1]}return"?"}function o(e,n){var t=c(e);if(!t.length)return null;var l=[],o=Math.floor(i.linesOfContext/2),u=o+i.linesOfContext%2,a=Math.max(0,n-o-1),s=Math.min(t.length,n+u-1);n-=1;for(var f=a;f<s;++f)r(t[f])||l.push(t[f]);return l.length>0?l:null}function u(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function a(e){return u(e).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function s(e,n){for(var t,r,i=0,l=n.length;i<l;++i)if((t=c(n[i])).length&&(t=t.join("\n"),r=e.exec(t)))return{url:n[i],line:t.substring(0,r.index).split("\n").length,column:r.index-t.lastIndexOf("\n",r.index)-1};return null}function f(e,n,t){var r,i=c(n),l=new RegExp("\\b"+u(e)+"\\b");return t-=1,i&&i.length>t&&(r=l.exec(i[t]))?r.index:null}function p(n){if(!r(e&&e.document)){for(var t,i,c,l,o=[e.location.href],f=e.document.getElementsByTagName("script"),p=""+n,g=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,m=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,d=0;d<f.length;++d){var x=f[d];x.src&&o.push(x.src)}if(c=g.exec(p)){var v=c[1]?"\\s+"+c[1]:"",h=c[2].split(",").join("\\s*,\\s*");t=u(c[3]).replace(/;$/,";?"),i=new RegExp("function"+v+"\\s*\\(\\s*"+h+"\\s*\\)\\s*{\\s*"+t+"\\s*}")}else i=new RegExp(u(p).replace(/\s+/g,"\\s+"));if(l=s(i,o))return l;if(c=m.exec(p)){var _=c[1];if(t=a(c[2]),i=new RegExp("on"+_+"=[\\'\"]\\s*"+t+"\\s*[\\'\"]","i"),l=s(i,o[0]))return l;if(i=new RegExp(t),l=s(i,o))return l}return null}}function g(e){if(!e.stack)return null;for(var n,t,i=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,c=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,u=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,a=e.stack.split("\n"),s=[],p=/^(.*) is undefined$/.exec(e.message),g=0,m=a.length;g<m;++g){if(n=i.exec(a[g])){var d=n[2]&&n[2].indexOf("native")!==-1;t={url:d?null:n[2],func:n[1]||"?",args:d?[n[2]]:[],line:n[3]?+n[3]:null,column:n[4]?+n[4]:null}}else if(n=u.exec(a[g]))t={url:n[2],func:n[1]||"?",args:[],line:+n[3],column:n[4]?+n[4]:null};else{if(!(n=c.exec(a[g])))continue;t={url:n[3],func:n[1]||"?",args:n[2]?n[2].split(","):[],line:n[4]?+n[4]:null,column:n[5]?+n[5]:null}}!t.func&&t.line&&(t.func=l(t.url,t.line)),t.line&&(t.context=o(t.url,t.line)),s.push(t)}return s.length?(s[0]&&s[0].line&&!s[0].column&&p?s[0].column=f(p[1],s[0].url,s[0].line):s[0].column||r(e.columnNumber)||(s[0].column=e.columnNumber+1),{mode:"stack",name:e.name,message:e.message,stack:s}):null}function m(e){var n=e.stacktrace;if(n){for(var t,r=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,i=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,c=n.split("\n"),u=[],a=0;a<c.length;a+=2){var s=null;if((t=r.exec(c[a]))?s={url:t[2],line:+t[1],column:null,func:t[3],args:[]}:(t=i.exec(c[a]))&&(s={url:t[6],line:+t[1],column:+t[2],func:t[3]||t[4],args:t[5]?t[5].split(","):[]}),s){if(!s.func&&s.line&&(s.func=l(s.url,s.line)),s.line)try{s.context=o(s.url,s.line)}catch(e){}s.context||(s.context=[c[a+1]]),u.push(s)}}return u.length?{mode:"stacktrace",name:e.name,message:e.message,stack:u}:null}}function d(n){var r=n.message.split("\n");if(r.length<4)return null;var i,u=/^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,f=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of function script\s*$/i,g=[],m=e&&e.document&&e.document.getElementsByTagName("script"),d=[];for(var x in m)t(m,x)&&!m[x].src&&d.push(m[x]);for(var v=2;v<r.length;v+=2){var h=null;if(i=u.exec(r[v]))h={url:i[2],func:i[3],args:[],line:+i[1],column:null};else if(i=f.exec(r[v])){h={url:i[3],func:i[4],args:[],line:+i[1],column:null};var _=+i[1],k=d[i[2]-1];if(k){var b=c(h.url);if(b){b=b.join("\n");var w=b.indexOf(k.innerText);w>=0&&(h.line=_+b.substring(0,w).split("\n").length)}}}else if(i=p.exec(r[v])){var y=e.location.href.replace(/#.*$/,""),E=new RegExp(a(r[v+1])),S=s(E,[y]);h={url:y,func:"",args:[],line:S?S.line:i[1],column:null}}if(h){h.func||(h.func=l(h.url,h.line));var T=o(h.url,h.line),O=T?T[Math.floor(T.length/2)]:null;T&&O.replace(/^\s*/,"")===r[v+1].replace(/^\s*/,"")?h.context=T:h.context=[r[v+1]],g.push(h)}}return g.length?{mode:"multiline",name:n.name,message:r[0],stack:g}:null}function x(e,n,t,r){var i={url:n,line:t};if(i.url&&i.line){e.incomplete=!1,i.func||(i.func=l(i.url,i.line)),i.context||(i.context=o(i.url,i.line));var c=/ '([^']+)' /.exec(r);if(c&&(i.column=f(c[1],i.url,i.line)),e.stack.length>0&&e.stack[0].url===i.url){if(e.stack[0].line===i.line)return!1;if(!e.stack[0].line&&e.stack[0].func===i.func)return e.stack[0].line=i.line,e.stack[0].context=i.context,!1}return e.stack.unshift(i),e.partial=!0,!0}return e.incomplete=!0,!1}function v(e,n){for(var t,r,c,o=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,u=[],a={},s=!1,g=v.caller;g&&!s;g=g.caller)if(g!==h&&g!==i.report){if(r={url:null,func:"?",args:[],line:null,column:null},g.name?r.func=g.name:(t=o.exec(g.toString()))&&(r.func=t[1]),void 0===r.func)try{r.func=t.input.substring(0,t.input.indexOf("{"))}catch(e){}if(c=p(g)){r.url=c.url,r.line=c.line,"?"===r.func&&(r.func=l(r.url,r.line));var m=/ '([^']+)' /.exec(e.message||e.description);m&&(r.column=f(m[1],c.url,c.line))}a[""+g]?s=!0:a[""+g]=!0,u.push(r)}n&&u.splice(0,n);var d={mode:"callers",name:e.name,message:e.message,stack:u};return x(d,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),d}function h(e,n){var t=null;n=null==n?0:+n;try{if(t=m(e))return t}catch(e){}try{if(t=g(e))return t}catch(e){}try{if(t=d(e))return t}catch(e){}try{if(t=v(e,n+1))return t}catch(e){}return{mode:"failed"}}function _(e){e=(null==e?0:+e)+1;try{throw new Error}catch(n){return h(n,e+1)}}var k={};return h.augmentStackTraceWithInitialElement=x,h.guessFunctionName=l,h.gatherContext=o,h.ofCaller=_,h.getSource=c,h})(),i.extendToAsynchronousCallbacks=function(){var n=function(n){var t=e[n];e[n]=function(){var e=l.call(arguments),n=e[0];return"function"==typeof n&&(e[0]=i.wrap(n)),t.apply?t.apply(this,e):t(e[0],e[1])}};n("setTimeout"),n("setInterval")},i.remoteFetching||(i.remoteFetching=!0),i.collectWindowErrors||(i.collectWindowErrors=!0),(!i.linesOfContext||i.linesOfContext<1)&&(i.linesOfContext=11),"undefined"!=typeof module&&module.exports&&this.module!==module?module.exports=i:"function"==typeof define&&define.amd?define("TraceKit",[],i):e.TraceKit=i}})("undefined"!=typeof window?window:global),define("modules/core/exception",["require","exports","tslib","external/tracekit","modules/constants/page_load","modules/core/exception_tag_registry","modules/pagelet_config","modules/core/xhr"],function(e,n,t,r,i,c,l,o){"use strict";function u(e){f.push(e)}function reportException(e){var t=e.err,i=e.force,c=e.tags,l=e.severity,o=e.exc_extra;if(!t.reported){var u=r.computeStackTrace(t),a=null!=(u&&u.stack)?u.stack:[];n._reportException({msg:t.message,stack:a,force:i,tags:c,severity:l,exc_extra:o}),t.reported=!0}}function _reportException(e){var n=e.msg,u=e.stack,f=e.force,g=e.tags,m=e.severity,d=e.exc_extra;if(!p||f){var x=["\\b_reportException\\b","\\breportException\\b","\\bassert\\b","\\breportStack\\b"],v=u,h=u,_=[];u=a(u,x);try{throw new Error}catch(e){var k=r.computeStackTrace(e);null!=k&&null!=k.stack&&(_=k.stack),h=_,_=a(_,x)}var b=u.length-_.length;b<=0&&(b=1);var w=u.slice(0,b),y=u.slice(b);g||(g=[]),g=g.concat(c.get_registered_tags()),d=d?t.__assign({},d):{},d.client_time=(new Date).toString(),d.client_utc_time=(new Date).toUTCString(),s+=1,d.exception_number=s,d.page_repo_rev=i.REPO_REV,d.page_load_timestamp=i.PAGE_LOAD_TIME,d.metaserver_mdb_tags=i.METASERVER_MDB_TAGS,d.user_locale=i.USER_LOCALE;var E={};for(var S in window.requireContexts)if(window.requireContexts.hasOwnProperty(S)){var T={},O=window.requireContexts[S].firstUndefinedModule;O&&(T.first_undefined_module=O),E[S]=T}d.page_alameda_failures=E;var C=window.ensemble;if(null!=C&&null!=C.getAugmentedExceptionTags&&g.push.apply(g,C.getAugmentedExceptionTags(d.metaserver_mdb_tags)),null!=C&&null!=C.getPageletInfoForExceptionReporting){var R=C.getPageletInfoForExceptionReporting();d.pagelet_info=R,d.current_pagelet=l.REQUIREJS_CONFIG.context,d.page_load_timestamp=Math.floor(Math.max.apply(Math,R.map(function(e){return e.pagelet_client_load_time}))),g.push("maestro-website")}d.jsexclog_debug_stack_length=u.length,d.jsexclog_debug_context_length=_.length,d.jsexclog_debug_tracekit_stack1=v.reverse(),d.jsexclog_debug_tracekit_stack2=h.reverse();var F={e:n,loc:window.location.href,ref:document.referrer,stack:JSON.stringify(w.reverse()),context_tb:JSON.stringify(y.reverse()),tags:JSON.stringify(g),sev:m||"",exc_extra:JSON.stringify(d||{})};o.sendXhr("/jse",F),p=n}}function a(e,n){for(var t=function(e){if(!e)return!1;for(var t=0,r=n;t<r.length;t++){var i=r[t];if(e.search(i)!==-1)return!0}return!1};e.length>0&&t(e[0].func);)e=e.slice(1);return e}function assert(e,t,i){if(void 0===t&&(t="An assertion failed but no message was provided"),void 0===i&&(i={}),!e){var c=i.tags,l=void 0===c?[]:c,o=i.exc_extra,u=void 0===o?null:o;t="Assertion Error: "+t;try{throw new Error(t)}catch(e){var a=r.computeStackTrace(e);throw n._reportException({msg:t,stack:a&&null!=a.stack?a.stack:[],force:!0,tags:l.concat("module:exception","assert"),exc_extra:u}),e.reported=!0,f.forEach(function(e){return e(a)}),e}}}function reportStack(e,t){void 0===e&&(e="reportStack was called without a message"),void 0===t&&(t={}),t={severity:t.severity||n.SEVERITY.NONCRITICAL,tags:t.tags||[],exc_extra:t.exc_extra||{}};var r=new Error(e);n.reportException({err:r,force:!0,tags:(t.tags||[]).concat("module:exception","reportStack"),severity:t.severity,exc_extra:t.exc_extra})}Object.defineProperty(n,"__esModule",{value:!0});var s=0,f=[],p=void 0;n.SEVERITY={CRITICAL:"critical",NONCRITICAL:"non-critical"},n.registerOnFailedAssert=u,n.reportException=reportException,n._reportException=_reportException,n.cleanup_stack_trace=a,n.assert=assert,n.reportStack=reportStack}),define("modules/core/exception_tag_registry",["require","exports"],function(e,n){"use strict";function t(){var e=[];for(var n in l)l.hasOwnProperty(n)&&e.push(n);return e}function r(e){l[e]=!0}function i(e){delete l[e]}function c(){l={}}Object.defineProperty(n,"__esModule",{value:!0});var l={};n.get_registered_tags=t,n.register_tag=r,n.unregister_tag=i,n.clear_all_tags=c}),define("modules/pagelet_config",["require","exports","module"],function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.REQUIREJS_CONFIG=t.config().REQUIREJS_CONFIG}),function(){define("modules/shims/tracekit",["external/tracekit"],function(e){return e.linesOfContext=1,e.remoteFetching=!1,e.noConflict()})}.call(this);
//# sourceMappingURL=pkg-exception-reporting.min.js-vfldujWY9.map