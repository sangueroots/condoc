.jsenabled .dock_on_load.block_settings {
	display: none;
}
.block_settings .block_tree_box .requiresjs {
	display: none;
}
.jsenabled .block_settings .block_tree_box .requiresjs {
	display: inline;
}
.block_settings .block_tree {
	margin: 5px; overflow: visible; padding-left: 0px;
}
.block_settings .block_tree li {
	list-style: none; margin: 0px;
}
.block_settings .block_tree li ul {
	margin: 0px; padding-left: 16px;
}
.block_settings .block_tree li.item_with_icon > p {
	position: relative;
}
.block_settings .block_tree li.item_with_icon > p img {
	left: 0px; top: 3px; vertical-align: middle; position: absolute;
}
.block_settings .block_tree .tree_item {
	margin: 3px 0px; text-align: left; padding-left: 18px;
}
.block_settings .block_tree .branch.tree_item {
	background-position: 0px 10%; background-image: url("image.php?theme=aardvark&image=t%2Fexpanded"); background-repeat: no-repeat;
}
.block_settings .block_tree .leaf.root_node {
	padding-left: 0px;
}
.block_settings .block_tree .active_tree_node {
	font-weight: bold;
}
.jsenabled .block_settings .block_tree .branch.tree_item {
	cursor: pointer;
}
.jsenabled .block_settings .block_tree .emptybranch.tree_item {
	background-position: 0px 10%; background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_empty"); background-repeat: no-repeat;
}
.jsenabled .block_settings .block_tree .collapsed ul {
	display: none;
}
.jsenabled .block_settings .block_tree .collapsed .branch.tree_item {
	background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed");
}
.ie6 .block_settings .block_tree .tree_item {
	width: 100%;
}
.dir-rtl .block_settings .block_tree {
	padding-right: 0px;
}
.dir-rtl .block_settings .block_tree li ul {
	padding-right: 7px; padding-left: 0px;
}
.dir-rtl .block_settings .block_tree li.item_with_icon > p img {
	left: auto; right: 0px;
}
.dir-rtl .block_navigation .block_tree .type_activity > .branch.tree_item img {
	left: auto; right: 0px;
}
.dir-rtl .block_settings .block_tree .tree_item {
	text-align: right; padding-right: 18px;
}
.dir-rtl .block_settings .block_tree .branch.tree_item {
	background-position: right;
}
.dir-rtl .block_settings .block_tree .leaf.root_node {
	padding-right: 0px;
}
.dir-rtl.jsenabled .block_settings .block_tree .emptybranch.tree_item {
	background-position: right; background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_empty_rtl");
}
.dir-rtl.jsenabled .block_settings .block_tree .collapsed .branch.tree_item {
	background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_rtl");
}
