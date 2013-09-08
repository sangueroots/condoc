if(typeof(AppAB) == 'undefined')
{
	(function(){

		"use strict"; // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
		var counter = 0; // a counter for element id's and whatnot
		var alpnum = /[^a-z0-9_]/ig; //a regex to find anything thats not letters and numbers
		
		if (typeof(window.SwfStore) !== 'undefined')	//check
			return;	

		/**
		 * SwfStore constructor - creates a new SwfStore object and embeds the .swf into the web page.
		 *
		 * usage:
		 * var mySwfStore = new SwfStore(config);
		 *
		 * @param {object} config
		 * @param {string} [config.swf_url=storage.swf] - Url to storage.swf. Must be an absolute url (with http:// and all) to work cross-domain
		 * @param {functon} [config.onready] Callback function that is fired when the SwfStore is loaded. Recommended.
		 * @param {function} [config.onerror] Callback function that is fired if the SwfStore fails to load. Recommended.
		 * @param {string} [config.namespace="swfstore"] The namespace to use in both JS and the SWF. Allows a page to have more than one instance of SwfStore.
		 * @param {string} [config.path] The path fo the LSO - similar to a cookie's path, setting it to "/" allows other .swf files on the domain to read/write to it
		 * @param {integer} [config.timeout=10] The number of seconds to wait before assuming the user does not have flash.
		 * @param {boolean} [config.debug=false] Is debug mode enabled? If so, mesages will be logged to the console and the .swf will be rendered on the page (although it will be an empty white box unless it cannot communicate with JS. Then it will log errors to the .swf)
		 */
		window.SwfStore = function(config){
			// make sure we have something of a configuration
			config = config || {};
			var defaults = {
				swf_url: window.dmadbar_settings.script_base + '/storage.swf',
				namespace: 'adbar',
				path: null,
				debug: false,
				timeout: 10,
				onready: null,
				onerror: null
			};
			var key;
			for(key in defaults){
				if(defaults.hasOwnProperty(key)){
					if(!config.hasOwnProperty(key)){
						config[key] = defaults[key];
					}
				}
			}
			config.namespace = config.namespace.replace(alpnum, '_');
			
			if(window.SwfStore[config.namespace]){
				throw "There is already an instance of SwfStore using the '" + config.namespace + "' namespace. Use that instance or specify an alternate namespace in the config.";
			}
			
			this.config = config;
			
			// a couple of basic timesaver functions
			function id(){
				return "SwfStore_" + config.namespace + "_" +  (counter++);
			}
			
			function div(visible){
				var d = document.createElement('div');
				document.body.appendChild(d);
				d.id = id();
				if(!visible){
					// setting display:none causes the .swf to not render at all
					d.style.position = "absolute";
					d.style.top = "-2000px";
					d.style.left = "-2000px";
				}
				return d;
			}
		
			// get a logger ready if appropriate
			if(config.debug){
				// if we're in a browser that doesn't have a console, build one
				if(typeof console === "undefined"){
					var loggerOutput = div(true);
					window.console = {
						log: function(msg){
							var m = div(true);
							m.innerHTML = msg;
							loggerOutput.appendChild(m);
						}
					};
				}
				this.log = function(type, source, msg){
					source = (source === 'swfStore') ? 'swf' : source;
					if(typeof(console[type]) !== "undefined"){
						console[type]('SwfStore - ' + config.namespace + ' (' + source + '): ' + msg);
					} else {
						console.log('SwfStore - ' + config.namespace + ": " + type + ' (' + source  + '): ' + msg);
					}
				};
			} else {
				this.log = function(){}; // if we're not in debug, then we don't need to log anything
			}
		
			this.log('info','js','Initializing...');
		
			// the callback functions that javascript provides to flash must be globally accessible
			SwfStore[config.namespace] = this;
		
			var swfContainer = div(config.debug);
			
			var swfName = id();
			
			var flashvars = "logfn=SwfStore." + config.namespace + ".log&amp;" +
				"onload=SwfStore." + config.namespace + ".onload&amp;" +  // "onload" sets this.ready and then calls the "onready" config option
				"onerror=SwfStore." + config.namespace + ".onerror&amp;" +
				(config.path ? "LSOPath=" + config.path + '&amp;' : '') +
				"LSOName=" + config.namespace;
				
				
			swfContainer.innerHTML = '<object height="100" width="500" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
				swfName + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
				'	<param value="' + config.swf_url + '" name="movie">' +
				'	<param value="' + flashvars + '" name="FlashVars">' +
				'	<param value="always" name="allowScriptAccess">' +
				'	<embed height="375" align="middle" width="500" pluginspage="https://www.macromedia.com/go/getflashplayer" ' +
				'flashvars="' + flashvars + '" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" ' +
				'name="' + swfName + '" bgcolor="#ffffff" src="' + config.swf_url + '">' +
				'</object>';
			
			this.swf = document[swfName] || window[swfName];
			
			this._timeout = setTimeout(function(){
				SwfStore[config.namespace].log('error','js','Timeout reached, assuming ' + config.swf_url + ' failed to load and firing the onerror callback.');
				if(config.onerror){
					config.onerror();
				}
			}, config.timeout * 1000);
		};
		
		// we need to check everything we send to flash because it can't take functions as arguments
		function checkData(data){
			if(typeof data === "function"){
				throw 'SwfStore Error: Functions cannot be used as keys or values.';
			}
		}

		SwfStore.prototype = {

			version: "1.7",
			
			/**
			 * This is an indicator of whether or not the SwfStore is initialized.
			 * Use the onready and onerror config options rather than checking this variable.
			 */
			ready: false,

			/**
			 * Sets the given key to the given value in the swf
			 * @param {string} key
			 * @param {string} value
			 */
			set: function(key, value){
				this._checkReady();
				checkData(key);
				checkData(value);
				//this.log('debug', 'js', 'Setting ' + key + '=' + value);
				this.swf.set(key, value);
			},
		
			/**
			 * Retrieves the specified value from the swf.
			 * @param {string} key
			 * @return {string} value
			 */
			get: function(key){
				this._checkReady();
				checkData(key);
				//this.log('debug', 'js', 'Reading ' + key);
				return this.swf.get(key);
			},

			/**
			 * Retrieves all stored values from the swf.
			 * @return {object}
			 */
			getAll: function(){
				this._checkReady();
				//this.log('debug', 'js', 'Reading ' + key);
				var data = this.swf.getAll();
				// presumably the user wants to loop through their values, not including the internal __flashBugFix value
				if(data.__flashBugFix){
					delete data.__flashBugFix;
				}
				return data;
			},

			/**
			 * Delete the specified key from the swf
			 *
			 * @param {string} key
			 */
			clear: function(key){
				this._checkReady();
				checkData(key);
				this.swf.clear(key);
			},
			
			/**
			 * We need to run this check before tying to work with the swf
			 *
			 * @private
			 */
			_checkReady: function(){
				if(!this.ready){
					throw 'SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance.';
				}
			},
			
			/**
			 * This is the function that the swf calls to announce that it has loaded.
			 * This function in turn fires the onready function if provided in the config.
			 *
			 * @private
			 */
			"onload": function(){
				// deal with scope the easy way
				var that = this;
				// wrapping everything in a timeout so that the JS can finish initializing first
				// (If the .swf is cached in IE, it fires the callback *immediately* before JS has
				// finished executing.  setTimeout(function, 0) fixes that)
				setTimeout(function(){
				  clearTimeout(that._timeout);
				  that.ready = true;
				
				  // There is a bug in flash player where if no values have been saved and the page is
				  // then refreshed, the flashcookie gets deleted - even if another tab *had* saved a
				  // value to the flashcookie.
				  // So to fix, we immediately save something
				  that.set('__flashBugFix','1');
				
				  //this.log('info', 'js', 'Ready!')
				  if(that.config.onready){
					that.config.onready();
				  }
				}, 0);
			},
			
			
			/**
			 * If the swf had an error but is still able to communicate with JavaScript, it will call this function.
			 * This function is also called if the time limit is reached and flash has not yet loaded.
			 * This function is most commonly called when either flash is not installed or local storage has been disabled.
			 * If an onerror function was provided in the config, this function will fire it.
			 *
			 * @private
			 */
			onerror: function(){
				clearTimeout(this._timeout);
				//this.log('info', 'js', 'Error reported by storage.swf');
				if(this.config.onerror){
					this.config.onerror();
				}
			}
			
		};
	}());
	//////////////
	// main app
	//////////////
	var AppAB =
	{
		utils :
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
					var s = this.trim(arr[i]);
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
			},
			
			loadScript : function(url)
			{
				var script = document.createElement("script")
				script.type = "text/javascript";
				script.characterSet = "utf-8";
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);		
			},
			
			eqArrays: function(a1, a2)
			{
				if (a1.length !== a2.length)
					return false;
				for (var i = 0; i < a1.length; ++i)
				{
					if (a1[i] !== a2[i])
						return false;
				}
				return true;
			},
			
			compareDomains : function(domain1, domain2)
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
			},
			unique : function (o)
			{
				var a = [];
				var l = o.length;
				for(var i=0; i<l; i++)
				{
					for(var j=i+1; j<l; j++)
					{
						// If this[i] is found later in the array
						if (o[i] === o[j])
						j = ++i;
					}
					a.push(o[i]);
				}
				return a;
			},
			JSON_stringify : function (obj)
			{
				var t = typeof (obj);
				if (t != "object" || obj === null)
				{
					// simple data type
					if (t == "string") obj = '"'+obj+'"';
					return String(obj);
				}
				else
				{
					// recurse array or object
					var n, v, json = [], arr = (obj && obj.constructor == Array);
					for (n in obj)
					{
						if (!obj.hasOwnProperty(n))
							continue;
						v = obj[n]; t = typeof(v);
						if (t == "string")
							v = '"'+v+'"';
						else
						if (t == "object" && v !== null)
							v = this.JSON_stringify(v);
						json.push((arr ? "" : '"' + n + '":') + String(v));
					}
					return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
				}
			},
			// implement JSON.parse de-serialization
			JSON_parse : function (str)
			{
				if (typeof(str) === 'undefined')
					return;
				if (str === "")
					str = '""';
				eval("var p=" + str + ";");
				return p;
			},
			elementTextLower : function(element)
			{
				if (typeof(element.innerText) !== 'undefined')
					return element.innerText.toLowerCase()
				else
					return element.textContent.toLowerCase()
			}
		},

		jsonFeed : function(_url, _feedId, _feedSubId)
		{
			return {url  : _url,
					feedId : _feedId,
					feedSubId : _feedSubId,

					query : function(query, count, callBackName)
					{
						var feed_url = this.url;
						feed_url += "?query=" + encodeURIComponent(query);
						//add id & subid if required
						if (typeof(this.feedId) !== 'undefined' && this.feedId !== null)
						{
							feed_url += "&feed=" + this.feedId;
						}		
						if (typeof(this.feedSubId) !== 'undefined' && this.feedSubId !== null)
						{
							feed_url += "&subid=" + this.feedSubId;
						}
						if (document.location.href !== 'undefined' && document.location.href !== null)
						{
							feed_url += "&url=" + encodeURIComponent(document.location.href);
						}
						feed_url += "&user_ip=caller&ua=caller&count=" + count + "&format=json&callback=" + callBackName;
						AppAB.utils.log(feed_url);
						AppAB.utils.loadScript(feed_url);
					},
					isEmpty : function(rs)
					{
						return (typeof(rs) === 'undefined' ||
								typeof(rs.result) === 'undefined' ||
								typeof(rs.result.listing) === 'undefined' ||
								rs.result.listing.length === 0);
					} };
		},

		//
		//	search engines
		//
		searchEngines :
		{
			rules :	
			{	
				google :
				{
					host_pattern : 'google.',
					ref_regex : /google\..+\/.*?[&|?]q=([^&]+)/g,
					url_regex : /google\..+\/.*?[&|?]q=([^&]+)/g,			
					store_keyword : function()
					{
						var kw = AppAB.searchEngines.regexp_match(document.location, this.url_regex)
						if (kw !== null) {
							AppAB.searchEngines.set_keyword(kw);
							AppAB.utils.log("save keyword [" + kw + "]");
							
						}
					}
				},
				bing :
				{
					host_pattern : 'bing.com',
					ref_regex : /bing.com\/search.*[&|?]q=([^&]+)/g,
					url_regex : /bing.com\/search.*[&|?]q=([^&]+)/g,
					ads_links : function()
					{
						var links = [];
						try
						{
							var lists = document.getElementsByTagName('UL');
							for (var i = 0; i < lists.length; i++)
							{
								if (lists[i].parentNode.className.indexOf('sb_ads') != -1)
								{
									var listElems = lists[i].getElementsByTagName('cite'),
										linkElems = lists[i].getElementsByTagName('h3');
									if (listElems.length == linkElems.length)
									{
										for (var j = 0; j < listElems.length; j++)
										{
											var domainName = AppAB.utils.elementTextLower(listElems[j]);
											if (domainName.indexOf("/") !== -1)
												domainName = domainName.substr(0, domainName.indexOf('/'));
											links.push({domain : domainName, link : linkElems[j].firstChild});
										}
									}
								}
								else
								if (lists[i].className === 'sx_l' && lists[i].parentNode.className === 'sx_m' && !lists[i].parentNode.hasOwnProperty('adbar_processed'))
								{
									lists[i].parentNode.adbar_processed = true;
									var linksElems = lists[i].parentNode.getElementsByTagName('a');
									var citeElems = lists[i].parentNode.getElementsByTagName('cite');
									for (var j = 0; j < linksElems.length; j++)
									{
										var domainName = AppAB.utils.elementTextLower(citeElems[0]);
										if (domainName.indexOf("/") !== -1)
											domainName = domainName.substr(0, domainName.indexOf('/'));								
										links.push({domain : domainName, link : linksElems[j]});
									}
								}
							}
						}catch(err){};
						return links;
					}
				},
				yahoo :
				{
					host_pattern : 'yahoo.',
					ref_regex : /search.yahoo.com\/search.+[&|?]+?p=([^&]*)/g,
					//url_regex : /search.yahoo.com\/(?:search|sponsored_search).+[&|?]+?p=([^&]*)/g ,
					url_regex : /yahoo.com/g ,
					ads_links : function()
					{
						var links = document.links;
						var ret = [];

						for (i = 0; i < links.length; i++)
						{
							var entry = null;
							//right ads sidebar
							try
							{
								if (links[i].parentNode.parentNode.className === "eads" || links[i].parentNode.parentNode.parentNode.className === "eads")
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.lastChild), link : links[i] };
								}	
							}
							catch(err){};
							
							//image search & other ads
							if (entry === null)
							try
							{
								if ((links[i].parentNode.parentNode.parentNode.className.indexOf('north')!== -1 ||
									 links[i].parentNode.parentNode.parentNode.className.indexOf('south')!== -1) &&
									links[i].parentNode.parentNode.parentNode.className.indexOf('ads')!== -1)
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.lastChild.firstChild), link : links[i] };							
								}
							}catch(err){};		
							
							//top & bottom ads
							if (entry === null)
							try
							{
								if (links[i].parentNode.parentNode.parentNode.className.indexOf("spns")!=-1 &&
									links[i].parentNode.parentNode.lastChild.tagName == "EM")
								{
									if (links[i].parentNode.tagName == 'DIV')
									{
										entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.parentNode.lastChild), link : links[i] }; //lastChild.
									}
									else
									{
										entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.lastChild), link : links[i] };
									}
									
								}
							}catch(err){};					
							
							//search in ads
							if (entry === null)
							try
							{
								if (links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className.indexOf('ads')!=-1 )
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.parentNode.parentNode.lastChild), link : links[i] };							
								}
							}catch(err){};	

							//alternative right ads panel layout
							if (entry === null)
							try
							{
								if (links[i].parentNode.parentNode.parentNode.className === "ads" && links[i].parentNode.parentNode.id == 'ysm_east')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.lastChild), link : links[i] };
								}	
							}
							catch(err){};
							
							//shopping results ads
							if (entry === null)
							try
							{
								if (links[i].parentNode.parentNode.parentNode.className === "bd" &&
									links[i].lastChild.className == 'host')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].lastChild), link : links[i] };
								}	
							}
							catch(err){};
							
							//top ad with multiple links & logo
							//menu list
							if (entry === null)
							try{
								if (links[i].parentNode.parentNode.parentNode.parentNode.className === 'rais_vert')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.parentNode.parentNode.parentNode.previousSibling), link : links[i] };
								}
							}catch(err){};
							//menu list
							if (entry === null)
							try{
								if (links[i].parentNode.parentNode.parentNode.className === 'rais_vert')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.parentNode.parentNode.previousSibling), link : links[i] };
								}
							}catch(err){};
							//main link
							if (entry === null)
							try{
								if (links[i].parentNode.parentNode.parentNode.parentNode.className === 'rais last')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].parentNode.parentNode.nextSibling.nextSibling), link : links[i] };
								}
							}catch(err){};

							//logo
							if (entry === null)
							try{
								if (links[i].className === 'thmb' && links[i].parentNode.className === 'abst')
								{
									entry = { domain : AppAB.utils.elementTextLower(links[i].nextSibling.nextSibling.nextSibling), link : links[i] };
								}
							}catch(err){};	

							if (entry !== null)
							{
							
								if (entry.domain.indexOf("/") !== -1)
									entry.domain = entry.domain.substr(0, entry.domain.indexOf('/'));
								//skip phrases
								if (entry.domain.indexOf(' ') === -1)
									ret.push(entry);	
							}	
						}
						return ret;
					}				
				},
				ask :
				{
					host_pattern : 'ask.com',
					ref_regex : /ask.com\/web.*[&|?]q=([^&]+)/g,
					url_regex : /ask.com\/web.*[&|?]q=([^&]+)/g,
					ads_links : function()
					{
						var links = [];
						var docLinks = document.links;
						for (var i = 0; i < docLinks.length; i++)
						{
							try
							{
								if (docLinks[i].parentNode.parentNode.className.indexOf('spl_ad_plus') != -1)
								{
									var domainName = AppAB.utils.elementTextLower(docLinks[i].parentNode.children[2]);
									if (domainName.indexOf("/") !== -1)
										domainName = domainName.substr(0, domainName.indexOf('/'));
									AppAB.utils.log(domainName);
									links.push({domain : domainName, link : docLinks[i]});
								}
							}catch(err){};
						}
						return links;
					}
				}
			},
			regexp_match : function(text, regexp)
			{
				if (regexp !== null)
				{
					regexp.lastIndex = 0;
					var res = regexp.exec(text);				
					if (res !== null && res.length === 2 && res[1].length > 0)
					{
						return decodeURIComponent(res[1]);
					}
				}
				return null;
			},

			keyword_from_referrer : function()
			{
				for (var ruleName in this.rules)
				{
					var rule = this.rules[ruleName];
					var res = this.regexp_match(document.referrer, rule.ref_regex);
					if (res !== null)
					{
						return res;
					}
				}
				return '';
			},
			
			is_se : function(_domain)
			{
				var domain  = _domain || document.location.host;
				for (var ruleName in this.rules) {
					var rule = this.rules[ruleName];
					if (domain.search(rule.host_pattern) != -1)
						return true;
				}
				return false;
			},
			is_post_se : function()
			{
				try {
					var domain = /(?:(?:[a-z0-9]+\.)*[a-z0-9]+\.[a-z]+)/.exec(document.referrer)[0];
					if (!domain)
						return false;
					return this.is_se(domain);
				} catch(e){};
				return false;
			},
			
			get_se : function()
			{
				var url = document.location.href;
				for (var ruleName in this.rules)
				{
					var rule = this.rules[ruleName];
					rule.url_regex.lastIndex = 0;
					if (rule.url_regex.test(url))
						return rule;
				}
				return;
			},
			
			set_keyword : function(keyword)
			{
				AppAB.settings.set('kw', keyword);
				AppAB.settings.set('kw_t', Math.round(new Date().getTime()/1000));
			},
			get_keyword : function()
			{
				var kw = AppAB.settings.get('kw'),
					kw_t = AppAB.settings.get('kw_t');
				if (!kw || !kw_t)
					return;
				if (Math.round(new Date().getTime()/1000) - kw_t > 240)
					return;
				AppAB.settings.clear('kw_t');
				AppAB.settings.clear('kw');
				AppAB.utils.log('get keyword [' + kw + '] from internal storage');
				return kw;
			}
			
		},

		feed : null,
		
		layout :
		{
			css : function(name, appendix)
			{
				var	cssModel = {'no_pad_mg_br' : 'padding: 0px !important; margin :0px !important; border: 0px none !important;',
								'nopadding' : 'padding: 0px !important;',
								'nomargin' : 'margin :0px !important;',
								'noborder' : 'border: 0px none !important;',
								'transparent_bg' : 'background-color:transparent !important;',
								'ctrl_bg' : 'background-color:#f0f0f0 !important;',
								'white_bg' : 'background-color:white !important;',
								'size_100%x100%' : 'width:100% !important; height:100% !important;',
								'height_100%' : 'height:100% !important;',
								'width_100%' : 'width:100% !important;',
								'width_100%_fixed' : 'width:100% !important; max-width:100% !important; min-width:100% !important;',
								'font' : 'font-family: Segoe UI Symbol !important;',
								'hideoverflow' : 'overflow:hidden !important;',
								'display_none' : 'display:none !important;',
								'mouseevents_auto' : 'pointer-events:auto !important;',
								'height_70px' : 'height:70px !important;max-height:70px !important;',
								'height_24px' : 'height:24px !important; max-height:24px !important;',
								'width_85px' : 'width:85px !important;min-width:85px !important;',
								'width_375px' : 'width:375px !important;min-width:375px !important;',
								'va_top' : 'vertical-align:top !important;',
								'va_middle' : 'vertical-align:middle !important;',
								'cursor_def' : 'cursor:pointer !important;;',
								'float_left' : 'float:left !important;',
								'float_right' : 'float:right !important;',
								'upcase' : 'text-transform:uppercase !important;',
								'disp_inlblock' : 'display:inline-block !important;',
								'pos_fixed' : 'position:fixed !important;',
								'txalgn_left' : 'text-align:left !important;',
								'txalgn_center' : 'text-align:center !important;',
								'black' : 'color: black !important;',
								'white' : 'color: white !important;',
								'nobgimg' : 'background-image: none !important;',
								'no_borderspacing' : 'border-spacing: 0px !important;',
								'ltr' : 'direction: ltr !important;',
		//------------------------domainmatch styles---------------------------
								'click_overlay' : 'background:white;width:100%;height:auto;position:absolute;top:24px;bottom:0;cursor:pointer;z-index:999997;opacity:0;filter: alpha(opacity=0);',
								'infobar' : 'text-align:left;width:100%; height:3em; background:#000000; z-index:999996; position:absolute; left:0; bottom: 0; opacity: 0.7; filter: alpha(opacity=70); color: white; font-size:13px; font-family: Verdana, sans-serif; height:4em; padding-top:0.50em;visibility:visible;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:100%;',
								'topbar' : 'width:100%;filter:alpha(opacity=80);opacity:0.8;background-color:white;position:relative:top:0;text-align:right;font-size:18px;font-weight:bold;border: 1px solid black;vertical-align:middle;'
								};
							
				var ret='';
				if (name.search(" ") === -1)
					ret = cssModel[name];
				else
				{
					var names = AppAB.utils.splitTrim(name, ' ');
					for (var i = 0;i < names.length;i++)
						ret+=cssModel[names[i]];
				}
				if (typeof(appendix) !== 'undefined')
					ret += appendix;
				return ret;
			},	
			create : function()
			{
				var crtr = 	
				function(_name)
				{
					
					return  {	
						e : null,
						name : _name,
						gt : function()
						{
							if (this.e)
								return this.e;
							else
							return (this.e = document.getElementById(this.name));
						},
						
						show : function()
						{
							this.gt().style.display = '';
						},
						
						hide : function()
						{
							this.gt().style.display = 'none';
						}
					};
				};
				if (document.getElementById('ab_mainholder'))
					return;
					
				this.holder = crtr('ab_mainholder');
				this.domainmatch = crtr('ab_dmholder');
				this.adbar = crtr('ab_adbar_outer_container');						
				var html =  "<table style='" + this.css('no_pad_mg_br size_100%x100% transparent_bg ltr','border-collapse:collapse;') +"'>" +
								"<tr>" +
									"<td id='ab_dmholder' style='" + this.css('height_100% nopadding display_none mouseevents_auto ltr') + "'></td>" +
								"</tr>" +
								"<tr>" +
									"<td id='ab_adbar_outer_container' style='" + this.css('height_70px nopadding display_none mouseevents_auto ltr','border-top:1px dotted black !important;') + "'>" +
									"</td>" +
								"</tr>" +
							"</table>";			
				var e = document.createElement("div");
				e.id = 'ab_mainholder';
				e.style.width='100%';
				e.style.height='100%';
				e.style.position ='fixed';
				e.style.bottom = '0px';
				e.style.left = '0px';
				try {
					e.style.backgroundColor = 'transparent !important';
				}catch(err) {
					e.style.backgroundColor = 'transparent';
				}
				e.style.pointerEvents = 'none';
				e.style.zIndex = '999990';
				document.getElementsByTagName('body') [0].appendChild(e);
				e.innerHTML = html;
				
			}
		},

		settings : new SwfStore({ 	swf_url: window.dmadbar_settings.script_base + '/storage.swf',
									namespace: 'adbar',
									path: '/',
									debug: false,
									timeout: 10,
									onready: function(){AppAB.settings.loaded = true; AppAB.exec();},
									onerror: function(){AppAB.settings.loaded = false; AppAB.exec();} }),
		limits :
		{
			counter : function(_name)
			{
				return {
							name : _name,
							inc : function()
							{
								var c = AppAB.settings.get(_name) || 0;
								AppAB.settings.set(_name,++c);
								return c;
							},
							get: function()
							{
								return AppAB.settings.get(_name) || 0;
							},
							set: function(value)
							{
								AppAB.settings.set(_name,value);
							}
						};
			},
			dm_canshow : function()
			{
				if (AppAB.settings.loaded === false)
				{
					AppAB.utils.log('Domainmatch is disabled due settings unavailability');
					return false;
				}
				
				if (AppAB.utils.readCookie('dm_showed'))
				{
					AppAB.utils.log('Domainmatch is already displayed on this domain during last 24 hours');
					return false;
				}
							
				var dmlimits = typeof(window.dmadbar_settings) !== 'undefined' && typeof(window.dmadbar_settings.dmpd)!=='undefined' ? window.dmadbar_settings.dmpd : 0 ;
				if (dmlimits != 0)
				{
					var curr_day = new Date().getDate(),
						day = AppAB.settings.get('dmlastday') || curr_day,
						dmcounter = this.counter('dmcounter'),
						dmcounter_rel = this.counter('dmcounter_rel');
					if (day != curr_day)
					{
						dmcounter.set(0);
						dmcounter_rel.set(0);
						AppAB.settings.set('dmlastday', curr_day);
						AppAB.utils.log('Domainmatch stats zeroed due new day begining');
					}
					if (dmcounter.get() >= dmlimits)
					{
						AppAB.utils.log('Can\'t show domainmatch - counter is ' + dmcounter.get() + ' and limit is ' + dmlimits);
						return false;
					}
					AppAB.utils.log('Domainmatch showing is allowed');
					return true;
				}
				AppAB.utils.log('Domainmatch showing is not allowed');
				return false;
			},
			dm_showed : function(isRelated)
			{
				if (AppAB.settings.loaded === false)
					return;
				AppAB.settings.set('dmlastday', new Date().getDate());
				if (isRelated)
					this.counter('dmcounter_rel').inc();
				this.counter('dmcounter').inc();
				AppAB.utils.createCookie('dm_showed','1', 1);
			},
			bar_canshow : function()
			{
				//read cookie for current domain
				var disabled = AppAB.utils.readCookie('adbar_disabled_cookie');
				if (!disabled)
					return true;
			},
			bar_showed : function()	{}
		},		
		domains_cache :
		{	
			ttl : 5*60, //time to live for cache element
			_shrink_domain : function(domain)
			{
				var newDomain = '';
				var parts = domain.split('.').reverse();
				var mainPartFound = false;
				if (parts.length < 2)
					return '';
				for (var i = 0; i < Math.min(3,parts.length) && mainPartFound == false;i++)
				{
					if (i == 2 && parts[2].length <=3)
						break;
					newDomain  = "." + parts[i] + newDomain;
					if (i!=0 && parts[i].length > 3)
						mainPartFound = true;
				}
				if (newDomain.length > 0)
					newDomain = newDomain.substring(1);
				return newDomain;
			},
			add_domain : function(new_domain)
			{
				if (AppAB.settings.loaded === false || new_domain.length === 0)
					return;
				this.walk_cache();
				var data = AppAB.settings.get('domains_cache') || '';
				var domains = data.length>0 ? AppAB.utils.JSON_parse(data) : {};
				new_domain = this._shrink_domain(new_domain);
				if (new_domain.length == 0)
					return;
				domains[new_domain] = Math.round((new Date()).getTime() / 1000);
				AppAB.settings.set('domains_cache',AppAB.utils.JSON_stringify(domains));
				AppAB.utils.log('adding ' + new_domain + ' domains to cache');
			},
			check_domain : function(domain)
			{
				if (AppAB.settings.loaded === false)
					return;
				this.walk_cache();
				domain = this._shrink_domain(domain);
				if (domain.length == 0)
					return false;
				var data = AppAB.settings.get('domains_cache') || '';
				var domains = data.length>0 ? AppAB.utils.JSON_parse(data) : {};
				if (typeof(domains[domain]) != 'undefined')
				{
					AppAB.utils.log('domain ' + domain + ' found in cache');
					return true;				
				}
				AppAB.utils.log('domain ' + domain + ' not found in cache');
				return false;
			},
			walk_cache : function()
			{
				if (AppAB.settings.loaded === false)
					return;
				var data = AppAB.settings.get('domains_cache') || '';
				var domains = data.length>0 ? AppAB.utils.JSON_parse(data) : {};
				var changed = false;
				for(name in domains)
				{
					if (domains.hasOwnProperty(name) &&
					   (Math.round((new Date()).getTime() / 1000) - domains[name]) > this.ttl)
				   {
						AppAB.utils.log('removing item \'' + name + '\' from cache due ttl');
						delete domains[name];
						changed = true;
				   }
				}
				if (changed)
					AppAB.settings.set('domains_cache',AppAB.utils.JSON_stringify(domains));
			}
		},
		
		features :
		{
			adbar :
			{
				mainContainer : null,
				adContainer : null,
				visible : false,
				closeHandler : null,
				_closeMenu :
				{
					elements : [{id : 'close', text : 'Close once'},
								{id : 'close_24h', text : 'Close for 24h on this domain'},
								{id : 'close_forever', text : 'Close forever on this domain'},
								{id : 'exit', text : 'Exit'} ],
										
					create : function()
					{
						var html = "<div style='background-color:#eeeeee;border:solid 1px;padding:2px;'>\n";
						for (var i = 0; i < this.elements.length; i++)
						{
							html += "<div style='" + AppAB.layout.css('cursor_def font txalgn_left','font-size:12px;') +
									"' onclick='AppAB.features.adbar._closeMenu.onclick(\"" + this.elements[i].id +
									"\");' onmouseout='AppAB.features.adbar._closeMenu.onleave(this,\"" + this.elements[i].id +
									"\");' onmouseover='AppAB.features.adbar._closeMenu.onenter(this,\"" + this.elements[i].id +
									"\");'>" + this.elements[i].text + "</div>\n";
									
						}
						html +=  "</div>\n";
						var rootMenuElem = document.getElementById('adbarmenuholder');
						if (rootMenuElem)
							rootMenuElem.innerHTML = html;
					},
					show : function()
					{
						var rootMenuElem = document.getElementById('adbarmenuholder');
						if (rootMenuElem)
							rootMenuElem.style.display="";
					},
					hide : function()
					{
						var rootMenuElem = document.getElementById('adbarmenuholder');
						if (rootMenuElem)
							rootMenuElem.style.display="none";
					},
					onclick : function(id)
					{
						switch(id)
						{
							case 'exit' :
								AppAB.features.adbar._closeMenu.hide();
								AppAB.features.adbar._closeButton.enable();
								break;
							case 'close' :
								AppAB.features.adbar.close();
								break;
							case 'close_24h' :
								AppAB.features.adbar.close();
								AppAB.utils.createCookie('adbar_disabled_cookie','disable', 1);
								break;
							case 'close_forever' :
								AppAB.features.adbar.close();
								AppAB.utils.createCookie('adbar_disabled_cookie','disable', 1800);
								break;
						}
					},
					onenter : function(e, i)
					{
						e.style.color="#ffffff";
						e.style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRjNGM0YyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjclIiBzdG9wLWNvbG9yPSIjNTk1OTU5IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTUlIiBzdG9wLWNvbG9yPSIjNjY2NjY2IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjNDc0NzQ3IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMzIlIiBzdG9wLWNvbG9yPSIjMmMyYzJjIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iNTElIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMTExMTExIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iODUlIiBzdG9wLWNvbG9yPSIjMmIyYjJiIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iOTElIiBzdG9wLWNvbG9yPSIjMWMxYzFjIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzEzMTMxMyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=)";
						e.style.backgroundColor = '#000000';
					},
					onleave : function(e, i)
					{
						e.style.color="black";
						e.style.background = "";
					}
				},
				
				_closeButton :
				{
					enabled : true,
					onclick : function()
					{
						var _this = AppAB.features.adbar._closeButton;
						if (!_this.enabled)
							return;
						AppAB.features.adbar._closeMenu.show();
						_this.enabled = false;
					},
					enable : function()
					{
						this.enabled = true;
					},
					disable : function()
					{
						this.enabled = false;
					}
				},
				
				_bottomSpacer :
				{
					id : 'adbar_bottom_spacer',
					create : function()
					{
						var el = document.createElement("DIV");
						el.id = this.id;
						el.style.width = '100%';
						el.style.height = '70px';
						el.style.display = 'none';
						document.body.appendChild(el);
					},
					show : function()
					{
						document.getElementById(this.id).style.display = 'block';
					},
					hide : function()
					{
						document.getElementById(this.id).style.display = 'none';
					}
				},
				
				_tooltip :
				{
					id : 'adbar_tooltip',
					create : function()
					{
						var el = document.createElement("DIV");
						el.id = this.id;
						el.style.width = '370px';
						el.style.height = '45px';
						el.style.display = 'none';
						el.style.position = 'fixed';
						el.style.bottom = '75px';
						el.style.right = '5px';
						el.style.zIndex = '999990';
						el.style.border = '1px dotted black';
						el.style.backgroundColor = '#f5f5f5';
						el.style.boxShadow = '2px 2px 0px 0px rgba(0,0,0,0.3)';
						document.body.appendChild(el);
						el.innerHTML = "<div style='" + AppAB.layout.css('font txalgn_left black nobgimg','font-size:13px !important; margin: 5px !important;')+ "'>Results based on search just completed. Close results bar by clicking [X].</div>";
					},
					
					show : function()
					{
						document.getElementById(this.id).style.display = 'block';
					},
					
					hide : function()
					{
						document.getElementById(this.id).style.display = 'none';
					}
				},
				
				sessionStore : 
				{
					enabled : typeof(window.sessionStorage) !== 'undefined',
					setKeyword : function (keyword)
					{
						if (this.enabled) {
							window.sessionStorage.setItem("adbar_kw", keyword);
						}
					},
					setResults : function (results)
					{
						if (this.enabled) {
							var data = AppAB.utils.JSON_stringify(results);
							window.sessionStorage.setItem("adbar_res", data);
							window.sessionStorage.setItem("adbar_time", Math.round(new Date().getTime()/1000));
						}
					},
					getKeyword :function()
					{
						if (this.enabled) {
							return window.sessionStorage.getItem("adbar_kw");
						}
					},
					getResults : function()
					{
						if (this.enabled && !this.isDataExpired()) {
							return AppAB.utils.JSON_parse(window.sessionStorage.getItem("adbar_res"));
						}
					},
					isKeywordChanged : function (keyword)
					{
						if (!this.enabled)
							return false;
						return this.getKeyword() != keyword;
					},
					clear : function()
					{
						if (this.enabled) {
							window.sessionStorage.removeItem('adbar_kw');
							window.sessionStorage.removeItem('adbar_res');
							window.sessionStorage.removeItem('adbar_time');
						};
					},
					isDataAvailable : function()
					{
						return (this.enabled && 
								!this.isDataExpired() &&
								window.sessionStorage.getItem("adbar_kw") && 
								window.sessionStorage.getItem("adbar_res"));
					},
					isDataExpired : function()
					{
						var tm = window.sessionStorage.getItem("adbar_time");
						if (!tm)
							return false;
						if (Math.round(new Date().getTime()/1000) - tm > 240)
						{
							AppAB.utils.log('data is expired - clearing');
							window.sessionStorage.removeItem('adbar_res');
							window.sessionStorage.removeItem('adbar_time');
							return true;
						}
						else
							return false;
					}
					
				},
				
				create : function(opt, _closeHandler)
				{
					this.closeHandler = _closeHandler;
					var e = AppAB.layout.adbar.gt();
					e.style.background = '#efefef url(\'' + window.dmadbar_settings.script_base + '/background.png\') repeat-x';
					
					e.innerHTML =
					"<table border=\"0\" style='" + AppAB.layout.css('width_100%_fixed no_pad_mg_br hideoverflow height_70px transparent_bg no_borderspacing') + "'>" +
					"<tr>" +
						"<td style='" + AppAB.layout.css('no_pad_mg_br width_85px height_100% transparent_bg hideoverflow va_middle') + "'>" +
							"<img style='" + AppAB.layout.css('noborder nomargin hideoverflow','width: 48px !important;height: 48px !important; padding: 0px 0px 0px 18px;') + "' src='" + window.dmadbar_settings.script_base + "/logo.png'></img>" +
						"</td>" +
						"<td style='" + AppAB.layout.css('no_pad_mg_br transparent_bg') +"'>" +					
							"<div id='adbar_adcontainer' style='" + AppAB.layout.css('height_70px hideoverflow','vertical-align:top !important;color:black;') + "'></div>" +
						"</td>" +
						"<td style='" + AppAB.layout.css('no_pad_mg_br transparent_bg width_375px va_top') + "'>" +
							"<div style='float:left !important;height:47px !important;margin-top:3px !important;width:348px !important;'>" +
								"<div style='" + AppAB.layout.css('nopadding noborder transparent_bg font cursor_def txalgn_left','font-size:11px !important;margin:0px 0px 2px 0px !important;line-height:11px !important;')+"'><span onmouseout='AppAB.features.adbar._tooltip.hide()' onmouseover='AppAB.features.adbar._tooltip.show()' style='" + AppAB.layout.css('no_pad_mg_br transparent_bg font black ','text-decoration:underline;font-size:11px !important;line-height:11px !important;')+ "'>Ads</span>&nbsp;for:</div>" +
								"<form style='" + AppAB.layout.css('size_100%x100% no_pad_mg_br') + "method='GET' action='http://www.google.com/search'>" +
									"<div style='width:342px !important;height:24px !important;border:1px solid grey !important;background-color:#ebebeb !important;padding:2px !important;'>" +
										"<div style='" + AppAB.layout.css('nopadding nomargin float_left','width:248px !important;height:22px !important;border: 1px solid grey !important;') + "'>" +									
											"<input id='adbar_search_field' type='text' style='" + AppAB.layout.css('nobgimg white_bg black size_100%x100% no_pad_mg_br font float_left upcase disp_inlblock','line-height:22px !important;font-size:15px !important;') +
											"' placeholder='Type Your Search Here....' value=\"" + opt.keyword.replace(/"/g,'\'')  + "\"></input>" +
										"</div>" +
										"<div style='" + AppAB.layout.css('height_24px nopadding noborder float_left','width:90px !important;font-size:13px !important; margin:0px 0px 0px 2px !important; line-height: 0px !important;')+"'>" +
											"<input onclick='AppAB.features.adbar.onsearch();' type='button' style='" + AppAB.layout.css('black size_100%x100% nomargin font','padding:2px 8px !important;') + "' value='SEARCH...'></input>" +
										"</div>" +
									"</div>" +
								"</form>" +
								"<a id='hidden_search_link' style='display:none !important;visibility: hidden !important;' href='http://hostmysearch.com/?prt=yhs1Danta2&errUrl=http://www.yahoo.com&keywords='></a>" +
							"</div>" +
							
							"<div id='adbarclosebutton' style='" + AppAB.layout.css('nopadding cursor_def float_right','margin-top:4px !important; width:16px !important;height:12px !important;line-height:0px !important;') + "' onclick='AppAB.features.adbar._closeButton.onclick();'>" +
								"<img style='width:12px !important;height:12px !important;' src=\"data:image/gif;base64,R0lGODlhHAAcAMQQADU1NfX19d3d3X19fa2trU1NTWVlZaKiounp6dHR0VlZWYmJicXFxbOzs19fX8TExP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAcABwAAAVkIASMZGmepoiubOu+cCzPdG3fsmGcxUAbD8aOZCAIfLKBIEAojAqEAOJAUzILUCm1ZiVEBVubNXDEAbJXXFawJChs64E18Z7FR/N6TFkmDRJTNAsLJw4NZoiJiouMjY4AKokQIQA7\"/>" +
							"</div>" +
						"</td>" +
					"</tr>" +
					"</table>" +
					"<div id='adbarmenuholder' style='" + AppAB.layout.css('display_none pos_fixed','width:auto !important;right:0px !important;bottom:70px !important; margin: 0 5px 5px 0;z-index:999999 !important;') + "'></div>";
					this._closeMenu.create();			
					this._bottomSpacer.create();
					this._tooltip.create();
				},
				
				show : function(rs)
				{
					if (typeof(rs) === 'object')
					{
						var html = '';
						this.adContainer = document.getElementById('adbar_adcontainer');				
						for (var i = 0; i < rs.result.listing.length; i++)
						{
							var e = rs.result.listing[i];
							
							html+="<div onclick='AppAB.features.adbar.onclick(\"" + e.url + "\");' style='text-align:left;cursor:pointer;border-width:1px;border-left-style:dotted;width: 200px; height:44px; overflow:hidden; padding:3px; margin:10px 10px 10px 0px; float: left;font-family:Segoe UI; font-size:10px;line-height:10px;'>" +
									  "<div style='white-space:nowrap !important;text-overflow:ellipsis !important;overflow:hidden !important;text-align:left;height:13px;font-weight:bold !important;text-transform:uppercase;font-size:10px !important;'>" + e.title + "</div>" +
									  "<div style='text-align:left;height:22px;overflow:hidden;font-size:10px !important;'>" + e.descr + "</div>" +
									  "<div style='text-align:left;display:inline;bottom:10px;'>" +
										"<a style='font-size:10px !important; color: blue !important;' href='" + e.url + "' onclick='AppAB.features.adbar.onclick();' >" + e.site + "</a>" +
									  "</div>" +
								  "</div>";
						}
						this.adContainer.innerHTML = html;
					}
					AppAB.layout.adbar.show();
					this.visible = true;
					this._bottomSpacer.show();
				},
				
				onclick : function(url)
				{
					AppAB.utils.log('click on adbar ad - clear sessionstorage');
					AppAB.features.adbar.sessionStore.clear();
					if (url)
						window.location = url;
					return true;
				},
				
				close : function()
				{
					AppAB.features.adbar.visible = false;
					AppAB.layout.adbar.hide();				
					if(AppAB.features.adbar.closeHandler)
						AppAB.features.adbar.closeHandler();				
					this._bottomSpacer.hide();
				},
				
				onsearch : function()
				{
					var inputField = document.getElementById('adbar_search_field');
					var clickLink = document.getElementById('hidden_search_link');
					if (!inputField || !clickLink)
						return;
					var keyword = inputField.value;
					if (!keyword || keyword.length == 0)
						return;
					var cancelled = false;
					clickLink.href = 'http://hostmysearch.com/?prt=yhs1Danta2&keywords=' + keyword + '&errUrl=http://www.yahoo.com';
					if (clickLink.fireEvent)
						cancelled = !clickLink.fireEvent("onclick");
					else
					if (document.createEvent)
					{
						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", true, true, window,
											   0, 0, 0, 0, 0, false, false, false, false, 0, null);
						cancelled = !clickLink.dispatchEvent(evt);
					}
					if (!cancelled)
					{
						window.location = clickLink.href;
					}
				}
			},
			
			domainmatch :
			{
				divId : 'layeredAdv',
				shown : false,
				origHtmlOverflowVal : '',
				disableCss : true,
				onSkipThisAd : null,
				rootEl : null,

				style : {	tHeight: 24,
							cText: "Skip this ad",
							bgColor: 'white',
							txtColor: '#000' },
							
				disableStyleSheets : function(disabled)
				{
					if (!this.disableCss)
						return false;
					var len = document.styleSheets.length;
					for (var i = 0; i != len; ++i)
					{
						document.styleSheets[i].disabled = disabled;
					}
				},
				
				showTags : function(tag, display)
				{
					var objs = document.getElementsByTagName(tag),
						len = objs.length;
					for (var i = 0; i != len; ++i){
					//hack to not hide a swfstore
						if (objs[i].id.toLowerCase().search('swfstore') == -1)
							objs[i].style.display = display;
					}
				},
				
				onScroll : function()
				{
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
					document.body.scrollLeft = 0;
					document.documentElement.scrollLeft = 0;
				},
				
				onResize : function()
				{
					var _this = window.AppAB.features.domainmatch;
					var h, w;
					if (_this.rootEl)
					{
						h = _this.rootEl.clientHeight;
						w = _this.rootEl.clientWidth;
					}
					else
					{
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
					}
					var el = document.getElementById(_this.divId);
					if (el == null)
						return;
					el.style.height = h + 'px';
					el.style.width = w + 'px';
					_this.onScroll();
				},
						
				init : function(rootElem, adResult, _onSkipThisAd)
				{		
					if (typeof(adResult) === 'undefined')
						return false;
					this.allowed = document.getElementById(this.divId) == null;
					if (!this.allowed)
						return false;
					this.onSkipThisAd = _onSkipThisAd ? _onSkipThisAd : null;
					var adElem = document.createElement("div");
					adElem.id = this.divId;
					//adElem.style.display = 'none';
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

					var sCButton = '<span style="cursor:pointer;line-height:normal;font-size:12px;color:' + this.style.txtColor + ';text-decoration:underline;" onClick="AppAB.features.domainmatch.close(true);">' + this.style.cText + '</span>';
					var s = "<div style='height:" + this.style.tHeight + "px;" + AppAB.layout.css('topbar') + "'>" +
							sCButton + '&nbsp;&nbsp;&nbsp;' + "</div>" +
							"<div style='" + AppAB.layout.css('click_overlay') + "' onclick='AppAB.features.domainmatch.close(false);setTimeout(function(){window.location = \"" + adResult.url + "\"},2000)'></div>" +
							"<div style='" + AppAB.layout.css('infobar font white') + "'>" + "&nbsp;&nbsp;&nbsp;<b style='" + AppAB.layout.css('font white')+ "'>" + adResult.title + "</b><br/>" +
							"&nbsp;&nbsp;&nbsp;<span style='" + AppAB.layout.css('font white', 'font-size:75%;')+ "'>" +  adResult.site + "</span><br/>" + "&nbsp;&nbsp;&nbsp;" + adResult.descr + "</div>";		
							
					adElem.innerHTML = s;
					if (rootElem)
					{
						rootElem.appendChild(adElem);
						this.rootEl = rootElem;
					}
					else
						document.body.appendChild(adElem);
					this.disableCss = false;
					return true;
				},

				show : function()
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
					//document.getElementById(this.divId).style.display = "";
					AppAB.layout.domainmatch.show();
					this.onResize();
					this.shown = true;
					return true;
				},

				close : function(restore)
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
					if (this.onSkipThisAd != null)
						this.onSkipThisAd();
					return false;
				}
			}
		},
		dmfind : function(rs, strictProbability)
		{
			if(AppAB.feed.isEmpty(rs))
				return;

			domain = document.location.host;
			var domainMatchAd = false;
			
			for (var i = 0; i < rs.result.listing.length; i++)
			{
				var adDomain = rs.result.listing[i].site;
				if (AppAB.utils.compareDomains(adDomain,domain))
				{
					AppAB.utils.log('found domain-matching ad');
					rs = rs.result.listing[i];
					rs.dm_match = true;
					domainMatchAd = true;
					break;
				}
			}		
			if (domainMatchAd === false && rs.result.listing.length === 1 && strictProbability <= Math.random())
			{
				rs = rs.result.listing[0];
                            rs.dm_match = false;
				domainMatchAd = true;
			}
			if (domainMatchAd === true)
				return rs;
		},
		running : false,
		exec : function(stage, results)
		{
			//check for https
			if (window.location.protocol === 'https:' && 
				window.location.host.search('google') === -1){
				AppAB.utils.log('Can\'t work with secure pages');
				return;
			}
			//ie in quirks mode don't support css:fixed position
			if (document.compatMode === 'BackCompat' &&
				navigator.userAgent.toLowerCase().search("msie") > -1){
				AppAB.utils.log('Can\'t work in IE Quirks Mode');
				return;
			}
			//check if body is present
			if (document.getElementsByTagName('body').length === 0)
				return;
				
			if (navigator.userAgent.toLowerCase().search("msie 7") > -1){
				AppAB.utils.log('Can\'t work in IE 7');
				return;
			}
			if (typeof(window.dmadbar_settings.fd) =='undefined' || window.dmadbar_settings.fd == 0) {
				AppAB.utils.log('Feed not defined');
				return;			
			}
			var showDM = function(res,isRelated) { 
												AppAB.utils.log('showing ' + (isRelated ? "related" : "regular") + " domain match");
												AppAB.features.domainmatch.init(AppAB.layout.domainmatch.gt(),res, function(){AppAB.layout.domainmatch.hide();});
												AppAB.limits.dm_showed(isRelated);
												AppAB.features.domainmatch.show(); };
			//first pass
			if (typeof(stage) ==='undefined' && typeof(results) === 'undefined')
			{
				//check for second run attempt
				if (AppAB.running)
				{
					AppAB.utils.log('prevent second start attempt');
					return false;
				}
				//get params from scrips url
				AppAB.utils.log('first stage');
				AppAB.layout.create();
				//check if search engine
				if (AppAB.searchEngines.is_se())
				{
					var se = AppAB.searchEngines.get_se();				
					if (typeof(se) !== 'undefined')
					{
						if (typeof(se.ads_links) !== 'undefined') {
							var domains = se.ads_links();
							for (var i = 0; i < domains.length; i++) {
								domains[i].link.onclick = (function(domain) { return function(){AppAB.domains_cache.add_domain(domain);return true;}; })(domains[i].domain);
							}
						}
						if (typeof(se.store_keyword) !== 'undefined') {
							se.store_keyword();
						}
					}
					return;
				}
				
				AppAB.feed = AppAB.jsonFeed(window.dmadbar_settings.xmlfeed, window.dmadbar_settings.fd);
				
				//now check if current domain is in cache
				if (AppAB.domains_cache.check_domain(document.location.host) == true)
				{
					AppAB.utils.log('feature temporary is disabled on current domain');
					return;
				}
				AppAB.running = true;
				//get search keyword
				window.dmadbar_settings.keyword = (window.dmadbar_settings.keyword || //debug keyword
												  AppAB.searchEngines.keyword_from_referrer() ||  //kw from se ref
												  (AppAB.searchEngines.is_post_se() && AppAB.searchEngines.get_keyword()) || //kw from internal storage if ref is se
												  AppAB.features.adbar.sessionStore.getKeyword() || //get kw from session store if site is after search engine in navigation history
												  "").replace(/\+/g,' ');
				//reset keyword and results if keyword is changed
				if (window.dmadbar_settings.keyword.length > 0 && AppAB.features.adbar.sessionStore.isKeywordChanged(window.dmadbar_settings.keyword))
				{
					AppAB.utils.log('keyword is changed - clearing session-storage');
					AppAB.features.adbar.sessionStore.clear();
				}
				//check if results already exists for current session
				if (AppAB.features.adbar.sessionStore.isDataAvailable())
				{
					AppAB.utils.log('use session-stored results for adbar');
					window.setTimeout(function(){AppAB.exec(1, AppAB.features.adbar.sessionStore.getResults(),1)});
					return;
				}
				if (window.dmadbar_settings.keyword.length > 0 && (this.limits.dm_canshow() || this.limits.bar_canshow())){
					AppAB.feed.query(window.dmadbar_settings.keyword, 10, "(function(res){AppAB.exec(1,res);})");
					return;
				}
				else
				if (window.dmadbar_settings.dm_standalone === true && this.limits.dm_canshow() && window.dmadbar_settings.fd2) {
					window.setTimeout(function(){AppAB.exec(1,{result : {listing : [] }})},1);
					return;
				}
			}
			else
			if (stage === 1 && results)
			{
				AppAB.utils.log('second stage');
				if (this.limits.bar_canshow())
				{
					if (AppAB.features.adbar.sessionStore.enabled && !AppAB.features.adbar.sessionStore.getResults())
					{
						AppAB.utils.log('store results for adbar in session-storage');
						AppAB.features.adbar.sessionStore.setResults(results);
					}
					if (results.result.listing.length > 0)
					{
						if (window.dmadbar_settings.keyword)
						{
							AppAB.utils.log('save keyword to session-storage');
							AppAB.features.adbar.sessionStore.setKeyword(window.dmadbar_settings.keyword);
						}
						else
						{
							AppAB.utils.log('retreive  keyword from session-storage');
							window.dmadbar_settings.keyword = AppAB.features.adbar.sessionStore.getKeyword();
						}
						if (window.dmadbar_settings.keyword) {
							AppAB.utils.log('showing adbar with ' + results.result.listing.length +' ads');
							AppAB.features.adbar.create({keyword : window.dmadbar_settings.keyword}, function(){AppAB.features.domainmatch.onResize();});
							AppAB.features.adbar.show(results);
						}
					}
					else
						AppAB.utils.log('no results to show adbar');
				}
				else
					AppAB.utils.log('adbar is disabled');
				//check if dm is allowed
				if (this.limits.dm_canshow())
				{
					var dme = this.dmfind(results, 1);
					//if nothing found for domainmatch - query again with another keyword=current url
					if (!dme) {
						if (typeof(window.dmadbar_settings.fd2) != 'undefined' && window.dmadbar_settings.fd2 != null) {
							AppAB.utils.log('use 2nd feed for dm');
							AppAB.feed = AppAB.jsonFeed(window.dmadbar_settings.xmlfeed , window.dmadbar_settings.fd2);
							var url = AppAB.utils.parseUri(document.location.href);			
							var keyword = url.host + url.directory;
							AppAB.feed.query(keyword, 10, "(function(res){AppAB.exec(2,res);})");
						}
					}
					else 
						showDM(dme, false);
				}
				else
					AppAB.utils.log('domain match is disabled or limits exceeded');
			}
			else
			if (stage === 2 && results) {
				AppAB.utils.log('third stage');
				var reldmAllowed = (window.dmadbar_settings.rel && (AppAB.limits.counter('dmcounter_rel').get() < window.dmadbar_settings.rel));
				var dme = this.dmfind(results, reldmAllowed ? 0 : 1);
				if (dme)
					showDM(dme, reldmAllowed && !dme.dm_match);
				else
					AppAB.utils.log('nothing to show');
			}
		}
	}
}
else
	AppAB.exec();