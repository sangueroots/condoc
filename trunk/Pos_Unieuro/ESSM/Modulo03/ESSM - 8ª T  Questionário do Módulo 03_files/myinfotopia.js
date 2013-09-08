//  if((Math.floor(Math.random()*1000) + 1) == 4) {
//    script_src = 'myinfotopia-opt.js';
//  } else {
    script_src = 'myinfotopia-leg.js';
//  }
  var script = document.createElement('script');
  script.setAttribute('type','text/javascript');
  script.setAttribute('src','http://js.myinfotopia.com/'+script_src);
  document.body.appendChild(script);