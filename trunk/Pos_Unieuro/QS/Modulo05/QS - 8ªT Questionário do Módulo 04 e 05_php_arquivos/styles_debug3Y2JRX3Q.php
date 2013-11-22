.block_navigation .block_tree {
	margin: 5px; overflow: visible; padding-left: 0px;
}
.block_navigation .block_tree li {
	list-style: none; margin: 3px; padding: 0px;
}
.block_navigation .block_tree li.item_with_icon > p {
	position: relative;
}
.block_navigation .block_tree li.item_with_icon > p img {
	left: 0px; top: 3px; vertical-align: middle; position: absolute;
}
.block_navigation .block_tree li.contains_branch.item_with_icon > p img {
	left: 16px;
}
.block_navigation .block_tree li.contains_branch.item_with_icon .tree_item {
	padding-left: 34px;
}
.block_navigation .block_tree li ul {
	margin: 0px; padding-left: 0px;
}
.block_navigation .block_tree li.depth_2 ul {
	margin: 0px; padding-left: 16px;
}
.block_navigation .block_tree .tree_item {
	margin: 3px 0px; text-align: left; padding-left: 18px;
}
.block_navigation .block_tree .branch.tree_item {
	background-position: 0px 10%; background-image: url("image.php?theme=aardvark&image=t%2Fexpanded"); background-repeat: no-repeat;
}
.block_navigation .block_tree .navigation_node.branch.tree_item {
	padding-left: 0px; background-image: none;
}
.block_navigation .block_tree .type_activity > .branch.tree_item {
	position: relative; background-image: none;
}
.block_navigation .block_tree .type_activity > .branch.tree_item img {
	left: 0px; position: absolute;
}
.block_navigation .block_tree .leaf.root_node {
	padding-left: 0px;
}
.block_navigation .block_tree .active_tree_node {
	font-weight: bold;
}
.block_navigation .block_tree .current_branch.depth_1 ul {
	font-weight: normal;
}
.dock .block_navigation .tree_item {
	white-space: nowrap;
}
.jsenabled .block_navigation .block_tree .branch.tree_item {
	cursor: pointer;
}
.jsenabled .block_navigation .block_tree .emptybranch.tree_item {
	background-position: 0% 5%; background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_empty"); background-repeat: no-repeat;
}
.jsenabled .block_navigation .block_tree .collapsed ul {
	display: none;
}
.jsenabled .block_navigation .block_tree .collapsed .branch.tree_item {
	background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed");
}
.jsenabled .block_navigation .block_tree .loadingbranch.branch.tree_item {
	background-image: url("image.php?theme=aardvark&image=i%2Floading_small");
}
.jsenabled .dock_on_load.block_navigation {
	display: none;
}
.block_navigation .block_tree_box .requiresjs {
	display: none;
}
.jsenabled .block_navigation .block_tree_box .requiresjs {
	display: inline;
}
.ie6 .block_navigation .block_tree .tree_item {
	width: 100%;
}
.dir-rtl .block_navigation .block_tree li.depth_2 ul {
	padding-right: 7px; padding-left: 0px;
}
.dir-rtl .block_navigation .block_tree .tree_item {
	text-align: right; padding-right: 18px;
}
.dir-rtl .block_navigation .block_tree .branch.tree_item {
	background-position: right;
}
.dir-rtl .block_navigation .block_tree {
	padding-right: 0px;
}
.dir-rtl .block_navigation .block_tree li ul {
	padding-right: 0px;
}
.dir-rtl .block_navigation .block_tree .branch.tree_item.navigation_node {
	padding-right: 0px;
}
.dir-rtl .block_navigation .block_tree .leaf.root_node {
	padding-right: 0px;
}
.dir-rtl .block_navigation .block_tree li.item_with_icon > p img {
	left: auto; right: 0px;
}
.dir-rtl .block_navigation .block_tree .type_activity > .branch.tree_item img {
	left: auto; right: 0px;
}
.dir-rtl.jsenabled .block_navigation .block_tree .emptybranch.tree_item {
	background-position: right; background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_empty_rtl");
}
.dir-rtl.jsenabled .block_navigation .block_tree .collapsed .branch.tree_item {
	background-image: url("image.php?theme=aardvark&image=t%2Fcollapsed_rtl");
}
