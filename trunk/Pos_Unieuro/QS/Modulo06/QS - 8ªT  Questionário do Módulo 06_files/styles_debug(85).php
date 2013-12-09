/** Path: parents base dock **/
/**
 * Whilst the dock isn't supported by the base theme this CSS is here so that those
 * themes that do want to use the dock will have a starting point at least
 */

/* Put a margin on the body if the dock is shown */
body.has_dock {margin-left:30px;}

/** For the dock itself */
#dock {width:30px;position:fixed;top:0px;left:0px;height:100%;background-color:#FFF;border-right:1px solid #000;z-index:11000;}
#dock.nothingdocked {visibility: hidden;display:none;}
#dock .dockeditem .firstdockitem {margin-top:1em;}
#dock .dockedtitle {border-bottom:1px solid #000;border-top:1px solid #000;cursor:pointer;}
#dock .dockedtitle h2 {font-size:0.8em;line-height:100%;text-align:center;}
#dock .dockedtitle .filterrotate {margin-left:8px;}
#dock .controls {position:absolute;bottom:1em;text-align:center;width:100%;}
#dock .controls img {cursor:pointer;}

/** For the panel the docked blocks are shown in */
#dockeditempanel {min-width:200px;position:relative;z-index:12000;left:100%;}
#dockeditempanel.dockitempanel_hidden {display:none;}
#dockeditempanel .dockeditempanel_content {background-color:#fff;border:1px solid #000;z-index:12050;}
#dockeditempanel .dockeditempanel_bd {overflow:auto;width:auto;}
#dockeditempanel .dockeditempanel_bd .block_docked {margin:10px;}
#dockeditempanel .dockeditempanel_hd {border-bottom:1px solid #000;text-align:right;}
#dockeditempanel .dockeditempanel_hd h2 {display:inline;margin:0;padding-right:1em;}
#dockeditempanel .dockeditempanel_hd .commands {display:inline;}
#dockeditempanel .dockeditempanel_hd .commands img {margin-right:2px;vertical-align:middle;}

/** IE 6 doesn't support fixed pos elements **/
.ie6 #dockeditempanel {position:absolute;}

/** Overide for RTL layout **/
.dir-rtl #dockeditempanel {left:670%;}