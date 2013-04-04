/** Path: parents base course **/
/**
 * CSS for displaying courses and everything in them
 */
.section_add_menus {text-align:right;}
.section_add_menus .horizontal div,
.section_add_menus .horizontal form {display:inline;}
.section_add_menus optgroup {font-weight:normal;font-style: italic;}

.course-content .section .activity img.activityicon {vertical-align:middle;height:16px;width:16px;}
.course-content .section .activity .commands img.iconsmall {vertical-align: baseline;}

#page-site-index .subscribelink {text-align:right;}
#page-site-index .headingblock {margin-bottom: 9px;}
#page-site-index .clearfloat {float: none;clear: both; height:0px;}

.path-course-view .headingblock {margin-bottom: 9px;}
.path-course-view .subscribelink {text-align:right;}
.path-course-view .unread {margin-left: 3em;}
.path-course-view .block.drag .header {cursor: move;}
.path-course-view .completionprogress {float:right;}
.path-course-view .completionprogress img.iconhelp {vertical-align:top;}
.path-course-view .section .summary {line-height:normal;}

.path-course-view li.activity {margin-right:20px; position:relative;}
.path-course-view li.activity span.autocompletion,
.path-course-view li.activity form.togglecompletion {display:inline;position:absolute;right:-20px;top:0;padding:0.2em 0;}
.path-course-view li.activity form.togglecompletion div {display:inline;}
.path-course-view li.activity form.togglecompletion .ajaxworking {position:absolute;top:0; left:20px;width: 20px; height: 20px;background: url(image.php?theme=aardvark&image=i%2Fajaxloader) no-repeat;}
.dir-rtl.path-course-view li.activity {margin-right:0px;margin-left:20px;}
.dir-rtl.path-course-view li.activity form.togglecompletion,
.dir-rtl.path-course-view li.activity span.autocompletion {right:auto;left:-20px;}

.section img.movetarget {height:16px;width:80px;}

#page-course-enrol .generalbox,
#page-course-enrol .coursebox {margin-top: 20px;}

#page-course-pending .singlebutton,
#page-course-category #renameform,
#page-course-category #themeform,
#page-course-category #coursesearch,
#page-course-category .singlebutton,
#page-course-editsection .singlebutton {text-align:center;}

#coursesearch,
#coursesearch2 {margin-top: 1em;text-align:center;}

#page-course-info .generalbox.icons {text-align: center;}
#page-course-info .generalbox.info {margin-left:auto;margin-right:auto;}

#page-course-pending .pendingcourserequests {margin-bottom: 1em;}
#page-course-pending .pendingcourserequests .singlebutton {display: inline;}
#page-course-pending .pendingcourserequests .cell {padding: 0 5px;}
#page-course-pending .pendingcourserequests .cell.c6 {white-space: nowrap;}


.coursebox {width: 100%;margin-bottom: 15px;}
.coursebox .info {float: left;text-align:left;width: 40%;}
.coursebox .summary {float: right;text-align:left;width: 55%;}
.coursebox .summary .category {text-align:right;}
.coursebox .teachers li {list-style-type:none;padding:0;margin:0;}

.categorylist {width: 100%;}
.categorylist .category .numberofcourse {font-style: italic; font-size: 0.85em; font-style: normal;}
.categorylist .category {padding-top: 5px; padding-bottom: 5px; }
.categorylist .category .info,
.categorylist .category .indentation,
.categorylist .category .name,
.categorylist .category .image,
.categorylist .course .name,
.categorylist .course .info {float:left;text-align: left;}
.categorylist .course {padding-left:18px;}

.categorylist .indentation {padding-left: 20px;}
#page-course-index .category .image {padding-right: 2px;}

.course ul.section {margin:5px;padding:0;}

.weeks-format, /* Window-width: 800 pixels.IE doesn't support, see inline IE conditional comment. */
.topics-format {margin-top: 8px;min-width: 763px;}
.categoryboxcontent {border-width:1px;border-style:solid;}

/* Course and category combo list on front page */
.course_category_tree .controls {visibility: hidden;}
.course_category_tree .controls div {display:inline;cursor:pointer;}
.course_category_tree .category.with_children>.category_label {background-image:url(image.php?theme=aardvark&image=t%2Fexpanded);background-repeat: no-repeat;}
.course_category_tree .category_label {padding-left:13px;}
.course_category_tree .category .category {margin:5px;}
.course_category_tree .category .courses {padding-left:16px;}
.course_category_tree .category .courses .course_link {display:block;background-image:url(image.php?theme=aardvark&image=i%2Fcourse);background-repeat: no-repeat;padding-left:18px;}
.course_category_tree .category .course {position:relative;}
.course_category_tree .category .course_info {position:absolute;right:0;top:0;}
.course_category_tree .category .course_info a,
.course_category_tree .category .course_info div {float:left;width:16px;height:16px;}
.jsenabled .course_category_tree .controls {visibility: visible;}
.jsenabled .course_category_tree .category.with_children.collapsed .category_label {background-image:url(image.php?theme=aardvark&image=t%2Fcollapsed);}
.jsenabled .course_category_tree .category.with_children.collapsed .subcategories,
.jsenabled .course_category_tree .category.with_children.collapsed .courses {display:none;}

.path-course .clearfloat {float:none; clear:both;height:0px;}


/*all courses view*/
#page-course-index .categorylist .course.clearfloat { height: auto; }

/**
* Overide for RTL layout
*/
.dir-rtl .coursebox .info {float: right; text-align: right;}
.dir-rtl .coursebox .summary {text-align:right;}
.dir-rtl .course_category_tree .category.with_children> .category_label {background-position: center right; padding-right: 18px;}
.dir-rtl .course_category_tree .category_label, .dir-rtl .course_category_tree .category .course {padding-right:18px;}
.dir-rtl.jsenabled .course_category_tree .category.with_children.collapsed .category_label {background-image:url(image.php?theme=aardvark&image=t%2Fcollapsed_rtl);}
.dir-rtl .course_category_tree .category .courses .course_link {background-position:center right; padding-right:18px;}
.dir-rtl .clearfloat {float:none; clear:both;height:0px;}
.dir-rtl .categorylist .category .info,
.dir-rtl .categorylist .category .indentation,
.dir-rtl .categorylist .category .name,
.dir-rtl .categorylist .category .image,
.dir-rtl .categorylist .course .name,
.dir-rtl .categorylist .course .indentation,
.dir-rtl .categorylist .course .info {float:right;text-align: right;}
.dir-rtl .categorylist .course {padding-right:18px;}

#page-course-index.dir-rtl .category .image {padding-left: 5px; padding-right: 0px;}
#page-course-index.dir-rtl .indentation {padding-left: 0px;padding-right: 30px;}

table.category_subcategories {margin-bottom:1em;}
table.category_subcategories td {white-space: nowrap;}
