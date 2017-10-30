mm_stat_compilation= "29-08-2017 16:17:58";
(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.statistics==undefined) { window.psd.statistics = {}; }
    if(window.psd.statistics.plugins==undefined) { window.psd.statistics.plugins = {}; }
    
    window.psd.statistics.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.psd.statistics.debug = true; }
    
})(window);/* Copyright (c) 2016 comScore, Inc.
 * All rights reserved.
 * By using this software, you are agreeing to be bound by the
 * terms of these policies: http://www.comscore.com/About_comScore/Privacy_Policy
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.ns_=b(a.ns_)}):"object"==typeof module&&module.exports?module.exports=b():a.ns_=b(a.ns_)}(this,function(a){a=a||{},a.ns_=a;var b={uid:function(){var a=1;return function(){return+new Date+"_"+a++}}(),filter:function(a,b){var c={};for(var d in b)b.hasOwnProperty(d)&&a(b[d])&&(c[d]=b[d]);return c},extend:function(a){var b,c=arguments.length;a=a||{};for(var d=1;d<c;d++)if(b=arguments[d])for(var e in b)b.hasOwnProperty(e)&&(a[e]=b[e]);return a},getString:function(a,b){var c=String(a);return null==a?b||"na":c},getLong:function(a,b){var c=Number(a);return null==a||isNaN(c)?b||0:c},getInteger:function(a,b){var c=Number(parseInt(a));return null==a||isNaN(c)?b||0:c},getBoolean:function(a,b){var c="true"==String(a).toLowerCase();return null==a?b||!1:c},parseBoolean:function(a,b){return b=b||!1,a?"0"!=a&&void 0:b},isNotEmpty:function(a){return!this.isEmpty(a)},isEmpty:function(a){return void 0===a||null===a||""===a||a instanceof Array&&0===a.length},indexOf:function(a,b){var c=-1;return this.forEach(b,function(b,d){b==a&&(c=d)}),c},forEach:function(a,b,c){try{if("function"==typeof b)if(c="undefined"!=typeof c?c:null,"number"!=typeof a.length||"undefined"==typeof a[0]){var d="undefined"!=typeof a.__proto__;for(var e in a)a.hasOwnProperty(e)&&(!d||d&&"undefined"==typeof a.__proto__[e])&&"function"!=typeof a[e]&&b.call(c,a[e],e)}else for(var f=0,g=a.length;f<g;f++)b.call(c,a[f],f)}catch(h){}},regionMatches:function(a,b,c,d,e){if(b<0||d<0||b+e>a.length||d+e>c.length)return!1;for(;--e>=0;){var f=a.charAt(b++),g=c.charAt(d++);if(f!=g)return!1}return!0},size:function(a){var b=0;for(var c in a)a.hasOwnProperty(c)&&b++;return b},log:function(a,b){if("undefined"!=typeof b&&b&&"undefined"!=typeof console&&console){var c=new Date,d=c.getHours()+":"+c.getMinutes()+":"+c.getSeconds();console.log(d,a)}},isTrue:function(a){return"undefined"!=typeof a&&("string"==typeof a?(a=a.toLowerCase(),"true"===a||"1"===a||"on"===a):!!a)},toString:function(a){if("undefined"==typeof a)return"undefined";if("string"==typeof a)return a;if("[object Array]"===Object.prototype.toString.call(a))return a.join(",");if(this.size(a)>0){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}return a.toString()},exists:function(a){return"undefined"!=typeof a&&null!=a},firstGreaterThan0:function(){for(var a=0,b=arguments.length;a<b;a++){var c=arguments[a];if(c>0)return c}return 0},cloneObject:function(a){if(null==a||"object"!=typeof a)return a;var b=function(){function a(){}function b(b){return"object"==typeof b?(a.prototype=b,new a):b}function c(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b])}function d(){this.copiedObjects=[];var a=this;this.recursiveDeepCopy=function(b){return a.deepCopy(b)},this.depth=0}function e(a,b){var c=new d;return b&&(c.maxDepth=b),c.deepCopy(a)}function f(a){return"undefined"!=typeof window&&window&&window.Node?a instanceof Node:"undefined"!=typeof document&&a===document||"number"==typeof a.nodeType&&a.attributes&&a.childNodes&&a.cloneNode}var g=[];return c.prototype={constructor:c,canCopy:function(){return!1},create:function(a){},populate:function(a,b,c){}},d.prototype={constructor:d,maxDepth:256,cacheResult:function(a,b){this.copiedObjects.push([a,b])},getCachedResult:function(a){for(var b=this.copiedObjects,c=b.length,d=0;d<c;d++)if(b[d][0]===a)return b[d][1]},deepCopy:function(a){if(null===a)return null;if("object"!=typeof a)return a;var b=this.getCachedResult(a);if(b)return b;for(var c=0;c<g.length;c++){var d=g[c];if(d.canCopy(a))return this.applyDeepCopier(d,a)}throw new Error("Unable to clone the following object "+a)},applyDeepCopier:function(a,b){var c=a.create(b);if(this.cacheResult(b,c),this.depth++,this.depth>this.maxDepth)throw new Error("Maximum recursion depth exceeded.");return a.populate(this.recursiveDeepCopy,b,c),this.depth--,c}},e.DeepCopier=c,e.deepCopiers=g,e.register=function(a){a instanceof c||(a=new c(a)),g.unshift(a)},e.register({canCopy:function(){return!0},create:function(a){return a instanceof a.constructor?b(a.constructor.prototype):{}},populate:function(a,b,c){for(var d in b)b.hasOwnProperty(d)&&(c[d]=a(b[d]));return c}}),e.register({canCopy:function(a){return a instanceof Array},create:function(a){return new a.constructor},populate:function(a,b,c){for(var d=0;d<b.length;d++)c.push(a(b[d]));return c}}),e.register({canCopy:function(a){return a instanceof Date},create:function(a){return new Date(a)}}),e.register({canCopy:function(a){return f(a)},create:function(a){return"undefined"!=typeof document&&a===document?document:a.cloneNode(!1)},populate:function(a,b,c){if("undefined"!=typeof document&&b===document)return document;if(b.childNodes&&b.childNodes.length)for(var d=0;d<b.childNodes.length;d++){var e=a(b.childNodes[d]);c.appendChild(e)}}}),{deepCopy:e}}();return b.deepCopy(a)},safeGet:function(a,b){return b=this.exists(b)?b:"",this.exists(a)?a:b},getBrowserName:function(){if(!navigator)return"";var a,b,c=navigator.userAgent||"",d=navigator.appName||"";return(b=c.indexOf("Opera"))!=-1||(b=c.indexOf("OPR/"))!=-1?d="Opera":(b=c.indexOf("Android"))!=-1?d="Android":(b=c.indexOf("Chrome"))!=-1?d="Chrome":(b=c.indexOf("Safari"))!=-1?d="Safari":(b=c.indexOf("Firefox"))!=-1?d="Firefox":(b=c.indexOf("IEMobile"))!=-1?d="Internet Explorer Mobile":"Microsoft Internet Explorer"==d||"Netscape"==d?d="Internet Explorer":(a=c.lastIndexOf(" ")+1)<(b=c.lastIndexOf("/"))?(d=c.substring(a,b),d.toLowerCase()==d.toUpperCase()&&(d=navigator.appName)):d="unknown",d},getBrowserFullVersion:function(){if(!navigator)return"";var a,b,c,d,e=navigator.userAgent||"",f=navigator.appName||"",g=navigator.appVersion?""+parseFloat(navigator.appVersion):"";return(b=e.indexOf("Opera"))!=-1?(g=e.substring(b+6),(b=e.indexOf("Version"))!=-1&&(g=e.substring(b+8))):(b=e.indexOf("OPR/"))!=-1?g=e.substring(b+4):(b=e.indexOf("Android"))!=-1?g=e.substring(b+11):(b=e.indexOf("Chrome"))!=-1?g=e.substring(b+7):(b=e.indexOf("Safari"))!=-1?(g=e.substring(b+7),(b=e.indexOf("Version"))!=-1&&(g=e.substring(b+8))):(b=e.indexOf("Firefox"))!=-1?g=e.substring(b+8):"Microsoft Internet Explorer"==f?(d=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"),null!=d.exec(e)&&(g=parseFloat(RegExp.$1))):"Netscape"==f?(d=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})"),null!=d.exec(e)&&(g=parseFloat(RegExp.$1))):g=e.lastIndexOf(" ")+1<(b=e.lastIndexOf("/"))?e.substring(b+1):"unknown",g=g.toString(),(c=g.indexOf(";"))!=-1&&(g=g.substring(0,c)),(c=g.indexOf(" "))!=-1&&(g=g.substring(0,c)),(c=g.indexOf(")"))!=-1&&(g=g.substring(0,c)),a=parseInt(""+g,10),isNaN(a)&&(g=""+parseFloat(navigator.appVersion)),g},browserAcceptsLargeURLs:function(){return"undefined"==typeof window||(null!==window.ActiveXObject,!0)},getNamespace:function(){return a.ns_||a}};return a.StreamSense=a.StreamSense||function(){var c=function(){var a="cs_";return function(){var c="undefined"!=typeof localStorage?localStorage:null;b.extend(this,{get:function(b){return c&&c.getItem(a+b)},set:function(b,d){c&&c.setItem(a+b,d)},has:function(b){return c&&c.getItem(a+b)},remove:function(b){c&&c.removeItem(a+b)},clear:function(){for(var b=0;c&&b<c.length;++b){var d=c.key(b);d.substr(0,a.length)===a&&c.removeItem(d)}}})}}(),d=function(a,b){if("undefined"==typeof Image)return void("function"==typeof setTimeout?b&&setTimeout(b,0):b&&b());var c=new Image;c.onload=function(){b&&b(200),c=null},c.onerror=function(){b&&b(),c=null},c.src=a},e=function(a,b,c){"function"==typeof setTimeout?c&&setTimeout(function(){c(200)},0):c&&c(200)},f=function(){return{dir:function(){return null},append:function(a,b,c){},write:function(a,b,c){},deleteFile:function(){return!1},read:function(){return null}}}(),g=function(){return{PLATFORM:"generic",httpGet:d,httpPost:e,Storage:c,IO:f,onDataFetch:function(a){a()},getCrossPublisherId:function(){return null},getAppName:function(){return h.UNKNOWN_VALUE},getAppVersion:function(){return h.UNKNOWN_VALUE},getVisitorId:function(){return this.getDeviceName()+ +new Date+~~(1e3*Math.random())},getVisitorIdSuffix:function(){return"72"},getDeviceModel:function(){return h.UNKNOWN_VALUE},getPlatformVersion:function(){return h.UNKNOWN_VALUE},getPlatformName:function(){return"js"},getRuntimeName:function(){return h.UNKNOWN_VALUE},getRuntimeVersion:function(){return h.UNKNOWN_VALUE},getDisplayResolution:function(){return h.UNKNOWN_RESOLUTION},getApplicationResolution:function(){return h.UNKNOWN_RESOLUTION},getLanguage:function(){return h.UNKNOWN_VALUE},getPackageName:function(){return null},isConnectionAvailable:function(){return!0},isCompatible:function(){return!0},autoSelect:function(){},setPlatformAPI:function(){},isCrossPublisherIdChanged:function(){return!1},setTimeout:function(a,b){return setTimeout(a,b)},clearTimeout:function(a){return clearTimeout(a)},getDeviceArchitecture:function(){return h.UNKNOWN_VALUE},getConnectionType:function(){return h.UNKNOWN_VALUE},getDeviceJailBrokenFlag:function(){return h.UNKNOWN_VALUE},isConnSecure:function(){return"s"===document.location.href.charAt(4)},processMeasurementLabels:function(){}}}(),h={UNKNOWN_VALUE:"unknown",UNKNOWN_RESOLUTION:"0x0"};b.jsonObjectToStringDictionary=function(a){var b={};for(var c in a){var d=a[c];null===d||void 0===d?b[c]=d:b[c]=a[c]+""}return b},b.getKeys=function(a,b){var c,d=[];for(c in a)b&&!b.test(c)||!a.hasOwnProperty(c)||(d[d.length]=c);return d},b.fixEventTime=function(a){if(a.ns_ts)return parseInt(a.ns_ts);var b=+new Date;return a.ns_ts=b+"",b},b.isBrowser=function(){return"undefined"!=typeof window&&"undefined"!=typeof document},b.addNewPlaybackInterval=function(a,c,d,e){var f={};if(!(d>=c))return b.cloneObject(a);if(f.start=c,f.end=d,0==a.length)return a.push(f),b.cloneObject(a);var g;for(g=0;g<a.length;g++)if(f.start>=a[g].start&&f.end<=a[g].end)return b.cloneObject(a);var h,i=!1;for(h=0;h<a.length;h++)if(h+1===a.length&&f.start>=a[h].start||f.start>=a[h].start&&f.start<a[h+1].start){a.splice(h+1,0,f),i=!0;break}i||a.splice(0,0,f);var j=[a[0]];for(g=1;g<a.length;g++)j[j.length-1].end+e<a[g].start?j.push(a[g]):j[j.length-1].end<a[g].end&&(j[j.length-1].end=a[g].end);return b.cloneObject(j)};var i=function(){var a=["play","pause","pause-on-buffering","end","buffer","buffer-stop","keep-alive","hb","custom","load","start","skstart","adskip","cta","error","trans","drmfa","drmap","drmde","bitrt","playrt","volume","window","audio","video","subs","cdn"];return{PLAY:0,PAUSE:1,PAUSE_ON_BUFFERING:2,END:3,BUFFER:4,BUFFER_STOP:5,KEEPALIVE:6,HEARTBEAT:7,CUSTOM:8,LOAD:9,ENGAGE:10,SEEK_START:11,AD_SKIP:12,CTA:13,ERROR:14,TRANSFER:15,DRM_FAILED:16,DRM_APPROVED:17,DRM_DENIED:18,BIT_RATE:19,PLAYBACK_RATE:20,VOLUME:21,WINDOW_STATE:22,AUDIO:23,VIDEO:24,SUBS:25,CDN:26,toString:function(b){return a[b]}}}(),j=function(){return{IDLE:0,PLAYBACK_NOT_STARTED:1,PLAYING:2,PAUSED:3,BUFFERING_BEFORE_PLAYBACK:4,BUFFERING_DURING_PLAYBACK:5,BUFFERING_DURING_SEEKING:6,BUFFERING_DURING_PAUSE:7,SEEKING_BEFORE_PLAYBACK:8,SEEKING_DURING_PLAYBACK:9,SEEKING_DURING_BUFFERING:10,SEEKING_DURING_PAUSE:11,PAUSED_DURING_BUFFERING:12}}(),k=function(){var a=["c","s","r"];return{SINGLE_CLIP:0,SEGMENTED:1,REDUCED:2,toString:function(b){return a[b]}}}(),l={STREAMSENSE_VERSION:"5.2.0.160629",MODEL_VERSION:"5.3",DEFAULT_PLAYERNAME:"js_api",DEFAULT_HEARTBEAT_INTERVAL:[{playingtime:6e4,interval:1e4},{playingtime:null,interval:6e4}],DEFAULT_KEEP_ALIVE_INTERVAL:12e5,DEFAULT_PAUSED_ON_BUFFERING_INTERVAL:500,C1_VALUE:"19",C10_VALUE:"js",NS_AP_C12M_VALUE:"1",NS_NC_VALUE:"1",PAGE_NAME_LABEL:"name",RESTRICTED_URL_LENGTH_LIMIT:2048,URL_LENGTH_LIMIT:4096,THROTTLING_DELAY:500,INTERVAL_MERGE_TOLERANCE:500,STANDARD_METADATA_LABELS:["ns_st_ci","ns_st_pr","ns_st_sn","ns_st_en","ns_st_ep","ns_st_ty","ns_st_ct","ns_st_li","ns_st_ad","ns_st_bn","ns_st_tb","ns_st_an","ns_st_ta","ns_st_pu","c3","c4","c6"],LABELS_ORDER:["c1","c2","ca2","cb2","cc2","cd2","ns_site","ca_ns_site","cb_ns_site","cc_ns_site","cd_ns_site","ns_vsite","ca_ns_vsite","cb_ns_vsite","cc_ns_vsite","cd_ns_vsite","ns_alias","ca_ns_alias","cb_ns_alias","cc_ns_alias","cd_ns_alias","ns_ap_an","ca_ns_ap_an","cb_ns_ap_an","cc_ns_ap_an","cd_ns_ap_an","ns_ap_pn","ns_ap_pv","c12","ca12","cb12","cc12","cd12","ns_ak","ns_ap_hw","name","ns_ap_ni","ns_ap_ec","ns_ap_ev","ns_ap_device","ns_ap_id","ns_ap_csf","ns_ap_bi","ns_ap_pfm","ns_ap_pfv","ns_ap_ver","ca_ns_ap_ver","cb_ns_ap_ver","cc_ns_ap_ver","cd_ns_ap_ver","ns_ap_sv","ns_ap_cv","ns_ap_smv","ns_type","ca_ns_type","cb_ns_type","cc_ns_type","cd_ns_type","ns_radio","ns_nc","cs_partner","cs_xcid","ns_ap_ui","ca_ns_ap_ui","cb_ns_ap_ui","cc_ns_ap_ui","cd_ns_ap_ui","ns_ap_gs","ns_st_sv","ns_st_pv","ns_st_smv","ns_st_it","ns_st_id","ns_st_ec","ns_st_sp","ns_st_sc","ns_st_psq","ns_st_asq","ns_st_sq","ns_st_ppc","ns_st_apc","ns_st_spc","ns_st_cn","ns_st_ev","ns_st_po","ns_st_cl","ns_st_el","ns_st_sl","ns_st_pb","ns_st_hc","ns_st_mp","ca_ns_st_mp","cb_ns_st_mp","cc_ns_st_mp","cd_ns_st_mp","ns_st_mv","ca_ns_st_mv","cb_ns_st_mv","cc_ns_st_mv","cd_ns_st_mv","ns_st_pn","ns_st_tp","ns_st_ad","ns_st_li","ns_st_ci","ns_st_si","ns_st_pt","ns_st_dpt","ns_st_ipt","ns_st_et","ns_st_det","ns_st_upc","ns_st_dupc","ns_st_iupc","ns_st_upa","ns_st_dupa","ns_st_iupa","ns_st_lpc","ns_st_dlpc","ns_st_lpa","ns_st_dlpa","ns_st_pa","ns_ap_jb","ns_ap_et","ns_ap_res","ns_ap_sd","ns_ap_po","ns_ap_ot","ns_ap_c12m","cs_c12u","ca_cs_c12u","cb_cs_c12u","cc_cs_c12u","cd_cs_c12u","ns_ap_install","ns_ap_updated","ns_ap_lastrun","ns_ap_cs","ns_ap_runs","ns_ap_usage","ns_ap_fg","ns_ap_ft","ns_ap_dft","ns_ap_bt","ns_ap_dbt","ns_ap_dit","ns_ap_as","ns_ap_das","ns_ap_it","ns_ap_uc","ns_ap_aus","ns_ap_daus","ns_ap_us","ns_ap_dus","ns_ap_ut","ns_ap_oc","ns_ap_uxc","ns_ap_uxs","ns_ap_lang","ns_ap_ar","ns_ap_miss","ns_ts","ns_ap_cfg","ns_st_ca","ns_st_cp","ns_st_er","ca_ns_st_er","cb_ns_st_er","cc_ns_st_er","cd_ns_st_er","ns_st_pe","ns_st_ui","ca_ns_st_ui","cb_ns_st_ui","cc_ns_st_ui","cd_ns_st_ui","ns_st_bc","ns_st_dbc","ns_st_bt","ns_st_dbt","ns_st_bp","ns_st_lt","ns_st_skc","ns_st_dskc","ns_st_ska","ns_st_dska","ns_st_skd","ns_st_skt","ns_st_dskt","ns_st_pc","ns_st_dpc","ns_st_pp","ns_st_br","ns_st_pbr","ns_st_rt","ns_st_prt","ns_st_ub","ns_st_vo","ns_st_pvo","ns_st_ws","ns_st_pws","ns_st_ki","ns_st_rp","ns_st_bn","ns_st_tb","ns_st_an","ns_st_ta","ns_st_pl","ns_st_pr","ns_st_sn","ns_st_en","ns_st_ep","ns_st_sr","ns_st_ty","ns_st_ct","ns_st_cs","ns_st_ge","ns_st_st","ns_st_stc","ns_st_ce","ns_st_ia","ns_st_dt","ns_st_ddt","ns_st_tdt","ns_st_tm","ns_st_dtm","ns_st_ttm","ns_st_de","ns_st_pu","ns_st_ti","ns_st_cu","ns_st_fee","ns_st_ft","ns_st_at","ns_st_pat","ns_st_vt","ns_st_pvt","ns_st_tt","ns_st_ptt","ns_st_cdn","ns_st_pcdn","ns_st_ami","ns_st_amt","ns_st_ams","ns_ap_i1","ns_ap_i2","ns_ap_i3","ns_ap_i4","ns_ap_i5","ns_ap_i6","ns_ap_referrer","ns_clid","ns_campaign","ns_source","ns_mchannel","ns_linkname","ns_fee","gclid","utm_campaign","utm_source","utm_medium","utm_term","utm_content","ns_ecommerce","ns_ec_sv","ns_client_id","ns_order_id","ns_ec_cur","ns_orderline_id","ns_orderlines","ns_prod_id","ns_qty","ns_prod_price","ns_prod_grp","ns_brand","ns_shop","ns_category","category","ns_c","ns_search_term","ns_search_result","ns_m_exp","ns_m_chs","c3","ca3","cb3","cc3","cd3","c4","ca4","cb4","cc4","cd4","c5","ca5","cb5","cc5","cd5","c6","ca6","cb6","cc6","cd6","c10","c11","c13","c14","c15","c16","c7","c8","c9","ns_ap_er","ns_st_amc"]},m=function(){function a(){function a(){I={},I.ns_st_pt="0",I.ns_st_bt="0",I.ns_st_bc="0",I.ns_st_pc="0",I.ns_st_cl="0",I.ns_st_pn="1",I.ns_st_tp="1",I.ns_st_skc="0",I.ns_st_et="0",I.ns_st_cn="1",I.ns_st_sc="0",I.ns_st_ska="0",I.ns_st_skd="0",I.ns_st_skt="0",I.ns_st_upc="0",I.ns_st_lpc="0",I.ns_st_upa="0",I.ns_st_lpa="0",I.ns_st_ub="0",I.ns_st_br="0",f=!1,e=!1,d=h.UNKNOWN_VALUE,g=NaN,m=0,j=0,i=NaN,n=NaN,p=0,o=0,k=0,s=NaN,q=[],r=[],t=0,u=0,v=0,w=0,x=0,y=0,z=NaN,A=0,B=!1,C=NaN,F=!1,E=0,H=0,D=0,G=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0}function c(){var a,b,c=0;for(a=0;a<q.length;a++)c+=Math.abs(q[a].end-q[a].start);Q.setUniquePlaybackInterval(c);var d=0;for(a=0;a<q.length;a++)b=Math.abs(q[a].end-q[a].start),b>d&&(d=b);Q.setLongestPlaybackInterval(d);var e=0;for(a=0;a<r.length;a++)e+=Math.abs(r[a].end-r[a].start);Q.setAssetUniquePlaybackInterval(e);var f=0;for(a=0;a<r.length;a++)b=Math.abs(r[a].end-r[a].start),b>f&&(f=b);Q.setAssetLongestPlaybackInterval(f)}var d,e,f,g,i,j,k,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q=this,R=l.INTERVAL_MERGE_TOLERANCE;b.extend(this,{getHash:function(){return d},setHash:function(a){d=a},setPlaybackIntervalMergeTolerance:function(a){R=a},getPlaybackIntervalMergeTolerance:function(){return R},setLabels:function(a){null!=a&&b.extend(I,a)},getLabels:function(){return I},setLabel:function(a,b){var c={};c[a]=b,Q.setLabels(c)},getLabel:function(a){return I[a]},getClipNumber:function(){return parseInt(Q.getLabel("ns_st_cn"))},setClipNumber:function(a){Q.setLabel("ns_st_cn",a+"")},getPartNumber:function(){return parseInt(Q.getLabel("ns_st_pn"))},createLabels:function(a){var c=a||{};c.ns_st_dbt=Q.getBufferingTime()-A+"",A=Q.getBufferingTime(),c.ns_st_det=Q.getElapsedTime()-o+"",o=Q.getElapsedTime(),c.ns_st_dupc=Q.getUniquePlaybackInterval()-t+"",t=Q.getUniquePlaybackInterval(),parseInt(c.ns_st_dupc)<0&&(c.ns_st_dupc="0");var d;d=b.exists(c.ns_st_upc)?parseInt(c.ns_st_upc):Q.getUniquePlaybackInterval(),c.ns_st_iupc=d-u+"",u=d,parseInt(c.ns_st_iupc)<0&&(c.ns_st_iupc="0"),c.ns_st_dupa=Q.getAssetUniquePlaybackInterval()-v+"",v=Q.getAssetUniquePlaybackInterval(),parseInt(c.ns_st_dupa)<0&&(c.ns_st_dupa="0");var e;e=b.exists(c.ns_st_upa)?parseInt(c.ns_st_upa):Q.getAssetUniquePlaybackInterval(),c.ns_st_iupa=e-w+"",w=e,parseInt(c.ns_st_iupa)<0&&(c.ns_st_iupa="0"),c.ns_st_dlpc=Q.getLongestPlaybackInterval()-x+"",x=Q.getLongestPlaybackInterval(),parseInt(c.ns_st_dlpc)<0&&(c.ns_st_dlpc="0"),c.ns_st_dlpa=Q.getAssetLongestPlaybackInterval()-y+"",y=Q.getAssetLongestPlaybackInterval(),parseInt(c.ns_st_dlpa)<0&&(c.ns_st_dlpa="0");var g;return g=b.exists(c.ns_st_pt)?parseInt(c.ns_st_pt):Q.getPlaybackTime(),c.ns_st_ipt=g-k+"",k=g,c.ns_st_dpt=Q.getPlaybackTime()-j+"",j=Q.getPlaybackTime(),c.ns_st_dpc=Q.getPauses()-J+"",J=Q.getPauses(),c.ns_st_dskc=Q.getSeeks()-K+"",K=Q.getSeeks(),c.ns_st_dbc=Q.getBuffers()-L+"",L=Q.getBuffers(),c.ns_st_dskt=Q.getSeekingTime()-D+"",D=Q.getSeekingTime(),c.ns_st_dska=Q.getSeekingAmount()-G+"",G=Q.getSeekingAmount(),b.extend(c,Q.getLabels()),Q.setSeekingDirection(0),f&&(c.ns_st_spc=M+"",c.ns_st_apc=N+"",c.ns_st_sq=O+"",c.ns_st_asq=P+""),f||b.parseBoolean(c.ns_st_sc)||(c.ns_st_sc="1"),c},getVideoTrack:function(){return Q.getLabel("ns_st_vt")},setVideoTrack:function(a){Q.setLabel("ns_st_vt",a+"")},getAudioTrack:function(){return Q.getLabel("ns_st_at")},setAudioTrack:function(a){Q.setLabel("ns_st_at",a+"")},getSubtitleTrack:function(){return Q.getLabel("ns_st_tt")},setSubtitleTrack:function(a){Q.setLabel("ns_st_tt",a+"")},getCDN:function(){return Q.getLabel("ns_st_cdn")},setCDN:function(a){Q.setLabel("ns_st_cdn",a+"")},getClipPlaybackIntervals:function(){return q},setClipPlaybackIntervals:function(a){q=a},getAssetPlaybackIntervals:function(){return r},getUniquePlaybackInterval:function(){return parseInt(Q.getLabel("ns_st_upc"))},getAssetUniquePlaybackInterval:function(){return parseInt(Q.getLabel("ns_st_upa"))},setAssetUniquePlaybackInterval:function(a){Q.setLabel("ns_st_upa",a+"")},setUniquePlaybackInterval:function(a){Q.setLabel("ns_st_upc",a+"")},getLongestPlaybackInterval:function(){return parseInt(Q.getLabel("ns_st_lpc"))},setLongestPlaybackInterval:function(a){Q.setLabel("ns_st_lpc",a+"")},getAssetLongestPlaybackInterval:function(){return parseInt(Q.getLabel("ns_st_lpa"))},setAssetLongestPlaybackInterval:function(a){Q.setLabel("ns_st_lpa",a+"")},incrementPauses:function(){Q.setLabel("ns_st_pc",Q.getPauses()+1+"")},incrementSeeks:function(){Q.setLabel("ns_st_skc",Q.getSeeks()+1+"")},incrementPlayCounter:function(){O++},getPlayCounter:function(){return O},getBufferingTime:function(){return parseInt(Q.getLabel("ns_st_bt"))},setBufferingTime:function(a){Q.setLabel("ns_st_bt",a+"")},addBufferingTime:function(a){if(!isNaN(z)){var b=Q.getBufferingTime();b+=a-z,Q.setBufferingTime(b),z=NaN}},setPlaybackStartPosition:function(a){s=parseInt(a)},getPlaybackStartPosition:function(){return s},addInterval:function(a){isNaN(s)||isNaN(a)||(q=b.addNewPlaybackInterval(q,s,a,R),r=b.addNewPlaybackInterval(r,s,a,R),c(),s=NaN)},getElapsedTime:function(){return parseInt(Q.getLabel("ns_st_et"))},setElapsedTime:function(a){Q.setLabel("ns_st_et",a+"")},addElapsedTime:function(a){if(!isNaN(n)){var b=Q.getElapsedTime();b+=a-n,Q.setElapsedTime(b),n=NaN}},getElapsedTimestamp:function(){return n},setElapsedTimestamp:function(a){n=a},addPlaybackTime:function(a){if(!isNaN(g)){var b=Q.getPlaybackTime();b+=a-g,Q.setPlaybackTime(b),g=NaN}},getPlaybackTime:function(){return parseInt(Q.getLabel("ns_st_pt"))},getExpectedPlaybackPosition:function(a){return isNaN(g)||(m+=a-g),m},setPlaybackTimeOffset:function(a){m=a},getPlaybackTimeOffset:function(){return m},setPlaybackTime:function(a){Q.setLabel("ns_st_pt",a+"")},getPlaybackTimestamp:function(){return g},setPlaybackTimestamp:function(a){g=a},setPreviousPlaybackTime:function(a){j=a},setPreviousPlaybackTimestamp:function(a){i=a},getBufferingTimestamp:function(){return z},setBufferingTimestamp:function(a){z=a},getPauses:function(){return parseInt(Q.getLabel("ns_st_pc"))},setPauses:function(a){Q.setLabel("ns_st_pc",a+"")},getSeeks:function(){return parseInt(Q.getLabel("ns_st_skc"))},setSeeks:function(a){Q.setLabel("ns_st_skc",a+"")},setSeeking:function(a){B=a},isSeeking:function(){return B},setCollectingSeekingTime:function(a){F=a},isCollectingSeekingTime:function(){return F},setClipStarted:function(a){e=a},isClipStarted:function(){return e},setPlaybackStarted:function(a){f=a},isPlaybackStarted:function(){return f},setSeekingTimestamp:function(a){C=a},getSeekingTimestamp:function(){return C},addSeekingTime:function(a){if(!isNaN(C)){var b=Q.getSeekingTime();b+=a-C,Q.setSeekingTime(b),C=NaN}},getSeekingTime:function(){return parseInt(Q.getLabel("ns_st_skt"))},setSeekingTime:function(a){Q.setLabel("ns_st_skt",a+"")},setSeekingTimeBeforeEnd:function(a){H=a},getSeekingTimeBeforeEnd:function(){return H},setSeekStartPosition:function(a){E=a},getSeekStartPosition:function(){return E},setSeekingAmount:function(a){Q.setLabel("ns_st_ska",a+"")},getSeekingAmount:function(){return parseInt(Q.getLabel("ns_st_ska"))},addSeekingAmount:function(a){var b=Q.getSeekingAmount();b+=Math.abs(a-E),Q.setSeekingAmount(b);var c;E==a?c=0:E>a?c=-1:E<a&&(c=1),Q.setSeekingDirection(c),E=0},getSeekingDirection:function(){return parseInt(Q.getLabel("ns_st_skd"))},setSeekingDirection:function(a){Q.setLabel("ns_st_skd",a+"")},resetClipLifecycleLabels:function(){I.ns_st_pt="0",j=0,k=0,I.ns_st_bt="0",A=0,I.ns_st_bc="0",L=0,I.ns_st_pc="0",J=0,O=0,I.ns_st_upa="0",v=0,w=0,I.ns_st_et="0",o=0,I.ns_st_lpa="0",y=0,I.ns_st_skt="0",D=0,I.ns_st_ska="0",G=0,I.ns_st_skc="0",K=0},incrementSegmentPlaybackCounter:function(){M++},incrementClipLoadCounter:function(){Q.setLabel("ns_st_sc",Q.getClipLoadCounter()+1+"")},incrementAssetPlaybackCounter:function(){N++},setPreviousUniquePlaybackInterval:function(a){t=a},setPreviousEventIndependentUniquePlaybackInterval:function(a){u=a},setPreviousLongestPlaybackInterval:function(a){x=a},resetAssetPlaybackCounters:function(){r=[],Q.setAssetUniquePlaybackInterval(0),v=0,w=0,Q.setAssetLongestPlaybackInterval(0),y=0},setSegmentPlaybackCounter:function(a){M=a},setClipLoadCounter:function(a){Q.setLabel("ns_st_sc",a+"")},setAssetPlaybackCounter:function(a){N=a},setLowestPartNumberPlayed:function(a){p=a},getSegmentPlaybackCounter:function(){return M},getClipLoadCounter:function(){return parseInt(Q.getLabel("ns_st_sc"))},getAssetPlaybackCounter:function(){return N},getLowestPartNumberPlayed:function(){return p},getBuffers:function(){return parseInt(Q.getLabel("ns_st_bc"))},incrementBufferCount:function(){Q.setLabel("ns_st_bc",Q.getBuffers()+1+"")},getPreviousBufferingTime:function(){return A},setPlaySequenceCounter:function(a){P=a},incrementPlaySequenceCounter:function(){P++},getPlaySequenceCounter:function(){return P}}),a()}return a.resetClip=function(a,b,c){for(var d=a.getLabels(),e={},f=0;c&&f<c.length;++f)d.hasOwnProperty(c[f])&&(e[c[f]]=d[c[f]]);b.setLabels(e),b.setPlaybackIntervalMergeTolerance(a.getPlaybackIntervalMergeTolerance())},a}(),n=function(){function a(){function a(){c=new m,f={},f.ns_st_bp="0",f.ns_st_pa="0",f.ns_st_pp="0",f.ns_st_sp="1",f.ns_st_id=+new Date+"",d=NaN,e=NaN,h={},i=0,g=!1,j=!1,k=0,l=0}var c,d,e,f,g,h,i,j,k,l,n=this;b.extend(this,{resetClip:function(){var a=c;c=new m,m.resetClip(a,c)},hashExists:function(a){return null!=h[a]},storeHash:function(a){h[a]={}},removeHash:function(a){delete h[a]},storeClipPlaybackCounters:function(){for(var a in h)if(h.hasOwnProperty(a)&&h[a].clipNumber===c.getClipNumber()){b.extend(h[a],{segmentPlaybackCounter:c.getSegmentPlaybackCounter(),clipLoadCounter:c.getClipLoadCounter(),assetPlaybackCounter:c.getAssetPlaybackCounter(),lowestPartNumberPlayed:c.getLowestPartNumberPlayed(),seeking:c.isSeeking(),seekingTimeBeforeEnd:c.getSeekingTimeBeforeEnd(),seekingStartPosition:c.getSeekStartPosition(),clipPlaybackIntervals:c.getClipPlaybackIntervals(),uniquePlaybackInterval:c.getUniquePlaybackInterval(),longestPlaybackInterval:c.getLongestPlaybackInterval(),playSequenceCounter:c.getPlaySequenceCounter(),videoTrack:c.getVideoTrack(),audioTrack:c.getAudioTrack(),subtitleTrack:c.getSubtitleTrack(),cdn:c.getCDN()});break}},getStoredClipRegisters:function(a){return h[a]},getClipNumber:function(a){return h[a].clipNumber},getMaxClipNumber:function(){return i},storeClipNumber:function(a,b){h[a].clipNumber=b,b>i&&(i=b)},setLabels:function(a){null!=a&&b.extend(f,a)},getLabels:function(){return f},setLabel:function(a,b){var c={};c[a]=b,n.setLabels(c)},getLabel:function(a){return f[a]},getClip:function(){return c},createLabels:function(a){var d=a||{};return j||(d.ns_st_pb=null!=d.ns_st_pb?d.ns_st_pb:"1"),b.extend(d,n.getLabels()),c.isPlaybackStarted()&&(d.ns_st_ppc=k+"",d.ns_st_psq=l+""),d},incrementPlayCounter:function(){n.setLabel("ns_st_sp",parseInt(n.getLabel("ns_st_sp"))+1+"")},incrementPauses:function(){n.setLabel("ns_st_pp",n.getPauses()+1+"")},addPlaybackTime:function(a){if(!isNaN(e)){var b=n.getPlaybackTime();b+=a-e,n.setPlaybackTime(b),e=NaN}},addBufferingTime:function(a){if(!isNaN(d)){var b=n.getBufferingTime();b+=a-d,n.setBufferingTime(b),d=NaN}},getBufferingTime:function(){return parseInt(n.getLabel("ns_st_bp"))},setBufferingTime:function(a){n.setLabel("ns_st_bp",a+"")},getPlaybackTime:function(){return parseInt(n.getLabel("ns_st_pa"))},setBufferingTimestamp:function(a){d=a},getBufferingTimestamp:function(){return d},setPlaybackTime:function(a){n.setLabel("ns_st_pa",a+"")},setPlaybackTimestamp:function(a){e=a},getPlaybackTimestamp:function(){return e},getPauses:function(){return parseInt(n.getLabel("ns_st_pp"))},setPauses:function(a){n.setLabel("ns_st_pp",a+"")},isPlaylistStarted:function(){return g},setPlaylistStarted:function(a){g=a},getPlaybackCounter:function(){return k},incrementPlaybackCounter:function(){k++},setFirstEventSent:function(a){j=a},setPlaySequenceCounter:function(a){l=a},incrementPlaySequenceCounter:function(){l++}}),a()}return a.resetPlaylist=function(b,c,d){for(var e=b.getClip(),f=b.getLabels(),g={},h=0;d&&h<d.length;h++)f.hasOwnProperty(d[h])&&(g[d[h]]=f[d[h]]);c=new a,c.setLabels(g),m.resetClip(e,c.getClip(),d)},a}(),o=function(){return function(a){function c(){e=1}function d(c){f=b.extend({},c);var d=a.getSSECore().getPixelURL();if(a.getAppCore()){if(a.getSSECore().isProperlyInitialized()){var e=a.getSSECore().getExports().et;if("function"==typeof a.getAppCore().getMeasurementDispatcher){var g=a.getAppCore().getMeasurementDispatcher();g.send(e.HIDDEN,c,d)}else{var h=a.getSSECore().getExports().am,i=h.newApplicationMeasurement(a.getAppCore(),e.HIDDEN,c,d);a.getAppCore().getQueue().offer(i)}}}else d&&a.getSSECore().getPlatformAPI().httpGet(a.getSSECore().prepareUrl(d,c))}var e,f,g=this;b.extend(this,{newEvent:function(a){d(a.eventLabels),a.eventType!=i.HEARTBEAT&&g.incrementEventCounter()},getEventCounter:function(){return e},incrementEventCounter:function(){e++},setEventCounter:function(a){e=a},getMeasurementSnapshot:function(){return f}}),c()}}(),p=function(){return function(a){function c(){g=0,h=0}function d(){h++;var c={},d=b.fixEventTime(c);c.ns_st_po=a.getPlaylist().getClip().getPlaybackTimeOffset()+d-a.getPlaylist().getClip().getPlaybackTimestamp()+"",c.ns_st_pa=a.getPlaylist().getPlaybackTime()+d-a.getPlaylist().getPlaybackTimestamp()+"",c.ns_st_pt=a.getPlaylist().getClip().getPlaybackTime()+d-a.getPlaylist().getClip().getPlaybackTimestamp()+"",c.ns_st_dpt=d-a.getPlaylist().getClip().getPlaybackTimestamp()+"",a.getStateMachine().getCurrentState()==j.BUFFERING_DURING_PLAYBACK?(c.ns_st_bp=a.getPlaylist().getBufferingTime()+d-a.getPlaylist().getBufferingTimestamp()+"",c.ns_st_bt=a.getPlaylist().getClip().getBufferingTime()+d-a.getPlaylist().getClip().getBufferingTimestamp()+"",c.ns_st_dbt=d-a.getPlaylist().getClip().getBufferingTimestamp()+""):c.ns_st_dbt=a.getPlaylist().getClip().getBufferingTime()-a.getPlaylist().getClip().getPreviousBufferingTime()+"",c.ns_st_et=a.getPlaylist().getClip().getElapsedTime()+d-a.getPlaylist().getClip().getElapsedTimestamp()+"",c.ns_st_det=d-a.getPlaylist().getClip().getElapsedTimestamp()+"";var e=b.cloneObject(a.getPlaylist().getClip().getClipPlaybackIntervals()),f=b.cloneObject(a.getPlaylist().getClip().getAssetPlaybackIntervals());e=b.addNewPlaybackInterval(e,a.getPlaylist().getClip().getPlaybackStartPosition(),parseInt(c.ns_st_po),a.getPlaylist().getClip().getPlaybackIntervalMergeTolerance()),f=b.addNewPlaybackInterval(f,a.getPlaylist().getClip().getPlaybackStartPosition(),parseInt(c.ns_st_po),a.getPlaylist().getClip().getPlaybackIntervalMergeTolerance());var l,m,n=0;for(l=0;l<e.length;l++)n+=Math.abs(e[l].end-e[l].start);c.ns_st_upc=n+"",c.ns_st_dupc=n-a.getPlaylist().getClip().getUniquePlaybackInterval()+"";var o=0;for(l=0;l<e.length;l++)m=Math.abs(e[l].end-e[l].start),m>o&&(o=m);c.ns_st_lpc=o+"",c.ns_st_dlpc=o-a.getPlaylist().getClip().getLongestPlaybackInterval()+"";var p=0;for(l=0;l<f.length;l++)p+=Math.abs(f[l].end-f[l].start);c.ns_st_upa=p+"",c.ns_st_dupa=p-a.getPlaylist().getClip().getAssetUniquePlaybackInterval()+"";var q=0;for(l=0;l<f.length;l++)m=Math.abs(f[l].end-f[l].start),m>q&&(q=m);c.ns_st_lpa=q+"",c.ns_st_dlpa=q-a.getPlaylist().getClip().getAssetLongestPlaybackInterval()+"",c.ns_st_hc=a.getHeartbeat().getCount()+"";var r=a.getSSECore().createLabels(i.HEARTBEAT,c,d);a.getEventManager().newEvent(r),g=0,k.resume()}function e(){null!=f&&(a.getSSECore().getPlatformAPI().clearTimeout(f),f=null)}var f,g,h,k=this,m=l.DEFAULT_HEARTBEAT_INTERVAL;b.extend(this,{getCount:function(){return h},setIntervals:function(a){m=a},getInterval:function(a){var b=0;if(null!=m)for(var c=0;c<m.length;c++){var d=m[c],e=d.playingtime;if(!e||a<e){b=d.interval;break}}return b},getIntervals:function(){return m},resume:function(){e();var b=k.getInterval(a.getPlaylist().getClip().getPlaybackTime()+(+new Date-a.getPlaylist().getClip().getPlaybackTimestamp()));if(b>0){var c=g>0?g:b;f=a.getSSECore().getPlatformAPI().setTimeout(d,c)}g=0},pause:function(){e();var b=k.getInterval(a.getPlaylist().getClip().getPlaybackTime()+(+new Date-a.getPlaylist().getClip().getPlaybackTimestamp()));g=b-(a.getPlaylist().getClip().getPlaybackTime()+(+new Date-a.getPlaylist().getClip().getPlaybackTimestamp()))%b}}),c()}}(),q=function(){return function(a){function c(){}function d(){var c={},d=b.fixEventTime(c);c.ns_st_po=a.getPlaylist().getClip().getExpectedPlaybackPosition(d)+"",a.getPlaylist().addPlaybackTime(d),a.getPlaylist().setPlaybackTimestamp(d),a.getPlaylist().getClip().addPlaybackTime(d),a.getPlaylist().getClip().setPlaybackTimestamp(d),a.getStateMachine().getCurrentState()==j.BUFFERING_DURING_PLAYBACK&&(a.getPlaylist().addBufferingTime(d),
a.getPlaylist().setBufferingTimestamp(d),a.getPlaylist().getClip().addBufferingTime(d),a.getPlaylist().getClip().setBufferingTimestamp(d)),a.getPlaylist().getClip().addElapsedTime(d),a.getPlaylist().getClip().setElapsedTimestamp(d),a.getPlaylist().getClip().addInterval(parseInt(c.ns_st_po)),a.getPlaylist().getClip().setPlaybackStartPosition(parseInt(c.ns_st_po));var e=a.getSSECore().createLabels(i.KEEPALIVE,c,d);a.getEventManager().newEvent(e),g.resume()}function e(){null!=f&&(a.getSSECore().getPlatformAPI().clearTimeout(f),f=null)}var f,g=this,h=l.DEFAULT_KEEP_ALIVE_INTERVAL;b.extend(g,{resume:function(){e(),f=a.getSSECore().getPlatformAPI().setTimeout(d,h)},pause:function(){e()},setInterval:function(a){h=a},getInterval:function(){return h}}),c()}}(),r=function(){return function(a){function c(){f=j.IDLE,e=null,d=NaN}var d,e,f,g=this;b.extend(g,{eventTypeToState:function(a){if(f==j.IDLE){if(a==i.PLAY)return j.PLAYING;if(a==i.SEEK_START)return j.SEEKING_BEFORE_PLAYBACK;if(a==i.BUFFER)return j.BUFFERING_BEFORE_PLAYBACK}else if(f==j.PLAYBACK_NOT_STARTED){if(a==i.PLAY)return j.PLAYING;if(a==i.SEEK_START)return j.SEEKING_BEFORE_PLAYBACK;if(a==i.BUFFER)return j.BUFFERING_BEFORE_PLAYBACK;if(a==i.END||a==i.AD_SKIP)return j.IDLE}else if(f==j.PLAYING){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.BUFFER)return j.BUFFERING_DURING_PLAYBACK;if(a==i.PAUSE)return j.PAUSED;if(a==i.SEEK_START)return j.SEEKING_DURING_PLAYBACK}else if(f==j.PAUSED){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.BUFFER)return j.BUFFERING_DURING_PAUSE;if(a==i.PLAY)return j.PLAYING;if(a==i.SEEK_START)return j.SEEKING_DURING_PAUSE}else if(f==j.BUFFERING_BEFORE_PLAYBACK){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PAUSE||a==i.BUFFER_STOP)return j.PLAYBACK_NOT_STARTED;if(a==i.PLAY)return j.PLAYING;if(a==i.SEEK_START)return j.SEEKING_BEFORE_PLAYBACK}else if(f==j.BUFFERING_DURING_PLAYBACK){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY||a==i.BUFFER_STOP)return j.PLAYING;if(a==i.PAUSE_ON_BUFFERING)return j.PAUSED_DURING_BUFFERING;if(a==i.SEEK_START)return j.SEEKING_DURING_BUFFERING;if(a==i.PAUSE)return j.PAUSED}else if(f==j.BUFFERING_DURING_SEEKING){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY)return j.PLAYING;if(a==i.BUFFER_STOP)return j.SEEKING_DURING_PLAYBACK;if(a==i.PAUSE)return j.PAUSED}else if(f==j.BUFFERING_DURING_PAUSE){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY)return j.PLAYING;if(a==i.SEEK_START)return j.SEEKING_DURING_PAUSE;if(a==i.BUFFER_STOP||a==i.PAUSE)return j.PAUSED}else if(f==j.SEEKING_BEFORE_PLAYBACK){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PAUSE)return j.PLAYBACK_NOT_STARTED;if(a==i.PLAY)return j.PLAYING;if(a==i.BUFFER)return j.BUFFERING_BEFORE_PLAYBACK}else if(f==j.SEEKING_DURING_PLAYBACK){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY)return j.PLAYING;if(a==i.PAUSE)return j.PAUSED;if(a==i.BUFFER)return j.BUFFERING_DURING_SEEKING}else if(f==j.SEEKING_DURING_BUFFERING){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY)return j.PLAYING;if(a==i.PAUSE||a==i.BUFFER_STOP)return j.PAUSED}else if(f==j.SEEKING_DURING_PAUSE){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.PLAY)return j.PLAYING;if(a==i.PAUSE||a==i.BUFFER_STOP)return j.PAUSED;if(a==i.BUFFER)return j.BUFFERING_DURING_PAUSE}else if(f==j.PAUSED_DURING_BUFFERING){if(a==i.END||a==i.AD_SKIP)return j.IDLE;if(a==i.SEEK_START)return j.SEEKING_DURING_BUFFERING;if(a==i.PAUSE)return j.PAUSED;if(a==i.PLAY||a==i.BUFFER_STOP)return j.PLAYING}return null},getCurrentState:function(){return f},newEvent:function(a,b){var c=g.eventTypeToState(a);f!=c&&(e=f,f=c,d=b)},getPreviousState:function(){return e},getLastStateChangeTimestamp:function(){return d}}),c()}}(),s=function(){return function(a){var c=this;b.extend(c,{onSeekStartWhenPausedOrBufferingDuringPause:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().isSeeking()?a.getPlaylist().getClip().isCollectingSeekingTime()||(a.getPlaylist().getClip().setSeekingTimestamp(b),a.getPlaylist().getClip().setCollectingSeekingTime(!0)):a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().isSeeking()||(a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b))},onBufferWhenSeekingOrPlayBackNotStartedOrPaused:function(b,c){a.getPlaylist().setBufferingTimestamp(b),a.getPlaylist().getClip().setBufferingTimestamp(b)},onPlayWhenSeekingDuringBufferingOrSeekingDuringPause:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)},onBufferStopWhenBufferingDuringSeekingOrBufferingDuringPause:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b)},onPauseWhenSeekingDuringPlaybackOrSeekingDuringPause:function(b,c){a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))},onEndOrAdSkipWhenSeekingDuringBufferingOrSeekingDuringPause:function(c,d){a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onBufferStopWhenSeekingDuringBufferingOrSeekingDuringPause:function(b,c){a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))}})}}(),t=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getPlaylist().addBufferingTime(c),a.getPlaylist().getClip().addBufferingTime(c),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onBufferStop:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()?a.getPlaylist().getClip().isCollectingSeekingTime()||(a.getPlaylist().getClip().setSeekingTimestamp(b),a.getPlaylist().getClip().setCollectingSeekingTime(!0)):a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().isSeeking()||(a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b))},onPause:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().isPlaylistStarted()||(a.getPlaylist().setPlaylistStarted(!0),a.getPlaylist().incrementPlaybackCounter()),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().setClipStarted(!0),a.getPlaylist().getClip().setPlaybackStarted(!0),a.getPlaylist().getClip().incrementSegmentPlaybackCounter(),(0==a.getPlaylist().getClip().getLowestPartNumberPlayed()||parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)<=a.getPlaylist().getClip().getLowestPartNumberPlayed())&&(a.getPlaylist().getClip().setLowestPartNumberPlayed(parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)),a.getPlaylist().getClip().incrementAssetPlaybackCounter(),a.getPlaylist().getClip().setPlaySequenceCounter(0),a.getPlaylist().getClip().resetAssetPlaybackCounters()),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getSSECore().isLoadingTimeSent()||(c.ns_st_lt=a.getSSECore().getLoadTimeOffset()+b-a.getSSECore().getInitTimestamp()+"",a.getSSECore().setLoadingTimeSent(!0)),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),u=function(){return function(a){var c=this;b.extend(c,{onEndAndSkip:function(c,d){a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addBufferingTime(c),a.getPlaylist().getClip().addBufferingTime(c),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onPause:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b)},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),v=function(){return function(a){var c=this;b.extend(c,{onPauseOnBuffering:function(b,c){var d=parseInt(c.ns_st_po);a.getSSECore().stopPausedOnBufferingTimer(),a.getHeartbeat().pause(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addPlaybackTime(b),a.getPlaylist().getClip().addPlaybackTime(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().addInterval(d),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses();var e=a.getSSECore().createLabels(i.PAUSE,c,b);a.getEventManager().newEvent(e),a.getPlaylist().setBufferingTimestamp(b),a.getPlaylist().getClip().setBufferingTimestamp(b),a.getPlaylist().getClip().setPlaybackTimeOffset(d)},onBufferStop:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b)},onEndOrAdSkip:function(c,d){var e=parseInt(d.ns_st_po);a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getSSECore().stopPausedOnBufferingTimer(),a.getPlaylist().addBufferingTime(c),a.getPlaylist().getClip().addBufferingTime(c),a.getPlaylist().getClip().addPlaybackTime(c),a.getPlaylist().getClip().addElapsedTime(c),a.getPlaylist().getClip().addInterval(e);var f=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(f),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getHeartbeat().pause(),a.getSSECore().resetKeepAlive(),a.getSSECore().stopPausedOnBufferingTimer(),a.getPlaylist().addPlaybackTime(b),a.getPlaylist().getClip().addPlaybackTime(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().addInterval(d),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses();var e=a.getSSECore().createLabels(i.PAUSE,c,b);a.getEventManager().newEvent(e)},onPause:function(b,c){var d=parseInt(c.ns_st_po);a.getSSECore().stopPausedOnBufferingTimer(),a.getPlaylist().addPlaybackTime(b),a.getPlaylist().getClip().addPlaybackTime(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().addInterval(d),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses();var e=a.getSSECore().createLabels(i.PAUSE,c,b);a.getEventManager().newEvent(e)},onPlay:function(b,c){a.getSSECore().stopPausedOnBufferingTimer(),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().addBufferingTime(b)}})}}(),w=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getSSECore().stopPausedOnBufferingTimer(),a.getPlaylist().addBufferingTime(c),a.getPlaylist().getClip().addBufferingTime(c),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onPause:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses(),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().addBufferingTime(b),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),x=function(){return function(a){var c=this;b.extend(c,{onBuffer:function(b,c){a.getPlaylist().getClip().setSeekingTime(a.getPlaylist().getClip().getSeekingTimeBeforeEnd()),a.getPlaylist().setBufferingTimestamp(b),a.getPlaylist().getClip().setBufferingTimestamp(b)},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().setSeekingTime(a.getPlaylist().getClip().getSeekingTimeBeforeEnd()),a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b)},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().setSeekingTime(a.getPlaylist().getClip().getSeekingTimeBeforeEnd()),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().isPlaylistStarted()||(a.getPlaylist().setPlaylistStarted(!0),a.getPlaylist().incrementPlaybackCounter()),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().setClipStarted(!0),a.getPlaylist().getClip().setPlaybackStarted(!0),a.getPlaylist().getClip().incrementSegmentPlaybackCounter(),(0==a.getPlaylist().getClip().getLowestPartNumberPlayed()||parseInt(a.getPlaylist().getClip().getLabel("ns_st_pn"))<=a.getPlaylist().getClip().getLowestPartNumberPlayed())&&(a.getPlaylist().getClip().setLowestPartNumberPlayed(parseInt(a.getPlaylist().getClip().getLabel("ns_st_pn"))),a.getPlaylist().getClip().incrementAssetPlaybackCounter(),a.getPlaylist().getClip().setPlaySequenceCounter(0),a.getPlaylist().getClip().resetAssetPlaybackCounters()),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getSSECore().isLoadingTimeSent()||(c.ns_st_lt=a.getSSECore().getLoadTimeOffset()+b-a.getSSECore().getInitTimestamp()+"",a.getSSECore().setLoadingTimeSent(!0)),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),y=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),z=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addBufferingTime(c),a.getPlaylist().getClip().addBufferingTime(c),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onBufferStop:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().isSeeking()?a.getPlaylist().getClip().isCollectingSeekingTime()||(a.getPlaylist().getClip().setSeekingTimestamp(b),a.getPlaylist().getClip().setCollectingSeekingTime(!0)):a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().isSeeking()||(a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b))},onPause:function(b,c){a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses()},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().addBufferingTime(b),a.getPlaylist().getClip().addBufferingTime(b),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),A=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().isSeeking()?a.getPlaylist().getClip().setSeekingTimestamp(b):a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().isSeeking()||(a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b))},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().isPlaylistStarted()||(a.getPlaylist().setPlaylistStarted(!0),a.getPlaylist().incrementPlaybackCounter()),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().setClipStarted(!0),a.getPlaylist().getClip().setPlaybackStarted(!0),a.getPlaylist().getClip().incrementSegmentPlaybackCounter(),(0==a.getPlaylist().getClip().getLowestPartNumberPlayed()||parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)<=a.getPlaylist().getClip().getLowestPartNumberPlayed())&&(a.getPlaylist().getClip().setLowestPartNumberPlayed(parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)),a.getPlaylist().getClip().incrementAssetPlaybackCounter(),a.getPlaylist().getClip().setPlaySequenceCounter(0),a.getPlaylist().getClip().resetAssetPlaybackCounters()),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getSSECore().isLoadingTimeSent()||(c.ns_st_lt=a.getSSECore().getLoadTimeOffset()+b-a.getSSECore().getInitTimestamp()+"",a.getSSECore().setLoadingTimeSent(!0)),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),B=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){var e=parseInt(d.ns_st_po);a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addPlaybackTime(c),a.getPlaylist().getClip().addPlaybackTime(c),a.getPlaylist().getClip().addElapsedTime(c),a.getPlaylist().getClip().addInterval(e);var f=a.getSSECore().createLabels(i.END,d,c);a.getEventManager().newEvent(f),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onBuffer:function(b,c){a.getSSECore().isPauseOnBufferingEnabled()&&a.getSSECore().startPausedOnBufferingTimer(b,c),a.getPlaylist().getClip().incrementBufferCount(),a.getPlaylist().setBufferingTimestamp(b),a.getPlaylist().getClip().setBufferingTimestamp(b)},onSeekStart:function(b,c){var d=parseInt(c.ns_st_po);a.getHeartbeat().pause(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addPlaybackTime(b),a.getPlaylist().getClip().addPlaybackTime(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().addInterval(d),a.getPlaylist().getClip().incrementSeeks(),a.getPlaylist().getClip().setSeeking(!0),a.getPlaylist().getClip().setCollectingSeekingTime(!0),a.getPlaylist().getClip().setSeekStartPosition(d),a.getPlaylist().getClip().setSeekingTimestamp(b),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses();var e=a.getSSECore().createLabels(i.PAUSE,c,b);a.getEventManager().newEvent(e)},onPause:function(b,c){var d=parseInt(c.ns_st_po);a.getHeartbeat().pause(),a.getSSECore().resetKeepAlive(),a.getPlaylist().addPlaybackTime(b),a.getPlaylist().getClip().addPlaybackTime(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().addInterval(d),a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses();var e=a.getSSECore().createLabels(i.PAUSE,c,b);a.getEventManager().newEvent(e)}})}}(),C=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onPause:function(b,c){a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().isPlaylistStarted()||(a.getPlaylist().setPlaylistStarted(!0),a.getPlaylist().incrementPlaybackCounter()),a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().setClipStarted(!0),a.getPlaylist().getClip().setPlaybackStarted(!0),a.getPlaylist().getClip().incrementSegmentPlaybackCounter(),(0==a.getPlaylist().getClip().getLowestPartNumberPlayed()||parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)<=a.getPlaylist().getClip().getLowestPartNumberPlayed())&&(a.getPlaylist().getClip().setLowestPartNumberPlayed(parseInt(a.getPlaylist().getClip().getLabels().ns_st_pn)),a.getPlaylist().getClip().incrementAssetPlaybackCounter(),a.getPlaylist().getClip().setPlaySequenceCounter(0),a.getPlaylist().getClip().resetAssetPlaybackCounters()),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getSSECore().isLoadingTimeSent()||(c.ns_st_lt=a.getSSECore().getLoadTimeOffset()+b-a.getSSECore().getInitTimestamp()+"",a.getSSECore().setLoadingTimeSent(!0)),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),D=function(){return function(a){var c=this;b.extend(c,{onPause:function(b,c){a.getPlaylist().incrementPauses(),a.getPlaylist().getClip().incrementPauses(),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1))}})}}(),E=function(){return function(a){var c=this;b.extend(c,{onEndOrAdSkip:function(c,d){parseInt(d.ns_st_po);a.getSSECore().resetHeartbeat(),a.getSSECore().resetKeepAlive(),a.getPlaylist().getClip().addElapsedTime(c);var e=a.getSSECore().createLabels(i.END,d,c);
a.getEventManager().newEvent(e),a.getPlaylist().getClip().isSeeking()&&a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().setSeekingTimeBeforeEnd(c-a.getPlaylist().getClip().getSeekingTimestamp()),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().storeClipPlaybackCounters(),a.getPlaylist().getClip().resetClipLifecycleLabels(),a.getPlaylist().getClip().setPlaybackStarted(!1),d.hasOwnProperty("ns_st_pe")&&b.parseBoolean(d.ns_st_pe,!1)&&a.getSSECore().resetPlaylist()},onPlay:function(b,c){var d=parseInt(c.ns_st_po);a.getPlaylist().incrementPlaySequenceCounter(),a.getPlaylist().getClip().incrementPlaySequenceCounter(),a.getPlaylist().getClip().isSeeking()&&(a.getPlaylist().getClip().isCollectingSeekingTime()&&(a.getPlaylist().getClip().addSeekingTime(b),a.getPlaylist().getClip().setCollectingSeekingTime(!1)),a.getPlaylist().getClip().addSeekingAmount(d),a.getPlaylist().getClip().setSeeking(!1)),a.getPlaylist().getClip().incrementPlayCounter(),a.getPlaylist().setPlaybackTimestamp(b),a.getPlaylist().getClip().setPlaybackTimestamp(b),a.getPlaylist().getClip().addElapsedTime(b),a.getPlaylist().getClip().setElapsedTimestamp(b),a.getPlaylist().getClip().setPlaybackStartPosition(d),a.getSSECore().isLoadingTimeSent()||(c.ns_st_lt=a.getSSECore().getLoadTimeOffset()+b-a.getSSECore().getInitTimestamp()+"",a.getSSECore().setLoadingTimeSent(!0)),a.getHeartbeat().resume(),a.getKeepAlive().resume();var e=a.getSSECore().createLabels(i.PLAY,c,b);a.getEventManager().newEvent(e)}})}}(),F=function(){return function(){function a(){m=new G(ba),b.getNamespace().comScore?(ca=b.getNamespace().comScore.exports,m.setAppCore(ca.c())):m.setAppCore(null),m.setKeepAlive(new q(m)),m.setHeartbeat(new p(m)),m.setEventManager(new o(m)),m.setStateMachine(new r),m.setPlaylist(new n),_={},F=new x(m),H=new y(m),I=new A(m),J=new B(m),K=new t(m),L=new v(m),M=new w(m),N=new u(m),O=new z(m),P=new C(m),Q=new D(m),R=new E(m),S=new s(m),T=!1,U=0,V=+new Date,W=!0,Y=!1,$=[]}function c(a){var b=m.getStateMachine().getCurrentState();if(b==j.IDLE||b==j.PLAYBACK_NOT_STARTED||b==j.BUFFERING_BEFORE_PLAYBACK||b==j.SEEKING_BEFORE_PLAYBACK){if(a==i.PLAY)return!0}else if(b==j.PLAYING){if(a==i.END||a==i.AD_SKIP||a==i.SEEK_START||a==i.PAUSE)return!0}else if(b==j.PAUSED||b==j.BUFFERING_DURING_PAUSE||b==j.SEEKING_DURING_PLAYBACK||b==j.SEEKING_DURING_BUFFERING||b==j.SEEKING_DURING_PAUSE){if(a==i.END||a==i.AD_SKIP||a==i.PLAY)return!0}else if(b==j.BUFFERING_DURING_PLAYBACK){if(a==i.PAUSE_ON_BUFFERING||a==i.END||a==i.AD_SKIP||a==i.SEEK_START||a==i.PAUSE||a==i.PLAY)return!0}else if(b==j.BUFFERING_DURING_SEEKING){if(a==i.END||a==i.AD_SKIP||a==i.PAUSE||a==i.PLAY)return!0}else if(b==j.PAUSED_DURING_BUFFERING&&(a==i.END||a==i.AD_SKIP||a==i.BUFFER_STOP||a==i.PLAY))return!0;return!1}function d(a,b,d){var e=m.getStateMachine().getCurrentState();a==i.AD_SKIP&&!d.hasOwnProperty("ns_st_ui")&&c(a)?d.ns_st_ui="skip":a==i.SEEK_START&&!d.hasOwnProperty("ns_st_ui")&&c(a)&&(d.ns_st_ui="seek"),e==j.IDLE?a==i.BUFFER?F.onBuffer(b,d):a==i.SEEK_START?F.onSeekStart(b,d):a==i.PLAY&&F.onPlay(b,d):e==j.PLAYBACK_NOT_STARTED?a==i.END||a==i.AD_SKIP?I.onEndOrAdSkip(b,d):a==i.SEEK_START?I.onSeekStart(b,d):a==i.PLAY?I.onPlay(b,d):a==i.BUFFER&&S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):e==j.PLAYING?a==i.END||a==i.AD_SKIP?J.onEndOrAdSkip(b,d):a==i.BUFFER?J.onBuffer(b,d):a==i.SEEK_START?J.onSeekStart(b,d):a==i.PAUSE&&J.onPause(b,d):e==j.PAUSED?a==i.END||a==i.AD_SKIP?H.onEndOrAdSkip(b,d):a==i.PLAY?H.onPlay(b,d):a==i.BUFFER?S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):a==i.SEEK_START&&S.onSeekStartWhenPausedOrBufferingDuringPause(b,d):e==j.BUFFERING_BEFORE_PLAYBACK?a==i.END||a==i.AD_SKIP?K.onEndOrAdSkip(b,d):a==i.BUFFER_STOP?K.onBufferStop(b,d):a==i.SEEK_START?K.onSeekStart(b,d):a==i.PAUSE?K.onPause(b,d):a==i.PLAY&&K.onPlay(b,d):e==j.BUFFERING_DURING_PLAYBACK?a==i.PAUSE_ON_BUFFERING?L.onPauseOnBuffering(b,d):a==i.BUFFER_STOP?L.onBufferStop(b,d):a==i.END||a==i.AD_SKIP?L.onEndOrAdSkip(b,d):a==i.SEEK_START?L.onSeekStart(b,d):a==i.PAUSE?L.onPause(b,d):a==i.PLAY&&L.onPlay(b,d):e==j.BUFFERING_DURING_SEEKING?a==i.END||a==i.AD_SKIP?M.onEndOrAdSkip(b,d):a==i.PAUSE?M.onPause(b,d):a==i.PLAY?M.onPlay(b,d):a==i.BUFFER_STOP&&S.onBufferStopWhenBufferingDuringSeekingOrBufferingDuringPause(b,d):e==j.BUFFERING_DURING_PAUSE?a==i.END||a==i.AD_SKIP?N.onEndAndSkip(b,d):a==i.PAUSE?N.onPause(b,d):a==i.PLAY?N.onPlay(b,d):a==i.SEEK_START?S.onSeekStartWhenPausedOrBufferingDuringPause(b,d):a==i.BUFFER_STOP&&S.onBufferStopWhenBufferingDuringSeekingOrBufferingDuringPause(b,d):e==j.SEEKING_BEFORE_PLAYBACK?a==i.END||a==i.AD_SKIP?P.onEndOrAdSkip(b,d):a==i.PAUSE?P.onPause(b,d):a==i.PLAY?P.onPlay(b,d):a==i.BUFFER&&S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):e==j.SEEKING_DURING_PLAYBACK?a==i.END||a==i.AD_SKIP?R.onEndOrAdSkip(b,d):a==i.PLAY?R.onPlay(b,d):a==i.BUFFER?S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):a==i.PAUSE&&S.onPauseWhenSeekingDuringPlaybackOrSeekingDuringPause(b,d):e==j.SEEKING_DURING_BUFFERING?a==i.PAUSE?Q.onPause(b,d):a==i.BUFFER?S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):a==i.PLAY?S.onPlayWhenSeekingDuringBufferingOrSeekingDuringPause(b,d):a==i.END||a==i.AD_SKIP?S.onEndOrAdSkipWhenSeekingDuringBufferingOrSeekingDuringPause(b,d):a==i.BUFFER_STOP&&S.onBufferStopWhenSeekingDuringBufferingOrSeekingDuringPause(b,d):e==j.PAUSED_DURING_BUFFERING?a==i.END||a==i.AD_SKIP?O.onEndOrAdSkip(b,d):a==i.BUFFER_STOP?O.onBufferStop(b,d):a==i.SEEK_START?O.onSeekStart(b,d):a==i.PAUSE?O.onPause(b,d):a==i.PLAY&&O.onPlay(b,d):e==j.SEEKING_DURING_PAUSE&&(a==i.BUFFER?S.onBufferWhenSeekingOrPlayBackNotStartedOrPaused(b,d):a==i.PLAY?S.onPlayWhenSeekingDuringBufferingOrSeekingDuringPause(b,d):a==i.PAUSE?S.onPauseWhenSeekingDuringPlaybackOrSeekingDuringPause(b,d):a==i.END||a==i.AD_SKIP?S.onEndOrAdSkipWhenSeekingDuringBufferingOrSeekingDuringPause(b,d):a==i.BUFFER_STOP&&S.onBufferStopWhenSeekingDuringBufferingOrSeekingDuringPause(b,d)),c(a)&&m.getPlaylist().setFirstEventSent(!0)}function e(a,c){var d=a||"",e="undefined",f=fa.comScore||fa.sitestat||function(a){var c,d,f,g,h,i="comScore=",j=ga.cookie,k="",m="indexOf",n="substring",o="length",p=b.browserAcceptsLargeURLs()?l.URL_LENGTH_LIMIT:l.RESTRICTED_URL_LENGTH_LIMIT,q="&ns_",r="&",s=fa.encodeURIComponent||escape;if(j[m](i)+1)for(g=0,f=j.split(";"),h=f[o];g<h;g++)d=f[g][m](i),d+1&&(k=r+unescape(f[g][n](d+i[o])));a+=q+"_t="+ +new Date+q+"c="+(ga.characterSet||ga.defaultCharset||"")+k,a.length>p&&a.indexOf(r)>0&&(c=a.substr(0,p-8).lastIndexOf(r),a=(a.substring(0,c)+q+"cut="+s(a.substring(c+1))).substr(0,p)),ba.getPlatformAPI().httpGet(a),typeof ns_p===e&&(ns_p={src:a}),ns_p.lastMeasurement=a};if(typeof c!==e){var g=[],h=fa.encodeURIComponent||escape;for(var i in c)c.hasOwnProperty(i)&&g.push(h(i)+"="+h(c[i]));/[\?\&]$/.test(d)||(d+="&"),d+=g.join("&")}return f(d)}function f(a,c){for(var d,e=fa.encodeURIComponent||escape,f=[],g=l.LABELS_ORDER,h=a.split("?"),i=h[0],j=h[1],k=j.split("&"),m=0,n=k.length;m<n;m++){var o=k[m].split("="),p=unescape(o[0]),q=unescape(o[1]);p&&(c[p]=q)}for(var r={},s=0,t=g.length;s<t;s++){var u=g[s];if(c.hasOwnProperty(u)){var v=c[u];"undefined"!=typeof v&&null!=v&&(r[u]=!0,f.push(e(u)+"="+e(c[u])))}}for(var w in c)if(c.hasOwnProperty(w)){if(r[w])continue;var x=c[w];"undefined"!=typeof x&&null!=x&&f.push(e(w)+"="+e(c[w]))}d=i+"?"+f.join("&"),d=d+(d.indexOf("&c8=")<0?"&c8="+e(ga.title):"")+(d.indexOf("&c7=")<0?"&c7="+e(ga.URL):"")+(d.indexOf("&c9=")<0?"&c9="+e(ga.referrer):"");var y=b.browserAcceptsLargeURLs()?l.URL_LENGTH_LIMIT:l.RESTRICTED_URL_LENGTH_LIMIT;if(d.length>y&&d.indexOf("&")>0){var z=d.substr(0,y-8).lastIndexOf("&");d=(d.substring(0,z)+"&ns_cut="+e(d.substring(z+1))).substr(0,y)}return d}var m,F,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba=this,ca={},da=l.DEFAULT_PAUSED_ON_BUFFERING_INTERVAL,ea=l.THROTTLING_DELAY;b.extend(ba,{createLabels:function(a,c,d){var e={};if("undefined"!=typeof document){var f=document;e.c7=f.URL,e.c8=f.title,e.c9=f.referrer}return null!=c&&b.extend(e,c),e.ns_ts=null!=e.ns_ts?e.ns_ts:+new Date+"",e.ns_st_ev=null!=e.ns_st_ev?e.ns_st_ev:i.toString(a),e.ns_st_mp=null!=e.ns_st_mp?e.ns_st_mp:l.DEFAULT_PLAYERNAME,e.ns_st_mv=null!=e.ns_st_mv?e.ns_st_mv:l.STREAMSENSE_VERSION,e.ns_st_ub=null!=e.ns_st_ub?e.ns_st_ub:"0",e.ns_st_br=null!=e.ns_st_br?e.ns_st_br:"0",e.ns_st_pn=null!=e.ns_st_pn?e.ns_st_pn:"1",e.ns_st_tp=null!=e.ns_st_tp?e.ns_st_tp:"1",e.ns_st_it=null!=e.ns_st_it?e.ns_st_it:k.toString(k.SINGLE_CLIP),e.ns_st_sv=null!=e.ns_st_sv?e.ns_st_sv:l.STREAMSENSE_VERSION,e.ns_st_smv=null!=e.ns_st_smv?e.ns_st_smv:l.MODEL_VERSION,e.ns_type=null!=e.ns_type?e.ns_type:"hidden",e.ns_st_ec=null!=e.ns_st_ec?e.ns_st_ec:m.getEventManager().getEventCounter()+"",e.ns_st_po=null!=e.ns_st_po?e.ns_st_po:m.getPlaylist().getPlaylist().getClip().getExpectedPlaybackPosition(d)+"",e.ns_st_ki=null!=e.ns_st_ki?e.ns_st_ki:m.getKeepAlive().getInterval()+"",m.getPlaylist().createLabels(e),m.getPlaylist().getClip().createLabels(e),b.extend(e,ba.getLabels()),b.extend(e,c),{eventType:a,eventLabels:e}},newEvent:function(a,b,c,e){ba.stopDelayedTransitionTimer();var f=m.getStateMachine().getCurrentState(),g=m.getStateMachine().eventTypeToState(a);if(null!=g&&g!=f)if(!ba.isThrottlingEnabled()||f!=j.PLAYING&&f!=j.PAUSED||g!=j.PLAYING&&g!=j.PAUSED||e){c.ns_st_po||(m.getStateMachine().getCurrentState()==j.PLAYING&&a==i.BUFFER||m.getStateMachine().getCurrentState()==j.BUFFERING_DURING_PLAYBACK&&a==i.BUFFER_STOP?c.ns_st_po=m.getPlaylist().getClip().getPlaybackTimeOffset()+(b-m.getPlaylist().getClip().getPlaybackTimestamp())+"":c.ns_st_po=m.getPlaylist().getClip().getExpectedPlaybackPosition(b)+""),d(a,b,c);var h=0;isNaN(m.getStateMachine().getLastStateChangeTimestamp())||(h=b-m.getStateMachine().getLastStateChangeTimestamp()),m.getStateMachine().newEvent(a,b);for(var k=0,l=$.length;k<l;k++)$[k](f,g,c,h)}else Z=m.getPlatformAPI().setTimeout(function(a,c,d){return function(){ba.newEvent(a,b,d,!0)}}(a,g,c),ea)},newPseudoEvent:function(a,b,c){if(a!=i.LOAD&&a!=i.ENGAGE||m.getStateMachine().getCurrentState()==j.IDLE){a!=i.ERROR||c.ns_st_er||(c.ns_st_er=h.UNKNOWN_VALUE),m.getStateMachine().getCurrentState()!=j.IDLE&&m.getStateMachine().getCurrentState()!=j.PLAYBACK_NOT_STARTED&&m.getStateMachine().getCurrentState()!=j.SEEKING_BEFORE_PLAYBACK&&m.getStateMachine().getCurrentState()!=j.BUFFERING_BEFORE_PLAYBACK&&(m.getPlaylist().getClip().addElapsedTime(b),m.getPlaylist().getClip().setElapsedTimestamp(b));var d,e,f,g=!0,k=!1;switch(a){case i.BIT_RATE:d="ns_st_br",e="ns_st_pbr",k=!0;break;case i.PLAYBACK_RATE:d="ns_st_rt",e="ns_st_prt",k=!0;break;case i.VOLUME:d="ns_st_vo",e="ns_st_pvo",k=!0;break;case i.WINDOW_STATE:d="ns_st_ws",e="ns_st_pws",k=!0;break;case i.AUDIO:d="ns_st_at",e="ns_st_pat",k=!1;break;case i.VIDEO:d="ns_st_vt",e="ns_st_pvt",k=!1;break;case i.SUBS:d="ns_st_tt",e="ns_st_ptt",k=!1;break;case i.CDN:d="ns_st_cdn",e="ns_st_pcdn",k=!1;break;default:g=!1}if(g&&c.hasOwnProperty(d)&&(k?(ba.getLabels().hasOwnProperty(d)&&(f=ba.getLabels()[d],c[e]=f),ba.setLabel(d,c[d])):(m.getPlaylist().getClip().getLabels().hasOwnProperty(d)&&(f=m.getPlaylist().getClip().getLabels()[d],c[e]=f),m.getPlaylist().getClip().setLabel(d,c[d]))),!g||m.getStateMachine().getCurrentState()==j.PLAYING||m.getStateMachine().getCurrentState()==j.BUFFERING_DURING_PLAYBACK){c.ns_st_po||(c.ns_st_po=m.getPlaylist().getClip().getExpectedPlaybackPosition(b)+""),m.getStateMachine().getCurrentState()!=j.PLAYING&&m.getStateMachine().getCurrentState()!=j.BUFFERING_DURING_PLAYBACK||(m.getPlaylist().addPlaybackTime(b),m.getPlaylist().setPlaybackTimestamp(b),m.getPlaylist().getClip().addPlaybackTime(b),m.getPlaylist().getClip().setPlaybackTimestamp(b),m.getPlaylist().getClip().addInterval(parseInt(c.ns_st_po)),m.getPlaylist().getClip().setPlaybackStartPosition(parseInt(c.ns_st_po))),m.getStateMachine().getCurrentState()!=j.BUFFERING_BEFORE_PLAYBACK&&m.getStateMachine().getCurrentState()!=j.BUFFERING_DURING_PAUSE&&m.getStateMachine().getCurrentState()!=j.BUFFERING_DURING_PLAYBACK&&m.getStateMachine().getCurrentState()!=j.BUFFERING_DURING_SEEKING||(m.getPlaylist().addBufferingTime(b),m.getPlaylist().setBufferingTimestamp(b),m.getPlaylist().getClip().addBufferingTime(b),m.getPlaylist().getClip().setBufferingTimestamp(b));var l=ba.createLabels(a,c,b);m.getEventManager().newEvent(l)}}},getState:function(){return m.getStateMachine().getCurrentState()},addListener:function(a){$.push(a)},removeListener:function(a){$.splice(b.indexOf(a,$),1)},getLabel:function(a){return _[a]},getLabels:function(){return _},setLabel:function(a,b){null==b?delete _[a]:_[a]=b},setLabels:function(a){for(var b in a)a.hasOwnProperty(b)&&ba.setLabel(b,a[b])},getPlatformAPI:function(){return m.getAppCore()?m.getAppCore().getPlatformAPI():g},getExports:function(){return ca},isProperlyInitialized:function(){var a=m.getAppCore().getAppContext(),b=m.getAppCore().getSalt(),c=m.getAppCore().getPixelURL();return a&&c&&b},setImplementationType:function(a){m.getStateMachine().getCurrentState()!=j.IDLE||a!=k.SINGLE_CLIP&&a!=k.SEGMENTED&&a!=k.REDUCED||m.getPlaylist().setLabel("ns_st_it",k.toString(a))},setThrottlingDelay:function(a){ea=a},getThrottlingDelay:function(){return ea},isThrottlingEnabled:function(){return Y},setThrottlingEnabled:function(a){Y=a},isLoadingTimeSent:function(){return T},setLoadingTimeSent:function(a){T=a},getLoadTimeOffset:function(){return U},setLoadTimeOffset:function(a){U=a},getInitTimestamp:function(){return V},setPauseOnBufferingInterval:function(a){da=a},getPauseOnBufferingInterval:function(){return da},isPauseOnBufferingEnabled:function(){return W},setPauseOnBufferingEnabled:function(a){W=a},startPausedOnBufferingTimer:function(a,c){ba.stopPausedOnBufferingTimer(),X=ba.getPlatformAPI().setTimeout(function(){var d={},e=b.fixEventTime(d),f=parseInt(c.ns_st_po);d.ns_st_po=f+e-a+"",ba.newEvent(i.PAUSE_ON_BUFFERING,e,d)},da)},stopPausedOnBufferingTimer:function(){null!=X&&(ba.getPlatformAPI().clearTimeout(X),X=null)},stopDelayedTransitionTimer:function(){Z&&(ba.getPlatformAPI().clearTimeout(Z),Z=null)},setPixelURL:function(a){if(null==a||0==a.length)return null;var b=decodeURIComponent||unescape,c=a.indexOf("?");if(c>=0){if(c<a.length-1){for(var d=a.substring(c+1).split("&"),e=0,f=d.length;e<f;e++){var g=d[e],h=g.split("=");2==h.length?ba.setLabel(h[0],b(h[1])):1==h.length&&ba.setLabel(l.PAGE_NAME_LABEL,b(h[0]))}a=a.substring(0,c+1)}}else a+="?";return aa=a},getPixelURL:function(){return aa?aa:"undefined"!=typeof ns_p&&"string"==typeof ns_p.src?aa=ns_p.src.replace(/&amp;/,"&").replace(/&ns__t=\d+/,""):"string"==typeof ns_pixelUrl?aa=ns_pixelUrl.replace(/&amp;/,"&").replace(/&ns__t=\d+/,""):null},getSseSM:function(){return m},resetPlaylist:function(a){var b=m.getPlaylist();m.setPlaylist(new n),n.resetPlaylist(b,m.getPlaylist(),a)},resetHeartbeat:function(){m.getHeartbeat().pause();var a=m.getHeartbeat().getIntervals();m.setHeartbeat(new p(m)),m.getHeartbeat().setIntervals(a)},resetKeepAlive:function(){m.getKeepAlive().pause();var a=m.getKeepAlive().getInterval();m.setKeepAlive(new q(m)),m.getKeepAlive().setInterval(a)}});var fa,ga;b.isBrowser()?(fa=window,ga=document):(fa={},ga={location:{href:""},title:"",URL:"",referrer:"",cookie:""}),b.extend(ba,{prepareUrl:f,viewNotify:e}),a()}}(),G=function(){return function(a){var c,d,e,f,g,h,i=this;b.extend(i,{getAppCore:function(){return c},getSSECore:function(){return a},getEventManager:function(){return d},getStateMachine:function(){return e},getHeartbeat:function(){return f},getKeepAlive:function(){return g},getPlaylist:function(){return h},setAppCore:function(a){c=a},setKeepAlive:function(a){g=a},setHeartbeat:function(a){f=a},setEventManager:function(a){d=a},setStateMachine:function(a){e=a},setPlaylist:function(a){h=a}})}}(),H=function(){return function(a,c){function d(){h=new F,g=!0,a&&k.setLabels(a),c&&k.setPixelURL(c)}function e(a,b){k.notify(i.CUSTOM,a,b)}function f(){g&&h.getSseSM().getStateMachine().getCurrentState()!=j.IDLE&&k.end()}var g,h,k=this,m=l.STANDARD_METADATA_LABELS;b.extend(this,{isProperlyInitialized:function(){return h.isProperlyInitialized()},reset:function(a){var b=h;b.getSseSM().getKeepAlive().pause(),b.getSseSM().getHeartbeat().pause(),h=new F,n.resetPlaylist(b.getSseSM().getPlaylist(),h.getSseSM().getPlaylist(),a)},setPauseOnBufferingInterval:function(a){h.setPauseOnBufferingInterval(a)},getPauseOnBufferingInterval:function(){return h.getPauseOnBufferingInterval()},setKeepAliveInterval:function(a){h.getSseSM().getKeepAlive().setInterval(a)},getKeepAliveInterval:function(){return h.getSseSM().getKeepAlive().getInterval()},setHeartbeatIntervals:function(a){h.getSseSM().getHeartbeat().setIntervals(a)},play:function(a,b){k.notify(i.PLAY,a,b)},pause:function(a,b){k.notify(i.PAUSE,a,b)},end:function(a,b){k.notify(i.END,a,b)},bufferStart:function(a,b){k.notify(i.BUFFER,a,b)},bufferStop:function(a,b){k.notify(i.BUFFER_STOP,a,b)},load:function(a,b){k.notify(i.LOAD,a,b)},engage:function(a,b){k.notify(i.ENGAGE,a,b)},seekStart:function(a,b){k.notify(i.SEEK_START,a,b)},skipAd:function(a,b){k.notify(i.AD_SKIP,a,b)},callToAction:function(a,b){k.notify(i.CTA,a,b)},error:function(a,b){k.notify(i.ERROR,a,b)},transferPlayback:function(a,b){k.notify(i.TRANSFER,a,b)},drmFail:function(a,b){k.notify(i.DRM_FAILED,a,b)},drmApprove:function(a,b){k.notify(i.DRM_APPROVED,a,b)},drmDeny:function(a,b){k.notify(i.DRM_DENIED,a,b)},changeBitrate:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_br=a+"",k.notify(i.BIT_RATE,d,b)}},changePlaybackRate:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_rt=a+"",k.notify(i.PLAYBACK_RATE,d,b)}},changeVolume:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_vo=a+"",k.notify(i.VOLUME,d,b)}},changeWindowState:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_ws=a+"",k.notify(i.WINDOW_STATE,d,b)}},changeAudio:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_at=a+"",k.notify(i.AUDIO,d,b)}},changeVideo:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_vt=a+"",k.notify(i.VIDEO,d,b)}},changeSubtitle:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_tt=a+"",k.notify(i.SUBS,d,b)}},changeCDN:function(a,b,c){if(null!=a){var d=c||{};d.ns_st_cdn=a+"",k.notify(i.CDN,d,b)}},notify:function(a){var c,d;if(c="object"==typeof arguments[1]?arguments[1]:"object"==typeof arguments[2]?arguments[2]:{},d="number"==typeof arguments[1]?arguments[1]:"number"==typeof arguments[2]?arguments[2]:NaN,i.toString(a)){c=b.jsonObjectToStringDictionary(c);var e=b.fixEventTime(c);c.ns_st_po||isNaN(d)||(c.ns_st_po=b.getInteger(d,0)+""),c.ns_st_po&&h.getSseSM().getPlaylist().getClip().setPlaybackTimeOffset(parseInt(c.ns_st_po)),a==i.PLAY||a==i.PAUSE||a==i.BUFFER||a==i.END||a==i.SEEK_START||a==i.AD_SKIP||a==i.BUFFER_STOP?h.newEvent(a,e,c):h.newPseudoEvent(a,e,c)}},getLabels:function(){return h.getLabels()},getState:function(){return h.getSseSM().getStateMachine().getCurrentState()},setLabels:function(a){h.setLabels(a)},getLabel:function(a){return h.getLabel(a)},setLabel:function(a,b){h.setLabel(a,b)},getLoadTimeOffset:function(){return h.getLoadTimeOffset()},setLoadTimeOffset:function(a){h.setLoadTimeOffset(a)},setPixelURL:function(a){return h.setPixelURL(a)},getPixelURL:function(){return h.getPixelURL()},setImplementationType:function(a){h.setImplementationType(a)},isPauseOnBufferingEnabled:function(){return h.isPauseOnBufferingEnabled()},setPauseOnBufferingEnabled:function(a){h.setPauseOnBufferingEnabled(a)},isThrottlingEnabled:function(){return h.isThrottlingEnabled()},setThrottlingEnabled:function(a){h.setThrottlingEnabled(a)},setThrottlingDelay:function(a){h.setThrottlingDelay(a)},getThrottlingDelay:function(){return h.getThrottlingDelay()},setPlaybackIntervalMergeTolerance:function(a){h.getSseSM().getPlaylist().getClip().setPlaybackIntervalMergeTolerance(a)},getPlaybackIntervalMergeTolerance:function(){return h.getSseSM().getPlaylist().getClip().getPlaybackIntervalMergeTolerance()},setClip:function(a,c,d){if(void 0===d&&(d=!0),a=b.jsonObjectToStringDictionary(a),d&&h.getSseSM().getStateMachine().getCurrentState()!==j.IDLE&&k.end(),h.getSseSM().getStateMachine().getCurrentState()==j.IDLE){var e="",f=0;if(null!=a.ns_st_cn)e=a.ns_st_cn;else for(var g=0;g<m.length;g++)a[m[g]]&&(e+=m[g]+":"+a[m[g]]+";");var i=h.getSseSM().getPlaylist(),l=i.getClip();l.isClipStarted()?(i.hashExists(l.getHash())||(i.storeHash(l.getHash()),i.storeClipNumber(l.getHash(),l.getClipNumber())),i.storeClipPlaybackCounters(),f=i.hashExists(e)?i.getClipNumber(e):b.exists(a.ns_st_cn)?parseInt(a.ns_st_cn):i.getMaxClipNumber()+1):f=i.hashExists(e)?i.getClipNumber(e):l.getClipNumber(),i.resetClip(),l=i.getClip(),l.setHash(e),l.setClipNumber(f),l.setLabels(a);var n=i.getStoredClipRegisters(e);return n&&(l.setClipStarted(!0),l.setSegmentPlaybackCounter(n.segmentPlaybackCounter),l.setClipLoadCounter(n.clipLoadCounter),l.setAssetPlaybackCounter(n.assetPlaybackCounter),l.setLowestPartNumberPlayed(n.lowestPartNumberPlayed),l.setSeeking(n.seeking),l.setSeekingTimeBeforeEnd(n.seekingTimeBeforeEnd),l.setSeekStartPosition(n.seekingStartPosition),l.setClipPlaybackIntervals(n.clipPlaybackIntervals),l.setUniquePlaybackInterval(n.uniquePlaybackInterval),l.setLongestPlaybackInterval(n.longestPlaybackInterval),l.setVideoTrack(n.videoTrack),l.setAudioTrack(n.audioTrack),l.setSubtitleTrack(n.subtitleTrack),l.setCDN(n.cdn),l.setPlaySequenceCounter(n.playSequenceCounter),l.setPreviousUniquePlaybackInterval(n.uniquePlaybackInterval),l.setPreviousEventIndependentUniquePlaybackInterval(n.uniquePlaybackInterval),l.setPreviousLongestPlaybackInterval(n.longestPlaybackInterval)),l.incrementClipLoadCounter(),l.isClipStarted()&&c&&(i.incrementPlayCounter(),i.incrementPlaybackCounter()),c&&i.setPlaySequenceCounter(0),!0}return!1},setPlaylist:function(a,c){return void 0===c&&(c=!0),a=b.jsonObjectToStringDictionary(a),c&&h.getSseSM().getStateMachine().getCurrentState()!==j.IDLE&&k.end(),h.getSseSM().getStateMachine().getCurrentState()==j.IDLE&&(h.getSseSM().getPlaylist().isPlaylistStarted()&&h.resetPlaylist(),h.getSseSM().getPlaylist().setLabels(a),!0)},importState:function(){},exportState:function(){return{}},getVersion:function(){return l.STREAMSENSE_VERSION},addListener:function(a){h.addListener(a)},removeListener:function(a){h.removeListener(a)},getClip:function(){return h.getSseSM().getPlaylist().getClip()},getPlaylist:function(){return h.getSseSM().getPlaylist()},setHttpGet:function(a){"function"==typeof a&&(h.getPlatformAPI().httpGet=a)},setHttpPost:function(a){"function"==typeof a&&(h.getPlatformAPI().httpPost=a)},setExitEndEventEnabled:function(a){g=a},isExitEndEventEnabled:function(){return g},getPlatformAPI:function(){return h.getPlatformAPI()}}),b.extend(k,{customNotify:e,viewNotify:function(a,b){a=a||k.getPixelURL(),a&&h.viewNotify(a,b)}}),b.isBrowser()&&(window.addEventListener?(window.addEventListener("beforeunload",f),window.addEventListener("unload",f)):window.attachEvent&&(window.attachEvent("onbeforeunload",f),window.attachEvent("onunload",f))),d()}}();return function(c){function d(a,b){return x[z]||f(a,b)}function e(){z=-1;for(var b=0;b<=y;b++)if(x.hasOwnProperty(b+"")){z=b;break}return a.StreamSense.activeIndex=z,z}function f(b,c){return b=b||null,c=c||null,b&&"object"==typeof b&&(c=b,b=null),x[++y]=new a.StreamSense(c,b),e(),x[y]}function g(){var b=!1,c=z;if("number"==typeof arguments[0]&&isFinite(arguments[0]))c=arguments[0];else if(arguments[0]instanceof a.StreamSense)for(var d in x)if(x.hasOwnProperty(d)&&x[d]===arguments[0]){c=d;break}return x.hasOwnProperty(c+"")&&(b=x[c],delete x[c],b.reset(),e()),b}function h(a){return a=a||{},d().setPlaylist(a),d().getPlaylist()}function i(a,b,c){return a=a||{},"number"==typeof b&&(a.ns_st_cn=b+""),d().setClip(a,c),d().getClip()}function j(a,b,c){return"undefined"!=typeof a&&(c=c||null,b=b||{},d().notify(a,b,c))}function k(a){"undefined"!=typeof a&&d().setLabels(a)}function l(){return d().getLabels()}function m(a){"undefined"!=typeof a&&d().getPlaylist().setLabels(a)}function n(){return d().getPlaylist().getLabels()}function o(a){"undefined"!=typeof a&&d().getClip().setLabels(a)}function p(){return d().getClip().getLabels()}function q(a){return d().reset(a||{})}function r(a){return d().getPlaylist().reset(a||{})}function s(a){return d().getClip().reset(a||{})}function t(a){return a=a||{},d().viewNotify(null,a)}function u(a,b){return arguments.length>2&&(a=arguments[1],b=arguments[2]),a=a||{},"number"==typeof b&&(a.ns_st_po=b+""),d().customNotify(a,b)}function v(){return d().exportState()}function w(a){d().importState(a)}var x={},y=-1,z=-1;b.extend(c,{activeIndex:z,newInstance:f,"new":f,destroyInstance:g,destroy:g,newPlaylist:h,newClip:i,notify:j,setLabels:k,getLabels:l,setPlaylistLabels:m,getPlaylistLabels:n,setClipLabels:o,getClipLabels:p,resetInstance:q,resetPlaylist:r,resetClip:s,viewEvent:t,customEvent:u,exportState:v,importState:w})}(H),H.PlayerEvents=i,H.InternalStates=j,H.ImplementationType=k,H}(),a.StreamingTag=a.StreamingTag||function(){var c=a.StreamSense,d=(a.StreamSense.PlayerEvents,a.StreamSense.InternalStates||null),e=a.StreamSense.ImplementationType||null,f=null!=a.StreamSense.InternalStates&&null!=a.StreamSense.ImplementationType;return function(){var a={LongFormOnDemand:"12",ShortFormOnDemand:"11",Live:"13",UserGeneratedLongFormOnDemand:"22",UserGeneratedShortFormOnDemand:"21",UserGeneratedLive:"23",Bumper:"99",Other:"00"},g={LinearOnDemandPreRoll:"11",LinearOnDemandMidRoll:"12",LinearOnDemandPostRoll:"13",LinearLive:"21",BrandedOnDemandPreRoll:"31",BrandedOnDemandMidRoll:"32",BrandedOnDemandPostRoll:"33",BrandedOnDemandContent:"34",BrandedOnDemandLive:"35",Other:"00"},h=function(a){function g(){if(f)if(b.getNamespace().comScore)q=new c,q.setImplementationType(e.REDUCED);else if(b.exists(a))if(r=b.isTrue(a.debug),b.exists(a.customerC2)&&a.customerC2.length>0){var d=a.secure?"https://sb":"http"+("s"==document.location.href.charAt(4)?"s://sb":"://b");q=new c,q.setPixelURL(d+".scorecardresearch.com/p?c1=2"),q.setLabel("c2",a.customerC2),q.setImplementationType(e.REDUCED)}else r&&console&&console.log("Warning: customerC2 is not provided (or incorrect) in the StreamingTag configuration.")}function h(a){b.exists(a)||(a={});for(var c in t)t.hasOwnProperty(c)&&!b.exists(a[t[c]])&&("ns_st_ci"==t[c]?a.ns_st_ci="0":a[t[c]]="*null");return a}function i(a){for(var b in t)if(t.hasOwnProperty(b)&&!j(t[b],o,a))return!1;return!0}function j(a,c,d){if(b.exists(a)&&b.exists(c)&&b.exists(d)){var e=c[a],f=d[a];return b.exists(e)&&b.exists(f)&&e===f}return!1}function k(a){n++;var c={ns_st_cn:n+"",ns_st_pn:"1",ns_st_tp:"0"};b.extend(c,a),q.setClip(c),o=a,q.play()}function l(a){n++,a=h(a);var c={ns_st_cn:n+"",ns_st_pn:"1",ns_st_tp:"1",ns_st_ad:"1"};b.extend(c,a),q.setClip(c),q.play(),p=!1}function m(a,b){a=h(a),u==s.None&&(u=b),p&&u==b&&i(a)?(q.getClip().setLabels(a),q.getState()!=d.PLAYING&&q.play()):k(a),p=!0,u=b}var n=0,o=null,p=!1,q=null,r=!1,s={None:0,AudioContent:1,VideoContent:2},t=["ns_st_ci","c3","c4","c6","ns_st_st","ns_st_pu","ns_st_pr","ns_st_ep","ns_st_sn","ns_st_en","ns_st_ct"],u=s.None;b.extend(this,{playAdvertisement:function(){if(q){r&&console&&console.warn("Calling deprecated function 'playAdvertisement'. Please call 'playVideoAdvertisement' or 'playAudioAdvertisement' functions instead.");var a={ns_st_ct:"va"};l(a)}},playVideoAdvertisement:function(a,c){if(q){var d={ns_st_ct:"va"};c?d.ns_st_ct="va"+c:r&&console&&console.warn("Calling 'playVideoAdvertisement' without specifying the media type as a second parameter."),a&&b.extend(d,a),l(d)}},playAudioAdvertisement:function(a,c){if(q){var d={ns_st_ct:"aa"};c?d.ns_st_ct="aa"+c:r&&console&&console.warn("Calling 'playAudioAdvertisement' without specifying the media type as a second parameter."),a&&b.extend(d,a),l(d)}},playContentPart:function(a){if(q){r&&console&&console.warn("Calling deprecated function 'playContentPart'. Please call 'playVideoContentPart' or 'playAudioContentPart' functions instead.");var c={ns_st_ct:"vc"};a&&b.extend(c,a),m(c,s.VideoContent)}},playVideoContentPart:function(a,c){if(q){var d={ns_st_ct:"vc"};c?d.ns_st_ct="vc"+c:r&&console&&console.warn("Calling 'playVideoContentPart' without specifying the media type as a second parameter."),a&&b.extend(d,a),m(d,s.VideoContent)}},playAudioContentPart:function(a,c){if(q){var d={ns_st_ct:"ac"};c?d.ns_st_ct="ac"+c:r&&console&&console.warn("Calling 'playAudioContentPart' without specifying the media type as a second parameter."),a&&b.extend(d,a),m(d,s.AudioContent)}},stop:function(){q&&q.pause()}}),g()};return function(a){}(h),h.ContentType=a,h.AdType=g,h}()}(),a});(function(namespace) {

    // Inheritance class
    StatisticsManager.prototype = new psd.framework.EventDispatcher();

    /**
     * StatisticsManager es un gestor de estadísticas que permite centralizar
     * las opciones de seguimiento estadístico de una aplicación a través de
     * diferentes plugins y suites estadísticas mediante el uso de ficheros de
     * configuración y una API pública sencilla
     */
    function StatisticsManager() 
    {
		PRUEBAHEAP = 0;

        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.statistics.StatisticsManager
         */
        this.className = "psd.statistics.StatisticsManager";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var isProfileHttps= false;//variable para conocer el tip de url del json de profile. (https o http)
        var baseStat= "";//variable que contendrá la url base
        // Array de plugins registrados
        var _plugins = {length:0};
		var _currentPlugin;
        
        // Objeto de datos generales
        var _data = {};

		//Objeto de datos obligatorios
		var _pendingHeap = [];
		var _pending = null;
		var _currentTry = 0;

		_dataDynamic = [];
        
        // Objeto con las reglas de enrutamiento de eventos
        var _routing = {};
        
        // Controla si el manager ha completado la carga de las opciones de 
        // configuración y ha terminado de inicializarse
        var _initialized = false;
        
        // Lista de suscriptores de eventos
        var _subscribersList = [];
        
        // Utilidad para obtener la declaración de una clase a partir de su
        // nombre completo (paquete incluido)
        // @param className El nombre completo de la clase
        // @return La clase solicitada si se encuentra, window si no.
        var _getClass = function(className)
        {
            var namespaces = className.split("."),
                numNamespaces = namespaces.length, i,
                skinClass = (window || this);
                
            for(var i=0; i < numNamespaces; i++) {skinClass = skinClass[namespaces[i]];}
                
            return skinClass;
        };
        
        // Importa la configuración del manager a partir de un objeto de configuración.
        // El objeto de configuración debe tener la siguiente estructura:
        //  OBJ
        //   |- config
        //        |---- [data] (Array)  
        //                 |--------------- {name, value}
        //        |---- [plugins] (Array)
        //                 |--------------- {id, type, url}
        //        |---- [routing] (Array)
        //                 |--------------- {name, type, plugins}
        //                 
        // @param settings Objeto con la configuración que se quiere transferir.
        var _importObjectConfiguration = function(settings) {
            
            // Comprobamos que existe la propiedad principal "config"
            if(typeof(settings.config)!="undefined")
            {
                var data    = settings.config.data,
                    plugins = settings.config.plugins,
                    routing = settings.config.routing,
                    i, length;
                			
                // Utilizamos la API pública setData() para importar
                // los datos de caracter general
                if(Object.prototype.toString.call(data)=="[object Array]"){
                    
                    for(i=0;i < data.length; i++) {
                        if(typeof(data[i])!="undefined" &&
                           typeof(data[i].name)!="undefined" &&
                           typeof(data[i].value)!="undefined") {
                           
                           this.setData(data[i].name, data[i].value);
                        }
                    }
                }
                
                // Utilizamos la API pública loadPlugin() para importar e
                // inicializar los plugins especificados en la configuración
                if(Object.prototype.toString.call(plugins)=="[object Array]"){
                    
                    for(i=0;i<plugins.length;i++) {
                        if(typeof(plugins[i])!="undefined" &&
                           typeof(plugins[i].id)!="undefined" &&
                           typeof(plugins[i].type)!="undefined") {
                           
                            if(typeof(plugins[i].url)!="undefined"){
                                this.loadPlugin(plugins[i].id, plugins[i].type, plugins[i].url);
                            } else {
                                this.loadPlugin(plugins[i].id, plugins[i].type, plugins[i].config);
                            }
                        }
                    }
                }
                
                // Utilizamos la API pública addRouting() para importar las reglas
                // de enrutamiento especificadas en la configuración
                if(Object.prototype.toString.call(routing)=="[object Array]"){
                    
                    for(i=0;i<routing.length;i++) {
                        if(typeof(routing[i])!="undefined" &&
                           typeof(routing[i].name)!="undefined" &&
                           typeof(routing[i].plugins)!="undefined" &&
                           typeof(routing[i].type)!="undefined") {
                           
                           this.addRouting(routing[i].name, routing[i].type, routing[i].plugins);
                        }
                    }
                }
                
                // Indicamos que el manager se ha inicializado
                _initialized = true;
                
                // Si tenemos subscribers en la lista, generamos los eventlisteners
                // apropiados para ellos
                length = _subscribersList.length;
                for(i=0;i<length;i++) {
                    _addListeners.apply(this, [_subscribersList[i].subscriber]);
                }
            }
        };
        
        // Añade los listeners especificados por las reglas de enrutamiento a 
        // un objeto emisor
        var _addListeners = function(emitter) {
            var routing = this.getRouting(),
                i;
            
            for(i in routing) {
                emitter.addEventListener(i, _deferredOnEmitterEvent);
            }
        }
        
        // Elimina los listeners especificados por las reglas de enrutamiento de 
        // un objeto emisor
        // var _removeListeners = function(emitter) {
        //    var routing = this.getRouting(),
        //        i;
        //    
        //    for(i in routing) {
        //        emitter.removeEventListener(i, _deferredOnEmitterEvent);
        //    }
        // }
        
        // Carga la configuración del manager a partir de un objeto de configuración
        // remoto. El fichero de configuración debe estar en formato JSON y tener la 
        // siguiente estructura:
        //{
        //    "config":{
        //        "data": [
        //            {"name": "unidadDeNegocio", "value": "40TV"},
        //            {"name": "nombreCanal", "value": "Los 40TV"}
        //        ],
        //        "plugins": [
        //            {	"id": "omniture",
        //                "type": "psd.statistics.plugins.OmniturePlugin",
        //                "url": "conf/players/psd_player/plugins/omniture.xml"
        //            }            
        //        ],
        //        "routing": [
        //            {"name": "mediaBegin", "plugins": "omniture", "type":"custom"},
        //            {"name": "mediaComplete", "plugins": "omniture", "type":"custom"},
        //            {"name": "mediaHalf", "plugins": "omniture", "type":"custom"}
        //        ]
        //    }
        //}
        // @param url URL con la dirección del fichero de configuración.
        var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);            
        };

        // Fusiona dos listas de datos, uno de evento y otro general en un único
        // listado, añadiendo un prefijo "data." o "global." a cada dato en
        // función de su origen.
        // @param data Datos particulares del evento marcado
        // @param global Datos de carácter general o global
        var _merge = function(data, global) {
            var consolidated = {}, i;

            // Los datos de evento se prefijan con "data."
            for(i in data) {consolidated["data."+i] = data[i];}
            
            // Los datos generales se prefijan con "global."
            for(i in global) {consolidated["global."+i] = global[i];}
            
            return consolidated;
        }
        
        // Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            var parserResult = evt.result.parserResult;
            
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTIÓN DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
        
        // Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTIÓN DEL ERROR DE LECTURA
            console.log("MEDIATE ERROR");
            console.log(evt.result.msg);
        };
        
        // Mediator para la carga de ficheros de configuración
        var _configMediator = new psd.framework.Mediator();
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
        
        // Parser para la carga de ficheros de configuración
        var _configParser = new psd.framework.parser.JSONParser();
        
        // Listener que escucha eventos de los emisores registrados en el manager
        // para el modo de seguimiento automático
        // @param evt El evento de seguimiento
        var _deferredOnEmitterEvent = (function(statisticsManager){return function(evt){_onEmitterEvent.apply(statisticsManager,[evt]);}})(this);
        var _onEmitterEvent = function(evt) {
            
            var subscriber = evt.target,
                pattern = _getSubscriberPattern.apply(this, [subscriber]),
                patternType,
                data = evt.data;
            
            // Si tenemos un patrón de conversión asociado al evento recibido,
            // obtenemos la información del evento a partir del patrón
            if( pattern != null) {
                
                patternType = Object.prototype.toString.call(pattern);
                
                if(patternType == "[object String]") {
                    data = subscriber[pattern];
                }else if (patternType == "[object Function]") {
                    data = pattern.apply(subscriber, [evt]);
                }else if (patternType == "[object Array]") {
                    // TO-DO Resolver un array de variables
                }
            }
            
            // Utilizamos la API pública track() para realizar el seguimiento
            // del evento de manera automática

            this.track(evt.type, data);
        };
        
        // Localiza el patrón de conversión de variables de evento
        var _getSubscriberPattern = function (subscriber) {
            var i, pattern = null,
                subscribersLength = _subscribersList.length;
            
            if(typeof(subscriber)!="undefined" && subscriber!=null) { 
                for(i=0; i<subscribersLength; i++) {
                    if(_subscribersList[i].subscriber === subscriber) {
                        pattern = _subscribersList[i].subscriptionPattern;
                        break;
                    }
                }
            }
            
            return pattern;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Importa la configuración de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuración o un 
         *                 objeto de configuración 
         */
        this.setup = function(settings) {

            var configType = Object.prototype.toString.call(settings);
            //cojemos la url Base
            baseStat= getUrlBase(settings);

            // Iniciamos la carga remota si el parámetro es un String, o la carga
            // local si el parámetro es un Object
            if(configType == "[object String]") {
                if(settings.indexOf("profile")>=1){//si es el json de profile
                    if(checkHttps(settings)){//si su url tiene https, conmuta a true la variable.
                        isProfileHttps= true;
                    }
                }
                _importRemoteConfiguration.apply(this, [settings]);
            }else if(configType == "[object Object]") {
                _importObjectConfiguration.apply(this, [settings]);
            }
        };
        //detecta si la ruta es https
        var checkHttps= function(url){
            if(url.indexOf("https")!= -1){
                return true;
            }
            else{
                return false;
            }
        };
        //devuelve la url base de una url
        var getUrlBase= function (url) {
            var arrayUrl= url.split("/psdmedia");
            var urlBase= arrayUrl[0];
            return urlBase;
        }
        
        /**
         *  Array de plugins de estadísticas registrados
         */
        this.getPlugins = function() { return _plugins; };
        
        /**
         * Obtiene un plugin de estadísticas registrado
         * @param id El id del plugin de estadísticas
         */
        this.getPlugin = function(id) {return _plugins[id];}; 
        
        /**
         * Registra un plugin de estadísticas existente
         * @param id El id del plugin de estadísticas
         * @param plugin El plugin de estadísticas
         */
        this.addPlugin = function(id, plugin) {
            if (typeof(_plugins[id])==="undefined") {_plugins.length++;}
            _plugins[id] = plugin;
        };
        
        /**
         * Registra un nuevo plugin de estadísticas, creándolo a partir de 
         * su clase e inicializándolo con la configuración de entrada
         * @param id El id del plugin de estadísticas
         * @param className La clase del plugin de estadísticas
         * @param conf Las opciones de configuración para la inicialización
         *              del plugin
         */
        this.loadPlugin = function(id, className, conf) {
            var pluginClass = _getClass(className),
                plugin = new pluginClass();
            //parte la url del json de Plugin
            var arrayStatDataConf= conf.split("/psdmedia");

            //setea en el objeto data la url que apunta a plugin
            conf= baseStat + "/psdmedia" + arrayStatDataConf[1];

                if(isProfileHttps){//si la url del json de profile es https, => reemplazamos en las url del json de los plugins por https
                    conf= conf.replace("http", "https");
                }
                plugin.setup(conf);
                plugin.setDataProfile(_data);
				
            this.addPlugin(id, plugin);
        };
        
        /**
         * Elimina un plugin de la lista de plugins registrados
         * @param id El id del plugin que se quiere des-registar
         */
        this.removePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins.length--;
                delete _plugins[id];
            }
        };
        
        /**
         * Elimina una serie de plugins de la lista de plugins registrados
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      des-registrar. Si no se recibe pluginsList, se
         *                      eliminarán todos los plugins existentes
         */
        this.removePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") this.removePlugin(i);}
            } else {for(i in pluginsList) {this.removePlugin(pluginsList[i]);}}
        };
        
        /**
         * Activa un plugin para el registro de estadísticas
         * @param id El id del plugin que se quiere activar
         */
        this.enablePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins[id].enable();
            }
        };
        
        /**
         * Activa una serie de plugins para el registro de estadísticas
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      activar. Si no se recibe pluginsList, se
         *                      activarán todos los plugins existentes
         */
        this.enablePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") this.enablePlugin(i);}
            } else {for(i in pluginsList) {this.enablePlugin(pluginsList[i]);}}
        };
        
        /**
         * Desactiva un plugin para el registro de estadísticas
         * @param id El id del plugin que se quiere desactivar
         */
        this.disablePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins[id].disable();
            }        
        };
        
        /**
         * Desactiva una serie de plugins para el registro de estadísticas
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      desactivar. Si no se recibe pluginsList, se
         *                      desactivarán todos los plugins existentes
         */
        this.disablePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") {this.disablePlugin(i);}}
            } else {for(i in pluginsList) {this.disablePlugin(pluginsList[i]);}}
        };
        
        /**
         * Obtiene un valor de carácter general
         * @param key El id del valor que se quiere consultar. Si no se recibe key,
         *              se devuelve el array completo de datos
         */
        this.getData = function(key) {
            if(typeof(key)=="undefined"){return _data;}
            if(typeof(_data[key])=="undefined") {return null;}
            else {return _data[key];}
        };
        
        /**
         * Crea o actualiza un dato de carácter general
         * @param key El identificador del valor que se quiere crear o modificar
         * @param value El valor que se quiere asignar al dato
         */
        this.setData = function(key, value) {_data[key] = value;};
        

		this.setDataDynamic = function(dataDynamic) {
            var i, j;

		    for(i in dataDynamic){
				for(j in this._dataDynamic){
					if(this._dataDynamic[j].name==dataDynamic[i].name)
					{
		                this._dataDynamic[j] = {"name" : dataDynamic[i].name, "value" : dataDynamic[i].value};
					}
				}
			}

			if(_currentTry>5){
				_pending = null;
			}
			if(_pending==null)
			{
				if(_pendingHeap.length>0)
				{
					_currentTry = 0;

                    _pending = _pendingHeap[0];
                    _pendingHeap.splice(0,1);

                    this.multitrack(_pending.rule,_pending.data,_pending.plugin);
				}
			}
			else{
                this.multitrack(_pending.rule,_pending.data,_pending.plugin);
			}
		}

        /**
         * Elimina un dato de carácter general
         * @param key El identificador del dato que se quiere eliminar
         */
        this.unsetData = function(key) {delete _data[key];};
        
        /**
         * Obtiene una regla de enrutamiento
         * @param rule El nombre de la regla que se quiere consultar. Si no se 
         *              recibe rule, se devuelve el array completo de enrutamientos
         */
        this.getRouting = function(rule) {
            if(typeof(rule)=="undefined"){return _routing;}
            if(typeof(_routing[rule])=="undefined") {return null;}
            else {return _routing[rule];}
        };
        
        /**
         * Crea o actualiza una regla de enrutamiento
         * @param rule Identificador de la regla de enrutamiento
         * @param type Tipo de seguimiento a realizar asociado al enrutamiento
         * @param plugins Plugins que se deben notificar cuando se active la regla
         */
        this.addRouting = function(rule, type, plugins) {
            _routing[rule] = {type:type, plugins:plugins};
        };
        
        /**
         * Realiza el seguimiento de un evento en la aplicación
         * @param rule El evento que se ha producido
         * @param data Datos relacionados con el evento
         */
        this.track = function(rule, data) {
            var routing = this.getRouting(rule),
                consolidatedData = _merge(data, _data),
                routes, routesLength, i, plugin;
            
            // Analizamos si tenemos reglas de enrutamiento que aplicara
            if(routing){
				auxDynamics = [];

                routes = routing.plugins.split(",");
                routesLength = routes.length;
                for(i=0;i<routesLength;i++){
                    plugin = this.getPlugin(routes[i]);
                    if(plugin) {
						this._dataDynamic = plugin._dataDynamic;
						this.multitrack(rule, data, plugin);
                    }
                }
            }
        };

		this.multitrack = function(rule, data, plugin){
            var i;
			_currentTry++;

			var routing = this.getRouting(rule);
            var consolidatedData = _merge(data, _data);

            if(this.hasAllDynData()){

                plugin.track(rule, routing.type, consolidatedData);
                _pending = null;
                _currentTry = 0;

                for(i in this._dataDynamic){
                    this._dataDynamic[i].value = "";
                }


                if(plugin.setDataDynamic!=undefined)
                    plugin.setDataDynamic(this._dataDynamic);

                if(_pendingHeap.length>0)
                {
                    _pending = _pendingHeap[0];
                    _pendingHeap.splice(0,1);

                    this.multitrack(_pending.rule,_pending.data,_pending.plugin);
                }
            }
            else{
                if(_pending==null){
                    _pending =  { "rule":rule, "data":data, "plugin":plugin };
                }
               this.dispatchEvent(new psd.statistics.StatEvent(psd.statistics.StatEvent.DATA_REQUIRED_STATISTICS,this._dataDynamic,_data,plugin));
       		}
		}

        this.hasAllDynData = function() {
            var allRequired = true, i;

            for(i in this._dataDynamic){
                if(this._dataDynamic[i].value == ""){
                    allRequired = false;
				}
            }
			return allRequired;
		}
        
        /**
         * Suscribe un elemento para el seguimiento estadístico automático
         * @param emitter El elemento emisor de eventos que sirve para el seguimiento
         * @param pattern Patrón que se debe aplicar para la conversión de los datos
         *                  del evento cuando se produce
         */
        this.subscribe = function(emitter, pattern) {
            _subscribersList.push({ subscriber: emitter, 
                                    subscriptionPattern: pattern||{}
                                    });
            
            if(_initialized) { _addListeners.apply(this,[emitter]); }
        };
        
        // this.unsubscribe = function() {
        //    for(var i in _subscribersList) {
        //        _removeListeners.apply(this,[_subscribersList[i].subscriber]);
        //    }
        // }
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.StatisticsManager = StatisticsManager;

})(psd.statistics);
(function(namespace) {

    // Inheritance class
    TrackingPlugin.prototype = new psd.framework.EventDispatcher();

    /**
     * TrackingPlugin es la base para los plugins del sistema de estadísticas
     * multimedia
     */
    function TrackingPlugin() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.statistics.TrackingPlugin
         */
        this.className = "psd.statistics.TrackingPlugin";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
		var _dataProfile = [];
		
        /**
         * Activa el plugin para el envío de estadísticas
         */
        this.enable = function() { _enabled = true; };
        
        /**
         * Desactiva el plugin para el envío de estadísticas
         */
        this.disable = function() { _enabled = false; };
        
        /**
         * Indica si el plugin está activado o no para el envío de estadísticas
         */
        var _enabled = true;        
        this.enabled = function() { return _enabled; };
        
        /**
         * Añade un nuevo mapeo de datos entre los recibidos para el seguimiento
         * y los realmente enviados
         */
        this.addDataMapping = function(name, value) {
            if(this._dataProfile[value.replace("data.","")]!=undefined){
				_dataMap[name] = this._dataProfile[value.replace("data.","")];
			}
			else{
                if (value.indexOf("page")!=-1) {
                        if(window[value.replace("page.","")]!=undefined){
                        _dataMap[name] = window[value.replace("page.","")];
                    }
                }
                else
                    _dataMap[name] = value;
            }
        };
		
		this.setDataProfile = function(dp){
			this._dataProfile = dp;
		}
        
        /**
         * Mapa de correspondencias entre los datos recibidos y los que se deben
         * enviar 
         */
        var _dataMap = {};        
        this.dataMap = function() { return _dataMap; };

		this._dataDynamic = [];

        this.loadDynamics = function(_settings){
            var i;
			if(_settings.config.dataMapping!=undefined){
	            for(i in _settings.config.dataMapping){
					var _name = _settings.config.dataMapping[i].name;
	                var _value = _settings.config.dataMapping[i].value;

                    if((typeof _value === 'string') || (_value instanceof String)){//verifico que sea un string
                        if(typeof _value != "undefined"){//verifico que no sea undefined
                            if(_value.indexOf("datadyn.")>-1){ //julian
                                this._dataDynamic.push({"name":_name,"value":""});
                            }
                        }
                    }

	            }
	        }
		}

        this.setDataDynamic = function(dataDynamic){
            this._dataDynamic = dataDynamic;
        }

        this.clearDataDynamic = function(){
            var i;
            for(i in this._dataDynamic){
                this._dataDynamic[i].value = "";
            }
        }
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.TrackingPlugin = TrackingPlugin;

})(psd.statistics);
(function(namespace) {

    // Inheritance class
    OmniturePlugin.prototype = new psd.statistics.TrackingPlugin();

    OmniturePlugin.DATA_IDTOP = "data.idTop";

    var _SUITES_PRE = "prisacomurpreprod";

    // Construct
    function OmniturePlugin() 
    {
        // Super
        psd.statistics.TrackingPlugin.call(this);

        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.OmniturePlugin";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Mapa de eventos que gestiona el plugin
        var _eventMappings = {};

                
        // Importa la configuración del plugin a partir de un objeto de configuración.
        // El objeto de configuración debe tener la siguiente estructura:
        //  OBJ
        //   |- config
        //        |---- [events] (Array)  
        //                 |--------------- {name, events, vars, suites}
        //        |---- [dataMapping] (Array)
        //                 |--------------- {name, value}
        //                 
        // @param settings Objeto con la configuración que se quiere transferir.
        var _importObjectConfiguration = function(settings) {
            
			this.loadDynamics(settings);


            // Comprobamos que existe la propiedad principal "config"
            if(typeof(settings.config)!="undefined")
            {            
                var events  = settings.config.events,
                    mapping = settings.config.dataMapping,
                    i, length;
                    
                // Utilizamos la API pública addEventMapping() para importar
                // las definiciones de mapeo de eventos
                if(Object.prototype.toString.call(events)=="[object Array]"){

                    for(i=0;i<events.length;i++) {
                        if(typeof(events[i])!="undefined" &&
                            typeof(events[i].name)!="undefined" &&
                            typeof(events[i].events)!="undefined" &&
                            typeof(events[i].vars)!="undefined" &&
                            typeof(events[i].suites)!="undefined") {

                            this.addEventMapping(events[i].name, 
                                                events[i].events,
                                                events[i].vars,
                                                events[i].suites);
                        }
                    }
                }
                
                // Utilizamos la API pública addDataMapping() para importar
                // las definiciones de mapeo de datos
                if(Object.prototype.toString.call(mapping)=="[object Array]"){

                    for(i=0;i<mapping.length;i++) {
                        if(typeof(mapping[i])!="undefined" &&
                            typeof(mapping[i].name)!="undefined" &&
                            typeof(mapping[i].value)!="undefined") {

                            this.addDataMapping(mapping[i].name, 
                                                mapping[i].value);
                        }
                    }
                }
            }
        };
        
        // Carga la configuración del plugin a partir de un objeto de configuración
        // remoto. El fichero de configuración debe estar en formato JSON y tener la 
        // siguiente estructura:
        //{
        //    "config":{
        //        "events": [
        //            {   
        //                "name": "mediaBegin", 
        //                "events": "event11", 
        //                "vars": "eVar2,eVar3,eVar4,eVar8,eVar17,eVar20,eVar30,eVar35,eVar42,eVar48,eVar74", 
        //                "suites": "prisacomaspreprod,suite_producto"            
        //            },{ 
        //                "name": "mediaComplete", 
        //                "events": "event12", 
        //                "vars": "eVar2,eVar3,eVar4,eVar8,eVar17,eVar20,eVar30,eVar35,eVar42,eVar48,eVar74", 
        //                "suites": "prisacomaspreprod,suite_producto"
        //            }
        //        ],
        //        "dataMapping": [
        //            {"name": "eVar8", "value": "data.name" },
        //            {"name": "eVar9", "value": "data.adName" },
        //            {"name": "eVar74", "value": "data.duration" }
        //        ]
        //    }
        //}
        // @param url URL con la dirección del fichero de configuración.
        var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);            
        };
        
        // Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            var parserResult = evt.result.parserResult;
            
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTIÓN DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
        
        // Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTIÓN DEL ERROR DE LECTURA
            console.log("MEDIATE ERROR");
            console.log(evt.result.msg);
        };
        
        // Mediator para la carga de ficheros de configuración
        var _configMediator = new psd.framework.Mediator();
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
        
        // Parser para la carga de ficheros de configuración
        var _configParser = new psd.framework.parser.JSONParser();        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Importa la configuración de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuración o un 
         *                 objeto de configuración 
         */
        this.setup = function(settings) {

            var settingsType = Object.prototype.toString.call(settings);

            // Iniciamos la carga remota si el parámetro es un String, o la carga
            // local si el parámetro es un Object            
            if (settingsType == "[object String]") {
                _importRemoteConfiguration.apply(this, [settings]);
            } else if (settingsType == "[object Object]") {
                _importObjectConfiguration.apply(this, [settings]);
            }

            /*En caso de que DTM exista no seteamos el objeto s*/
            if (typeof(DTM) === 'undefined') {
                if ((typeof(s) === "undefined") && (typeof(s_gi) !== "undefined")) {
                    s = s_gi("");
                }

            }

        };
        
        /**
         * Realiza el seguimiento de un evento en la aplicación
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general será "custom", pero también se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de carácter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function(event, type, data) {
            var i;


            /*Si tenemos disponible DTM lo utilizamos*/
            if (typeof(DTM) !== 'undefined') {

                s = DTM.s;

            } else {

               /*Si no S_code estandar*/
                if (typeof(window.s) == "undefined") {
                    return;
                }
            }


            var dataMap = this.dataMap(),
                eventMap = _eventMappings[event],
                trackVars, trackEvents,
                previousTrackVars = s.linkTrackVars, 
                previousTrackEvents = s.linkTrackEvents,
                previousEvents = s.events,
                previousVisitorNamespace = s.visitorNamespace,
                previousUsePlugins = s.usePlugins,
                previousS = s,
                previousTrackSuites = null,
                i;

            if (s.account != undefined) {

                previousTrackSuites = s.account;

            } else {

                //--Evita el fallo del player en caso de no existir ninguna variable
                if (typeof(s_account) != 'undefined') {

                    previousTrackSuites = s_account;
                } else {

                    return;
                }

            }

            // Realizamos el seguimiento únicamente si tenemos un eventMap definido
            if(typeof(eventMap)!="undefined")
            {

                s = s_gi(eventMap.suites);
                s.linkTrackVars = "";
                s.linkTrackEvents = "";
                s.events = "";
                s.usePlugins = false;
                s.visitorNamespace = previousVisitorNamespace;
                
                // Copiamos las antiguas eVars
/*
                var idProp;
                for(i in previousS) {
                    if(i.indexOf("eVar")==0) {
                        s[i] = previousS[i];
                    }
                }
*/
                 // Copiamos las antiguas eVars y hacemos la traducción de alias a su valor dinámico
                var idProp;
                for(i in previousS) {
                    if (i.indexOf("eVar") == 0) {
                        if (typeof previousS[i] === 'string') {
                            if (previousS[i] != undefined && previousS[i].indexOf("D=c") == 0 || previousS[i] != undefined && previousS[i].indexOf("D=pageName") == 0) {
                                if (previousS[i].indexOf("D=ch") == 0) {
                                    /*en caso de recibir el canal*/
                                    s[i] = previousS.channel;
                                } else {
                                    if (previousS[i].indexOf("D=pageName") == 0) {
                                        /*en caso de recibir pageName*/
                                        s[i] = previousS.pageName;
                                    } else {

                                        idProp = previousS[i].substring(3);
                                        s[i] = previousS["prop" + idProp];
                                    }

                                }
                            }else {
                                s[i] = previousS[i];
                            }
                        }

                    }
                }

                // Conversión de evento a events en la suite de omniture
                trackEvents = eventMap.events;
                if(eventMap.events.length>0) {
                    s.linkTrackVars += "events";
                    
                    for(i in trackEvents) {
                        s.linkTrackEvents += "," + trackEvents[i];
                        s.events += "," + trackEvents[i];
                    }
                }
                
                for(i in this._dataDynamic){
                    dataMap[this._dataDynamic[i].name] = this._dataDynamic[i].value;
                    data[this._dataDynamic[i].name] = "data." + this._dataDynamic[i].value;
                }

                // Conversión de datos a variables en la suite de omniture
                trackVars = eventMap.vars;
                for(i in trackVars) {
                    
                    s.linkTrackVars += "," + trackVars[i];

                    if(typeof(dataMap[trackVars[i]])!="undefined") {
                        if(typeof(data[dataMap[trackVars[i]]])!="undefined")
                        {
                            //NOTA IMPORTANTE: Para el caso concreto de la evar38, cuyo dataMap es data.idTop no lo pasamos a minúsculas
                            if (dataMap[trackVars[i]] == OmniturePlugin.DATA_IDTOP){s[trackVars[i]] = data[dataMap[trackVars[i]]]}
                            else{s[trackVars[i]] = (typeof(data[dataMap[trackVars[i]]]) == "string")?data[dataMap[trackVars[i]]].toLowerCase():data[dataMap[trackVars[i]]];}
                        } else {

                            //-- En caso de que recibamos algo que no sea un String
                            if (typeof (dataMap[trackVars[i]]) == 'string') {

                                if (dataMap[trackVars[i]].indexOf("data.") != -1) {
                                    s[trackVars[i]] = ""; //Si no hay valor mandamos un blanco
                                }
                                else {
                                    s[trackVars[i]] = dataMap[trackVars[i]]; //Si no hay valor mandamos un blanco}
                                }
                            } else {
                                s[trackVars[i]] = "";
                            }

                            //s[trackVars[i]] = dataMap[trackVars[i]].toLowerCase();
                        }
                    }
                }
			
                if(s.linkTrackEvents.indexOf(",")==0) {s.linkTrackEvents = s.linkTrackEvents.substr(1);}
                if(s.linkTrackVars.indexOf(",")==0) {s.linkTrackVars = s.linkTrackVars.substr(1);}


                //Traducción de ALIAS en s_code
               /* var idProp;
                for(i in s) {
                    if((i.indexOf("eVar")==0) &&  (s[i].indexOf("D=c") == 0)){
                        idProp = s[i].substring(3);
                        s[i] = previousS["prop" + idProp];
                    }
                }*/


                s.tl(true, 'o', event);

                // Deshacemos los cambios realizados sobre las variables de Omniture
                // y eliminamos las variables que hemos creado para el evento
                s.visibleAlias =
                s = s_gi(previousTrackSuites);

                s.linkTrackVars = previousTrackVars;
                s.linkTrackEvents = previousTrackEvents;
                s.events = previousEvents;
                s.usePlugins = previousUsePlugins;
	
                for(i in trackVars) {
                                        
                    if(typeof(dataMap[trackVars[i]])!="undefined" && 
                        typeof(data[dataMap[trackVars[i]]])!="undefined") {
                        
                        delete s[trackVars[i]];
                        
                    }
                }             
            }
        };
        
        /**
         * Crea una nueva regla de mapeo para un evento
         * @param name Nombre del evento
         * @param events Eventos que se deben registrar en la suite de omniture
         * @param vars Variables que se deben registrar en la suite de omniture
         * @param suites Cuentas en las que se debe registrar la acción
         */
         this.addEventMapping = function(name, events, vars, suites) {

             if((window.mm_suites_pre!=undefined)&&(window.mm_suites_pre==true)){
                 suites = _SUITES_PRE;
             }

            _eventMappings[name] = {events: events.split(","), vars: vars.split(","), suites:suites};
         };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.OmniturePlugin = OmniturePlugin;

})(psd.statistics.plugins);(function(namespace) {

    // Inheritance class
    ComscorePlugin.prototype = new psd.statistics.TrackingPlugin();
	
    // Construct
    function ComscorePlugin() 
    {
		// Super
        psd.statistics.TrackingPlugin.call(this);
	
        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.ComscorePlugin";
		
        
		//constantes
		var assocEvents = {	"ON_PLAY" : "onPlay",
							"ON_PAUSE" : "onPause",
							"ON_STOP" : "onStop",
							"ON_AD_PLAY" : "onAdPlay",
							"ON_AD_STOP" : "onAdStop"};
		
		var _streamSense;
		
		var _data = {};
		var settings;
		var settingsUrl;
		
		var _configParser;
		var _configMediator;
		
		var parserResult;		
		
		var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);
        };
		
		// Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTI�N DEL ERROR DE LECTURA
            //console.log("MEDIATE ERROR");
            //console.log(evt.result.msg);
        };
		
		// Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            parserResult = evt.result.parserResult;            
			
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTI�N DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
		
		var _importObjectConfiguration = function(_settings) {
				
			settings = _settings;
		
			this.loadDynamics(settings);
		
            if(typeof(settings.config)!="undefined")
            {   	
				_streamSense = new ns_.StreamSense({},settings.config.pixelURL);
				
				_playlistLabels = {};
				
				for(i in settings.config.dataMappingPlayList){
					_name = settings.config.dataMappingPlayList[i].name;
					_value = settings.config.dataMappingPlayList[i].value;
					
					_playlistLabels[_name] = _value;
				}
				_streamSense.setPlaylist(_playlistLabels);
			}
			
			mapping = settings.config.dataMapping;
			
			if(Object.prototype.toString.call(mapping)=="[object Array]"){

                for(i=0;i<mapping.length;i++) {
					if(typeof(mapping[i])!="undefined" &&
						typeof(mapping[i].name)!="undefined" &&
						typeof(mapping[i].value)!="undefined") {

						this.addDataMapping(mapping[i].name, 
											mapping[i].value);
					}
				}
            }
		}
		
		/**
         * Importa la librer�a libraryManager y al completar la carga se llama a la funci�n que importa la configuraci�n del plugin
         * @param settings String con la url a un json de configuraci�n o un 
         *                 objeto de configuraci�n 
         */
        this.setup = function(settings) {

			settingsUrl = settings;
		
			var dependencesUrls = [];
			dependencesUrls.push("http://www.prisacom.com/psdmedia/resources/js/ext/comscore/streamsense.min.js");
		
			var libraryParams = {depends: dependencesUrls
				, success: onDependencesComplete
				, error: onDependencesError
				, scope: this
			};
			
			LibraryManager.load(libraryParams);
		}
		
		/**
         * Importa la configuraci�n de un fichero remoto o un objeto local
		 */
		var onDependencesComplete = function() 
		{
			_configParser = new psd.framework.parser.JSONParser();
			_configMediator = new psd.framework.Mediator();
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);       
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
			
			_importRemoteConfiguration.apply(this, [settingsUrl]);
		}	

		var onDependencesError = function() {
		}
		
		/**
         * Realiza el seguimiento de un evento en la aplicaci�n
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general ser� "custom", pero tambi�n se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de car�cter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function(event, type, data) {
			_data = data;
			
			position = 0;
			labels = {};
			
			profileData = this.dataMap();
			
			for(i in settings.config.dataMapping){

				_name = settings.config.dataMapping[i].name;
				_value = settings.config.dataMapping[i].value;
				
				if(profileData[_name]!=undefined)
					labels[_name] = profileData[_name];
				
				{		
					if(_value.indexOf("data.")>-1){
						valueAux = _value.slice("data.".length,_value.length);
						labels[_name] = data[_value];
						
						if(labels[_name]==undefined){
							labels[_name] = profileData[_name];
						}
					}
					else{
						if(_value == "TITLE"){
							labels[_name] = document.title;
						}
						else{
							if(_value.indexOf("datadyn.")>-1){
								valueAux = _value.slice("datadyn.".length,_value.length);
								labels[_name] = this.getDynValue(valueAux);
							}
							else{
								labels[_name] = _value;
							}
						}
					}
				}
			}
			_streamSense.setClip(labels, 1);
	
			assocEvent = undefined;

			for(i in settings.config.events){
				if(settings.config.events[i].name==event){
					assocEvent = settings.config.events[i].value;
				}
			}

			if(assocEvent!=undefined){
				
				switch(assocEvent){

					case "ON_PLAY":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.PLAY,{"ns_st_ad":false},0);
					break;
					case "ON_PAUSE":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.PAUSE,{"ns_st_ad":false},0);
					break;
					case "ON_STOP":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.END,{"ns_st_ad":false},0);
					break;
					case "ON_AD_PLAY":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.AD_PLAY,{"ns_st_ad":true},0);
					break;
					case "ON_AD_STOP":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.AD_END,{"ns_st_ad":true},0);
					break;
					default:
					break;
				}
			}
		}
	
		this.clearDataDynamic = function(){
			for(i in this._dataDynamic){
				this._dataDynamic[i].value = "";
			}
		}

		this.getDynValue = function(_name){
			for(i in this._dataDynamic){
				if(this._dataDynamic[i].name==_name)
					return this._dataDynamic[i].value;
			}

			return "";
		}
	}
	
	namespace.ComscorePlugin = ComscorePlugin;
		
})(psd.statistics.plugins);
(function(namespace) {

    // Inheritance class
    ComscoreVideoPlugin.prototype = new psd.statistics.TrackingPlugin();

    // Construct
    function ComscoreVideoPlugin() 
    {
        // Super
        psd.statistics.TrackingPlugin.call(this);

        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.ComscoreVideoPlugin";
		
		var _data = {};
		var settings;
		var settingsUrl;
		
		var eventMap = {'adStart':'01', 'mediaBegin':'03'}
		
		var _configParser;
		var _configMediator;
		
		var parserResult;		
        //TODOjc
        var _myStreamingTag = '';
        var _idC2 = '';
        var _myDataConf = [];
        var _flagOnPlay = false;
        var _videoFinalizado = false;
				
		var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);
        };
		
		// Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTI�N DEL ERROR DE LECTURA
            //console.log("MEDIATE ERROR");
            //console.log(evt.result.msg);
        };
		
		// Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
					
            parserResult = evt.result.parserResult;            
			
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTI�N DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
		
		var _importObjectConfiguration = function(_settings) {
			settings = _settings;
            this._myDataConf = [];

            //TODOjc
            //ya tenemos la configuración, asi que creamos la instancia a conscore
            if(typeof(settings) != "undefined" && typeof(settings.config) != "undefined" && typeof(settings.config.dataMapping) != "undefined" && typeof(settings.config.dataMapping) == "object"){
                for(var i in settings.config.dataMapping){
                    this._myDataConf[settings.config.dataMapping[i].name] = settings.config.dataMapping[i].value;
                    if(settings.config.dataMapping[i].name == 'C2'){
                        this._idC2 = settings.config.dataMapping[i].value;
                    }
                }
            }
		}
		
		/**
         * Importa la configuraci�n de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuraci�n o un 
         *                 objeto de configuraci�n 
         */
        this.setup = function(settings) {

			settingsUrl = settings;
		
            //TODOjc
            _configParser = new psd.framework.parser.JSONParser();
            
            _configMediator = new psd.framework.Mediator();
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);       
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);

            _importRemoteConfiguration.apply(this, [settingsUrl]);
		}
		
        this.track = function(event, type, data) {
            if(typeof this._myDataConf == 'undefined'){
                //muy rara vez se tarda mas en cargar la configuracion.
                return;
            }
            if(typeof(eventMap[event]) != 'undefined') {
                this._myDataConf['C5'] = eventMap[event];
            }

            if(event == 'adStart' || event =='mediaBegin'){
                if(this._videoFinalizado) {
                    if((event == 'adStart') && (data['data.adposition'] == 'postroll')){
                        //está marcado como finalizado pero debemos esperar que termine la publi final.
                    } else {
                        //siempre debe usar un objeto nuevo
                        delete this._myStreamingTag;
                    }
                }

                if(typeof(this._myStreamingTag) != 'object'){
                    if(typeof(this._idC2) == 'string'){
                        this._myStreamingTag = new ns_.StreamingTag({ customerC2: this._idC2 });
                    }
                }
            }

            //TODOjc
            //si por algún motivo no se ha creado la instancia, no continua
            if(typeof(this._myStreamingTag) != 'object')
                return;

            //TODOjc
            var _comscoreValues = {
                ns_st_ci : typeof(data['data.idTop'])!='undefined'?data['data.idTop']:'*null', //Content Asset ID
                ns_st_cl : typeof(data['data.duration'])!='undefined'?data['data.duration']:'*null',       // Clip Length
                ns_st_st : '*null',                  // Station Title
                //ns_st_pu : typeof(data['data.adName'])!='undefined'?data['data.adName']:'*null', // Publisher Brand Name
                ns_st_pu : 'PRISA', // Publisher Brand Name
                ns_st_pr : typeof(data['data.nombrePrograma'])!='undefined'?data['data.nombrePrograma']:'*null', // Program Title
                ns_st_ep : typeof(data['data.name'])!='undefined'?data['data.name']:'*null', // Episode Title
                ns_st_sn : '*null',                  // Episode Season Number
                ns_st_en : '*null',                  // Episode Number
                ns_st_ge : '*null',                  // Content Genre
                ns_st_ti : '*null',                  // TMS ID (unavailable)
                ns_st_ia : '*null',                  // Identical Ad Assignment Flag
                ns_st_ce : '*null',                  // Complete Episode Flag
                ns_st_ddt : '*null',                 // Digital Air Date
                ns_st_tdt : '*null',                 // TV Air Date
                c3 :  '*null',                       // Dictionary Classification Value
                c4 :  '*null',                       // Unused Dictionary Classification Value
                c6 :  '*null'                        // Unused Dictionary Classification Value
            };
            if(_comscoreValues.ns_st_pr == ''){
                _comscoreValues.ns_st_pr = '*null';
            }
            //añadimos los valores que vengan en el fichero de configuración.
            for(var i in this._myDataConf){
                if(typeof(i) == 'string')
                    if(i.toLowerCase() != 'c5' && i.toLowerCase() != 'c10'){
                        _comscoreValues[i.toLowerCase()] = (this._myDataConf[i] == "") ? "*null" : this._myDataConf[i];
                    }
            }

            switch(event){
                case 'adStart' :
                    switch(data['data.adposition']) {
                        case "preroll":
                            this._myStreamingTag.playVideoAdvertisement({ ns_st_cl: data['data.duration'] }, ns_.StreamingTag.AdType.LinearOnDemandPreRoll);
                        break;
                        case "postroll":
                            this._myStreamingTag.playVideoAdvertisement({ ns_st_cl: data['data.duration'] }, ns_.StreamingTag.AdType.LinearOnDemandPostRoll);
                        break;
                        default:
                            this._myStreamingTag.playVideoAdvertisement({ ns_st_cl: data['data.duration'] }, ns_.StreamingTag.AdType.LinearOnDemandMidRoll);
                    }
                    this._flagOnPlay = false;
                    break;
                case 'adComplete':
                case 'adSkip':
                case 'adError':
                case 'mediaComplete':
                case 'mediaPause':
                    if(event == 'mediaComplete'){
                        this._videoFinalizado = true;
                    }
                    this._myStreamingTag.stop();
                    this._flagOnPlay = false;
                    break;
                case 'mediaBegin':
                case 'mediaResume':
                    if(!this._flagOnPlay) {
                        this._myStreamingTag.playVideoContentPart(_comscoreValues, ns_.StreamingTag.ContentType.LongFormOnDemand);
                        this._flagOnPlay = true;
                    }
                    break;

            }
		}
	}
	
	namespace.ComscoreVideoPlugin = ComscoreVideoPlugin;
		
})(psd.statistics.plugins);
(function(namespace) {

    // Inheritance class
    LogTrustPlugin.prototype = new psd.statistics.TrackingPlugin();

    // Construct
    function LogTrustPlugin()
    {
        // Super
        psd.statistics.TrackingPlugin.call(this);

        /**
         * className psd.statistics.LogTrustPlugin
         */
        this.className = "psd.statistics.LogTrustPlugin";

        //////////////////////////////////////////////////////////

        //--Captura el medio en caso de ser necesario

        var varMedio = "i3";
        var indexMedio = false;
        var urlMedio = window.location.href;

        var urlDecodi = function () {

            if (urlMedio.indexOf("medio=") > 0) {

                indexMedio = true;//--Marcar medio como unidad de negocio

                var indexTotal = urlMedio.length;
                var indexID = urlMedio.indexOf("medio=");
                var medioValue = urlMedio.substring(indexID + 6, indexTotal);

                return medioValue;

            }else{

                return false;
            }

        };



        //////////////////////////////////////////////////////////

        //URl y envio de pixel

        var hostURL = window.document.location.href;

        //var hostURLDetector = (hostURL.indexOf('https')>0) ? 'https://' : 'http://';                                      //Comprobar si va por SSL
        var hostURLDetector = '//';

        var logtrustURL = hostURLDetector + "tracking.logtrust.io/pixel/ffduH8fQryYdIkaE0A0YSQ.gif";

        //var objImagen = new Image(); //-- sistema de envio antiguo


        //.............


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Mapa de eventos que gestiona el plugin
        var _eventMappings = {};

        // Importa la configuración del plugin a partir de un objeto de configuración.
        // El objeto de configuración debe tener la siguiente estructura:
        //  OBJ
        //   |- config
        //        |---- [events] (Array)
        //                 |--------------- {name, events, vars, suites}
        //        |---- [dataMapping] (Array)
        //                 |--------------- {name, value}
        //
        // @param settings Objeto con la configuración que se quiere transferir.
        var _importObjectConfiguration = function(settings) {

            this.loadDynamics(settings);


            // Comprobamos que existe la propiedad principal "config"
            if(typeof(settings.config)!="undefined")
            {

                if (settings.config.pixelURL !== undefined) {
                    logtrustURL = hostURLDetector + settings.config.pixelURL; //--Pixel Logtrust

                }

                var events  = settings.config.events,
                    mapping = settings.config.dataMapping,
                    i, length;

                // Utilizamos la API pública addEventMapping() para importar
                // las definiciones de mapeo de eventos
                if(Object.prototype.toString.call(events)=="[object Array]"){

                    for(i=0;i<events.length;i++) {
                        if(typeof(events[i])!="undefined" &&
                            typeof(events[i].name)!="undefined" &&
                            typeof(events[i].events)!="undefined" &&
                            typeof(events[i].vars)!="undefined" &&
                            typeof(events[i].suites)!="undefined") {

                            this.addEventMapping(events[i].name,
                                events[i].events,
                                events[i].vars,
                                events[i].suites);
                        }
                    }
                }

                // Utilizamos la API pública addDataMapping() para importar
                // las definiciones de mapeo de datos
                if(Object.prototype.toString.call(mapping)=="[object Array]"){

                    for(i=0;i<mapping.length;i++) {
                        if(typeof(mapping[i])!="undefined" &&
                            typeof(mapping[i].name)!="undefined" &&
                            typeof(mapping[i].value)!="undefined") {

                            this.addDataMapping(mapping[i].name,
                                mapping[i].value);
                        }
                    }
                }
            }
        };

        // Carga la configuración del plugin a partir de un objeto de configuración
        // remoto. El fichero de configuración debe estar en formato JSON y tener la

        // @param url URL con la dirección del fichero de configuración.
        var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        // Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            var parserResult = evt.result.parserResult;

            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTIÓN DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };

        // Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTIÓN DEL ERROR DE LECTURA
            console.log("MEDIATE ERROR");
            console.log(evt.result.msg);
        };

        // Mediator para la carga de ficheros de configuración
        var _configMediator = new psd.framework.Mediator();
        _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);
        _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);

        // Parser para la carga de ficheros de configuración
        var _configParser = new psd.framework.parser.JSONParser();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Importa la configuración de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuración o un
         *                 objeto de configuración
         */
        this.setup = function(settings) {

            var settingsType = Object.prototype.toString.call(settings);

            // Iniciamos la carga remota si el parámetro es un String, o la carga
            // local si e
            // l parámetro es un Object
            if(settingsType=="[object String]") {
                _importRemoteConfiguration.apply(this, [settings]);
            } else if(settingsType=="[object Object]") {
                _importObjectConfiguration.apply(this, [settings]);
            }


            if((typeof(s)==="undefined") && (typeof(s_gi)!=="undefined"))
                s = s_gi("");
        };

        /**
         * Realiza el seguimiento de un evento en la aplicación
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general será "custom", pero también se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de carácter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function (event, type, data) {
           //console.log("***LogTrust OK****");
           //console.log("***data-->",data);
           //console.log("***Type-->",type);
           //console.log("***datamap-->",this.dataMap());
            eventMap = _eventMappings[event];
           //console.log("***Eventos-->",eventMap);


            var _mapaData = data;

            var _mapaDataMap = this.dataMap();

            var varRes0, varRes1, varAux0, varAux1, varAux2;
            var sendlogTrust = {};//obj envio de variables
            var sendlogTrustEnvio = {}; //obj envio de variables restringidas
            var sizeString = 0;
            var totalSizeString = 0;

            var secondConversion = 'i2'; //--variable a convertir en segundos

            var dataVar = [
                "data.name",//--TopPlayer //--s.pageName
                "data.duration",//--TopPlayer
                "data.mediaType",//--TopPlayer
                "data.channelSection",//--s.prop30
                "data.topPageTitle",//--Título de la pagina = s.prop45 *
                "data.trafficsource",//--document.referrer *
                "data.adposition",//--TopPlayer
                "data.channel",//--s.prop17
                "data.uid",//--s.prop34
                "data.domain",//--s.prop20
                "data.idTop",//--TopPlayer
                "data.channelSubsection",//--s.prop31
                "data.status",//--- status
                "data.uidPAIS",//---userID PAIS
                "data.channelPAIS",//--s.channel
                "data.trafficsourcePAIS",//-- referrer
                "data.sentAd"


            ];

            /* Comprobacion de eventmap */
            if (typeof (_eventMappings[event]) != "undefined") {

                eventMap = _eventMappings[event];
                pixelSend();

            }


            function pixelSend() {

                //--Capturando objetos globales


                //---Variables para medios compatibles


                if (typeof (s) != "undefined") {

                    //if (s.pageName !== undefined && s.pageName != "") {
                    //
                    //    _mapaData[dataVar[0]] = s.pageName;
                    //}

                    //-- Conversion de milisegundos a segundos



                    if (s.prop30 !== undefined && s.prop30 != "") {

                        _mapaData[dataVar[3]] = s.prop30;
                    }


                    if (s.prop17 !== undefined && s.prop17 != "") {

                        _mapaData[dataVar[7]] = s.prop17;
                    }

                    if (s.prop34 !== undefined && s.prop34 != "") {

                        _mapaData[dataVar[8]] = s.prop34;
                    }


                    if (s.prop20 !== undefined && s.prop20 != "") {

                        _mapaData[dataVar[9]] = s.prop20;
                    } else {

                        _mapaData[dataVar[9]] = location.hostname.replace(/www./gi, "");
                    }


                    if (s.prop31 !== undefined && s.prop31 != "") {

                        _mapaData[dataVar[11]] = s.prop31;
                    }


                    if (s.channel !== undefined && s.channel != "") {
                        _mapaData[dataVar[14]] = s.channel;
                    }

                } else {

                    // console.log(">>S_code desactivado")
                }


                //2016-10-21
                if(typeof(_mapaData['data.adEnabled'])!="undefined" && _mapaData['data.adEnabled'].toLowerCase() == 'true'){
                    _mapaData[dataVar[16]] = 'si';
                } else {
                    _mapaData[dataVar[16]] = 'no';
                }

                //--Referencias

                if (window.status !== undefined && window.status != "") {

                    _mapaData[dataVar[12]] = window.status;

                }

                if (window.userId !== undefined && window.userId != "") {

                    _mapaData[dataVar[13]] = window.userId;

                }

                if (window.referrer !== undefined && window.referrer != "") {

                    _mapaData[dataVar[15]] = window.referrer;

                }


                if (window.document.location.href != "") {
                    //_mapaData[dataVar[4]] = encodeURIComponent(window.document.title);
                    _mapaData[dataVar[4]] = window.document.title;
                }


                if (window.document.referrer != "") {
                    //_mapaData[dataVar[5]] = encodeURIComponent(window.document.referrer);
                    _mapaData[dataVar[5]] = window.document.referrer;
                }


                //****************Conversion de Datos***************


                //Configuracion de Eventos

                varAux0 = {};

                for (var c1 in _mapaData) {


                    varAux1 = c1;

                    //Configuracion de variables
                    for (var c2 in _mapaDataMap) {


                        varAux2 = _mapaDataMap[c2];

                        if (varAux1 == varAux2) {


                            sendlogTrust[c2] = _mapaData[c1];       //captura variables utiles

                            //totalSizeString++;

                            varAux0[c2] = _mapaDataMap[c2];



                            delete _mapaDataMap[c2];


                        } else if (varAux2.indexOf("data.") == -1) {


                            sendlogTrust[c2] = varAux2;           //Superponer variables "text."

                            //totalSizeString++;

                            varAux0[c2] = _mapaDataMap[c2];
                            delete _mapaDataMap[c2];

                        }


                    }

                }

                for (var c3 in varAux0) {

                    _mapaDataMap[c3] = varAux0[c3];  //-- Recupera datos para una nueva pasada

                }


                //--Restriccion de envio

                for (var r0 in sendlogTrust) {

                    varRes0 = r0;

                    for (var r1 in eventMap.vars) {

                        varRes1 = eventMap.vars[r1];

                        if (varRes0 == varRes1) {

                            totalSizeString++;

                            sendlogTrustEnvio[varRes1] = sendlogTrust[varRes0];


                            //--convirtiendo milisegundos en segundos
                            if (varRes1 == secondConversion) {
                                sendlogTrustEnvio[varRes1] = Math.round(sendlogTrustEnvio[varRes1] / 1000);
                            }

                        }
                    }

                }


                //--Composicion y envio de datos

                (function () {

                    var stringConversion = "";

                    var TimeRandom = new Date();

                    var compoURL = "?event=" + eventMap.events[0] + "&";


                    for (var c3 in sendlogTrustEnvio) {

                        sizeString++;

                        stringConversion = String(sendlogTrustEnvio[c3]);

                        if (stringConversion != "") {      //--comprobar campo vacio


                            if (urlDecodi()) {  //-- Codificando en caso de recibir el parametro del iframe


                                if (c3 == varMedio) {
                                    sendlogTrustEnvio[c3] = urlDecodi();
                                }
                            }


                            compoURL += c3 + "=" + encodeURIComponent(sendlogTrustEnvio[c3]);

                            if (sizeString != totalSizeString) {
                                compoURL += "&";
                            } else {
                                compoURL += "&rnd=" + TimeRandom.getTime() + "_" + Math.floor((Math.random() * 1000) + 1);
                            }
                        }
                    }
                    /*objImagen.src = logtrustURL + compoURL;*/

                    ////////////////////////////////MÉTODO 1//////////////////////////////////////////
                    var url= logtrustURL + compoURL; //url, petición del pixel;

                    var preloadPictures = function(pictureUrls, callback) {
                        var i,
                            j,
                            loaded = 0;
                        //a este for lo uso para eliminar todas las urls que vienen en el primero parámetro de la función.(actualmente solo viene 1)
                        for (i = 0, j = pictureUrls.length; i < j; i++) {
                            //clousure para mantener la cola de urls (si las hubiera)

                            (function (img, src) {
                                img.onload = function () {
                                    if (++loaded == pictureUrls.length && callback) {
                                        callback();
                                    }
                                };
                                //Para depurar los errores
                                img.onerror = function () {};
                                img.onabort = function () {};

                                img.src = src;
                            } (new Image(), pictureUrls[i]));
                        }
                    };
                    ////El primer parámetro tiene un arreglo, por si quiero envíar a más direcciones, quizás en el futuro nos venga bien.
                    preloadPictures([url], function () {
                        //console.log("envió el objeto con éxito.");
                    });
                    ///////////////////FIN MÉTODO 1////////////////////////////////////////////////
                }())//--Envio


                //****************Fin de Conversion de Datos********

            }
        }




        /**
         * Crea una nueva regla de mapeo para un evento
         * @param name Nombre del evento
         * @param events Eventos que se deben registrar en la suite de omniture
         * @param vars Variables que se deben registrar en la suite de omniture
         * @param suites Cuentas en las que se debe registrar la acción
         */
        this.addEventMapping = function (name, events, vars, suites) {
            //*****%%
            _eventMappings[name] = {events: events.split(","), vars: vars.split(","), suites: suites};

        };


        //.............

    }

    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.LogTrustPlugin = LogTrustPlugin;

})(psd.statistics.plugins);
(function(namespace) {
	
    // Inheritance class
    StatEvent.prototype = new psd.framework.Event();

    StatEvent.DATA_REQUIRED_STATISTICS = "dataRequired";
    
    this.data = null;
	this.dataAsync = null;
	this.plugin = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function StatEvent(type, dataAsync, data, plugin) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
		this.dataAsync = dataAsync;
		this.plugin = plugin;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.media	
    namespace.StatEvent = StatEvent;

})(psd.statistics);