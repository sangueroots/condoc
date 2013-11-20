body.has_dock {
	margin-left: 30px;
}
#dock {
	left: 0px; top: 0px; width: 30px; height: 100%; border-right-color: rgb(0, 0, 0); border-right-width: 1px; border-right-style: solid; position: fixed; z-index: 11000; background-color: rgb(255, 255, 255);
}
.nothingdocked#dock {
	display: none; visibility: hidden;
}
#dock .dockeditem .firstdockitem {
	margin-top: 1em;
}
#dock .dockedtitle {
	border-top-color: rgb(0, 0, 0); border-bottom-color: rgb(0, 0, 0); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; cursor: pointer;
}
#dock .dockedtitle h2 {
	text-align: center; line-height: 100%; font-size: 0.8em;
}
#dock .dockedtitle .filterrotate {
	margin-left: 8px;
}
#dock .controls {
	width: 100%; text-align: center; bottom: 1em; position: absolute;
}
#dock .controls img {
	cursor: pointer;
}
#dockeditempanel {
	left: 100%; position: relative; z-index: 12000; min-width: 200px;
}
.dockitempanel_hidden#dockeditempanel {
	display: none;
}
#dockeditempanel .dockeditempanel_content {
	border: 1px solid rgb(0, 0, 0); border-image: none; z-index: 12050; background-color: rgb(255, 255, 255);
}
#dockeditempanel .dockeditempanel_bd {
	width: auto; overflow: auto;
}
#dockeditempanel .dockeditempanel_bd .block_docked {
	margin: 10px;
}
#dockeditempanel .dockeditempanel_hd {
	text-align: right; border-bottom-color: rgb(0, 0, 0); border-bottom-width: 1px; border-bottom-style: solid;
}
#dockeditempanel .dockeditempanel_hd h2 {
	margin: 0px; padding-right: 1em; display: inline;
}
#dockeditempanel .dockeditempanel_hd .commands {
	display: inline;
}
#dockeditempanel .dockeditempanel_hd .commands img {
	margin-right: 2px; vertical-align: middle;
}
.ie6 #dockeditempanel {
	position: absolute;
}
.dir-rtl #dockeditempanel {
	left: 670%;
}
