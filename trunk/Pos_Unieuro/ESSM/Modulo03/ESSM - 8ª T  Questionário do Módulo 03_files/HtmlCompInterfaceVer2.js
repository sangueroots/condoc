/*HTML Component API*/
/*
* Crypto-JS v2.3.0
* http://code.google.com/p/crypto-js/
* Copyright (c) 2011, Jeff Mott. All rights reserved.
* http://code.google.com/p/crypto-js/wiki/License
*/
if (typeof Crypto == "undefined" || !Crypto.util) (function () {
    var n = window.Crypto = {}, o = n.util = { rotl: function (g, i) { return g << i | g >>> 32 - i }, rotr: function (g, i) { return g << 32 - i | g >>> i }, endian: function (g) { if (g.constructor == Number) return o.rotl(g, 8) & 16711935 | o.rotl(g, 24) & 4278255360; for (var i = 0; i < g.length; i++) g[i] = o.endian(g[i]); return g }, randomBytes: function (g) { for (var i = []; g > 0; g--) i.push(Math.floor(Math.random() * 256)); return i }, bytesToWords: function (g) {
        for (var i = [], h = 0, a = 0; h < g.length; h++, a += 8) i[a >>> 5] |= g[h] << 24 -
a % 32; return i
    }, wordsToBytes: function (g) { for (var i = [], h = 0; h < g.length * 32; h += 8) i.push(g[h >>> 5] >>> 24 - h % 32 & 255); return i }, bytesToHex: function (g) { for (var i = [], h = 0; h < g.length; h++) { i.push((g[h] >>> 4).toString(16)); i.push((g[h] & 15).toString(16)) } return i.join("") }, hexToBytes: function (g) { for (var i = [], h = 0; h < g.length; h += 2) i.push(parseInt(g.substr(h, 2), 16)); return i }, bytesToBase64: function (g) {
        if (typeof btoa == "function") return btoa(p.bytesToString(g)); for (var i = [], h = 0; h < g.length; h += 3) for (var a = g[h] << 16 | g[h + 1] <<
8 | g[h + 2], b = 0; b < 4; b++) h * 8 + b * 6 <= g.length * 8 ? i.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 6 * (3 - b) & 63)) : i.push("="); return i.join("")
    }, base64ToBytes: function (g) {
        if (typeof atob == "function") return p.stringToBytes(atob(g)); g = g.replace(/[^A-Z0-9+\/]/ig, ""); for (var i = [], h = 0, a = 0; h < g.length; a = ++h % 4) a != 0 && i.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(g.charAt(h - 1)) & Math.pow(2, -2 * a + 8) - 1) << a * 2 | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(g.charAt(h)) >>>
6 - a * 2); return i
    } 
    }; n = n.charenc = {}; n.UTF8 = { stringToBytes: function (g) { return p.stringToBytes(unescape(encodeURIComponent(g))) }, bytesToString: function (g) { return decodeURIComponent(escape(p.bytesToString(g))) } }; var p = n.Binary = { stringToBytes: function (g) { for (var i = [], h = 0; h < g.length; h++) i.push(g.charCodeAt(h) & 255); return i }, bytesToString: function (g) { for (var i = [], h = 0; h < g.length; h++) i.push(String.fromCharCode(g[h])); return i.join("") } }
})();
(function () {
    var n = Crypto, o = n.util, p = n.charenc, g = p.UTF8, i = p.Binary, h = n.MD5 = function (a, b) { var j = o.wordsToBytes(h._md5(a)); return b && b.asBytes ? j : b && b.asString ? i.bytesToString(j) : o.bytesToHex(j) }; h._md5 = function (a) {
        if (a.constructor == String) a = g.stringToBytes(a); var b = o.bytesToWords(a), j = a.length * 8; a = 1732584193; for (var d = -271733879, e = -1732584194, c = 271733878, f = 0; f < b.length; f++) b[f] = (b[f] << 8 | b[f] >>> 24) & 16711935 | (b[f] << 24 | b[f] >>> 8) & 4278255360; b[j >>> 5] |= 128 << j % 32; b[(j + 64 >>> 9 << 4) + 14] = j; j = h._ff; var k = h._gg, l =
h._hh, m = h._ii; for (f = 0; f < b.length; f += 16) {
            var q = a, r = d, s = e, t = c; a = j(a, d, e, c, b[f + 0], 7, -680876936); c = j(c, a, d, e, b[f + 1], 12, -389564586); e = j(e, c, a, d, b[f + 2], 17, 606105819); d = j(d, e, c, a, b[f + 3], 22, -1044525330); a = j(a, d, e, c, b[f + 4], 7, -176418897); c = j(c, a, d, e, b[f + 5], 12, 1200080426); e = j(e, c, a, d, b[f + 6], 17, -1473231341); d = j(d, e, c, a, b[f + 7], 22, -45705983); a = j(a, d, e, c, b[f + 8], 7, 1770035416); c = j(c, a, d, e, b[f + 9], 12, -1958414417); e = j(e, c, a, d, b[f + 10], 17, -42063); d = j(d, e, c, a, b[f + 11], 22, -1990404162); a = j(a, d, e, c, b[f + 12], 7, 1804603682); c =
j(c, a, d, e, b[f + 13], 12, -40341101); e = j(e, c, a, d, b[f + 14], 17, -1502002290); d = j(d, e, c, a, b[f + 15], 22, 1236535329); a = k(a, d, e, c, b[f + 1], 5, -165796510); c = k(c, a, d, e, b[f + 6], 9, -1069501632); e = k(e, c, a, d, b[f + 11], 14, 643717713); d = k(d, e, c, a, b[f + 0], 20, -373897302); a = k(a, d, e, c, b[f + 5], 5, -701558691); c = k(c, a, d, e, b[f + 10], 9, 38016083); e = k(e, c, a, d, b[f + 15], 14, -660478335); d = k(d, e, c, a, b[f + 4], 20, -405537848); a = k(a, d, e, c, b[f + 9], 5, 568446438); c = k(c, a, d, e, b[f + 14], 9, -1019803690); e = k(e, c, a, d, b[f + 3], 14, -187363961); d = k(d, e, c, a, b[f + 8], 20, 1163531501);
            a = k(a, d, e, c, b[f + 13], 5, -1444681467); c = k(c, a, d, e, b[f + 2], 9, -51403784); e = k(e, c, a, d, b[f + 7], 14, 1735328473); d = k(d, e, c, a, b[f + 12], 20, -1926607734); a = l(a, d, e, c, b[f + 5], 4, -378558); c = l(c, a, d, e, b[f + 8], 11, -2022574463); e = l(e, c, a, d, b[f + 11], 16, 1839030562); d = l(d, e, c, a, b[f + 14], 23, -35309556); a = l(a, d, e, c, b[f + 1], 4, -1530992060); c = l(c, a, d, e, b[f + 4], 11, 1272893353); e = l(e, c, a, d, b[f + 7], 16, -155497632); d = l(d, e, c, a, b[f + 10], 23, -1094730640); a = l(a, d, e, c, b[f + 13], 4, 681279174); c = l(c, a, d, e, b[f + 0], 11, -358537222); e = l(e, c, a, d, b[f + 3], 16, -722521979);
            d = l(d, e, c, a, b[f + 6], 23, 76029189); a = l(a, d, e, c, b[f + 9], 4, -640364487); c = l(c, a, d, e, b[f + 12], 11, -421815835); e = l(e, c, a, d, b[f + 15], 16, 530742520); d = l(d, e, c, a, b[f + 2], 23, -995338651); a = m(a, d, e, c, b[f + 0], 6, -198630844); c = m(c, a, d, e, b[f + 7], 10, 1126891415); e = m(e, c, a, d, b[f + 14], 15, -1416354905); d = m(d, e, c, a, b[f + 5], 21, -57434055); a = m(a, d, e, c, b[f + 12], 6, 1700485571); c = m(c, a, d, e, b[f + 3], 10, -1894986606); e = m(e, c, a, d, b[f + 10], 15, -1051523); d = m(d, e, c, a, b[f + 1], 21, -2054922799); a = m(a, d, e, c, b[f + 8], 6, 1873313359); c = m(c, a, d, e, b[f + 15], 10, -30611744);
            e = m(e, c, a, d, b[f + 6], 15, -1560198380); d = m(d, e, c, a, b[f + 13], 21, 1309151649); a = m(a, d, e, c, b[f + 4], 6, -145523070); c = m(c, a, d, e, b[f + 11], 10, -1120210379); e = m(e, c, a, d, b[f + 2], 15, 718787259); d = m(d, e, c, a, b[f + 9], 21, -343485551); a = a + q >>> 0; d = d + r >>> 0; e = e + s >>> 0; c = c + t >>> 0
        } return o.endian([a, d, e, c])
    }; h._ff = function (a, b, j, d, e, c, f) { a = a + (b & j | ~b & d) + (e >>> 0) + f; return (a << c | a >>> 32 - c) + b }; h._gg = function (a, b, j, d, e, c, f) { a = a + (b & d | j & ~d) + (e >>> 0) + f; return (a << c | a >>> 32 - c) + b }; h._hh = function (a, b, j, d, e, c, f) {
        a = a + (b ^ j ^ d) + (e >>> 0) + f; return (a << c | a >>>
32 - c) + b
    }; h._ii = function (a, b, j, d, e, c, f) { a = a + (j ^ (b | ~d)) + (e >>> 0) + f; return (a << c | a >>> 32 - c) + b }; h._blocksize = 16; h._digestsize = 16
})();

var WIDDIT_API_DEBUG=false;

/****************************************************** GENERAL FUNCTIONS ****************************************************/

//delay function 
function sleep(naptimeInMilli){
        //naptime = naptime * 1000;
		var naptime=naptimeInMilli;
        var sleeping = true;
        var now = new Date();
        var alarm;
        var startingMSeconds = now.getTime();
        //alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
        while(sleeping){
            alarm = new Date();
            alarmMSeconds = alarm.getTime();
            if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
        }        
        //alert("Wakeup!");
}

// cookie handler


function wtb_createCookieOnCurrentDomain(name, value, days) {
    //save cookie on the local domain

    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
    //alert(name+"="+escape(value)+expires+"; path=/");

};


function wtb_readCookieFromCurrentDomain(name) {
    var dc = document.cookie;
    var cname = name + "=";
    var end = -1;

    if (dc.length > 0) {
        begin = dc.toString().indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            //end = dc.indexOf(";", begin);
            //b.substring(begin).substring(0,b.substring(begin).indexOf(";"));
            //end=-1;
            end = dc.toString().substring(begin).indexOf(";");

            if (end == -1) {
                end = dc.length;
            } else {
                end = end + begin;
            }
            //alert(dc.substring(begin, end));
            return unescape(dc.substring(begin, end));
        }

    }
    return null; 

}

	
	
	
// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
var IE = document.all?true:false;
var isIE = (navigator.userAgent.indexOf('MSIE') > 0);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


// If NS -- that is, !IE -- then set up for mouse capture
if ((!IE) && (document.captureEvents)) {document.captureEvents(Event.MOUSEMOVE);}

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s
var tempX = 0;
var tempY = 0;

// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
	try{
		if (IE) { // grab the x-y pos.s if browser is IE
				tempX = event.clientX + document.body.scrollLeft;
				tempY = event.clientY + document.body.scrollTop;
			} else {  // grab the x-y pos.s if browser is NS
				tempX = e.pageX;
				tempY = e.pageY;
		}  
	// catch possible negative values in NS4
	if (tempX < 0){tempX = 0};
	if (tempY < 0){tempY = 0};
  }catch(e) { }
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  //document.Show.MouseX.value = tempX
  //document.Show.MouseY.value = tempY
  return true;
}

/*********************************************************************************************************************************/

// Function wrapping code.
// fn - reference to function.
// context - what you want "this" to be.
// params - array of parameters to pass to function.
var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}
// Create an array and append your functions to them
var funqueue = [];



//var bho = null;
//var hash;
var floatingWindowId;

if (typeof toolbarArray == 'undefined') {
    toolbarArray = new Array();
    toolbarHashArray = new Array();
}


if (typeof toolbarArrayIndex == 'undefined') {
    toolbarArrayIndex = 0;
}
/*

/*
function GetVersionInfo(hash) {
    try {
        var obj = bho.GetInfo(hash);
        alert('after')
        if (obj == null) {
            alert('Unable to get toolbar info object');
            return;
        }
        alert('Toolbar name: ' + obj.toolbarName + ' Toolbar version: ' + obj.toolbarVersion + ' OS Name: ' + obj.osName + ' OS Ver: ' + obj.osVersion + ' Browser Name: ' + obj.browserName + ' Browser Ver: ' + obj.browserVersion + ' TB size: ' + obj.toolbarSize + ' AppID: ' + obj.appID);
    }
    catch (e) {
        alert(e);
    }
}
*/

/****************** chrome handling *************************************/

var isChrome = false;
var channel = null;
/*
var customEvent = document.createEvent('Event');
customEvent.initEvent('myCustomEvent', true, true);
*/
function GetFrameWindow()
{
    var f = document.getElementById('widdit-toolbar');
    return f.contentWindow;
}

var chromeToolbarInfoObj = null;
var chromeSharedCacheDiction = [];



function fireCustomEvent(data) 
{
    try
    {
        /*
        var hiddenDiv = document.getElementById('myCustomEventDiv');
        //hiddenDiv.innerText = data
        var o = new Object();
        o.x = 'hello object';
        //hiddenDiv.setAttribute('attname', 'attvalue');
        hiddenDiv.setAttribute('attname', o);
        hiddenDiv.dispatchEvent(customEvent);
        
        //alert(hiddenDiv.getAttribute('attname'))
        //alert(hiddenDiv.getAttribute('returnvalue'));
        */
        
        
        if(!channel)
        {
            var w = GetFrameWindow();
            channel = w.document.getElementById('myCustomEventDiv');
        }
        
        if(channel)
        {
            if (WIDDIT_API_DEBUG) alert('about to dispatch event')
            channel.dispatchEvent(customEvent);
        }
  }
  catch(e)
  {
    if (WIDDIT_API_DEBUG) alert(e)
  }
}
var chromePhraseVarA='';
var chromePhraseVarB='';
//2=ready
var CHROME_INIT_STATUS=0;
var DID_POP_GLOBAL_KEYS=false;
var DID_POP_TOOLBAR_INFO=false;

   function functionObject(buttonObj)
        {
        	try
        	{
        		this.functionName = new String();
        		this.hash = new String();
        		this.param1;
        		this.param2;
        		this.param3;
        		this.param4;
        		this.param5;
        		this.param6;
        		this.param7;
        		this.param8;
        	}
        	catch(e)
        	{
        	}					
        }
if(navigator.userAgent.toLowerCase().indexOf("chrome") >=0){ 
		
	window.addEventListener("message", function(event) 
	{ 
    try
    {
        if(event.data.functionName == 'initialize')
        {
				isChrome = true;
				SetBhoInstance(event.data.param1, event.source);
			//if (toolbarArrayIndex>0){
				var bho=event.source;
				var hash=event.data.param1;
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'initialize-complete';
				MakePost(bho,f,'*');
				var f2 = new functionObject();
				f2.hash = hash;
				f2.functionName = 'populate-cache-info';
				MakePost(bho,f2,'*');
				
				var f3 = new functionObject();
				f3.hash = hash;
				f3.functionName = 'RetrieveAllGlobalKeys';
				MakePost(bho,f3,'*');
				
				return;
			//}
        }
		/*
        else if(event.data.functionName == 'CreateFloatingWindow-parent')
        {
            //alert('create floating window')
            OpenFloatingWindow(document, event.data.param6, event.data.param1, event.data.param2, event.data.param3, event.data.param4);
            
        }
        else if(event.data.functionName == 'UpdateFloatingWindow-parent')
        {
    		var doc = document;
    		
    		var f = doc.getElementById(event.data.param1);
    		if(f)
    		{
    			f.style.width = event.data.param3;
    			f.style.height = event.data.param4;
    			f.src = event.data.param2;
    		}
        }
        else if(event.data.functionName == 'CloseFloatingWindow-parent')
        {
		*/
            /*
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'CloseFloatingWindow';
            f.param1 = new String(floatingWindowId);
            MakePost(bho,f,'*');*/
           /* 
            var doc = document;
		
            var e = doc.getElementById(event.data.param1);
            if(e)
            {
            	e.style.display = 'none';
            }
        
            
        }
        else if(event.data.functionName == 'getFloatingWindow-parent')
        {
            var doc = document;
            var frm = doc.getElementById(event.data.param1);
            if(frm)
            {
                var e = frm.contentWindow.document.createElement('span');
                e.innerHTML = "Development Rocks";
                e.style.color = 'red';
                
                frm.contentWindow.document.getElementsByTagName('body')[0].appendChild(document.createElement('br'));
                frm.contentWindow.document.getElementsByTagName('body')[0].appendChild(e);
                frm.contentWindow.document.getElementsByTagName('body')[0].appendChild(document.createElement('br'));
           
            
            }
        }*/
        else if(event.data.functionName == 'RefreshFloatingWindow-parent')
        {
            var doc = document;
            		
    		var f = doc.getElementById(event.data.param1);
    		if(f)
    		{
    			f.contentWindow.location.reload();     		
    		}                  
        }
        else if(event.data.functionName == 'genericmessage-parent')
        {
            if (WIDDIT_API_DEBUG) alert('Return value is: ' + event.data.param1);
        }
        else if(event.data.functionName == 'display-search-term')
        {
            if (WIDDIT_API_DEBUG) alert('search term is: ' + event.data.param1);
        }
        else if(event.data.functionName == 'show-file-content-parent')
        {
            if (WIDDIT_API_DEBUG) alert('content of the file is: ' + event.data.param1);
        }
        else if(event.data.functionName == 'toolbar-info-parent')
        {
            var obj = JSON.parse(event.data.param1)
            if (WIDDIT_API_DEBUG)  alert('Toolbar name: ' + obj.toolbarName + ' \rToolbar version: ' + obj.toolbarVersion + ' \rOS Name: ' + obj.osName + ' \rOS Ver: ' + obj.osVersion + ' \rBrowser Name: ' + obj.browserName + ' \rBrowser Ver: ' + obj.browserVersion + ' \rTB size: ' + obj.toolbarSize + ' \rAppID: ' + obj.appID);
        }else if (event.data.functionName == 'populate-cache-info-parent'){
            chromeToolbarInfoObj = JSON.parse(event.data.param1)
			
			if (!DID_POP_TOOLBAR_INFO) {DID_POP_TOOLBAR_INFO=true;CHROME_INIT_STATUS++;}
			
			if (CHROME_INIT_STATUS==2){
				WidditWindowAddLoadEvent(function () { WidditWindowAddLoadEvent(function () { DocumentChanged(); }); if (typeof InterfaceReady=='function'){	setTimeout('InterfaceReady()',50);IS_INTERFACE_READY=true;}});
				/*
				if (typeof InterfaceReady=='function'){
					setTimeout('InterfaceReady()',50);
					WidditWindowAddLoadEvent(function () { DocumentChanged(); });
					IS_INTERFACE_READY=true;
				}*/

			}
			
        }else if (event.data.functionName == 'RetrieveAllGlobalKeys-parent'){
			var allItemsStr=event.data.param1;
			var itemsArray=allItemsStr.split(";"); 
			for (i=0;i<itemsArray.length;i++){
				var pairArray=itemsArray[i].split("="); 
				chromeSharedCacheDiction['Global_'+pairArray[0].toUpperCase()]=pairArray[1];
			}
			if (!DID_POP_GLOBAL_KEYS) {DID_POP_GLOBAL_KEYS=true;CHROME_INIT_STATUS++;}

			if (CHROME_INIT_STATUS==2){
			
					WidditWindowAddLoadEvent(function () { WidditWindowAddLoadEvent(function () { DocumentChanged(); }); if (typeof InterfaceReady=='function'){	setTimeout('InterfaceReady()',50);IS_INTERFACE_READY=true;}});
				/*
				if (typeof InterfaceReady=='function'){
					setTimeout('InterfaceReady()',50);
					WidditWindowAddLoadEvent(function () { DocumentChanged(); });
					IS_INTERFACE_READY=true;
				}*/

			}
		}
		else if(event.data.functionName == 'DocumentComplete')
        {
			DocumentChanged();
        }
		
		else if(event.data.functionName == 'listener_message')
        {
			if (typeof AcceptMessage=='function'){
				AcceptMessage(event.data.param1, event.data.param2);
			}
			if (typeof MessageReceived=='function'){
				MessageReceived(event.data.param1, event.data.param2);
			}
        }
        else if(event.data.functionName == 'global_key_changed')
        {
			if (typeof SharedKeyChanged=='function'){
				SharedKeyChanged(event.data.param1, event.data.param2, event.data.param3);
			}
        }
        else if(event.data.functionName == 'local_key_changed')
        {
			if (typeof LocalKeyUpdate=='function'){
				LocalKeyUpdate(event.data.param1, event.data.param2, event.data.param3)
			}
			if (typeof KeyChanged=='function'){
				KeyChanged(event.data.param1, event.data.param2, event.data.param3)
			}
        }
        else if(event.data.functionName == 'search_term_changed')
        {
			//if (typeof MessageReceived=='function'){

        }
	    else if(event.data.functionName == 'ParseResponse')
        {	
			chromePhraseVarA=event.data.param1;
			chromePhraseVarB=event.data.param2;
			var evalString=event.data.param3+'(chromePhraseVarA,chromePhraseVarB);';
			eval(evalString);
        }
		
    }
    catch(e)
    {
        //alert('test page error = ' + e);
    }



	}, false); 
}



function ChromeLoad()
{
    //fireCustomEvent('Hello Chrome');
}

/*
var div = document.createElement('div');
	div.setAttribute('id', 'widdit-init-div');
	div.setAttribute('onwidditevent', 'SetBhoChrome();');
	document.getElementsByTagName('body')[0].appendChild(div);
*/	

/*end chrome handling */

function reverse(str) {
    var arr = [];

    for (var i = 0, len = str.length; i <= len; i++) {
        arr.push(str.charAt(len - i))
    }

    return arr.join('');
}

function widdit_whichBrs() 
{
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("opera") != -1) return 'Opera';
    if (agt.indexOf("staroffice") != -1) return 'Star Office';
    if (agt.indexOf("webtv") != -1) return 'WebTV';
    if (agt.indexOf("beonex") != -1) return 'Beonex';
    if (agt.indexOf("chimera") != -1) return 'Chimera';
    if (agt.indexOf("netpositive") != -1) return 'NetPositive';
    if (agt.indexOf("phoenix") != -1) return 'Phoenix';
    if (agt.indexOf("firefox") != -1) return 'Firefox';
    if (agt.indexOf("safari") != -1) return 'Safari';
    if (agt.indexOf("skipstone") != -1) return 'SkipStone';
    if (agt.indexOf("msie") != -1) return 'Internet Explorer';
    if (agt.indexOf("netscape") != -1) return 'Netscape';
    if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    if (agt.indexOf('\/') != -1) {
    if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
    return navigator.userAgent.substr(0,agt.indexOf('\/'));}
    else return 'Netscape';} else if (agt.indexOf(' ') != -1)
    return navigator.userAgent.substr(0,agt.indexOf(' '));
    else return navigator.userAgent;
}

var IS_INTERFACE_READY = false;
function SetBhoInstance(a, b) {
    try {
		var bho=null;
		var hash;
        bho = b;

        // take passed id and reverse
        var rev = reverse(a);

        rev = rev.substr(0, rev.length - 1);

        hash = Crypto.MD5(rev);
        toolbarArray[toolbarArrayIndex] = bho;
        toolbarHashArray[toolbarArrayIndex] = hash;
		toolbarArrayIndex++;

		
		
		if (!isChrome){
			WidditWindowAddLoadEvent(function () { if (typeof InterfaceReady=='function'){	setTimeout('InterfaceReady()',50);IS_INTERFACE_READY=true;}});
			/*
			if (typeof InterfaceReady=='function'){
				setTimeout('InterfaceReady()',50);
				IS_INTERFACE_READY=true;
			}*/
		}


		// Remove and execute all items in the array
		//if there are waiting functions to be execute - execute them
		while (funqueue.length > 0) {
			(funqueue.shift())();   
		}


    }
    catch (e) {
        if (WIDDIT_API_DEBUG)  alert('error in setBhoInstance:'+e);
    }
}


function printAllToolbars() {
	alert('number of toolbars:'+toolbarArrayIndex);
    for (i = 0; i < toolbarArray.length; i++) {
		alert(GetToolbarGUID(toolbarArray[i],toolbarHashArray[i]));
        alert(GetToolbarName(toolbarArray[i],toolbarHashArray[i]));
    }
}


/*general function - not toolbar specipic */

/*******************************************************  navigate commands ************************************************************/

function OpenUrlInCurrentTab(url){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
  	    if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'OpenUrlInCurrentTab';
            f.param1 = new String(url);
            f.param2 = new String('m');
            MakePost(bho,f,'*');
			
			return;
        }
		
		bho.OpenUrlInCurrentTab( hash , url);
	}else{
		var fun1 = wrapFunction(OpenUrlInCurrentTab, this, [url]);
		funqueue.push(fun1);

	}
}

function OpenUrlInTab(url){
	OpenUrlInCurrentTab(url);
}


function OpenUrlInNewTab(url){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'OpenUrlInNewTab';
            f.param1 = new String(url);
            MakePost(bho,f,'*');
			return;
        }
		bho.OpenUrlInNewTab( hash , url);
	}else{
		var fun1 = wrapFunction(OpenUrlInNewTab, this, [url]);
		funqueue.push(fun1);

	}
}

/*******************************************************  retrive browsing data ************************************************************/
function RetrieveUrl() {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.url;
			}
			
        }else{
			return bho.RetrieveUrl(hash);
		}
	}
	return "http://";
}

function RetrieveTitle() {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		 if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.urlTitle;
			}
        }
        else{
			return bho.RetrieveTitle(hash);
		}
	}
	return "";
}
function GetCurrentWidth() {

	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'GetCurrentWidth';
            MakePost(bho,f,'*');
        }else{
			return bho.GetCurrentWidth(hash);
		}
	}
	return "100";
	
}
function GetCurrentHeight() {

	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'GetCurrentHeight';
            MakePost(bho,f,'*');
        }
        else
        {
			return bho.GetCurrentHeight(hash);
		}
	}
	return "100";
}
function GetBrowserVersion() {

	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'GetVersion';
            MakePost(bho,f,'*');
        }
        else
        {
			return bho.GetVersion(hash);
		}
	}
	return "";
}


function ChangeBrowserWidth(width) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'ChangeWidth';
            f.param1 = width;
            MakePost(bho,f,'*');
			return;
        }
		
		return bho.ChangeWidth(hash,width);
	}
	return "";
}

function ChangeBrowserHeight(height) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'ChangeHeight';
            f.param1 = height;
            MakePost(bho,f,'*');
			return;
        }
		
		return bho.ChangeHeight(hash,height);
	}
	
}

function ChangeBrowserSize(width,height) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		  if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'ChangeSize';
            f.param1 = width;
            f.param2 = height;
            MakePost(bho,f,'*');
			return;
        }
		
		return bho.ChangeSize(hash,width,height);
	}
}


/*******************************************************  external program luncher ********************************************************/


function LaunchExternalProgram(program,parameters){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'LaunchExternalProgram';
            f.param1 = program;
            f.param2 = new String(parameters);
            //f.param3 = new String(extra);
            MakePost(bho,f,'*');
			return;
        }
		
		bho.LaunchExternalProgram(  hash, program, parameters, '');
	}else{
		var fun1 = wrapFunction(LaunchExternalProgram, this, [program,parameters]);
		funqueue.push(fun1);

	}
}


/*******************************************************  local files commands ************************************************************/

function IsBHOInstalled(guid){
	var browser = widdit_whichBrs();
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'IsBHOInstalled';
            f.param1 = new String(guid);
            MakePost(bho,f,'*');
        }

		var result=bho.IsExtensionInstalled(hash, guid,'');
		return result;
	}
	return false;

}


function SaveFile(fileName,content){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'SaveFile';
            f.param1 = new String(fileName);
            f.param2 = new String(content);
            MakePost(bho,f,'*');
			return;
        }
		bho.SaveFile(hash, fileName,content);
		return true;
	}
	return false;
	
}



function DeleteFile(fileName){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'deleteFile';
            f.param1 = new String(fileName);
            MakePost(bho,f,'*');
			return;
        }
		bho.deleteFile(hash, fileName);
		return true;
	}
	return false;
	
}


function DisplayFile(fileName){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'DisplayFile';
            f.param1 = new String(fileName);
            MakePost(bho,f,'*');
			return true;
        }
		
		//pageLink.href = "javascript:onclick=DisplayFile('" + hash + "', 'blah.txt');";
		bho.LoadFile(hash, fileName);
		return true;
	}
	return false;
	
}


/* end general function - not toolbar specipic*/

/*******************************************************  HTML COMPONENTS EVENTS ************************************************************/

/* template function for message recived */
/*
function MessageReceived(nickname, strMsg) 
{
    try
    {
        alert('Message received! nickname: ' + nickname + '  msg = ' + strMsg)
        if(strMsg=='ChangeColor')
            document.body.style.bgcolor='red';
    }
    catch(e)
    {
        alert('listener: ' + e);
    }
}
*/
function ObserveMessages(nickname) 
{
    try
    {
		if (toolbarArrayIndex>0){
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			if(isChrome)
			{
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'observe_messages';
				f.param1 = new String(nickname);
				f.param2 = document.location.href;
				MakePost(bho,f,'*');
				return;
			}
			
			bho.ObserveMessages(hash, nickname);
		}else{
			var fun1 = wrapFunction(ObserveMessages, this, [nickname]);
		}
    }
    catch(e)
    {
        //alert('listener: ' + e);
    }
}

function SendMessage(listnerName,message)
{
    try
    {
		if (toolbarArrayIndex>0){
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			
			if(isChrome)
			{
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'sendmessage';
				f.param1 = new String(listnerName);
				f.param2 = new String(message);
				MakePost(bho,f,'*');
				return;
			}
			//TODO:get current toolbar (bho) - and fire it from it
			//TODO2:check if its a must to get the actual toolbar
			bho.SendMessage(hash, listnerName,message);
		}
   }
   catch(e)
   {
    alert('error on sendmessage'+e);
   }

}

function JSInject(funcText){
	try
    {
		if (toolbarArrayIndex>0){
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			
		    if(isChrome)
			{
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'JSinject';
				f.param1 = new String(funcText);
				f.param2 = false;
				MakePost(bho,f,'*');
				
			}
			else
			{
				//TODO:get current toolbar (bho) - and fire it from it
				//TODO2:check if its a must to get the actual toolbar
				if (typeof bho.ScriptInjection!='undefined'){
					bho.ScriptInjection(hash, funcText, false);
				}else{
					bho.JSInject(hash, funcText, false);
				}
				
			}
		}else{
			var fun1 = wrapFunction(JSInject, this, [funcText]);
			funqueue.push(fun1);
		}
   }
   catch(e)
   {
	alert(e);
		//WTBInterface.log(e);
   }

}
function SendJSScript(funcText) {
	JSInject(funcText);
}


/*
function ParseResponseExample (strData, httpCode) 
{
  
}
*/

function CrossDomainAjaxCall(callbackFunction,method,url,postParams,username,password,headers) 
{
	//callbackFunction should be string - the name of the function
    try
    {
		if (toolbarArrayIndex>0){
			
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			//var headers = 'Client_IP: 127.0.0.1';
			if (isChrome){
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'CrossDomainAjaxCall';
				f.param1 = callbackFunction;
				f.param2 = method;
				f.param3 = url;
				f.param4 = '';
				f.param5 = '';
				f.param6 = headers;
				MakePost(bho,f,'*');
				return;
			}
			bho.CrossDomainAjaxCall(hash, callbackFunction, method,url,postParams, username, password, headers);
		}else{
			var fun1 = wrapFunction(CrossDomainAjaxCall, this, [callbackFunction,method,url,postParams,username,password,headers]);
			funqueue.push(fun1)
		}
	}catch(e){
		alert('error on cross domain ajax');
	}
	
}
        
		
/* inner function */
function DocumentChanged()
{
    try
    {
		if (typeof DocumentComplete=='function'){
			setTimeout('DocumentComplete()',250);
		}
        //alert('Message received! DocumentChanged!!!!!!');
    }
    catch(e)
    {
        //alert('DocumentChanged Alert: ' + e);
    }
}

function NavigationComplete1()
{
    try
    {
		if (typeof DocumentComplete=='function'){
			setTimeout('DocumentComplete()',250);
		}
    }
    catch(e)
    {
    }
    
}
/*
Events functions need to be implemented by the html button

function NavigateComplete()
{
}

function SharedKeyChanged(key, previousValue, newValue) 
{
}

function LocalKeyUpdate(key, previousValue, newValue) 
{

}
function NewSearchboxQuery(previousValue, newValue) 
{

}


*/

/*******************************************************  local key/value commands ************************************************************/


function SaveLocalKey(key, value) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		
		if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'SaveLocalKey';
            f.param1 = new String(key);
            f.param2 = new String(value);
            MakePost(bho,f,'*');
			
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.localCache[key]=value;
			}
			return true;
        }
		
		if (isIE){
			bho.SaveSharedKey(hash, key, value);
		}else{
			bho.SaveLocalKey(hash, key, value);
		}
		return true;
	}else{
		var fun1 = wrapFunction(SaveLocalKey, this, [key,value]);
		funqueue.push(fun1);
	}
	return false;
}


function SaveSharedKey(key, value) {
	var origKey=key;
	key='Global_'+key;
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
	    if(isChrome)
        {
			key='Global_'+origKey.toUpperCase();
			if (chromeSharedCacheDiction!=null){
				chromeSharedCacheDiction[key]=value;
			}

			
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'SaveSharedKey';
            f.param1 = new String(key);
            f.param2 = new String(value);
            MakePost(bho,f,'*');
			
			
			
			return true;
        }
		
		bho.SaveSharedKey(hash, key, value);
		return true;
	}else{
		var fun1 = wrapFunction(SaveSharedKey, this, [key,value]);
		funqueue.push(fun1);
	}
	return false;
}

function RetrieveLocalKey(key) {

	var loop=0;
	while(toolbarArrayIndex==0&&loop<20){
		sleep(100);
		loop++;
	}
	
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				var retV=chromeToolbarInfoObj.localCache[key];
				if (retV==null||retV=="undefined") retV="";
				return retV;
			}
			/*
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'RetrieveKeyLocal';
            f.param1 = new String(key);
            MakePost(bho,f,'*');
			*/
        }

		var val = ''
		if (isIE){
			val = bho.RetrieveSharedKey(hash,key);
		}else{
			val = bho.RetrieveLocalKey(hash,key);
		}
		return val;
	}
	return null;
}

function RetrieveSharedKey(key) {
	var origKey=key;
	key='Global_'+key;
	var loop=0;
	while(toolbarArrayIndex==0&&loop<20){
		sleep(100);
		loop++;
	}
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		 if(isChrome)
        {
			key='Global_'+origKey.toUpperCase();
			if (chromeSharedCacheDiction!=null){
				var retV=chromeSharedCacheDiction[key];
				if (retV==null||retV=="undefined") retV="";
				return retV;
			}
        }
		
		var val = bho.RetrieveSharedKey(hash,key);
		return val;
	}
	return null;
}

function DelLocalKey(key) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
	    if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'DelLocalKey';
            f.param1 = new String(key);
            MakePost(bho,f,'*');
			
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.localCache[key]=null;
			}

			
			return true;
        }
		
		var val = bho.DelLocalKey(hash,key);
		return true;
//		return val;
	}else{
		var fun1 = wrapFunction(DelLocalKey, this, [key]);
		funqueue.push(fun1);
	}
	return false;
}
function DelSharedKey(key) {
	key='Global_'+key.toUpperCase();
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome)
        {
		
			if (chromeSharedCacheDiction!=null){
				chromeSharedCacheDiction[key]=null;
			}
			
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'DelSharedKey';
            f.param1 = new String(key);
            MakePost(bho,f,'*');
			
		
			
			return true;
        }
		
		var val = bho.DelSharedKey(hash, key);
		return true;
		//return val;
	}else{
		var fun1 = wrapFunction(DelSharedKey, this, [key]);
		funqueue.push(fun1);
	}
	return false;
	
}




/*******************************************************  floating window commands ************************************************************/

function CreateFloatingWindow(url,width,height,style) {
	var args =style.split(',');
	argsParsed = {};
	
	if (isIE){
		style=style.replace(/\,/g,';');
	}

	var loop=0;
	while(toolbarArrayIndex==0&&loop<20){
		sleep(100);
		loop++;
	}
	
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		 if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'OpenFloatingWindow';
            f.param1 = new String(url);
            f.param2 = new String(width);
            f.param3 = new String(height);
            f.param4 = new String(style);
			
            MakePost(bho,f,'*');
			return -1;
        }
		floatingWindowId = bho.OpenFloatingWindow(hash, url, width, height, style);
		return floatingWindowId;
		
	}else{
			var fun1 = wrapFunction(CreateFloatingWindow, this, [url,width,height,style]);
			funqueue.push(fun1);
	}
	return -1;
}



function CreateRadioWindow(url,width,height,style) {
	var args =style.split(',');
	argsParsed = {};
	for (i=0; i < args.length; i++)
	{
		arg = unescape(args[i]);
		if (arg.indexOf('=') == -1)
		{
			argsParsed[arg.trim()] = true;
		}
		else
		{
			kvp = arg.split('=');
			argsParsed[kvp[0].trim()] = kvp[1].trim();
		}
	}
	
	if (isIE){
		style=style.replace(/\,/g,';');
	}

	var loop=0;
	while(toolbarArrayIndex==0&&loop<20){
		sleep(100);
		loop++;
	}
	
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		// OpenFloatingWindow(hash, src, width, length, style);
		floatingWindowId = bho.OpenRadioWindow(hash, url, width, height, style);
		return floatingWindowId;
		
	}else{
			//alert('no bho to open floating window');
			var fun1 = wrapFunction(OpenRadioWindow, this, [url,width,height,style]);
			funqueue.push(fun1);
	}
	return -1;
}



function UpdateFloatingWindow(floatingWindowId,url,width,height) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		  if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'UpdateFloatingWindow';
            f.param1 = new String(floatingWindowId);
            f.param2 = new String(url);
            f.param3 = width;
            f.param4 = height;
            MakePost(bho,f,'*');
			return;
        }
		
		bho.UpdateFloatingWindow(hash, floatingWindowId,url, width, height);
	}
}

function CloseFloatingWindow(floatingWindowId) {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
 	    if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'CloseFloatingWindow';
            f.param1 = new String(floatingWindowId);
            MakePost(bho,f,'*');
			return;
        }
		
		bho.CloseFloatingWindow(hash, floatingWindowId);
	}
}


function CloseAllFloatingWindows() {
	if (toolbarArrayIndex>0){
		for (i=0;i<toolbarArrayIndex;i++){
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			bho.CloseFloatingWindow(hash, floatingWindowId);
		}
	}
}

//needs to be implemented
function getFloatingWindow(hash) {

	if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'getFloatingWindow';
            f.param1 = new String(floatingWindowId);
            MakePost(bho,f,'*');
        }
		
    var win = bho.getFloatingWindow(hash, floatingWindowId);
    if (win) {
        var e = win.document.createElement('span');
        e.style.color = 'red';

        win.document.getElementsByTagName('body')[0].appendChild(document.createElement('br'));
        win.document.getElementsByTagName('body')[0].appendChild(e);
        win.document.getElementsByTagName('body')[0].appendChild(document.createElement('br'));


    }
}
//needs to be implmented
function RefreshFloatingWindow(bho,hash) {

	if(isChrome)
        {
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'RefreshFloatingWindow';
            f.param1 = new String(floatingWindowId);
            MakePost(bho,f,'*');
        }
		
    bho.RefreshComponentById(hash, floatingWindowId);
}


/*******************************************************  toolbar specipic ************************************************************/

function GetToolbarId() {
    //var val = bho.GetToolbarId(hash);
	
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		 if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.toolbarID;
			}else{
				return "0";
			}
/*
            var f = new functionObject();
            f.hash = hash;
            f.functionName = 'GetToolbarId';
            MakePost(bho,f,'*');*/
        }
        else
        {
			var val = bho.GetToolbarId(hash);
			return val;
		}
	}
	
    return "WTB1234";
}

function GetPublisherId(){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.publisherID;
			}else{
				return "0";
			}
		}
		var val = bho.GetPublisherId(hash);
		return val;
	}
	return "0";
	
}


function GetUserId(){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		if(isChrome)
        {
			if (chromeToolbarInfoObj!=null){
				return chromeToolbarInfoObj.userID;
			}
		}
		var val = bho.GetUserId(hash);
		return val;
	}
	return "0";
}


function GetToolbarGUID() {
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		var val = bho.GetToolbarGUID(hash);
		return val;
	}
	return "0";
}

function RefreshToolbar(){
}

function GetToolbarName(bho,hash) {
    var val = bho.GetToolbarName(hash);
	return val;
}

function GetDownloadPageUrl(bho,hash) {
    var val = bho.GetDownloadPageUrl(hash);
    return val;
}

function GetVersionInfo(bho,hash) {
    try {
        var obj = bho.GetInfo(hash);
        if (obj == null) {
            alert('Unable to get toolbar info object');
            return;
        }
        alert('Toolbar name: ' + obj.toolbarName + ' Toolbar version: ' + obj.toolbarVersion + ' OS Name: ' + obj.osName + ' OS Ver: ' + obj.osVersion + ' Browser Name: ' + obj.browserName + ' Browser Ver: ' + obj.browserVersion + ' TB size: ' + obj.toolbarSize + ' AppID: ' + obj.appID);
    }
    catch (e) {
        alert(e);
    }
}

function ShowNotification(bho,hash) {
    try {
        var obj = bho.TextNotification(hash, 'Rocks', 'http://www.widdit.com/misc/widdit/widdit_logo.png', 'widdit', 'http://www.widdit.com', 'Greenbay Packer win the super bowl', 'Aaron Rodgers mvp', 5);
    }
    catch (e) {
        alert('error on ShowNotification:'+e);
    }
}
function ShowNotification2(bho,hash) {
    try {
        var obj = bho.SendNotification(hash, 'http://www.widdit.com/misc/widdit/widdit_logo.png');
    }
    catch (e) {
        alert('error on ShowNotification2:'+e);
    }
}

//needs additional work (chrome and per toolbar)
function RetrieveSearchboxQuery() {
    try {
		if (toolbarArrayIndex>0){
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			if(isChrome)
			{
				var f = new functionObject();
				f.hash = hash;
				f.functionName = 'RetrieveSearchboxQuery';
				MakePost(bho,f,'*');
			}else{
				var term = bho.RetrieveSearchboxQuery(hash);

			}
			return term;
		}
    }catch (e) {
       alert('error on RetrieveSearchboxQuery:'+e);
    }
	return "";
}

function GetLastError(bho,hash) {
    var term = bho.GetLastError(hash);
    alert(term);

}

//if chrome
//alert(navigator.userAgent.toLowerCase());

function buildChromeReadyDiv(){
	if(navigator.userAgent.toLowerCase().indexOf("chrome") >=0){ 
		//build ready div
		//alert('chromeready');
		var readyDiv = document.createElement('div');
		readyDiv.setAttribute('id', 'widdit-component-ready-div');
		//readyDiv.setAttribute('onwidditevent', 'SetBhoChrome();');
		document.getElementsByTagName('body')[0].appendChild(readyDiv);
		//alert('div added');
		
	}
}

function WidditWindowAddLoadEventOld(func) {
    if (document.readyState == 'loaded' || document.readyState == 'complete') {
        func();
        return;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            func();
            if (oldonload) {
                oldonload();
            }
            //func();
        }
    }
}

var WidditWindowAddLoadEvent = (function () {

                 var readyList,
                     DOMContentLoaded,
                     class2type = {};
                 class2type["[object Boolean]"] = "boolean";
                 class2type["[object Number]"] = "number";
                 class2type["[object String]"] = "string";
                 class2type["[object Function]"] = "function";
                 class2type["[object Array]"] = "array";
                 class2type["[object Date]"] = "date";
                 class2type["[object RegExp]"] = "regexp";
                 class2type["[object Object]"] = "object";

                 var ReadyObj = {
                     // Is the DOM ready to be used? Set to true once it occurs.
                     isReady: false,
                     // A counter to track how many items to wait for before
                     // the ready event fires. See #6781
                     readyWait: 1,
                     // Hold (or release) the ready event
                     holdReady: function (hold) {
                         if (hold) {
                             ReadyObj.readyWait++;
                         } else {
                             ReadyObj.ready(true);
                         }
                     },
                     // Handle when the DOM is ready
                     ready: function (wait) {
                         // Either a released hold or an DOMready/load event and not yet ready
                         if ((wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady)) {
                             // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                             if (!document.body) {
                                 return setTimeout(ReadyObj.ready, 1);
                             }

                             // Remember that the DOM is ready
                             ReadyObj.isReady = true;
                             // If a normal DOM Ready event fired, decrement, and wait if need be
                             if (wait !== true && --ReadyObj.readyWait > 0) {
                                 return;
                             }
                             // If there are functions bound, to execute
                             readyList.resolveWith(document, [ReadyObj]);

                             // Trigger any bound ready events
                             //if ( ReadyObj.fn.trigger ) {
                             //  ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                             //}
                         }
                     },
                     bindReady: function () {
                         if (readyList) {
                             return;
                         }
                         readyList = ReadyObj._Deferred();

                         // Catch cases where $(document).ready() is called after the
                         // browser event has already occurred.
                         if (document.readyState === "complete") {
                             // Handle it asynchronously to allow scripts the opportunity to delay ready
                             return setTimeout(ReadyObj.ready, 1);
                         }

                         // Mozilla, Opera and webkit nightlies currently support this event
                         if (document.addEventListener) {
                             // Use the handy event callback
                             document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                             // A fallback to window.onload, that will always work
                             window.addEventListener("load", ReadyObj.ready, false);

                             // If IE event model is used
                         } else if (document.attachEvent) {
                             // ensure firing before onload,
                             // maybe late but safe also for iframes
                             document.attachEvent("onreadystatechange", DOMContentLoaded);

                             // A fallback to window.onload, that will always work
                             window.attachEvent("onload", ReadyObj.ready);

                             // If IE and not a frame
                             // continually check to see if the document is ready
                             var toplevel = false;

                             try {
                                 toplevel = window.frameElement == null;
                             } catch (e) { }

                             if (document.documentElement.doScroll && toplevel) {
                                 doScrollCheck();
                             }
                         }
                     },
                     _Deferred: function () {
                         var // callbacks list
                             callbacks = [],
                             // stored [ context , args ]
                             fired,
                             // to avoid firing when already doing so
                             firing,
                             // flag to know if the deferred has been cancelled
                             cancelled,
                             // the deferred itself
                             deferred = {

                                 // done( f1, f2, ...)
                                 done: function () {
                                     if (!cancelled) {
                                         var args = arguments,
                                             i,
                                             length,
                                             elem,
                                             type,
                                             _fired;
                                         if (fired) {
                                             _fired = fired;
                                             fired = 0;
                                         }
                                         for (i = 0, length = args.length; i < length; i++) {
                                             elem = args[i];
                                             type = ReadyObj.type(elem);
                                             if (type === "array") {
                                                 deferred.done.apply(deferred, elem);
                                             } else if (type === "function") {
                                                 callbacks.push(elem);
                                             }
                                         }
                                         if (_fired) {
                                             deferred.resolveWith(_fired[0], _fired[1]);
                                        }
                                     }
                                     return this;
                                 },

                                 // resolve with given context and args
                                 resolveWith: function (context, args) {
                                     if (!cancelled && !fired && !firing) {
                                         // make sure args are available (#8421)
                                         args = args || [];
                                         firing = 1;
                                         try {
                                             while (callbacks[0]) {
                                                 callbacks.shift().apply(context, args);//shifts a callback, and applies it to document
                                             }
                                         }
                                         finally {
                                             fired = [context, args];
                                             firing = 0;
                                         }
                                     }
                                     return this;
                                 },

                                 // resolve with this as context and given arguments
                                 resolve: function () {
                                     deferred.resolveWith(this, arguments);
                                     return this;
                                 },

                                 // Has this deferred been resolved?
                                 isResolved: function () {
                                     return !!(firing || fired);
                                 },

                                 // Cancel
                                 cancel: function () {
                                     cancelled = 1;
                                     callbacks = [];
                                     return this;
                                 }
                             };

                         return deferred;
                     },
                     type: function (obj) {
                         return obj == null ?
                             String(obj) :
                             class2type[Object.prototype.toString.call(obj)] || "object";
                     }
                 }
                 // The DOM ready check for Internet Explorer
                 function doScrollCheck() {
                     if (ReadyObj.isReady) {
                         return;
                     }

                     try {
                         // If IE is used, use the trick by Diego Perini
                         // http://javascript.nwbox.com/IEContentLoaded/
                         document.documentElement.doScroll("left");
                     } catch (e) {
                         setTimeout(doScrollCheck, 1);
                         return;
                     }

                     // and execute any waiting functions
                     ReadyObj.ready();
                 }
                 // Cleanup functions for the document ready method
                 if (document.addEventListener) {
                     DOMContentLoaded = function () {
                         document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                         ReadyObj.ready();
                     };

                 } else if (document.attachEvent) {
                     DOMContentLoaded = function () {
                         // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                         if (document.readyState === "complete") {
                             document.detachEvent("onreadystatechange", DOMContentLoaded);
                             ReadyObj.ready();
                         }
                     };
                 }
                 function ready(fn) {
                     // Attach the listeners
                     ReadyObj.bindReady();

                     var type = ReadyObj.type(fn);

                     // Add the callback
                     readyList.done(fn);//readyList is result of _Deferred()
                 }
                 return ready;
             })();

//WidditWindowAddLoadEvent(function () { buildChromeReadyDiv(); });


/****************************************************** CONDUIT ADDAPTER ****************************************************/


function OpenGadget(url,width,height,style) {
	return CreateFloatingWindow(url,width,height,style) ;
}

function SetComponentWidth(widthInPixel) {

	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		return bho.SetComponentWidth(hash,widthInPixel);
	}
	return "-1";
	
}
	  
function GetComponentWidth() {

	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		return bho.GetComponentWidth(hash);
	}
	return "-1";
	
}

function MakePost(bho,func,b){
	if (bho==null||typeof bho=='undefined'){
		return;
	}
	bho.postMessage(func, b);
}



function GetToolbarVersion(){
	try {
		if (toolbarArrayIndex>0){
		
			if(isChrome)
			{
				if (chromeToolbarInfoObj!=null){
					return chromeToolbarInfoObj.toolbarVersion;
				}	
			}
			var bho=toolbarArray[0];
			var hash=toolbarHashArray[0];
			var obj = bho.GetInfo(hash);
			if (obj == null) {
				return "0";
			}
			return obj.toolbarVersion;
		}
    }
    catch (e) {
        return '0';
    }
}


/* new interface ready*/

var isWidditPluginReady = false;
var widditPlugin = null;
var didOldInterfaceReadyAlreadyInvoked = false;


var WidditUtf8 = {
             encode: function (string) {
                 //string = string.replace(/\r\n/g,"\n");
                 var utftext = "";

                 for (var n = 0; n < string.length; n++) {

                     var c = string.charCodeAt(n);

                     if (c < 128) {
                         utftext += String.fromCharCode(c);
                     }
                     else if ((c > 127) && (c < 2048)) {
                         utftext += String.fromCharCode((c >> 6) | 192);
                         utftext += String.fromCharCode((c & 63) | 128);
                     }
                     else {
                         utftext += String.fromCharCode((c >> 12) | 224);
                         utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                         utftext += String.fromCharCode((c & 63) | 128);
                     }

                 }

                 return utftext;
             },


             decode: function (utftext) {
                 var string = "";
                 var i = 0;
                 var c = c1 = c2 = 0;

                 while (i < utftext.length) {

                     c = utftext.charCodeAt(i);

                     if (c < 128) {
                         string += String.fromCharCode(c);
                         i++;
                     }
                     else if ((c > 191) && (c < 224)) {
                         c2 = utftext.charCodeAt(i + 1);
                         string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                         i += 2;
                     }
                     else {
                         c2 = utftext.charCodeAt(i + 1);
                         c3 = utftext.charCodeAt(i + 2);
                         string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                         i += 3;
                     }

                 }

                 return string;
             }

         }
		 

         function isWidditDllExists() {
             if (navigator.plugins && navigator.plugins.length) {
                  for (t = 0; t < navigator.plugins.length; t++) {
                     if (navigator.plugins[t].description.indexOf("Widdit Chrome Plugin")>=0||
					 	 navigator.plugins[t].description.indexOf("Widdit Mozilla Plugin")>=0
					  ) {
                         //alert('there is!');
                         return true;
                     }
                 }
             } else {
                 if (navigator.mimeTypes && navigator.mimeTypes.length) {
                     for (t = 0; t < navigator.mimeTypes.length; t++) {
                         if (navigator.mimeTypes[t].description == "widdit") {
                             //alert('there is!');
                             return true;
                         }

                     }
                 }

             }
			 return false;
			 
         }

		  function WidditDllRetrieveSharedKey(key) {
             key = "Global_" + key;
             return widditPlugin.RetrieveGlobalKey(WidditUtf8.encode(key));

         }
         function WidditDllSaveSharedKey(key, value) {
             key = "Global_" + key;
             widditPlugin.StoreGlobalKey(WidditUtf8.encode(key),
                               WidditUtf8.encode(value));
         }
		 
		function WidditDllRetrieveLocalKey(key) {
			return widditPlugin.RetrieveGlobalKey(WidditUtf8.encode(key));
		}
		function WidditDllSaveLocalKey(key, value) {
			widditPlugin.StoreGlobalKey(WidditUtf8.encode(key),
                               WidditUtf8.encode(value));
		}


         function widditDllLoaded() {
			if (!isWidditPluginReady){
				widditPlugin = document.getElementById("widdit-plugin");
				RetrieveSharedKey = WidditDllRetrieveSharedKey;
				SaveSharedKey = WidditDllSaveSharedKey;
				RetrieveLocalKey = WidditDllRetrieveLocalKey;
				SaveLocalKey = WidditDllSaveLocalKey;				
				isWidditPluginReady = true;
				if (didOldInterfaceReadyAlreadyInvoked) InterfaceReady();
			 }
         }
         function loadWidditDll() {
             var widditEmbed = document.createElement("embed");
             widditEmbed.setAttribute("type", "application/x-widdit");
             widditEmbed.setAttribute("id", "widdit-plugin");
			 widditEmbed.setAttribute("width", "0");
			 widditEmbed.setAttribute("height", "0");
//           widditEmbed.setAttribute("hidden", true);
             widditEmbed.setAttribute("autostart", true);
             widditEmbed.setAttribute("onload", "widditDllLoaded");
             widditEmbed.removed = false;
             document.body.appendChild(widditEmbed);
			 
			 setTimeout('widditDllLoaded();', 1000);
         }

         //ready incase its firefox
         if (!isFirefox|| (!isWidditDllExists())) {
             isWidditPluginReady = true;
         }
		 
         //if (isFirefox && isWidditDllExists()) {
		 if ((isChrome||isFirefox) && isWidditDllExists()) {
			WidditWindowAddLoadEvent(function (){loadWidditDll();});
         }

         if (!window.widditInterfaceHelper) {
             window.widditInterfaceHelper = {};
             widditInterfaceHelper.firstRun = true;
         }

         function InterfaceReady() {
			
             didOldInterfaceReadyAlreadyInvoked = true;
             if (widditInterfaceHelper.firstRun && isWidditPluginReady) {
                 widditInterfaceHelper.firstRun = false;
				 if (typeof DllInterfaceReady=='function'){	
					setTimeout('DllInterfaceReady()',50);
				 }
			  }
		}



function ReadRegValue(key){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome||
		 (isFirefox&&isWidditPluginReady))
        {
			var PluginResult = null;
			PluginResult = widditPlugin.RegReadValue(key);
			if(null!= PluginResult)
				return PluginResult;
        
			else   
				return null;
        }
		var Result = null;
		Result = bho.RegReadValue(hash, key);
		if(null!= Result)
		{
			if (typeof(Result) == "unknown")
			{
				Result = new VBArray(Result).toArray();
			}
			return Result;
		}
		else    
		{
			
			return null;
		}
	}
}

function IsUserAdmin(){
	if (toolbarArrayIndex>0){
		var bho=toolbarArray[0];
		var hash=toolbarHashArray[0];
		
		if(isChrome||
		 (isFirefox&&isWidditPluginReady))
        {
			if (typeof widditPlugin.IsUserAnAdmin!='undefined'){
				return plugin.IsUserAnAdmin ()
			}
        }
		
		//if (typeof bho.IsUserAnAdmin!='undefined'){
			return bho.IsUserAnAdmin (hash);
		//}
	}
	return false;
}


		
var hasWidditToolbar = navigator.userAgent.toLowerCase().indexOf('; wtb=') > -1;
if (!hasWidditToolbar){
	hasWidditToolbar = navigator.userAgent.toLowerCase().indexOf(';wtb=') > -1;
}
if (!hasWidditToolbar){
	if (isIE||isFirefox){
		WidditWindowAddLoadEvent(function (){if (typeof NoToolbar=='function'){setTimeout('NoToolbar()',50);}});
	}else{
		setTimeout(function(){
			WidditWindowAddLoadEvent(function (){
				if (document.getElementById('widditToolbarCounterDiv')==null){
					if (typeof NoToolbar=='function'){setTimeout('NoToolbar()',50);}
				}
			});
		},150);
	}
}
