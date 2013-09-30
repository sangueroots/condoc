/** Path: parents base blocks **/
.block {border:1px solid;margin-bottom:1em;}
.block .header h2 {margin:4px;}
.block .header .block_action {float:right;margin:0 4px;vertical-align:top;}
.block .header .block_action input {margin-right:2px;}
.block .header .commands {margin-left:4px;}
.block .header .commands .icon img {width:11px;height:11px;margin-right:1px;}
.block .content {padding:4px;}
.block.hidden .content {display: none;}
.block .content .userpicture {width:16px;height:16px;margin-right:4px;}
.block .content .list li.listentry {clear:both;}
.block .content .list .c0 {display:inline;}
.block .content .list .c1 {margin-left:5px;display:inline;}
.block .footer {margin-bottom: 4px;}
.block .blockannotation {font-size:0.75em;margin: -1em 0 1em;}
.block_navigation .block_tree li {overflow:hidden;}

/** block_list blocks need column stuffs **/
.block.list_block .unlist > li > .column {display:inline-block;}
.ie6 .block.list_block .unlist .column {display:inline;}

.block.beingmoved {border-width: 2px;border-style: dashed;}
.blockmovetarget {display: block;height: 1em;margin-bottom: 1em;border-width: 2px;border-style: dashed;}

.block-region .invisible {opacity: 0.5;filter: alpha(opacity=50);}

.block .block-hider-show,
.block .block-hider-hide {cursor:pointer;}
.block .block-hider-show,
.block.hidden .block-hider-hide {display:none;}
.block.hidden .block-hider-show {display:inline;}

/** Overide for RTL layout **/
.dir-rtl .block .header,
.dir-rtl .block h2.header {text-align:right;}
.dir-rtl .block .header .commands { text-align: right;}