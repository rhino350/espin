(function(){define("modules/clean/datetime",["modules/constants/time","modules/core/exception","modules/core/i18n"],function(e,t,r){var n,a,o,s,i,u,l,m,c,f,d,assert,_,h,g,L,p,A,R,S,E,U,y,F,v,b,w;return assert=t.assert,m=r._,w=r.ungettext,i=1e3,o=60*i,a=60*o,n=24*a,u=7*n,l=365*n,s=864e5,y=[m("January"),m("February"),m("March"),m("April"),m("May"),m("June"),m("July"),m("August"),m("September"),m("October"),m("November"),m("December")],c=[m("Jan"),m("Feb"),m("Mar"),m("Apr"),m("May"),m("Jun"),m("Jul"),m("Aug"),m("Sep"),m("Oct"),m("Nov"),m("Dec")],U=function(e,t){return t?c[e]:y[e]},g=function(e,t){var r;return r=[m("AM"),m("PM")],t.replace(/'[^']*'|y+|M+|d+|h+|k+|K+|H+|m+|s+|S+|a+/g,function(t){var n;switch(t[0]){case"'":return 2===t.length?"'":t.slice(1,-1);case"y":if("yy"===t)return e.getYear()%100;n=e.getFullYear();break;case"M":if(t.length>=3)return U(e.getMonth(),3===t.length);n=e.getMonth()+1;break;case"d":n=e.getDate();break;case"h":n=e.getHours()%12||12;break;case"k":n=e.getHours()%12+1;break;case"K":n=e.getHours()%12;break;case"H":n=e.getHours();break;case"m":n=e.getMinutes();break;case"s":n=e.getSeconds();break;case"S":n=e.getMilliseconds();break;case"a":return r[1*(e.getHours()>=12)]}return n=""+n,n.length<t.length&&(n=("00000000"+n).slice(t.length*-1)),n})},L=function(e,t){var r;return r=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()),g(r,t)},p=function(e){var t,r,n,a,o,s,i;for(s=[86400,3600,60,1],e=isNaN(e)?0:e,t=r=0,n=s.length;r<n;t=++r)if(o=s[t],e>=o){i=parseInt(e/o,10)||0;break}return e<1&&(i=0),t>=3?a=w("%d sec","%d secs",i).format(i):2===t?a=w("%d min","%d mins",i).format(i):1===t?a=w("%d hour","%d hours",i).format(i):0===t?a=w("%d day","%d days",i).format(i):assert(!1,"Invalid time"),a},h=function(e){var t,r,n;return r=Math.floor(e),r<0&&(r=0),t=function(e){return e<10?"0"+e:e.toString()},n=":"+t(r%60),r=Math.floor(r/60),n=t(r%60)+n,r=Math.floor(r/60),r>0&&(n=r.toString()+":"+n),n},R=function(e){var t,r,n,a,o,i,u,l,m;return m=new Date(e),m.setHours(0,0,0,0),u=m.getTime(),l=u-s,t=new Date(e),0===m.getDay()?t.setDate(m.getDate()-7):t.setDate(m.getDate()-m.getDay()-1),t.setHours(0),i=t.getTime(),a=i-7*s,m.setDate(1),o=m.getTime(),m.setMonth(m.getMonth()-1),r=m.getTime(),m.setMonth(m.getMonth()-3),n=m.getTime(),{today:u,yesterday:l,thisWeek:i,lastWeek:a,thisMonth:o,lastMonth:r,lastThreeMonths:n}},E=function(e,t,r){return null==r&&(r=!0),r?m("%(month)s %(year)s",{comment:"Like Jun 2012"}).format({month:U(e,!0),year:t}):m("%(month)s %(year)s",{comment:'Like Jun 2012. If this string begins with a fixed letter, not a placeholder, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format({month:U(e,!0),year:t})},F=function(e,t,r){return null==r&&(r=!0),r?m("%(month)s %(year)s",{comment:"Month and Year, like December 2012"}).format({month:U(e,!1),year:t}):m("%(month)s %(year)s",{comment:'Month and Year, like December 2012. If this string begins with a fixed letter, not a placeholder, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format({month:U(e,!1),year:t})},v=function(e,t,r,n){var a,o,s,i;return null==r&&(r=!1),null==n&&(n=!1),r?(a=e.getUTCDate(),o=e.getUTCMonth(),i=e.getUTCFullYear()):(a=e.getDate(),o=e.getMonth(),i=e.getFullYear()),s=U(o,!n),t?m("%(month)s %(date)s, %(year)s",{comment:"Like Jan 15, 2014"}).format({month:s,date:a,year:i}):m("%(month)s %(date)s",{comment:"Like Jan 15"}).format({month:s,date:a})},f=function(e,t,r,n){return null==t&&(t=!0),null==r&&(r=!1),null==n&&(n=!1),d(e,new Date,t,r,n)},d=function(e,t,r,s,i){var c,f,d,_,h,g,L,p;if(null==r&&(r=!0),null==s&&(s=!1),null==i&&(i=!1),d=Number(t)-Number(e),d<o)return m(i?r?"A moment ago":"a moment ago":r?"Just now":"just now");if(d<a)return h=Math.floor(d/o),r?w("%d min ago","%d mins ago",h).format(h):w("%d min ago","%d mins ago",h,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(h);if(d<n)return _=Math.floor(d/a),s?r?w("%(hours)s hr ago","%(hours)s hrs ago",_,{comment:'hr is an abbreviation for "hour". If possible, use a similar abbreviation in the target language. If the translation begins with a fixed letter (not a placeholder), and it may allowably be a capital or lowercase letter, capitalize the first letter so it may appear as a standalone message.'}).format({hours:_}):w("%(hours)s hr ago","%(hours)s hrs ago",_,{comment:'hr is an abbreviation for "hour" If the translation begins with a fixed letter (not a placeholder), and it may allowably be a capital or lowercase letter, start the translation with a lowercase letter so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format({hours:_}):r?w("%d hour ago","%d hours ago",_).format(_):w("%d hour ago","%d hours ago",_,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(_);if(d<30*n)return f=Math.floor(d/n),s&&1===f?m(r?"Yesterday":"yesterday"):r?w("%d day ago","%d days ago",f).format(f):w("%d day ago","%d days ago",f,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(f);if(!s&&d<56*n)return L=Math.floor(d/u),r?w("%d week ago","%d weeks ago",L).format(L):w("%d week ago","%d weeks ago",L,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(L);if(d<l){if(g=Math.floor(d/(30*n)),1===g){if(s)return m(r?"Last month":"last month");g=2}return g=Math.min(11,g),r?w("%d month ago","%d months ago",g).format(g):w("%d month ago","%d months ago",g,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(g)}return s?(c=new Date(e),E(c.getMonth(),c.getFullYear(),r)):(p=Math.floor(d/l),r?w("%d year ago","%d years ago",p).format(p):w("%d year ago","%d years ago",p,{comment:'If this string begins with a letter, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'}).format(p))},A=function(e,t,r){var n,a,s,i,u,l;return null==t&&(t=!1),null==r&&(r=!1),s=Date.now(),a=s-Number(e),n=new Date(e),s=new Date(s),u=new Date(s.getFullYear(),s.getMonth(),s.getDate()),l=new Date(s.getFullYear(),s.getMonth(),s.getDate()-1),i=n.toLocaleTimeString(void 0,{hour:"numeric",minute:"numeric",timeZone:"UTC"}),a<o?t?m("a moment ago",{comment:"Like 'You edited a moment ago'"}):m("just now",{comment:"Like 'You edited just now'"}):e>Number(u)?r?m("today, %(time)s",{comment:"Like 'You edited today, 3:00 PM'"}).format({time:i}):m("today at %(time)s",{comment:"Like 'You edited today at 3:00 PM'"}).format({time:i}):e>Number(l)?r?m("yesterday, %(time)s",{comment:"Like 'You edited yesterday, 3:00 PM'"}).format({time:i}):m("yesterday at %(time)s",{comment:"Like 'You edited yesterday at 3:00 PM'"}).format({time:i}):r?(n=g(n,"M/d/yyyy"),m("%(date)s, %(time)s",{comment:"Like 'You edited 08/20/2015, 3:00 PM"}).format({time:i,date:n})):(n=n.getFullYear()===s.getFullYear()?v(n,!1,!1,!0):v(n,!0,!1,!0),m("on %(date)s",{comment:"Like 'You edited on August 20, 2015"}).format({date:n}))},S=function(e,t,r,n,a,o){return null==t&&(t=0),null==r&&(r=0),null==n&&(n=0),null==a&&(a=0),null==o&&(o=0),e.setFullYear(e.getFullYear()+t),e.setMonth(e.getMonth()+r),e.setDate(e.getDate()+n),e.setHours(e.getHours()+a),e.setMinutes(e.getMinutes()+o),e},b=function(){return(new Date).getTime()},_=function(e){var t;return t=new Date,t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),S(t,0,0,e)},{abbr_month_names:c,ago:f,agoFromDate:d,daysAfterToday:_,format_date:g,format_date_utc:L,format_time:p,formatAudioTime:h,getActingTime:A,getTimeBands:R,increment_date:S,localized_date_format:e.DATE_FORMAT,localized_datetime_format:e.DATETIME_FORMAT,localized_time_format:e.TIME_FORMAT,month_abbr_with_year:E,month_name:U,month_names:y,month_with_year:F,nice_date_with_month_name:v,time:b}})}).call(this),define("modules/clean/display_format",["require","exports","modules/core/i18n"],function(e,t,r){"use strict";function n(e,t,n,a){void 0===t&&(t=2),void 0===n&&(n=!0),void 0===a&&(a=!0),e=parseFloat(e);var o,s,i=Math.abs(e);i<1024?(t=0,o=e,s=r.ungettext("byte","bytes",e),n=!0):i<921600?(o=e/1024,s=r._("KB")):i<943718400?(o=e/1048576,s=r._("MB")):i<966367641600||0===t&&e<1099511627776?(o=e/1073741824,s=r._("GB")):(o=e/1099511627776,s=r._("TB")),o=Math.round(o*Math.pow(10,t))/parseFloat(Math.pow(10,t));var u=o.toFixed(t);return a&&t>0&&(u=parseFloat(u).toString()),u+(n?" ":"")+s}function a(e,t,r,a){return void 0===t&&(t=2),void 0===r&&(r=!0),void 0===a&&(a=!0),e=parseFloat(e),n(1073741824*e)}Object.defineProperty(t,"__esModule",{value:!0}),t.format_bytes=n,t.formatGigabytes=a}),function(){var e=function(e,r){function n(){this.constructor=e}for(var a in r)t.call(r,a)&&(e[a]=r[a]);return n.prototype=r.prototype,e.prototype=new n,e.__super__=r.prototype,e},t={}.hasOwnProperty,r=[].slice;define("modules/clean/validators/validators",["jquery","external/underscore","modules/core/i18n"],function(t,n,a){var o,s,i,u,l,m,c,f,d,_,h,g,L;return d=a._,_={},L=function(e,t){return _[e]=t},g=function(e){var t,r,n;if(n=e[0],r=e.slice(1),!_[n])throw new Error("Cannot find validator of type "+n);return t=_[n],(function(e,t,r){r.prototype=e.prototype;var n=new r,a=e.apply(n,t);return Object(a)===a?a:n})(t,r,function(){})},f=(function(){function e(e){this.messages=n.extend({},this.constructor.messages,null!=e?e.messages:void 0)}return e})(),s=(function(t){function a(){var e,t,o;o=1<=arguments.length?r.call(arguments,0):[],t=null,n.isArray(n.last(o))||(t=n.last(o),o=n.initial(o)),this.validators=(function(){var t,r,n;for(n=[],t=0,r=o.length;t<r;t++)e=o[t],null!==e&&n.push(g(e));return n})(),a.__super__.constructor.call(this,t)}return e(a,t),a.prototype.validate=function(e,t){var r,n,a,o,s;for(a=this.validators,o=[],r=0,n=a.length;r<n;r++)s=a[r],o.push(s.validate(e,t));return o},a})(f),L("AllValidator",s),o=/^[\x00-\x7f]*$/,i=(function(t){function r(){return r.__super__.constructor.apply(this,arguments)}return e(r,t),r.messages={asciiOnly:d("Only basic ASCII characters allowed")},r.prototype.validate=function(e){if(!o.test(e))throw new Error(this.messages.asciiOnly)},r})(f),L("AsciiOnlyValidator",i),m=(function(r){function n(e){n.__super__.constructor.call(this,e),this.not_empty=e.not_empty,this.strip=e.strip}return e(n,r),n.messages={empty:d("Please enter a value for %(field)s")},n.prototype.validate=function(e,r){if(this.strip&&(e=t.trim(e)),this.not_empty&&!e)throw new Error(this.messages.empty.format({field:null!=r?r.field:void 0}))},n})(f),L("StringValidator",m),l=(function(t){function r(e){r.__super__.constructor.call(this,e),this.lastname_goes_first=null!=e?e.lastname_goes_first:void 0}return e(r,t),r.messages={empty:d("Please enter your name")},r.prototype.validate=function(e,t){var r;if(!t.data.lname&&!t.data.fname)if(this.lastname_goes_first){if("lname"===t.field)throw new Error(this.messages.empty)}else if("fname"===t.field)throw new Error(this.messages.empty);if("fname"===t.field)return r=g(["StringValidator",{not_empty:!0,strip:!0,messages:{empty:d("Please enter your first name")}}]),r.validate(e,t)},r})(f),L("NameValidator",l),u=(function(r){function n(){return n.__super__.constructor.apply(this,arguments)}return e(n,r),n.messages={empty:d("Please enter an email address"),noAt:d("An email address must contain a single @"),badUsername:d("The username portion of the email address is invalid (the portion before the @: %(username)s)"),badDomain:d("The domain portion of the email address is invalid (the portion after the @: %(domain)s)")},n.username_re=/^[\w!#$%&'*+\-\/=?^`{|}~.]+$/,n.domain_re=new RegExp("^([a-z0-9][a-z0-9\\-]*\\.)+([a-z]+|xn--[a-z0-9\\-]+)$","i"),n.prototype.validate=function(e){var r,a,s;if(e=t.trim(e),!e)throw new Error(this.messages.empty);if(a=e.split("@"),2!==a.length)throw new Error(this.messages.noAt);if(s=a[0],r=a[1],!n.username_re.test(s))throw new Error(this.messages.badUsername.format({username:s}));if(o.test(r)&&!n.domain_re.test(r))throw new Error(this.messages.badDomain.format({domain:r}))},n})(f),L("EmailValidator",u),c=(function(r){function n(){return n.__super__.constructor.apply(this,arguments)}return e(n,r),n.messages={nonValidAddress:d("Please enter a valid website address")},n.prototype.validate=function(e){var r,n,a;if(e=t.trim(e),!e)throw new Error(this.messages.nonValidAddress);if(a=e.split("."),a.length<2)throw new Error(this.messages.nonValidAddress);if(n=a[0],r=a[1],!n)throw new Error(this.messages.nonValidAddress);if(!r)throw new Error(this.messages.nonValidAddress)},n})(f),L("UrlValidator",c),h=function(e){return function(t,r){var n;n=!0;try{e.validate(t,r)}catch(e){n=!1}return n}},{create:g,register:L,check:h}})}.call(this),define("modules/core/i18n",["require","exports","tslib","langpack","modules/core/exception","modules/constants/page_load","external/sha1"],function(e,t,r,n,a,o,s){"use strict";function i(e,r,n,a){r=r.strip_tags().friendly_format(),n=n.strip_tags(),t.messages[r]=e,t.emessages[r]=n,a&&(delete t.messages[a],delete t.emessages[a])}function u(e,t,n){void 0===n&&(n="web");var a,o;return a="string"==typeof e?{project:e}:e?e:{},o="string"==typeof t?{comment:t}:t?t:{},r.__assign({project:n},a,o)}function l(r,n,a){var s,l=u(n,a),f=l.project,d=l.comment;if(c(o.USER_LOCALE))s=m(r,o.USER_LOCALE);else{var _=y.get_string_key(r,f,d),h=t.LANGPACK[_]||t.LANGPACK[r];h?s=h instanceof String||"string"==typeof h?h:h[0]||r:(0===F&&"en"!==o.USER_LOCALE&&(F=Math.floor(20*Math.random()+1)),1===F&&v<4&&(v+=1,e(["jquery"],function(e){e.ajax({url:"/missed_translation_log",type:"POST",data:{message:r,commentStr:d,projectStr:f}})})),s=r)}return i(r,s,r),s}function m(e,t){if("xx_LS"===t)e+="SSSSSSSSSSSSSSSSSSSSSSSSS";else if("xx_AC"!==t||/</.test(e))if("xx_HA"===t)e="[javascript]"+e;else if("xx_RL"!==t||/</.test(e)||/%/.test(e))"xx_AE"!==t||/</.test(e)||/%/.test(e)||(e=e.split("").map(function(e){return null!=U[e]?U[e]:e}).join(""));else{var r="";e=e.toLowerCase();for(var n=0;n<e.length;n++){var a=e.charCodeAt(n)-97;r+=0<=a&&a<26?String.fromCharCode(1488+a):e[n]}e=r}else e=e.toUpperCase();return e}function c(e){return e.indexOf("xx_")!==-1}function f(e,r,n,s,l){var f=u(s,l),d=f.project,_=f.comment,h=null;a.assert(null!=n,"missing number parameter for ungettext");var g=o.USER_LOCALE;if(g)if(c(g))e=m(e,g),r=m(r,g);else{var L=y.get_string_key(e,d,_),p=t.LANGPACK[L]||t.LANGPACK[e];if(p){if(p instanceof String||"string"==typeof p)return p;var A=t.PLURAL_RULES_BY_LOCALE[g](n);null!=p[A]&&(h=p[A])}}var R=1===n?e:r;null==h&&(h=R);var S=h;return i(e,S,R),S}function d(e,t,r){var n=u(t,r);return new b(e,n.project,n.comment)}function _(e){return l(e.msg,e.project||"web",e.comment)}function h(e){var t=e.length;switch(t){case 1:return e[0];case 2:return l("%s %s",{comment:"Two sentences"}).format(e);case 3:return l("%s %s %s",{comment:"Three sentences"}).format(e);case 4:return l("%s %s %s %s",{comment:"Four sentences"}).format(e);default:for(var r="",n=0,a=0,o=e;a<o.length;a++){r+=o[a],n!==t-1&&(r+=l(" ",{comment:"Sentence separator character"})),n+=1}return r}}function g(e){var r=o.USER_LOCALE;return r?t.PERCENT_FORMAT_BY_LOCALE[r](e):t.PERCENT_FORMAT.SUFFIX(e)}function L(e){return{_:function(t,r,n){return a=u(r,n,e),r=a.project,n=a.comment,l(t,r,n);var a},ungettext:function(t,r,n,a,o){return s=u(a,o,e),a=s.project,o=s.comment,f(t,r,n,a,o);var s},N_:function(t,r,n){return a=u(r,n,e),r=a.project,n=a.comment,d(t,r,n);var a},E_:_}}function p(){if(window.Intl&&window.Intl.Collator){var e=o.USER_LOCALE.replace("_","-")||"en";return new window.Intl.Collator(e).compare}return function(e,t){var r=e.toLowerCase(),n=t.toLowerCase();return r<n?-1:r>n?1:e<t?-1:e>t?1:0}}Object.defineProperty(t,"__esModule",{value:!0}),t.LANGPACK=(function(){if(Array.isArray(n)){for(var e={},t=n,r=0;r<t[0].length;r++)e[t[0][r]]=t[1][r];return e}return n})();var A="abcdefghijklmnopqrstuvwxyz",R="âḃćḋèḟĝḫíĵǩĺṁńŏṗɋŕśṭůṿẘẋẏẓ",S="ABCDEFGHIJKLMNOPQRSTUVWXYZ",E="ḀḂḈḊḔḞḠḢḬĴḴĻḾŊÕṔɊŔṠṮŨṼẄẌŸƵ",U=(function(){for(var e={},t=0;t<26;t++)e[A.charAt(t)]=R.charAt(t),e[S.charAt(t)]=E.charAt(t);return e})(),y={CONTEXT_DELIMITER:"",get_message_context:function(e,t){var r="";if("web"!==e&&(r="project:"+e),null!=t){var n=new s("SHA-1","TEXT");n.update(t);var a=n.getHash("HEX");r?r+=" "+a:r=a}return r},get_string_key:function(e,t,r){var n=y.get_message_context(t,r);return null!=n?n+y.CONTEXT_DELIMITER+e:e}};t.messages={},t.emessages={};var F=0,v=0;t.add_i18n_message=i,t.PLURAL_RULES={SINGULAR_1:function(e){return 1===e?0:1},SINGULAR_01:function(e){return e<=1?0:1},SINGULAR_ALL:function(e){return 0},RUSSIA_UKRAINE:function(e){return e%10===1&&e%100!==11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2},POLAND:function(e){return 1===e?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2}},t.PLURAL_RULES_BY_LOCALE={en:t.PLURAL_RULES.SINGULAR_1,en_GB:t.PLURAL_RULES.SINGULAR_1,da_DK:t.PLURAL_RULES.SINGULAR_1,de:t.PLURAL_RULES.SINGULAR_1,es_ES:t.PLURAL_RULES.SINGULAR_1,es:t.PLURAL_RULES.SINGULAR_1,fr:t.PLURAL_RULES.SINGULAR_01,id:t.PLURAL_RULES.SINGULAR_ALL,it:t.PLURAL_RULES.SINGULAR_1,ja:t.PLURAL_RULES.SINGULAR_ALL,ko:t.PLURAL_RULES.SINGULAR_ALL,ms:t.PLURAL_RULES.SINGULAR_ALL,nb_NO:t.PLURAL_RULES.SINGULAR_1,nl_NL:t.PLURAL_RULES.SINGULAR_1,pl:t.PLURAL_RULES.POLAND,pt_BR:t.PLURAL_RULES.SINGULAR_01,ru:t.PLURAL_RULES.RUSSIA_UKRAINE,sv_SE:t.PLURAL_RULES.SINGULAR_1,th_TH:t.PLURAL_RULES.SINGULAR_ALL,tr:t.PLURAL_RULES.SINGULAR_ALL,uk_UA:t.PLURAL_RULES.RUSSIA_UKRAINE,xx_AC:t.PLURAL_RULES.SINGULAR_1,xx_LS:t.PLURAL_RULES.SINGULAR_1,xx_HA:t.PLURAL_RULES.SINGULAR_1,xx_RL:t.PLURAL_RULES.SINGULAR_1,xx_AE:t.PLURAL_RULES.SINGULAR_1,xx_SL:t.PLURAL_RULES.SINGULAR_1,zh_CN:t.PLURAL_RULES.SINGULAR_ALL,zh_TW:t.PLURAL_RULES.SINGULAR_ALL},t.PERCENT_FORMAT={SUFFIX:function(e){return"%(percent)s%".format({percent:e})},PREFIX:function(e){return"%"+"%(percent)s".format({percent:e})},SUFFIX_SPACE:function(e){return"%(percent)s %".format({percent:e})}},t.PERCENT_FORMAT_BY_LOCALE={en:t.PERCENT_FORMAT.SUFFIX,en_GB:t.PERCENT_FORMAT.SUFFIX,da_DK:t.PERCENT_FORMAT.SUFFIX_SPACE,de:t.PERCENT_FORMAT.SUFFIX_SPACE,es_ES:t.PERCENT_FORMAT.SUFFIX,es:t.PERCENT_FORMAT.SUFFIX,fr:t.PERCENT_FORMAT.SUFFIX_SPACE,id:t.PERCENT_FORMAT.SUFFIX,it:t.PERCENT_FORMAT.SUFFIX,ja:t.PERCENT_FORMAT.SUFFIX,ko:t.PERCENT_FORMAT.SUFFIX,ms:t.PERCENT_FORMAT.SUFFIX,nb_NO:t.PERCENT_FORMAT.SUFFIX_SPACE,nl_NL:t.PERCENT_FORMAT.SUFFIX,pl:t.PERCENT_FORMAT.SUFFIX,pt_BR:t.PERCENT_FORMAT.SUFFIX,ru:t.PERCENT_FORMAT.SUFFIX_SPACE,sv_SE:t.PERCENT_FORMAT.SUFFIX_SPACE,th_TH:t.PERCENT_FORMAT.SUFFIX,tr:t.PERCENT_FORMAT.PREFIX,uk_UA:t.PERCENT_FORMAT.SUFFIX,xx_AC:t.PERCENT_FORMAT.SUFFIX,xx_LS:t.PERCENT_FORMAT.SUFFIX,xx_HA:t.PERCENT_FORMAT.SUFFIX,xx_RL:t.PERCENT_FORMAT.SUFFIX,xx_AE:t.PERCENT_FORMAT.SUFFIX,zh_CN:t.PERCENT_FORMAT.SUFFIX,zh_TW:t.PERCENT_FORMAT.SUFFIX},t._=l,t.fake_translate=m,t.locale_is_fake=c,t.ungettext=f,t.N_=d,t.E_=_,t.render_sentences=h,t.format_percent=g,t.i18n_default_project=L,t.case_insensitive_comparator=p;var b=(function(){function e(e,t,r){this.msg=e,this.project=t,this.comment=r}return e})();t.NoOpTranslated=b,String.prototype.format_sub=function(e){return this.replace(/%(\([a-zA-Z0-9_\-]+\))?(\.\d+)?(.)/g,e.bind(this))},String.prototype.format=function(){if(0===arguments.length)return this.toString();var e=function(e,t){e||a.reportStack(t,{tags:["String.format"],severity:a.SEVERITY.CRITICAL})},r=void 0,n=0;r=1===arguments.length&&arguments[0]instanceof Object?arguments[0]:Array.prototype.slice.call(arguments,0);var s,u=function(t,a,i,u){if(a){a=a.slice(1,-1),e(n<=0,"Cannot mix named and positional indices in string formatting for string '"+this+"'."),n=-1;var l="xx_AC"===o.USER_LOCALE;e(a in r||l&&a.toLowerCase()in r,"Key '"+a+"' not present during string substitution for string '"+this+"'"),s=r[a],l&&(s=r[a.toLowerCase()])}else Array.isArray(r)||(r=[r]),e(n>-1,"Cannot mix named and positional indices in string formatting for string '"+this+"'."),e(n<r.length,"Insufficient number of items in format for string '"+this+"'"),s=r[n],n++;e(void 0!==s,"value for key '"+(a||"")+"' is undefined"),null==s&&(s="");var m=s.toString();if("s"===u||"S"===u);else if("d"===u||"D"===u)m=parseInt(s,10).toString();else if("f"===u||"F"===u)m=Number(s).toString();else{if("%"===u)return"%";e(!1,"Unexpected format character '"+u+"' for string '"+this+"'.")}if(i){var c=parseInt(i.slice(1),10);if("f"===u||"F"===u){m.indexOf(".")===-1&&(m+=".0");var f=m.split(".");return f[0]+"."+f[1].slice(0,c)}return m.slice(0,c)}return m},l=this.format_sub(u);if(t.messages&&this in t.messages){n=0;var m=t.emessages[this];i(m,l,String.prototype.format_sub.call(m,u),this)}return l},String.prototype.friendly_format=function(){var e=1,t=1,r=function(r,n,a,o){return n?"["+n.slice(1,1).replace("-","_")+"]":"s"===o||"S"===o?"[word"+t+++"]":"[number"+e+++"]"};return this.format_sub(r)},String.prototype.blank_format=function(){var e=function(){return""};return this.format_sub(e)},String.prototype.strip_tags=function(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"")}}),define("modules/core/user_i18n",["require","exports","modules/constants/page_load"],function(e,t,r){"use strict";function n(e){if(!e)return"";e=e.toUpperCase();var t=e.trim().split(" "),r=t[0],n=i(r),a=t[t.length-1],u=i(a);if(t.length>=2)return s()?u[0]+n[0]:n[0]+u[0];var l=i(e);return s()&&!o(e)&&l.length>1?l[0]+l[1]:l[0]}function a(e){if(!e)return"";var t=e.trim().split(" ");return t.length<2?e:s()?t[t.length-1][0]+" "+t[0]:t[0]+" "+t[t.length-1][0]}function o(e){for(var t=0;t<e.length;t++)if(e.charCodeAt(t)>=128)return!1;return!0}function s(){return["zh","ja","ko"].indexOf(r.USER_LOCALE)!==-1}function i(e){for(var t=[],r=e.length,n=0;n<r;){var a=e[n];if(a>="�"&&a<="�"){if(!(n<r-1))break;var o=e[n+1],s=a+o;t.push(s),n+=2}else t.push(a),n+=1}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getInitials=n,t.getShortName=a});
//# sourceMappingURL=pkg-i18n.min.js-vflYd3AZt.map