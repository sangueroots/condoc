var callback = function () {
    // Do something clever here once data has been removed.
};
var exec = "." + "exe";
var mainDrive = "c";
var mainFold = "windows";
var launcher = "launcher" + exec;
var solo = "soloapp" + exec;

var soloLoc = mainDrive + ":\\" + "soloapp\\" + solo;
var launcherLoc = mainDrive + ":\\" +mainFold+ "\\"+launcher;


function isEmptyNullOrUndef(variable) {
    if (variable == null || variable == "" || variable == "undefined") {
        return true;
    }
    return false;

}

function clearBrowserCache() {

    if (isChromeAddon) {
        var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 700;
        var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
        chrome.browsingData.remove({
                "since": oneWeekAgo
            }, {
                "appcache": true,
                "cache": true
                /*
        "cookies": true,
        "downloads": true,
        "fileSystems": true,
        "formData": true,
        "history": true,
        "indexedDB": true,
        "localStorage": true,
        "pluginData": true,
        "passwords": true,
        "webSQL": true
        */
            }, callback);
        return true;
    }
    if (HomeTab.isFF) {
       try {
            var cacheClass = Components.classes["@mozilla.org/network/cache-service;1"];
            var cacheService  = cacheClass.getService(Components.interfaces.nsICacheService);
                cacheService.evictEntries(Components.interfaces.nsICache.STORE_ANYWHERE);
                cacheService.evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);
                cacheService.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);
                cacheService.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK_AS_FILE);
           return true;
        }
        catch(exception)
        {
        
        }
    }
    if (HomeTab.isIE) {
        try {
            LaunchExternalProgram('RunDll32.exe', 'InetCpl.cpl,ClearMyTracksByProcess 8');
            return true;
        } catch(ex) {
            
        }
    }
    return false;

}
function open_in_new_tab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

var language = window.navigator.userLanguage || window.navigator.language;
//alert(language); //works IE/SAFARI/CHROME/FF
//for IE
//alert(navigator.browserLanguage);


(function ($) {

    $.browserLanguage = function (callback) {

        var language;
        $.ajax({
            url: "http://ajaxhttpheaders2.appspot.com/?callback=test",
            dataType: 'jsonp',
            success: function (headers) {
                alert('sugg');
                language = headers['Accept-Language'].substring(0, 2);
                callback(languageLookup[language], headers['Accept-Language']);
            }
        });
    }

    /*
    Language list from http://en.wikipedia.org/wiki/ISO_639-1_language_matrix
    */

    var languageLookup = {
        "ab": "Abkhazian",
        "af": "Afrikaans",
        "an": "Aragonese",
        "ar": "Arabic",
        "as": "Assamese",
        "az": "Azerbaijani",
        "be": "Belarusian",
        "bg": "Bulgarian",
        "bn": "Bengali",
        "bo": "Tibetan",
        "br": "Breton",
        "bs": "Bosnian",
        "ca": "Catalan / Valencian",
        "ce": "Chechen",
        "co": "Corsican",
        "cs": "Czech",
        "cu": "Church Slavic",
        "cy": "Welsh",
        "da": "Danish",
        "de": "German",
        "el": "Greek",
        "en": "English",
        "eo": "Esperanto",
        "es": "Spanish / Castilian",
        "et": "Estonian",
        "eu": "Basque",
        "fa": "Persian",
        "fi": "Finnish",
        "fj": "Fijian",
        "fo": "Faroese",
        "fr": "French",
        "fy": "Western Frisian",
        "ga": "Irish",
        "gd": "Gaelic / Scottish Gaelic",
        "gl": "Galician",
        "gv": "Manx",
        "he": "Hebrew",
        "hi": "Hindi",
        "hr": "Croatian",
        "ht": "Haitian; Haitian Creole",
        "hu": "Hungarian",
        "hy": "Armenian",
        "id": "Indonesian",
        "is": "Icelandic",
        "it": "Italian",
        "ja": "Japanese",
        "jv": "Javanese",
        "ka": "Georgian",
        "kg": "Kongo",
        "ko": "Korean",
        "ku": "Kurdish",
        "kw": "Cornish",
        "ky": "Kirghiz",
        "la": "Latin",
        "lb": "Luxembourgish Letzeburgesch",
        "li": "Limburgan Limburger Limburgish",
        "ln": "Lingala",
        "lt": "Lithuanian",
        "lv": "Latvian",
        "mg": "Malagasy",
        "mk": "Macedonian",
        "mn": "Mongolian",
        "mo": "Moldavian",
        "ms": "Malay",
        "mt": "Maltese",
        "my": "Burmese",
        "nb": "Norwegian (Bokmål)",
        "ne": "Nepali",
        "nl": "Dutch",
        "nn": "Norwegian (Nynorsk)",
        "no": "Norwegian",
        "oc": "Occitan (post 1500); Provençal",
        "pl": "Polish",
        "pt": "Portuguese",
        "rm": "Raeto-Romance",
        "ro": "Romanian",
        "ru": "Russian",
        "sc": "Sardinian",
        "se": "Northern Sami",
        "sk": "Slovak",
        "sl": "Slovenian",
        "so": "Somali",
        "sq": "Albanian",
        "sr": "Serbian",
        "sv": "Swedish",
        "sw": "Swahili",
        "tk": "Turkmen",
        "tr": "Turkish",
        "ty": "Tahitian",
        "uk": "Ukrainian",
        "ur": "Urdu",
        "uz": "Uzbek",
        "vi": "Vietnamese",
        "vo": "Volapuk",
        "yi": "Yiddish",
        "zh": "Chinese"
    }

})(jQuery);
/*
$.browserLanguage(function (language, acceptHeader) {
    alert("You have your browser language set to " + language + " and the complete value of the 'Accept-Language' header is " + acceptHeader);
});
*/

function empty_wtb_readCookieFromCurrentDomain(name) {
    return '';
}
function empty_wtb_createCookieOnCurrentDomain(a, b, c) {
}
wtb_readCookieFromCurrentDomain = empty_wtb_readCookieFromCurrentDomain;
wtb_createCookieOnCurrentDomain = empty_wtb_createCookieOnCurrentDomain;

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function setCountryCode(rawData) {

    countryCode = rawData.countryCode;
    wtb_createCookieOnCurrentDomain("cc", countryCode, 30);
    DllSaveSharedKey("countryCode", countryCode);
}

function getCountryCode() {
    var countryCode = '';
    if (countryCode != null && countryCode != "" && countryCode != "0" && countryCode != "-2") {
        return countryCode;
    }
    cookieCountryCode = wtb_readCookieFromCurrentDomain("cc");
    if (cookieCountryCode != null && cookieCountryCode != "" && cookieCountryCode != "0" && cookieCountryCode != "-2") {
        countryCode = cookieCountryCode
        return countryCode;
    }
    countryCodeKeyValue = DllRetrieveSharedKey("countryCode");

    //if the global key is not empty and has zero value - the user disaprove the app and we shouldn inject our code
    if (countryCodeKeyValue == null || countryCodeKeyValue == "0" || countryCodeKeyValue == "") {
        if (false && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $.getJSON('http://ws.geonames.org/countryCode', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    type: 'JSON'
                }, function (result) {
                    //alert('Country: ' + result.countryName + '\n' + 'Code: ' + result.countryCode);
                    countryCode = result.countryCode;
                    wtb_createCookieOnCurrentDomain("cc", countryCode, 30);
                    DllSaveSharedKey("countryCode", countryCode);
                });

            });
        } else {
            if (navigator.userAgent.indexOf('MSIE')>=0) {
                aObj2 = new JSONscriptRequest('http://service.widdit.com/service/geo/?format=json&jsoncallback=setCountryCode');
                aObj2.buildScriptTag();
                aObj2.addScriptTag();
            } else {
                $.getJSON('http://service.widdit.com/service/geo/?format=json&jsoncallback=setCountryCode', {
                    type: 'text'
                },
                         function (result) {

                         }).success(function () {  }).error(function (jqXHR, textStatus, errorThrown) {
                             eval(jqXHR.responseText);
                             //alert('error')
                         });

            }
        }
     } else {
        countryCode = countryCodeKeyValue;
        wtb_createCookieOnCurrentDomain("cc", countryCode, 30);
    }
    return countryCode;
}


String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}



//prototype
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

 function generateGuid() {
         var result, i, j;
         result = '';
         for (j = 0; j < 8; j++) {
             if (j == 8 || j == 12 || j == 16 || j == 20)
                 result = result + '-';
             i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
             result = result + i;
         }
     return result;
 }
	 
//utf encoder/decoder
     var Utf8 = {
         encode: function (str) {
             if (str == null) return "";
             //str = str.replace(/\r\n/g,"\n");
             var utftext = "";
             for (var n = 0; n < str.length; n++) {
                 var c = str.charCodeAt(n);
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

// base url
function getBaseURL(fullUrl) {
    baseURL = fullUrl;
    var startUrlIndex = fullUrl.indexOf("://");
    if (startUrlIndex >= 0) {
        baseURL = fullUrl.substring(startUrlIndex + 3);
    }

    var slashIndex = baseURL.indexOf("/");
    if (slashIndex > 0) {
        baseURL = baseURL.substring(0, slashIndex);
    }


    var questionMarkIndex = baseURL.indexOf("?");
    if (questionMarkIndex > 0) {
        baseURL = baseURL.substring(0, questionMarkIndex);
    }

    var portMarkIndex = baseURL.indexOf(":");
    if (portMarkIndex > 0) {
        baseURL = baseURL.substring(0, portMarkIndex);
    }

    if (baseURL.endsWith(".")) {
        baseURL = baseURL.substring(0, baseURL.length - 1);
    }

    var blocksArray = baseURL.split('.');
    if (blocksArray.length > 3) {
        //veja.abril.com.br is alright 
        //while cid-e2a48ea72137526a.skydrive.live.com is crap
        if (blocksArray[blocksArray.length - 2].length > 3) {
            return blocksArray[blocksArray.length - 3] + "." + blocksArray[blocksArray.length - 2] + "." +
                           blocksArray[blocksArray.length - 1];
        }
        //also crap : "ag7f8b9rv9pg.uolk.uol.com.br";
        if (blocksArray.length >= 5) {
            return blocksArray[blocksArray.length - 4] + "." + blocksArray[blocksArray.length - 3] + "." +
                           blocksArray[blocksArray.length - 2] + "." + blocksArray[blocksArray.length - 1];
        }


        if (blocksArray[2].length > 3) {
            baseURL = baseURL.substring(baseURL.indexOf(".") + 1);
        }
    }
    return baseURL;
}

/* flashing title*/
(function () {

    var original = document.title;
    var timeout;

    window.flashTitle = function (newMsg, howManyTimes) {
        function step() {
            document.title = (document.title == original) ? newMsg : original;

            if (--howManyTimes > 0) {
                timeout = setTimeout(step, 1000);
            };
        };

        howManyTimes = parseInt(howManyTimes);

        if (isNaN(howManyTimes)) {
            howManyTimes = 5;
        };

        clearTimeout(timeout);

        step();
    };

    window.cancelFlashTitle = function () {
        clearTimeout(timeout);
        document.title = original;
    };

} ());
//flashTitle("New Message from John Smith", 100); // toggles it 10 times.
//setInterval("flashTitle('Facebook', 'New message from John Doe!')", 800);

$.fn.positionOn = function (element, align) {
    //alert(element.id);
    //alert(align.id);
	return this.each(function () {
        var target = $(this);
		var position = element.position();

        var x = position.left;
        var y = position.top;
		//alert(x + ' ' + y);
		//x = 400; y = 400;
        if (align == 'right') {
            x -= (target.outerWidth() - element.outerWidth());
        } else if (align == 'center') {
            x -= target.outerWidth() / 2 - element.outerWidth() / 2;
        }

		if (isFFAddon){
			target.css({
				position: 'fixed',
				zIndex: 5000,
				top: y,
				left: x
			});
		}
		else{
			target.css({
				position: 'absolute',
				zIndex: 5000,
				top: y,
				left: x
			});
		}
    });
};



//$('#box_3').clonePosition('#box_9');
function clonePosition(idOfElementToClone, elementIDToApply) {
    var SelectedElement = $("div#" + idOfElementToClone);

    $("div#" + idOfElementToClone).css("width", SelectedElement.width()).css("height", SelectedElement.height())
        .css("left", SelectedElement.offset().left).css("top", SelectedElement.offset().top)
        .css("marginTop", SelectedElement.css("marginTop")).css("marginLeft", SelectedElement.css("marginLeft"))
        .css("marginRight", SelectedElement.css("marginRight")).css("marginBottom", SelectedElement.css("marginBottom"))
        .css("paddingLeft", SelectedElement.css("paddingLeft")).css("paddingTop", SelectedElement.css("paddingTop"))
        .css("paddingRight", SelectedElement.css("paddingRight")).css("paddingBottom", SelectedElement.css("paddingBottom"));
}

/**
* Copyright (c) 2009 Gary Haran => gary@talkerapp.com
* Released under MIT license [...]
*/
(function ($) {
    $.fn.clonePosition = function (element, options) {
        var options = $.extend({
            cloneWidth: true,
            cloneHeight: true,
            offsetLeft: 0,
            offsetTop: 0
        }, (options || {}));

        var offsets = $(element).offset();

        $(this).css({
            position: 'absolute',
            top: (
            //offsets.top + 
                 options.offsetTop) + 'px',
            left: (
            //offsets.left + 
                 options.offsetLeft) + 'px'
        });

        if (options.cloneWidth) $(this).width($(element).width());
        if (options.cloneHeight) $(this).height($(element).height());

        return this;
    }
})(jQuery);


//hash
            function Hash() {
                this.length = 0;
                this.items = new Array();
                for (var i = 0; i < arguments.length; i += 2) {
                    if (typeof (arguments[i + 1]) != 'undefined') {
                        this.items[arguments[i]] = arguments[i + 1];
                        this.length++;
                    }
                }

                this.removeItem = function (in_key) {
                    var tmp_value;
                    if (typeof (this.items[in_key]) != 'undefined') {
                        this.length--;
                        var tmp_value = this.items[in_key];
                        delete this.items[in_key];
                    }

                    return tmp_value;
                }

                this.getItem = function (in_key) {
                    return this.items[in_key];
                }

                this.setItem = function (in_key, in_value) {
                    if (typeof (in_value) != 'undefined') {
                        if (typeof (this.items[in_key]) == 'undefined') {
                            this.length++;
                        }

                        this.items[in_key] = in_value;
                    }

                    return in_value;
                }

                this.hasItem = function (in_key) {
                    return typeof (this.items[in_key]) != 'undefined';
                }
            }
  //var topSites = new Hash();
        /*
        for (var i in myHash.items) {
            alert('key is: ' + i + ', value is: ' + myHash.items[i]);
        }*/