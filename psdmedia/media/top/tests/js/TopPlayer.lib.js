(function(window) 
{
    // Generacion del namespace psd.media
    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.top==undefined) { window.emic.top = {}; }
    if(window.emic.top.media==undefined) { window.emic.top.media = {}; }
    if(window.emic.top.event==undefined) { window.emic.top.event = {}; }
    if(window.emic.top.ui==undefined) { window.emic.top.ui = {}; }
    if(window.emic.top.ui.skins==undefined) { window.emic.top.ui.skins = {}; }
    if(window.emic.top.ui.skins.fenix==undefined) { window.emic.top.ui.skins.fenix = {}; }
})(window);/*!
 * VERSION: beta 1.27
 * DATE: 2012-05-24
 * JavaScript
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(m){var E=function(a){var a=a.split("."),c=m,b;for(b=0;b<a.length;b++)c[a[b]]=c=c[a[b]]||{};return c},l=E("com.greensock"),n,j,d,y,u={},B=function(a,c,b,i){this.sc=u[a]?u[a].sc:[];u[a]=this;this.gsClass=null;this.def=b;var e=c||[],d=[];this.check=function(c){for(var g=e.length,f=0,j;-1<--g;)(j=u[e[g]]||new B(e[g])).gsClass?d[g]=j.gsClass:(f++,c&&j.sc.push(this));if(0===f&&b){var c=("com.greensock."+a).split("."),g=c.pop(),l=E(c.join("."))[g]=this.gsClass=b.apply(b,d);i&&((m.GreenSockGlobals|| m)[g]=l,"function"===typeof define&&define.amd?define((m.GreenSockAMDPath?m.GreenSockAMDPath+"/":"")+a.split(".").join("/"),[],function(){return l}):"undefined"!==typeof module&&module.exports&&(module.exports=l));for(g=0;g<this.sc.length;g++)this.sc[g].check(!1)}};this.check(!0)},p=l._class=function(a,c,b){new B(a,[],function(){return c},b);return c};m._gsDefine=function(a,c,b,i){return new B(a,c,b,i)};var F=[0,0,1,1],C=[],q=p("easing.Ease",function(a,c,b,i){this._func=a;this._type=b||0;this._power= i||0;this._params=c?F.concat(c):F},!0);d=q.prototype;d._calcEnd=!1;d.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var c=this._type,b=this._power,i=1===c?1-a:2===c?a:0.5>a?2*a:2*(1-a);1===b?i*=i:2===b?i*=i*i:3===b?i*=i*i*i:4===b&&(i*=i*i*i*i);return 1===c?1-i:2===c?i:0.5>a?i/2:1-i/2};n=["Linear","Quad","Cubic","Quart","Quint"];for(j=n.length;-1<--j;)d=p("easing."+n[j],function(){},!0),y=p("easing.Power"+j,function(){},!0),d.easeOut=y.easeOut=new q(null, null,1,j),d.easeIn=y.easeIn=new q(null,null,2,j),d.easeInOut=y.easeInOut=new q(null,null,3,j);p("easing.Strong",l.easing.Power4,!0);l.easing.Linear.easeNone=l.easing.Linear.easeIn;d=p("events.EventDispatcher",function(a){this._listeners={};this._eventTarget=a||this}).prototype;d.addEventListener=function(a,c,b,i,e){var e=e||0,d=this._listeners[a],h=0,g;null==d&&(this._listeners[a]=d=[]);for(g=d.length;-1<--g;)a=d[g],a.c===c?d.splice(g,1):0===h&&a.pr<e&&(h=g+1);d.splice(h,0,{c:c,s:b,up:i,pr:e})};d.removeEventListener= function(a,c){var b=this._listeners[a];if(b)for(var i=b.length;-1<--i;)if(b[i].c===c){b.splice(i,1);break}};d.dispatchEvent=function(a){var c=this._listeners[a];if(c)for(var b=c.length,i,d=this._eventTarget;-1<--b;)i=c[b],i.up?i.c.call(i.s||d,{type:a,target:d}):i.c.call(i.s||d)};var z=m.requestAnimationFrame,A=m.cancelAnimationFrame,G=Date.now||function(){return(new Date).getTime()};n=["ms","moz","webkit","o"];for(j=n.length;-1<--j&&!z;)z=m[n[j]+"RequestAnimationFrame"],A=m[n[j]+"CancelAnimationFrame"]|| m[n[j]+"CancelRequestAnimationFrame"];A||(A=function(a){m.clearTimeout(a)});p("Ticker",function(a,c){this.frame=this.time=0;var b=this,i=G(),d=!1!==c,k,h,g,f,j;this.tick=function(){b.time=(G()-i)/1E3;if(!k||b.time>=j)b.frame++,j=b.time+f-(b.time-j)-5.0E-4,j<=b.time&&(j=b.time+0.001),b.dispatchEvent("tick");g=h(b.tick)};this.fps=function(a){if(!arguments.length)return k;k=a;f=1/(k||60);j=this.time+f;h=0===k?function(){}:!d||!z?function(a){return m.setTimeout(a,1E3*(j-b.time)+1>>0||1)}:z;A(g);g=h(b.tick)}; this.useRAF=function(a){if(!arguments.length)return d;d=a;this.fps(k)};this.fps(a)});d=l.Ticker.prototype=new l.events.EventDispatcher;d.constructor=l.Ticker;var o=p("core.Animation",function(a,c){this.vars=c||{};this._duration=this._totalDuration=a||0;this._delay=Number(this.vars.delay)||0;this._timeScale=1;this._active=!0==this.vars.immediateRender;this.data=this.vars.data;this._reversed=!0==this.vars.reversed;if(r){var b=this.vars.useFrames?v:r;b.insert(this,b._time);this.vars.paused&&this.paused(!0)}}), s=o.ticker=new l.Ticker;d=o.prototype;d._dirty=d._gc=d._initted=d._paused=!1;d._totalTime=d._time=0;d._rawPrevTime=-1;d._next=d._last=d._onUpdate=d._timeline=d.timeline=null;d._paused=!1;d.play=function(a,c){arguments.length&&this.seek(a,c);this.reversed(!1);return this.paused(!1)};d.pause=function(a,c){arguments.length&&this.seek(a,c);return this.paused(!0)};d.resume=function(a,c){arguments.length&&this.seek(a,c);return this.paused(!1)};d.seek=function(a,c){return this.totalTime(Number(a),!1!=c)}; d.restart=function(a,c){this.reversed(!1);this.paused(!1);return this.totalTime(a?-this._delay:0,!1!=c)};d.reverse=function(a,c){arguments.length&&this.seek(a||this.totalDuration(),c);this.reversed(!0);return this.paused(!1)};d.render=function(){};d.invalidate=function(){return this};d._enabled=function(a,c){this._gc=!a;this._active=a&&!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration;!0!=c&&(a&&null==this.timeline?this._timeline.insert(this,this._startTime-this._delay):!a&&null!= this.timeline&&this._timeline._remove(this,!0));return!1};d._kill=function(){return this._enabled(!1,!1)};d.kill=function(a,c){this._kill(a,c);return this};d._uncache=function(a){for(a=a?this:this.timeline;a;)a._dirty=!0,a=a.timeline;return this};d.eventCallback=function(a,c,b,i){if(null==a)return null;if("on"===a.substr(0,2)){if(1===arguments.length)return this.vars[a];if(null==c)delete this.vars[a];else if(this.vars[a]=c,this.vars[a+"Params"]=b,this.vars[a+"Scope"]=i,b)for(var d=b.length;-1<--d;)"{self}"=== b[d]&&(b=this.vars[a+"Params"]=b.concat(),b[d]=this);"onUpdate"===a&&(this._onUpdate=c)}return this};d.delay=function(a){if(!arguments.length)return this._delay;this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay);this._delay=a;return this};d.duration=function(a){if(!arguments.length)return this._dirty=!1,this._duration;this._duration=this._totalDuration=a;this._uncache(!0);this._timeline.smoothChildTiming&&this._active&&0!=a&&this.totalTime(this._totalTime*(a/this._duration), !0);return this};d.totalDuration=function(a){this._dirty=!1;return!arguments.length?this._totalDuration:this.duration(a)};d.time=function(a,c){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();a>this._duration&&(a=this._duration);return this.totalTime(a,c)};d.totalTime=function(a,c){if(!arguments.length)return this._totalTime;if(this._timeline){0>a&&(a+=this.totalDuration());if(this._timeline.smoothChildTiming&&(this._dirty&&this.totalDuration(),a>this._totalDuration&&(a=this._totalDuration), this._startTime=(this._paused?this._pauseTime:this._timeline._time)-(!this._reversed?a:this._totalDuration-a)/this._timeScale,this._timeline._dirty||this._uncache(!1),!this._timeline._active))for(var b=this._timeline;b._timeline;)b.totalTime(b._totalTime,!0),b=b._timeline;this._gc&&this._enabled(!0,!1);this._totalTime!=a&&this.render(a,c,!1)}return this};d.startTime=function(a){if(!arguments.length)return this._startTime;a!=this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&& this.timeline.insert(this,a-this._delay));return this};d.timeScale=function(a){if(!arguments.length)return this._timeScale;a=a||1.0E-6;if(this._timeline&&this._timeline.smoothChildTiming){var c=this._pauseTime||0==this._pauseTime?this._pauseTime:this._timeline._totalTime;this._startTime=c-(c-this._startTime)*this._timeScale/a}this._timeScale=a;return this._uncache(!1)};d.reversed=function(a){if(!arguments.length)return this._reversed;a!=this._reversed&&(this._reversed=a,this.totalTime(this._totalTime, !0));return this};d.paused=function(a){if(!arguments.length)return this._paused;a!=this._paused&&this._timeline&&(!a&&this._timeline.smoothChildTiming&&(this._startTime+=this._timeline.rawTime()-this._pauseTime,this._uncache(!1)),this._pauseTime=a?this._timeline.rawTime():null,this._paused=a,this._active=!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration);this._gc&&(a||this._enabled(!0,!1));return this};l=p("core.SimpleTimeline",function(a){o.call(this,0,a);this.autoRemoveChildren= this.smoothChildTiming=!0});d=l.prototype=new o;d.constructor=l;d.kill()._gc=!1;d._first=d._last=null;d._sortChildren=!1;d.insert=function(a,c){a._startTime=Number(c||0)+a._delay;a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale);a.timeline&&a.timeline._remove(a,!0);a.timeline=a._timeline=this;a._gc&&a._enabled(!0,!0);var b=this._last;if(this._sortChildren)for(var d=a._startTime;b&&b._startTime>d;)b=b._prev;b?(a._next=b._next,b._next=a):(a._next= this._first,this._first=a);a._next?a._next._prev=a:this._last=a;a._prev=b;this._timeline&&this._uncache(!0);return this};d._remove=function(a,c){a.timeline===this&&(c||a._enabled(!1,!0),a.timeline=null,a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),this._timeline&&this._uncache(!0));return this};d.render=function(a,c){var b=this._first,d;for(this._totalTime=this._time=this._rawPrevTime=a;b;){d=b._next;if(b._active|| a>=b._startTime&&!b._paused)b._reversed?b.render((!b._dirty?b._totalDuration:b.totalDuration())-(a-b._startTime)*b._timeScale,c,!1):b.render((a-b._startTime)*b._timeScale,c,!1);b=d}};d.rawTime=function(){return this._totalTime};var f=p("TweenLite",function(a,c,b){o.call(this,c,b);if(null==a)throw"Cannot tween an undefined reference.";this.target=a;this._overwrite=null==this.vars.overwrite?H[f.defaultOverwrite]:"number"===typeof this.vars.overwrite?this.vars.overwrite>>0:H[this.vars.overwrite];if((a instanceof Array||a.jquery)&&"object"===typeof a[0]){this._targets=a.slice(0);this._propLookup=[];this._siblings=[];for(a=0;a<this._targets.length;a++)b=this._targets[a],b.jquery?(this._targets.splice(a--,1),this._targets=this._targets.concat(b.constructor.makeArray(b))):(this._siblings[a]=w(b,this,!1),1===this._overwrite&&1<this._siblings[a].length&&D(b,this,null,1,this._siblings[a]))}else this._propLookup={},this._siblings=w(a,this,!1),1===this._overwrite&&1<this._siblings.length&&D(a,this,null,1,this._siblings); (this.vars.immediateRender||0===c&&0===this._delay&&!1!=this.vars.immediateRender)&&this.render(0,!1,!0)},!0);d=f.prototype=new o;d.constructor=f;d.kill()._gc=!1;d.ratio=0;d._firstPT=d._targets=d._overwrittenProps=null;d._notifyPluginsOfEnabled=!1;f.version=12;f.defaultEase=d._ease=new q(null,null,1,1);f.defaultOverwrite="auto";f.ticker=s;var I=f._plugins={},t={},K=0,L={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1, onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,orientToBezier:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1},H={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},v=o._rootFramesTimeline=new l,r=o._rootTimeline=new l;r._startTime=s.time;v._startTime=s.frame;r._active=v._active=!0;o._updateRoot=function(){r.render((s.time- r._startTime)*r._timeScale,!1,!1);v.render((s.frame-v._startTime)*v._timeScale,!1,!1);if(!(s.frame%120)){var a,c,b;for(b in t){c=t[b].tweens;for(a=c.length;-1<--a;)c[a]._gc&&c.splice(a,1);0===c.length&&delete t[b]}}};s.addEventListener("tick",o._updateRoot);var w=function(a,c,b){var d=a._gsTweenID,e;if(!t[d||(a._gsTweenID=d="t"+K++)])t[d]={target:a,tweens:[]};if(c&&(a=t[d].tweens,a[e=a.length]=c,b))for(;-1<--e;)a[e]===c&&a.splice(e,1);return t[d].tweens},D=function(a,c,b,d,e){var k,h,g;if(1===d|| 4<=d){a=e.length;for(k=0;k<a;k++)if((g=e[k])!==c)g._gc||g._enabled(!1,!1)&&(h=!0);else if(5===d)break;return h}var f=c._startTime+1.0E-10,j=[],l=0,m;for(k=e.length;-1<--k;)if(!((g=e[k])===c||g._gc||g._paused))g._timeline!==c._timeline?(m=m||J(c,0),0===J(g,m)&&(j[l++]=g)):g._startTime<=f&&g._startTime+g.totalDuration()/g._timeScale+1.0E-10>f&&((0===c._duration||!g._initted)&&2.0E-10>=f-g._startTime||(j[l++]=g));for(k=l;-1<--k;)if(g=j[k],2===d&&g._kill(b,a)&&(h=!0),2!==d||!g._firstPT&&g._initted)g._enabled(!1, !1)&&(h=!0);return h},J=function(a,c){for(var b=a._timeline,d=b._timeScale,e=a._startTime;b._timeline;){e+=b._startTime;d*=b._timeScale;if(b._paused)return-100;b=b._timeline}e/=d;return e>c?e-c:!a._initted&&2.0E-10>e-c?1.0E-10:(e+=a.totalDuration()/a._timeScale/d)>c?0:e-c-1.0E-10};d._init=function(){this.vars.startAt&&(this.vars.startAt.overwrite=0,this.vars.startAt.immediateRender=!0,f.to(this.target,0,this.vars.startAt));var a,c;this._ease=this.vars.ease instanceof q?this.vars.easeParams instanceof Array?this.vars.ease.config.apply(this.vars.ease,this.vars.easeParams):this.vars.ease:"function"===typeof this.vars.ease?new q(this.vars.ease,this.vars.easeParams):f.defaultEase;this._easeType=this._ease._type;this._easePower=this._ease._power;this._firstPT=null;if(this._targets)for(a=this._targets.length;-1<--a;){if(this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],this._overwrittenProps?this._overwrittenProps[a]:null))c=!0}else c=this._initProps(this.target,this._propLookup, this._siblings,this._overwrittenProps);c&&f._onPluginEvent("_onInitAllProps",this);this._overwrittenProps&&null==this._firstPT&&"function"!==typeof this.target&&this._enabled(!1,!1);if(this.vars.runBackwards)for(a=this._firstPT;a;)a.s+=a.c,a.c=-a.c,a=a._next;this._onUpdate=this.vars.onUpdate;this._initted=!0};d._initProps=function(a,c,b,d){var e,k,h,g,f;if(null==a)return!1;for(e in this.vars){if(L[e]){if("onStartParams"===e||"onUpdateParams"===e||"onCompleteParams"===e||"onReverseCompleteParams"=== e||"onRepeatParams"===e)if(f=this.vars[e])for(k=f.length;-1<--k;)"{self}"===f[k]&&(f=this.vars[e]=f.concat(),f[k]=this)}else if(I[e]&&(g=new I[e])._onInitTween(a,this.vars[e],this)){this._firstPT={_next:this._firstPT,t:g,p:"setRatio",s:0,c:1,f:!0,n:e,pg:!0,pr:g._priority};for(k=g._overwriteProps.length;-1<--k;)c[g._overwriteProps[k]]=this._firstPT;if(g._priority||g._onInitAllProps)h=!0;if(g._onDisable||g._onEnable)this._notifyPluginsOfEnabled=!0}else this._firstPT=c[e]={_next:this._firstPT,t:a,p:e, f:"function"===typeof a[e],n:e,pg:!1,pr:0},this._firstPT.s=!this._firstPT.f?parseFloat(a[e]):a[e.indexOf("set")||"function"!==typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)](),this._firstPT.c="number"===typeof this.vars[e]?this.vars[e]-this._firstPT.s:"string"===typeof this.vars[e]?parseFloat(this.vars[e].split("=").join("")):0;this._firstPT&&this._firstPT._next&&(this._firstPT._next._prev=this._firstPT)}return d&&this._kill(d,a)?this._initProps(a,c,b,d):1<this._overwrite&&this._firstPT&&1<b.length&& D(a,this,c,this._overwrite,b)?(this._kill(c,a),this._initProps(a,c,b,d)):h};d.render=function(a,c,b){var d=this._time,e,f;if(a>=this._duration){if(this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(e=!0,f="onComplete"),0===this._duration){if(0===a||0>this._rawPrevTime)this._rawPrevTime!==a&&(b=!0);this._rawPrevTime=a}}else if(0>=a){this._totalTime=this._time=0;this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(0!==d||0===this._duration&& 0<this._rawPrevTime)f="onReverseComplete",e=this._reversed;0>a?(this._active=!1,0===this._duration&&(0<=this._rawPrevTime&&(b=!0),this._rawPrevTime=a)):this._initted||(b=!0)}else if(this._totalTime=this._time=a,this._easeType){var h=a/this._duration,g=this._easeType,j=this._easePower;if(1===g||3===g&&0.5<=h)h=1-h;3===g&&(h*=2);1===j?h*=h:2===j?h*=h*h:3===j?h*=h*h*h:4===j&&(h*=h*h*h*h);this.ratio=1===g?1-h:2===g?h:0.5>a/this._duration?h/2:1-h/2}else this.ratio=this._ease.getRatio(a/this._duration); if(this._time!==d||b){this._initted||(this._init(),!e&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration)));!this._active&&!this._paused&&(this._active=!0);if(0===d&&this.vars.onStart&&(0!==this._time||0===this._duration))c||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||C);for(a=this._firstPT;a;){if(a.f)a.t[a.p](a.c*this.ratio+a.s);else a.t[a.p]=a.c*this.ratio+a.s;a=a._next}this._onUpdate&&(c||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams|| C));f&&!this._gc&&(e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),c||this.vars[f]&&this.vars[f].apply(this.vars[f+"Scope"]||this,this.vars[f+"Params"]||C))}};d._kill=function(a,c){"all"===a&&(a=null);if(null==a&&(null==c||c==this.target))return this._enabled(!1,!1);var c=c||this._targets||this.target,b,d,e,f,h,g,j;if((c instanceof Array||c.jquery)&&"object"===typeof c[0])for(b=c.length;-1<--b;)this._kill(a,c[b])&&(h=!0);else{if(this._targets)for(b=this._targets.length;-1< --b;){if(c===this._targets[b]){f=this._propLookup[b]||{};this._overwrittenProps=this._overwrittenProps||[];d=this._overwrittenProps[b]=a?this._overwrittenProps[b]||{}:"all";break}}else{if(c!==this.target)return!1;f=this._propLookup;d=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(f)for(e in g=a||f,j=a!=d&&"all"!=d&&a!=f&&(null==a||!0!=a._tempKill),g){if(b=f[e]){b.pg&&b.t._kill(g)&&(h=!0);if(!b.pg||0===b.t._overwriteProps.length)b._prev?b._prev._next=b._next:b===this._firstPT&&(this._firstPT= b._next),b._next&&(b._next._prev=b._prev),b._next=b._prev=null;delete f[e]}j&&(d[e]=1)}}return h};d.invalidate=function(){this._notifyPluginsOfEnabled&&f._onPluginEvent("_onDisable",this);this._onUpdate=this._overwrittenProps=this._firstPT=null;this._initted=this._active=this._notifyPluginsOfEnabled=!1;this._propLookup=this._targets?{}:[];return this};d._enabled=function(a,c){if(a&&this._gc)if(this._targets)for(var b=this._targets.length;-1<--b;)this._siblings[b]=w(this._targets[b],this,!0);else this._siblings= w(this.target,this,!0);o.prototype._enabled.call(this,a,c);return this._notifyPluginsOfEnabled&&this._firstPT?f._onPluginEvent(a?"_onEnable":"_onDisable",this):!1};f.to=function(a,c,b){return new f(a,c,b)};f.from=function(a,c,b){b.runBackwards=!0;!1!=b.immediateRender&&(b.immediateRender=!0);return new f(a,c,b)};f.fromTo=function(a,c,b,d){d.startAt=b;b.immediateRender&&(d.immediateRender=!0);return new f(a,c,d)};f.delayedCall=function(a,c,b,d,e){return new f(c,0,{delay:a,onComplete:c,onCompleteParams:b, onCompleteScope:d,onReverseComplete:c,onReverseCompleteParams:b,onReverseCompleteScope:d,immediateRender:!1,useFrames:e,overwrite:0})};f.set=function(a,c){return new f(a,0,c)};f.killTweensOf=f.killDelayedCallsTo=function(a,c){for(var b=f.getTweensOf(a),d=b.length;-1<--d;)b[d]._kill(c,a)};f.getTweensOf=function(a){if(null!=a){var c,b,d;if((a instanceof Array||a.jquery)&&"object"===typeof a[0]){c=a.length;for(b=[];-1<--c;)b=b.concat(f.getTweensOf(a[c]));for(c=b.length;-1<--c;){d=b[c];for(a=c;-1<--a;)d=== b[a]&&b.splice(c,1)}}else{b=w(a).concat();for(c=b.length;-1<--c;)b[c]._gc&&b.splice(c,1)}return b}};var x=p("plugins.TweenPlugin",function(a,c){this._overwriteProps=(a||"").split(",");this._propName=this._overwriteProps[0];this._priority=c||0},!0);d=x.prototype;x.version=12;x.API=2;d._firstPT=null;d._addTween=function(a,c,b,d,e,f){var h;if(null!=d&&(h="number"===typeof d||"="!==d.charAt(1)?Number(d)-b:Number(d.split("=").join(""))))this._firstPT={_next:this._firstPT,t:a,p:c,s:b,c:h,f:"function"== typeof a[c],n:e||c,r:f},this._firstPT._next&&(this._firstPT._next._prev=this._firstPT)};d.setRatio=function(a){for(var c=this._firstPT,b;c;){b=c.c*a+c.s;c.r&&(b=b+(0<b?0.5:-0.5)>>0);if(c.f)c.t[c.p](b);else c.t[c.p]=b;c=c._next}};d._kill=function(a){if(null!=a[this._propName])this._overwriteProps=[];else for(var c=this._overwriteProps.length;-1<--c;)null!=a[this._overwriteProps[c]]&&this._overwriteProps.splice(c,1);for(c=this._firstPT;c;)null!=a[c.n]&&((c._next&&(c._next._prev=c._prev),c._prev)?(c._prev._next= c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),c=c._next;return!1};d._roundProps=function(a,c){for(var b=this._firstPT;b;){if(a[this._propName]||null!=b.n&&a[b.n.split(this._propName+"_").join("")])b.r=c;b=b._next}};f._onPluginEvent=function(a,c){var b=c._firstPT,d;if("_onInitAllProps"===a){for(var e,f,h,g;b;){g=b._next;for(e=f;e&&e.pr>b.pr;)e=e._next;(b._prev=e?e._prev:h)?b._prev._next=b:f=b;(b._next=e)?e._prev=b:h=b;b=g}b=c._firstPT=f}for(;b;)b.pg&&"function"===typeof b.t[a]&& b.t[a]()&&(d=!0),b=b._next;return d};x.activate=function(a){for(var c=a.length;-1<--c;)a[c].API===x.API&&(f._plugins[(new a[c])._propName]=a[c]);return!0};if(n=m._gsQueue){for(j=0;j<n.length;j++)n[j]();for(d in u)u[d].def||console.log("Warning: TweenLite encountered missing dependency: com.greensock."+d)}})(window);/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-applicationcache-canvas-canvastext-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-cssclassprefix:mod!
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(n.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),G(e,b,c))}function I(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in k;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){return!!a.openDatabase},r.indexedDB=function(){return!!H("indexedDB",a)},r.history=function(){return!!a.history&&!!history.pushState},r.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache};for(var J in r)A(r,J)&&(w=J.toLowerCase(),e[w]=r[J](),u.push((e[w]?"":"no-")+w));return e.input||I(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" mod-"+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" mod-js mod-"+u.join(" mod-"):""),e}(this,this.document);(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.framework==undefined) { window.psd.framework = {}; }
    if(window.psd.framework.events==undefined) { window.psd.framework.events = {}; }
    if(window.psd.framework.parser==undefined) { window.psd.framework.parser = {}; }
    if(window.psd.framework.mediator==undefined) { window.psd.framework.mediator = {}; }
    if(window.psd.framework.mediator.jsonp==undefined) { window.psd.framework.mediator.jsonp = {}; }
    if(window.psd.framework.utils==undefined) { window.psd.framework.utils = {}; }
    
    window.psd.framework.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.psd.framework.debug = true; }
    
})(window);(function() 
{
    // Generacion del namespace psd.framework (por si no esta creado)
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.framework==undefined) { window.psd.framework = {}; }

    /**
     * navigator.userAgent =>
     * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
     * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
     * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
     * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
     * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
     * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
     * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
     * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    */

    var ua = navigator.userAgent
        , t = true
        , ie = /msie/i.test(ua)
        , ie11 = /.NET/i.test(ua)
        , chrome = /chrome/i.test(ua)
        , safari = /safari/i.test(ua) && !chrome
        , iphone = /iphone/i.test(ua)
        , ipad = /ipad/i.test(ua)
        , android = /android/i.test(ua)
        , opera = /opera/i.test(ua)
        , firefox = /firefox/i.test(ua)
        , gecko = /gecko\//i.test(ua)
        , seamonkey = /seamonkey\//i.test(ua)
        , webkitVersion = /version\/(\d+(\.\d+)?)/i
        , o;

    // Completa la información sobre el user agent
    function detect() 
    {
        if (ie) { o = { msie: t, version: ua.match(/msie (\d+(\.\d+)?);/i)[1] }; }
        if (ie11){ o = { msie: t, version: 11 }; }
        if (chrome) { o = { webkit: t, chrome: t, version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]}; }
        
        if (iphone || ipad) 
        {
            o = {webkit: t, mobile: t, ios: t, iphone: iphone, ipad: ipad };
            // WTF: version is not part of user agent in web apps
            if (webkitVersion.test(ua)) { o.version = ua.match(webkitVersion)[1];}
        }
        
        if (android) { o = { webkit: t, android: t, mobile: t, version: "0"/*ua.match(webkitVersion)[1]*/ }; }
        
		if (safari) {  
			var aux = ua.match(webkitVersion);
			if (aux){
				o = { webkit: t, safari: t, version: aux[1] };
			}			
		}  
        
		if (opera) {  
			var aux = ua.match(webkitVersion);
			if (aux){
				o = { opera: t, version: aux[1] };
			}			
		}
        
        if (gecko) 
        {
            o = { gecko: t, mozilla: t, version: ua.match(/firefox\/(\d+(\.\d+)?)/i)[1] };
            if (firefox) { o.firefox = t; }
        }
        
        if (seamonkey) { o = { seamonkey: t, version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1] }; }
        
        return o;
    }
    
    // Completa la información sobre el modo de compatibilidad
    function detectCompatibility(ua)
    {
        if (ua.msie && ua.version<9) { return 1; }
        return 0;
    }

    // Inicializamos la información de user agent
    psd.framework.ua = detect();
    
    // Detectamos el modo de compatibilidad
    psd.framework.compatibility = detectCompatibility(psd.framework.ua);
    
})();function getDevice()
{
	var device = {};
            device.agent = navigator.userAgent;
            device.mobile = is_MobileDevice(device.agent);
		 
	return device;
}

function is_MobileDevice(agent)
{
    var isMobile = (
        (agent.indexOf('iPhone') != -1) ||
        (agent.indexOf('iPod') != -1) ||
		(agent.indexOf('iPad') != -1) ||
		(agent.indexOf('Android') != -1)
    );
    return isMobile;
}

// TODO - Externalizar utilidad de control de version de flash
var FlashDetect = new function(){
	var self = this;
	self.release = "1.0.2";
	self.installed = false;
	self.major = -1;
	self.minor = -1;
	self.revision = -1;
	self.revisionStr = "";
	self.activeXVersion = "";
	
	var activeXDetectRules = [
		{
			"name":"ShockwaveFlash.ShockwaveFlash.7",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash.6",
			"version":function(obj){
				var version = "6,0,21";
				try{
					obj.AllowScriptAccess = "always";
					version = getActiveXVersion(obj);
				}catch(err){}
				return version;
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		}
	];
	
	var getActiveXVersion = function(activeXObj){
		var version = -1;
		try{
			version = activeXObj.GetVariable("$version");
		}catch(err){}
		return version;
	};
	
	var getActiveXObject = function(name){
		var obj = -1;
		try{
			obj = new ActiveXObject(name);
		}catch(err){}
		return obj;
	};
	
	var parseActiveXVersion = function(str){
		var versionArray = str.split(",");//replace with regex
		return {
			"major":parseInt(versionArray[0].split(" ")[1], 10),
			"minor":parseInt(versionArray[1], 10),
			"revision":parseInt(versionArray[2], 10),
			"revisionStr":versionArray[2]
		};
	};
	
	var parseRevisionStrToInt = function(str){
		return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
	};
	
	self.majorAtLeast = function(version){
		return self.major >= version;
	};
	
	self.FlashDetect = function(){
		if(navigator.plugins && navigator.plugins.length>0){
			var type = 'application/x-shockwave-flash';
			var mimeTypes = navigator.mimeTypes;
			if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
				var desc = mimeTypes[type].enabledPlugin.description;
				var descParts = desc.split(' ');//replace with regex
				var majorMinor = descParts[2].split('.');
				self.major = parseInt(majorMinor[0], 10);
				self.minor = parseInt(majorMinor[1], 10); 
				self.revisionStr = descParts[3];
				self.revision = parseRevisionStrToInt(self.revisionStr);
				self.installed = true;
			}
		}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
			var version = -1;
			for(var i=0; i<activeXDetectRules.length && version==-1; i++){
				var obj = getActiveXObject(activeXDetectRules[i].name);
				if(typeof obj == "object"){
					self.installed = true;
					version = activeXDetectRules[i].version(obj);
					if(version!=-1){
						var versionObj = parseActiveXVersion(version);
						self.major = versionObj.major;
						self.minor = versionObj.minor; 
						self.revision = versionObj.revision;
						self.revisionStr = versionObj.revisionStr;
						self.activeXVersion = version;
					}
				}
			}
		}
	}();
};(function(namespace) {
	
    // Statics const parametters
    Log.LEVEL_LOG = 0;
    Log.LEVEL_DEBUG = 1;
    Log.LEVEL_INFO = 2;
    Log.LEVEL_WARNING = 3;
    Log.LEVEL_ERROR = 4;
    Log.LEVEL_FATAL = 5;
	
    // Static public variables
    Log.enabled = true;
    Log.level = Log.LEVEL_LOG;

    // Static private const
    Log._LEVEL_LOG_NAME = "log";
    Log._LEVEL_DEBUG_NAME = "debug";
    Log._LEVEL_INFO_NAME = "info";
    Log._LEVEL_WARNING_NAME = "warning";
    Log._LEVEL_ERROR_NAME = "error";
    Log._LEVEL_FATAL_NAME = "fatal";
	
    // Static private variables
    Log._counter = 0;
		
    // Construct
    function Log() {
        throw "Log cannot be instantiated";
    }

    // Static public methods
    Log.log = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_LOG) {
                _print(Log._LEVEL_LOG_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.debug = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_DEBUG) {
                _print(Log._LEVEL_DEBUG_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.info = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_INFO) {
                _print(Log._LEVEL_INFO_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.warn = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_WARNING) {
                _print(Log._LEVEL_WARNING_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.error = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_ERROR) {
                _print(Log._LEVEL_ERROR_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.fatal = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_FATAL) {
                _print(Log._LEVEL_FATAL_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.clear = function() {
        Log._counter = 0;
    };
	
    // Static private methods
    function _print(type, counter, arguments) {
        var data = "";
        var i = 0;
        for (i=0; i < arguments.length; i++) {
            data += " " + (arguments[i]);
            data += i == arguments.length - 1 ? "" : ",";
        }
        if(psd.framework.debug) {console.log("[" + counter + "] " + type + " -> " + data);}
    }
	
    // Ad window context
    namespace.Log = Log;
	
}(window));(function(namespace) {

    /**
     * Clase base para todos los eventos
     * @constructor
     */
    function Event(type) {
        
        /**
         * Tipo de evento
         */
        this.type = type;
        
        /**
         * Objeto que produce el evento
         */
        this.target = null;
    }

    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Event = Event;

}(psd.framework));(function(namespace) {

    /**
     * Clase base para todas las clases que lanzan eventos
     * @constructor
     */
    function EventDispatcher() {
		
        // Mapa de listeners registrados
        var _eventListeners = {};
		
        /**
         * Registra un objeto para que pueda recibir notificaciones del evento deseado
         * @param type El tipo de evento
         * @param listener La funcion que procesa el evento
         * @param scope Scope opcional para la ejecución del listener. Si no se recibe,
         *              el listener se ejecutará dentro del contexto "window"
         */
        this.addEventListener = function(type, listener, scope) 
        {
            if (!_eventListeners[type]) { _eventListeners[type] = []; }            
            _eventListeners[type].push({listener: listener, scope: scope});
        };

        /**
         * Elimina un objeto para que deje de recibir notificaciones del evento deseado
         * @param type El tipo de evento
         * @param listener La funcion que procesa el evento
         * @param scope Scope opcional para la ejecución del listener. Si no se recibe,
         *              el listener se ejecutará dentro del contexto "window"
         */
        this.removeEventListener = function(type, listener, scope) 
        {
            var i = 0, 
                listeners = _eventListeners[type].length,
                eventListeners = [];
                
            for (i = 0; i < listeners; i++) 
            {
                if (_eventListeners[type][i].listener !== listener || _eventListeners[type][i].scope !== scope) { 
                    eventListeners.push(_eventListeners[type][i]);
                }
            }

            _eventListeners[type] = eventListeners;
        };
	
        /**
         * Dispara un evento
         * @param event El evento que se quiere disparar
         */
        this.dispatchEvent = function(event) 
        {
            var i = 0;
            if(typeof(event.type)!="undefined")
            {
                event.target = this;
                if (_eventListeners[event.type]) {
                    for (i = 0; i < _eventListeners[event.type].length; i++) {
                        _eventListeners[event.type][i].listener.apply(_eventListeners[event.type][i].scope, [event]);
                    }
                }
            }
        };

    }

    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.EventDispatcher = EventDispatcher;

}(psd.framework));(function(namespace) {
    
    // Inheritance class
    ErrorEvent.prototype = new psd.framework.Event();
    
     /**
     * Clase base para todos los eventos de tipo Error
     * @constructor
     */
    function ErrorEvent(type, error) {
        
        psd.framework.Event.call(this, type);
        var errorValid = typeof(error) != "undefined" && error != null;
        
        /**
         * Id del error
         */
        this.id = errorValid && error.id ? error.id : "";
        
        /**
         * Mensaje asociado al error
         */
        this.message = errorValid && error.message ? error.message : "";
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.ErrorEvent = ErrorEvent;

}(psd.framework));
(function(namespace) {
    
    // Inheritance class
    TimerEvent.prototype = new psd.framework.Event();

    /**
     * Define el valor de la constante TIMER
     */
    TimerEvent.TIMER = "timer";
    
    /**
     * Define el valor de la constante TIMER_COMPLETE
     */
    TimerEvent.TIMER_COMPLETE = "timerComplete";
    
    /**
     * Un objeto Timer dispara un TimerEvent cada vez que completa el intervalo 
     * de tiempo definido en la propiedad Timer.delay
     * @constructor
     */
    function TimerEvent(type) 
    {
        // Super
        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.TimerEvent = TimerEvent;

})(psd.framework.events);(function(namespace) {

    // Inheritance class
    Mediator.prototype = new psd.framework.EventDispatcher();

    // Constants
    Mediator._REQUEST_OK_CODE = 200;
    Mediator._REQUEST_ERROR_CODE = 404;
    
    Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE = 0;
    Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE = 1;
    Mediator._STATE_REQUEST_RECEIVED_CODE = 2;
    Mediator._STATE_REQUEST_PROCESSING_CODE = 3;
    Mediator._STATE_REQUEST_FINISHED_CODE = 4;
    
    Mediator.REQUEST_GET  = "GET";
    Mediator.REQUEST_POST = "POST";
    Mediator.REQUEST_HEAD = "HEAD";
    
    Mediator.RESPONSE_TEXT = "text";
    Mediator.RESPONSE_XML = "xml";
    Mediator.RESPONSE_JSON = "json";
    Mediator.RESPONSE_JSONP = "jsonp";
    
    /**
     * ID autoincremental de las peticiones realizadas por este mediator
     */
    Mediator._nextID = 0;
    
    /**
     * Devuelve el siguiente id de peticion para este mediator
     */
    Mediator.getNextKey = function() {
        return Mediator._nextID++;
    };
	
    /**
     * Mediator es una clase generica que puede ser utilizada para interactuar
     * con servicios de datos de manera asincrona
     * @constructor
     */
    function Mediator() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
		
        // Id de la peticion actual
        var _id = "0";
        
        // Url de la peticion actual
        var _url = "";
        
        // Parser de la peticion actual
        var _parser = null;

        //Indica si se utilizará XDomainRequest en navegadores Explorer <= 9 para la carga Ajaz con CORS
        //Por defecto está inhabilidado debido a los problemas que ocasiona esta clase
        var _corsIE = false;

        // Tipo de respuesta de la peticion actual
        var _type = Mediator.RESPONSE_XML;
        
        // Referencia dinamica a la instancia para no perder el contexto dentro
        // de las respuestas asincronas del XMLHttpRequest
        var _mediatorInstance = this;
        
        var _deferredJSONP = (function(mediator) {return function(data) {_jsonp.apply(mediator,[data]);}})(this);
        var _jsonp = function(responseData)
        {
            var parserResult = _parser.parse(responseData),
                mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                                    , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                                    , parserResult );
                                                    
            _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _id, mediatorResult));
        };

        this.corsIE = function(value){
            if(value && value!=_corsIE) {_corsIE = value;}
            return _corsIE;
        }

        /**
         * Inicia la mediacion solicitada
         * @param url La url de los datos
         * @param parser El parser que se utiliza para analizar la respuesta
         * @param type El tipo de respuesta (TEXT, XML, JSON)
         */
         this.mediate = function(url, parser, type) 
        {
            var xmlhttp, script,
                responseData = "",
                mediationID = Mediator.getNextKey();
            
            _id = "mediate_" + mediationID;
            _url = url;
            _parser = parser;
            if (type && (type == Mediator.RESPONSE_TEXT || 
                        type == Mediator.RESPONSE_XML || 
                        type == Mediator.RESPONSE_JSON ||
                        type == Mediator.RESPONSE_JSONP)) 
            {
                _type = type;
            }

            if(_type == Mediator.RESPONSE_JSONP)
            {
                script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url + "?jsonp=psd.framework.mediator.jsonp." + _id);

                psd.framework.mediator.jsonp[_id] = _deferredJSONP;
                
                document.getElementsByTagName("head")[0].appendChild(script);
            } else {

				if ((window.XDomainRequest) && _corsIE){ //IE 8, modo no estándar de realizar peticiones Ajax que soporten CORS
					xmlhttp = new XDomainRequest();
					xmlhttp.onerror = function(){
                        mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
                            , psd.framework.MediatorResult.MEDIATOR_ERROR
                            , null
                        );
                        _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
                            , _id
                            , mediatorResult));
                    };
                    xmlhttp.onload = function(){

						//creación del xml a partir del string

                        switch (_type) {
                            case Mediator.RESPONSE_TEXT:
                                responseData = xmlhttp.responseText;
                                break;

                            case Mediator.RESPONSE_XML:
                                responseData = new ActiveXObject('Microsoft.XMLDOM');
                                responseData.async='false';
                                responseData.loadXML(xmlhttp.responseText);
                                break;

                            case Mediator.RESPONSE_JSON:
                                responseData = xmlhttp.responseText;
                                break;
                        }

						var parserResult = _parser.parse(responseData);
							mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
								, psd.framework.MediatorResult.MEDIATOR_SUCCESS
								, parserResult
								);
							_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
																									, _id
																									, mediatorResult));
					}
				}else{

					// Code for Firefox, Chrome, Opera, Safari
					if (window.XMLHttpRequest) {
						xmlhttp = new XMLHttpRequest();
					}
					else { // code IE6 (no soporta CORS)
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					}

					xmlhttp.onreadystatechange = function() {

						switch (xmlhttp.readyState) {
							case Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE:
								break;

							case Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE:
								break;

							case Mediator._STATE_REQUEST_RECEIVED_CODE:
								break;

							case Mediator._STATE_REQUEST_PROCESSING_CODE:
								break;

							case Mediator._STATE_REQUEST_FINISHED_CODE:
								var mediatorResult;

								if (xmlhttp.status == Mediator._REQUEST_OK_CODE) {
									switch (_type) {
										case Mediator.RESPONSE_TEXT:
											responseData = xmlhttp.responseText;
											break;

										case Mediator.RESPONSE_XML:
											responseData = xmlhttp.responseXML;
											break;

										case Mediator.RESPONSE_JSON:
											responseData = xmlhttp.responseText;
											break;
									}

									var parserResult = _parser.parse(responseData);
									mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
										, psd.framework.MediatorResult.MEDIATOR_SUCCESS
										, parserResult
										);
									_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
																									, _id
																									, mediatorResult));
								}
								else {
									mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
										, psd.framework.MediatorResult.MEDIATOR_ERROR
										, null
										);
									_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
																									, _id
																									, mediatorResult));
								}
								break;
						};
					};
				};

                xmlhttp.open(Mediator.REQUEST_GET, _url, true);
                xmlhttp.send();
            }
        };
		
        return _id;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Mediator = Mediator;
	
}(psd.framework));(function(namespace) {
    
    // Inheritance class
    MediatorEvent.prototype = new psd.framework.Event();
    
    /**
     * La peticion ha concluido correctamente
     */
    MediatorEvent.MEDIATE_COMPLETE = "mediate_complete";
    
    /**
     * Ha sucedido un error durante la peticion
     */
    MediatorEvent.MEDIATE_ERROR = "mediate_error";
    
    /**
     * MediatorEvent es el evento general que todo Mediator dispara como resultado
     * de sus peticiones
     * @param type Tipo del evento
     * @param id Id de la peticion
     * @param mediatorResult Resultado de la peticion
     * @constructor
     */
    function MediatorEvent(type, id, mediatorResult) 
    {
        // Super
        psd.framework.Event.call(this, type);

        this.id = id;
        this.result = mediatorResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediatorEvent = MediatorEvent;

}(psd.framework));(function(namespace) {
	
    // Constants
    MediatorResult.MEDIATOR_SUCCESS_CODE = 0;
    MediatorResult.MEDIATOR_ERROR_CODE = 1;
    MediatorResult.MEDIATOR_SECURITY_ERROR = 2;
    MediatorResult.MEDIATOR_IO_ERROR = 3;
    
    MediatorResult.MEDIATOR_SUCCESS = "mediator_success";
    MediatorResult.MEDIATOR_ERROR = "mediator_error";
    MediatorResult.MEDIATOR_SECURITY_ERROR = "mediator_security_error";
    MediatorResult.MEDIATOR_IO_ERROR = "mediator_io_error";

    /**
     * MediatorResult es una clase que empaqueta de manera general el resultado
     * de una peticion a un servicio a traves de un Mediator
     * @param code Codigo de respuesta
     * @param msg Mensaje de respuesta
     * @param parserResult Resultado del parseo de los datos recibidos
     * @constructor
     */
    function MediatorResult(code, msg, parserResult) 
    {
        this.code = code;
        this.msg = msg;
        this.parserResult = parserResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediatorResult = MediatorResult;

}(psd.framework));(function(namespace) {

    /**
     * Parser es la clase basica de la que extiende cualquier Parser para el
     * tratamiento del resultado de una peticion de datos
     * @constructor
     */
    function Parser() {
		
        /**
         * Analiza los datos recibidos y los devuelve en el formato deseado. Por
         * defecto, el parser se limita a devolver los datos sin tratarlos.
         * @param data Los datos recibidos
         * @return Un ParserResult con el resultado del parseo
         */
        this.parse = function(data) 
        {
            return new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_SUCCESS_CODE
                                                    , psd.framework.ParserResult.PARSER_SUCCESS
                                                    , data);
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Parser = Parser;

}(psd.framework));(function(namespace) {

    // Inheritance class
    JSONParser.prototype = new psd.framework.Parser();

    /**
     * JSONParser es un parser para datos en formato JSON. Si está disponible, 
     * aplica la función nativa JSON.parse al resultado recibido.
     * @constructor
     */
    function JSONParser() {
        
        // Super
        psd.framework.Parser.call(this);

        /**
         * className psd.framework.parser.JSONParser
         */
        this.className = "psd.framework.parser.JSONParser";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Convierte los datos recibidos en un objeto de js
         * @param data Los datos recibidos
         * @return Un ParserResult con el resultado del parseo
         */
        this.parse = function(data) 
        {
            var parserResult = new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_ERROR_CODE
                                                        , psd.framework.ParserResult.PARSER_ERROR
                                                        , data);
                                                        
            if(typeof(JSON)!="undefined" && typeof(JSON.parse)!="undefined") {
                try {
                    parserResult.result = JSON.parse(data);
                    parserResult.code = psd.framework.ParserResult.PARSER_SUCCESS_CODE;
                    parserResult.msg = psd.framework.ParserResult.PARSER_SUCCESS;
                }catch(err){ parserResult.msg = err.message; }
            }
            
            return parserResult;
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.JSONParser = JSONParser;

}(psd.framework.parser));(function(namespace) {
	
    // Constantes
    ParserResult.PARSER_SUCCESS_CODE = 0;
    ParserResult.PARSER_ERROR_CODE = 1;
    
    ParserResult.PARSER_SUCCESS = "parser_success";
    ParserResult.PARSER_ERROR = "parser_error";
    
    /**
     * ParserResult es la clase general que encapsula el resultado generado por
     * un Parser
     * @param code Codigo del resultado del parseo
     * @param msg Mensaje del resultado del parseo
     * @param parserResult Resultado del parseo
     * @constructor
     */
    function ParserResult(code, msg, parserResult) 
    {
        this.code = code;
        this.msg = msg;
        this.result = parserResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.ParserResult = ParserResult;

}(psd.framework));(function(namespace) {
	
	ObjectUtil.merge = function(obj1, obj2) {
            var obj3 = {};
            for (var attrName in obj1) { obj3[attrName] = obj1[attrName]; }
            for (var attrName in obj2) { obj3[attrName] = obj2[attrName]; }
            return obj3;
	}
        
	function ObjectUtil() {}

	// Add context window
	namespace.ObjectUtil = ObjectUtil;

}(psd.framework));(function(namespace) {
	
	StringUtil.trim = function trim(str) {
		return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	};
		
	function StringUtil() {}

	// Add context window
	namespace.StringUtil = StringUtil;

}(psd.framework));(function(namespace) {

    // Inheritance class
    Timer.prototype = new psd.framework.EventDispatcher();

    /**
     * Timer es una clase que permite ejecutar código siguiendo una determinada
     * secuencia temporal
     * @constructor
     */
    function Timer(delay, repeatCount) 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.framework.utils.Timer
         */
        this.className = "psd.framework.utils.Timer";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // ID de la actual llamada setInterval
        var _intervalID = null;
        
        // Callback para los eventos de setinterval
        var _deferredIntervalCallback = (function(timer) {return function() {_intervalCallback.apply(timer);}})(this);
        var _intervalCallback = function()
        {
            _currentCount++;
            this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER));
            if(_repeatCount != 0)
            {
                if(_repeatCount == _currentCount)
                {
                    this.reset();
                    this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER_COMPLETE));
                }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Número de veces que el timer se ha disparado desde que se inició
         */
        var _currentCount = 0;
        this.currentCount = function() { return _currentCount; };
        
        /**
         * El retardo, en milisegundos, entre eventos del timer
         */
        var _delay = delay!=undefined?delay:1000;
        this.delay = function(value)
        {
            if(value!=undefined && value>0) { _delay = value; }
            return _delay;
        };
        
        /**
         * El número total de repeticiones que debe ejecutarse el timer
         */
        var _repeatCount = repeatCount!=undefined?repeatCount:0;
        this.repeatCount = function(value)
        {
            if(value!=undefined && value>0) { _repeatCount = value; }
            return _repeatCount;
        };
        
        /**
         * El estado actual del timer.
         */
        var _running = false;
        this.running = function() { return _running; };
        
        /**
         * Ejecuta el timer si no está en marcha
         */
        this.start = function()
        {
            if(!_running)
            {
                _intervalID = setInterval(_deferredIntervalCallback, _delay);
                _running = true;
            }
        };
        
        /**
         * Detiene el timer
         */
        this.stop = function()
        {
            if(_running)
            {
                clearInterval(_intervalID);
                _running = false;
            }
        };
        
        /**
         * Detiene el timer si está en marcha y resetea la propiedad currentCount a 0
         */
        this.reset = function()
        {
            this.stop();
            _currentCount = 0;
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework.utils
    namespace.Timer = Timer;
	
}(psd.framework.utils));(function(window) 
{
    // Generamos el namespace psd.fenix y sus derivados
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.fenix==undefined) { window.psd.fenix = {}; }
    if(window.psd.fenix.controls==undefined) { window.psd.fenix.controls = {}; }
    if(window.psd.fenix.display==undefined) { window.psd.fenix.display = {}; }
    if(window.psd.fenix.display.commands==undefined) { window.psd.fenix.display.commands = {}; }
    if(window.psd.fenix.event==undefined) { window.psd.fenix.event = {}; }
    if(window.psd.fenix.media==undefined) { window.psd.fenix.media = {}; }
    if(window.psd.fenix.stage==undefined) { window.psd.fenix.stage = {}; }
    if(window.psd.fenix.text==undefined) { window.psd.fenix.text = {}; }
    if(window.psd.fenix.textures==undefined) { window.psd.fenix.textures = {}; }
    
})(window);(function(namespace) {

    // UID autoincremental
    UID._nextID = 0;
    
    /**
     * Genera identificadores unicos dentro de la ejecucion de una aplicacion fenix
     * @returns Un identificador unico
     */
    UID.getKeyId = function() {
        return UID._nextID++;
    };
    
    /**
     * La clase UID permite la generacion de identificadores unicos dentro de una
     * aplicacion de fenix
     * @constructor
     */
    function UID() {}

    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.UID = UID;
	
})(psd.fenix);(function(namespace) {
	
	ColorUtil.colorToRGB = function (color, alpha) {
            if (typeof color === 'string' && color[0] === '#') {
                color = window.parseInt(color.slice(1), 16);
            }
            
            alpha = (alpha === undefined) ? 1 : alpha;
            
            var r = color >> 16 & 0xff,
                g = color >> 8 & 0xff,
                b = color & 0xff,
                a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
                
            if (a === 1) {
                return "rgb("+ r +","+ g +","+ b +")";
            } else {
                return "rgba("+ r +","+ g +","+ b +","+ a +")";
            }
        }
  
	function ColorUtil() {}

	// Add context window
	namespace.ColorUtil = ColorUtil;

})(psd.fenix);(function(namespace) {
	
	// Check if containts rect a point
        MathUtil.containsPoint = function (rect, x, y) {
            return !(x < rect.x ||
                    x > rect.x + rect.width ||
                    y < rect.y ||
                    y > rect.y + rect.height);
        };

        // Check if existn intersect between two rects
        MathUtil.intersects = function (rectA, rectB) {
            return !(rectA.x + rectA.width < rectB.x ||
                    rectB.x + rectB.width < rectA.x ||
                    rectA.y + rectA.height < rectB.y ||
                    rectB.y + rectB.height < rectA.y);
        };
  
	function MathUtil() {}

	// Add context window
	namespace.MathUtil = MathUtil;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Point(x, y) {
        this.x = x | 0;
        this.y = y | 0;
		
        // Public methods
        this.clone = function() {
            return new Point(this.x, this.y);
        };
		
        this.add = function(p) {
            return new Point(this.x + p.x, this.y + p.y);
        };
		
        this.degreesTo = function(p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            var angle = Math.atan2(dy, dx); // radians
            return angle * (180 / Math.PI); // degrees
        };
		
        this.distance = function(p){
            var x = this.x - p.x;
            var y = this.y - p.y;
            return Math.sqrt(x * x + y * y);
        };
		
        this.equals = function(toCompare){
            return this.x == toCompare.x && this.y == toCompare.y;
        };
	
        this.interpolate = function(p, f){
            return new Point((this.x + p.x) * f, (this.y + p.y) * f);
        };
		
        this.length = function(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
		
        this.normalize = function(thickness){
            var l = this.length();
            this.x = this.x / l * thickness;
            this.y = this.y / l * thickness;
        };
		
        this.orbit = function(origin, arcWidth, arcHeight, degrees){
            var radians = degrees * (Math.PI / 180);
            this.x = origin.x + arcWidth * Math.cos(radians);
            this.y = origin.y + arcHeight * Math.sin(radians);
        };
		
        this.offset = function(dx, dy){
            this.x += dx;
            this.y += dy;
        };
		
        this.subtract = function(v){
            return new Point(this.x - v.x, this.y - v.y);
        };
		
        this.toString = function(){
            return "(x=" + this.x + ", y=" + this.y + ")";
        };
	 
        // Static functions
        Point.interpolate = function(pt1, pt2, f){
            return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
        };

        Point.polar = function(len, angle){
            return new Point(len * Math.sin(angle), len * Math.cos(angle));
        };
		
        Point.distance = function(p1, p2){
            var x = p1.x - p2.x;
            var y = p1.y - p2.y;
            return Math.sqrt(x * x + y * y);
        };
    }

    // Add context window
    namespace.Point = Point;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Girth(x, y, radius) {
        this.x = x | 0;
        this.y = y | 0;
        this.r = radius | 1;
		
        this.clone = function() {
            return new Girth(this.x, this.y, this.r);
        };
		
        this.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ", radius=" + this.r + ")";
        };
    }
	
    namespace.Girth = Girth;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Rectangle(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 1;
        this.height = height || 1;

        // Public methods
        this.clone = function() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
		
        this.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
        };
    }
	
    // Add context window
    namespace.Rectangle = Rectangle;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    MediaEvent.prototype = new psd.framework.Event();

    /**
     * Event to be dispatched on abort
     */
    MediaEvent.ABORT = "abort";
    
    /**
     * Event to be dispatched on begin
     */
    MediaEvent.BEGIN = "begin";
    
    /**
     * Script to be run when a file is ready to start playing (when it has buffered enough to begin)
     */
    MediaEvent.CAN_PLAY = "canplay";
    
    /**
     * Script to be run when a file can be played all the way to the end without pausing for buffering
     */
    MediaEvent.CAN_PLAY_THROUGH = "canplaythrough";
    
    /**
     * Script to be run when the length of the media changes
     */
    MediaEvent.DURATION_CHANGE = "durationchange";
    
    /**
     * Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
     */
    MediaEvent.EMPTIED = "emptied";
    
    /**
     * Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
     */
    MediaEvent.ENDED = "ended";
    
    /**
     * Script to be run when an error occurs when the file is being loaded
     */
    MediaEvent.ERROR = "error";
    
    /**
     * Script to be run when media data is loaded
     */
    MediaEvent.LOADED_DATA = "loadeddata";
    
    /**
     * Script to be run when meta data (like dimensions and duration) are loaded
     */
    MediaEvent.LOADED_METADATA = "loadedmetadata";
    
    /**
     * Script to be run just as the file begins to load before anything is actually loaded
     */
    MediaEvent.LOAD_START = "loadstart";
    
    /**
     * Script to be run when the media is paused either by the user or programmatically
     */
    MediaEvent.PAUSE = "pause";
    
    /**
     * Script to be run when the media is ready to start playing
     */
    MediaEvent.PLAY = "play";
    
    /**
     * Script to be run when the media actually has started playing
     */
    MediaEvent.PLAYING = "playing";
    
    /**
     * Script to be run when the browser is in the process of getting the media data
     */
    MediaEvent.PROGRESS = "progress";
    
    /**
     * Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
     */
    MediaEvent.RATE_CHANGE = "ratechange";
    
    /**
     * Script to be run each time the ready state changes (the ready state tracks the state of the media data)
     */
    MediaEvent.READY_STATE_CHANGE = "readystatechange";
    
    /**
     * Script to be run when the seeking attribute is set to false indicating that seeking has ended
     */
    MediaEvent.SEEKED = "seeked";
    
    /**
     * Script to be run when the seeking attribute is set to true indicating that seeking is active
     */
    MediaEvent.SEEKING = "seeking";
    
    /**
     * Script to be run when the browser is unable to fetch the media data for whatever reason
     */
    MediaEvent.STALLED = "stalled";
    
    /**
     * Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
     */
    MediaEvent.SUSPEND = "suspend";
    
    /**
     * Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
     */
    MediaEvent.TIME_UPDATE = "timeupdate";
    
    /**
     * Script to be run each time the volume is changed which (includes setting the volume to "mute")
     */
    MediaEvent.VOLUME_CHANGE = "volumechange";
    
    /**
     * Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
     */
    MediaEvent.WAITING = "waiting";    
    
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Evento multimedia
     * @param type Tipo del evento
     * @param data Datos adicionales del evento
     * @constructor
     */
    function MediaEvent(type, data) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.event	
    namespace.MediaEvent = MediaEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    MouseEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    MouseEvent.CLICK = "click";
    
    /**
     * 
     */
    MouseEvent.MOUSE_DOWN = "mouseDown";
    
    /**
     * 
     */
    MouseEvent.MOUSE_UP = "mouseUp";
    
    /**
     * 
     */
    MouseEvent.MOUSE_MOVE = "mouseMove";
    
    /**
     * 
     */
    MouseEvent.MOUSE_OVER = "mouseOver";
    
    /**
     * 
     */
    MouseEvent.MOUSE_OUT = "mouseOut";
    
    /**
     *
     */
    MouseEvent.MOUSE_WHEEL = "mouseWheel";
    
    /**
     * 
     */
    this.stageX = 0;
    
    /**
     * 
     */
    this.stageY = 0;
    
    /**
     *
     */
    this.localX = 0;
    
    /**
     *
     */
    this.localY = 0;
    
    /**
     *
     */
    this.delta = 0;
    
    /**
     * @param type
     * @param stageX
     * @param stageY
     * @param localX
     * @param localY
     * @constructor
     */
    function MouseEvent(type, stageX, stageY, localX, localY) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.stageX = stageX!=undefined?stageX:0;
        this.stageY = stageY!=undefined?stageY:0;
        this.localX = localX!=undefined?localX:0;
        this.localY = localY!=undefined?localY:0;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.MouseEvent = MouseEvent;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    ProgressEvent.prototype = new psd.framework.Event();

    /**
     * Event to be dispatched on abort
     */
    ProgressEvent.CHANGE = "change";
    
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Evento multimedia
     * @param type Tipo del evento
     * @param data Datos adicionales del evento
     * @constructor
     */
    function ProgressEvent(type, data) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.event	
    namespace.ProgressEvent = ProgressEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    StageEvent.prototype = new psd.framework.Event();
    
    /**
     *
     */
    StageEvent.INIT = "init";
    
    /**
     *
     */
    StageEvent.INIT_ERROR = "initError";

    /**
     *
     */
    StageEvent.ADDED_TO_STAGE = "addedToStage";
    
    /**
     *
     */
    StageEvent.REMOVED_FROM_STAGE = "removedFromStage";
    
    /**
     *
     */
    StageEvent.ENTER_FRAME = "enterFrame";

    /**
     *
     */
    StageEvent.ADDED = "added";
    
    /**
     *
     */
    StageEvent.REMOVED = "removed";

    /**
     *
     */
    StageEvent.RESIZE = "resize";
    
    /**
     *
     */
    StageEvent.DISPLAY_STATE_CHANGE = "displayStateChange";
    
    /**
     *
     */
    this.currentTarget = null;
    
    /**
     * @param type
     * @constructor
     */
    function StageEvent(type, currentTarget) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        // 
        this.currentTarget = currentTarget;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix
    namespace.StageEvent = StageEvent;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    KeyboardEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    KeyboardEvent.KEY_DOWN = "keyDown";
    
    /**
     * 
     */
    KeyboardEvent.KEY_UP = "keyUp";
    
    /**
     *
     */
    this.keyCode = 0;
    
    /**
     * @param type
     * @param keyCode
     * @constructor
     */
    function KeyboardEvent(type, keyCode) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.keyCode = keyCode;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.KeyboardEvent = KeyboardEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    CacheEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    CacheEvent.CACHE_FLUSH = "cacheFlush";
    
    /**
     * @param type
     * @constructor
     */
    function CacheEvent(type) 
    {
        // Super
        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.CacheEvent = CacheEvent;

})(psd.fenix.event);(function(namespace) {

    // Inheritance class
    TextureAtlas.prototype = new psd.framework.EventDispatcher();

    /**
     *
     * @constructor
     * @param textureURL URL del recurso con las imágenes del movieclip
     * @param descriptionURL Descripción textual del movieclip por frames
     * @param jsonp Indica si la petición de datos debe hacerse mediante jsonp
     */
    function TextureAtlas(textureURL, descriptionURL, jsonp)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.textures.TextureAtlas
         */
        this.className = "psd.fenix.textures.TextureAtlas";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Indica si la petición de datos debe hacerse mediante jsonp
        var _jsonp = (jsonp==true || jsonp=="true")?true:false;

        // URL del atlas con los recursos gráficos
        var _textureURL = textureURL;
        
        // Indica si el atlas de imágenes se ha cargado corectamente
        var _textureReady = false;
        
        // Función utilizada para ejecutar la llamada a la función _onTextureLoaded
        // manteniendo el contexto de ejecución dentro de la instancia del movieclip
        var _deferredTextureLoaded = (function(textureAtlas) { return function(){ _onTextureLoaded.apply(textureAtlas); } })(this);

        // Actualiza el valor de la propiedad _textureReady para indicar que la carga
        // del contenido gráfico del movieclip se ha cargado
        var _onTextureLoaded = function() 
        { 
            _textureReady = true;
            
            if(_descriptionReady) { this.dispatchEvent(new psd.framework.Event("texture_atlas_ready")); }
        };
        
        // Descripción de los frames del movieclip
        var _description = null;        
        
        // URL del json con la descprición del movieclip
        var _descriptionURL = descriptionURL;
        
        // Indica si la descripción del movieclip se ha cargado correctamente
        var _descriptionReady = false;
        
        // Mediator para la carga de las descripciones del movieclip
        var _descriptionMediator = new psd.framework.Mediator();

        // Parsea el resultado recibido con la descripción del movieclip
        var _onDescriptionComplete = function(evt)
        {
            if(_jsonp) { _description = evt.result.parserResult.result; }
            else { _description = JSON.parse(evt.result.parserResult.result); }
            
            _descriptionReady = true;
            
            if(_textureReady) { this.dispatchEvent(new psd.framework.Event("texture_atlas_ready")); }
        };

        // Detecta errores de carga en la descripción del movieclip
        var _onDescriptionError = function(evt) { Log.log("onMediateError: " + evt); }
        
        // Parser para la carga de las descripciones del movieclip
        var _jsonParser = new psd.framework.Parser();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Image para la carga del grupo de texturas
         */
        var _texture = new Image();
        this.texture = function() { return _texture; }
        
        /**
         * 
         * @param
         * @returns 
         */
        this.getFrames = function(prefix)
        {
            var i, j, frame, frames = [];
            
            // Si recibimos el comodín * como prefijo, devolvemos de manera
            // instantánea todo el array de texturas
            if(prefix == "*") { frames = _description.frames; }
            else
            {
                // Convertimos la entrada en Array si no lo es
                if(Object.prototype.toString.apply(prefix) != "[object Array]") { prefix = [prefix]; }
                
                for(i in _description.frames)
                { 
                    frame = _description.frames[i];
                    for(j in prefix) { if(frame.filename.indexOf(prefix[j]) == 0) { frames.push(frame); } }
                }
            }
            
            return frames;
        }
        
        // Iniciamos la carga de las texturas y descripción del movieclip
        _descriptionMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onDescriptionComplete, this);
        _descriptionMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onDescriptionError, this);
        _descriptionMediator.mediate(_descriptionURL, _jsonParser, _jsonp?psd.framework.Mediator.RESPONSE_JSONP:psd.framework.Mediator.RESPONSE_JSON);
        
        _texture.onload = _deferredTextureLoaded;
        _texture.crossOrigin = "anonymous";
        _texture.src = _textureURL;
    }

    namespace.TextureAtlas = TextureAtlas;

})(psd.fenix.textures);(function(namespace) {

    /**
     * Especifica un color simple de relleno para las siguientes llamadas a
     * comandos gráficos como drawCircle() o lineTo()
     * @param color El color de relleno
     * @param alpha El valor de transparencia del relleno
     * @constructor
     */
    function BeginFillCommand(color, alpha) 
    {
        /**
         * className psd.fenix.display.commands.BeginFillCommand
         */
        this.className = "psd.fenix.display.commands.BeginFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // Color de relleno
        var _color = color!=undefined?color:0x000000;
        
        // Transparencia de relleno
        var _alpha = alpha!=undefined?alpha:1;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.closePath();
            ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_color, _alpha);
            ctx.beginPath();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.BeginFillCommand = BeginFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     *
     * @param type
     * @param colors
     * @param alphas
     * @param ratios
     */
    function BeginGradientFillCommand(displayObject, type, colors, alphas, ratios) 
    {
        /**
         * className psd.fenix.display.commands.BeginGradientFillCommand
         */
        this.className = "psd.fenix.display.commands.BeginGradientFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        var _displayObject = displayObject;
        
        // 
        var _type = (type!=undefined && (type=="linear" || type=="radial"))?type:"linear";
        
        // 
        var _colors = colors!=undefined?colors:[];
        
        // 
        var _alphas = alphas!=undefined?alphas:[];
        
        // 
        var _ratios = ratios!=undefined?ratios:[];
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            var gradient = _type=="linear"?ctx.createLinearGradient(0,0,0,_displayObject.height()):ctx.createRadialGradient(0,0,1,1,1,1),
                stop;
            
            for(stop in _colors)
            {
                gradient.addColorStop(_ratios[stop], psd.fenix.ColorUtil.colorToRGB(_colors[stop], _alphas[stop]));
            }
            
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.beginPath();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.BeginGradientFillCommand = BeginGradientFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param controlX
     * @param controlY 
     * @param anchorX 
     * @param anchorY
     * @constructor
     */
    function CurveToCommand(controlX, controlY, anchorX, anchorY) 
    {
        /**
         * className psd.fenix.display.commands.CurveToCommand
         */
        this.className = "psd.fenix.display.commands.CurveToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        //
        var _controlX = controlX!=undefined?controlX:0;
        
        // 
        var _controlY = controlY!=undefined?controlY:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _anchorX = anchorX!=undefined?anchorX:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _anchorY = anchorY!=undefined?anchorY:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.quadraticCurveTo(_controlX, _controlY, _anchorX, _anchorY);
            ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.CurveToCommand = CurveToCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Dibuja un círculo. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal del punto central del círculo
     * @param y La posición vertical del punto central del círculo
     * @param radius El radio del círculo
     * @constructor
     */
    function DrawCircleCommand(x, y, radius) 
    {
        /**
         * className psd.fenix.display.commands.DrawCircleCommand
         */
        this.className = "psd.fenix.display.commands.DrawCircleCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;
        
        // El radio del círculo
        var _radius = radius!=undefined?radius:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.arc(_x, _y, _radius, 0, 2 * Math.PI, false);

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x -_radius,_y -_radius,_radius * 2,_radius * 2);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawCircleCommand = DrawCircleCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Dibuja un rectángulo. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal donde empieza el rectángulo
     * @param y La posición vertical donde empieza el rectángulo
     * @param width El ancho del rectángulo
     * @param height El alto del rectángulo
     * @constructor
     */
    function DrawRectCommand(x, y, width, height) 
    {
        /**
         * className psd.fenix.display.commands.DrawRectCommand
         */
        this.className = "psd.fenix.display.commands.DrawRectCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _width = width!=undefined?width:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _height = height!=undefined?height:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.beginPath();
            ctx.fillRect(_x, _y, _width, _height);
            //ctx.strokeRect(_x, _y, _width, _height);
            ctx.closePath();

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x,_y,_width,_height);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawRectCommand = DrawRectCommand;

})(psd.fenix.display.commands);/**
 * Created by igomez on 25/10/13.
 */
(function(namespace){

    /**
     * Dibuja un rectángulo con esquinas redondeadas. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal donde empieza el rectángulo
     * @param y La posición vertical donde empieza el rectángulo
     * @param width El ancho del rectángulo
     * @param height El alto del rectángulo
     * @param ellipseWidth  The width of the ellipse used to draw the rounded corners (in pixels).
     * @param ellipseHeight  The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
     * @constructor
     */
    function DrawRoundRectCommand(x, y, width, height, ellipseWidth, ellipseHeight){

        /**
         * className psd.fenix.display.commands.DrawRoundRectCommand
         */
        this.className = "psd.fenix.display.commands.DrawRoundRectCommand";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;

        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;

        // La posición horizontal donde empieza el rectángulo
        var _width = width!=undefined?width:0;

        // La posición horizontal donde empieza el rectángulo
        var _height = height!=undefined?height:0;

        //The width of the ellipse used to draw the rounded corners (in pixels).
        var _ellipseWidth = ellipseWidth!=undefined?ellipseWidth:0;

        // The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
        var _ellipseHeight = ellipseHeight!=undefined?ellipseHeight:_ellipseWidth;


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx)
        {
            ctx.beginPath();
            ctx.moveTo(_x + _ellipseWidth, _y);
            ctx.lineTo(_x + _width - _ellipseWidth, _y);
            ctx.quadraticCurveTo(_x + _width, _y, _x + _width, _y + _ellipseHeight);
            ctx.lineTo(_x + _width, _y + _height - _ellipseHeight);
            ctx.quadraticCurveTo(_x + _width, _y + _height, _x + _width - _ellipseWidth, _y + _height);
            ctx.lineTo(_x + _ellipseWidth, _y + _height);
            ctx.quadraticCurveTo(_x, _y + _height, _x, _y + _height - _ellipseHeight);
            ctx.lineTo(_x, _y + _ellipseHeight);
            ctx.quadraticCurveTo(_x, _y, _x + _ellipseWidth, _y);
            ctx.closePath();
            //ctx.stroke();

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x,_y,_width,_height);

        };

    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawRoundRectCommand = DrawRoundRectCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Aplica rellenos a todos los comandos gráficos ejecutados desde la última
     * llamada a un comando de tipo beginFill.
     * @constructor
     */
    function EndFillCommand() 
    {
        /**
         * className psd.fenix.display.commands.EndFillCommand
         */
        this.className = "psd.fenix.display.commands.EndFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.fill();
            //ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.EndFillCommand = EndFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Especifica un color simple de relleno para las siguientes llamadas a
     * comandos gráficos como drawCircle() o lineTo()
     * @param thickness
     * @param color
     * @param alpha
     * @param caps
     * @param joints
     * @param miterLimit
     * @constructor
     */
    function LineStyleCommand(thickness, color, alpha, caps, joints, miterLimit) 
    {
        /**
         * className psd.fenix.display.commands.LineStyleCommand
         */
        this.className = "psd.fenix.display.commands.LineStyleCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // 
        var _lineWidth = thickness!=undefined?thickness:0;
        
        // 
        var _color = color!=undefined?color:0x000000;
        
        // 
        var _alpha = color!=undefined?alpha:1;
        
        // 
        var _lineCap = caps!=undefined?caps:"";
        
        // 
        var _lineJoin = joints!=undefined?joints:"";
        
        // 
        var _miterLimit = miterLimit!=undefined?miterLimit:0;

        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.lineWidth = _lineWidth;
            ctx.lineCap = _lineCap;
            ctx.lineJoin = _lineJoin;
            ctx.miterLimit = _miterLimit;
            ctx.strokeStyle = psd.fenix.ColorUtil.colorToRGB(_color, _alpha);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.LineStyleCommand = LineStyleCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param x 
     * @param y 
     * @constructor
     */
    function LineToCommand(x, y) 
    {
        /**
         * className psd.fenix.display.commands.LineToCommand
         */
        this.className = "psd.fenix.display.commands.LineToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?(Math.floor(x)+0.5):0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?(Math.floor(y)+0.5):0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.lineTo(_x, _y);
            ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.LineToCommand = LineToCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param x 
     * @param y 
     * @constructor
     */
    function MoveToCommand(x, y) 
    {
        /**
         * className psd.fenix.display.commands.MoveToCommand
         */
        this.className = "psd.fenix.display.commands.MoveToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?(Math.floor(x)+0.5):0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?(Math.floor(y)+0.5):0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.closePath();
            ctx.beginPath(); 
            ctx.moveTo(_x, _y); 
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.MoveToCommand = MoveToCommand;

})(psd.fenix.display.commands);(function(namespace) {
	
    // Inheritance class
    Graphics.prototype = new psd.framework.EventDispatcher();
	
    /**
     * La clase Graphics contiene una serie de métodos que pueden utilizarse para la
     * creación de formas vectoriales directamente sobre el canvas de la aplicación
     * @constructor
     */
    function Graphics()
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.DisplayObject
         */
        this.className = "psd.fenix.Graphics";

        /**
         * Define los límites del área definida por todos los commands de la clase
         * @type psd.fenix.Rectangle
         * @private
         */
        var _bounds = null;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // Array de comandos gráficos asociados al elemento Graphics
        var _commands = [];
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        this.bounds = function(){
            return _bounds;
        };

        /**
         * Ejecuta toda la secuencia de comandos de pintado asociados al elemento
         * Graphcis.
         * @param ctx El contexto sobre el que ejecutar los comandos gráficos
         */
        this.draw = function(ctx) 
        {
            var i, bnd;
            
            // Guardamos el estado inicial del contexto sobre el que se aplican
            // los comandos gráficos
            ctx.save();
            
            // 
            ctx.beginPath();

            // Aplicamos secuencialmente todos los comandos registrados
            for (i=0; i < _commands.length; i++) {

                bnd =  _commands[i].exec(ctx);

                //Realizamos el cálculo de límites globales de Graphics
                //En este momento no todos los comandos devuelven contenido, imeplemntados únicamente (circle, rect y roundrect)
                if(bnd!=undefined){
                    if (_bounds == null){
                        _bounds = new psd.fenix.Rectangle(bnd.x, bnd.y, bnd.width, bnd.height);
                    }else{
                        if(bnd.x<_bounds.x) _bounds.x = bnd.x;
                        if(bnd.y<_bounds.y) _bounds.y = bnd.y;
                        if((bnd.width + bnd.x) > (_bounds.width + _bounds.x)) _bounds.width = bnd.x - _bounds.x + bnd.width;
                        if((bnd.height + bnd.y) > (_bounds.height + _bounds.y)) _bounds.height = bnd.y - _bounds.y + bnd.height;
                    }
                }
            }
            
            //
            ctx.closePath();
            
            // Restauramos el estado del contexto
            ctx.restore();
        };        
        
        /**
         * Especifica un color simple de relleno para las siguientes llamadas a
         * comandos gráficos como drawCircle() o lineTo()
         * @param color El color de relleno
         * @param alpha El valor de transparencia del relleno
         */
        this.beginFill = function(color, alpha) 
        { 
            _commands.push(new psd.fenix.display.commands.BeginFillCommand(color, alpha)); 
        };
        
        /**
         *
         * @param displayObject
         * @param type
         * @param colors
         * @param alphas
         * @param ratios
         */
        this.beginGradientFill = function(displayObject, type, colors, alphas, ratios)
        {
            _commands.push(new psd.fenix.display.commands.BeginGradientFillCommand(displayObject, type, colors, alphas, ratios));
        };
        
        /**
         * Elimina la secuencia de comandos asociados a este elemento
         */
        this.clear = function() { _commands = []; };
        
        /**
         * 
         */
        this.curveTo = function(controlX, controlY, anchorX, anchorY) 
        {
            _commands.push(new psd.fenix.display.commands.CurveToCommand(controlX, controlY, anchorX, anchorY));
        };        
        
        /**
         * 
         * @param x
         * @param y
         * @param radius
         */
        this.drawCircle = function(x, y, radius) 
        {
            _commands.push(new psd.fenix.display.commands.DrawCircleCommand(x, y, radius));             
        };        
        
        /**
         * Dibuja un rectángulo. El relleno y el borde deben establecerse previamente
         * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
         * @param x La posición horizontal donde empieza el rectángulo
         * @param y La posición vertical donde empieza el rectángulo
         * @param width El ancho del rectángulo
         * @param height El alto del rectángulo
         */
        this.drawRect = function(x, y, width, height) 
        {
            _commands.push(new psd.fenix.display.commands.DrawRectCommand(x, y, width, height));             
        };

        /**
         * Dibuja un rectángulo con esquinas redondeadas. El relleno y el borde deben establecerse previamente
         * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
         * @param x La posición horizontal donde empieza el rectángulo
         * @param y La posición vertical donde empieza el rectángulo
         * @param width El ancho del rectángulo
         * @param height El alto del rectángulo
         * @param ellipseWidth  The width of the ellipse used to draw the rounded corners (in pixels).
         * @param ellipseHeight  The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
         */
        this.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight){
            _commands.push(new psd.fenix.display.commands.DrawRoundRectCommand(x, y, width, height, ellipseWidth, ellipseHeight));
        }

        /**
         * Aplica rellenos a todos los comandos gráficos ejecutados desde la última
         * llamada a un comando de tipo beginFill.
         */
        this.endFill = function()
        {
            _commands.push(new psd.fenix.display.commands.EndFillCommand());             
        };
        
        /**
         * 
         */
        this.lineStyle = function(thickness, color, alpha, caps, joints, miterLimit) 
        {
            _commands.push(new psd.fenix.display.commands.LineStyleCommand(thickness, color, alpha, caps, joints, miterLimit));
        };
        
        /**
         * 
         */
        this.lineTo = function(x, y) 
        {
            _commands.push(new psd.fenix.display.commands.LineToCommand(x, y));
        };        

        /**
         * 
         */
        this.moveTo = function(x, y) 
        {
            _commands.push(new psd.fenix.display.commands.MoveToCommand(x, y));
        };		
    }
	
    // Incluir clase al contexto window
    namespace.Graphics = Graphics;
	
})(psd.fenix.display);(function(namespace) {
    
    // Inheritance class
    DisplayObject.prototype = new psd.framework.EventDispatcher();
    
    /**
     * DisplayObject es la clase base para cualquier elemento visual dentro de
     * fenix
     * @constructor
     */
    function DisplayObject()
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.DisplayObject
         */
        this.className = "psd.fenix.DisplayObject";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Identificador único del objeto
        var _uid = psd.fenix.UID.getKeyId();
        
        // Indica si los valores medidos almacenados en _measuredWidth y _measuredHeight
        // son correctos. En caso contrario, debería realizarse una llamada a la función
        // _measure para actualizarlos correctamente
        var _validSize = false;
        
        // Valor de ancho establecido de manera interna.
        var _internalWidth = 0;
        
        // Valor de ancho establecido a través de la API DisplayObject::width()
        var _externalWidth = 0;
        
        // Valor de ancho medido
        var _measuredWidth = 0;
        
        // Valor de alto establecido de manera interna.
        var _internalHeight = 0;
        
        // Valor de alto establecido a través de la API DisplayObject::height()
        var _externalHeight = 0;
        
        // Valor de alto medido
        var _measuredHeight = 0;
        
        // Referencia al tipo de cursor seteado antes de realizar un cambio para 
        // mostrar interacción con el ratón (por ejemplo en mouseOver con buttonMode
        // y useHandCursor a true)
        var _prevCursor = null;
        
        // Flag indicando si ya hemos detectado el evento de mouseOver
        var _mouseOverFlag = false;        
        
        // Actualiza la referencia al parent de este displayobject
        var onAdded = function(evt) {_parent = evt.currentTarget;};
        
        // Escuchamos el evento de added para actualizar la referencia al parent
        // del displayobject
        this.addEventListener(psd.fenix.StageEvent.ADDED, onAdded);
        
        // Actualiza la referencia al stage de este displayobject
        var _onAddedToStage = function(evt)
        { 
            _stage = evt.currentTarget;
            _context2d = _stage.context2d();
        };

        //TODO meter función de comparación
        // Guarda el rectángulo de bounds de gráficos
        var _graphicsBounds = null;

        this.graphicsBounds = function(){
            return _graphicsBounds;
        }

        // Escuchamos el evento de added_to_stage para actualizar la referencia
        // al stage del displayobject
        this.addEventListener(psd.fenix.StageEvent.ADDED_TO_STAGE, _onAddedToStage, this);
        
        //


        // renderizado interno del displayobject.
        // @param ctx   El contexto que se desea preparar y sobre el que se realizará
        //              el renderizado
        this._prepareContext = function(ctx)
        {
            // Evitamos realizar acciones a falta de un contexto válido
            if(ctx)
            {                
                // Aplicamos las transformaciones en orden (traslación, rotación, escala)
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.scale(_scaleX, _scaleY);
                
                // Aplicamos la transparencia 
                ctx.globalAlpha = this.globalAlpha();
                
                // Si tenemos un scrollRect valido, ejecutamos el clip del contenido
                if(this.scrollRect != null)
                {
                    ctx.beginPath();
                    ctx.rect(0, 0, this.scrollRect.width, this.scrollRect.height);
                    ctx.clip();
                    ctx.translate(-this.scrollRect.x, -this.scrollRect.y);                                    
                }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Nombre del objeto
         */
        this.name = "instance_" + _uid;
        
        /**
         * Posicion x del objeto
         */
        this.x = 0;
        
        /**
         *
         */
        this.globalX = function()
        {
            if(this.className == "psd.fenix.Stage") {return 0;} 
            else if(this.parent()==null) {return this.x;}
            else {return this.parent().globalX() + this.x * this.parent().scaleX();}
        };
        
        /**
         * Posicion y del objeto
         */
        this.y = 0;
        
        /**
         *
         */
        this.globalY = function()
        {
            if(this.className == "psd.fenix.Stage") {return 0;} 
            else if(this.parent()==null) {return this.y;}
            else {return this.parent().globalY() + this.y * this.parent().scaleY();}
        };
        
        /**
         * Posición z del objeto
         */
        this.z = 0;
        
        /**
         * Ancho del objeto
         */
        this.width = function(value)
        {
            if(value && value!=_externalWidth) {_externalWidth = value;_validSize = false;}
            if(!_validSize){this.measure();}
            return _measuredWidth; 
        };
        
        /**
         * Alto del objeto
         */
        this.height = function(value)
        {
            if(value && value!=_externalHeight) {_externalHeight = value;_validSize = false;}
            if(!_validSize){this.measure();}
            return _measuredHeight;
        };
        
        /**
         * Escalado horizontal del objeto
         */
        var _scaleX = 1;
        this.scaleX = function(value)
        {
            if(value && value!=_scaleX) {_scaleX = value;_validSize = false;}
            return _scaleX;
        };
        
        /**
         * Escalado vertical del objeto
         */
        var _scaleY = 1;
        this.scaleY = function(value)
        {
            if(value && value!=_scaleY) {_scaleY = value;_validSize = false;}
            return _scaleY;
        };
        
        /**
         * Rotacion del objeto
         */
        this.rotation = 0;
	
        /**
         * Transparencia del objeto
         */
        this.alpha = 1;
        
        /**
         * Detección de interacción del ratón por bounds en lugar de hittest
         */
        var _boundsDetection = false;
        this.boundsDetection = function(value)
        {
            if(value!=undefined) {_boundsDetection = value;}
            return _boundsDetection;
        };
        
        /**
         * Transparencia total del objeto. Se calcula de manera recursiva 
         * aplicando todos los valores de alpha desde el objeto hasta el 
         * primer elemento situado en el displayList
         */
        this.globalAlpha = function(value)
        {
            if(value && value!=_alpha) {_alpha = value;}
            
            if(this.className == "psd.fenix.Stage") {return this.alpha;} 
            else if(this.parent()==null) {return 1;}
            else {return this.parent().globalAlpha() * this.alpha;}
        };
        
        /**
         * Visibilidad del objeto
         */
        this.visible = true;
        
        /**
         * Indica si el objeto permite interacción con el raton
         */
        this.mouseEnabled = true;
        
        /**
         * Indica si el objeto se comporta como un botón
         */
        this.buttonMode = false;
        
        /**
         * Indica si el objeto utiliza el cursor tipo 'pointer' en el estado over
         * siempre que se encuentre en buttonMode=true
         */
        this.useHandCursor = true;
        
        /**
         * ScrollRect del displayObject
         */
        this.scrollRect = null;        
        
        /**
         *
         */
        this.cacheAsBitmap = false;
        
        /**
         *
         */
        var _cache;
        this.cache = function() {
            return _cache;
        };
        
        
        /**
         *
         */
        this.invalidateCache = function() {
            if (Object.prototype.toString.call(c) === "[object HTMLCanvasElement]"){				
				var c = document.createElement("canvas");
				_cache = {canvas:c,
							ctx:c.getContext("2d"),
							svg:null,
							data:null,
							url:null,
							img:new Image(),
							caching:false,
							ready:0,
							delay:Math.floor(Math.random()*60),
							DOMURL:self.URL || self.webkitURL || self};
			}
			else{
				_cache = {};
			}

            this.dispatchEvent(new psd.fenix.event.CacheEvent(psd.fenix.event.CacheEvent.CACHE_FLUSH));
        };        
        
        /**
         * Referencia al stage de la aplicación. Esta propiedad es null hasta que
         * el displayobject no ha sido añadido al stage, bien directamente o a 
         * través de displaylists anidados (contenedores)
         */
        var _stage = null;
        this.stage = function() {return _stage;};
        
        /**
         * Referencia al contenedor padre del displayObject. Esta propiedad es null
         * hasta que no ha sido añadido a ningún contendor.
         */
        var _parent = null;
        this.parent = function() {return _parent;};
        
        /**
         * Instancia de context2d donde se debe renderizar este displayobject
         */
        var _context2d = null;
        this.context2d = function() {return _context2d;};
        
        /**
         * Clase graphics del elemento
         */
        var _graphics = new psd.fenix.display.Graphics();
        this.graphics = function() {return _graphics;};

        /**
         * Invalida el tamaño cuando los bounds del objeto graphics han cambiado
         */
        this.validateGraphics = function(){
            var bnd = this.graphics().bounds(), cambia = false;

            //Detectamos cambio de tamaño cuando:
            // - hay bnd en graphics
            // - no había un cálculo de graphics anterior
            // - el valor actual varía con respecto al almacenado
            if (bnd != null){
                if (_graphicsBounds==null){
                    cambia = true;
                }else if ((_graphicsBounds.x!=bnd.x)||(_graphicsBounds.y!=bnd.y)||(_graphicsBounds.width!=bnd.width)||(_graphicsBounds.height!=bnd.height)){
                    cambia = true;
                }
            }

            if (cambia){

                _graphicsBounds = new psd.fenix.Rectangle(bnd.x,bnd.y,bnd.width,bnd.height);
                _validSize = false;
            }
        };

        /**
         * Invalida el tamaño del displayobject introduciendo nuevos valores internos
         * @param w El valor de ancho interno
         * @param h El valor de alto interno
         */
        this.invalidateSize = function(w,h)
        {
            if(w!=null && w!=undefined) {_internalWidth = w;}
            if(h!=null && h!=undefined) {_internalHeight = h;}
            _validSize = false;
            
            if(this.parent()!=null && this.parent().className!="psd.fenix.Stage") {this.parent().invalidateSize();}
            
            this.invalidateCache();
            if(this.parent()!=null && this.parent().className!="psd.fenix.Stage") {this.parent().invalidateCache();}
            
        };
        
        /**
         * Valida el tamaño del dislpayObject
         * @param w
         * @param h
         */
        this.validateSize = function(w,h)
        {
            if(!_validSize)
            {
                if(_internalWidth!=0) {w = _internalWidth;}
                if(_internalHeight!=0) {h = _internalHeight;}
                
                if(w==0) {w = _externalWidth;}
                if(h==0) {h = _externalHeight;}
                
                if(_externalWidth!=0 && w!=0) {_scaleX = _externalWidth/w;}
                if(_externalHeight!=0 && h!=0) {_scaleY = _externalHeight/h;}
                
                _measuredWidth = w * _scaleX;
                _measuredHeight = h * _scaleY;
                _validSize = true;
                
                this.dispatchEvent(new psd.fenix.event.CacheEvent(psd.fenix.event.CacheEvent.CACHE_FLUSH));
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
            }
        };
        
        /**
         * Realiza los calculos necesarios para obtener la medida correcta de las 
         * dimensiones del displayobject
         */
        this.measure = function() {

            this.validateGraphics();

            if(!_validSize){
                if (_graphicsBounds != null){
                    this.validateSize(_graphicsBounds.width, _graphicsBounds.height);
                }else{
                    this.validateSize(_internalWidth, _internalHeight);
                }
            }
        }
        
        /**
         * Renderiza el displayObject sobre el contexto seleccionado
         * @param ctx El contexto sobre el que renderizar el objeto
         */
        this.render = function(ctx) 
        {
            // Sólo renderizamos el objeto si es visible
            if (ctx != null && this.visible && this.globalAlpha() > 0) 
            {
                // Guardamos el estado actual del contexto
                ctx.save();
                
                // Preparamos el contexto para el renderizado del objeto
                this._prepareContext.apply(this,[ctx]);
                
                // Ejectuamos las acciones de pintado de la instancia de graphics
                // del displayobject
                this.graphics().draw(ctx);

                // realizamos la medición
                this.measure();
                //_validSize = false;

                // Ejecutamos las acciones de renderizado del displayobject
                if (this._render) {this._render(ctx);}
                
                // Restauramos el estado anterior del contexto
                ctx.restore();
            }
        };
        
        /**
         * Detecta si el elemento tiene contenido en la posicion global (x,y) 
         * @param x Coordenada X que se quiere comprobar
         * @param y Coordenada Y que se quiere comprobar
         * @returns Boolean indicando si el displayObject tiene contenido en la
         *          posición indicada
         */
        this.testHit = function(x,y,hitContext)
        {
            var hit = (x >= this.globalX() && x <= this.globalX() + this.width() &&
                       y >= this.globalY() && y <= this.globalY() + this.height());

            if(hit && !_boundsDetection && psd!=null && psd.fenix!=null && hitContext!=null) {
                // Aplicamos las transformaciones necesarias para que el punto (x,y)
                // se pinte en el pixel (0,0) de nuestro hitCanvas.
                hitContext.clearRect(0,0,1,1);
                hitContext.save();
                this._prepareContext(hitContext);

                // Si el objeto permite renderizado, lo pintamos sobre el canvas 
                // de deteccion de raton, indicando que se trata de un render de test
                // _render(hitContext, true)
                if (typeof(this._render)!="undefined") {this._render(hitContext, true);}
                this.render(hitContext, true);

                // Detectamos colisión si el pixel situado en (0,0) del hitCanvas
                // que corresponde al (x,y) global tiene un valor de alpha mayor que 1
                if (typeof(hitContext.getImageData)!="undefined") {
                    hit = hitContext.getImageData(0, 0, 1, 1).data[3] > 1;
                }

                // Restauramos el contexto del hitCanvas para las siguientes operaciones
                hitContext.restore();
            }
            
            return hit;
        };
        
        /**
         * Flag indicando si ya hemos detectado el evento de mouseDown
         * TODO Sustituir getter/setter por propiedad privada
         */
        var _mouseDownFlag = false;
        this.isMouseDown = function(value)
        {
            if(value==true || value==false) {_mouseDownFlag = value;}
            return _mouseDownFlag;
        };
        
        /**
         * Invalida el estado del ratón sobre el displayObject.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.invalidateMouseStatus = function(mouseData) {this.updateMouseStatus(false,mouseData,true);};        
        
        /**
         * Actualiza el estado del ratón sobre el displayObject para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el displayobject
         */
        this.calculateMouseStatus = function(mouseData)
        {
            var hitResult = this.visible && this.testHit(mouseData.x,mouseData.y,mouseData.hitContext);
            this.updateMouseStatus(hitResult, mouseData, false);
            return hitResult;
        };        
        
        /**
         * Actualiza el estado del ratón sobre el elemento
         * @param hitResult El resultado del hitTest de la posición del ratón sobre el objeto
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @param invalidate Flag para indicar que la acción a realizar es invalidar
         *                   el estado actual.
         */
        this.updateMouseStatus = function(hitResult, mouseData, invalidate)
        {
            // Solo comprobamos colisiones para elementos que no son el stage
            if(this.className!="psd.fenix.Stage")
            {
                if(hitResult)
                {
                    // Si detectamos el raton encima del objeto, lanzamos el evento de over
                    // en el caso de que no se hubiera detectado ya (_mouseOverFlag=false)
                    if(!_mouseOverFlag)
                    {
                        _mouseOverFlag = true;
                        if(!invalidate)
                        {
                            if(this.buttonMode && this.useHandCursor) 
                            {
                                //_prevCursor = document.body.style.cursor;
                                document.body.style.cursor = "pointer";
                            }
                        }
                        this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OVER, mouseData.x, mouseData.y));
                    }

                }else{
                    // Si detectamos el raton fuera del objeto, lanzamos el evento de out
                    // en el caso de que no se hubiera detectado ya (_mouseOverFlag=true)
                    if(_mouseOverFlag)
                    {
                        _mouseOverFlag = false;
                        if(!invalidate)
                        {
                            document.body.style.cursor = "auto";
                            //_prevCursor = null;
                        }
                        this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OUT, mouseData.x, mouseData.y));
                    }
                }
            }
        };

        /**
         * Actualiza el estado del ratón sobre el displayObject para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el displayobject
         */
        this.calculateMouseDownStatus = function(mouseData)
        {
            var hitResult = this.visible && this.testHit(mouseData.x,mouseData.y,mouseData.hitContext);
            this.updateMouseDownStatus(hitResult, mouseData);
            return hitResult;
        };

        /**
         * Actualiza la propiedad mouseDown del objeto
         * @param hitResult El resultado del hitTest de la posición del ratón sobre el objeto
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.updateMouseDownStatus = function(hitResult, mouseData)
        {
            if(mouseData.down)
            {
                if(hitResult)
                {
                    if(!_mouseDownFlag)
                    {
                        _mouseDownFlag = true;
                        if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_DOWN, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                    }
                }else{
                    if(_mouseDownFlag)
                    {
                        _mouseDownFlag = false;
                        if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                    }
                }
            }else{
                if(_mouseDownFlag)
                {
                    _mouseDownFlag = false;
                    if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                }
            }
        };
        
        this.invalidateCache();
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.DisplayObject = DisplayObject;

})(psd.fenix);(function(namespace) {
	
    // Inheritance class
    DisplayObjectContainer.prototype = new psd.fenix.DisplayObject();
	
    // Construct
    function DisplayObjectContainer() 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.DisplayObjectContainer
         */
        this.className = "psd.fenix.DisplayObjectContainer";
                
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Notifica a los hijos que han sido añadidos al stage
        var _onAddedToStage = function(evt) 
        { 
            var i, numChildren = _displayList.length;
            for(i=0;i<numChildren;i++)
            {
                _displayList[i].dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, evt.currentTarget));
            }
        };
        
        // Escuchamos el evento de added_to_stage para actualizar la referencia
        // al stage de los hijos del contenedor
        this.addEventListener(psd.fenix.StageEvent.ADDED_TO_STAGE, _onAddedToStage, this);
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * DisplayList del contenedor. Array con todos los elementos que contiene.
         */
        var _displayList = [];
        this.displayList = function() {return _displayList;};
        
        /**
         * Numero de elementos en el contenedor.
         */
        this.numChildren = function() {return _displayList.length;};
        
        /**
         * 
         */
        var _mouseChildren = true;
        this.mouseChildren = function(value)
        { 
            if (value == true || value == false) {_mouseChildren = value;}
            return _mouseChildren;
        };        
        
        /**
         * Añade un nuevo elemento al contenedor
         * @param displayObject El nuevo elemento añadido
         */
        this.addChild = function(displayObject) 
        {
            // Añadimos el elemento al displayList del contenedor
            _displayList.push(displayObject);
            
            // Notificamos al displayObject que ha sido añadido para que actualice
            // la referencia a su parent
            displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));
            
            // Si el contenedor ya está añadido al stage, lo notificamos al elemento 
            // para que actualice la referencia al stage
            if (this.stage()!=null) {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this.stage()));}
            
            // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
            // al stage para que actualice la referencia de su propiedad stage
            if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
            
            return displayObject;
        };
        
        /**
         * Elimina un elemento del contenedor
         * @param displayObject El elemento a eliminar
         */
        this.removeChild = function(displayObject) 
        {
            // Obtenemos el indice del elemento y lo eliminamos del displayList
            var index = this.getChildIndex(displayObject);
            if (index >= 0) 
            { 
                _displayList.splice(index, 1);

                // Notificamos al displayObject que ha sido eliminado para que actualice
                // la referencia a su parent
                displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.REMOVED, this));

                // Si el contenedor es el Stage, notificamos que el elemento se ha eliminado
                // del stage para que actualice la referencia de su propiedad stage
                if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.REMOVED_FROM_STAGE, this));}
            }
			
            return displayObject;
        };        
        
        /**
         * Añade un nuevo elemento al contenedor en un nivel dado
         * @param displayObject El nuevo elemento añadido
         * @param index El nivel donde se debe añadir el elemento
         */
        this.addChildAt = function(displayObject, index)
        {
            // Añadimos el elemento al displayList del contenedor en el nivel indicado
            _displayList.splice(index, 0, displayObject);
						
            // Notificamos al displayObject que ha sido añadido para que actualice
            // la referencia a su parent
            displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));
            
            // Si el contenedor ya está añadido al stage, lo notificamos al elemento 
            // para que actualice la referencia al stage
            if (this.stage()!=null) {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this.stage()));}            
            
            // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
            // al stage para que actualice la referencia de su propiedad stage
            if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
			
            return displayObject;
        };
        
        /**
         * Elimina un elemento del contenedor en un nivel dado
         * @param index El nivel del que se quiere eliminar el elemento
         */
        this.removeChildAt = function(index) 
        {
            // Eliminamos el elemento si el índice es válido            
            var displayObject = null; 
            if (index >= 0 && index <= _displayList.length) 
            {
                displayObject = _displayList[index];
                _displayList.splice(index, 1);
                
                // Notificamos al displayObject que ha sido añadido para que actualice
                // la referencia a su parent
                displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));

                // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
                // al stage para que actualice la referencia de su propiedad stage
                if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
            }
			
            return displayObject;
        };
        
        /**
         *
         */
        this.getChildIndex = function(displayObject)
        {
            var i=0, index=-1;
            
            for(i in _displayList)
            {
                    if(_displayList[i] === displayObject) {index = i;break;}
            }
            
            return index;
        }
        
        /**
         * Realiza los calculos necesarios para obtener la medida correcta de las 
         * dimensiones del displayobject
         */
        this.measure = function()
        {
            var i, child,bnd,
                numChildren = _displayList.length,
                minX=Number.MAX_VALUE, maxX=-Number.MAX_VALUE,
                minY=Number.MAX_VALUE, maxY=-Number.MAX_VALUE;


            if(numChildren)
            {
                for(i=0;i<numChildren;i++)
                {
                    child = _displayList[i];

                    if(child.x<minX) {minX = child.x;}
                    if((child.x+child.width())>maxX) {maxX = child.x+child.width();}

                    if(child.y<minY) {minY = child.y;}
                    if((child.y+child.height())>maxY) {maxY = child.y+child.height();}
                }
            }

            this.validateGraphics();

            if (this.graphicsBounds()){
                if(this.graphicsBounds().x<minX){minX = this.graphicsBounds().x;}
                if(this.graphicsBounds().y<minY){minY = this.graphicsBounds().y;}
                if(this.graphicsBounds().width+this.graphicsBounds().x>maxX){maxX = this.graphicsBounds().width+this.graphicsBounds().x;}
                if(this.graphicsBounds().height+this.graphicsBounds().y>maxY){maxY = this.graphicsBounds().height+this.graphicsBounds().y;}
            }

            this.validateSize((maxX-minX), (maxY-minY));
        };
        
        /**
         * Elimina todos los elementos contenidos en el objeto
         */
        this.removeAllChildren = function() {
            while(this.numChildren()>0) {
                this.removeChildAt(0);
            }
        };

        /**
         * Renderiza el contenedor sobre el contexto seleccionado
         * @param ctx El contexto sobre el que renderizar el objeto
         */
        this.render = function(ctx) 
        {
            var i, cache = this.cache(),
                w = this.width(),
                h = this.height();
            
            // Sólo renderizamos el objeto si es visible 
            if (ctx != null && this.visible && this.globalAlpha() > 0) 
            {
                // Guardamos el estado actual del contexto
                ctx.save();

                // Preparamos el contexto para el renderizado del objeto
                this._prepareContext(ctx);
                
                if(this.cacheAsBitmap && cache.ready > 0) {
                    
                    cache.ready = Math.max(cache.ready-1,0);                    
                    ctx.drawImage(cache.img, 0, 0);
                    
                } else {

                    // Ejectuamos las acciones de pintado de la instancia de graphics
                    // del displayobject

                    this.graphics().draw(ctx);

                    // Ejecutamos las acciones de renderizado del contenedor
                    if (this._render) {this._render(ctx);}

                    // Renderizamos todos los elementos del contenedor
                    for (i = 0; i < _displayList.length; i++) {_displayList[i].render(ctx);}
                    
                    if(this.cacheAsBitmap) {
                        if(cache.delay > 0) {
                            cache.delay--;
                        }else if(cache.ready==0 && !cache.caching) {
                            
                            w = 2*w;
                            h = 2*h;
                            
                            cache.caching = true;
                            
                            cache.canvas.setAttribute("width", w);
                            cache.canvas.setAttribute("height", h);
                            cache.ctx.clearRect(0, 0, w, h);
                            
                            this.graphics().draw(cache.ctx);
                            if (this._render) {this._render(cache.ctx);}
                            for (i = 0; i < _displayList.length; i++) {_displayList[i].render(cache.ctx);}                        

                            cache.url = cache.canvas.toDataURL();                            
                            cache.img.onload = function() {
                                cache.ready = 60*60*5;
                                cache.caching = false;
                            };
                            cache.img.src = cache.url;
                        }
                    }
                }
                
                // Si el tamaño del objeto no es válido, realizamos la medición
                this.measure();

                // Restauramos el estado anterior del contexto
                ctx.restore();                
            }
        };
        
        /**
         * Invalida el estado del ratón sobre el contenedor.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.invalidateMouseStatus = function(mouseData) 
        {
            var i;
            
            for(i in _displayList)
            {
                _displayList[i].invalidateMouseStatus(mouseData);
            }
            
            DisplayObjectContainer.prototype.invalidateMouseStatus.apply(this, [mouseData]); 
        };        

        /**
         * Actualiza el estado del ratón sobre el contenedor para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el contenedor
         */
        this.calculateMouseStatus = function(mouseData)
        {
            var hitResult = false,
                hitContext = mouseData.hitContext,
                i = _displayList.length;

            if(this.visible) {
                
                // Guardamos el estado actual del contexto de colisiones
                hitContext.save();

                // Aplicamos la transformación del contenedor al contexto de colisiones
                if(this.className!="psd.fenix.Stage"){this._prepareContext(hitContext);}

                // Recorremos los elementos del contenedor de mayor a menor profundidad
                // actualizando el estado del ratón sobre cada uno. Si se detecta un hit,
                // dejamos de seguir preguntando
                while(i>0)
                {
                    i--;
                    hitResult = _displayList[i].calculateMouseStatus(mouseData);
                    if(hitResult) {break;}
                }

                // Si i>0 significa que hemos detectado un hit sobre uno de los hijos
                // del contenedor, por lo que invalidamos el estado del ratón sobre todos
                // los elementos por debajo
                if(i>0)
                {
                    while(i>0)
                    {
                        i--;
                        _displayList[i].invalidateMouseStatus(mouseData);
                    }
                }

                // Restauramos el estado anterior del contexto de colisiones
                // TODO Revisar el efecto de esta linea sobre el siguiente calculateMouseStatus. Éste
                // se ejecuta si ningún hijo del contenedor ha devuelto colisión y si el contenedor
                // tiene definido un método propio de renderizado. Hay que comprobar que el funcionamiento
                // es el correcto o modificar el orden de las transformaciones en caso contrario.
                hitContext.restore();

                // Si no hemos detectado un hit, ejecutamos el test de colisión sobre el 
                // propio contenedor
                if(!hitResult) {hitResult = DisplayObjectContainer.prototype.calculateMouseStatus.apply(this,[mouseData]);}

                // Actualizamos el estado del ratón en función del valor de testHit y mouseDown
                this.updateMouseStatus(hitResult, mouseData, true);
            }
            
            return hitResult;
        };
        
        /**
         * Actualiza el estado del ratón sobre el contenedor para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el contenedor
         */
        this.calculateMouseDownStatus = function(mouseData)
        {
            var hitResult = false,
                hitContext = mouseData.hitContext,            
                i = _displayList.length;
             
            if(this.visible) {
                
                // Guardamos el estado actual del contexto de colisiones
                hitContext.save();

                // Aplicamos la transformación del contenedor al contexto de colisiones
                if(this.className!="psd.fenix.Stage"){this._prepareContext(hitContext);}                

                // Recorremos los elementos del contenedor de mayor a menor profundidad
                // actualizando el estado del ratón sobre cada uno. Si se detecta un hit,
                // dejamos de seguir preguntando
                while(i>0)
                {
                    i--;
                    hitResult = _displayList[i].calculateMouseDownStatus(mouseData);
                    if(hitResult) {break;}
                }

                // Restauramos el estado anterior del contexto de colisiones
                // TODO Revisar el efecto de esta linea sobre el siguiente calculateMouseStatus. Éste
                // se ejecuta si ningún hijo del contenedor ha devuelto colisión y si el contenedor
                // tiene definido un método propio de renderizado. Hay que comprobar que el funcionamiento
                // es el correcto o modificar el orden de las transformaciones en caso contrario.
                hitContext.restore();            

                // Si no hemos detectado un hit, ejecutamos el test de colisión sobre el 
                // propio contenedor
                if(!hitResult) {hitResult = DisplayObjectContainer.prototype.calculateMouseDownStatus.apply(this,[mouseData]);}

                // Actualizamos el estado del ratón en función del valor de testHit y mouseDown
                this.updateMouseDownStatus(hitResult, mouseData);
            }
            
            return hitResult;
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix
    namespace.DisplayObjectContainer = DisplayObjectContainer;

})(psd.fenix);(function(namespace) {

    // Inheritance class
    Movieclip.prototype = new psd.fenix.DisplayObject();

    /**
     * Movieclip es una clase que simula el funcionamiento del movieclip
     * tradicional de flash.
     * @constructor
     * @param texture
     * @param frames 
     */
    function Movieclip(texture, frames)
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.Movieclip
         */
        this.className = "psd.fenix.Movieclip";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Frame actual del movieclip
        var _currentFrame = 0;
        
        // Indica si el movieclip se está reproduciendo o está detenido
        var _isPlaying = true;

        // Image con la secuencia de imágenes que componen el movieclip
        var _texture = texture;
        
        // Información sobre los distintos frames del movieclip y su ubicación
        // sobre la imagen de textura
        var _frames = frames;
        this.invalidateSize(_frames[0].frame.w,_frames[0].frame.h);        
        
        // Renderiza el movieclip en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        // @param testRender Indica si el renderizado es para un hitTest
        this._render = function(ctx, testRender) 
        {
            // Obtenemos la información sobre la imagen correspondiente al frame actual.
            // Hay que tener en cuenta que los frames pueden estar rotados por lo que el
            // cálculo de la región a extraer debe considerar este factor
            var _currentTexture = _frames[_currentFrame],
                _currentTextureFrame = _currentTexture.frame,
                _currentTextureRotation = _currentTexture.rotated,
                _currentTextureWidth = _currentTextureRotation?_currentTextureFrame.h:_currentTextureFrame.w,
                _currentTextureHeight = _currentTextureRotation?_currentTextureFrame.w:_currentTextureFrame.h,
                _internalWidth = _currentTextureRotation?this.height():this.width(),
                _internalHeight = _currentTextureRotation?this.width():this.height();

            // Si la textura actual está rotada, aplicamos la transforamción necesaria al contexto
            // para que la imagen quede situada correctamente
            if(_currentTextureRotation) 
            { 
                ctx.translate(0,_internalHeight/2);
                ctx.rotate(-Math.PI/2);
            }

            // Extraemos del atlas de texturas la región correspondiente al frame actual
            ctx.drawImage(_texture, 
                            _currentTextureFrame.x, _currentTextureFrame.y, 
                            _currentTextureWidth, _currentTextureHeight, 
                            0, 0, 
                            _currentTextureWidth, _currentTextureHeight);

            // Si el movieclip está en reproducción y el render no se ha ejecutado
            // en modo testHit, avanzamos la cabeza lectora
            if(_isPlaying && !testRender)
            {
                _currentFrame++;
                if(_currentFrame>=_frames.length) {_currentFrame = 0;}
            }
        };
        
        // Utilidad que devuelve el frame asociado a una etiqueta en particular
        // @param String que identifica el frame buscado
        // @returns El número de frame cuya etiqueta coincide con el parámetro de 
        //          entrada, o el frame actual en caso de que no se encuentre otro.
        var _getFrameByLabel = function(label)
        {
            var frame = _currentFrame, i;
            
            for(i in _frames)
            {
                if(_frames[i].label == label) { frame = i; break; }
            }
            
            return frame;
        };
        
        //
        var _getFrameSize = function(frame) {
            var frameSize = {width:0, height:0},
                texture = _frames[frame],
                textureFrame = texture.frame,
                textureRotation = texture.rotated;
                
            frameSize.width = textureRotation?textureFrame.h:textureFrame.w;
            frameSize.height = textureRotation?textureFrame.w:textureFrame.h;
                
            return frameSize;
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Sitúa el movieclip en un frame y para su reproducción
         * @param frame El frame en el que se sitúa el movieclip
         */
        this.gotoAndStop = function(frame)
        {
            var frameSize;
            
            this.stop();
          
            if(typeof(frame)=="number") { _currentFrame = frame; }
            else if(typeof(frame)=="string") { _currentFrame = _getFrameByLabel(frame); }
            
            frameSize = _getFrameSize.apply(this,[_currentFrame]);
            this.invalidateSize(frameSize.width, frameSize.height);
        };
        
        /**
         * Sitúa el movieclip en un frame y continúa su reproducción
         * @param frame El frame en el que se sitúa el movieclip
         */
        this.gotoAndPlay = function(frame) 
        { 
            if(typeof(frame)=="number") { _currentFrame = frame; }
            else if(typeof(frame)=="string") { _currentFrame = _getFrameByLabel(frame); }
            
            this.play();
        };
        
        /**
         * Reinicia la reproducción del movieclip
         */
        this.play = function() { _isPlaying = true; };
        
        /**
         * Detiene la reproducción del movieclip
         */
        this.stop = function() { _isPlaying = false; };
        
        /**
         * El frame actual del mc
         */
        this.currentFrame = function() { return _currentFrame; }
        
        /**
         * 
         */
        this.currentLabel = function() { return _frames[_currentFrame].label; }
    }

    namespace.Movieclip = Movieclip;

})(psd.fenix);(function(namespace) {

    // Inheritance class
    Video.prototype = new psd.fenix.DisplayObject();

    /**
     * Video es una clase genérica para incluir un elemento de <video> en fenix
     * @constructor
     */
    function Video(videoElement)
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.display.Video
         */
        this.className = "psd.fenix.display.Video";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        //
        var _videoElement = videoElement;
        
        // Indica si el video debe renderizarse sobre el canvas. Por defecto se desactiva
        // si el parámetro de entrada es un tag de video
        var _canvasRendering = false;
        
        // Referencia al tag <video> controlado.
        var _video = _videoElement.mediaTag();
        
        // Renderizado del objeto de video
        this._render = function(ctx) 
        {
            if(_canvasRendering && _video!=null) { ctx.drawImage(_video,0,0,this.width(),this.height()); }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Sobreescribimos testHit para evitar problemas de seguridad al intentar
         * acceder a las imagenes del video a través de diferentes dominios. En cambio,
         * ejecutamos una detección basada enteramente en limites
         * @param x Posicion x de deteccion
         * @param y Posicion y de deteccion
         */
        this.testHit = function(x,y)
        {
            return (x >= this.x && x <= this.x + this.width() &&
                    y >= this.y && y <= this.y + this.height());
        };
    }

    namespace.Video = Video;

})(psd.fenix.display);(function(namespace) {

    // Inheritance class
    Clip.prototype = new psd.fenix.DisplayObject();

    // Construct
    function Clip(imageURL) 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.Clip
         */
        this.className = "psd.fenix.Clip";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Viewport de visualización del clip
         */
        this.viewPort = null;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Url fuente de la imagen cargada en el Clip
        var _imageURL = imageURL;
        
        // Flag indicando si la carga de la imagen se ha completado
        var _imageReady = false;
        
        // Elemento imagen utilizado para el renderizado sobre canvas. Incluye una
        // función anónima en _image.onload que actualiza las dimensiones del
        // displayObject y actualiza el valor del flag _imageReady
        var _image = new Image();
            _image.onload = (function (displayObject) 
                {
                    return function()
                    {
                        _imageReady = true;
                        displayObject.invalidateSize(_image.width, _image.height);
                    }
                    
                })(this);
        
        // Renderiza el clip en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        // @param testRender Indica si el renderizado es para un hitTest
        this._render = function(ctx, testRender) 
        {
            if( _imageReady == true)
            {
                
                // Si no se ha definido un viewport sobre el Clip, se toma como origen
                // la imagen al completo.
                if(this.viewPort==null)
                {
                    // Si no se han seteado ancho y alto, la imagen se muestra tal cual
                    if(this.width() == 0 && this.height() == 0) { ctx.drawImage(_image, 0, 0); }
                    else{ ctx.drawImage(_image, 0, 0, this.width(), this.height()); }
                    
                } else {
                    
                    // En caso de contar con un viewport
                    ctx.drawImage(_image,
                                this.viewPort.x, this.viewPort.y,
                                this.viewPort.width, this.viewPort.height,
                                this.x, this.y,
                                this.width(), this.height());
                }
            }
        };

        // Iniciamos la carga de la imagen inicializando su valor src
        _image.src = _imageURL;
    }

    namespace.Clip = Clip;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    MediaElement.prototype = new psd.framework.EventDispatcher();
    
    // Contenido multimedia de tipo video
    MediaElement.TYPE_VIDEO = "video";
    
    // Contenido multimedia de tipo audio
    MediaElement.TYPE_AUDIO = "audio";
    
    /**
     * MediaElement sirve de puente entre fenix y los tags nativos multimedia
     * <video> y <audio> de la especificación HTML5
     * @param mediaType El tipo de contenido (video o audio)
     * @param mediaData El tag o array de urls del contenido
     * @param settings Parámetros de configuración adicionales (poster, autoplay, controls...)
     * @constructor 
     */
    function MediaElement(mediaType, mediaData, settings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.media.MediaElement
         */
        this.className = "psd.fenix.media.MediaElement";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Parámetro de entrada. Los parámetros de entrada permitidos son:
        //   - [object HTMLVideoElement] Si se recibe directamente el tag de video
        //   - [object HTMLAudioElement] Si se recibe directamente el tag de audio
        //   - [object Array] Si se recibe un array de urls
        var _inputParam = mediaData;
        
        // Tipo de contenido multimedia. Puede ser "audio" o "video"
        var _mediaType = mediaType;
        
        // Parámetros de configuración adicionales
        var _settings = settings;
        
        // Referencia al tag multimedia 
        var _media = null;
        
        // Array de urls que debe reproducir el elemento multimedia
        var _urls = null;
        
        // Script to be run on abort
        var _deferredOnAbort = (function(controller) { return function(event){ _onAbort.apply(controller,[event]); } })(this);
        var _onAbort = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ABORT));            
        };
        
        // Script to be run when a file is ready to start playing (when it has buffered enough to begin)
        var _deferredOnCanPlay = (function(controller) { return function(event){ _onCanPlay.apply(controller,[event]); } })(this);
        var _onCanPlay = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.CAN_PLAY));            
        };
        
        // Script to be run when a file can be played all the way to the end without pausing for buffering
        var _deferredOnCanPlayThrough = (function(controller) { return function(event){ _onCanPlayThrough.apply(controller,[event]); } })(this);
        var _onCanPlayThrough = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.CAN_PLAY_THROUGH));            
        };
        
        // Script to be run when the length of the media changes
        var _deferredOnDurationChange = (function(controller) { return function(event){ _onDurationChange.apply(controller,[event]); } })(this);
        var _onDurationChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.DURATION_CHANGE));            
        };
        
        // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
        var _deferredOnEmptied = (function(controller) { return function(event){ _onEmptied.apply(controller,[event]); } })(this);
        var _onEmptied = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.EMPTIED));            
        };
        
        // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
        var _deferredOnEnded = (function(controller) { return function(event){ _onEnded.apply(controller,[event]); } })(this);
        var _onEnded = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ENDED));            
            _media.load();
        };
        
        // Script to be run when an error occurs when the file is being loaded
        var _deferredOnError = (function(controller) { return function(event){ _onError.apply(controller,[event]); } })(this);
        var _onError = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ERROR));            
        };
        
        // Script to be run when media data is loaded
        var _deferredOnLoadedData = (function(controller) { return function(event){ _onLoadedData.apply(controller,[event]); } })(this);
        var _onLoadedData = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOADED_DATA));            
        };
        
        // Script to be run when meta data (like dimensions and duration) are loaded
        var _deferredOnLoadedMetaData = (function(controller) { return function(event){ _onLoadedMetaData.apply(controller,[event]); } })(this);
        var _onLoadedMetaData = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOADED_METADATA));            
        };
        
        // Script to be run just as the file begins to load before anything is actually loaded
        var _deferredOnLoadStart = (function(controller) { return function(event){ _onLoadStart.apply(controller,[event]); } })(this);
        var _onLoadStart = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOAD_START));            
        };
        
        // Script to be run when the media is paused either by the user or programmatically
        var _deferredOnPause = (function(controller) { return function(event){ _onPause.apply(controller,[event]); } })(this);
        var _onPause = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PAUSE));            
        };
        
        // Script to be run when the media is ready to start playing
        var _deferredOnPlay = (function(controller) { return function(event){ _onPlay.apply(controller,[event]); } })(this);
        var _onPlay = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAY));            
        };
        
        // Script to be run when the media actually has started playing
        var _deferredOnPlaying = (function(controller) { return function(event){ _onPlaying.apply(controller,[event]); } })(this);
        var _onPlaying = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAYING));            
        };
        
        // Script to be run when the browser is in the process of getting the media data
        var _deferredOnProgress = (function(controller) { return function(event){ _onProgress.apply(controller,[event]); } })(this);
        var _onProgress = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PROGRESS));            
        };
        
        // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
        var _deferredOnRateChange = (function(controller) { return function(event){ _onRateChange.apply(controller,[event]); } })(this);
        var _onRateChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.RATE_CHANGE));            
        };
        
        // Script to be run each time the ready state changes (the ready state tracks the state of the media data)
        var _deferredOnReadyStateChange = (function(controller) { return function(event){ _onReadyStateChange.apply(controller,[event]); } })(this);
        var _onReadyStateChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.READY_STATE_CHANGE));            
        };
        
        // Script to be run when the seeking attribute is set to false indicating that seeking has ended
        var _deferredOnSeeked = (function(controller) { return function(event){ _onSeeked.apply(controller,[event]); } })(this);
        var _onSeeked = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SEEKED));            
        };
        
        // Script to be run when the seeking attribute is set to true indicating that seeking is active
        var _deferredOnSeeking = (function(controller) { return function(event){ _onSeeking.apply(controller,[event]); } })(this);
        var _onSeeking = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SEEKING));            
        };
        
        // Script to be run when the browser is unable to fetch the media data for whatever reason
        var _deferredOnStalled = (function(controller) { return function(event){ _onStalled.apply(controller,[event]); } })(this);
        var _onStalled = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.STALLED));            
        };
        
        // Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
        var _deferredOnSuspend = (function(controller) { return function(event){ _onSuspend.apply(controller,[event]); } })(this);
        var _onSuspend = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SUSPEND));            
        };
        
        // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
        var _deferredOnTimeUpdate = (function(controller) { return function(event){ _onTimeUpdate.apply(controller,[event]); } })(this);
        var _onTimeUpdate = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.TIME_UPDATE,_media.currentTime));
        };
        
        // Script to be run each time the volume is changed which (includes setting the volume to "mute")
        var _deferredOnVolumeChange = (function(controller) { return function(event){ _onVolumeChange.apply(controller,[event]); } })(this);
        var _onVolumeChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.VOLUME_CHANGE));            
        };
        
        // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
        var _deferredOnWaiting = (function(controller) { return function(event){ _onWaiting.apply(controller,[event]); } })(this);
        var _onWaiting = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.WAITING));            
        };
        
        // Inicializa el componente
        var _init = function()
        {
            var _videoParamType = "[object HTMLVideoElement]",
                _audioParamType = "[object HTMLAudioElement]",
                _arrayParamType = "[object Array]",
                _inputParamType = Object.prototype.toString.apply(_inputParam),
                i, param;
                
            _media = (_inputParamType == _videoParamType || _inputParamType == _audioParamType) ? _inputParam : null;
            _urls = _inputParamType == _arrayParamType ? _inputParam : [_inputParam];
            
            if(_media == null && (_mediaType == MediaElement.TYPE_VIDEO || _mediaType == MediaElement.TYPE_AUDIO))
            {
				_media = document.createElement(_mediaType);
				
				if (_mediaType == "audio"){
                    _media.setAttribute("style","position:absolute;") 
                }
                else{
                    _media.setAttribute("style","position:absolute; background:black;")
                    //_media.setAttribute("style","position:absolute;")
                }
                
				_media.setAttribute("width", _settings["width"]); 
				_media.setAttribute("height", _settings["height"]); 


                for(i in _urls)
                {
                    var sourceElement = document.createElement("source");
                    sourceElement.setAttribute("src", _urls[i].src);
                    _media.appendChild(sourceElement);
                }
                
                // Soporte para opciones de configuración adicionales
                if(typeof(_settings)!="undefined" && _settings!=null)
                {
                    // autoplay
                    param = _settings["autoplay"];
                    if(typeof(param)!="undefined" && (param=="true" || param==true)) { _media.setAttribute("autoplay", "autoplay"); }
                    
                    // poster
                    param = _settings["poster"];
                    if(typeof(param)!="undefined" && param!="") { _media.setAttribute("poster", param); }
                }
                
                _addMediaEventListener(psd.fenix.event.MediaEvent.ABORT, _deferredOnAbort);
                _addMediaEventListener(psd.fenix.event.MediaEvent.CAN_PLAY, _deferredOnCanPlay);
                _addMediaEventListener(psd.fenix.event.MediaEvent.CAN_PLAY_THROUGH, _deferredOnCanPlayThrough);
                _addMediaEventListener(psd.fenix.event.MediaEvent.DURATION_CHANGE, _deferredOnDurationChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.EMPTIED, _deferredOnEmptied);
                _addMediaEventListener(psd.fenix.event.MediaEvent.ENDED, _deferredOnEnded);
                _addMediaEventListener(psd.fenix.event.MediaEvent.ERROR, _deferredOnError);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOADED_DATA, _deferredOnLoadedData);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOADED_METADATA, _deferredOnLoadedMetaData);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOAD_START, _deferredOnLoadStart);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PAUSE, _deferredOnPause);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PLAY, _deferredOnPlay);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PLAYING, _deferredOnPlaying);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PROGRESS, _deferredOnProgress);
                _addMediaEventListener(psd.fenix.event.MediaEvent.RATE_CHANGE, _deferredOnRateChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.READY_STATE_CHANGE, _deferredOnReadyStateChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SEEKED, _deferredOnSeeked);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SEEKING, _deferredOnSeeking);
                _addMediaEventListener(psd.fenix.event.MediaEvent.STALLED, _deferredOnStalled);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SUSPEND, _deferredOnSuspend);
                _addMediaEventListener(psd.fenix.event.MediaEvent.TIME_UPDATE, _deferredOnTimeUpdate);
                _addMediaEventListener(psd.fenix.event.MediaEvent.VOLUME_CHANGE, _deferredOnVolumeChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.WAITING, _deferredOnWaiting);                
                
                psd.fenix.topLevelApplication.insertBefore(_media, psd.fenix.topLevelCanvas);
            }
        };
        
        // Añade un listener a un evento de la etiqueta multimedia        
        var _addMediaEventListener = function(type, listener)
        {
            if(_media)
            {
                if(_media.addEventListener) { _media.addEventListener(type, listener, false); }
                else if(_media.attachEvent) { _media.attachEvent(type, listener); }
            }
        };
        
        // Inicializamos el MediaElement
        _init.apply(this);        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Tiempo actual del contenido
         */
        this.currentTime = function(value) 
        { 
            var currentTime = 0;
            
            if(_media) 
            { 
                if(typeof(value)!="undefined") { _media.currentTime = value; }
                currentTime = _media.currentTime;
            }
            
            return currentTime;
        };
        
        /**
         * Duración del contenido
         */
        this.duration = function() { if(_media) { return _media.duration; } else { return 0; } }
        
        /**
         * Autoplay
         **/
        this.autoplay = function(autoplay)
        {
            if (_media)
            {
                if (autoplay == false){_media.removeAttribute("autoplay")}
                else {_media.setAttribute("autoplay", "autoplay")}
            }
        }
        
        /**
         * Pausa el contenido
         */
        this.pause = function() { if(_media){ _media.pause(); } };
        
        /**
         * Estado de reproducción del contenido
         */
        this.paused = function() { if(_media) { return _media.paused; } else { return false; } }
        
        /**
         * Reproduce el contenido
         */
        this.play = function() { if(_media){ _media.play(); } };

        /**
         * Redimensiona el elemento multimedia
         * @param x Posición x del elemento (estilo left)
         * @param y Posición y del elemento (estilo top)
         * @param w Ancho del elemento
         * @param h Alto del elemento
         */
        this.resize = function(x,y,w,h)
        {
            if(_media)
            {
                //var mediaStyle = _media.getAttribute("style");
                
                //if(x) { mediaStyle+="left:"+x+";"; }
                //if(y) { mediaStyle+="left:"+y+";"; }
                if(w) { _media.width = w; }
                if(h) { _media.height = h; }
            }
        };
        
        /**
         * Volumen del elemento multimedia
         */
        this.volume = function(value)
        {
            var volume = 0;
            
            if(_media)
            {
                if(value>=0 && value<=1) { _media.volume = value; }
                volume = _media.volume;
            }
            
            return volume;
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.media	
    namespace.MediaElement = MediaElement;

})(psd.fenix.media);
(function(namespace) {
    
    // Inheritance class
    MediaController.prototype = new psd.framework.EventDispatcher();
    
    /**
     * MediaController es la clase básica para la implementación de controladores
     * multimedia en fenix.
     * @constructor
     */
    function MediaController() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.media.MediaController
         */
        this.className = "psd.fenix.media.MediaController";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Referencia al tag multimedia html5. Puede ser <video> o <audio>
        var _media = null;
        
        // Indica si la reproducción se ha iniciado
        var _started = false;

        // Evento de fin de la reproducción
        var _onMediaPlay = function(evt) 
        { 
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAY));
        }
        
        // Evento de fin de la reproducción
        var _onMediaPause = function(evt) 
        { 
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PAUSE));
        }

        // Evento de fin de la reproducción
        var _onMediaEnded = function(evt) 
        { 
            _started = false;
            
            _media.autoplay(false);
            _media.pause();
            _media.currentTime(0);
            this.dispatchEvent(evt); 
        }

        // Evento de inicio de la reproducción
        var _onMediaPlaying = function(evt) 
        { 
            if(!_started)
            {
                _started = true;
                this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.BEGIN));
            }
            this.dispatchEvent(evt); 
        };
        
        var _onMediaWaiting = function (evt)
        {
            this.dispatchEvent(evt); 
        }
        
        // Evento de progreso de la reproducción
        var _onMediaTimeUpdate = function(evt) { this.dispatchEvent(evt); };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Establece el elemento multimedia que se quiere controlar
         * @param mediaElement El elemento multimedia que se quiere manipular a 
         *                      través de de este controlador.
         */
        this.attachStream = function(mediaElement)
        {
            _media = mediaElement;
            _media.addEventListener(psd.fenix.event.MediaEvent.PLAY, _onMediaPlay, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.PAUSE, _onMediaPause, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.ENDED, _onMediaEnded, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.PLAYING, _onMediaPlaying, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.TIME_UPDATE, _onMediaTimeUpdate, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.WAITING, _onMediaWaiting, this);
        };
        
        /**
         * Posición actual de reproducción del contenido en segundos
         */
        this.currentTime = function() { if(_media) { return _media.currentTime(); } else {return 0;} }
        
        /**
         * Posición actual de reproducción en formato de tiempo
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.currentTimeAsTimeCode = function(format) {return this.secondsAsTimeCode(this.currentTime(), format);}
        
        /**
         * Duración del contenido en segundos
         */
        this.duration = function() { if(_media) { return _media.duration(); } else {return 0;} }
        
        /**
         * Duración del contenido en formato de tiempo
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.durationAsTimeCode = function(format) {return this.secondsAsTimeCode(this.duration(), format);}
        
        /**
         * Reproduce el contenido
         */
        this.play = function() { if(_media) { _media.play(); } };
        
        /**
         * Pausa la reproducción del contenido
         */
        this.pause = function() { if(_media) { _media.pause(); } };
        
        /**
         * Estado re reproducción del contenido
         */
        this.paused = function() { if(_media) { return _media.paused(); } else { return false; } };
        
        /**
         * Utilidad para convertir segundos en formato de tiempo
         * @param time Segundos que se quieren convertir
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.secondsAsTimeCode = function(time, format)
        {
            var hours = Math.floor(time/3600),
                minutes = Math.floor((time - (hours*3600))/60),
                seconds = Math.floor(time - (hours*3600) - (minutes*60)),
                timecode = "";
                
           if(hours<10) {hours = "0" + hours;}
           if(minutes<10) {minutes = "0" + minutes;}
           if(seconds<10) {seconds = "0" + seconds;}
           
           if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
           else 
           { 
               timecode = format.replace('hh', hours);
               timecode = timecode.replace('mm', minutes);
               timecode = timecode.replace('ss', seconds);
           }
           
           return timecode;
        };
        
        /**
         * Ejecuta una petición de seek sobre el contenido
         * @param value Posición a la que se quiere hacer seek. Valores en el rango
         *              (0..1) se consideran como porcentajes sobre el total de la
         *              duración del contenido, y en el rango [1..INF) como segundos 
         *              de manera absoluta desde el principio del contenido
         */
        this.seek = function(value)
        {
            if(value>0 && value<1) {value = value * _media.duration();}
            
            _media.currentTime(value);
        };
        
        /**
         * Volumen del elemento multimedia
         */
        this.volume = function(value) { if(_media) { return _media.volume(value); } else { return 0; }};
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.media
    namespace.MediaController = MediaController;

})(psd.fenix.media);(function(namespace) {

    /**
     * La clase TextFormat representa la opciones de formato que se debe aplicar
     * sobre el contenido de un campo de texto
     * @constructor
     */
    function TextFormat() 
    {
        /**
         * className psd.fenix.text.TextFormat
         */
        this.className = "psd.fenix.text.TextFormat";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Especifica si el texto se renderiza en negrita
         */
        this.bold = false;
        
        /**
         * El color del texto
         */
        this.color = 0x000000;
        
        /**
         * La fuente del texto
         */
        this.font = "Verdana, Geneva, sans-serif";
        
        /**
         * Especifica si el texto se renderiza en cursiva
         */
        this.italic = false;
        
        /**
         * El tamaño del texto en pixels
         */
        this.size = 16;
        
        /**
         * Devuelve una representación de las propiedades de formato apropiada
         * para el renderizado sobre canvas
         * @returns La representación del formato para su aplicación sobre un
         *          context2d de un elemento canvas.
         */
        this.toCanvasString = function()
        {
            var canvasString = "";
            
            if(this.bold) {canvasString += "bold ";}
            if(this.italic) {canvasString += "italic ";}
            
            canvasString += this.size + "px ";
            canvasString += this.font + " ";
            
            return canvasString;
        };
        
        /**
         * Devuelve una representación de las propiedades de formato apropiada
         * para el renderizado sobre html con css
         * @returns La representación del formato para su aplicación sobre un
         *          contenedor html como estilo de css.
         */
        this.toCSSString = function()
        {
            var colorString = this.color.toString(16);
            if(colorString.indexOf("0x")==0) { colorString = colorString.substr(2); }
                
            var cssString = "";
            
            cssString+="font-family:"+this.font+";";
            cssString+="font-size:"+this.size+"px;";
            cssString+="font-style:"+(this.italic?"italic;":"normal;");
            cssString+="font-weight:"+(this.bold?"bold;":"normal;");
            cssString+="color:#"+colorString+";";
            
            return cssString;
        };
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.text	
    namespace.TextFormat = TextFormat;
	
})(psd.fenix.text);(function(namespace) {
    
    //
    namespace.TextFieldAutoSize = {};
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.CENTER = "center";
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.LEFT = "left";
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.NONE = "none";
        
    /**
     * 
     */
    namespace.TextFieldAutoSize.RIGHT = "right";

})(psd.fenix.text);(function(namespace) {

    // Inheritance class
    TextField.prototype = new psd.fenix.DisplayObject();

    /**
     * La clase TextField es un componente que sirve para mostrar texto dentro
     * de una aplicación fenix
     * @constructor
     */
    function TextField() 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
	
        /**
         * className psd.fenix.text.TextField
         */
        this.className = "psd.fenix.text.TextField";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // 
        var _textCache;
        
        // 
        var _textCacheDataTemplate = "<svg xmlns='http://www.w3.org/2000/svg' width='{WIDTH}px' height='{HEIGHT}px'>" +
                                        "<foreignObject width='100%' height='100%'>" +
                                            "<div xmlns='http://www.w3.org/1999/xhtml'>" +
                                                "<span style='{STYLE}'>{TEXT}</span>" +
                                            "</div>" +
                                        "</foreignObject>" +
                                    "</svg>";
        
        // El formato de texto 
        var _textFormat = new psd.fenix.text.TextFormat();
        
        // Renderiza el textfield en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        this._render = function(ctx) 
        {
            var offsetX = 0;
            
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.CENTER) {offsetX=-this.width()/2;}
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.RIGHT) {offsetX=-this.width();}            
            
            // Pintamos el borde y fondo del textfield
            ctx.beginPath();                    
            ctx.rect(offsetX, 0, this.width(), this.height());
            ctx.lineWidth = 1;
            ctx.strokeStyle = psd.fenix.ColorUtil.colorToRGB(_borderColor, 1);
            ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_backgroundColor, 1);
            
            // Pintamos el fondo si _background es true
            if(_background) {ctx.fill();}
            
            // Pintamos el borde sólo si _border es true
            if(_border) {ctx.stroke();}
            
            //ctx.clip();
            //ctx.closePath();
            
            // Restringimos el pintado a la zona delimitada por ancho y alto externos
            ctx.beginPath();
            ctx.rect(offsetX, 0, this.width() + 35, this.height());
            ctx.clip();
            ctx.closePath();
            
            // Pintamos el texto
            
            if(!_multiline) {
                ctx.textAlign = _autoSize;
                ctx.textBaseline = "top";
                ctx.font = _textFormat.toCanvasString();            
                ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_textFormat.color, 1);

                ctx.fillText(_text, 0, 0);
                
            } else {
                if( _textCache.svg == null || _textCache.img == null ) {
                    
                    _textCache.img = new Image();
                    _textCache.data = _textCacheDataTemplate.replace("{TEXT}", _text)
                                                            .replace("{WIDTH}", this.width())
                                                            .replace("{HEIGHT}", this.height())
                                                            .replace("{STYLE}", _textFormat.toCSSString());
                                                            
                    _textCache.svg = new Blob([_textCache.data], {type: "image/svg+xml;charset=utf-8"});
                    _textCache.url = _textCache.DOMURL.createObjectURL(_textCache.svg);
                    
                    _textCache.img.onload = function() {
                        _textCache.DOMURL.revokeObjectURL(_textCache.url);
                        _textCache.ready = true;
                    };
                    _textCache.img.src = _textCache.url;
                    
                } else if(_textCache.ready) {
                    ctx.drawImage(_textCache.img, 0, 0);
                }
            }
        };
        
        // Realiza el cálculo del tamaño del texto. Crea un elemento <span> dentro del
        // body de la página, establece el estilo de fuente de acuerdo a las propiedades
        // de la variable _textFormat y obtiene las medidas del texto a partir del html
        var _measureText = function()
        {
            var body = document.getElementsByTagName("body")[0],
                span = document.createElement("span"),
                text = document.createTextNode(_text),
                style = _textFormat.toCSSString();
            
            span.appendChild(text);
            span.setAttribute("style", style);
            
            if(_multiline) {
                span.setAttribute("style", style + "display:block;width:"+this.width()+"px;");
            }            
            
            body.appendChild(span);
            
            if(_autoSize!=psd.fenix.text.TextFieldAutoSize.NONE) {
                if(!_multiline) {
                    this.invalidateSize(span.offsetWidth,span.offsetHeight);
                }else{
                    this.invalidateSize(this.width(), span.offsetHeight);
                }
            }
            
            body.removeChild(span);
        };
        
        //
        var _resetTextCache = function() {
            _textCache = {svg:null,
                          data:null,
                          url:null,
                          img:null,
                          ready:false,
                          DOMURL:self.URL || self.webkitURL || self};
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Controla el redimensionado y alineación automática del campo de texto.
         */
        var _autoSize = psd.fenix.text.TextFieldAutoSize.LEFT;
        this.autoSize = function(value)
        {
            if(value == psd.fenix.text.TextFieldAutoSize.NONE ||
                value == psd.fenix.text.TextFieldAutoSize.LEFT ||
                value == psd.fenix.text.TextFieldAutoSize.RIGHT ||
                value == psd.fenix.text.TextFieldAutoSize.CENTER)
            {
                _autoSize = value;
            }
            
            return _autoSize;
        };
        
        /**
         * Especifica si el campo de texto tiene un relleno de fondo
         */
        var _background = false;
        this.background = function(value)
        {
            if(value==true || value==false) {_background = value;}
            return _background;
        };
        
        /**
         * El color del relleno de fondo del campo de texto
         */
        var _backgroundColor = 0xffffff;
        this.backgroundColor = function(value)
        {
            // confirmar que se trata de un color válido
            if(value!=undefined && value!=null) {_backgroundColor = value;}
            return _backgroundColor;
        };
        
        /**
         * Especifica si el campo de texto tiene un borde
         */
        var _border = false;
        this.border = function(value)
        {
            if(value==true || value==false) {_border = value;}
            return _border;
        };
        
        /**
         * El color del borde del campo de texto
         */
        var _borderColor = 0x000000;
        this.borderColor = function(value)
        {
            // confirmar que se trata de un color válido
            if(value!=undefined && value!=null) {_borderColor = value;}
            return _borderColor;
        };
        
        /**
         * Devuelve una copia del objeto de formato que se aplica al contenido
         * del campo de texto
         * @returns Un objeto con las propiedades de formato del texto
         */
        this.getTextFormat = function() 
        {   
            var i, format = {};
            
            for(i in _textFormat) {format[i] = _textFormat[i];}
            
            return format;
        };
        
        /**
         *
         */
        var _multiline = false;
        this.multiline = function(value)
        {
            if(value!=undefined && value!=null) {_multiline = value;}
            return _multiline;
        };
        
        /**
         * Aplica nuevas propiedades de formato al contenido del campo de texto
         * @param textFormat Un objeto de tipo TextFormat que contiene las nuevas
         *                   opciones de formato
         */
        this.setTextFormat = function(textFormat)
        {
            if(typeof(textFormat.className)!="undefined" && textFormat.className=="psd.fenix.text.TextFormat")
            {
                _textFormat = textFormat;
                if(_autoSize!=psd.fenix.text.TextFieldAutoSize.NONE) {_measureText.apply(this);}                
            }
        };
        
        /**
         * Contenido actual del campo de texto
         */
        var _text = "";
        this.text = function(value)
        {
            if(value!=undefined && value!=null) {_text = value;}
            if(_autoSize != psd.fenix.text.TextFieldAutoSize.NONE) { _measureText.apply(this); }
            _resetTextCache();
            return _text;
        };
        
        /**
         * Detecta si el elemento tiene contenido en la posicion global (x,y). Sobreescribe
         * la detección general para realizar una detección por bounds
         * @param x Coordenada X que se quiere comprobar
         * @param y Coordenada Y que se quiere comprobar
         * @returns Boolean indicando si el displayObject tiene contenido en la
         *          posición indicada
         */
        this.testHit = function(x,y)
        {
            var offsetX = 0;
            
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.CENTER) {offsetX=-this.width()/2;}
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.RIGHT) {offsetX=-this.width();}
            
            return (x >= (offsetX + this.globalX()) && x <= (offsetX + this.globalX() + this.width()) &&
                    y >= this.globalY() && y <= (this.globalY() + this.height()));
        };
        
        //
        this.addEventListener(psd.fenix.event.CacheEvent.CACHE_FLUSH, _resetTextCache, this);
        
        // 
        _resetTextCache();
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.text	
    namespace.TextField = TextField;
	
})(psd.fenix.text);(function(namespace) {

    // Inheritance class
    ProgressBarInterface.prototype = new psd.fenix.DisplayObjectContainer();

    /**
     * Progressbar es un componente para la creación de barras de progreso simples
     * @param texture La imagen de texturas
     * @param leftFrame Sección izquierda de la barra
     * @param rightFrame Sección derecha de la barra
     * @param centerFrame Sección central de la barra
     * @param fillFrame Relleno de la barra
     * @param slider El tirador de la barra (opcional)
     * @constructor
     */
    function ProgressBarInterface(barLeft, barRight, barCenter, barFill, zoneCenter, slider)
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.controls.ProgressBarInterface
         */
        this.className = "psd.fenix.controls.ProgressBarInterface";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Indica si el componente ya se ha inicializado
        var _initialized = false;
        
        // Sección izquierda de la barra
        var _barLeft = barLeft;
        
        // Sección derecha de la barra
        var _barRight = barRight;
        
        // Sección central de la barra
        var _barCenter = barCenter;
        
		// Sección central pinchable y transparente de la barra
		var _zoneCenter = zoneCenter;
		
        // Relleno de la barra
        var _barFill = barFill;
		
		// Altura de la barra
		var _barHeight = null;
        
		// Altura de zona sensible
		var _zoneHeight = null;
		
        // Tirador opcional de la barra de progreso
        var _slider = slider;
        
        // Indica que el tirador se está arrastrando
        var _draggingSlider = false;
        
        // Indica el valor actual de progreso de la barra
        var _currentProgress = 0;
        
        // Inicializa el componente
        var _init = function()
        {            
            _barCenter.buttonMode = true;
            _barCenter.useHandCursor = true;

			_zoneCenter.buttonMode = true;
			_zoneCenter.useHandCursor = true;

            _barFill.buttonMode = true;
            _barFill.useHandCursor = true;            
            _barFill.width(0);
            
            this.addChild(_barLeft);
			this.addChild(_zoneCenter);
            this.addChild(_barCenter);
            this.addChild(_barRight);
            this.addChild(_barFill);
            
            if(_slider!=null) 
            { 
                _slider.x = _currentProgress * _barCenter.width();
                _slider.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onSliderDown, this);
                this.addChild(_slider); 
            }
            
			_zoneCenter.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            _barCenter.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            _barFill.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            
            _initialized = true;
        };
        
        // Detecta un evento de click sobre la barra de progreso
        var _onBarDown = function(event)
        {
            _currentProgress = event.localX/_barCenter.width();
            this.setProgress(_currentProgress);
            this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, _currentProgress));
        };
        
        // Detecta un evento de mouse_down sobre el slider de la barra
        var _onSliderDown = function(event) 
        {
            _draggingSlider = true;
            
            this.stage().addEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, _onSliderMove, this);
            this.stage().addEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onSliderUp, this);
        };
        
        // Detecta un desplazamiento del slider mientras se está arrastrando
        var _onSliderMove = function(event) 
        { 
            var sliderPosition = event.stageX - this.globalX();
            
            if (sliderPosition < 0) {sliderPosition = 0;}
            if (sliderPosition > _barCenter.width()) {sliderPosition = _barCenter.width();}
            
            _slider.x = sliderPosition - _slider.width()/2;
            
            if(_liveUpdate) 
            {
                _currentProgress = sliderPosition;
                _barFill.width(sliderPosition);
                this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, sliderPosition/_barCenter.width()));
            }
        };
        
        // Detecta el fin de la acción de arrastre del slider de la barra
        var _onSliderUp = function(event) 
        { 
            var sliderPosition = event.stageX - this.globalX();
            
            if (sliderPosition < 0) {sliderPosition = 0;}
            if (sliderPosition > _barCenter.width()) {sliderPosition = _barCenter.width();}
            
            _currentProgress = sliderPosition;
            _draggingSlider = false;
            _slider.x = sliderPosition - _slider.width()/2;
            
            this.setProgress(sliderPosition/_barCenter.width());
            this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, sliderPosition/_barCenter.width()));
            
            this.stage().removeEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, _onSliderMove, this);
            this.stage().removeEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onSliderUp, this);
        };
        
        // Inicialización del componente
        if (barLeft && barRight && barCenter && barFill && zoneCenter){
            _init.apply(this);
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Indica si la barra lanza eventos de change en vivo cuando se arrastra
         * el slider
         */
        var _liveUpdate = false;
        this.liveUpdate = function(value)
        {
            if(value!=undefined) {_liveUpdate = value;}
            return _liveUpdate;
        };
        
        /**
         * Redimensiona la barra de progreso
         * @param width El ancho de la barra
         * @param height El alto de la barra
         */
        this.resize = function(width, height)
        {
            if(_initialized)
            {
                _barLeft.x = 0;
                _barRight.x = width - _barRight.width();
                _barCenter.x = _barLeft.x + _barLeft.width();
				
                _barCenter.width(_barRight.x - _barCenter.x);
                _barFill.x = _barCenter.x;
                _barFill.width(_barCenter.width()*_currentProgress);
                				
				if(_barHeight!=null)
				{
					_barLeft.height(_barHeight);
					_barRight.height(_barHeight);
					_barCenter.height(_barHeight);
					_barFill.height(_barHeight);
				}

				if (_zoneHeight!=null) {
					_zoneCenter.height(_zoneHeight);
					_zoneCenter.width(_barCenter.width());
                    _zoneCenter.x = _barCenter.x;
					_zoneCenter.y = (_barCenter.height()-_zoneCenter.height())/2;
				}
				
                if(_slider!=null) 
                {
                    _slider.x = _slider.x = _barCenter.width()*_currentProgress - _slider.width()/2;
                    _slider.y = (_barCenter.height() - _slider.height())/2;
					
					if (_slider.x-_slider.width/2 <0 ) {
						_slider.x = slider.width/2;
					}
                }

            }
        };
        
        /**
         * Elemento de arrastre de la barra
         */
        this.slider = function(slider)
        {
            if(_slider!=null) {this.removeChild(_slider);}
            
            _slider = slider;
            _slider.x = _currentProgress * _barCenter.width() - _slider.width()/2;
            _slider.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onSliderDown, this);
            
            this.addChild(_slider);
        };
        
        /**
         * Establece el estado de progreso de la barra
         * @param value El valor de progreso
         */
        this.setProgress = function(value) 
        {
		
            _currentProgress = value;

            if(_initialized)
            {
                var progressPosition = _barCenter.width()*value == 0 ? 1 : _barCenter.width()*value ;

                if(!_liveUpdate || !_draggingSlider) {
					
					_barFill.width(progressPosition);
					
				}
                if(_slider!=null && !_draggingSlider) {_slider.x = progressPosition - _slider.width()/2;}
            }
        };

		/** Devuelve la posición actual de progreso de la barra
         * @return El valor de progreso
         */
        this.currentProgress = function() 
        {
            return _currentProgress;
        };
		
		/**
         * Establece el alto de la barra de progreso
         * @param value El valor de la altura del item
         */
        this.barHeight = function(value) 
        {
            _barHeight = value;
        };
		
		/**
         * Establece el alto de la zona pinchable en barra de progreso
         * @param value El valor de la altura del item
         */
        this.zoneHeight = function(value) 
        {
            _zoneHeight = value;
        };		
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.controls	
    namespace.ProgressBarInterface = ProgressBarInterface;

})(psd.fenix.controls);(function(namespace) {

    // Inheritance class
    ProgressBar.prototype = new psd.fenix.controls.ProgressBarInterface;

    /**
     * Progressbar es un componente para la creación de barras de progreso simples
     * @param texture La imagen de texturas
     * @param leftFrame Sección izquierda de la barra
     * @param rightFrame Sección derecha de la barra
     * @param centerFrame Sección central de la barra
     * @param fillFrame Relleno de la barra
     * @param slider El tirador de la barra (opcional)
     * @constructor
     */
    function ProgressBar(texture, leftFrame, rightFrame, centerFrame, fillFrame, slider)
    {

        var barLeft, barRight, barCenter, zoneCenter, barFill;

        /**
         * className psd.fenix.controls.ProgressBarInterface
         */
        this.className = "psd.fenix.controls.ProgressBarInterface";

        barLeft = new psd.fenix.Movieclip(texture, leftFrame);
        barLeft.gotoAndStop(0);

        barRight = new psd.fenix.Movieclip(texture, rightFrame);
        barRight.gotoAndStop(0);

        barCenter = new psd.fenix.Movieclip(texture, centerFrame);
        barCenter.buttonMode = true;
        barCenter.useHandCursor = true;
        barCenter.gotoAndStop(0);

        zoneCenter = new psd.fenix.Movieclip(texture, leftFrame);
        zoneCenter.buttonMode = true;
        zoneCenter.useHandCursor = true;
        zoneCenter.alpha = 1;
        zoneCenter.gotoAndStop(0);

        barFill = new psd.fenix.Movieclip(texture, fillFrame);
        barFill.buttonMode = true;
        barFill.useHandCursor = true;
        barFill.gotoAndStop(0);
        barFill.width(0);

        // Super
        psd.fenix.controls.ProgressBarInterface.call(this, barLeft, barRight, barCenter, barFill, zoneCenter, slider);
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.controls	
    namespace.ProgressBar = ProgressBar;

})(psd.fenix.controls);(function(namespace) {

    // Inheritance class
    VideoPlayback.prototype = new psd.fenix.DisplayObjectContainer();

    /**
     * La clase VideoPlayback es un componente cerrado que permite la reproducción
     * y control de un video de manera sencilla
     * @constructor
     */
    function VideoPlayback(videoData)
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.controls.VideoPlayback
         */
        this.className = "psd.fenix.controls.VideoPlayback";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Parámetro de entrada. Los parámetros de entrada permitidos son:
        //   - [object HTMLVideoElement] Si se recibe directamente el tag de video
        //   - [object Array] Si se recibe un array de urls
        var _videoData = videoData;
        
        // Elemento psd.fenix.media.VideoElement con la información del vídeo
        var _videoElement = null;

        // Componente fenix Video
        var _video = null;
        
        // Controlador para el vídeo
        var _videoController = null;

        // Barra de controles de reproducción
        var _controlBar = null;
        
        // Indica si el control ha completado el proceso de inicialización
        var _initialized = false;
        
        // Inicializa el componente
        var _init = function()
        {
            // Creamos el elemento de video a partir de los parámetros de entrada
            _videoElement = new psd.fenix.media.VideoElement(_videoData);
            
            // Creamos el componente fenix de Video y el controlador
            _video = new psd.fenix.display.Video(_videoElement);
            _videoController = new psd.fenix.media.MediaController();
            _videoController.attachStream(_videoElement);
            
            // Creamos la barra de controles del componente
            _controlBar = new psd.fenix.controls.MediaControlBar(_videoController);
            
            // Incluimos el componente de video y la barra de controles
            this.addChild(_video);
            this.addChild(_controlBar);
            
            // Completamos la inicialización del componente
            _initialized = true;
        };
        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * 
         * @param width
         * @param height
         */
        this.resize = function(width, height)
        {
            var controlBarWidth = width-40;
            
            if(_initialized)
            {
                _videoElement.width(width);
                _videoElement.height(height);

                _controlBar.x = 20;
                _controlBar.y = height - 50;
                _controlBar.resize(controlBarWidth, height);
            }
        };
        
        _init.apply(this);
    }

    namespace.VideoPlayback = VideoPlayback;

})(psd.fenix.controls);(function(namespace) {
    
    //
    namespace.StageDisplayState = {};
    
    /**
     * 
     */
    namespace.StageDisplayState.NORMAL = "normal";
    
    /**
     * 
     */
    namespace.StageDisplayState.FULL_SCREEN = "fullscreen";

})(psd.fenix.stage);(function(namespace) {
	
    // Inheritance class
    Stage.prototype = new psd.fenix.DisplayObjectContainer();
    
    /**
     * Frames per second a los que se ejecuta la aplicacion
     */
    Stage.FPS = 60;	
	
    /**
     * Stage es el contenedor basico para cualquier aplicacion que utilice fenix
     * @constructor
     */
    function Stage(idParent, settings) 
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.Stage
         */
        this.className = "psd.fenix.Stage";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        

        // ID del contenedor de fenix
        var _parentID = idParent;
        
        // Canvas para el renderizado de elementos
        var _canvas = null;
        
        // ID del canvas de fenix
        var _canvasID = _parentID + "_fenix";
        
        // Canvas para la detección de colisiones
        var _hitCanvas = null;
        
        // Contexto de renderizado
        var _renderContext;
        
        // ID del canvas para detección de hits
        var _hitCanvasID = _parentID + "_hits";
        
        // Contenedor externo para fenix
        var _container = null;
        
        // Contenedor interno para fenix
        var _parent = null;
        
        // Ancho del contenedor de fenix
        var _parentWidth = 0;
        
        // Alto del contenedor de fenix
        var _parentHeight = 0;
        
        // Indica si el ciclo de renderizado se esta ejecutando
        var _isRendering = true;
        
        // Indica si el ratón está presionado sobre el stage
        var _isMouseDown = false;
        
        // Indica si el ratón está sobre el stage
        var _isMouseOver = false;
        
        // Flag indicando si deben ejecutarse los cálculos del estado de ratón
        // Se habilita cuando se detecta un movimiento del ratón y se deshabilita
        // una vez se lanzan los cálculos
        var _mouseMoved = true;
        
        // ID de temporizador para el bucle de renderizado
        var _timer = null;
        
        // Petición de fullscreen
        var _requestFullScreen = null;
        
        // Petición de cancel fullscreen
        var _cancelFullScreen = null;

        // Variable booleana que indica si el dispositivo es un iphone con version ios6
        var _ios6 = false;
        
        // Parámetros de configuración iniciales de fenix
        // TODO AÑADIR PAR�?METROS ADICIONALES Y REVISAR VALORES POR DEFECTO
        var _settings = {autosize: true};
        if (settings != undefined && settings != null) {
            _settings.autosize = settings.autosize != null && settings.autosize != undefined ? settings.autosize : true;
            _settings.width = settings.width != null && settings.width != undefined ? settings.width : 400;
            _settings.height = settings.height != null && settings.height != undefined ? settings.height : 300;
            _settings.hitCanvas = settings.hitCanvas != null && settings.hitCanvas != undefined ? settings.hitCanvas : false;
        }

        // Función utilizada para ejecutar la llamada a la función de inicialización
        // tras un evento recuperando automáticamente el contexto
        var _deferredInit = (function(stage) {return function() {_init.apply(stage);}})(this);

        // Inicializa el stage y todos sus elementos.
        var _init = function() 
        {
            // Obtenemos el contenedor que sirve de padre de fenix. Si no hemos
            // recibido un id válido, fenix lanza un evento de error
            _container = document.getElementById(_parentID);
            if (_container == null) 
            {
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT_ERROR));
                return;
            }
            
            // Creamos un div adicional que servirá como contenedor para todos los elementos
            // de fenix (canvas, video, ...), y lo añadimos al contenedor
            _parent = document.createElement("div");
            _parent.setAttribute("style", "position:relative; width:100%; height:100%;");
            _container.appendChild(_parent);
            
            // Actualizamos las funciones de fullscreen si existen
            _requestFullScreen = _parent.requestFullScreen || 
                                _parent.mozRequestFullScreen ||
                                _parent.webkitRequestFullScreen ||
                                function() {};
                            
            _cancelFullScreen = document.cancelFullScreen ||
                                document.mozCancelFullScreen ||
                                document.webkitCancelFullScreen ||
                                function() {};
            
            if (document.addEventListener)
            {
                document.addEventListener("fullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("mozfullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("webkitfullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("keydown",_deferredOnKeyDown,false);
            }
            else if (document.attachEvent)
            {
                document.attachEvent("onfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onmozfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onwebkitfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onkeydown",_deferredOnKeyDown);
            }
            
            
            // Actualizamos las dimensiones del stage en función de la configuración de entrada
            // TODO REVISAR VALORES POR DEFECTO
            if (_settings.autosize == true) 
            {
                _stageWidth = _parentWidth = _container.clientWidth == undefined || _container.clientWidth == 0 ? 448 : _container.clientWidth;
                _stageHeight = _parentHeight = _container.clientHeight == undefined|| _container.clientHeight == 0 ? 365 : _container.clientHeight;
            } else {
               _stageWidth = _settings.width;
               _stageHeight = _settings.height;
            }            
                        
            // Creamos el elemento canvas para el renderizado de los elementos
            // y lo añadimos al contenedor padre
            _canvas = document.createElement("canvas");
            _canvas.setAttribute("style", "position:absolute;");
            _canvas.id = _canvasID;
            _canvas.width = _stageWidth;
            _canvas.height = _stageHeight;
            _parent.appendChild(_canvas);

            // Creamos un canvas para la detección de colisiones (no es necesario
            // incluirlo en el DOM ya que no debe ser visible). El canvas de colisiones
            // tiene un tamaño de 1x1, para detectar colisiones a nivel de pixel
            _hitCanvas = document.createElement("canvas");
            _hitCanvas.id = _hitCanvasID;
            _hitCanvas.width = _hitCanvas.height = 1;
            
            // Si hemos recibido un id 
            if(_settings.hitCanvas)
            {
                var hitCanvasParent = document.getElementById(_settings.hitCanvas);
                if(hitCanvasParent!=null)
                {
                    _hitCanvas.width = hitCanvasParent.clientWidth;
                    _hitCanvas.height = hitCanvasParent.clientHeight;
                    hitCanvasParent.appendChild(_hitCanvas);
                }
            }
            
            // Recogemos el valor de psd.framework.compatibility para decidir el 
            // modo en el que se debe ejecutar la aplicación de fenix.
            if (Object.prototype.toString.call(_canvas) === "[object HTMLCanvasElement]") 
            {
                Log.log("Initializing fenix in standard mode...");

                // Obtenemos las referencias de los contextos de cada canvas
                _renderContext = _canvas.getContext('2d');
                _hitContext = _hitCanvas.getContext('2d');
                
                _renderContext.fillStyle = _backgroundColor;

                // Inicializamos las variables estáticas de fenix
                psd.fenix.topLevelApplication = _parent;
                psd.fenix.topLevelCanvas = _canvas;                
                //psd.fenix.stage = this;
                //psd.fenix.canvasContext = _renderContext;
                //psd.fenix.hitContext = _hitContext;
                
                this.start();
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT));
                
            } else {
                Log.log("Initializing fenix in compatibility mode...");
                requestAnimationFrame = null;
				G_vmlCanvasManager.initElement(_canvas);
                G_vmlCanvasManager.initElement(_hitCanvas);
                
                // Obtenemos las referencias de los contextos de cada canvas
                _renderContext = _canvas.getContext('2d');
                _hitContext = _hitCanvas.getContext('2d');
                
                _renderContext.fillStyle = _backgroundColor;

                // Inicializamos las variables estáticas de fenix
                psd.fenix.topLevelApplication = _parent;
                psd.fenix.topLevelCanvas = _canvas;
                //psd.fenix.stage = this;
                //psd.fenix.canvasContext = _renderContext;
                //psd.fenix.hitContext = _hitContext;
                
                this.changeFrameRate(10);
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT));                
            }
        };
        
        var _deferredOnFullScreenChange = (function(stage) {return function() {_onFullScreenChange.apply(stage);}})(this);
        var _onFullScreenChange = function()
        {
            if(document.mozFullScreenElement || document.webkitFullscreenElement) { _displayState = psd.fenix.stage.StageDisplayState.FULL_SCREEN; }
            else{ _displayState = psd.fenix.stage.StageDisplayState.NORMAL; }
            
            this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.DISPLAY_STATE_CHANGE));
        };
        
        var _deferredOnKeyDown = (function(stage) {return function(event) {_onKeyDown.apply(stage, [event]);}})(this);
        var _onKeyDown = function(event)
        {
            var keyCode = 0;
            
            if(event==null) { keyCode = window.event.keyCode; }
            else { keyCode = event.keyCode; }
            
            this.dispatchEvent(new psd.fenix.event.KeyboardEvent(psd.fenix.event.KeyboardEvent.KEY_DOWN, keyCode));
        };        
        
        // Función utilizada para ejecutar la llamada a la función de loop
        // recuperando automáticamente el contexto
        var _deferredLoop = (function(stage) {return function() {_loop.apply(stage);}})(this);
        
        // Función de actualización de pintado del stage de fenix
        var _loop = function()
        {
            // Comprobamos si las dimensiones han cambiado para lanzar un evento de resize
            if(_displayState==psd.fenix.stage.StageDisplayState.NORMAL)
            {
                // TODO COMPROBAR BUG EN IE-9 CON EL TAMAÑO DEL CANVAS. PARECE QUE EL MODELO DE CAJA
                // DE IE INCREMENTA EL clientWidth EN 4 UNIDADES POR LO QUE SIEMPRE ESTA CRECIENDO.
                // RESIZE DESHABILITADO PARA IE HASTA REVISARLO
                if((_container.clientWidth != _parentWidth || _container.clientHeight != _parentHeight) && !psd.framework.ua.msie)
                {
                    _parentWidth = _container.clientWidth;
                    _parentHeight = _container.clientHeight;

                    if(_settings.autosize)
                    {
                        _canvas.width = _stageWidth = _parentWidth;
                        _canvas.height = _stageHeight = _parentHeight;

                    }else{
                        _canvas.width = _stageWidth = _settings.width;
                        _canvas.height = _stageHeight = _settings.height;
                    }
                    
                    this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
                }
                
            } else {
                
                if(window.innerWidth != _parentWidth || window.innerHeight != _parentHeight)
                {
                    _parentWidth = window.innerWidth;
                    _parentHeight = window.innerHeight;
                    
                    _canvas.width = _stageWidth = _parentWidth;
                    _canvas.height = _stageHeight = _parentHeight;

                    this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
                }
                
            }
            
            // Evitamos renderizados extra si fenix está congelado o pausado
            if(_isRendering)
            {
                // Limpiamos el canvas de elementos anteriores
                _clear();
                
                // Renderizamos el contenido del stage
                this.render(_renderContext);
            }
            
            // Calculamos el estado del ratón.
            // Por eficiencia, solo se ejecuta si el raton se encuentra sobre el canvas
            // Y si se ha detectado un cambio en la posición del ratón desde la última
            // comprobación
            if(_isMouseOver && _mouseMoved)
            {
                _mouseMoved = false;
                _executeMouseCalculations.apply(this,[this.calculateMouseStatus]);
            }
            
            // Lanzamos el evento de enter_frame
            //this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ENTER_FRAME));

            // Si tenemos disponible requestAnimationFrame lo utilizamos en lugar del timer
            if(requestAnimationFrame!=undefined && !_ios6) {requestAnimationFrame(_deferredLoop);}

        };

        // Limpia el canvas
        var _clear = function() 
        {                 
            _renderContext.clearRect(0, 0, _stageWidth, _stageHeight); 
            
            // Aplicamos fillRect sobre el contexto de renderizado para pintar
            // el fondo de la aplicación
            _renderContext.fillStyle = _backgroundColor;
            _renderContext.fillRect(0, 0, _stageWidth, _stageHeight);  
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseDown
        // recuperando automáticamente el contexto
        var _deferredMouseDown = (function(stage) {return function() {_onMouseDown.apply(stage);}})(this);
        
        // Listener para detectar el evento de mouseDown sobre el canvas
        var _onMouseDown = function() 
        {
            if(!_isMouseDown)
            {
                _isMouseDown = true;
                _executeMouseCalculations.apply(this,[this.calculateMouseDownStatus]);
                this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_DOWN, _mouseX, _mouseY));                
            }
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseUp
        // recuperando automáticamente el contexto
        var _deferredMouseUp = (function(stage) {return function() {_onMouseUp.apply(stage);}})(this);
        
    // Listener para detectar el evento de mouseDown sobre el canvas
        var _onMouseUp = function() 
        {
            if(_isMouseDown)
            {
                _isMouseDown = false;
                _executeMouseCalculations.apply(this,[this.calculateMouseDownStatus]);
                this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, _mouseX, _mouseY));
            }
        };
        
        // Ejecuta la función de actualización del estado de ratón especificada.
        // Además, realiza las transformaciones necesarias sobre el contexto de 
        // colisiones antes de realizar los cálculos.
        // @param calcFunction  La función de cálculo de ratón que se quiere ejecutar
        var _executeMouseCalculations = function(calcFunction)
        {
            // 
            _hitContext.clearRect(0,0,1,1);
            
            // Iniciamos el cálculo de colisiones guardando el estado actual del contexto
            _hitContext.save();

            // Desplazamos el contexto de colisiones de manera que el punto en el que se
            // encuentra el ratón quede en el (0,0)
            _hitContext.translate(-_mouseX, -_mouseY);

            // Iniciamos el cálculo recursivo del estado del ratón
            calcFunction.apply(this, [{x:_mouseX, y:_mouseY, down:_isMouseDown, hitContext:_hitContext}]);

            // Restauramos el estado anterior del contexto de colisiones
            _hitContext.restore();
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseMove
        // recuperando automáticamente el contexto
        var _deferredMouseMove = (function(stage) {return function(evt) {_onMouseMove.apply(stage,[evt]);}})(this);
        
        // Listener para detectar el evento de mouseMove sobre el canvas
        var _onMouseMove = function(evt)
        {
            var p = getMousePos(_canvas, evt);
            
            if (evt.offsetX) 
            {
                _mouseX = evt.offsetX;
                _mouseY = evt.offsetY;
                
            } else {
                
                _mouseX = p.x;
                _mouseY = p.y;
            }
            
            _mouseMoved = true;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_MOVE, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseOver
        // recuperando automáticamente el contexto
        var _deferredMouseOver = (function(stage) {return function(evt) {_onMouseOver.apply(stage,[evt]);}})(this);
        
        // Listener para detectar el evento de mouseOver sobre el canvas
        var _onMouseOver = function(evt) 
        {
            var p = getMousePos(_canvas, evt);
            
            if (evt.offsetX) 
            {
                _mouseX = evt.offsetX;
                _mouseY = evt.offsetY;
                
            } else {
                
                _mouseX = p.x;
                _mouseY = p.y;
            }
            
            _isMouseOver = true;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OVER, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseOut
        // recuperando automáticamente el contexto
        var _deferredMouseOut = (function(stage) {return function() {_onMouseOut.apply(stage);}})(this);
        
        // Listener para detectar el evento de momuseOut sobre el canvas
        var _onMouseOut = function()
        {
            _mouseX = -5;
            _mouseY = -5;

            //console.log("cambia mano a puntero");
            //document.body.style.cursor = "auto";
            
            //NOTA: Volvemos a ejecutar la función de actualización del estado del ratón antes de lanzar el evento out del canvas. 
            //Esto se ha hecho para evitar que el ratón se quede en un estado incorrecto al salir del canvas, por el rápido movimiento del ratón.
            _executeMouseCalculations.apply(this,[this.calculateMouseStatus]);
            
            _isMouseOver = false;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OUT, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseWheel
        // recuperando automáticamente el contexto
        var _deferredMouseWheel = (function(stage) {return function(evt) {_onMouseWheel.apply(stage, [evt]);}})(this);
        
        // Listener para detectar el evento de momuseOut sobre el canvas
        var _onMouseWheel = function(evt)
        {
            var wheelEvt = new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_WHEEL, _mouseX, _mouseY);
            wheelEvt.delta = evt.wheelDelta || evt.detail || 0;
            
            this.dispatchEvent(wheelEvt);
        };        
        
        // 
        function getMousePos(canvas, evt)
        {
            var obj = canvas;
            var top = 0;
            var left = 0;
            while (obj && obj.tagName != 'BODY') {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }

            // return relative mouse position
            var mouseX = evt.clientX - left + window.pageXOffset;
            var mouseY = evt.clientY - top + window.pageYOffset;
            return {
                x: mouseX,
                y: mouseY
            };
        };
        
        // Inicializa los listeners de raton sobre el componente canvas
        var _addEventListenerCanvas = function()
        {
            if (_canvas.addEventListener) {
                _canvas.addEventListener("mousemove", _deferredMouseMove, false);
                _canvas.addEventListener("mouseover", _deferredMouseOver, false);
                _canvas.addEventListener("mouseout", _deferredMouseOut, false);
                _canvas.addEventListener("mousedown", _deferredMouseDown, false);
                _canvas.addEventListener("mouseup", _deferredMouseUp, false);
                _canvas.addEventListener("DOMMouseScroll", _deferredMouseWheel, false);
                _canvas.addEventListener("mosuewheel", _deferredMouseWheel, false);
            }
            else if (_canvas.attachEvent) {
                _canvas.attachEvent("onmousemove", _deferredMouseMove);
                _canvas.attachEvent("onmouseover", _deferredMouseOver);
                _canvas.attachEvent("onmouseout", _deferredMouseOut);
                _canvas.attachEvent("onmousedown", _deferredMouseDown);
                _canvas.attachEvent("onmouseup", _deferredMouseUp);
                _canvas.attachEvent("DOMMouseScroll", _deferredMouseWheel);
                _canvas.attachEvent("mousewheel", _deferredMouseWheel);
                
            }
        };

        // Elimina los listeners de raton sobre el componente canvas
        var _removeEventListenerCanvas = function()
        {
            if (_canvas.removeEventListener) { // Others 
                _canvas.removeEventListener("mousemove", _deferredMouseMove, false);
                _canvas.removeEventListener("mouseover", _deferredMouseOver, false);
                _canvas.removeEventListener("mouseout", _deferredMouseOut, false);
                _canvas.removeEventListener("mousedown", _deferredMouseDown, false);
                _canvas.removeEventListener("mouseup", _deferredMouseUp, false);                
                _canvas.removeEventListener("DOMMouseScroll", _deferredMouseWheel, false);                
                _canvas.removeEventListener("mousewheel", _deferredMouseWheel, false);                
            }
            else if (_canvas.attachEvent) { // IE
                _canvas.detachEvent("onmousemove", _deferredMouseMove);
                _canvas.detachEvent("onmouseover", _deferredMouseOver);
                _canvas.detachEvent("onmouseout", _deferredMouseOut);
                _canvas.detachEvent("onmousedown", _deferredMouseDown);
                _canvas.detachEvent("onmouseup", _deferredMouseUp);
                _canvas.detachEvent("DOMMouseScroll", _deferredMouseWheel);
                _canvas.detachEvent("mousewheel", _deferredMouseWheel);
            }
        };        

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Ancho del stage
         * @readonly
         */
        var _stageWidth = 0;
        this.stageWidth = function() {return _stageWidth;};
        
        /**
         * Alto del stage
         * @readonly
         */
        var _stageHeight = 0;
        this.stageHeight = function() {return _stageHeight;};
        
        /**
         * Velocidad en frames por segundo de reproducción del contenido
         */
        var _fps = settings && !isNaN(settings.fps) ? settings.fps : 60;
        this.frameRate = function() {return _fps;};
        
        /**
         * Coordenada X del ratón sobre el stage
         * @readonly
         */
        var _mouseX = -5;
        this.mouseX = function() {return _mouseX;};
        
        /**
         * Coordenada Y del ratón sobre el stage
         * @readonly
         */
        var _mouseY = -5;
        this.mouseY = function() {return _mouseY;};
        
        /**
         * Instancia de context2d donde se deben detectar las colisiones de ratón
         */
        var _hitContext = null;
        this.hitContext = function () {return _hitContext;};
        
        /**
         *
         */
        var _displayState = psd.fenix.stage.StageDisplayState.NORMAL;
        this.displayState = function(value)
        {
            var normal = psd.fenix.stage.StageDisplayState.NORMAL,
                fullscreen = psd.fenix.stage.StageDisplayState.FULL_SCREEN;
            
            if(value == fullscreen && _requestFullScreen!=undefined) { _requestFullScreen.apply(_parent); }
            if(value == normal && _cancelFullScreen!=undefined) { _cancelFullScreen.apply(document); }
                
            return _displayState;
        }
        
        /**
         * Color de fondo del canvas
         */
        var _backgroundColor = "rgba(255,255,255,0)";
        this.backgroundColor = function(value)
        {
            if (value) 
            {
                _backgroundColor = value;
                if(typeof(_renderContext)!="undefined") {_renderContext.fillStyle = _backgroundColor;}
            }
            
            return _backgroundColor;
        };
        
        /**
         * Inicializa la instancia del stage y comienza el ciclo de renderizado.
         * Espera hasta que el documento haya terminado de 
         */
        this.init = function() 
        {
            if(document.readyState === "complete" || document.readyState === "loaded") {_init.apply(this);}
            else{
                if (window.addEventListener) {window.addEventListener('load', _deferredInit, false);}
                else if (window.attachEvent) {window.attachEvent('onload', _deferredInit);}
            }
        };
         
        /**
         * Inicia la reproduccion del contenido del stage
         */
        this.start = function()
        {
            _addEventListenerCanvas();

            //NOTA: Detectamos cuando el user agent sea de un iphone con version 6 de ios, ya que en ese caso hay un problema con el requestAnimationFreame y los <iframes>
            //Para más información ver el siguiente enlace: https://gist.github.com/KrofDrakula/5318048
            //UserAgent Iphone-ios6 --> Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25
            var ua = navigator.userAgent;
            _ios6 = (ua.indexOf('iPhone') != -1) && (ua.indexOf('Version/6.0') != -1);

            // En navegadores modernos, utilizamos requestAnimationFrame para optimizar el
            // ciclo de renderizado
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;


            window.requestAnimationFrame = requestAnimationFrame;

            if(requestAnimationFrame!=undefined && !_ios6) {requestAnimationFrame(_deferredLoop);}
            else {_timer = setInterval(_deferredLoop, (1000 / _fps));}

        };

        /**
         * Pausa la reproducción de todo el contenido del stage
         */
        this.pause = function() 
        {
            _removeEventListenerCanvas();
            if (_timer != null) {clearInterval(_timer);}
        };
        
        /**
         * Cambia la velocidad de reproducción del contenido del stage
         * TODO REVISAR REGENERACION DE TIMER
         */
        this.changeFrameRate = function(fps) 
        {
            _fps = fps;
            if (_timer != null) {clearInterval(_timer);}
            
            _timer = setInterval(_deferredLoop, 1000 / _fps);
        };
        
        /**
         * Pausa el renderizado del stage, pero no la reproducción de contenido
         */
        this.freeze = function(value) {if(value==true || value==false) {_isRendering = !value;}};      
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Stage = Stage;
	
})(psd.fenix);(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.publicidad==undefined) { window.emic.publicidad = {}; }
    if(window.emic.publicidad.events==undefined) { window.emic.publicidad.events = {}; }
    if(window.emic.publicidad.model==undefined) { window.emic.publicidad.model = {}; }
    if(window.emic.publicidad.controllers==undefined) { window.emic.publicidad.controllers = {}; }

    window.emic.publicidad.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.emic.publicidad.debug = true; }
    
})(window);(function(namespace) {
	
    // Inheritance class
    PubliEvent.prototype = new psd.framework.Event();

    /**
     * Evento PubliManager - publiReady
     */
    PubliEvent.PUBLI_READY = "publiReady";

    /**
     * Evento PubliManager - publiStarted
     */
    PubliEvent.PUBLI_STARTED = "publiStarted";

    /**
     * Evento PubliManager - publiEnded
     */
    PubliEvent.PUBLI_ENDED = "publiEnded";

    /**
     *
     */
    PubliEvent.PUBLI_SKIPPED = "publiSkipped";

    /**
     * Se activa cuando el administrador de anuncios finaliza la reproducción de todos los anuncios
     */
    PubliEvent.ALL_PUBLI_ENDED = "allPubliEnded";

    /**
     * Evento que indica que la publicidad se ha cargado. Este es el primer evento enviado para un anuncio
     */
    PubliEvent.PUBLI_LOADED = "publiLoaded";

    /**
     * Evento PubliManager - publiErrors
     */
    PubliEvent.PUBLI_ERROR = "publiErrors";

    /**
     * Evento PubliModel - publiModelComplete
     */
    PubliEvent.PUBLI_MODEL_COMPLETE = "publiModelComplete";

    /**
     * Evento PubliModel - publiModelError
     */
    PubliEvent.PUBLI_MODEL_ERROR = "publiModelError";

    /**
     * Evento que indica que el video debe pausarse
     */
    PubliEvent.CONTENT_PAUSE_REQUESTED = "contentPauseRequested";

    /**
     * Evento que indica que el video debe activarse
     */
    PubliEvent.CONTENT_RESUME_REQUESTED = "contentResumeRequested";

	 /**
     * Evento que indica que el controlador está listo
     */
    PubliEvent.CONTROLLER_LOADED = "controllerLoaded";
   
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function PubliEvent(type, data)
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.events
    namespace.PubliEvent = PubliEvent;

})(emic.publicidad.events);(function(namespace) {
    
    // Inheritance class
    PubliModel.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliModel(urlConfPubli)
    {

        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.PubliModel
         */
        this.className = "emic.publicidad.PubliModel";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        //POSICIONES DE PUBLICIDAD
        PubliModel.POSICION_PREROLL_HTML5 = "prerollHtml5";
        PubliModel.POSICION_PREROLL_FLASH = "prerollFlash";
        PubliModel.POSICION_POSTROLL_HTML5 = "postrollHtml5";
        PubliModel.POSICION_POSTROLL_FLASH = "postrollFlash";

        // TAG POSITION
        PubliModel.TAG_POSITION_PREROLL = "pre";
        PubliModel.TAG_POSITION_POSTROLL = "post";

        //CONTROLLERS
        PubliModel.IMA3FLASHCONTROLLER = "IMA3FlashController";
        PubliModel.IMA3HTML5CONTROLLER = "IMA3HTML5Controller"

        //CODE NUMBER PARSER
        CODE_NUM_PARSER_OK = 0;
        CODE_NUM_PARSER_ERROR = 1;

        var _urlConfPubli = urlConfPubli;
        var _currentPos;
		var _currentController;
        var _publiMediator;
		
		var _data;

        //Cargamos la url del confPubli
        var _init = function()
        {
            var _jsonParser = new psd.framework.parser.JSONParser();

            _publiMediator = new psd.framework.Mediator();
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            _publiMediator.mediate(_urlConfPubli, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            if (evt.result.parserResult.code == CODE_NUM_PARSER_OK)
            {
                _data = evt.result.parserResult.result;
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE));

            }
            else if (evt.result.parserResult.code == CODE_NUM_PARSER_ERROR)
            {
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR));
            }
        }

        var onDataError = function (evt)
        {
            this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR));
        }
        //EVENTOS MEDIATOR

        /**
         *
         * @param position
         * @param vars
         */
        this.getUrlByPos = function(position, vars)
        {
            _currentPos = position;

            if (typeof(_data.position[position]) != "undefined")
            {
                try{
                    _request = _data.position[position].request;
                    _returnUrl = _data.request[_request].src + "?";
                    _vars = _data.request[_request].vars;

                    for(i in _vars){
                        if((_vars[i] + "").match(/\$VARS/))
                        {
                            _fields = (_vars[i] + "").match(/\[[.]*[^\[]*\]/g);

                            for(j in _fields){
                                _field = _fields[j].replace("[","").replace("]","");
                                _vars[i] = _vars[i].replace("$VARS[" + _field + "]",vars[_field]);
                            }

                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + encodeURIComponent(_vars[i]);
                            //_returnUrl += "&" + i + "=" + encodeURIComponent(_vars[i]);

                        }
                        else if((_vars[i] + "").match(/\$RANDOM/)){
                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + (((((Math.random() + 1)*10000000000)%10000000000)|0) + "");
                            //_returnUrl += "&" + i + "=" + (((((Math.random() + 1)*10000000000)%10000000000)|0) + "");
                        }
                        else{
                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + encodeURIComponent(_vars[i]);
                            //_returnUrl += "&" + i + "=" + encodeURIComponent(_vars[i]);
                        }
                    }
                }
                catch (err){return undefined;}
            }
            else{return undefined;}

            return _returnUrl;
        }

        /**
         * Devuelve el tipo de controlador a partir de una posición de publicidad
         * @param position
         */
        this.getControllerByPos = function(position)
        {
            if (typeof(_data.position[position]) != "undefined")
            {
                try{
                    _request = _data.position[position].request;
                    _responseController = _data.request[_request].responseController;

                    _currentController = _responseController;
                }
                catch(err){return undefined;}
            }

			return _responseController;
        };

        this.getCurrentPosition = function()
        {
            return _currentPos;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


        _init.apply(this);
    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.model
    namespace.PubliModel = PubliModel;

}(emic.publicidad.model));(function(namespace) {
    
    // Inheritance class
    PubliManager.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliManager()
    {

        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.PubliManager
         */
        this.className = "emic.publicidad.PubliManager";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        var _publiModel;
        var _publiContainer;
        var _publiSettings;
        var _urlAdServer;
        var _controllerFactory;
        var _publiController;
        var _id;

        this.start = function(container, publiSettings, id)
        {
            //TODO: Vaciar container
            //TODO: CRear container para el controller
            //TODO: Crear container para la carcasa


            _publiContainer = container;
            _publiSettings = publiSettings;

            if (id){
                _id =  id;
            }else{
                _id = Math.random() * 99999999999;
            }

            _publiModel = new emic.publicidad.model.PubliModel(_publiSettings.urlConfPubli);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE, _onConfParserEvent, this);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR, _onConfParserEvent, this);

        };

        var _onConfParserEvent = function(evt)
        {
            switch(evt.type) {

                case emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_READY));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));

                    break;
            }

        };

        this.updateContentPublisher = function(prop, valor)
        {
            if (typeof(_publiController) != "undefined"){_publiController.updateContentPublisher(prop,valor);}
        };

        this.notificaPubliOn = function(position, vars)
        {
            _urlAdServer = _publiModel.getUrlByPos(position, vars);
			
            if (typeof(_urlAdServer) != "undefined")
            {
                _controllerFactory = new emic.publicidad.controllers.PubliControllerFactory();
                _publiController = _controllerFactory.getController(_publiModel.getControllerByPos(position));
                
				_publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, onControllerEvent, this);
                _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, onControllerEvent, this);
				
				_publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
				_publiController.init(_publiContainer,_publiSettings.width, _publiSettings.height, _id);
            }
            else
            {
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));
            }
        };

		var onControllerLoaded = function(evt){
			_publiController.loadPubli(_urlAdServer)
		};
		
        var onControllerEvent = function(evt)
        {
            switch(evt.type) {
                case emic.publicidad.events.PubliEvent.PUBLI_LOADED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_LOADED));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_STARTED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_SKIPPED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_ENDED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED));
                    break;

                case emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_ERROR:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));
                    break;

                case emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED));
                    break;

                case emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED));
                    break;
            }
        };
		
        //NOTA: Parece que no hace falta matar la publicidad actual ya que la gestión la hace internamente el ima3
        this.notificaPubliOff = function(position, vars){}

        this.getCurrentPosition = function(){return _publiModel.getCurrentPosition();}

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad
    namespace.PubliManager = PubliManager;

}(emic.publicidad));(function(namespace) {

    // Inheritance class
    BasePubliController.prototype = new psd.framework.EventDispatcher();

    function BasePubliController()
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className emic.publicidad.controllers.BasePubliController
         */
        this.className = "emic.publicidad.controllers.BasePubliController";

		this.isReady = false;
		
        this.objContentPublisher = {};
        this.objContentPublisher.currentTime = undefined;


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
		
        this.notifyPubliLoaded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_LOADED));};
        this.notifyPubliStarted = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));};
        this.notifyPubliEnded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED));};
        this.notifySkippedPubli = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED));};
        this.notifyAllPubliEnded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED));};
        this.notifyAllPubliError = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));};
        this.notifyContentPauseRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED));};
        this.notifyContentResumeRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED));};
		this.notifyControllerLoaded = function(){
			this.isReady = true;
			this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED));
		};

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){};
		
		this.loadPubli = function(url){};

		this.requestAds = function(){};
		
        this.updateContentPublisher = function(prop, valor)
        {
            this.objContentPublisher[prop] = valor;
        }
    }

    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.BasePubliController = BasePubliController;

})(emic.publicidad.controllers);(function(namespace) {

    // Inheritance class
    Ima3Controller.prototype = new emic.publicidad.controllers.BasePubliController();

    function Ima3Controller()
    {
		var _controller = null;
	
        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        /**
         * className emic.publicidad.controllers.Ima3Controller
         */
        this.className = "emic.publicidad.controllers.Ima3Controller";
		
        this.objContentPublisher = {};
        this.objContentPublisher.currentTime = undefined;

		var _createController = function(){
		
			if(getDevice().mobile)
				_controller = new emic.publicidad.controllers.Ima3Html5Controller();
			else
				_controller = new emic.publicidad.controllers.Ima3FlashController();
				
		    if (_controller){
				//"addListeners"
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_READY, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, _controllerHandler, this);
			}
		};

		var _controllerHandler = function(event){
			//redispatch
			this.dispatchEvent(event);
		};

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){
			_createController.apply(this);
			
			if(_controller){
				_controller.init(containerPubli, width, height, id);
			}
		};
		
		this.loadPubli = function(url){
			if(_controller)
				_controller.loadPubli(url);
		};

		this.requestAds = function(){
			if(_controller)
				_controller.requestAds();
		};
    }

    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3Controller = Ima3Controller;

})(emic.publicidad.controllers);(function(namespace) {
    
    // Inheritance class
    Ima3Html5Controller.prototype = new emic.publicidad.controllers.BasePubliController();


    /**
     * @constructor
     */
    function Ima3Html5Controller()
    {
        /**
         * className emic.publicidad.controllers.Ima3Html5Controller
         */
        this.className = "emic.publicidad.controllers.Ima3Html5Controller";

        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
		
		var adsManager;
		var adsLoader;
		var adDisplayContainer;
		var intervalTimer;
		
		var _containerPubli;
		var _url;
		var _publi_width;
        var _publi_height;

		var interval = 300;
		var linearAdSlotWidth = 640;
		var linearAdSlotHeight = 400;
		var nonLinearAdSlotWidth = 640;
		var nonLinearAdSlotHeight = 150;
		
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){
		
		     _containerPubli = document.getElementById(containerPubli);
			 
            _publi_width = width;
            _publi_height = height;
			
			this.notifyControllerLoaded();
		};
		
        this.loadPubli = function(url)
        {
			_url = url;
		
            var dependencesUrls = [];
			dependencesUrls.push("http://s0.2mdn.net/instream/html5/ima3.js");
		
			var libraryParams = {depends: dependencesUrls
				, success: onDependencesComplete
				, error: onDependencesError
				, scope: this
			};

			LibraryManager.load(libraryParams);
        };

		var onDependencesComplete = function() {
            requestAds.apply(this);
		}
			
		var onDependencesError = function() {
		}
		
		function createAdDisplayContainer()
        {
            // Suponemos que adContainer es el ID de DOM del elemento que acogerá los anuncios.
			adDisplayContainer = new google.ima.AdDisplayContainer(_containerPubli);
		}
		
        function requestAds() {

			// Crear el contenedor de visualización del anuncio.
			createAdDisplayContainer();
			// Inicializar el contenedor si se invoca requestAds en un acción del usuario.
			// Este paso solo es necesario en dispositivos con iOS o Android.
			adDisplayContainer.initialize();
            // Crear un cargador de anuncios.
			adsLoader = new google.ima.AdsLoader(adDisplayContainer);

			// Procesar eventos de error y del cargador de eventos, y darles una respuesta.
			adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,_deferredOnAdsManagerLoaded,false);
            adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError,false);

			// Solicitar de anuncios de vídeo.
			var adsRequest = new google.ima.AdsRequest();

            adsRequest.adTagUrl = _url;
			adsRequest.adType = "video";
			
			// Especificar tamaños de espacios para anuncios lineales y no lineales. Esto ayuda al SDK a
			// seleccionar la creatividad correcta si se devuelven varias.
			adsRequest.linearAdSlotWidth = linearAdSlotWidth;
			adsRequest.linearAdSlotHeight = linearAdSlotHeight;
            adsRequest.nonLinearAdSlotWidth = nonLinearAdSlotWidth;
			adsRequest.nonLinearAdSlotHeight = nonLinearAdSlotHeight;

			adsLoader.requestAds(adsRequest);
		}

		var _deferredOnAdsManagerLoaded = (function(that) {return function(adsManagerLoadedEvent) {onAdsManagerLoaded.apply(that, [adsManagerLoadedEvent]);}})(this);
        function onAdsManagerLoaded(adsManagerLoadedEvent)
        {
            // Obtener el administrador de anuncios.
			adsManager = adsManagerLoadedEvent.getAdsManager(this.objContentPublisher);  // debe definirse en el elemento de vídeo del contenido.

			// Añadir procesadores a los eventos obligatorios.
			adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError);
			adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,_deferredOnContentPauseRequested);
			adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,_deferredOnContentResumeRequested);
			adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,_deferredOnAdError);
			
			// Procesar eventos adicionales (si resulta necesario).
			adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,_deferredOnAdEvent);
			adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,_deferredOnAdEvent);
			adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,_deferredOnAdEvent);
			adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED,_deferredOnAdEvent);

			try {
			    // Inicializar el administrador de anuncios. La lista de reproducción de reglas de anuncios se iniciará en este momento.
		        adsManager.init(_publi_width, _publi_height, google.ima.ViewMode.NORMAL);
                // Invocar el evento de reproducción para iniciar la visualización del anuncio. Los anuncios de vídeo y superposición únicos
			    // se iniciarán en este momento; la invocación se ignorará para las reglas de anuncios.
			    adsManager.start();
			} catch (adError) {
			  // Es posible que se genere un error si existe un problema con la respuesta de VAST.
			}
		}

        var _deferredOnAdEvent = (function(that) { return function(event) {onAdEvent.apply(that, [event]);}})(this);
		function onAdEvent(adEvent)
        {
			// Recuperar el anuncio del evento. Algunos eventos (p. ej. ALL_ADS_COMPLETED)
			// no cuentan con objetos de anuncios asociados.
			var ad = adEvent.getAd();

            switch (adEvent.type) {
			    case google.ima.AdEvent.Type.LOADED:
                    // Este es el primer evento enviado para un anuncio; es posible
                    // determinar si el anuncio es de vídeo o de superposición.

                    this.notifyPubliLoaded();

                    if (!ad.isLinear()) {
                      // Colocar AdDisplayContainer correctamente para la superposición.
                      // Utilizar ad.width y ad.height.
                    }
				break;

                case google.ima.AdEvent.Type.STARTED:
                    // Este evento indica que el anuncio se ha iniciado; el reproductor de vídeo
                    // puede ajustar la interfaz de usuario, por ejemplo, mostrar un botón de detención y
                    // el tiempo restante.

                    this.notifyPubliStarted();

                    if (ad.isLinear()) {
                      // En el caso de anuncios lineales, puede iniciarse un temporizador para realizar un sondeo del
                      // tiempo restante.
                      intervalTimer = setInterval(function() {var remainingTime = adsManager.getRemainingTime();},interval); // Cada 300 milésimas de segundo
                    }
				break;

			    case google.ima.AdEvent.Type.COMPLETE:
                    // Este evento indica que el anuncio ha finalizado; el reproductor de vídeo
                    // puede realizar las acciones apropiadas de la interfaz de usuario, como suprimir el temporizador para
                    // detectar el tiempo restante.
                    this.notifyPubliEnded();
					
                    if (ad.isLinear()) {
                      clearInterval(intervalTimer);
                    }
				break;

                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    this.notifyAllPubliEnded();
                    break;

                case google.ima.AdEvent.Type.SKIPPED:
                    this.notifySkippedPubli();
                    break;

			}
		}

        var _deferredOnAdError = (function(that) {return function(event) {onAdError.apply(that, [event]);}})(this);
		function onAdError(adErrorEvent) {
			// Gestionar el registro de errores.
            if(adErrorEvent.type != google.ima.AdEvent.Type.ALL_ADS_COMPLETED){this.notifyAllPubliError();}

		}

        var _deferredOnContentPauseRequested = (function(that) {return function() {onContentPauseRequested.apply(that);}})(this);
		function onContentPauseRequested()
        {
            this.notifyContentPauseRequested();
		}

        var _deferredOnContentResumeRequested = (function(that) {return function() {onContentResumeRequested.apply(that);}})(this);
		function onContentResumeRequested()
        {
            this.notifyContentResumeRequested();
		}
    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3Html5Controller = Ima3Html5Controller;

}(emic.publicidad.controllers));(function(namespace) {
    
    // Inheritance class
    Ima3FlashController.prototype = new emic.publicidad.controllers.BasePubliController();

    /**
     * @constructor
     */
    function Ima3FlashController()
    {

        /**
         * className emic.publicidad.controllers.Ima3FlashController
         */
        this.className = "emic.publicidad.controllers.Ima3FlashController";

        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
		
		var _url;
        var _id;
		var _containerPubli;
		var _publi_width;
        var _publi_height;
		
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


		
		this.init = function(containerPubli, width, height, id){
            _publi_width = width;
			_publi_height = height;
            _id = id;
            _updateThisShortcut.apply(this);

			//element = document.getElementById("IMA");
			_containerPubli = document.getElementById(containerPubli);
			
			_createObject.apply(this);
		};
		
        this.loadPubli = function(url)
        {
			this._url = url;
			this.requestAds();
		};
		
		this.requestAds = function(){
            _updateThisShortcut.apply(this);
		
            try{
                _getFlashObject.apply(this).requestAdsJS(this._url);
            }
            catch (err){
				//console.info(err);
            }
        };

        var _updateThisShortcut = function(){
            emic["ima3flash_" + _id] = this;
        };

        var _getFlashObject = function(){
            return  document.getElementById("IMA3FlashController_" + _id);
        };

		var _createObject = function(){

			if (!this.isReady) {

                //Vaciamos el contenedor
                while(_containerPubli.firstChild) {_containerPubli.removeChild(_containerPubli.firstChild);}

                //Creamos una nueva capa para meter el flash dentro, ya que swfobj sustituye la capa por el objeto
                container = document.createElement('div');
                container.id = "IMA3FlashController_" + _id;
                _containerPubli.appendChild(container);

                var defReady = (function(that){
					return function(e){
						console.log("ready");
						//that.notifyControllerLoaded();
					};				
				})(this);
			
            	var flashvars = {
                    id: _id
            	};
            	var params = {
                	menu: "false",
                	allowFullscreen: "true",
                	allowScriptAccess: "always",
                	bgcolor: "",
                	wmode: "window"
            	};
            	var attributes = {
                	id:container.id
            	};
				
            	swfobject.embedSWF(
                	//"/static/javascript/IMA/bin/IMA.swf",
//					"/emicmedia/tests/publicidad/IMA.swf",
//                    "/player/bin/swf/IMA.swf",
                    "/psdmedia/resources/swf/psd/IMA3FlashController.swf",
                    container.id, _publi_width, _publi_height, "10.0.0",
                	//"/static/javascript/IMA/bin/expressInstall.swf",
					//"/emicmedia/tests/publicidad/expressInstall.swf",
                    "/player/bin/swf/expressInstall.swf",
                	flashvars, params, attributes, defReady);
			}
			else {
                this.notifyControllerLoaded();
			}
        };

        /**
         * Call desde IMA.swf
         * @param tipo
         */
        this.adManagerHandlerSWF = function(tipo){
            //yes.core.log("tipo:", tipo);
            //TODO: Escuchar en el player un cambio en adSkippableState para habilitar el botón skip en futuras implementaciones de VAST 3.0.
            //Por el momento lo forzamos desde el player.

            switch (tipo){
                case "started":
                    //this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
					this.notifyPubliStarted();
                break;
                case "completed":
                    //_saltaPubli.parentNode.style.display = "none";
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED));
					this.notifyPubliEnded();
                break;
                case "allAdsCompleted":
					this.notifyAllPubliEnded();
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_POSITION_COMPLETE));
                break;
                case "contentPauseRequested":
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_PAUSE_REQ));//
					this.notifyContentPauseRequested();
                break;
                case "contentResumeRequested":
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_RESUME_REQ));//
					this.notifyContentResumeRequested();
                break;
				
            }
        };

        this.setAdSkippableStateSWF = function(flag){
            //yes.core.log("Skipable: ", flag);
            //Dejamos esto preparado para ocultar el Skip Publi cuando el adserver lo indique
            /**
            if (flag){
                _saltaPubli.style.display = "";
            }else{
                _saltaPubli.style.display = "none";
            }*/
        };

        this.adManagerHandlerErrorSWF = function(tipo, id){
            var ev = new emic.publicidad.events.PubliEvent();
            ev.type = emic.publicidad.events.PubliEvent.PUBLI_ERROR;
            ev.id = id;
            this.dispatchEvent(ev);
        };

        this.adsLoaderErrorHandlerSWF = function(tipo, id){
            var ev = new emic.publicidad.events.PubliEvent();
            ev.type = emic.publicidad.events.PubliEvent.PUBLI_ERROR;
            ev.id = id;
            this.dispatchEvent(ev);
        };

        this.onAdProgressSWF = function(progress){
            if (progress > 10){
                //_saltaPubli.parentNode.style.display = "";
            }
        };

        this.receivedFromJavaScript = function(){
        };

        var _skipAd = (function(that){
            return function(){
                that.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED));
            };
            //_getFlashObject.apply(this).skipAdJS();
        })(this);

        /**
         * Call desde IMA.swf
         */
        this.readySWF = function(){
            //yes.core.log("Ready desde dentro");
            //_saltaPubli.onclick = _skipAd;
            this.notifyControllerLoaded();
        };

        this.closeAd = function(){
            _getFlashObject.apply(this).closeAdJS();
        };

	}
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3FlashController = Ima3FlashController;

}(emic.publicidad.controllers));(function(namespace) {
    
    // Inheritance class
    PubliControllerFactory.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliControllerFactory()
    {

        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.controllers.PubliControllerFactory
         */
        this.className = "emic.publicidad.controllers.PubliControllerFactory";


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        CONTROLLER_IMA3_FLASH = "ima_flash";
        CONTROLLER_IMA3_HTML5 = "ima_html5";
		CONTROLLER_IMA3 = "ima3";

        var _settings;
        var _controller;

        this.getController = function(controllerType)
        {
            switch (controllerType)
            {

                case CONTROLLER_IMA3_FLASH:
                    _controller = new emic.publicidad.controllers.Ima3FlashController();
                    break;
                case CONTROLLER_IMA3_HTML5:
                    _controller = new emic.publicidad.controllers.Ima3Html5Controller();
                    break;
				case CONTROLLER_IMA3:
					_controller = new emic.publicidad.controllers.Ima3Controller();
					break;
                default:
                    _controller = new emic.publicidad.controllers.Ima3Controller();
            }
			
			//dmena TODO quitar
			//_controller = new emic.publicidad.controllers.Ima3Controller();
			
            return _controller;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.PubliControllerFactory = PubliControllerFactory;

}(emic.publicidad.controllers));/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    MediaEvent.prototype = new  psd.framework.Event();

    MediaEvent.ON_READY = "onReady";
    MediaEvent.ON_CUE = "onCue";
    MediaEvent.ON_METADATA = "onMetadata";
    MediaEvent.ON_ERROR = "onError";
    MediaEvent.ON_STATUS_CHANGE = "onStatusChange";
    MediaEvent.ON_VOLUME_CHANGE = "onVolumeChange";
    MediaEvent.ON_PROGRESS = "onProgress";
    MediaEvent.ON_SEEK_START = "onSeekStart";
    MediaEvent.ON_SEEK_COMPLETE = "onSeekComplete";
    MediaEvent.ON_BUFFER_EMPTY = "onBufferEmpty";
    MediaEvent.ON_BUFFER_FULL = "onBufferFull";
    MediaEvent.ON_SWITCH_REQUEST = "onSwitchRequest";
    MediaEvent.ON_SWITCH_COMPLETE = "onSwitchComplete";

    //Constantes sólo para eventos disparados por controladores con gestión de publicidad interna
    // (Sobre t0d0 proveedores externos de los que no tenemos control)

    //TODO: Esto debería ir disparado por AdModule, comunicado via pasarela del controller al Admodule
    MediaEvent.ON_AD_INSTREAM_START = "onAdInStreamStart";
    MediaEvent.ON_AD_INSTREAM_END = "onAdInStreamEnd";
    MediaEvent.ON_AD_VIDEO_START = "onAdVideoStart";
    MediaEvent.ON_AD_VIDEO_END = "onAdVideoEnd";
    MediaEvent.ON_AD_VIDEO_SKIP = "onAdVideoSkip";

    function MediaEvent(type) {

        this.data = {};
        this.id = null;

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediaEvent = MediaEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    UIEvent.prototype = new  psd.framework.Event();

    UIEvent.ON_INIT_COMPLETE = "onInitComplete";
    UIEvent.ON_ORDER_BEGIN = "onOrderBegin";
    UIEvent.ON_ORDER_PLAY = "onOrderPlay";
    UIEvent.ON_ORDER_PAUSE = "onOrderPause";
    UIEvent.ON_ORDER_PLAYPAUSE = "onOrderPlayPause";
    UIEvent.ON_ORDER_STOP = "onOrderStop";
    UIEvent.ON_ORDER_VOLUME_CHANGE = "onOrderVolumeChange";
    UIEvent.ON_ORDER_MUTE = "onOrderMute";
    UIEvent.ON_ORDER_FULLSCREEN = "onOrderFullScreen";
    UIEvent.ON_ORDER_SEEK_BY_PROP = "onOrderSeekByProp";
    UIEvent.ON_ORDER_SEEK_BY_SECS = "onOrderSeekBySecs";
    UIEvent.ON_ORDER_NEXT = "onOrderNext";
    UIEvent.ON_ORDER_PREV = "onOrderPrev";
    UIEvent.ON_ORDER_SWITCH_UP = "onOrderSwitchUp";
    UIEvent.ON_ORDER_SWITCH_DOWN = "onOrderSwitchDown";
    UIEvent.ON_ORDER_SWITCH_DIRECT = "onOrderSwitchDirect";

    //TODO: UiskinReady es redundante con initcomplete?

    UIEvent.ON_SKIN_READY = "onSkinReady";
    UIEvent.ON_PREVIEW_READY = "onPreviewReady";

    //TODO: Mirar bien si esto debería de estar en el módulo de publicidad... Carcasas dentro de UI?
    UIEvent.ON_ORDER_SKIP_AD = "onOrderSkipAd";

    function UIEvent(type) {

        this.data = {};

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.UIEvent = UIEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    AdEvent.prototype = new  psd.framework.Event();

    AdEvent.ON_AD_INSTREAM_START = "onAdInStreamStart";
    AdEvent.ON_AD_INSTREAM_END = "onAdInStreamEnd";
    AdEvent.ON_AD_VIDEO_START = "onAdVideoStart";
    AdEvent.ON_AD_VIDEO_END = "onAdVideoEnd";
    AdEvent.ON_AD_VIDEO_SKIP = "onAdVideoSkip";
    AdEvent.ON_AD_POSITION_END = "onAdPositionEnd";
    AdEvent.ON_NO_AD= "onNoAd";
    AdEvent.ON_AD_ERROR = "onAdError";
    AdEvent.ON_READY = "onReady";

    function AdEvent(type) {

        this.data = {};
        this.id = null;

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.AdEvent = AdEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 10/02/14.
 */
(function (namespace){

    function MediaControllerFactory(){


        this.getController = function(type){
            var instance;
            switch (type){
                case emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                    instance =  new emic.top.media.FlashController(type);
                break;
                case emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD:
                    instance =  new emic.top.media.FlashController(type);
                break;
                case emic.top.MediaModule.CONTROLLER_TYPE_TRITON:
                    instance =  new emic.top.media.TritonController();
                break;
                case emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                    instance =  new emic.top.media.HTML5Controller();
                break;
            }

            return instance;
        }
    }

    namespace.MediaControllerFactory = MediaControllerFactory;
})(emic.top.media);/**
 * Created by IGomezG on 25/06/14.
 */

(function (namespace){

    MediaControllerBase.prototype = new psd.framework.EventDispatcher();

    function MediaControllerBase(){

        // Super
        psd.framework.EventDispatcher.call(this);

        //TODO: Cambiar toda la gestión de autoswitch para meterlo en el data y no con setters
        var _autoSwitch = true;
        this.setAutoSwitch = function(value){
            _autoSwitch = value;
            this.onAutoSwitchChange();
        };
        this.getAutoSwitch = function(){
            return _autoSwitch;
        };

        var _ready = false;
        this.getReady = function(){
            return _ready;
        };

        // --------------- Dispatch Events -------------------
        // Estos métodos deben ser llamados por el controlador que implemente esta interfaz
        // ---------------------------------------------------

        this.notifyReady = function(){
            _ready = true;
            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_READY))
        };

        this.notifyCue = function(data){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_CUE);
            ev.data = data;
            this.dispatchEvent(ev);
        };

        this.notifyMetadata = function(data){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_METADATA);
            ev.data = data;
            this.dispatchEvent(ev);
        };

        this.notifyError = function(id){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_ERROR);
            ev.id = id;
            this.dispatchEvent(ev);
        };

        //Llamadas para eventos disparados por controladores con gestión de publicidad interna
        //(Sobre t0d0 proveedores externos de los que no tenemos control)
        //el resto deberán ser totalmente independientes del servicio de publicidad para que lo maneje adModule

        this.notifyInStreamAdStart = function(data, id, name){
            var ev;

            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_AD_INSTREAM_START);
            ev.id = id;
            ev.name = name;
            this.dispatchEvent(ev);
        };

        this.notifyInStreamAdEnd = function(id, name){
            var ev;

            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_AD_INSTREAM_END);
            ev.id = id;
            ev.name = name;
            this.dispatchEvent(ev);
        };

        this.notifyVideoAdStart = function(provider){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_AD_VIDEO_START);
            ev.data = {};
            ev.data.provider = provider;
            this.dispatchEvent(ev);
        };

        this.notifyVideoAdEnd = function(provider){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_AD_VIDEO_END);
            ev.data = {};
            ev.data.provider = provider;
            this.dispatchEvent(ev);
        };

        this.notifyVideoAdSkip = function(provider){};
        this.notifyVideoAdClose = function(provider){};

        this.notifyStatusChange = function(status){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_STATUS_CHANGE);
            ev.data = {};
            ev.data.status = status;
            this.dispatchEvent(ev);
        };

        this.notifyVolumeChange = function(vol){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_VOLUME_CHANGE);
            ev.data = vol;
            this.dispatchEvent(ev);
        };

        this.notifyProgress = function(current, total, bytesLoaded, bytesTotal){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_PROGRESS);
            ev.data = {};
            ev.data.currentTime = current; //en segundos
            ev.data.totalTime = total;  //en segundos
            ev.data.bytesLoaded = bytesLoaded;
            ev.data.bytesTotal = bytesTotal;
            this.dispatchEvent(ev);
        };

        this.notifySeekStart = function(offset){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SEEK_START);
            ev.data = {};
            ev.data.offset = offset; //0..100
            this.dispatchEvent(ev);
        };

        this.notifySeekComplete = function(offset){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SEEK_COMPLETE);
            ev.data = {};
            ev.data.offset = offset; //0..100
            this.dispatchEvent(ev);
        };

        this.notifyBufferEmpty = function(){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_BUFFER_EMPTY);
            this.dispatchEvent(ev);
        };

        this.notifyBufferFull = function(){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_BUFFER_FULL);
            this.dispatchEvent(ev);
        };

        this.notifySwitchRequest = function(index){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SWITCH_REQUEST);
            ev.data = {};
            ev.data.index = index;
            this.dispatchEvent(ev);
        };

        this.notifySwitchComplete = function(index){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE);
            ev.data = {};
            ev.data.index = index;
            this.dispatchEvent(ev);
        };


        //TODO: Crear notify para los switch de calidad (start y complete)


        // --------------- API -------------------------------
        // Estos métodos deben ser sobreescritos por el controlador que implemente esta interfaz
        // ---------------------------------------------------

        this.init = function(){};
        this.reset = function(){};
        this.kill = function(){};
        this.play = function(){};
        this.pause = function(){};
        this.playpause = function(){};
        this.resume = function(){};
        this.stop = function(){};
        this.switchUp = function(){};
        this.switchDown = function(){};
        this.switchDirect = function(id){};

        /**
         *
         * @param secs Valor en segundos
         */
        this.seek = function(secs){};
        /**
         *
         * @param prop Valor entre 0 y 100
         */
        this.setVolume = function(prop){};
        this.onAutoSwitchChange = function(){};
    }

    namespace.MediaControllerBase = MediaControllerBase;

}(emic.top.media));
/**
 * Created by igomez on 21/07/2014.
 */
(function(namespace) {

    FlashController.prototype = new emic.top.media.MediaControllerBase();

    function FlashController(controller){

        emic.top.media.MediaControllerBase.call(this);

        var _data = {};
        var _flash;
        var _controller = controller;

        this.init = function(data){
            _data = data;
            emic.top["FlashInstance_" + _data.genericData.id] = this;
            _createFlashObj.apply(this);
        };
        this.reset = function(){
            var mediaObject = {};

            mediaObject.isLive = _data.mediaData.isLive;
            mediaObject.url = _data.mediaData.url;
            mediaObject.id = _data.mediaData.id;
            mediaObject.idPlayer = _data.genericData.id;
            mediaObject.controller = _controller;
            mediaObject.mimetype = _data.mediaData.mimetype;
            mediaObject.autoplay = true; //El controlador siempre se inicia automáticamente. El autoplay se gestiona en TopPlayer y carga el player cuando toque
            mediaObject.clipBegin = _data.mediaData.clipBegin;
            mediaObject.clipEnd = _data.mediaData.clipEnd;
            mediaObject.absolute = _data.mediaData.absolute;

            _flash.loadJS(mediaObject);
        };
        this.play = function(){
            _flash.playJS();
        };
        this.pause = function(){
            _flash.pauseJS();
        };
        this.playpause = function(){
            _flash.playpauseJS();
        };
        this.stop = function(){
            _flash.stopJS();
        };
        this.switchUp = function(){
            _flash.switchUpJS();
        };
        this.switchDown = function(){
            _flash.switchDownJS();
        };
        this.switchDirect = function(id){
            _flash.switchDirectJS(id);
        };
        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.seek = function(offset){
            _flash.seekJS(offset);
        };
        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.setVolume = function(offset){
            _flash.setVolumeJS(offset);
        };


        this.onAutoSwitchChange = function(){};

        var _createFlashObj = function(){
            var i, container, mediaContainer;


            mediaContainer = document.getElementById(_data.mediaData.container);
            //Vaciamos el contenedor
            if(mediaContainer)
            {
                //Vaciamos el contenedor
                while(mediaContainer.firstChild) {mediaContainer.removeChild(mediaContainer.firstChild);}

                //Creamos una nueva capa para meter el flash dentro, ya que swfobj sustituye la capa por el objeto
                container = document.createElement('div');
                container.id = "flashContainer_" + _data.genericData.id;
                mediaContainer.appendChild(container);

                //TODO: Completar todos los parámetros de Flash con los que lleguen en el _data
                var flashvars = {
                    isLive: _data.mediaData.isLive,
                    url: _data.mediaData.url,
                    id: _data.mediaData.id,
                    idPlayer: _data.genericData.id,
                    controller: _controller,
                    mimetype: _data.mediaData.mimetype,
                    autoplay: true, //El controlador siempre se inicia automáticamente. El autoplay se gestiona en TopPlayer y carga el player cuando toque
                    clipBegin: _data.mediaData.clipBegin,
                    clipEnd: _data.mediaData.clipEnd,
                    absolute: _data.mediaData.absolute
                };
                var params = {
                    menu: "false",
                    allowFullscreen: "true",
                    allowScriptAccess: "always",
                    bgcolor: _data.uiData.bgColor,
                    wmode: _data.mediaData.wmode
                };
                var attributes = {
                    id:"FlashController_" + _data.genericData.id
                };

                for (i in _data.mediaData.controllerData) {
                    //TODO: Mirar el warning de Webstorm en  [i]
                    params["cdn_" + i] = _data.mediaData.controllerData[i];
                }

                console.log("CREANDO PEL�?CULA FLASH");

                swfobject.embedSWF(
                    "/psdmedia/resources/swf/psd/FlashController.swf",
                    container.id, _data.genericData.width, _data.genericData.height, "10.0.0",
                    "/psdmedia/resources/swf/ext/expressInstall.swf",
                    flashvars, params, attributes, _onReady);

            }else{
                //TODO: Control de errores: No container
            }
        };

        var _onReady = function(e){
            console.log("Readyyy");
            _flash = document.getElementById("FlashController_" + _data.genericData.id);
        };

        /////////////////////////////////////////////////////////
        //  CALLs from SWF
        /////////////////////////////////////////////////////////


        this.notifyBufferEmptySWF = function(){
            this.notifyBufferEmpty();
        };

        this.notifyBufferFullSWF = function(){
            this.notifyBufferFull();
        };

        this.notifySeekStartSWF = function(offset){
            this.notifySeekStart(offset);
        };

        this.notifySeekCompleteSWF = function(offset){
            this.notifySeekComplete(offset);
        };

        this.notifySwitchRequestSWF = function(index){
            this.notifySwitchComplete(index);
        };

        this.notifySwitchCompleteSWF = function(index){
            this.notifySwitchComplete(index);
        };

        this.notifyReadySWF = function(){
            this.notifyReady();
        };

        this.notifyMetadataSWF = function(data){
            this.notifyMetadata(data);
        };

        this.notifyErrorSWF = function(id){
            this.notifyError(id);
        };

        this.notifyVolumeChangeSWF = function(vol){
            this.notifyVolumeChange(vol);
        };

        this.notifyStatusChangeSWF = function(status){
            var estado;

            switch (status){

                case 0:
                    estado = emic.top.MediaModule.STATUS_INITIALIZING;
                break;
                case 1:
                    estado = emic.top.MediaModule.STATUS_STOP;
                break;
                case 2:
                    estado = emic.top.MediaModule.STATUS_PLAY;
                break;
                case 3:
                    estado = emic.top.MediaModule.STATUS_PAUSE;
                break;
            }

            this.notifyStatusChange(estado);
        };

        this.notifyProgressSWF = function(current, total, bytesLoaded, bytesTotal){
            this.notifyProgress(current, total, bytesLoaded, bytesTotal);

        };
    }

    namespace.FlashController = FlashController;

})(emic.top.media);/**
 * Created by IGomezG on 5/02/14.
 * NOTA: Lo mismo es muy enrevesado el uso de closures para mantener la encapsulación de la función.
 * Ese lío se solucionará cuando Triton incorpore la posibilidad de especificar un scope en
 * su addEventListener
 */
(function (namespace){

    window.tdPlayerApiReady = function(){
        namespace.directInstance.onTritonLoaded();
    };


    // Inheritance class
    TritonController.prototype = new emic.top.media.MediaControllerBase();

    TritonController.tritonLoaded = false;

    TritonController.ERROR_ID_MODULES = 001;

    //TODO: Playpause no funciona
    //TODO: Mirar si se le puede especificar a Triton con qué controlador conectar (flash, html5) para hacer caso a la prioridad de la API de MediaModule

    function TritonController(){


        emic.top.media.MediaControllerBase.call(this);

        var _data;

        var _tritonScriptCreated = false;

        var _player;
        // Almacena el tiempo definido para el último banner recibido
        var _lastAdTime = 0;

        var _timeout = null;

        var _RETRY_TIME_INI = 5000;
        var _RETRY_TIME_INC = 3000;
        var _RETRY_TIME_TOP = 5000;
        var _TIME_AUTODISCONNECT = 45;  //En minutos
        var _TIME_PREROLL_BLOCK = 15; //En minutos

        var _retryTime = _RETRY_TIME_INI;

        var _getLastTime = function(){return _lastAdTime};

        var _onStatus = (function(that){
            return function(ev){
                var estado;
                console.log(ev.data.code);
                switch (ev.data.code){
                    case "LIVE_STOP":
                        estado = emic.top.MediaModule.STATUS_STOP;
                    break;
                    case "LIVE_PAUSE":
                        estado = emic.top.MediaModule.STATUS_PAUSE;
                    break;
                    case "LIVE_PLAYING":
                        estado = emic.top.MediaModule.STATUS_PLAY;
                    break;
                }
                that.notifyStatusChange(estado);
            }
        })(this);

        var _onReady = (function(that){
            return function(){
                that.notifyReady();
                _play.apply(this);
                _player.addEventListener( 'track-cue-point', _onTrackCuePoint );
            }
        })(this);

        var _onModuleError = (function(that){
            return function(){
                that.notifyError(TritonController.ERROR_ID_MODULES);
            }
        })(this);

        var _onTrackCuePoint = (function(that){
            return function(e){
                that.notifyCue(e.data);

            }
        })(this);

        var _onSyncAdStart = (function(that, getLastTime){
            return function(ev){
                var cadena, cid;
                //Sacamos el identificador de campaña de la url del banner (cid=*******)
                try{
                    cadena = ev.data.data.url;
                    cid = cadena.match(/\&cid=([^\&]*)&/)[1];
                }
                catch (er){
                    cid = "Unable to retrieve ID";
                }

                that.notifyInStreamAdStart(ev, ev.data.id, cid);

                setTimeout(function(){
                    that.notifyInStreamAdEnd(ev.data.id, cid);
                                    }, getLastTime());
            };
        })(this, _getLastTime);

         var _onAdBreak = (function(that){
             return function(ev){
                 try{
                     _lastAdTime = ev.data.adBreakData.duration;
                 }catch(er){
                     //TODO: GEstión de errores
                     console.log("Error al recuperar el tiempo del Ad Break");
                 }

             };
         })(this);

        //TODO: cambiar literal "triton" por una constante
        var _onVideoMidStart = (function(that){
            return function(ev){
                that.notifyVideoAdStart("triton");
            };
        })(this);

        var _onVideoMidComplete = (function(that){
            return function(ev){
                that.notifyVideoAdEnd("triton");
            };
        })(this);


        //TODO: Revisar esto para que funcione con TOP
        var _forzarCampana = function(){

           var that = this;
            document.body.style.fontSize="24px";
            document.getElementById("banner-live_synced_bigbox").style.backgroundColor = "#00ff00";
            document.getElementById("banner-live_synced_bigbox").style.width = "300px";
            document.getElementById("banner-live_synced_bigbox").style.height = "250px";
            document.getElementById("banner-live_synced_leaderboard").style.backgroundColor = "#ffff00";
            document.getElementById("banner-live_synced_leaderboard").style.width = "728px";
            document.getElementById("banner-live_synced_leaderboard").style.height = "90px";


            var elementos = ["banner-live_synced_bigbox","banner-live_synced_leaderboard"];
            var id = elementos[Math.floor(Math.random() * 1.99999)];
            var ev = {};
            ev.data = {};
            ev.data.id = id;
            this.notifyInStreamAdStart(ev, ev.data.id);

            setTimeout(function(){
                that.notifyInStreamAdEnd(ev.data.id);
            }, 10000);
        };

        //TODO: Revisar si se puede desactivar (quizás cuando la constante es 0?)
        var _initDurationTimer = function(){

            if (_timeout){
                clearTimeout(_timeout);
            }
             var stopRadio = (function(that){
                 return function(){
                     console.log("Detenemos emisión tras ", _TIME_AUTODISCONNECT, "minutos");
                     that.stop();
                 };
             })(this);
            _timeout = setTimeout(stopRadio,_TIME_AUTODISCONNECT * 60 * 1000); //Llega en minutos
        };


        // ------------- API -------------

        this.loadTritonAPI = function(){
            console.log("Iniciando peticion de librerías a Triton");

            var nuevo = document.createElement('script');
            nuevo.setAttribute("type", "text/javascript");
            nuevo.setAttribute("data-dojo-config", "async: 1, tlmSiblingOfDojo: 0, deps:['tdapi/run']");
            nuevo.setAttribute("src", "//api.listenlive.co/tdplayerapi/2.4/dojo/dojo.js");
            document.getElementsByTagName('head')[0].appendChild(nuevo);

            _tritonScriptCreated = true;
        };

        this.init = function(data) {

            _data = data;

            //Descomentar para forzar la carga de campañas falsas
            //-----
            /*var deferred = (function(that){
             return function(){_forzarCampana.apply(that)}
             })(this);
             var deferred2 = (function(that){
             return function(){that.notifyVideoAdStart()}
             })(this);
             var deferred3 = (function(that){
             return function(){that.notifyVideoAdEnd()}
             })(this);

             setInterval(deferred, 14000, this);
             setInterval(deferred2,23000);
             setTimeout(function(){setInterval(deferred3,23000)}, 7000);*/
            //-----

            // Esto es neecesario puesto que el callback de inicialización de las dependencias de Triton
            // ha de definirse en window.tdPlayerApiReady de forma obligada. Esta referencia guarda el contexto
            // de la última instancia creada

            namespace.directInstance = this;

            if (!_tritonScriptCreated) {
                this.loadTritonAPI(this);
            }else{
                _init.apply(this);
            }

        };

        //A este método se llama tras la llegada del callback de la petición a las dependencias de Triton
        this.onTritonLoaded = function(){
            console.log("Librerías de Triton cargadas");
            _init.apply(this);
        };


        var _init = function(){

            var connectDef = (function(that, data){
                return function(){
                    if (!that.getReady()) {
                        console.log("Retrying Triton modules loading, next call in:", _retryTime / 1000, "segs");
                        that.init(data);
                    }
                }
            })(this, _data);
            setTimeout( connectDef, _retryTime);
            if (_retryTime < _RETRY_TIME_TOP){
                _retryTime += _RETRY_TIME_INC;
            }

            _connect.apply(this);
        };

        //TODO: Cuando no existen los containers, o tienen alto cero, o display none no se carga Triton y no da error, mirar si podemos defenderlo con una detección previa

        var _connect = function(){

            var config;
            config = {
                coreModules:[
                    {
                        id: 'MediaPlayer',
                        playerId: _data.mediaData.container,
                        isDebug: false,
                        plugins: [ {id:"vastAd"} ]
                    },
                    {
                        id: 'SyncBanners',
                        keepElementsVisible:false,
                        elements:[
                            {
                                id:_data.mediaData.controllerData.container_banner_bigbox,
                                width:300, height:250
                            },
                            {
                                id:_data.mediaData.controllerData.container_banner_leaderboard,
                                width:728, height:90
                            }]
                    }]};

            _player = new TdPlayerApi(config);
            _player.addEventListener('player-ready', _onReady);
            _player.addEventListener('module-error', _onModuleError);
            _player.addEventListener('stream-status', _onStatus);
            _player.addEventListener('ad-break-cue-point', _onAdBreak);
            //_player.addEventListener('d-break-cue-point-complete', _onAdBreakComplete);
            _player.addEventListener('ad-break-synced-element', _onSyncAdStart);
            _player.addEventListener('video-mid-roll-playback-start', _onVideoMidStart);
            _player.addEventListener('video-mid-roll-playback-complete', _onVideoMidComplete);
            _player.loadModules();

            this.notifyStatusChange(emic.top.MediaModule.STATUS_INITIALIZING);
        };

        this.play = function(){
            if (_data.mediaData.id && _player){
               _play.apply(this);
            }
        };

        var _play = function(){
            console.log("play a:", _data.mediaData.id);
            _initDurationTimer.apply(this);
			// 2.4
            _player.play({mount:_data.mediaData.id, connectionType:'hdAlternate'});
            // 2.3 _player.play(_data.mediaData.id, 'hdAlternate');
        };

        this.pause = function(){
            if (_player)_player.pause();
        };

        this.resume = function(){
            if (_player)_player.resume();
        };

        this.stop = function(){
            if (_player) _player.stop();
        };

        this.setVolume = function(offset){
            if (this.getReady()) _player.setVolume(offset);
        };

        //TODO: El mute ya no está definido en la interfaz puesto que se controla desde MediaModule canalizandolo por un setVolume(0) o al valor anterior, cuando esté terminado borrar el método
        this.mute = function(flag){
            if (_player)
                if (flag){
                    _player.mute();
                }else{
                    _player.unMute();
                }
        };

        this.reset = function () {

        };
    }

    namespace.TritonController = TritonController;

}(emic.top.media));
/**
 * Created by IGomezG on 28/07/14.
 */
(function(namespace) {
    
    // Inheritance class
    HTML5Controller.prototype = new emic.top.media.MediaControllerBase();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function HTML5Controller()
    {

        //TODO: Cambiar todos los if(typeof(_mediaTag)!="undefined" por un evento de carga (ready, etc) y protegerlo desde MediaModule
        //TODO: BUG: Las segundas entradas en el controller no hacen autoplay

        // Super
        emic.top.media.MediaControllerBase.call(this);
        
        /**
         * className psd.media.wrappers.HTML5Controller
         */
        this.className = "emic.top.media.HTML5Controller";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // 
        var _data = {};

        var _playing = false;

        // 
        var _playbackStarted = false;

        //
        var _mediaTag;

        var _onMediaEvent = function(evt) {
            switch(evt.type) {
                
                case "playing":
                    if(!_playbackStarted) {
                        _playbackStarted = true;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                        //todo: Ver si necesamos un notifyMediaBegin
                        //this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_BEGIN, {duration: _mediaTag.duration}));
                    }
                    
                    if (!_playing){
                        _playing = true;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                        //TODO: On metadata {duration: _mediaTag.duration}
                        //this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_START, {duration: _mediaTag.duration}));
                    }

                    this.notifyBufferFull();
                break;
                
                case "pause":
                    if (_playing){
                        _playing = false;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
                    }
                break;
                
                case "ended":
                    if(_playbackStarted){
                        _playbackStarted = false;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);

                    }
                break;
                    
                case "timeupdate":
                    this.notifyProgress(_mediaTag.currentTime, _mediaTag.duration);
                break;
                    
                case "waiting":
                    this.notifyBufferEmpty();
                break;
                case "volumechange":
                    this.notifyVolumeChange(_mediaTag.volume);
                break;
               
            }
        };
        
        
        //Devuelve la url con el token, si es que tuviera
        var _getURL = function (srcHTML5)
        {
            var separador, token, url;
            
            if (_data.authParamsHTML5 != undefined)
            {
                separador = (srcHTML5.indexOf("?") == -1)? "?":"&";
                token = separador + _data.authParamsHTML5;
            }
            else token = "";

            url = srcHTML5 + token;
            
            return url;
        };
        
        var _init = function() {
            var playerContainer = document.getElementById(_data.mediaData.container),
                srcHTML5,
                playerWidth = "100%",
                playerHeight = "100%",
                bgColor;


            //initializing

            
            if(typeof(_data.genericData.width)!="undefined") {playerWidth = _data.genericData.width;}
            if(typeof(_data.genericData.height)!="undefined") {playerHeight = _data.genericData.height;}
            


            if(_data.mediaData.mimetype.indexOf("audio")!=-1)
            {
               // if(psd.media.debug) {console.log("Audio content detected... using <audio> tag...");}

                // Comprobamos si el dispositivo soporta el tag de audio para intentar utilizarlo. Si no, mostramos un enlace generico.
                if(Modernizr.audio) {_mediaTag = document.createElement("audio");}
            }

            if(_data.mediaData.mimetype.indexOf("video")!=-1)
            {
                //if(psd.media.debug) {console.log("Video content detected... using <video> tag...");}

                // Comprobamos si el dispositivo soporta el tag de audio para intentar utilizarlo. Si no, mostramos un enlace generico.
                if(Modernizr.video) {_mediaTag = document.createElement("video");}
            }

            if(typeof(_mediaTag)!="undefined" && _mediaTag!=null)
            {

                bgColor = _data.uiData.bgColor;
                _mediaTag.setAttribute("id", "HTML5Controller_" + _data.genericData.id);
                _mediaTag.setAttribute("width", playerWidth);
                _mediaTag.setAttribute("height", playerHeight);
                //_mediaTag.setAttribute("onplaying", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                //_mediaTag.setAttribute("onended", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                _mediaTag.setAttribute("style", "background:" + bgColor);
                _mediaTag.requestFullScreen = _mediaTag.requestFullScreen ||
                                             _mediaTag.mozRequestFullScreen ||
                                             _mediaTag.webkitRequestFullScreen ||
                                             playerContainer.webkitRequestFullScreen;


                var deferredOnHTML5MediaEvent = (function(that) {return function(event) {_onMediaEvent.apply(that, [event]);}})(this);

                _addMediaEventListener("playing", deferredOnHTML5MediaEvent);
                _addMediaEventListener("pause", deferredOnHTML5MediaEvent);
                _addMediaEventListener("ended", deferredOnHTML5MediaEvent);
                _addMediaEventListener("timeupdate", deferredOnHTML5MediaEvent);
                _addMediaEventListener("waiting", deferredOnHTML5MediaEvent);
                _addMediaEventListener("volumechange", deferredOnHTML5MediaEvent);


                // Propiedad "autoplay"
                /*
                if(typeof(_data.mediaData.autoplay)!="undefined" &&
                    (_data.mediaData.autoplay==true || _data.mediaData.autoplay=="true"))
                {
                    _mediaTag.setAttribute("autoplay", "autoplay");
                }*/
                //El autoplay se gestiona en TopPlayer a nivel de player no de controlador
                _mediaTag.setAttribute("autoplay", "autoplay");

                // Propiedad "controls"
                if (_data.uiData.overrideNativeControls ==false || _data.uiData.overrideNativeControls=="false")
                {
                    _mediaTag.setAttribute("controls", "controls");
                }

                // Propiedad "poster"
                if(typeof(_data.uiData.poster)!="undefined")
                {
                    _mediaTag.setAttribute("poster", _data.uiData.poster);
                }

                srcNode = document.createElement("source");
                _setUrl.apply(this);

                _mediaTag.volume = _data.mediaData.startVolume;


                playerContainer.appendChild(_mediaTag);

            } else {
                playerContainer.innerHTML = '<a href="'+ _getURL(srcHTML5) +'"></a>';
            }

            this.notifyReady();     //TODO: Sólo en el caso de que exista un mediaTag, si no habría que lanzar un error que capturaria MediaModule
        };

        var _setUrl = function(){
            var i, srcHTML5;

            if(typeof(_data.mediaData.urlHTML5)!="undefined") {
                //if(psd.media.debug) {console.log("HTML5 alternative source detected: " + _settings.media.srcHTML5);}
                srcHTML5 = _data.mediaData.urlHTML5;
            }else if(typeof(_data.mediaData.url)!="undefined") {
                //if(psd.media.debug) {console.log("Invalid HTML5 url... using default url: " + _settings.media.src);}
                srcHTML5 = _data.mediaData.url;
            }else{
                if(psd.media.debug) {console.log("Invalid player configuration... aborting instantiation...");}
                return false;
            }

            // Si recibimos un array en la url, creamos varios nodos src para el tag de video.
            // Si recibimos un string simple, seteamos directamente el atributo src
            if(Object.prototype.toString.apply(srcHTML5) === '[object Array]')
            {
                for(i in srcHTML5)
                {

                    srcNode.setAttribute("src", _getURL(srcHTML5[i]));
                    _mediaTag.appendChild(srcNode);
                }

            }else
            {
                _mediaTag.setAttribute("src", _getURL(srcHTML5));
            }
        };

        // Añade un listener a un evento de la etiqueta multimedia        
        var _addMediaEventListener = function(type, listener)
        {
            if(_mediaTag)
            {
                if(_mediaTag.addEventListener) {_mediaTag.addEventListener(type, listener, false); }
                else if(_mediaTag.attachEvent) {_mediaTag.attachEvent(type, listener); }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        this.init = function(data){
            _data = data;
            _init.apply(this);

        };
        this.kill = function () {
            _mediaTag.pause();
        };
        this.reset = function(){
        };
        this.play = function(){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.play();
            }
        };
        this.pause = function(){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.pause)!="undefined") {
                _mediaTag.pause();
            }
        };
        this.playpause = function(){
            if (!_playbackStarted)
                _mediaTag.play()
            else
                if (_playing)
                    _mediaTag.pause();
                else
                    _mediaTag.play();
        };
        this.resume = function(){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.play();
            }
        };
        this.stop = function(){
            //La Api html5 no admite STOP
        };
        this.switchUp = function(){};
        this.switchDown = function(){};
        this.switchDirect = function(id){};

        this.seek = function(secs){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.currentTime)!="undefined") {
                _mediaTag.currentTime=secs;
            }
        };
        this.setVolume = function(prop){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.volume)!="undefined") {
                _mediaTag.volume = prop;
            }
        };

        this.onAutoSwitchChange = function(){};

    }
        
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.HTML5Controller = HTML5Controller;

}(emic.top.media));/**
 * Created by igomez on 26/06/2014.
 */
(function(namespace) {

    MediaModule.prototype = new psd.framework.EventDispatcher();

    MediaModule.TECHNOLOGY_FLASH = "flash";
    MediaModule.TECHNOLOGY_HTML5 = "html5";

    MediaModule.CONTROLLER_TYPE_AKAMAIHDS = "akamaihds";
    MediaModule.CONTROLLER_TYPE_AKAMAIHD = "akamaihd";
    MediaModule.CONTROLLER_TYPE_TRITON = "triton";
    MediaModule.CONTROLLER_TYPE_HTML5NATIVE = "html5native";

    MediaModule.STATUS_PLAY = "play";
    MediaModule.STATUS_PAUSE = "pause";
    MediaModule.STATUS_INITIALIZING = "initializing";
    MediaModule.STATUS_STOP = "stop";

    MediaModule.STATUS_DVR_LIVE = "playLive";
    MediaModule.STATUS_DVR_DEFERRED = "playDVR";

    function MediaModule(dataModel){

        // Super
        psd.framework.EventDispatcher.call(this);

        //TODO: Gestión de volumen interno en el modulo y no en cada controlador (inicial, cookie, etc)
        //TODO: Gestión de volumen inicial que ya viene en el data model (pasarselo a los dos controladores que hay ahora)

        /////////////////////////////////////////////////////////
        //  DATA
        /////////////////////////////////////////////////////////

        var _data = dataModel;
        var _status = "";
        var _totalTime;


        var _factory = new emic.top.media.MediaControllerFactory();
        var _controller;

        var _loaded = 0;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;


        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.init = function(){
            //TODO: Cotrol para no recargar si ya está inicializado
            _asignController.apply(this);
        };

        this.load = function () {
            if (_loaded == _LOAD_STATUS_NOT_LOADED)
                if (_data.mediaData.controllerName){
                    _loaded = _LOAD_STATUS_LOADING;
                    _controller = _factory.getController(_data.mediaData.controllerName);
                    console.log("Controlador:", _controller);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_READY, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_CUE, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_METADATA, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_ERROR, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_START, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_END, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onControllerEvent, this);
                    _controller.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onControllerEvent, this);
                    _controller.init(_data);
                }else{
                    console.log("No se han encontrado controladores compatibles");
                    //TODO: Disparar evento indicando que no hay controlador disponible para esa tecnología, o bien mostrar mensaje de error
                }
            else{
                this.play();
            }
        };

        this.play = function(){
            //TODO: Controlar que no se pueda hacer play si no se ha cargado antes le player (ready?)
            if (_controller){
                _controller.play();
            }
        };
        this.playpause = function(){
            if (_controller){
                _controller.playpause();
            }
        };
        this.getStatus = function(){
            return _status;
        };
        this.pause = function(){
            if (_controller){
                _controller.pause();
            }
        };
        this.stop = function(){
            if (_controller){
                _controller.stop();
            }
        };
        this.switchUp = function(){
            if (_controller){
                _controller.switchUp();
            }
        };
        this.switchDown = function(){
            if (_controller){
                _controller.switchDown();
            }
        };
        this.switchDirect = function(id){
            if (_controller){
                _controller.switchDirect(id);
            }
        };

        this.reset = function () {
            var playerContainer;

            if (_loaded == _LOAD_STATUS_NOT_LOADED) {
                _asignController.apply(this);
            }else{
                if (_loaded == _LOAD_STATUS_LOADING){
                    //TODO: Cancelar inicialización
                }

                var lastController = _data.mediaData.controllerName;
                _asignController.apply(this);
                if ((lastController != _data.mediaData.controllerName) ||
                    (_data.mediaData.controllerName == MediaModule.CONTROLLER_TYPE_HTML5NATIVE)){
                    _loaded = _LOAD_STATUS_NOT_LOADED;
                    _controller.kill();
                    playerContainer = document.getElementById(_data.mediaData.container);

                    if(playerContainer)
                    {
                        while(playerContainer.firstChild) {playerContainer.removeChild(playerContainer.firstChild);}
                    }else{
                        //TODO: Control de errores: No container
                    }
                }else{
                    _controller.reset();
                }
            }

            _status = "";
            _totalTime = 0;
        };
        /**
         *
         * @param prop Valor entre 0 y 1
         */
        this.seekByProp = function(prop){
            if (_controller){
                //TODO: Defensivo (no _totaltime?)
                _controller.seek(prop * _totalTime);
            }
        };

        /**
         *
         * @param secs Valor entre 0 y 1
         */
        this.seek = function(secs){
            if (_controller){
                _controller.seek(secs);
            }
        };


        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.setVolume = function(offset){
            if (_controller){
                _controller.setVolume(offset);
            }
        };
        /**
         *
         * @param flag Boolean
         */
        this.mute = function(flag){
            //TODO: La gestión de mute debería de ir aquí, y pasar a los controladores sólo un setVolume para generalizar su comportamiento
            if (_controller){
                _controller.mute(flag);
            }
        };
        /**
         * Return: true|false
         */
        this.isPlaying = function(){
            return (_status == MediaModule.STATUS_PLAY);
        };

        /**
         * Return: Tipo Estado definido en PlayerInterface
         */
        this.getDVRStatus = function(){
            if (_controller){
                return _controller.getDVRStatus();
            }
        };

        this.onPositionChange = function (position) {
            //TODO: Sacar position al _dataModel? o a un singleton GetPosition?
        };


        /////////////////////////////////////////////////////////
        //   INTERNAL
        /////////////////////////////////////////////////////////

        var _asignController = function(){

            var auxController, auxTec, i, j;


            /**
             * La prioridad por tecnología está por encima que la prioridad por controlador.
             * Buscará el primer controlador compatible con cada una de las tecnologías especificadas en la prioridad
             * En HTML5 no hya prioridad de tecnología, sólo se usa HTML5
             */
            if (getDevice().mobile){
                for (i = 0; i<_data.mediaData.controllerPriority.length; i++){
                    auxController = _data.mediaData.controllerPriority[i];
                    if (_isHTML5Compatible.apply(this, [auxController]))
                        break;
                    else
                        auxController = false;
                }
            }else{
                for (j = 0; j<_data.mediaData.tecPriorityPC.length; j++) {
                    if (!auxController) {
                        auxTec = _data.mediaData.tecPriorityPC[j];
                        for (i = 0; i < _data.mediaData.controllerPriority.length; i++) {
                            auxController = _data.mediaData.controllerPriority[i];
                            if (_isCompatible.apply(this, [auxController, auxTec])) {
                                break;
                            } else {
                                auxController = false;
                            }
                        }
                    }else{
                        break;
                    }
                }
            }

            _data.mediaData.controllerName = auxController;
        };

        var _onControllerEvent = function(e){
            switch (e.type){
                case emic.top.event.MediaEvent.ON_STATUS_CHANGE:
                    _status = e.data.status;
                break;
                case emic.top.event.MediaEvent.ON_READY:
                    _loaded = _LOAD_STATUS_LOADED;
                break;
                case emic.top.event.MediaEvent.ON_PROGRESS:
                    _totalTime = e.data.totalTime;
                break;
            }

            //TODO: Ver si esto funciona correctamente o hay que hacer otro tipo de redispatch
            //Redispatch de los eventos del controlador
            this.dispatchEvent(e);
        };

        var _isCompatible = function (controller, tec){
            var response = false;
            switch (tec){
                case MediaModule.TECHNOLOGY_FLASH:
                    response = _isFlashCompatible.apply(this,[controller]);
                break;
                case MediaModule.TECHNOLOGY_HTML5:
                    response = _isHTML5Compatible.apply(this,[controller]);
                break;
            }

            return response;
        };

        /**
         * Indica si un controlador es compatible con Flash
         * @param controller
         * @returns Boolean
         * @private
         */
        var _isFlashCompatible = function (controller){
            var response;
            switch (controller){
                case MediaModule.CONTROLLER_TYPE_TRITON:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                    response = false;
                break;
            }
            return response;
        };

        /**
         * Indica si un controlador es compatible con HTML5
         * @param controller
         * @returns Boolean
         * @private
         */
        var _isHTML5Compatible = function (controller){
            var response;
            switch (controller){
                case MediaModule.CONTROLLER_TYPE_TRITON:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                    response = false;
                break;
                case MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                    response = true;
                break;
            }
            return response;
        };
    }

    namespace.MediaModule = MediaModule;
})(emic.top);/**
 * Created by igomez on 03/07/2014.
 */
(function (namespace){

    UISkinBase.prototype = new psd.framework.EventDispatcher();

    function UISkinBase(){

        // Super
        psd.framework.EventDispatcher.call(this);

        this.notifyInitComplete = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_INIT_COMPLETE));
        };
        this.notifyOrderBegin = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
        };
        this.notifyOrderPlay = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PLAY));
        };
        this.notifyOrderPause = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PAUSE));
        };
        this.notifyOrderPlayPause = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE));
        };
        this.notifyOrderStop = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_STOP));
        };
        this.notifyOrderVolumeChange = function(offset){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE);
            e.data = offset;
            this.dispatchEvent(e);
        };
        this.notifyOrderMute = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_MUTE));
        };
        this.notifyOrderFullScreen = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN));
        };
        this.notifyOrderSeekByProp = function(prop){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP);
            e.data = prop;
            this.dispatchEvent(e);
        };
        this.notifyOrderSeekBySecs = function(secs){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS);
            e.data = secs;
            this.dispatchEvent(e);
        };
        this.notifyOrderNext = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_NEXT));
        };
        this.notifyOrderPrev = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PREV));
        };
        this.notifyOrderSwitchUp = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP));
        };
        this.notifyOrderSwitchDown = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN));
        };
        this.notifyOrderSwitchDirect = function(id){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT);
            e.data = id;
            this.dispatchEvent(e);
        };

        this.init = function(data) {};
        this.reset = function() {};
        this.resize = function(width, height){};
        this.onProgress = function(data){};
        this.onVolumeChange = function(prop){};
        //TODO: Ver si nos cargamos el onMute como llegada a favor de onVolume(0)
        this.onMute = function(flag){};
        this.onStatusChange = function(status){};
        this.onMetadata = function(metadata){};
        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){};
        this.onSeekComplete = function(offset){};
        this.onBufferEmpty = function(){};
        this.onBufferFull = function(){};


        /////////////////////////////////////////////////////////
        //  HELPERS
        /////////////////////////////////////////////////////////

        /**
         * Utilidad para convertir segundos en formato de tiempo
         * @param time Segundos que se quieren convertir
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.secondsAsTimeCode = function(time, format)
        {
            var hours = Math.floor(time/3600),
                minutes = Math.floor((time - (hours*3600))/60),
                seconds = Math.floor(time - (hours*3600) - (minutes*60)),
                timecode = "";

            if(hours<10) {hours = "0" + hours;}
            if(minutes<10) {minutes = "0" + minutes;}
            if(seconds<10) {seconds = "0" + seconds;}

            if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
            else
            {
                timecode = format.replace('hh', hours);
                timecode = timecode.replace('mm', minutes);
                timecode = timecode.replace('ss', seconds);
            }

            return timecode;
        };


    }

    namespace.UISkinBase = UISkinBase;

})(emic.top.ui);
/**
 * Created by igomez on 28/10/13.
 */

(function(namespace){

    //Static constants
    Buttons.SIZE_BIG = "sizeBig";
    Buttons.SIZE_MEDIUM = "sizeMedium";
    Buttons.SIZE_SMALL = "sizeSmall";
    Buttons.TYPE_PLAY = "typePlay";
    Buttons.TYPE_PAUSE = "typePause";
    Buttons.TYPE_RESET = "typeReset";
    Buttons.TYPE_NEXT = "typeNext";
    Buttons.TYPE_VOL_FULL = "typeVolFull";
    Buttons.TYPE_VOL_MEDIUM = "typeVolMed";
    Buttons.TYPE_VOL_MUTE = "typeVolMute";
    Buttons.TYPE_FULLSCREEN_ON = "typeFSOn";
    Buttons.TYPE_FULLSCREEN_OFF = "typeFSOff";


    function Buttons(atlas){

        //Private variables
        var _atlas = atlas;



        var _SIZE_BIG = 70;
        var _SIZE_MEDIUM = 42;
        var _SIZE_SMALL = 20;

        /////////////////////////////////////////////////////////
        //GETTERS
        /////////////////////////////////////////////////////////

        this.sizeBig = function () {return _SIZE_BIG};
        this.sizeMedium = function () {return _SIZE_MEDIUM};
        this.sizeSmall = function () {return _SIZE_SMALL};

        var _init = function(){

        };

        /////////////////////////////////////////////////////////
        // API
        /////////////////////////////////////////////////////////

        this.getButton = function(type, size, transp, color){

            var sizeValue, frames, texture, icon, but;

            switch (size){
                case Buttons.SIZE_BIG: sizeValue = _SIZE_BIG; break;
                case Buttons.SIZE_MEDIUM: sizeValue = _SIZE_MEDIUM; break;
                case Buttons.SIZE_SMALL: sizeValue = _SIZE_SMALL; break;
            }

            but = new psd.fenix.DisplayObjectContainer();

            //Creating the background
            //but.graphics().lineStyle(0);
            but.graphics().beginFill(color,transp);
            but.graphics().drawRoundRect(0,0,sizeValue,sizeValue,sizeValue *.1);
            but.graphics().endFill();

            //Generating the icon
            switch (type){
                case Buttons.TYPE_PLAY: frames = _atlas.getFrames("Button_play"); break;
                case Buttons.TYPE_PAUSE: frames = _atlas.getFrames("Button_pause"); break;
                case Buttons.TYPE_RESET: frames = _atlas.getFrames("Button_reset"); break;
                case Buttons.TYPE_NEXT: frames = _atlas.getFrames("Button_next"); break;
                case Buttons.TYPE_FULLSCREEN_ON: frames = _atlas.getFrames("Button_fson"); break;
                case Buttons.TYPE_FULLSCREEN_OFF: frames = _atlas.getFrames("Button_fsoff"); break;
                case Buttons.TYPE_VOL_FULL: frames = _atlas.getFrames("Button_vol100"); break;
                case Buttons.TYPE_VOL_MEDIUM: frames = _atlas.getFrames("Button_vol50"); break;
                case Buttons.TYPE_VOL_MUTE: frames = _atlas.getFrames("Button_vol0"); break;
            }

            texture = _atlas.texture();
            icon = new psd.fenix.Movieclip(texture,frames);
            icon.width(sizeValue);
            icon.height(sizeValue);

            but.addChild(icon);

            return but;
        };



        _init.apply(this);
    }

    namespace.Buttons = Buttons;

})(emic.top.ui.skins.fenix);(function(namespace) {
    
    // Inheritance class
    TopSkin_generic_f.prototype = new psd.fenix.DisplayObjectContainer();

    /**
     * @constructor
     */
    function TopSkin_generic_f(dataModel)
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
                
        /**
         * className psd.media.skins.TopSkin_generic_f
         */
        this.className = "psd.media.skins.TopSkin_generic_f";

        /**
         * STATIC CONSTANTS
         */

        TopSkin_generic_f.PROFILE_NORMAL = "normal";
        TopSkin_generic_f.PROFILE_MINI = "mini";
        TopSkin_generic_f.PROFILE_MOBILE = "mobile";

        TopSkin_generic_f.MODE_AUDIO_PROFILE = "audio";
        TopSkin_generic_f.MODE_VIDEO_PROFILE = "video";



        /**
         * CONSTANTS 
         */
        var _AUTO_HIDE_CONTROL_DELAY = 2000;
        var _MAX_BAR_WIDTH = 640;
        
		var pintarPorTamano = true;
		var restriccionesTamano = {	"normal":	{"minSizeTextVisible":300,"minSizeBarVisible":250},
									"mini":		{"minSizeTextVisible":200,"minSizeBarVisible":150}};
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


        var _data = dataModel;
        // 
        var _urlBase = _data.genericData.urlBase;

        var _settings = _data.uiData.skinData;

        //
        var _title = "";

        // 
        var _atlas = null;
        
        // 
        var _initialized = false;
        
        // 
        var _playPauseElement = null;
        
        var _profile = ((_settings.profile == TopSkin_generic_f.PROFILE_NORMAL) ||
                        (_settings.profile == TopSkin_generic_f.PROFILE_MINI) ||
                        (_settings.profile == TopSkin_generic_f.PROFILE_MOBILE))? _settings.profile:TopSkin_generic_f.PROFILE_NORMAL;

        var _modeProfile = ((_settings.mode == TopSkin_generic_f.MODE_AUDIO_PROFILE) ||
                            (_settings.mode == TopSkin_generic_f.MODE_VIDEO_PROFILE))? _settings.mode:TopSkin_generic_f.MODE_VIDEO_PROFILE;


        //
        var _fullscreenElement = null;
        


        //


        //
        var _timerAutoHide = null;
        
        //
        var _genericView = this;
        
        //
        var _isFullScreen = false;



        var _GAP_CONTROL_BAR = 10;
        var _COLOR_OFF_PROGRESS_BAR = "#333333";
        var _colorOnProgressVar = (_settings.color)? _settings.color:"#999999";

        var _offButtonTransparency = 0.85;
        var _onButtonTransparency = 1;        
        var _offButonColor = "#0";


        var Buttons = emic.top.ui.skins.fenix.Buttons;

        //
        var _buttonsGenerator = null;

        //
        var _buttons = {};
        _buttons.play = null;
        _buttons.pause = null;
        _buttons.clipBegin = null;
        _buttons.reset = null;
        _buttons.next = null;
        _buttons.fson = null;
        _buttons.fsoff = null;
        _buttons.vol0 = null;
        _buttons.vol50 = null;
        _buttons.vol100 = null;
        _buttons.fs = null;
        _buttons.vol = null;
        _buttons.playpause = null;

        //
        var _currentTimeElement = null;
        //
        var _totalTimeElement = null;
        //
        var _tittleElement = null;
        //
        var _progressBarElement = null;

        var _controlBar = null;
        var _infoBar = null;
        var _backProgressBar = null;
//        var _ticker = null;

        var _firstPlay = false;


        //FLAGS
        var _lastWidth = -1;
        var _lastHeight = -1;

        // 
        var _init = function()
        {
            //_atlas = new psd.fenix.textures.TextureAtlas(_urlBase+"/psdmedia/media/top/skins/fenix/generic_f/player.atlas.png", _urlBase+"/psdmedia/media/top/skins/fenix/generic_f/player.atlas.json", false);
            _atlas = new psd.fenix.textures.TextureAtlas(_urlBase+"../../src/modules/ui/skins/fenix/generic_f/assets/player.atlas.png", _urlBase+"../../src/modules/ui/skins/fenix/generic_f/assets/player.atlas.json", false);
            _atlas.addEventListener("texture_atlas_ready", _onTextureReady, this);
        };
        
        //
        var _onTextureReady = function()
        {

            var _timeFormat, barLeft, barRight, barCenter, barFill, zoneCenter, size1, size2, size0, heightPro, ellipsePro, heightTick, ellipseTick, controlsTexture, sliderFrames, widthTick, arrowSize, tmp, _textFormat;

            /////////////////////////////////////////////////////////
            //CONTROL BAR
            /////////////////////////////////////////////////////////


            if(_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
            {
                if ((_profile == TopSkin_generic_f.PROFILE_NORMAL) || (_profile == TopSkin_generic_f.PROFILE_MOBILE)){
                    size1 = Buttons.SIZE_BIG;
                    size2 = Buttons.SIZE_MEDIUM;
                    size0 = Buttons.SIZE_BIG;
                }else if (_profile == TopSkin_generic_f.PROFILE_MINI){
                    size1 = size2 = Buttons.SIZE_SMALL;
                    size0 = Buttons.SIZE_MEDIUM;
                }
            }
            else if (_modeProfile == TopSkin_generic_f.MODE_AUDIO_PROFILE)
            {
                if ((_profile == TopSkin_generic_f.PROFILE_NORMAL) || (_profile == TopSkin_generic_f.PROFILE_MOBILE)){
                    size0 = size1 = size2 = Buttons.SIZE_MEDIUM;
                }else if (_profile == TopSkin_generic_f.PROFILE_MINI){
                    size1 = size2 = Buttons.SIZE_SMALL;
                    size0 = Buttons.SIZE_MEDIUM;
                }
            }

            _buttonsGenerator = new Buttons(_atlas);
            _buttons.play = _buttonsGenerator.getButton(Buttons.TYPE_PLAY, size1, _offButtonTransparency, _offButonColor);
            _buttons.pause = _buttonsGenerator.getButton(Buttons.TYPE_PAUSE, size1, _onButtonTransparency, _colorOnProgressVar);
            _buttons.clipBegin = new psd.fenix.DisplayObjectContainer();
            tmp = _buttonsGenerator.getButton(Buttons.TYPE_PLAY, size0, _onButtonTransparency, _colorOnProgressVar);
            _buttons.clipBegin.addChild(tmp);
            
			_buttons.reset = new psd.fenix.DisplayObjectContainer();
            tmp = _buttonsGenerator.getButton(Buttons.TYPE_RESET, size2, _offButtonTransparency, _offButonColor);
            _buttons.reset.addChild(tmp);
			
			_buttons.next = new psd.fenix.DisplayObjectContainer();
            tmp = _buttonsGenerator.getButton(Buttons.TYPE_NEXT, size2, _offButtonTransparency, _offButonColor);
			_buttons.next.addChild(tmp);
			
			_buttons.fson = _buttonsGenerator.getButton(Buttons.TYPE_FULLSCREEN_ON, size2, _offButtonTransparency, _offButonColor);
            _buttons.fsoff = _buttonsGenerator.getButton(Buttons.TYPE_FULLSCREEN_OFF, size2, _onButtonTransparency, _colorOnProgressVar);

            _controlBar = new psd.fenix.DisplayObjectContainer();

            if (_settings.volume){
                _buttons.vol0 = _buttonsGenerator.getButton(Buttons.TYPE_VOL_MUTE, size2, _onButtonTransparency, _colorOnProgressVar);
                _buttons.vol0.name = "vol0";
                _buttons.vol50 = _buttonsGenerator.getButton(Buttons.TYPE_VOL_MEDIUM, size2, _offButtonTransparency, _offButonColor);
                _buttons.vol50.name = "vol50";
                _buttons.vol100 = _buttonsGenerator.getButton(Buttons.TYPE_VOL_FULL, size2, _offButtonTransparency, _offButonColor);
                _buttons.vol100.name = "vol100";
                _buttons.vol = new psd.fenix.DisplayObjectContainer();
                _buttons.vol.setProgress = function(vol){
                    if (vol == 0){
                        _buttons.vol0.visible = true;
                        _buttons.vol50.visible = false;
                        _buttons.vol100.visible = false;
                    }else if (vol <= 0.5){
                        _buttons.vol0.visible = false;
                        _buttons.vol50.visible = true;
                        _buttons.vol100.visible = false;
                    } else {
                        _buttons.vol0.visible = false;
                        _buttons.vol50.visible = false;
                        _buttons.vol100.visible = true;
                    }
                };

                _buttons.vol.addChild(_buttons.vol0);
                _buttons.vol.addChild(_buttons.vol50);
                _buttons.vol.addChild(_buttons.vol100);

                _buttons.vol0.addEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onVolumeChange);
                _buttons.vol50.addEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onVolumeChange);
                _buttons.vol100.addEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onVolumeChange);

                _buttons.vol0.visible = false;
                _buttons.vol100.visible = false;
                _controlBar.addChild(_buttons.vol);
            }

            if (_settings.fullscreen){
                _buttons.fs = new psd.fenix.DisplayObjectContainer();
                _buttons.fs.addChild(_buttons.fson);
                _buttons.fs.addChild(_buttons.fsoff);
                _buttons.fsoff.visible = false;
                if (_modeProfile == TopSkin_generic_f.MODE_AUDIO_PROFILE){_buttons.fson.visible = false};
                _controlBar.addChild(_buttons.fs);
            }
            _buttons.playpause = new psd.fenix.DisplayObjectContainer();
            _buttons.playpause.addChild(_buttons.play);
            _buttons.playpause.addChild(_buttons.pause);
            _buttons.pause.visible = false;

            _backProgressBar = new psd.fenix.DisplayObjectContainer();
            _backProgressBar.visible = !(_profile == TopSkin_generic_f.PROFILE_MINI);
			
            _controlBar.addChild(_backProgressBar);
            _controlBar.addChild(_buttons.playpause);
            _controlBar.addChild(_buttons.reset);
            if (_settings.navigator) {_controlBar.addChild(_buttons.next);}

            controlsTexture = _atlas.texture();
            //sliderFrames = _atlas.getFrames("seek_btn");

            heightPro = _buttonsGenerator.sizeSmall();
            ellipsePro = _buttonsGenerator.sizeSmall() * .1;

            barLeft = new psd.fenix.DisplayObjectContainer();
            barLeft._render = function(ctx){
                ctx.closePath();
                ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_colorOnProgressVar, 1);
                ctx.beginPath();
                ctx.moveTo(ellipsePro, 0);
                ctx.lineTo(ellipsePro, heightPro);
                ctx.quadraticCurveTo(0, heightPro, 0, heightPro - ellipsePro);
                ctx.lineTo(0, ellipsePro);
                ctx.quadraticCurveTo(0, 0, ellipsePro, 0);
                ctx.closePath();
                ctx.fill();
            };
            barLeft.invalidateSize(ellipsePro,heightPro);

            barRight = new psd.fenix.DisplayObjectContainer();
            barRight._render = function(ctx){
                ctx.closePath();
                ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_COLOR_OFF_PROGRESS_BAR, 1);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(ellipsePro, 0, ellipsePro, ellipsePro);
                ctx.lineTo(ellipsePro, heightPro - ellipsePro);
                ctx.quadraticCurveTo(ellipsePro, heightPro, 0, heightPro);
                ctx.lineTo(0, heightPro);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.fill();
            };
            barRight.invalidateSize(ellipsePro,heightPro);

            barCenter = new psd.fenix.DisplayObjectContainer();
            barCenter.graphics().beginFill(_COLOR_OFF_PROGRESS_BAR,1);
            barCenter.graphics().drawRect(0,0,1,heightPro);
            barCenter.graphics().endFill();
            //barCenter.invalidateSize(1,heightPro);

            barFill = new psd.fenix.DisplayObjectContainer();
            barFill.graphics().beginFill(_colorOnProgressVar, 1);
            barFill.graphics().drawRect(0,0,1,heightPro);
            barFill.graphics().endFill();
            //barFill.invalidateSize(1,heightPro);

            zoneCenter = new psd.fenix.DisplayObjectContainer();
            zoneCenter.graphics().beginFill(_COLOR_OFF_PROGRESS_BAR,1);
            zoneCenter.graphics().drawRect(0,0,1,heightPro);
            zoneCenter.graphics().endFill();
            //zoneCenter.invalidateSize(1,heightPro);

            _progressBarElement = new psd.fenix.controls.ProgressBarInterface(barLeft,barRight,barCenter,barFill, zoneCenter);
            _progressBarElement.zoneHeight(heightPro);
            //_progressBarElement.addEventListener(psd.fenix.MouseEvent.MOUSE_OVER, onProgressMouse)
            //_progressBarElement.addEventListener(psd.fenix.MouseEvent.MOUSE_OUT, onProgressMouse)
            //_progressBarElement.addEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, onProgressMouse)
		
			_controlBar.addChild(_progressBarElement);
				
            //TICKER - Por el momento no es necesario activarlo, dejamos comentado el pintado de la gráfica

            /*heightTick = _buttonsGenerator.sizeSmall();
            ellipseTick = _buttonsGenerator.sizeSmall() * .1;
            arrowSize = 10;
            widthTick = 80;

            _ticker = new psd.fenix.DisplayObjectContainer();
            _ticker._render = function(ctx){
                ctx.closePath();
                ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB("#ffffff", 1);
                ctx.beginPath();
                ctx.moveTo(ellipseTick, 0);
                ctx.lineTo(widthTick - ellipseTick, 0);
                ctx.quadraticCurveTo(widthTick, 0, widthTick, ellipseTick);
                ctx.lineTo(widthTick, heightTick - ellipseTick);
                ctx.quadraticCurveTo(widthTick, heightTick, widthTick - ellipseTick, heightTick);
                ctx.lineTo(widthTick *.5 + arrowSize *.5, heightTick);
                ctx.lineTo(widthTick *.5, heightTick + arrowSize);
                ctx.lineTo(widthTick *.5 - arrowSize *.5, heightTick);
                ctx.lineTo(ellipseTick, heightTick);
                ctx.quadraticCurveTo(0, heightTick, 0, heightTick - ellipseTick);
                ctx.lineTo(0, ellipseTick);
                ctx.quadraticCurveTo(0, 0, ellipseTick, 0);
                ctx.closePath();
                ctx.fill();
            };
            _ticker.invalidateSize(ellipsePro,heightPro);

            _controlBar.addChild(_ticker);
*/
            /////////////////////////////////////////////////////////
            //INFO BAR
            /////////////////////////////////////////////////////////

            _infoBar = new psd.fenix.DisplayObjectContainer();
            _infoBar.visible = !(_profile == TopSkin_generic_f.PROFILE_MINI);

            _timeFormat = new psd.fenix.text.TextFormat();
            _timeFormat.color = 0xffffff;
            _timeFormat.size = 14;
            _timeFormat.bold = true;
            _timeFormat.font = "Helvetica";

            _textFormat = new psd.fenix.text.TextFormat();
            _textFormat.color = 0xffffff;
            _textFormat.size = 12;
            _textFormat.bold = true;
            _textFormat.font = "Helvetica";

            _currentTimeElement = new psd.fenix.text.TextField();
            _currentTimeElement.setTextFormat(_timeFormat);
            _currentTimeElement.text("00:00");

            _totalTimeElement = new psd.fenix.text.TextField();
            _totalTimeElement.setTextFormat(_timeFormat);
            _totalTimeElement.text("00:00");

            _tittleElement = new psd.fenix.text.TextField();
            _tittleElement.setTextFormat(_timeFormat);
            if (_settings.title){
                _title = _settings.title;
            }

            if (_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
            {
                _infoBar.addChild(_currentTimeElement);
                _infoBar.addChild(_totalTimeElement);
                _infoBar.addChild(_tittleElement);

                this.addChild(_buttons.clipBegin);
                _controlBar.alpha = 0;
                _infoBar.alpha = 0;
            }
            else
            {
                this.showProgressBar();
                _infoBar.alpha = 0;

                _currentTimeElement.visible = false;
                _totalTimeElement.visible = false;
                _controlBar.addChild(_currentTimeElement);
                _controlBar.addChild(_totalTimeElement);

            }

            /////////////////////////////////////////////////////////
            //TIMER
            /////////////////////////////////////////////////////////

            if (_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
            {
                _timerAutoHide = new psd.framework.utils.Timer(_AUTO_HIDE_CONTROL_DELAY, 1);
                _timerAutoHide.addEventListener(psd.framework.events.TimerEvent.TIMER_COMPLETE, autoHideControls, this);
                _timerAutoHide.start();
            }

            _initialized = true;

            // Provisional hasta que estén implementados los métodos keyEvent de Fénix
//            window.onkeydown = onKeyEnterDown;

            //
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_SKIN_READY));
        };


        var autoHideControls = function(e)
        {
            if (_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
            {
                _timerAutoHide.stop();

                TweenLite.to(_controlBar, 0.75, {
                    alpha:0,
                    ease:Power4.easeOut,
                    onCompleteParams: [_controlBar],
                    onComplete:
                        function finishTransition(target){
                            target.visible = false;
                        }
                });

                TweenLite.to(_infoBar, 0.75, {
                    alpha:0,
                    ease:Power4.easeOut,
                    onCompleteParams: [_infoBar],
                    onComplete:
                        function finishTransition(target){
                            target.visible = false;
                        }
                });
            }
        }

        /*var onProgressMouse = function(e) {
            switch (e.type){

                case psd.fenix.MouseEvent.MOUSE_MOVE:
                    TweenLite.to(_ticker, 0.3, {
                        x: e.localX,
                        ease:Power1.easeOut
                    });
                break;
                case psd.fenix.MouseEvent.MOUSE_OVER:
                    TweenLite.to(_ticker, 0.3, {
                        alpha: 1,
                        ease:Power1.easeOut
                    });
                break;
                case psd.fenix.MouseEvent.MOUSE_OUT:
                    TweenLite.to(_ticker, 0.3, {
                        alpha: 0,
                        ease:Power1.easeOut
                    });
                break;
            }
        }*/

        var onMouseMove = function(e) {
            if (_controlBar.visible == false) {
                _controlBar.visible = true;
                _infoBar.visible = true;
            }

            TweenLite.to(_controlBar,.5, {alpha:1, ease:Power4.easeOut });
            TweenLite.to(_infoBar,.5, { alpha: 1, ease:Power4.easeOut });

            if (_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
            {
                _timerAutoHide.reset();
                _timerAutoHide.start();
            }

            /*TweenLite.to(_ticker, 0.3, {
                x: e.stageX,
                ease:Power1.easeOut
            });*/

        };

        var onKeyEnterDown = function(e) {
            /*if (e.keyCode == "13") {
                if(_genericView.stage().displayState() == psd.fenix.stage.StageDisplayState.NORMAL) {_genericView.stage().displayState(psd.fenix.stage.StageDisplayState.FULL_SCREEN);}
                else {_genericView.stage().displayState(psd.fenix.stage.StageDisplayState.NORMAL);}
            }*/
        };

        var _onVolumeChange = function(e){
            switch (e.target.name){
                case "vol0": _buttons.vol.setProgress(1); _notifyVolumeChange(1); break;
                case "vol50": _buttons.vol.setProgress(0); _notifyVolumeChange(0); break;
                case "vol100": _buttons.vol.setProgress(0.5); _notifyVolumeChange(0.5); break;
            }
        };

        var _notifyVolumeChange = function(vol){
            var ev = new psd.fenix.event.ProgressEvent();
            ev.type = psd.fenix.event.ProgressEvent.CHANGE;
            ev.data = vol;
            _buttons.vol.dispatchEvent(ev);
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
		
        //
        this.resizeSkin = function(width, height)
        {
			if(	(_buttons.vol!=undefined)&&
				(width<_buttons.vol.width()*4)){
				return new psd.fenix.Rectangle(0, 0, width, height);
			}
		
            var gap, barH, barW, barX, barY, innerWidth, lastx;

            if(_initialized)
            {
                //We only repaint the content if size has changed
                if ((width != _lastWidth) || (height != _lastHeight)){

                    innerWidth = (_isFullScreen)? Math.min(width, _MAX_BAR_WIDTH):width;

                    gap = (_profile == TopSkin_generic_f.PROFILE_MINI)? _GAP_CONTROL_BAR*.5:_GAP_CONTROL_BAR;

                    //CONTROLS
                    _buttons.playpause.x = 0;
                    _buttons.reset.x = _buttons.playpause.x + _buttons.play.width() + gap;
                    _buttons.reset.y = Math.ceil(_buttons.playpause.height() - _buttons.reset.height()) + .5;
                    lastx = innerWidth - gap;

                    if ((_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE) && (_settings.fullscreen)){
                        _buttons.fs.x = lastx - gap - _buttons.fs.width();
                        _buttons.fs.y = _buttons.reset.y;
                        lastx = _buttons.fs.x
                    }
                    if (_settings.volume){
                        _buttons.vol.x = lastx - gap - _buttons.vol.width();
                        _buttons.vol.y = _buttons.reset.y;
                        lastx = _buttons.vol.x;
                    }

					if (_settings.navigator)
					{
						_buttons.next.x = lastx - gap - _buttons.next.width();
						_buttons.next.y = _buttons.reset.y;
						lastx = _buttons.next.x;
					}
					
                    _controlBar.x = (width - innerWidth) * 0.5 + gap;
                    _controlBar.y = height - _buttons.playpause.height() - gap;

                    _buttons.clipBegin.x = (width - _buttons.clipBegin.width()) * .5;
                    _buttons.clipBegin.y= (height - _buttons.clipBegin.height()) * .5;

                    //back progress bar

                    barX = _buttons.reset.x + _buttons.reset.width() + gap;
                    barY = _buttons.reset.y;
                    barW = lastx - _buttons.reset.x - _buttons.reset.width() -gap * 2;
                    barH = _buttonsGenerator.sizeMedium();

                    _backProgressBar.graphics().clear();
                    _backProgressBar.graphics().beginFill(_offButonColor,_offButtonTransparency);
                    _backProgressBar.graphics().drawRoundRect(0,0,barW,barH,barH *.1);
                    _backProgressBar.graphics().endFill();
                    _backProgressBar.x = barX;
                    _backProgressBar.y = barY;
                    //_backProgressBar.invalidateSize(barW,barH);

                    //progress bar
                    if (_profile == TopSkin_generic_f.PROFILE_MINI){
                        _progressBarElement.x = barX;
                        _progressBarElement.y =  barY;
                        _progressBarElement.resize(barW);
                    }else{
                        _progressBarElement.x = barX + gap;
                        _progressBarElement.y =  barY + barH * .25;
                        _progressBarElement.resize(barW -gap * 2);
                    }
					
					if(innerWidth<=restriccionesTamano[_profile].minSizeBarVisible){
						_progressBarElement.visible = false;
					}else{
						_progressBarElement.visible = true;	
					}
					
					if(innerWidth<restriccionesTamano[_profile].minSizeTextVisible){
						pintarPorTamano = false;
					}
					else{
						pintarPorTamano = true;
					}
					
					//dmena
					if(!pintarPorTamano){
						_currentTimeElement.visible = false;
						_totalTimeElement.visible = false;
					}else{
						_currentTimeElement.visible = true;
						_totalTimeElement.visible = true;
					}

                    if (_buttons.vol)
                        if(_buttons.vol.x<=180){
                            _backProgressBar.visible = false;
                        }else{
                            if(_profile==TopSkin_generic_f.PROFILE_NORMAL)
                                _backProgressBar.visible = true;
                        }
										
//                    _ticker.y = _progressBarElement.y - _ticker.height();

                    //INFO BAR
                    if (_modeProfile == TopSkin_generic_f.MODE_VIDEO_PROFILE)
                    {
                        _infoBar.graphics().clear();
                        _infoBar.graphics().beginFill(_offButonColor,_offButtonTransparency);
                        _infoBar.graphics().beginFill(_offButonColor,_offButtonTransparency);
                        _infoBar.graphics().drawRoundRect(0,0,innerWidth - gap * 2,barH,barH *.1);
                        _infoBar.graphics().endFill();

                        _infoBar.x = _controlBar.x;
                        _infoBar.y = gap;
                        _currentTimeElement.x = innerWidth - gap - 75;
                        _currentTimeElement.y = 0;
                        _totalTimeElement.x = _currentTimeElement.x;
                        _totalTimeElement.y = 20;
                        _tittleElement.y = 10;
                        _tittleElement.x = gap;
                        if (_title){
                            //Hasta que implementemos textWidth en FENIX hacemos un cálculo a ojo de su longitud
                            var numChars = (innerWidth - gap * 2 - 75) / 12;
                            _tittleElement.text(new String(_title).slice(0,numChars));
                        }
                    }
                    else if (_modeProfile == TopSkin_generic_f.MODE_AUDIO_PROFILE)
                    {
                        _currentTimeElement.y = _totalTimeElement.y = _progressBarElement.y + (gap * 0.5);
						//_currentTimeElement.y = _totalTimeElement.y = _progressBarElement.y + _progressBarElement.height()/2 - _currentTimeElement.height()/2 + gap/5;
                        _currentTimeElement.x = _progressBarElement.x + _GAP_CONTROL_BAR;


                        if (_buttons.vol)
                            _totalTimeElement.x = _buttons.vol.x - 40 - gap*2;
                        else
                            _totalTimeElement.x = _progressBarElement.x + _progressBarElement.width() - _totalTimeElement.width() - _GAP_CONTROL_BAR;
                    }
												
                    _lastHeight = height;
                    _lastWidth = width;
                }
            }

            return new psd.fenix.Rectangle(0, 0, width, height);
        };

        /**
         *
         * @param status
         */
        this.updateOnStatusChange = function(status)
        {
            if(status=="play") {
                _buttons.play.visible = false;
                _buttons.pause.visible = true;
            }else if (status=="pause"){
                _buttons.play.visible = true;
                _buttons.pause.visible = false;
            }
        };

        this.updateOnContentRefresh = function()
        {
            if ((!_firstPlay) && (_modeProfile == TopSkin_generic_f.MODE_AUDIO_PROFILE))
            {
                _firstPlay = true;
                _totalTimeElement.x = _progressBarElement.x + _progressBarElement.width() - _totalTimeElement.width() - _GAP_CONTROL_BAR;
                //_currentTimeElement.visible = true;
                //_totalTimeElement.visible = true;
            }
        };


        this.showProgressBar = function(){
            this.addChild(_controlBar);
            this.removeChild(_buttons.clipBegin);
            this.addChild(_infoBar);
            this.stage().addEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, onMouseMove, this);
        };

        /**
         *
         */
        this.updateOnDisplayStateChange = function(displayState)
        {
            if (displayState == psd.fenix.stage.StageDisplayState.NORMAL) {
                _isFullScreen = false;
                _buttons.fsoff.visible = false;
                _buttons.fson.visible = true;
                onMouseMove();
            }
            else {
                _isFullScreen = true;
                _buttons.fsoff.visible = true;
                _buttons.fson.visible = false;
            }
        };

        /**
         *
         */
        this.playPauseElement = function() {return _buttons.playpause;};

        /**
         *
         */
        if (_settings.fullscreen)
        {
            this.fullscreenElement = function() {return _buttons.fs;}
        }

        /**
         *
         */
        this.currentTimeElement = function() {return _currentTimeElement;};

        /**
         *
         */
        this.totalTimeElement = function() {return _totalTimeElement;};

        /**
         *
         */
        this.progressBarElement = function() {return _progressBarElement;};

        /**
         *
         */
        this.reiniElement = function() {return _buttons.reset;};

        /**
         *
         */
        this.nextElement = function() {return _buttons.next;};

        /**
         *
         * @returns {null|*|_buttons.reset}
         */
        this.playBeginElement = function() {return _buttons.clipBegin;}

        /**
         *
         * @param title
         */
        this.setTitle = function(title) {
            if (_settings.title == undefined || _settings.title == "" || _settings.title == null){
                _title = title;
            }
        };


		if (_settings.volume){this.volumeElement = function() {return _buttons.vol;}}

        // Inicializamos el skin
        _init.apply(this);
    }

    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.TopSkin_generic_f = TopSkin_generic_f;

}(emic.top.ui.skins.fenix));(function(namespace) {
    
    // Inheritance class
    SkinFenix.prototype = new emic.top.ui.UISkinBase;

    /**
     * @constructor
     */
    function SkinFenix()
    {
        // Super
        emic.top.ui.UISkinBase.call(this);

        /**
         * className psd.media.SkinFenix
         */
        this.className = "emic.top.ui.SkinFenix";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var _data;
        var _isPlaying = false;
        var _status;
        var _currentTime = 0;
        var _totalTime = 0;

        var _doc = new psd.fenix.DisplayObjectContainer();



        // Instancia del stage de fenix
        var _stage = null;
        
        // Elemento psd.fenix.media.MediaElement con la información del contenido multimedia
        var _mediaElement = null;

        // Instancia del skin que carga el player
        var _view = null;
        
        // Indica si el skin ha completado su inicializacion
        var _skinReady = false;
        
        // Elemento de play/pause
        var _playPauseElement = null;
        
        // Elemento Play Begin
        var _playBeginElement = null
        
        // Barra de progreso de la reproducción
        var _progressBarElement = null;
        
        // Elemento de fullscreen
        var _fullscreenElement = null;
        
        // Elemento de tiempo actual de reproducción
        var _currentTimeElement = null;
        
        // Elemento de tiempo total del contenido
        var _totalTimeElement = null;
        
        // Elemento de volumen del contenido
        var _volumeElement = null;
		
        // Elemento de mute del contenido
        var _muteElement = null;

        // Elemento que reinicia la reproducción (seek a 0)
        var _reiniElement = null;

        // Elemento que pasa al siguiente streaming de video/audio de la playlist
        var _nextElement = null


        // Último volumen conocido previo a mute
        var _lastVolume = 0.8;
        var _actualVol = 0.8;

        var _percentil25Tracked = false;
        var _percentil50Tracked = false;
        var _percentil75Tracked = false;        
        
        var _activeProgressEvent = false;

        /**
         * CONSTANTS
         */
        var _SEGUNDOS_RESET = 5;
        
        // Inicializa la instancia de fenix 
        var _init = function()
        {
            var playerAutoSize = (_data.genericData.width&&_data.genericData.height)?false:true;
            
            _stage = new psd.fenix.Stage(_data.uiData.skinContainer,{autosize:playerAutoSize, width:_data.genericData.width, height:_data.genericData.height});
            _stage.addEventListener(psd.fenix.StageEvent.INIT, _initApp, this);
            _stage.addEventListener(psd.fenix.StageEvent.INIT_ERROR, _initErrorApp, this);
            _stage.addEventListener(psd.fenix.StageEvent.DISPLAY_STATE_CHANGE, _onStageDisplayStateChange, this);
            _stage.addEventListener(psd.fenix.StageEvent.RESIZE, _onStageResize, this);
            _stage.init();
        };
        
        // Detecta un error en la inicialización de fenix
        var _initErrorApp = function() {Log.log("INIT ERROR");};

        // Inicializa el player
        var _initApp = function() 
        {
            var _skinClass = _getSkinClass("emic.top.ui.skins.fenix.TopSkin_" + _data.uiData.skin),
                urlBase = typeof(_data.genericData.urlBase)!="undefined"?_data.genericData.urlBase:"";

            _view = new _skinClass(_data);
            if (typeof(_view.mediaType)!= "undefined"){
                _view.mediaType(_data.mediaData.mimetype);
            }
            if (typeof(_view.isLive)!= "undefined"){
                _view.isLive(_data.mediaData.isLive);
            }

            _view.addEventListener(emic.top.event.UIEvent.ON_SKIN_READY, _onSkinReady, this);

            // Incluimos la vista dentro del player
            _doc.addChild(_view);

            if (typeof(_view.setTitle)!= "undefined"){
                _view.setTitle(_data.mediaData.title);
            }
            
            // Incluimos el player en el stage
            _stage.addChild(_doc);
        };
        
        
        // Obtiene el constructor de un skin a partir de su nombre completo
        var _getSkinClass = function(className)
        {
            var namespaces = className.split("."),
                numNamespaces = namespaces.length, i,
                skinClass = (window || this);
                
            for(i=0;i<numNamespaces;i++) {skinClass = skinClass[namespaces[i]];}
                
            return skinClass;
        };        
        
        // Inicializa los componentes del skin una vez se ha detectado que se ha inicializado
        var _onSkinReady = function()
        {
            if(typeof(_view.playPauseElement)!="undefined")
            {
                _playPauseElement = _view.playPauseElement();
                _playPauseElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onPlayPauseDown, this);
            }
            
            if(typeof(_view.playBeginElement)!= "undefined")
            {
                _playBeginElement = _view.playBeginElement();
                if (_playBeginElement != null){
                    _playBeginElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onPlayBeginDown, this);
                }
            }
            
            if(typeof(_view.fullscreenElement)!="undefined")
            {   
                _fullscreenElement = _view.fullscreenElement();
                
                if (_fullscreenElement != null){
                    _fullscreenElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onFullscreenDown, this);
                }
            }
            
            if(typeof(_view.currentTimeElement)!="undefined")
            {                        
                _currentTimeElement = _view.currentTimeElement();
            }
            
            if(typeof(_view.totalTimeElement)!="undefined")
            {            
                _totalTimeElement = _view.totalTimeElement();
            }
            
            if(typeof(_view.progressBarElement)!="undefined")
            {                        
                _progressBarElement = _view.progressBarElement();
                _progressBarElement.addEventListener(psd.fenix.event.ProgressEvent.CHANGE, _onProgressBarChange, this);
            }
            
            if(typeof(_view.volumeElement)!="undefined")
            {				
                _volumeElement = _view.volumeElement();
                _volumeElement.setProgress(1);
                _volumeElement.addEventListener(psd.fenix.event.ProgressEvent.CHANGE, _onVolumeBarChange, this);
            }
			
			if(typeof(_view.muteElement)!="undefined")
            {
			
                _muteElement = _view.muteElement();	
                _muteElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onMuteDown, this);
				
            }
            if(typeof(_view.singleMuteElement)!="undefined")
            {	
                _singleMuteElement = _view.singleMuteElement();	
                _singleMuteElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onSingleMuteDown, this);		
            }

            if(typeof(_view.reiniElement)!="undefined")
            {	
                _reiniElement = _view.reiniElement();
                _reiniElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onReini, this);		
            }

            if (typeof(_view.nextElement) != "undefined")
            {
                _nextElement = _view.nextElement();
                _nextElement.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onNext, this)
            }
            if(_isPlaying) { _view.updateOnStatusChange("play"); }
            
            _view.resizeSkin(_stage.stageWidth(), _stage.stageHeight());
            _skinReady = true;
        };
        
        // Detecta el evento de click sobre el elemento de play/pause
        var _onPlayPauseDown = function(evt)
        {
            if(_status == emic.top.MediaModule.STATUS_PAUSE) {this.notifyOrderPlay();}
            else {this.notifyOrderPause();}
        };
        
        var _onPlayBeginDown = function(evt)
        {
            _playBeginElement.visible = false;
            _view.showProgressBar();
            //TODO: Ver si no es mejor llamar a notifyOrderPlay() y dejar el clipBegin sólo para la interacción con el logo
            this.notifyOrderBegin();
        };
        
        // Detecta el evento de click sobre el elemento de fullscreen
        var _onFullscreenDown = function()
        {
            if(_stage.displayState() == psd.fenix.stage.StageDisplayState.NORMAL) {_stage.displayState(psd.fenix.stage.StageDisplayState.FULL_SCREEN);}
            else {_stage.displayState(psd.fenix.stage.StageDisplayState.NORMAL);}
        };
        
        // Detecta el evento de change sobre la barra de progreso        
        var _onProgressBarChange = function(evt) {_onSeek(evt.data)};
        var _onSeek = function(pos){
            //TODO: Ver si el pos llega en porcentaje o en prop
            this.notifyOrderSeekBySecs(pos);
        };
            
        // Detecta el evento de reinicio     
        var _onReini = function(evt)
        {
            //Lanzamos evento e previous
            if (_currentTime <= _SEGUNDOS_RESET) {
                this.notifyOrderPrev();
            }

            this.notifyOrderSeekBySecs(0);
        };

        var _onNext = function(evt)
        {
            //Lanzamos evnto de next
            this.notifyOrderNext();
        };

        // Detecta el evento de change sobre la barra de volumen        
        var _onVolumeBarChange = function(evt) {
             _onSetVolumeBarChange.apply(this, [evt.data]);

        };
        
        var _onSetVolumeBarChange = function (position){
            
            this.notifyOrderVolumeChange(position);

             _lastVolume = position;
             
             // Si existen los botones de mute
             if (_view)
             {
                if (_view.muteElement!=undefined) {
                   if (position==0) {
                       _view.updateOnMuteChange("muted");
                   } else {
                       _view.updateOnMuteChange("active");
                   }
                }
             }
        };
        
        // Gestiona click en botón mute de interfaz
        var _onMuteDown = function(evt) {
            _onSetMute();
        };
        
        var _onSetMute = function(){
            
            if (_actualVol<=0) {
            
                    _actualVol = _lastVolume<=0? .8 : _lastVolume;

                    if(_view) {_view.volumeElement().setProgress(_actualVol)};
                    if(_view) {_view.updateOnMuteChange("active");};

            } else {

                    _lastVolume = _actualVol;

                    if(_view) {_view.volumeElement().setProgress(0)};
                    if(_view) {_view.updateOnMuteChange("muted");};

                    _actualVol=0;

            }					

            //TODO: Mirar si esta gestión se ha de hacer en el controlador, o en otro sitio, y llamar a notifyMute
            this.notifyOrderVolumeChange(_actualVol);
        };

	    var _onSingleMuteDown = function(evt) {
            //TODO: Mirar si esta gestión se ha de hacer en el controlador, o en otro sitio, y llamar a notifyMute
                if(_lastVolume<=0){
                   _lastVolume=.8;
                   _view.updateOnMuteChange("active");
               }else{
                   _lastVolume=0;
                    _view.updateOnMuteChange("muted");
               }

                this.notifyOrderVolumeChange(_lastVolume);
        };

        // Detecta los cambios de tamaño en el stage para redimensionar el skin de manera adecuada
        var _onStageResize = function()
        {
            //TODO: Revisar si funciona bien el resize
            var mediaBounds = new psd.fenix.Rectangle(0,0,_stage.stageWidth(), _stage.stageHeight());
            
            if(_view) {mediaBounds = _view.resizeSkin(_stage.stageWidth(), _stage.stageHeight());}

            //TODO: Mirar si tenemos que lanzar un evento ON_RESIZE para que lo interprete el elemento Media
            //_mediaElement.resize(mediaBounds.x,mediaBounds.y,mediaBounds.width,mediaBounds.height);
        };
        
        // Detecta cambios en el displayState del stage para notificar al skin
        var _onStageDisplayStateChange = function()
        {
           if(_view) {_view.updateOnDisplayStateChange(_stage.displayState());}
        };




        /////////////////////////////////////////////////////////
        //  API UISkinBase
        /////////////////////////////////////////////////////////

        this.init = function(data) {
            _data = data;
            _init.apply(this);
        };
        this.reset = function () {
            //TODO: Implementar reset para limpiar el estado anterior, etc
        };
        this.resize = function(width, height){};
        this.onProgress = function(data){

            _totalTime = data.totalTime;
            _currentTime = data.currentTime;

            var timeFormat = _totalTime>3600?"hh:mm:ss":"mm:ss"

            if(_currentTimeElement) {_currentTimeElement.text(this.secondsAsTimeCode(_currentTime, timeFormat));}

            if(_totalTimeElement) {
                if (_data.mediaData.isLive!=undefined && _data.mediaData.isLive==true) { _totalTimeElement.text("Live"); }
                else  {_totalTimeElement.text(this.secondsAsTimeCode(_totalTime, timeFormat));}
            }

            if(_progressBarElement) {_progressBarElement.setProgress(_currentTime/_totalTime);}

            //TODO: Hacer el dispatch de los percentiles y demás en el MediaModule (importante!) (ojito, cuidado con tener flags para no repetir eventos)

            //Evento progress
            // TODO: Tratar esa propiedad y el lanzamiento de eventos desde el MediaModule
            // Luego eliminar esta línea de abajo
            //if (_data.mediaData.activeProgressEvent == true){this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_PROGRESS, {duration: duration, time:currentTime}));}

            //Refresco de la vista
            if(typeof(_view.updateOnContentRefresh)!="undefined"){_view.updateOnContentRefresh();}



        };
        this.onVolumeChange = function (offset) {

            //TODO: Mirar esto bien, posible buble infinito entre media y ui cuando llega una notificacion desde fuera de cambio de volumen
            /**_onSetVolumeBarChange.apply(this, [value]);
            if(_view) {_view.volumeElement().setProgress(value)};
             */
        };

        this.onMute = function(flag) {
            _onSetMute();
        };
        this.onStatusChange = function(status){
            _status = status;
            switch (status){
                case emic.top.MediaModule.STATUS_PLAY:
                    _isPlaying = true;
                    if(_view) { _view.updateOnStatusChange("play"); }
                break;
                case emic.top.MediaModule.STATUS_PAUSE:
                    _isPlaying = false;
                    if(_view) { _view.updateOnStatusChange("pause"); }
                break;
                case emic.top.MediaModule.STATUS_STOP:
                    _isPlaying = false;
                    if(_view) { _view.updateOnStatusChange("pause"); }
                    if(_progressBarElement) { _progressBarElement.setProgress(0.01); }
                break;
            }
        };
        this.onMetadata = function(metadata){
            //TODO: En estos momentos no está hecho el seteo de esa propiedad en ningún controller media
            _totalTime = metadata.totalTime;
        };
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        /**
         * Intenta entrar en modo fullscreen
         */
        this.requestFullScreen = function() {_stage.displayState(psd.fenix.stage.StageDisplayState.FULL_SCREEN);};

        /**
         * Intenta salir de modo fullscreen
         */
        this.cancelFullScreen = function() {_stage.displayState(psd.fenix.stage.StageDisplayState.NORMAL);};

    }
    
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.SkinFenix = SkinFenix;

}(emic.top.ui));/**
 * Created by igomez on 24/07/2014.
 */
(function (namespace){

    TopSkin_test.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_test(){

        //super
        emic.top.ui.UISkinBase.call(this);

        var _current,
            _total,
            _bytesLoaded,
            _bytesTotal,
            _volume,
            _seek,
            _seekProp;

        var _createButton = function(name, type){
            var buttonnode= document.createElement('input');
            buttonnode.setAttribute('type',type);
            buttonnode.setAttribute('name',name);
            buttonnode.setAttribute('value',name);
            if (type == "text") buttonnode.style.width = "50px";
            document.getElementById(_data.uiData.skinContainer).appendChild(buttonnode);
            return buttonnode;
        };

        var _createDiv = function(name){
            var element = document.createElement('div');
            element.id = name;
            document.getElementById(_data.uiData.skinContainer).appendChild(element);
            return element;
        };

        this.init = function(data) {

            var element;

            _data = data;

            _current = _createDiv.apply(this,["current"]);
            _total = _createDiv.apply(this,["total"]);
            _bytesLoaded = _createDiv.apply(this,["bytesLoaded"]);
            _bytesTotal = _createDiv.apply(this,["buyesTotal"]);
            _volume = _createButton.apply(this,[_data.mediaData.startVolume, "text"]);
            _createButton.apply(this,["Volume", "button"]).onclick = (function(that, volume){return function(){that.notifyOrderVolumeChange(volume.value);}})(this, _volume);
            _seek = _createButton.apply(this,["0", "text"]);
            _createButton.apply(this,["seek by Secs", "button"]).onclick = (function(that, seek){return function(){that.notifyOrderSeekBySecs(seek.value);}})(this, _seek);
            _seekProp = _createButton.apply(this,["0", "text"]);
            _createButton.apply(this,["seek by Prop (0.1)", "button"]).onclick = (function(that, seekProp){return function(){that.notifyOrderSeekByProp(seekProp.value);}})(this, _seekProp);
            element = document.createElement('br');
            document.getElementById(_data.uiData.skinContainer).appendChild(element);



            _createButton.apply(this,["play", "button"]).onclick = (function(that){return function(){that.notifyOrderPlayPause();}})(this);
            _createButton.apply(this,["reset", "button"]).onclick = (function(that){return function(){that.notifyOrderSeekByProp(0);}})(this);
            _createButton.apply(this,["mute", "button"]).onclick = (function(that){return function(){that.notifyOrderMute();}})(this);
            _createButton.apply(this,["stop", "button"]).onclick = (function(that){return function(){that.notifyOrderStop();}})(this);



            this.notifyInitComplete();
        };
        this.reset = function () {
            //TODO: Implementar reset para limpiar el estado anterior, etc
        };
        this.resize = function(width, height){};
        this.onProgress = function(data){
            _current.innerHTML = "Current: " + data.currentTime;
            _total.innerHTML = "Total: " + data.totalTime;
            _bytesLoaded.innerHTML = "Loaded: " + data.bytesLoaded;
            _bytesTotal.innerHTML = "Size: " + data.bytesTotal;
        };
        this.onVolumeChange = function(offset){
            _volume.value = offset;
        };
        this.onMute = function(flag){};
        this.onStatusChange = function(status){};
        this.onMetadata = function(metadata){};
        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){};
        this.onSeekComplete = function(offset){};
        this.onBufferEmpty = function(){};
        this.onBufferFull = function(){};

    }

    namespace.TopSkin_test = TopSkin_test;


})(emic.top.ui);/**
 * Created by igomez on 24/07/2014.
 */
(function(namespace){

    UIPreviewBase.prototype = new psd.framework.EventDispatcher();

    function UIPreviewBase (){

        // Super
        psd.framework.EventDispatcher.call(this);

        this.init = function () {};
        this.reset = function () {};

        this.notifyPreviewReady = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_PREVIEW_READY));
        };
        this.notifyOrderBegin = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
        };
    }
    namespace.UIPreviewBase = UIPreviewBase;

})(emic.top.ui);/**
 * Created by igomez on 24/07/2014.
 */
(function(namespace){

    TopPreview_generic.prototype = new emic.top.ui.UIPreviewBase();

    function TopPreview_generic (){

        emic.top.ui.UIPreviewBase.call(this);

        var _data;
        var _content;
        var _img;

        this.init = function (data) {

            //TODO: Modificar el escalado para que la imagen no haga fit y evitar que se distorsione
            var container;

            _data = data;

            _content = document.getElementById(_data.uiData.previewContainer);

            _img = document.createElement('img');
            _img.setAttribute('src', _data.uiData.poster);
            _img.setAttribute('width', _data.genericData.width);
            _img.setAttribute('height', _data.genericData.height);

            _img.onclick = (function (that){
                return function(){
                    that.notifyOrderBegin();
                }
            })(this);

            _img.onload = (function (that){
                return function(){
                    console.log("imagen cargada");
                }
            })(this);

            _content.appendChild(_img);

            this.notifyPreviewReady();
        };
        this.reset = function () {
            _img.setAttribute('src', _data.uiData.poster);
        };
    }

    namespace.TopPreview_generic = TopPreview_generic;

})(emic.top.ui);/**
 * Created by IGomezG on 10/02/14.
 */
(function (namespace){

    function UIFactory(){

        this.getSkin = function(type) {
            var instance;

            switch (type) {
                case emic.top.UIModule.SKIN_GENERIC_FENIX:
                    instance = new emic.top.ui.SkinFenix(type);
                break;
                case emic.top.UIModule.SKIN_TEST:
                    instance = new emic.top.ui.TopSkin_test();
                break;
                default:
                    instance = new emic.top.ui.SkinFenix("generic_f");
                break;
            }
            return instance;
        };

        this.getPreview = function(type) {
            var instance;

            switch (type) {
                case emic.top.UIModule.SKIN_TEST:
                    instance = new emic.top.ui.TopPreview_generic();
                break;
                default:
                    instance = new emic.top.ui.TopPreview_generic();
                break;
            }
            return instance;
        }
    }

    namespace.UIFactory = UIFactory;
})(emic.top.ui);/**
 * Created by igomez on 02/07/2014.
 */
(function (namespace){

    UIModule.prototype = new psd.framework.EventDispatcher();

    UIModule.SKIN_GENERIC_FENIX = "generic_f";
    UIModule.SKIN_TEST = "test";

    UIModule.PREVIEW_GENERIC = "generic";

    //TODO: Gestión de resize del elemento media (por ejemplo, para vídeo)
    //TODO: Skin empty
    function UIModule(dataModel){

        // Super
        psd.framework.EventDispatcher.call(this);

        var _data = dataModel;

        var _factory = new emic.top.ui.UIFactory();
        var _skin;
        var _preview;
        var _position;

        /////////////////////////////////////////////////////////
        //  INTERNAL
        /////////////////////////////////////////////////////////

        var _skinHandler = function(event){
            //Redispatch de los eventos del skin

            this.dispatchEvent(event);
            switch (event.type){
                case emic.top.event.UIEvent.ON_ORDER_PLAY:
                case emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE:
                    if (_position == emic.top.TopPlayer.POSITION_PREVIEW){
                        this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
                    }
                break;
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    this.dispatchEvent(event);
                break;
            }
        };

        var _previewHandler = function(event){
            switch (event.type){
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    this.dispatchEvent(event);
                break;
            }
        };

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.init = function () {
            _skin = _factory.getSkin(_data.uiData.skin);

            if (_skin){
                _skin.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _skinHandler, this);
                _skin.init(_data);
            }

            //TODO: Importante, hacer que sea configurable mostrar el preview o no (sobre todo para audio)
            _preview = _factory.getPreview(_data.uiData.preview);

            if (_preview){
                _preview.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _previewHandler, this);
                _preview.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _previewHandler, this);
                _preview.init(_data);
            }

        };

        this.reset = function () {
            if (_preview) _preview.reset();
            if (_skin) _skin.reset();
            //TODO: Implementar reset
        };

        this.onPositionChange = function (position) {
            //TODO: Sacar position al _dataModel? o a un singleton GetPosition?
            _position = position;
        };

        /////////////////////////////////////////////////////////
        //  INFO REPORT
        /////////////////////////////////////////////////////////



        this.onStatusChange = function(status){
            if (_skin){
                _skin.onStatusChange(status);
            }
        };

        this.onVolumeChange = function(vol){
            if (_skin){
                _skin.onVolumeChange(vol);
            }
        };

        this.onProgress = function(data){
            if (_skin){
                _skin.onProgress(data);
            }
        };

        this.onMetadata = function(metadata){
            if (_skin){
                _skin.onMetadata(metadata);
            }
        };

        this.onCue = function(data){
            if (_skin){
                _skin.onCue(data);
            }
        };

        this.onError = function(msg, code){
            if (_skin){
                _skin.onError(msg, code);
            }
        };

        this.onSwitchRequest = function(id){
            if (_skin){
                _skin.onSwitchRequest(id);
            }
        };
        this.onSwitchComplete = function(id){
            if (_skin){
                _skin.onSwitchComplete(id);
            }
        };
        this.onSeekStart = function(offset){
            if (_skin){
                _skin.onSeekStart(offset);
            }
        };
        this.onSeekComplete = function(offset){
            if (_skin){
                _skin.onSeekComplete(offset);
            }
        };
        this.onBufferEmpty = function(){
            if (_skin){
                _skin.onBufferEmpty();
            }
        };
        this.onBufferFull = function(){
            if (_skin){
                _skin.onBufferFull();
            }
        };

        /////////////////////////////////////////////////////////
           // LLAMADAS EXTERNAS A LA VISTA
           /////////////////////////////////////////////////////////

        //TODO: Meter las llamadas externas a la vista (desde fuera del player) OJO! Sólo elementos que afecten a la IU, un play debería ir al MediaModule


    }

    namespace.UIModule = UIModule;

})(emic.top);/**
 * Created by igomez on 28/07/2014.
 */
(function(namespace){

    AdModule.prototype = new psd.framework.EventDispatcher();

    AdModule.POSITION_PREROLL = "preroll";
    AdModule.POSITION_POSTROLL = "postroll";

    function AdModule (dataModel){
        psd.framework.EventDispatcher.call(this);

        var _manager;
        var _data = dataModel;
        var _currentConf;
        var _ready = false;
        var _waitingPosition = false;
        var _currentPosition = "";
        var _initializing = false;

        var _init = function(){
            _manager = new emic.publicidad.PubliManager();
            _manager.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_READY, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, _managerHandler, this);
            _manager.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, _managerHandler, this);
            _currentConf = _data.adData.conf;
            _initializing = true;
            _manager.start(_data.adData.container,{"urlConfPubli":_currentConf,"width":_data.genericData.width,"height":_data.genericData.height}, _data.genericData.id);
        };

        var _managerHandler = function(event){
            //TODO: Escuchar los no publi y los publi error
            var ev;
            switch (event.type){
                case emic.publicidad.events.PubliEvent.PUBLI_READY:
                    _ready = true;
                    _initializing = false;
                    this.dispatchEvent(new emic.top.event.AdEvent(emic.top.event.AdEvent.ON_READY));
                    if (_waitingPosition) {
                        this.notificaEstadoOn(_waitingPosition);
                        _waitingPosition = false;
                    }
                break;
                case emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED:
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_POSITION_END;
                    ev.data = _currentPosition;
                    this.dispatchEvent(ev);
                    _currentPosition = "";
                break;
            }
            console.log("AdEvent: ", event.type);
        };

        var _kill = function(){
            //TODO: _manager.kill()
            _manager = null;
            _data.adData.container.innerHTML = "";
            _init.apply(this);
        };

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.init = function () {
            _init.apply(this);
        };

        this.reset = function () {
            if ((_ready) && (_currentConf != _data.adData.conf)) {
                console.log("mato");
                _kill.apply(this);
            }else{
                this.dispatchEvent(new emic.top.event.AdEvent(emic.top.event.AdEvent.ON_READY));
            }
        };



        this.notificaEstadoOn = function (position) {
            //TODO: Proteger acceso desde fuera, sólo válido desde TopLauncher : ¿arguments.callee.caller.toString()?
            //TODO: Sólo lanzará la petición una vez con multiPosition == 0 (OJO! guardar el id del vídeo o hacer un reset del módulo tras un load de nuevo contenido en el player)

            if (_ready){
                //TODO: Detener peticiones anteriores? No permitir si hay posición activa?
                _currentPosition = position;
                _manager.notificaPubliOn(position,{"referrer":_data.genericData.referer,"adTags":_data.adData.pTags});
            }else{
                _waitingPosition = position;
            }
        };
    }

    namespace.AdModule = AdModule;

})(emic.top);/**
 * Created by igomez on 08/07/2014.
 */
(function (namespace){
    
    function DataModel(){

        this.mediaData = {};
        this.uiData = {};
        this.genericData = {};
        this.adData = {};

        //TODO: Todos los boolean de los config deben entender "", "false, y "true" como string y castearlos de forma correcta a boolean

        var _init = function(){
            this.setDefaultGenericData();
            this.setDefaultMedia();
            this.setDefaultUIData();
            this.setDefaultAdData();

        };

       this.setDefaultMedia = function(){
            this.mediaData = {};
            this.mediaData.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_FLASH,emic.top.MediaModule.TECHNOLOGY_HTML5];
            this.mediaData.controllerPriority = [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHDS];
            this.mediaData.autoplay = false;
            this.mediaData.id = undefined;
            this.mediaData.url = undefined;
            this.mediaData.urlHTML5 = undefined;
            this.mediaData.wmode = "window";
            this.mediaData.isLive= false;
            this.mediaData.isDVR = false;
            this.mediaData.renditions = [];
            this.mediaData.controllerData = {};
            this.mediaData.controllerName = undefined; //Generado de forma interna en MediaModule: Controlador escogido tras lógica de prioridades
            this.mediaData.container = undefined;
            this.mediaData.mimetype = "video/mp4";
            this.mediaData.title = "";
            this.mediaData.description = "";
            this.mediaData.activeProgressEvent = false;
            this.mediaData.clipBegin = undefined;
            this.mediaData.clipEnd = undefined;
            this.mediaData.absolute = true;
            this.mediaData.startVolume = 0.7;
            this.mediaData.authParams = "";
            this.mediaData.authParamsHTML5 = "";
        };

        this.setDefaultUIData = function(){
            this.uiData.skin = emic.top.UIModule.SKIN_GENERIC_FENIX;
            this.uiData.preview = emic.top.UIModule.PREVIEW_GENERIC;
            this.uiData.poster = undefined;
            this.uiData.skinData = {};
            this.uiData.previewData = {};
            this.uiData.bgColor = 0;
            this.uiData.absoluteTime = false;
            this.uiData.container = undefined;
            this.uiData.skinContainer = undefined;     //generado internamente sobre this.uiData.container
            this.uiData.previewContainer = undefined;  //generado internamente sobre this.uiData.container
            this.uiData.overrideNativeControls = false;
        };

        this.setDefaultGenericData = function(){
            this.genericData.urlBase = "";
            this.genericData.width = 640;
            this.genericData.height = 480;
            this.genericData.container = undefined;
            this.genericData.id =  Math.floor(99999999999 * Math.random());
            this.genericData.referer = "";
        };

        this.setDefaultAdData = function(){
            this.adData.conf = "";
            this.adData.enabled = true;
            this.adData.pTags = "";
            this.adData.container = "";
            this.adData.multiPosition = true;
        };

        this.config = function(data){
          if (data.media){
              this.configMedia(data.media);
          }
          if (data.ui){
              this.configUI(data.ui);
          }
          if (data.generic){
              this.configGeneric(data.generic);
          }
          if (data.ad){
              this.configAd(data.ad);
          }
        };

        this.configMedia = function(data){

            var len, i;

            //TODO: Revisar si basta con undefined o es encesario revisar tb null o blancos
            //Sólo pisamos el dato en caso de que tenga contenido, para no machacar lo anterior
            if ( data.autoplay != undefined) {this.mediaData.autoplay = data.autoplay;}
            if (( data.wmode != undefined) && (data.wmode  != ""))  {this.mediaData.wmode = data.wmode;}
            if (data.title != undefined)  {this.mediaData.title = data.title;}
            if (data.description != undefined) {this.mediaData.description = data.description;}
            if ( data.isLive != undefined) {this.mediaData.isLive = data.isLive;}
            if ( data.isDVR != undefined) {this.mediaData.isDVR = data.isDVR;}
            if (( data.id != undefined) && (data.id  != ""))  {this.mediaData.id = data.id;}
            if (( data.clipBegin != undefined) && (data.clipBegin  != ""))  {this.mediaData.clipBegin = data.clipBegin;}
            if (( data.clipEnd != undefined) && (data.clipEnd  != ""))  {this.mediaData.clipEnd = data.clipEnd;}
            if ( data.absolute != undefined)  {this.mediaData.absolute = data.absolute;}
            if (( data.url != undefined) && (data.url  != ""))  {this.mediaData.url = data.url;}
            if (( data.urlHTML5 != undefined) && (data.urlHTML5  != ""))  {this.mediaData.urlHTML5 = data.urlHTML5;}
            if (( data.container != undefined) && (data.container  != ""))  {this.mediaData.container = data.container;}
            //TODO: Quitar activeProgressEvent
            if ( data.activeProgressEvent != undefined)  {this.mediaData.activeProgressEvent = data.activeProgressEvent;}
            if (( data.startVolume != undefined) && (data.startVolume  != ""))  {this.mediaData.startVolume = data.startVolume;}
            if (( data.authParams != undefined) && (data.authParams  != ""))  {this.mediaData.authParams = data.authParams;}
            if (( data.authParamsHTML5 != undefined) && (data.authParamsHTML5  != ""))  {this.mediaData.authParamsHTML5 = data.authParamsHTML5;}
            if (( data.controllerData != undefined) && (data.controllerData  != ""))  {
                this.mediaData.controllerData = data.controllerData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (( data.mimetype != undefined) && (data.mimetype  != ""))  {this.mediaData.mimetype = data.mimetype;}

            if (( data.renditions != undefined) && (data.renditions  != [])) {
                try{

                    //TODO: Ordenar por bitrate? revisar si llegan ok?
                    /*
                     len = data.renditions.length;
                     for (i = 0; i < len; i++){

                     }*/

                    this.mediaData.renditions = data.renditions;

                }catch(er){
                    //TODO: Gestión de errores
                    console.log("CATCH:DataModel renditions");
                }

                this.mediaData.renditions = data.renditions;
            }
            if (( data.tecPriorityPC != undefined) && (data.tecPriorityPC  != []))  {
                if (data.tecPriorityPC.length > 0) {
                    this.mediaData.tecPriorityPC = data.tecPriorityPC;
                }else{
                    if ((data.tecPriorityPC == MediaModule.TECHNOLOGY_FLASH) || (data.tecPriorityPC == MediaModule.TECHNOLOGY_HTML5))
                        this.mediaData.tecPriorityPC = [data.tecPriorityPC];
                }
            }
            if (( data.controllerPriority != undefined) && (data.controllerPriority  != []))  {
                if (data.controllerPriority.length > 0) {
                    this.mediaData.controllerPriority = data.controllerPriority;
                }else{
                    if ((data.controllerPriority == MediaModule.CONTROLLER_TYPE_AKAMAIHDS) || (data.controllerPriority == MediaModule.CONTROLLER_TYPE_TRITON))
                        this.mediaData.controllerPriority = [data.controllerPriority];
                }
            }
        };

        this.configUI = function(data){
            if (( data.skin != undefined) && (data.skin  != ""))  {this.uiData.skin = data.skin}
            if (( data.preview != undefined) && (data.preview  != ""))  {this.uiData.preview = data.preview;}
            if (( data.poster != undefined) && (data.poster  != ""))  {this.uiData.poster = data.poster;}
            if (( data.bgColor != undefined) && (data.bgColor  != ""))  {this.uiData.bgColor = data.bgColor;}
            if (data.skinData != undefined)  {
                this.uiData.skinData = data.skinData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.previewData != undefined) {
                this.uiData.previewData = data.previewData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.absoluteTime != undefined) {this.uiData.absoluteTime = data.absoluteTime;}
            if (data.overrideNativeControls != undefined) {this.uiData.overrideNativeControls = data.overrideNativeControls;}
        };

        this.configGeneric = function (data) {
            if (( data.width != undefined) && (data.width  != ""))  {this.genericData.width = data.width;}
            if (( data.height != undefined) && (data.height  != ""))  {this.genericData.height = data.height;}
            if (( data.urlBase != undefined) && (data.urlBase  != ""))  {this.genericData.urlBase = data.urlBase;}
            if (( data.container != undefined) && (data.container  != ""))  {this.genericData.container = data.container;}
            if (( data.id != undefined) && (data.id  != ""))  {this.genericData.id = data.id;}
            if (( data.referer != undefined) && (data.referer  != ""))  {this.genericData.referer = data.referer;}
        };

        this.configAd = function (data) {
            if (( data.conf != undefined) && (data.conf  != ""))  {this.adData.conf = data.conf;}
            if ( data.enabled != undefined)  {this.adData.enabled = data.enabled;}
            if (( data.pTags != undefined) && (data.pTags  != ""))  {this.adData.pTags = data.pTags;}
            if (( data.container != undefined) && (data.container  != ""))  {this.adData.container = data.container;}
            if ( data.multiPosition != undefined)  {this.adData.multiPosition = data.multiPosition;}

        };

        _init.apply(this);
    }

    namespace.DataModel = DataModel;

})(emic.top);/**
 * Created by igomez on 07/07/2014.
 */
(function(namespace){

    TopPlayer.prototype = new psd.framework.EventDispatcher();

    TopPlayer.POSITION_PREVIEW = "positionPreview";
    TopPlayer.POSITION_AD_PREROLL = "positionAdPreroll";
    TopPlayer.POSITION_MEDIA = "positionMedia";
    TopPlayer.POSITION_AD_POSTROLL = "positionAdPostroll";

    //TODO: TopPlayer.POSITION_END --> Para vídeos relacionados, etc

    //TODO: Sistema debug:
    /*
        if (emic.top.debug == true){
            emic.topMediaModule = referencia a mediamodule
            emic.topUIModule = referencia a uimodule
            etc..

            Para poder acceder a ALL por consola sin necesitar conocer las instancias ni llamar a getModule
        }
     */

    function TopPlayer(){

        var _mediaModule,
            _uimodule,
            _adModule,
            _data,
            _position;

        //Flags
        var _initialized = false;

        // Super
        psd.framework.EventDispatcher.call(this);

        //TODO: Mirar bien el orden de carga de los distintos módulos, entrelazar los inits, etc
        var _init = function(){
            _data = new emic.top.DataModel();

            _mediaModule = new emic.top.MediaModule(_data);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_READY, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_CUE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_METADATA, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_ERROR, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_START, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_END, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onMediaHandler, this);

            _uimodule = new emic.top.UIModule(_data);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT, _onUIHandler, this);

            _adModule = new emic.top.AdModule(_data);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_READY, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_POSITION_END, _onAdHandler, this);


        };

        this.init = function(settings) {
            if (!_initialized) {
                if (settings) {
                    this.config(settings);
                }

                _clearContainer.apply(this);
                _createContainers.apply(this);

                _mediaModule.init();
                _uimodule.init();

                if (_data.adData.enabled) {
                    _adModule.init();
                }
                else{
                    _init2.apply(this);
                }

                //Continua en _init2 tras emic.top.event.AdEvent.ON_READY (la única inicialización asíncrona)
            }
        };

        /**
         * Continua tras la inicialización de la publicidad
         * @private
         */
        var _init2 = function(){

            _start.apply(this);

            //TODO: Proceso para inicializar los diferentes módulos

            _initialized = true;

            //TODO: Dispatch de un nuevo evento que diga que el player está preparado para recuperar los módulos, etc
        };

        var _start = function(){
            if (_data.mediaData.autoplay){
                _position = emic.top.TopPlayer.POSITION_PREVIEW;
                _nextPosition();
            }else{
                _changePosition.apply(this,[emic.top.TopPlayer.POSITION_PREVIEW]);
            }
        };

        this.load = function (settings) {
            _data.config(settings);
            if (_mediaModule) _mediaModule.reset();
            if (_uimodule) _uimodule.reset();
            if ((_data.adData.enabled) && (_adModule))
                _adModule.reset();
        };

        this.config = function(settings) {
            //TODO: Flag defensivo para no inicializar si no ha pasado por aquí
            _data.config(settings);
        };

        this.getMediaModule = function(){
            return _mediaModule;
        };

        this.getUIModule = function(){
            return _uimodule;
        };

        this.getAdModule = function(){
            return _adModule;
        };

        var _onUIHandler = function(e){
            switch (e.type){
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    if (_position == emic.top.TopPlayer.POSITION_PREVIEW){
                        _nextPosition.apply(this);
                    }else{
                        _mediaModule.playpause();
                    }
                break;
                case emic.top.event.UIEvent.ON_ORDER_PLAY:
                   _mediaModule.play();
                   //TODO: Controlar el estado para hacer _mediaModule.resume() cuando proceda
                break;
                case emic.top.event.UIEvent.ON_ORDER_PAUSE:
                    _mediaModule.pause();
                break;
                case emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE:
                    _mediaModule.playpause();
                break;
                case emic.top.event.UIEvent.ON_ORDER_STOP:
                    _mediaModule.stop();
                break;
                case emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE:
                    _mediaModule.setVolume(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_MUTE:
                    //TODO: Mirar dónde hacer gestión  de mute
                break;
                case emic.top.event.UIEvent.ON_ORDER_FULLSCREEN:
                    //TODO: Ver cómo hacer fullscreen al cotroller html5
                break;
                case emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS:
                    _mediaModule.seek(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP:
                    _mediaModule.seekByProp(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_UP:
                    _mediaModule.switchUp();
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN:
                    _mediaModule.switchDown();
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT:
                    _mediaModule.switchDirect(e.data);
                break;
                case emic.top.event.UIEvent.ON_INIT_COMPLETE:
                    //TODO: Ver si estos tres eventos son redundantes, y arreglar todos los skins para que lancen el mismo
                break;
                case emic.top.event.UIEvent.ON_SKIN_READY:

                break;
                case emic.top.event.UIEvent.ON_PREVIEW_READY:

                break;
            }
        };

        var _onMediaHandler = function(e){
            switch (e.type){
                case emic.top.event.MediaEvent.ON_STATUS_CHANGE:
                    _uimodule.onStatusChange(e.data.status);
                    if (e.data.status == emic.top.MediaModule.STATUS_STOP){
                        _nextPosition.apply(this);
                    }
                break;
                case emic.top.event.MediaEvent.ON_VOLUME_CHANGE:
                    _uimodule.onVolumeChange(e.data);
                break;
                case emic.top.event.MediaEvent.ON_PROGRESS:
                    _uimodule.onProgress(e.data);
                break;
                case emic.top.event.MediaEvent.ON_METADATA:
                    _uimodule.onMetadata(e.data);
                break;
                case emic.top.event.MediaEvent.ON_CUE:
                    _uimodule.onMetadata(e.data);
                break;
                case emic.top.event.MediaEvent.ON:
                    _uimodule.onMetadata(e.data);
                break;
                case emic.top.event.MediaEvent.ON_ERROR:
                    _uimodule.onError(msg, code);
                break;
                case emic.top.event.MediaEvent.ON_SWITCH_REQUEST:
                    //TODO: Ver cómo viene el id de calidad en el evento para pasarselo a la vista
                    _uimodule.onSwitchRequest();
                break;
                case emic.top.event.MediaEvent.ON_SWITCH_COMPLETE:
                    //TODO: Ver cómo viene el id de calidad en el evento para pasarselo a la vista
                    _uimodule.onSwitchComplete();
                break;
                case emic.top.event.MediaEvent.ON_SEEK_START:

                break;
                case emic.top.event.MediaEvent.ON_SEEK_COMPLETE:

                break;
                case emic.top.event.MediaEvent.ON_BUFFER_EMPTY:

                break;
                case emic.top.event.MediaEvent.ON_BUFFER_FULL:

                break;
            }
        };

        var _onAdHandler = function(e){
            switch (e.type){
                case emic.top.event.AdEvent.ON_READY:
                    _init2.apply(this);
                break;
                case emic.top.event.AdEvent.ON_AD_POSITION_END:
                    switch (e.data){
                        case emic.top.AdModule.POSITION_PREROLL:
                            _nextPosition.apply(this);
                        break;
                        case emic.top.AdModule.POSITION_POSTROLL:
                            _nextPosition.apply(this);
                        break;
                    }
                break;
            }
        };

        var _createContainers = function(){
            //TODO: IMPORTANTE: Mirar bien el orden de las capas, y pintarlas para que se solapen unas encima de otras
            var playerContainer, element, element2, container, nameContainer;

            //TODO: Ver que pasa cuando no se le pasa capa para vídeo, qué tamaño toma (etc) y ver si se relaciona con el de la vista

            playerContainer = document.getElementById(_data.genericData.container);

            if(playerContainer) {

                playerContainer.style.position = "relative";

                //Contenedor Media
                if (!_data.mediaData.container) {
                    element = document.createElement('div');
                    nameContainer = "MediaModule_" + _data.genericData.id;
                    element.id = nameContainer;
                    element.style.position = "absolute";
                    element.style.top = "0";
                    element.style.left = "0";
                    //position:absolute; width:100%; height:100%; top:0; left:0; z-index:10000
                    _data.mediaData.container = nameContainer;
                    container = document.getElementById(_data.genericData.container);
                    container.appendChild(element);
                }else{
                    element = document.getElementById(_data.mediaData.container);
                    if (!element){}//TODO: Gestión de errores
                }


                //Contenedores UI
                if (!_data.uiData.container){
                    element = document.createElement('div');
                    nameContainer = "UIModule_" + _data.genericData.id;
                    element.id = nameContainer;
                    element.style.position = "absolute";
                    element.style.top = "0";
                    element.style.left = "0";
                    _data.uiData.container = nameContainer;
                    container = document.getElementById(_data.genericData.container);
                    container.appendChild(element);
                }else{
                    element = document.getElementById(_data.uiData.container);
                    if (!element){}//TODO: Gestión de errores
                }

                element2 = document.createElement('div');
                nameContainer = "UIPreview_" + _data.genericData.id;
                element2.id = nameContainer;
                element2.style.position = "absolute";
                element2.style.top = "0";
                element2.style.left = "0";
                _data.uiData.previewContainer = nameContainer;
                element.appendChild(element2);

                element2 = document.createElement('div');
                nameContainer = "UISkin_" + _data.genericData.id;
                element2.id = nameContainer;
                element2.style.position = "absolute";
                element2.style.top = "0";
                element2.style.left = "0";
                _data.uiData.skinContainer = nameContainer;
                element.appendChild(element2);

                //Contenedor publicidad
                if (!_data.adData.container){
                    element = document.createElement('div');
                    nameContainer = "AdModule_" + _data.genericData.id;
                    element.id = nameContainer;
                    element.style.position = "absolute";
                    element.style.top = "0";
                    element.style.left = "0";
                    _data.adData.container = nameContainer;
                    container = document.getElementById(_data.genericData.container);
                    container.appendChild(element);
                }else{
                    element = document.getElementById(_data.adData.container);
                    if (!element){}//TODO: Gestión de errores
                }


                //TODO: Container para AdModule
            }else{
                //TODO: Gestión de errores
            }
        };

        // Limpia el contenedor del mediaplayer
        var _clearContainer = function()
        {
            var playerContainer = document.getElementById(_data.genericData.container);

            if(playerContainer)
            {
                while(playerContainer.firstChild) {playerContainer.removeChild(playerContainer.firstChild);}
            }else{
                //TODO: Control de errores: No container
            }
        };

        var _nextPosition = function(){
            switch (_position){
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    if (_data.adData.enabled)
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_AD_PREROLL]);
                    else
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_MEDIA]);
                break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _changePosition.apply(this, [emic.top.TopPlayer.POSITION_MEDIA]);
                break;
                case emic.top.TopPlayer.POSITION_MEDIA:
                    if (_data.adData.enabled)
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_AD_POSTROLL]);
                    else
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_PREVIEW]);
                break;
                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    _changePosition.apply(this, [emic.top.TopPlayer.POSITION_PREVIEW]);
                break;
            }
        };

        var _changePosition = function(position){
            console.log("Position: ", position);
            _position = position;


            switch (position){
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    _show(_data.uiData.previewContainer);
                    //Si se oculta el contenedor vuelve a recargarse el flash al mostrarlo, pasando por el constructor.
//                    _hide(_data.mediaData.container);
                    _hide(_data.uiData.skinContainer);
                    _hide(_data.adData.container);
                break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _hide(_data.uiData.previewContainer);
                    _hide(_data.mediaData.container);
                    _hide(_data.uiData.skinContainer);
                    _show(_data.adData.container);
                    _adModule.notificaEstadoOn(emic.top.AdModule.POSITION_PREROLL);
                break;
                case emic.top.TopPlayer.POSITION_MEDIA:
                    _hide(_data.uiData.previewContainer);
                    _show(_data.mediaData.container);
                    if ((_data.mediaData.controllerName != emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) ||
                        ((_data.mediaData.controllerName == emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) && _data.uiData.overrideNativeControls))
                        _show(_data.uiData.skinContainer);
                    else
                        _hide(_data.uiData.skinContainer);
                    _hide(_data.adData.container);

                    _mediaModule.load();
                break;
                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    _hide(_data.uiData.previewContainer);
                    _hide(_data.mediaData.container);
                    _hide(_data.uiData.skinContainer);
                    _show(_data.adData.container);
                    _adModule.notificaEstadoOn(emic.top.AdModule.POSITION_POSTROLL);
                break;
            }

            if (_uimodule) _uimodule.onPositionChange(_position);
            if (_mediaModule) _mediaModule.onPositionChange(_position);
        };

        var _show = function(tag){
            var element;
            element = document.getElementById(tag);
            if (element)
                element.style.display = "";
        };

        var _hide = function(tag){
            var element;
            element = document.getElementById(tag);
            if (element)
                element.style.display = "none";
        };

        _init.apply(this);

    }

    namespace.TopPlayer = TopPlayer;

})(emic.top);
