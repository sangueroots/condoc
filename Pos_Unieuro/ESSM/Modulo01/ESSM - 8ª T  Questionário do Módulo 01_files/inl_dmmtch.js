// JsTools
if (typeof(jsTools) === 'undefined')
{
	var jsTools = 
	{
		trim: function(s)
		{
			if (!s)
				return s;
			return s.replace(/^\s*/, "").replace(/\s*$/, "");
		},
		splitTrim : function(val, delim)
		{
			var arr = val.split(delim), res = new Array();
			for (var i = 0; i < arr.length; ++i)
			{
				var s = jsTools.trim(arr[i]);
				if (s !== "")
					res.push(s);
			}
			return res;
		},

		occurrences : function(mstring, substring)
		{
			var n=0, pos=0;
			while(true){
				pos=mstring.indexOf(substring,pos);
				if(pos!==-1){ n++; pos+=substring.length;}
				else{break;}
			}
			return(n);
		},
		
		log: function(s) 
		{
			try 
			{
				if (window.console)
					window.console.log(s);
			} catch (e) {   };
		},
		
		stripTrailingSlash : function (str) 
		{
			if(str.substr(str.length-1) == '/' || str.substr(str.length-1) == '\\')
				return str.substr(0, str.length - 1);
			return str;
		},
		
		createCookie : function(name,value,days)
		{
			if (days)
			{
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else 
				var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},

		readCookie : function(name)
		{
			var nameEQ = name + "=", ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) 
					return c.substring(nameEQ.length,c.length);
			}
			return null;
		},

		eraseCookie : function (name)
		{
			createCookie(name,"",-1);
		},

		parseUri: function(str) 
		{
			var	o = { strictMode: false,
					 key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
					 q: { name:   "queryKey",
						  parser: /(?:^|&)([^&=]*)=?([^&]*)/g },
					 parser: { strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
							   loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ } 
					},
					i = 14,
					m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
					uri = {};

			while (i--) uri[o.key[i]] = m[i] || "";

			uri[o.q.name] = {};
			uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
				if ($1) uri[o.q.name][$1] = $2;
			});
			return uri;
		}
	};
}
///////////////////////////////////////////////////////////////////////////////

if (typeof(aaIntersObj) === 'undefined')
{
	aaIntersObj = {};
	aaIntersObj.divId = 'aaIntersObjDiv';
	aaIntersObj.frameId = 'aaIntersObjFrm';
	aaIntersObj.shown = false;
	aaIntersObj.origHtmlOverflowVal = '';
	aaIntersObj.disableCss = true;
	aaIntersObj.decoyAd = false;

	aaIntersObj.style = {
		tHeight: 24, 
		cText: "Skip this ad",
		bgColor: 'white', 
		txtColor: '#000'
	};
	aaIntersObj.disableStyleSheets = function(disabled)
	{
		if (!this.disableCss)
			return false;
		var len = document.styleSheets.length;
		for (var i = 0; i != len; ++i)
		{
			document.styleSheets[i].disabled = disabled;
		}
	}
	aaIntersObj.showTags = function(tag, display)
	{
		var objs = document.getElementsByTagName(tag),
			len = objs.length;
		for (var i = 0; i != len; ++i)
			objs[i].style.display = display;
	}
	aaIntersObj.onScroll = function()
	{
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		document.body.scrollLeft = 0;
		document.documentElement.scrollLeft = 0;
	}
	aaIntersObj.onResize = function()
	{
		var h, w;		
		if (typeof(window.innerHeight) === 'number')
		{
			h = window.innerHeight;
			w = window.innerWidth;
		}
		else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
		{
			h = document.documentElement.clientHeight;
			w = document.documentElement.clientWidth;
		}
		else if (document.body && (document.body.clientWidth || document.body.clientHeight))
		{
			h = document.body.clientHeight;
			w = document.body.clientWidth;
		}		
		if (aaIntersObj.decoyAd)
		{
			var el = document.getElementById(aaIntersObj.divId);
			if (el == null)
				return;
				
			el.style.height = h + 'px';
			el.style.width = w + 'px';
		}
		else
		{
			var _el = document.getElementById(aaIntersObj.frameId);			
			if (_el == null)
				return;
			_el.style.height = (h - aaIntersObj.style.tHeight) + 'px';
			_el.style.width = w + 'px';

		}
		aaIntersObj.onScroll();
	}
	
	aaIntersObj.generateCSS = function(name)
	{
		var isIE = navigator.userAgent.toLowerCase().search("msie") > -1,
			isQuirks = (document.compatMode === 'BackCompat'),
			cssModel = {'click_overlay' : 'background:white;width:100%;height:100%;position:absolute;top:24px;cursor:pointer;z-index:999999;opacity:0;filter: alpha(opacity=0);',
						'infobar' : 'text-align:left;width:100%; height:3em; background:#000000; z-index:9998; position:absolute; left:0; bottom: 0; opacity: 0.7; filter: alpha(opacity=70); color: white; font-size:13px; font-family: Verdana, sans-serif; height:4em; padding-top:0.50em;visibility:visible;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:100%;',
						'topbar' : 'width:100%;filter:alpha(opacity=80);opacity:0.8;background-color:white;position:relative:top:0;text-align:right;font-size:18px;font-weight:bold;border: 1px solid black;vertical-align:middle;'
						};
		if (typeof(cssModel[name]) == 'function')
			return cssModel[name](isIE, isQuirks);
		return cssModel[name];
	}
	aaIntersObj.initAd = function(adResults)
	{		
		if (adResults.length != 1)
			return false;
		this.allowed = document.getElementById(this.divId) == null;
		if (!this.allowed)
			return false;
		var adElem = document.createElement("div");
		adElem.id = this.divId;
		adElem.style.display = 'none';
		adElem.style.position = "absolute";
		adElem.style.padding = "0";
		adElem.style.margin = "0";
		adElem.style.top = "0";
		adElem.style.left = "0";
		adElem.style.width = "100%";
		adElem.style.height = "100%";
		adElem.style.zIndex = "999999";
		adElem.style.background = "transparent";
		adElem.style.fontFamily = "Arial, Helvetica, sans-serif";

		var sCButton = '<a href="#" style="line-height:normal;font-size:12px;color:' + this.style.txtColor + ';text-decoration:underline;" onClick="aaIntersObj.closeAd(true); return false;">' + this.style.cText + '</a>';
		var s = "<div style='height:" + this.style.tHeight + "px;" + aaIntersObj.generateCSS('topbar') + "'>" +
				sCButton + '&nbsp;&nbsp;&nbsp;' + "</div>" + 
				"<div style='" + aaIntersObj.generateCSS('click_overlay') + "' onclick='window.location =\"" + adResults[0].url + "\"'></div>" + 
				"<div style='" + aaIntersObj.generateCSS('infobar') + "'>" + "&nbsp;&nbsp;&nbsp;<b>" + adResults[0].title + "</b><br/>" + "&nbsp;&nbsp;&nbsp;<span style='font-size:75%;'>" +  adResults[0].site + "</span><br/>" + "&nbsp;&nbsp;&nbsp;" + adResults[0].descr + "</div>";		
				
		adElem.innerHTML = s;
		document.body.appendChild(adElem);
		this.disableCss = false;
		this.decoyAd = true;
		return true;
	};

	aaIntersObj.showAd = function()
	{
		if (!this.allowed || this.shown)
			return false;
		this.disableStyleSheets(true);
		this.showTags("object", "none");	
		this.showTags("embed", "none");
		this.origBodyMargin = document.body.style.margin;	document.body.style.margin = 0;
		this.origBodyPadding = document.body.style.padding;	document.body.style.padding = 0;
		this.origBodyScroll = document.body.scroll;	document.body.scroll = "no";
		this.origBodyOverflow = document.body.style.overflow;	document.body.style.overflow = 'hidden';
		this.origWindowOnScroll = window.onscroll;	window.onscroll = this.onScroll;
		this.origWindowOnResize = window.onresize;	window.onresize = this.onResize;
		this.origHtmlOverflowVal = document.documentElement.style.overflow;  document.documentElement.style.overflow = "hidden";
		document.getElementById(this.divId).style.display = "";
		var el = document.getElementById(this.frameId);
		if (el != null)
		{
			el.style.position = 'relative';
			el.style.top = '0';
			el.style.left = '0';
			el.style.margin = '0';
			el.style.padding = '0';
			el.focus();
		}
		this.onResize();
			
		this.shown = true;		
		return true;
	}
	aaIntersObj.closeAd = function(restore)
	{
		if (!this.allowed)
			return false;
		if (restore)
		{
			window.onresize = this.origWindowOnResize;
			window.onscroll = this.origWindowOnScroll;
			this.disableStyleSheets(false);
			this.showTags("embed", "");
			this.showTags("object", "");
			document.body.style.margin = this.origBodyMargin;
			document.body.style.padding = this.origBodyPadding;
			document.body.scroll = this.origBodyScroll;
			document.body.style.overflow = this.origBodyOverflow;
			document.documentElement.style.overflow = this.origHtmlOverflowVal;
		}
		var adDiv = document.getElementById(this.divId);
		adDiv.parentNode.removeChild(adDiv);
		return true;
	}
}
///////////////////////////////////////////////////////////////////////////////

if (typeof(INL_inlineConfig) === 'undefined')
{
	var INL_inlineConfig = {
	fid: window.INLDM_cfg.fi,
	subid: 'intext',
	initialized: 'false',
	containerId: '',
	id:'1',
	adsPerPage: '8',
	staticServer: window.INLDM_cfg.sttc,
	highlightLinkColor: '227D1F',
	underlineService: 'http://' + window.INLDM_cfg.fddm +'/underline',
	adsService: 'http://' + window.INLDM_cfg.fddm + '/links',
	parsePage: true,
	useOnLoad: false,
	skin: 'skin',
	searchUrl: 'http://' + window.INLDM_cfg.inlsrhdm + '/search.php?f=' + window.INLDM_cfg.fi +'&q=',
	categories: '123,321',
	size: 'large',
	network: 'ron',
	appearMethod: 'hover',
	underliningStyle: 'double',
	referralUrl: 'http://example.com',
	showDisableLink: false,
	useBanner: '0',
	bannerWidth: 370,
	bannerHeight: 250,
	keywordsCount: 10,
	nocache: false,
	useMeta: true
	};

	function INL_inlineAds() {
	}
	INL_inlineAds.noIntextTagOff = 'INTEXT OFF';
	INL_inlineAds.noIntextTagOn = 'INTEXT ON';
	INL_inlineAds.noIntextTagFounded = false;
	INL_inlineAds.debug = true;
	INL_inlineAds.uuid = new Date().getTime();
	INL_inlineAds.subid = INL_inlineConfig.subid;
	INL_inlineAds.admId = 'inline-link';
	INL_inlineAds.adContentId = 'inline-content';
	INL_inlineAds.adEntityClass = 'relitem';
	INL_inlineAds.loaderId = 'intext-loader';
	INL_inlineAds.adsCache = new Object();
	INL_inlineAds.loaderHolder = null;
	INL_inlineAds.loaderWidth = 30;
	INL_inlineAds.loaderHeight = 30;
	INL_inlineAds.bannerHolderId = 'intext-banner-holder';
	INL_inlineAds.bannerHolder = null;
	INL_inlineAds.bannerWidth = INL_inlineConfig.bannerWidth;
	INL_inlineAds.bannerHeight = INL_inlineConfig.bannerHeight;
	INL_inlineAds.bannerPopupWidth = INL_inlineConfig.bannerWidth;
	INL_inlineAds.bannerPopupHeight = INL_inlineConfig.bannerHeight;
	INL_inlineAds.appearMethod = INL_inlineConfig.appearMethod == 'click' ? 'click' : 'hover';
	INL_inlineAds.underliningStyle = INL_inlineConfig.underliningStyle || 'dotted';
	INL_inlineAds.showDisableLink = INL_inlineConfig.showDisableLink == '1' ? '1' : '0';
	INL_inlineAds.mainTextElementId = (typeof(INL_inlineConfig.containerId) != 'undefined' && INL_inlineConfig.containerId != '')? INL_inlineConfig.containerId:  null;
	INL_inlineAds.id = INL_inlineConfig.id;
	INL_inlineAds.fid = INL_inlineConfig.fid;
	INL_inlineAds.keywordsCount = INL_inlineConfig.keywordsCount;
	INL_inlineAds.highlightColor = INL_inlineConfig.highlightLinkColor;
	INL_inlineAds.parsePage = INL_inlineConfig.parsePage;
	INL_inlineAds.useOnLoad = INL_inlineConfig.useOnLoad;
	INL_inlineAds.skin = INL_inlineConfig.skin;
	INL_inlineAds.size = INL_inlineConfig.size;
	INL_inlineAds.network = INL_inlineConfig.network;
	INL_inlineAds.path = INL_inlineConfig.staticServer;
	INL_inlineAds.bannerUrl = INL_inlineAds.path + 'banner.php';
	INL_inlineAds.underlineService = INL_inlineConfig.underlineService;
	INL_inlineAds.adsService = INL_inlineConfig.adsService;
	INL_inlineAds.searchUrl = INL_inlineConfig.searchUrl;
	INL_inlineAds.referralUrl = INL_inlineConfig.referralUrl;
	INL_inlineAds.categories = INL_inlineConfig.categories;
	INL_inlineAds.keywordRank = '1,2,2,1';
	INL_inlineAds.countLinks = 4;
	INL_inlineAds.pageScrappingStopped = false;
	INL_inlineAds.pageScrapped = false;
	INL_inlineAds.textNodes = [];
	INL_inlineAds.parsingActive = false;
	INL_inlineAds.maxBytesLimit = 15000;
	INL_inlineAds.maxScrapeTimeLimit = 3000;
	INL_inlineAds.hideAdDelay = 1000;
	INL_inlineAds.adHideTimer = null;
	INL_inlineAds.textData = null;
	INL_inlineAds.requestUrl = null;
	INL_inlineAds.lastElement = null;
	INL_inlineAds.lastEvent = null;
	INL_inlineAds.layout = 'ONE';
	INL_inlineAds.orientY = 'UP';
	INL_inlineAds.orientX = 'LEFT';
	INL_inlineAds.userQuery = '';
	INL_inlineAds.firstTimeSafari = false;
	INL_inlineAds.displayingInProccess = false;
	INL_inlineAds.isDisplayedBanner = false;
	INL_inlineAds.isLoadingBanner = false;
	INL_inlineAds.isDisplayedAd = false;
	INL_inlineAds.adsContent = null;
	INL_inlineAds.documentReady = false;
	INL_inlineAds.contentLoaded = null;
	INL_inlineAds.maxUrlLength = 5000;
	INL_inlineAds.nocache = (typeof(INL_inlineConfig.nocache) != 'undefined') ? INL_inlineConfig.nocache : false;
	INL_inlineAds.useMeta = INL_inlineConfig.useMeta;

	INL_inlineAds.sizes = {
		'small': 'sml',
		'medium': 'mid',
		'big': 'big'
	};

	INL_inlineAds.skippedTags = {
		"a": 1,
		"acronym": 1,
		"address": 1,
		"br": 1,
		"dt": 1,
		"dl": 1,
		"dd": 1,
		"embed": 1,
		"fieldset": 1,
		"frame": 1,
		"h1": 1,
		"h2": 1,
		"h3": 1,
		"h4": 1,
		"h5": 1,
		"h6": 1,
		"input": 1,
		"ins": 1,
		"iframe": 1,
		"label": 1,
		"legend": 1,
		"noscript": 1,
		"object": 1,
		"pre": 1,
		"th": 1,
		"param": 1,
		"script": 1,
		"select": 1,
		"style": 1,
		"textarea": 1,
		"title": 1
	};

	INL_inlineAds.init = function() {
		INL_inlineAds.log('init');
		if (INL_inlineAds.isIe())
			INL_inlineAds.maxUrlLength = 2083;
		
		if(INL_inlineAds.useOnLoad) {
			INL_inlineAds.delayedStart();
		} else {
			INL_inlineAds.start();
		}
	};


	if (document.addEventListener) {
		INL_inlineAds.contentLoaded = function () {
			document.removeEventListener("DOMContentLoaded", INL_inlineAds.contentLoaded, false);
			INL_inlineAds.readyToStart();
		};
	} else if (document.attachEvent) {
		INL_inlineAds.contentLoaded = function () {
			if (document.readyState === "complete") {
				document.detachEvent("onreadystatechange", INL_inlineAds.contentLoaded);
				INL_inlineAds.readyToStart();
			}
		};
	}


	INL_inlineAds.readyToStart = function() {
		if (!INL_inlineAds.documentReady) {
			if (!document.body) {
				return setTimeout(INL_inlineAds.readyToStart, 1);
			}
			INL_inlineAds.documentReady = true;
			INL_inlineAds.start();
		}
	};

	INL_inlineAds.delayedStart = function() {
		
		INL_inlineAds.log('delayedStart');
		
		if (INL_inlineAds.documentReady) {
			INL_inlineAds.start();
		}
		
		if(/WebKit/i.test(navigator.userAgent)) { // sniff
			var adm_wktimer = setInterval(function() {
				if(/loaded|complete/.test(document.readyState)) {
					clearInterval(adm_wktimer);
					INL_inlineAds.start(); // call the onload handler
				}
			}, 10);
			return;
		}
		
		if (document.readyState === "complete") {
			return readyToStart();
		}
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", INL_inlineAds.contentLoaded, false);
			window.addEventListener("load", INL_inlineAds.readyToStart, false)
		} else if (document.attachEvent) {
			document.attachEvent("onreadystatechange", INL_inlineAds.contentLoaded);
			window.attachEvent("onload", INL_inlineAds.readyToStart);
			var toplevel = false;
			try {
				toplevel = (window.frameElement === null);
			} catch (k) {}
			if (document.documentElement.doScroll && toplevel) {
				INL_inlineAds.IEScrollCheck();
			}
		}
		
	};

	INL_inlineAds.IEScrollCheck = function() {
		if(INL_inlineAds.documentReady) {
			return;
		}
		try {
			document.documentElement.doScroll("left");
		} catch(error) {
			setTimeout(INL_inlineAds.IEScrollCheck, 1);
			return;
		}
		INL_inlineAds.readyToStart();
	}

	INL_inlineAds.start = function() {
		INL_inlineAds.log('start');
		if(arguments.callee.done) return;
		arguments.callee.done = true;
		INL_inlineAds.startPageParsing();
		INL_inlineAds.insertLoaderHolder();
		INL_inlineAds.insertBannerHolder();
	};

	INL_inlineAds.grabPage = function() {
		INL_inlineAds.log('grabPage');
		var firstElement, textContent = [];
		if(INL_inlineAds.mainTextElementId) {
			firstElement = document.getElementById(INL_inlineAds.mainTextElementId);
		} else {
			firstElement = document.body;
		}
		if(typeof(firstElement) == 'undefined')
			return;
		INL_inlineAds.log('parsingStarted');
		INL_inlineAds.charCount = 0;
		INL_inlineAds.pageScrappingStopped = false;
		INL_inlineAds.pageScrapped = false;
		if (INL_inlineAds.maxScrapeTimeLimit > 0) {
			setTimeout(function() {INL_inlineAds.pageScrapped = true; }, INL_inlineAds.maxScrapeTimeLimit);
		}
		var timer = new INL_inlineAds.timer();
		try {
			INL_inlineAds.collectText(INL_inlineAds.parsingActive, textContent, firstElement, timer);
		}
		catch (exception) {
			INL_inlineAds.log(exception);
			return null;
		}

		if(INL_inlineAds.id == 'demo' || INL_inlineAds.id == 'demo2') {
			INL_inlineAds.log('d');
			INL_inlineAds.prepareAds('[["advertisements",0],["make money",0]]');
		} else if (INL_inlineAds.useMeta == true)
		{
			INL_inlineAds.log('ok');
			var metaKeywords = INL_inlineAds.collectMetaKeywords();	
			if (typeof(metaKeywords) != 'undefined' && metaKeywords.length > 0)
			{
				var keywordsData = INL_inlineAds.findKeywordsInTextNodes(metaKeywords, textContent);
				INL_inlineAds.prepareAds(keywordsData);
			}
		}	
		else
		{
			INL_inlineAds.log('ok');
			INL_inlineAds.textData = textContent.join('|');
			INL_inlineAds.getUnderlines();
		}

	};
	INL_inlineAds.findKeywordsInTextNodes = function(inKeywords, textContent)
	{
		var outKeywords = new Array();
		//iterate throught keywords
		for (var j = 0; j < inKeywords.length; j++)
		{
			for (var i = 0; i < textContent.length; i++)
			{
				var kw = inKeywords[j],
					txt = textContent[i],
					pattern = "(.*?[^\\waˆ™'-]|^)(" + kw + ")([^\\waˆ™'-].*|$)";
				regexp = new RegExp(pattern, "i");
				if (regexp.exec(txt) != null)
				{
					outKeywords.push([i,kw]);
					break;
				}
					
			}
		}
		return outKeywords;
	}

	INL_inlineAds.time = function() {
		return new Date().getTime();
	};

	INL_inlineAds.timer = function() {
		this.start = INL_inlineAds.time();
		this.getTimePassed = function() {
			return INL_inlineAds.time() - this.start;
		};
	};

	INL_inlineAds.encodeUrlParam = function(s) {
		s = encodeURIComponent(s);
		s = s.replace(/%20/g, "+");
		return s;
	};

	INL_inlineAds.strTrim = function(s)
	{
		return s.replace(/^\s+|\s+$/g, "");
	}
	INL_inlineAds.splitTrim = function(val, delim)
	{
		var arr = val.split(delim), res = new Array();
		for (var i = 0; i < arr.length; ++i)
		{
			var s = INL_inlineAds.strTrim(arr[i]);
			if (s != "")
				res.push(s);
		}
		return res;
	}
	INL_inlineAds.occurrences = function(mstring, substring)
	{
		var n=0, pos=0;
		while(true){
			pos=mstring.indexOf(substring,pos);
			if(pos!==-1){ n++; pos+=substring.length;}
			else{break;}
		}
		return(n);
	}
	INL_inlineAds.getMetaKeywordsTagContent = function()
	{
		var metaCollection = document.getElementsByTagName('meta');
		if (typeof(metaCollection) === 'undefined')
			return;
		for (var i = 0; i < metaCollection.length; i++)
		{
			var name = metaCollection.item(i).name.toLowerCase();
			if (name === 'keywords' && typeof(metaCollection.item(i).content) != 'undefined')
				return metaCollection.item(i).content;
		}
		return;
	}
	INL_inlineAds.collectMetaKeywords = function()
	{
	/*
		var metaCollection = document.getElementsByTagName('meta');
		if (typeof(metaCollection) === 'undefined')
			return;
		if (metaCollection.namedItem('keywords') == null)
			return;
		var keywordsStr = metaCollection.namedItem('keywords').content; */
		var keywordsStr = INL_inlineAds.getMetaKeywordsTagContent();
		if (typeof(keywordsStr) === 'undefined' || keywordsStr === '')
			return;
		//check if comma is delimeter for keywords
		var ret = new Array(), delimeter = " ";
		if (INL_inlineAds.occurrences(keywordsStr, ","))
		{
			delimeter = ",";
		}
		else
		if (INL_inlineAds.occurrences(keywordsStr, ";"))
		{
			delimeter = ";";
		}
		else
		if (INL_inlineAds.occurrences(keywordsStr, "|"))
		{
			delimeter = ";";
		}
		var keywords = INL_inlineAds.splitTrim(keywordsStr, delimeter);
		//now filter keywords
		for (var i = 0; i < keywords.length; i++)
		{
			if (keywords[i].length >= 5)
				ret.push(keywords[i]);
		}
		return ret;
	};

	INL_inlineAds.collectText = function(isRecursive, textContent, firstElement, timer) {
		if(INL_inlineAds.pageScrappingStopped)
			return isRecursive;
		var timePassed = timer.getTimePassed(),
		    maxTimeLimit = INL_inlineAds.maxScrapeTimeLimit,
			maxBytesLimit = INL_inlineAds.maxBytesLimit,
			firstChildElement;
		if ((maxTimeLimit != -1 && timePassed > maxTimeLimit) || (maxBytesLimit != -1 && INL_inlineAds.charCount > maxBytesLimit)) {
			INL_inlineAds.pageScrappingStopped = true;
			return isRecursive;
		}
		
		if (firstElement.nodeType == 1 || firstElement.nodeType == 9) {
			if ((!INL_inlineAds.skipTag(firstElement.tagName) && (firstElement.onclick == null || firstElement == document.body))) {
				for (var index = 0, length = firstElement.childNodes.length; index < length; index++) {
					if (INL_inlineAds.pageScrappingStopped) {
						break;
					}
					firstChildElement = firstElement.childNodes[index];
					isRecursive = INL_inlineAds.collectText(isRecursive, textContent, firstChildElement, timer);
				}
			}
		/* Tags INTEXT OFF and INTEXT ON implementation */
		} else if (firstElement.nodeType == 8) {
			if (isRecursive) {
				var commentText = firstElement.data.replace(/\s+/g, " ");
				if (commentText == INL_inlineAds.noIntextTagOff) {
					INL_inlineAds.noIntextTagFounded = true;
				} else if (commentText == INL_inlineAds.noIntextTagOn) {
					INL_inlineAds.noIntextTagFounded = false;
				}
			}
		} else if(firstElement.nodeType == 3) {
			if (isRecursive && !INL_inlineAds.noIntextTagFounded) {
				var text = firstElement.data.replace(/[\s\|]+/g, " ");
				if (INL_inlineAds.isValidText(text)) {
					//this.log(text);
					var tmpNode = [];
					tmpNode.push(firstElement);
					INL_inlineAds.textNodes.push(tmpNode);
					textContent.push(text);
					INL_inlineAds.charCount += text.length;
				}
			}
		}
		return isRecursive;
	};

	INL_inlineAds.isValidText = function (text) {
		if (text.length < 3)
			return false;
		//if (text.indexOf(" ") < 0)
			//return false;
		return true;
	}

	INL_inlineAds.skipTag = function (tagName) {
		return INL_inlineAds.skippedTags[tagName.toLowerCase()] == 1;
	};

	INL_inlineAds.insertLoaderHolder = function() {
		if(!INL_inlineAds.loaderHolder) {
			loaderHolder = document.createElement('div');
			loaderHolder.style.position = 'absolute';
			loaderHolder.style.overflow = 'hidden';
			loaderHolder.style.zIndex = '9998';
			loaderHolder.style.backgroundColor = 'transparent';
			var image = document.createElement('img');
			image.src = INL_inlineAds.path + 'loader.gif';
			loaderHolder.appendChild(image);
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(loaderHolder);
			INL_inlineAds.loaderHolder = loaderHolder;
			INL_inlineAds.hideLoaderHolder();
		}
	};

	INL_inlineAds.insertBannerHolder = function() {
		if (INL_inlineAds.bannerHolder)
			return;
		var urlNocache = INL_inlineAds.nocache ? '?nocache=' + INL_inlineAds.time() : '',
			head = document.getElementsByTagName('head')[0],
			css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = INL_inlineAds.path + 'style.css' + urlNocache;
		css.media = 'screen';
		head.appendChild(css);
		var ie = INL_inlineAds.isIe();
		if(ie && ie < 8) {
			css = document.createElement('link');
			css.type = 'text/css';
			css.rel = 'stylesheet';
			css.href = INL_inlineAds.path + 'style-ie7.css' + urlNocache;
			css.media = 'screen';
			head.appendChild(css);
		}
		var holder = document.createElement('div');
		holder.setAttribute('id', INL_inlineAds.bannerHolderId);
		holder.style.position = 'absolute';
		holder.style.left = '0';
		holder.style.top = '0';
		holder.style.width = INL_inlineAds.bannerPopupWidth +  'px';
	//        holder.style.height = INL_inlineAds.bannerPopupHeight + 'px';
		holder.style.overflow = 'hidden';
		holder.style.visibility = 'hidden';
		holder.style.zIndex = '9999';
		var html = '<div class="bubble">'
	+'    <div class="bcontent">'
	+'        <div class="bhead"><a href="javascript:void(0);" id="intext-popup-close"><img src="' + INL_inlineAds.path + 'close.png" width="10" height="9" /></a></div>'
	+'        <div class="relevant" id="' + INL_inlineAds.adContentId + '">'
	+'        	<div class="adblocktitle">Ads</div>'
	+'        	<div class="clear"></div>'
	+'            '
	+'        </div>'
	+'    </div>'
	+'    <div class="bsearch">'
	//+'    	<img src="' + INL_inlineAds.path + 'tinylogo.png" width="14" height="13" class="tinylogo"/>'
	+'    '
	+'    	<div class="bsearchform">'
	+'        	<div class="clearpad">'
	+'            	<input type="text" onFocus="this.select()"  value="" name="query" class="bs" id="intext-popup-search-text"/>'
	+'              <input type="image" src="' + INL_inlineAds.path + 'btn_bsearch.png" alt="Search" class="bsb" id="intext-popup-search-submit" /></div>'
	+'        </div> '
	+'    </div>'
	+'</div>';
		holder.innerHTML = html;
		var body = document.getElementsByTagName('body')[0];        
		body.appendChild(holder);
		INL_inlineAds.bannerHolder = holder;
		
		holder.onmouseover = function(event) {
			INL_inlineAds.log('holder.onmouseover');
			if(INL_inlineAds.adHideTimer) {
				clearTimeout(INL_inlineAds.adHideTimer);
				INL_inlineAds.adHideTimer = null;
			}
		};
		holder.onmouseout = function(event) {
			INL_inlineAds.log('holder.onmouseout');
			if(INL_inlineAds.adHideTimer) {
				clearTimeout(INL_inlineAds.adHideTimer);
				INL_inlineAds.adHideTimer = null;
			}
			INL_inlineAds.adHideTimer = setTimeout(INL_inlineAds.hideAll, INL_inlineAds.hideAdDelay);
		};
		
		INL_inlineAds.addHandler(document.getElementById('intext-popup-close'), 'click', INL_inlineAds.hideAll);
		/*if(INL_inlineAds.showDisableLink == '1') {
			INL_inlineAds.addHandler(document.getElementById('intext-popup-disable'), 'click', function() {
				INL_inlineAds.hideAll();
				INL_inlineAds.disableAds();
			});
		}
		
		INL_inlineAds.addHandler(document.getElementById('intext-popup-adhere'), 'click', function() {
			INL_inlineAds.hideAll();
			INL_inlineAds.loadReferralLink();
		});
		*/
		INL_inlineAds.addHandler(document.getElementById('intext-popup-search-submit'), 'click', function() {
			INL_inlineAds.hideAll();
			var kw = document.getElementById("intext-popup-search-text").value,
				url = INL_inlineAds.searchUrl + INL_inlineAds.encodeUrlParam(kw);
			INL_inlineAds.redirect(url);
		});
	};

	INL_inlineAds.highlightNodes = function(nodes) {
		var currentNode, currentSubNode, text, matches, mainSpan, currentKeyword, newNode, pattern, nodeIndex, regexp,
			timer = new INL_inlineAds.timer(), highlightedNodesCount = 0;
		for (var index = 0; index < nodes.length; index++) {
			nodeIndex = nodes[index][0];
			currentNode = INL_inlineAds.textNodes[nodeIndex];
			if (typeof(currentNode) == 'undefined') {
				continue;
			}
			pattern = "(.*?[^\\waˆ™'-]|^)(" + nodes[index][1] + ")([^\\waˆ™'-].*|$)";
			regexp = new RegExp(pattern, "i");
			for (var subIndex = 0; subIndex < currentNode.length; subIndex++) {
				currentSubNode = currentNode[subIndex];
				text = currentSubNode.data.replace(/\s+/g, " ");
				matches = regexp.exec(text);
				if (matches == null || currentSubNode.parentNode.className == INL_inlineAds.admId) {
					continue;
				}
				mainSpan = document.createDocumentFragment();
				if (matches != null) {
					if(matches[2].length != '') {
						currentKeyword = matches[2];
						newNode = document.createTextNode(matches[1]);
						mainSpan.appendChild(newNode);
						INL_inlineAds.textNodes[nodeIndex][subIndex] = newNode;
					}
					mainSpan.appendChild(INL_inlineAds.insertSpan(document.createTextNode(currentKeyword)));
					if (matches[3].length != '') {
						newNode = document.createTextNode(matches[3]);
						mainSpan.appendChild(newNode);
						INL_inlineAds.textNodes[nodeIndex].push(newNode);
					}
					currentSubNode.parentNode.replaceChild(mainSpan, currentSubNode);
					break;
				}
			}
			highlightedNodesCount++;
			if (INL_inlineAds.keywordsCount && highlightedNodesCount >= INL_inlineAds.keywordsCount)
				break;
		}
	};

	INL_inlineAds.unHighlightWords = function() {
		var spans = document.getElementsByTagName('span');
		for(var i = 0; i < spans.length; i++) {
			var span = spans[i];
			if(span.className == INL_inlineAds.admId) {
				INL_inlineAds.detachAd(span);
				while(span.hasChildNodes()) {
					span.removeChild(span.lastChild);
				}
				span.innerHTML = span.keyword;
				span.style.color = '';
				span.style.cursor = '';
			}
		}
	};

	INL_inlineAds.correctPosition = function(element, event, x, y, width, height, offsetLeft, offsetRight, offsetTop, offsetBottom) {
		var scroll = INL_inlineAds.getScroll();
		if(x + width > Math.max(document.documentElement.clientWidth, document.body.clientWidth)) {
			x += offsetRight - width;
			INL_inlineAds.orientX = 'RIGHT';
		} else {
			x += offsetLeft;
			INL_inlineAds.orientX = 'LEFT';
		}
		var elementHeight = element.offsetHeight || parseInt(element.style.lineHeight);
		if(y - elementHeight - height > scroll.y) {
			INL_inlineAds.orientY = 'UP';
			y += offsetBottom - height;
		} else {
			INL_inlineAds.orientY = 'DOWN';
			y += offsetTop + elementHeight;
		}
		INL_inlineAds.log('x: ' + x + '; y: ' + y + '; orientX: ' + INL_inlineAds.orientX + '; orientY: ' + INL_inlineAds.orientY);
		return {x: parseInt(x), y: parseInt(y)};
	};

	INL_inlineAds.updateLoaderPosition = function(element, event) {
		var pos = INL_inlineAds.getElementPosition(element),
			y = pos.y - INL_inlineAds.loaderHeight,
			scroll = INL_inlineAds.getScroll();
		if(y < scroll.y) {
			y = pos.y + element.offsetHeight + 7;
		}
		INL_inlineAds.loaderHolder.style.top = y + 'px';
		INL_inlineAds.loaderHolder.style.left = pos.x + Math.floor(element.offsetWidth / 2 - INL_inlineAds.loaderWidth / 2) + 'px';
	};

	INL_inlineAds.updateBannerPosition = function(element, event) {
		var pos = INL_inlineAds.getElementPosition(element),
			correctPosition = INL_inlineAds.correctPosition(element, event, pos.x, pos.y, INL_inlineAds.bannerPopupWidth, INL_inlineAds.bannerHolder.scrollHeight, 0, 0, 0, 0);
		INL_inlineAds.bannerHolder.style.top = correctPosition.y + 'px';
		INL_inlineAds.bannerHolder.style.left = correctPosition.x + 'px';
	};

	INL_inlineAds.isBody = function(element) {
		return (/^(?:body|html)$/i).test(element.tagName);
	};

	INL_inlineAds.getScroll = function(element) {
		if(!element || INL_inlineAds.isBody(element)) {
			return {x: document.documentElement.scrollLeft || document.body.scrollLeft, y: document.documentElement.scrollTop || document.body.scrollTop}
		}
		else {
			return {x: element.scrollLeft, y: element.scrollTop};
		}
	};

	INL_inlineAds.getScrolls = function(element) {
		var position = {x: 0, y: 0};
		while(element && !INL_inlineAds.isBody(element)) {
			position.x += element.scrollLeft;
			position.y += element.scrollTop;
			element = element.offsetParent;
		}
		return position;
	};
		
	INL_inlineAds.getOffsets = function(element) {
		if(element.getBoundingClientRect) {
			var bound = element.getBoundingClientRect(),
				elemScrolls = INL_inlineAds.getScrolls(element),
				isFixed = element.style.position == 'fixed',
				htmlScroll = INL_inlineAds.getScroll(element.ownerDocument.documentElement);
			return {
				x: parseInt(bound.left) + elemScrolls.x + (isFixed? 0: htmlScroll.x) - document.body.clientLeft,
				y: parseInt(bound.top) + elemScrolls.y + (isFixed? 0: htmlScroll.y) - document.body.clientTop
			};
		}
		var position = {x: 0, y: 0};
		while(element && !INL_inlineAds.isBody(element)) {
			position.x += element.offsetLeft;
			position.y += element.offsetTop;
			element = element.offsetParent;
		}
		return position;
	};

	INL_inlineAds.getElementPosition = function(element) {
		var position = {x: 0, y: 0};
		if(!INL_inlineAds.isBody(element)) {
			var offsets = INL_inlineAds.getOffsets(element),
				scroll = INL_inlineAds.getScrolls(element);
			position.x = offsets.x - scroll.x;
			position.y = offsets.y - scroll.y;
		}
		return position;
	};

	INL_inlineAds.insertSpan = function(textNode) {
		var innerSpan = document.createElement('span');
		innerSpan.className = INL_inlineAds.admId;
		innerSpan.keyword = textNode.data;
		// IE Crash if color incorrect
		try {
			innerSpan.style.color = '#' + INL_inlineAds.highlightColor;
		} catch (e) {}
		innerSpan.style.borderBottom = (INL_inlineAds.underliningStyle == 'double'? '3px ': '1px ') + INL_inlineAds.underliningStyle;
		innerSpan.style.display = 'inline';
		innerSpan.style.padding = '0';
		innerSpan.style.margin = '0';
		innerSpan.style.cursor = 'pointer';
		innerSpan.appendChild(textNode);
		INL_inlineAds.attachAd(innerSpan);
		return innerSpan;
	};

	INL_inlineAds.attachAd = function(element) {
		element.orientY = 'top';
		if (INL_inlineAds.appearMethod == 'click') {
			INL_inlineAds.addHandler(element, 'click', INL_inlineAds.adOnClick);
		} else {
			INL_inlineAds.addHandler(element, 'mouseover', INL_inlineAds.adOnMouseOver);
			INL_inlineAds.addHandler(element, 'mouseout', INL_inlineAds.adOnMouseOut);
		}
	};

	INL_inlineAds.detachAd = function(element) {
		element.orientY = 'top';
		if(INL_inlineAds.appearMethod == 'click') {
			INL_inlineAds.removeHandler(element, 'click', INL_inlineAds.adOnClick);
		} else {
			INL_inlineAds.removeHandler(element, 'mouseover', INL_inlineAds.adOnMouseOver);
			INL_inlineAds.removeHandler(element, 'mouseout', INL_inlineAds.adOnMouseOut);
		}
	};

	INL_inlineAds.removeHandler = function(object, event, handler) {
		if(typeof object.removeEventListener != 'undefined') {
			object.removeEventListener(event, handler, false);
		}
		else if(typeof object.detachEvent != 'undefined') {
			object.detachEvent('on' + event, handler);
		}
	};

	INL_inlineAds.addHandler = function(object, event, handler) {
		if(typeof object.addEventListener != 'undefined') {
			object.addEventListener(event, handler, false);
		}
		else if(typeof object.attachEvent != 'undefined') {
			object.attachEvent('on' + event, handler);
		}
	};

	INL_inlineAds.adOnClick = function(event) {
		INL_inlineAds.adOnMouseOver(event);
	};

	INL_inlineAds.adOnMouseOver = function(event) {
		INL_inlineAds.log('adOnMouseOver');
		if(INL_inlineAds.adHideTimer) {
			clearTimeout(INL_inlineAds.adHideTimer);
			INL_inlineAds.adHideTimer = null;
		}
		
		var element = null;
		if(typeof(event) != 'undefined') {
			if(typeof(event.target) != 'undefined') {
				element = event.target;
			}
			else if (typeof(event.srcElement) != 'undefined') {
				element = event.srcElement;
			}
		}
		if(element) {
			if(element.className != INL_inlineAds.admId) {
				element = null
			}
		}
		if(element) {
			/*if(INL_inlineAds.displayingInProccess) {
				if(element != INL_inlineAds.lastElement) {
					INL_inlineAds.hideAll();
					INL_inlineAds.log('Show AD: finished');
				}
			}
			else*/ if(!(INL_inlineAds.isDisplayedAd && element == INL_inlineAds.lastElement)) {
				INL_inlineAds.hideAll();
				INL_inlineAds.displayingInProccess = true;
				INL_inlineAds.log('Show AD: starting');
				INL_inlineAds.lastElement = element;
				INL_inlineAds.lastEvent = event;
				INL_inlineAds.userQuery = element.keyword;
				INL_inlineAds.updateLoaderPosition(element, event);
				INL_inlineAds.showLoader();
				INL_inlineAds.getAds(element.keyword);
			}
		}
	};

	INL_inlineAds.adOnMouseOut = function(event) {
		INL_inlineAds.log('adOnMouseOut');
		if(INL_inlineAds.adHideTimer) {
			clearTimeout(INL_inlineAds.adHideTimer);
			INL_inlineAds.adHideTimer = null;
		}
		INL_inlineAds.adHideTimer = setTimeout(INL_inlineAds.hideAll, INL_inlineAds.hideAdDelay);
	};

	INL_inlineAds.startPageParsing = function() {
		INL_inlineAds.log('startPageParsing');
		if(INL_inlineAds.parsePage) {
			INL_inlineAds.parsingActive = true;
			INL_inlineAds.grabPage();
			INL_inlineAds.parsingActive = false;
		}
	};

	INL_inlineAds.prepareAds = function(jsonResponse) {
		INL_inlineAds.log('prepareAds: ' + jsonResponse);
		var nodes = eval('(' + jsonResponse + ')');
		if(typeof(nodes) != 'undefined') {
			INL_inlineAds.highlightNodes(nodes);
		}
	};

	INL_inlineAds.getAds = function(keyword) {
		INL_inlineAds.log('getAds ' + keyword);
		if (INL_inlineAds.adsCache[keyword]) {
			INL_inlineAds.log('getAds: picked from cache ' + keyword);
			INL_inlineAds.adsLoaded(INL_inlineAds.adsCache[keyword], keyword);
		} else {
			var requestUrl = INL_inlineAds.adsService +
				'?keywords=' + INL_inlineAds.encodeUrlParam(keyword) +
				'&id=' + INL_inlineAds.id +
				'&fid=' + INL_inlineAds.fid +
				'&subid=' + INL_inlineAds.encodeUrlParam(INL_inlineAds.subid) +
				'&count=' + INL_inlineAds.countLinks +
				'&referer=' + INL_inlineAds.encodeUrlParam(location.href) +
				'&categories=' + INL_inlineAds.encodeUrlParam(INL_inlineAds.categories) +
				'&size=' + INL_inlineAds.size +
				'&network=' + INL_inlineAds.encodeUrlParam(INL_inlineAds.network) +
				'&callback=INL_inlineAds.adsLoaded' +
				'&nocache=' + INL_inlineAds.time();
			INL_inlineAds.sendRequest(requestUrl);
		}
	};

	/* callback from INL_inlineAds.getAds */
	INL_inlineAds.adsLoaded = function(ads, keyword) {
		INL_inlineAds.log('adsLoaded: ' + ads);
		if (ads && ads[0]) {
			if (!INL_inlineAds.adsCache[keyword]) {
				INL_inlineAds.log('adsLoaded: cached ' + keyword);
				INL_inlineAds.adsCache[keyword] = ads;
			}
			if (INL_inlineAds.userQuery == keyword) {
				INL_inlineAds.clearAds();
				INL_inlineAds.appendAds(ads);
				INL_inlineAds.updateBannerPosition(INL_inlineAds.lastElement, INL_inlineAds.lastEvent);
				INL_inlineAds.showBanner();
				INL_inlineAds.updateBannerPosition(INL_inlineAds.lastElement, INL_inlineAds.lastEvent);
			}
		} else {
			INL_inlineAds.log('No Ads!');
			INL_inlineAds.hideLoader();
			INL_inlineAds.displayingInProccess = false;
			INL_inlineAds.log('Show AD: finished');
		}
	};

	INL_inlineAds.getUnderlines = function() {
		INL_inlineAds.log('getUnderlines');
		var requestUrl = INL_inlineAds.underlineService +
			'?callback=INL_inlineAds.prepareAds' +
			'&uuid=' + INL_inlineAds.uuid + 
			'&text=' + INL_inlineAds.encodeUrlParam(INL_inlineAds.textData);
		INL_inlineAds.sendRequest(requestUrl);
	};

	/* callback from INL_inlineAds.getUnderlines */
	INL_inlineAds.prepareAds = function(nodes) {
		INL_inlineAds.log('prepareAds: ' + nodes);
		if (nodes && nodes[0])
			INL_inlineAds.highlightNodes(nodes);
	};

	/* callback */
	INL_inlineAds.search = function(keyword) {
		if(keyword) {
			INL_inlineAds.log('search: ' + keyword);
			INL_inlineAds.redirect(INL_inlineAds.searchUrl + keyword);
		}
	};

	INL_inlineAds.stripUrl = function(url, maxLength) {
		if (url.length < maxLength)
			return url;
		INL_inlineAds.log('URL is too long - ' + url.length + '. It is stripped to ' + maxLength);
		url = url.substr(0, maxLength);
		var pos = url.length - 2;
		if (url.charAt(pos) != '%')
		{
			pos++;
			if (url.charAt(pos) != '%')
				return url;
		}
		// strip invalid sequence: % or %x
		return url.substr(0, pos);
	}

	INL_inlineAds.sendRequest = function(requestUrl) {
		requestUrl = INL_inlineAds.stripUrl(requestUrl, INL_inlineAds.maxUrlLength);
		INL_inlineAds.log('sendRequest: ' + requestUrl);
		var scriptElem = document.createElement("script");
		scriptElem.setAttribute("src", requestUrl);
		scriptElem.setAttribute("type",'text/javascript');
		document.getElementsByTagName("head")[0].appendChild(scriptElem);
	};

	INL_inlineAds.redirect = function(url) {
		INL_inlineAds.log('redirect');
		INL_inlineAds.hideAll();
		if(INL_inlineAds.isIe()) {
			var aLink = document.createElement("a");
			aLink.href = url;
			aLink.style.display = "none";
			aLink.target = "_top";
			document.body.appendChild(aLink);
			aLink.click();
		} else {
			window.location.href = url;
		}
	};

	INL_inlineAds.loadReferralLink = function() {
		INL_inlineAds.log('loadReferralLink');
		if(INL_inlineAds.referralUrl) {
			window.open(INL_inlineAds.referralUrl);
		}
	};

	INL_inlineAds.showLoader = function() {
		INL_inlineAds.log('showLoader');
		INL_inlineAds.showLoaderHolder();
	};

	INL_inlineAds.hideLoader = function() {
		INL_inlineAds.log('hideLoader');
		INL_inlineAds.hideLoaderHolder();
	};

	INL_inlineAds.showLoaderHolder = function() {
		INL_inlineAds.log('showLoaderHolder');
		INL_inlineAds.loaderHolder.style.width = INL_inlineAds.loaderWidth + 'px';
		INL_inlineAds.loaderHolder.style.height = INL_inlineAds.loaderHeight + 'px';
		INL_inlineAds.loaderHolder.style.visibility = 'visible';
	};


	INL_inlineAds.hideLoaderHolder = function() {
		INL_inlineAds.log('hideLoaderHolder');
		var scroll = INL_inlineAds.getScroll();
		INL_inlineAds.loaderHolder.style.visibility = 'hidden';
		INL_inlineAds.loaderHolder.style.left = scroll.x + 'px';
		INL_inlineAds.loaderHolder.style.top = scroll.y + 'px';
		INL_inlineAds.loaderHolder.style.width = '1px';
		INL_inlineAds.loaderHolder.style.height = '1px';
	};

	/* callback from hideAd */
	INL_inlineAds.hideAd = function() {
		INL_inlineAds.log('hideAd');
		INL_inlineAds.isDisplayedAd = false;
		INL_inlineAds.log('hideAd - Complete');
	};

	INL_inlineAds.showBanner = function() {
		INL_inlineAds.log('loadBanner');
		if(INL_inlineAds.adHideTimer) {
			clearTimeout(INL_inlineAds.adHideTimer);
			INL_inlineAds.adHideTimer = null;
		}
		INL_inlineAds.isLoadingBanner = true;
		document.getElementById('intext-popup-search-text').value = INL_inlineAds.userQuery;
		INL_inlineAds.log('showBanner');
		INL_inlineAds.bannerHolder.style.visibility = 'visible';
		INL_inlineAds.isDisplayedBanner = true;
		INL_inlineAds.isDisplayedAd = true;
		INL_inlineAds.hideLoader();
	};

	INL_inlineAds.hideBanner = function() {
		INL_inlineAds.log('hideBanner');
		INL_inlineAds.isDisplayedBanner = false;
		INL_inlineAds.bannerHolder.style.visibility = 'hidden';
	};

	INL_inlineAds.clearAds = function() {
		INL_inlineAds.log('clearAds');
		var contentElement = document.getElementById(INL_inlineAds.adContentId), index = 0;
		while (contentElement.hasChildNodes()) {
			var childElement = contentElement.childNodes[index];
			if (!childElement) {
				break;
			}
			if (childElement.className == INL_inlineAds.adEntityClass) {
				childElement.parentNode.removeChild(childElement);
				continue;
			}
			index++;
		}
	};

	INL_inlineAds.appendAds = function(ads) {
		INL_inlineAds.log('appendAds');
		var contentElement = document.getElementById(INL_inlineAds.adContentId);
		for (var i in ads) {
			if (ads[i].clickUrl) {
				var adEntity = document.createElement("DIV");
				adEntity.className = INL_inlineAds.adEntityClass;
				adEntity.innerHTML = //'<a href="' + ads[i].clickUrl + '"><img src="' + ads[i].image + '" /></a>'
					'<p class="title"><a href="' + ads[i].clickUrl + '">' + ads[i].title + '</a></p>'
					+'<p class="text">' + ads[i].descr + '</p>'
					+'<p class="text"><a href="' + ads[i].clickUrl + '">' + ads[i].host + '</a>' + '</p>';
				contentElement.appendChild(adEntity);
			}
		}
	};

	INL_inlineAds.hideAll = function() {
		INL_inlineAds.log('hideAll');
		INL_inlineAds.hideLoader();
		INL_inlineAds.hideBanner();
		INL_inlineAds.displayingInProccess = false;
		INL_inlineAds.isDisplayedAd = false;
	};

	INL_inlineAds.setDisableCookie = function () {
		var scriptElem = document.createElement("script");
		scriptElem.setAttribute("src", INL_inlineAds.path + 'setcookie.php');
		scriptElem.setAttribute("type",'text/javascript');
		document.getElementsByTagName("head")[0].appendChild(scriptElem);
	};

	INL_inlineAds.submitSessionForm = function () {
		if (!INL_inlineAds.firstTimeSafari) {
			INL_inlineAds.firstTimeSafari = true;
			document.getElementById("sessionform").submit();
		}
	};

	INL_inlineAds.isIe = function() {
		var result = false;
		if(navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent, re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if(re.exec(ua) != null) {
				result = parseFloat(RegExp.$1);
			}
		}
		return result;
	}

	INL_inlineAds.isSafari = function() {
		return (INL_inlineAds.isIe() || navigator.taintEnabled)? false: ((!!(document.evaluate))? ((!!(document.querySelector))? 525: 420): 419);
	};

	INL_inlineAds.isOpera = function() {
		return window.opera? ((arguments.callee.caller)? 960: ((document.getElementsByClassName)? 950 : 925)): false;
	};

	/* callback */
	INL_inlineAds.disableAds = function () {
		INL_inlineAds.log('disableAds');
		INL_inlineAds.hideAll();
		INL_inlineAds.unHighlightWords();
		if(INL_inlineAds.isSafari() || INL_inlineAds.isOpera()) {
			var cookiediv = document.createElement("cookiediv");
			cookiediv.id = 'cookiediv';
			cookiediv.style.display = 'none';
			cookiediv.innerHTML =
			'<iframe id="sessionframe"'
			+ ' name="sessionframe"'
			+ ' onload="INL_inlineAds.submitSessionForm()"'
			+ ' style="display:none;">'
			+'</iframe>'
			+'<form id="sessionform"'
			+ ' name="sessionform"'
			+ ' enctype="application/x-www-form-urlencoded"'
			+ ' action="' + INL_inlineAds.path + 'setcookie.php"'
			+ ' target="sessionframe">'
			+'</form>';
			document.body.appendChild(cookiediv);
		} else {
			INL_inlineAds.setDisableCookie();
		}
	};

	INL_inlineAds.log = function(text) {
		if (!INL_inlineAds.debug)
			return;
		if (window.console) {
			try {
				var msg = new Date().toLocaleTimeString() + ': ' + text;
				window.console.log(msg);
			}
			catch(e) {
			}
		}
	};
	INL_inlineAds.init();
}
///////////////////////////////////////////////////////////////////////////////

if (typeof(RXYO_keywordService) === 'undefined')
{
	var RXYO_keywordService = {};
	RXYO_keywordService.SearchEnginesRules = 
	{
		'google' : {'host_pattern' : 'google.', 
					'ref_regex' : /google\..+url.*?[&|?]q=([^&]+)/g, 
					'url_regex' : /google\..+.*?[&|?]q=([^&]+)/g},
		'bing' : {'host_pattern' : 'bing.com', 
				  'ref_regex' : /bing.com\/search.*[&|?]q=([^&]+)/g, 
				  'url_regex' : /bing.com\/search.*[&|?]q=([^&]+)/g },
		'yahoo' : {'host_pattern' : 'yahoo.', 
				   'ref_regex' : /search.yahoo.com\/search.+[&|?]+?p=([^&]*)/g, 
				   'url_regex' : /search.yahoo.com\/search.+[&|?]+?p=([^&]*)/g }
	};

	RXYO_keywordService.getMetaKeywordsTagContent = function()
	{
		var metaCollection = document.getElementsByTagName('meta');
		if (typeof(metaCollection) === 'undefined')
			return;
		for (var i = 0; i < metaCollection.length; i++)
		{
			var name = metaCollection.item(i).name.toLowerCase();
			if (name === 'keywords' && typeof(metaCollection.item(i).content) != 'undefined')
				return metaCollection.item(i).content;
		}
		return;
	}
	
	RXYO_keywordService.parseMetaKeywords = function()
	{
		/*
		var metaCollection = document.getElementsByTagName('meta');
		if (typeof(metaCollection) === 'undefined')
			return;
		if (metaCollection.namedItem('keywords') == null)
			return;
		var keywordsStr = metaCollection.namedItem('keywords').content;*/
		var keywordsStr = RXYO_keywordService.getMetaKeywordsTagContent;
		
		if (typeof(keywordsStr) === 'undefined' || keywordsStr === '')
			return;
		//check if comma is delimeter for keywords
		var ret = new Array(), delimeter = " ";
		if (jsTools.occurrences(keywordsStr, ","))
		{
			delimeter = ",";
		}
		else
		if (jsTools.occurrences(keywordsStr, ";"))
		{
			delimeter = ";";
		}
		else
		if (jsTools.occurrences(keywordsStr, "|"))
		{
			delimeter = "|";
		}
		var keywords = jsTools.splitTrim(keywordsStr, delimeter);
		//now filter keywords
		for (var i = 0; i < keywords.length; i++)
		{
			if (keywords[i].length >= 4)
				ret.push(keywords[i]);
		}
		return ret;
	};
	RXYO_keywordService.match = function(text, regexp)
	{
		if (regexp !== null)
		{
			var res = regexp.exec(text);				
			if (res !== null && res.length === 2 && res[1].length > 0)
			{
				return decodeURIComponent(res[1]);
			}
		}
		return null;
	};
	RXYO_keywordService.parseUrlAndReferrer = function()
	{
		var referrer = document.referrer, url = document.location.href;

		for (var ruleName in RXYO_keywordService.SearchEnginesRules)
		{
			var rule = RXYO_keywordService.SearchEnginesRules[ruleName];
			if(typeof(rule) === 'undefined')
				continue;
			var res = RXYO_keywordService.match(url, rule.url_regex);
			if (res !== null)
			{
				return res;
			}
			res = RXYO_keywordService.match(referrer, rule.ref_regex, res);
			if (res !== null)
			{
				return res;
			}
		}
		return '';
	};
	RXYO_keywordService.loadScript = function(url)
	{
		var script = document.createElement("script")
		script.type = "text/javascript";
		script.characterSet = "utf-8";
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);		
	}	
	RXYO_keywordService.queryFeed = function(feedId, feedSubId, keyword, count, callbackFunctionName)
	{
		//check if required values is defined
		if (typeof(window.RXYO_Config) === 'undefined')
		{
			return;
		}
		var feed_url = window.RXYO_Config.baseFeedUrl;
		feed_url += "?query=" + encodeURIComponent(keyword);
		//add id & subid if required
		if (typeof(feedId) !== 'undefined' && feedId !== null)
		{
			feed_url += "&feed=" + feedId;
		}		
		if (typeof(feedSubId) !== 'undefined' && feedSubId !== null)
		{
			feed_url += "&subid=" + feedSubId;
		}
		if (document.location.href !== 'undefined' && document.location.href !== null)
		{
			feed_url += "&url=" + encodeURIComponent(document.location.href);
		}
		feed_url += "&user_ip=caller&ua=caller&count=" + count + "&format=json&callback=" + callbackFunctionName;
		jsTools.log(feed_url);
		RXYO_keywordService.loadScript(feed_url);
	};
}
///////////////////////////////////////////////////////////////////////////////
window.RXYO_Config = {};
window.RXYO_Config.baseFeedUrl = 'http://' + window.INLDM_cfg.fddm + '/search';
window.RXYO_Config.feeds = [ {'id' : window.INLDM_cfg.fd , 'SimpleShowProb' : 0, 'subId' : 'dommatch' , 'KwType' : '$domain_and_script$'} ];

if (typeof(RXYO_Interstitial) === 'undefined')
{
	RXYO_Interstitial = {};
	RXYO_Interstitial.index = 0; //index of current info in feeds array
	RXYO_Interstitial.keyword = '';
	RXYO_Interstitial.kwMode = '';
	
	RXYO_Interstitial.RXYO_SelectKeyword = function()
	{	
		//check if required values is defined
		if (typeof(window.RXYO_Config) === 'undefined')
		{
			return '';
		}
		var keyword = '';
		RXYO_Interstitial.kwMode = window.RXYO_Config.feeds[RXYO_Interstitial.index].KwType;
		
		if (RXYO_Interstitial.kwMode == '$meta_random$' || RXYO_Interstitial.kwMode == '$seq_or_meta_random$' || RXYO_Interstitial.kwMode == '')
		{
			if (RXYO_Interstitial.kwMode == '$seq_or_meta_random$')
			{
				keyword = RXYO_keywordService.parseUrlAndReferrer();
			}
			if (keyword === '')
			{
				var keywords = RXYO_keywordService.parseMetaKeywords();
				if (typeof(keywords) !== 'undefined' && 
					typeof(keywords.length) !== 'undefined' && 
					keywords.length >= 1)
				{
					keywords.sort(function(a,b){return 0.5 - Math.random()});
					keyword = keywords[0];
				}
			}
		}
		else
		if (RXYO_Interstitial.kwMode == '$domain_and_script$')
		{
			var oUrl = jsTools.parseUri(document.location.href);
			keyword = oUrl.host + jsTools.stripTrailingSlash(oUrl.directory);
		}
		jsTools.log("keyword is '" + keyword + "'");
		return keyword;
	}
	RXYO_Interstitial.compareDomains = function(domain1, domain2)
	{
		domain1 = domain1.toLowerCase();
		domain2 = domain2.toLowerCase();
		if (domain1 === domain2)
			return true;
		var dp1 = domain1.split('.').reverse(),
			dp2 = domain2.split('.').reverse();
		if (dp1.length < 2 ||dp2.length < 2)
			return false;
		//make first array has more entries
		if (dp1.length < dp2.length)
		{
			var dpt = dp2;
			dp2 = dp1;
			dp1 = dpt;
		}
		var index = 0;
		while (dp1[index] == dp2[index]) index++;
		
		if (dp1.length - index > 1)
			return false;

		if (dp1.length == dp2.length && 
			dp1[index].length <= 3 && 
			dp2[index].length <= 3)
		return true;
		
		if (dp1.length - index == 1 && dp1[index].length <= 3)
			return true;
		return false;
	}
	RXYO_Interstitial.QueryFeed = function()
	{
		var feedId = window.RXYO_Config.feeds[RXYO_Interstitial.index].id;
		if (feedId != 0)
		{
			var feedSubId = window.RXYO_Config.feeds[RXYO_Interstitial.index].subId;
			RXYO_Interstitial.keyword = RXYO_Interstitial.RXYO_SelectKeyword();
			if (RXYO_Interstitial.keyword != '')
			{
				RXYO_keywordService.queryFeed(feedId, feedSubId, RXYO_Interstitial.keyword, 10, "RXYO_Interstitial.DoInterstitial");
				return true;
			}
		}
		//simething wrong - switch to next feed
		RXYO_Interstitial.DoInterstitial();
	}
	RXYO_Interstitial.SetFailFlag = function()
	{
		if (typeof(window.RXYO_Config.failedShowElementId) !== 'undefined')
		{
			var failEl  = document.createElement("input")
			failEl.id = window.RXYO_Config.failedShowElementId;
			failEl.type = "hidden";
			document.body.appendChild(failEl);
			failEl.setAttribute("value","0");
		}
	}	
	RXYO_Interstitial.SetSuccessFlag = function()
	{
		if (typeof(window.RXYO_Config.sucessShowDelayElementId) !== 'undefined' &&
			typeof(window.RXYO_Config.sucessShowDelayElementValue) !== 'undefined')
		{
			var succEl  = document.createElement("input")
			succEl.id = window.RXYO_Config.sucessShowDelayElementId;
			succEl.type = "hidden";
			document.body.appendChild(succEl);
			succEl.setAttribute("value",window.RXYO_Config.sucessShowDelayElementValue);
		}
	}	
	RXYO_Interstitial.remoteLogging = function(text)
	{
		if (typeof(window.RXYO_Config.loggingSvc) === 'undefined' || typeof(text) === 'undefined')
			return;
		var logUrl = window.RXYO_Config.loggingSvc + encodeURIComponent(text);
		RXYO_keywordService.loadScript(logUrl);
	}
	RXYO_Interstitial.switchToNextFeed = function()
	{
		//check if next feed in array is available
		if (RXYO_Interstitial.index < window.RXYO_Config.feeds.length-1)
		{
			jsTools.log('RXYO_Interstitial.switchToNextFeed - switching to next feed');
			RXYO_Interstitial.index++;
			return true;
		}
		jsTools.log('RXYO_Interstitial.switchToNextFeed - no feeds left');
		return false;
	}
	RXYO_Interstitial.DoInterstitial = function(rs)
	{
		if (typeof(rs) === 'undefined' || 
			typeof(rs.result) === 'undefined' ||
			typeof(rs.result.listing) === 'undefined' ||
			rs.result.listing.length === 0)
		{
			//check if next feed in array is available
			if (RXYO_Interstitial.switchToNextFeed())
			{
				RXYO_Interstitial.QueryFeed();
			}
			else
			//set 'fail' flag to decrese htmlinjection counter
			{
				jsTools.log('setting fail flag');
				RXYO_Interstitial.SetFailFlag();
			}			
			return;
		}			
		//check if some of ads related to current domain
		var domainMatchAd = false,
			domain = document.location.host;
		for (var i = 0; i < rs.result.listing.length; i++)
		{
			var adDomain = rs.result.listing[i].site;
			if (RXYO_Interstitial.compareDomains(adDomain,domain))
			{
				jsTools.log('found domain-matching ad');
				rs = { "result" : { "listing" : [ rs.result.listing[i] ] } };
				var log = "keyword:[" + RXYO_Interstitial.keyword + "] domain:[" + domain + "]";
				domainMatchAd = true;
				RXYO_Interstitial.remoteLogging(log);
			}
		}
		//if no matching ad and mode is $domain_and_script$' - switch to next feed
		if (RXYO_Interstitial.kwMode === '$domain_and_script$' && !domainMatchAd)
		{
			jsTools.log('not found domain-matching ad - not showing');
			RXYO_Interstitial.DoInterstitial();
			return;
		}
		aaIntersObj.initAd(rs.result.listing);
		aaIntersObj.showAd();
		RXYO_Interstitial.SetSuccessFlag();		
		jsTools.createCookie('RXYO_dailyMark','xkcd',1);
	}
	RXYO_Interstitial.Do = function(init)
	{
		var dailyMark = jsTools.readCookie('RXYO_dailyMark');
		if (dailyMark != null)
		{
			jsTools.log('advertisement is already shown on this domain');
			RXYO_Interstitial.SetFailFlag();
			return;
 		}
		var isIE6 = navigator.userAgent.toLowerCase().search("msie 6") > -1;
		//disable on IE6
		if (isIE6)
		{
			jsTools.log('don\'t start on unsupported ie/modes');
			RXYO_Interstitial.SetSuccessFlag();
			return;
		}
		RXYO_Interstitial.QueryFeed();
	}
	RXYO_Interstitial.Do(true);
}