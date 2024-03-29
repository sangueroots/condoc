/** Path: parents base question **/
/* Question */
.questionbank h2 {margin-top: 0;}
.questioncategories h3 {margin-top: 0;}

#chooseqtypebox {margin-top: 1em;}
#chooseqtype h3 {margin: 0 0 0.3em;}
#chooseqtype .instruction {display: none;}
#chooseqtype .fakeqtypes {border-top: 1px solid silver;}
#chooseqtype .qtypeoption {margin-bottom: 0.5em;}
#chooseqtype label {display: block;}
#chooseqtype .qtypename img {padding: 0 0.3em;}
#chooseqtype .qtypesummary {display: block;margin: 0 2em;}
#chooseqtype .submitbuttons {margin: 0.7em 0;text-align: center;}

#qtypechoicecontainer {display: none;}
body.jsenabled #qtypechoicecontainer {display: block;}

#qtypechoicecontainer {background: white;}
#qtypechoicecontainer #chooseqtype {width: 30em;}
#qtypechoicecontainer #chooseqtypehead h3 {margin: 0;}
#qtypechoicecontainer #chooseqtype .qtypes {position: relative;border-bottom: 1px solid grey;padding: 0.24em 0;}
#qtypechoicecontainer #chooseqtype .qtypeoption {margin-bottom: 0; padding: 0.2em 0 0.2em 0.3em;}
#qtypechoicecontainer #chooseqtype .qtypeoption img {vertical-align: middle;}
#qtypechoicecontainer #chooseqtype .instruction,
#qtypechoicecontainer #chooseqtype .qtypesummary {display: none;position: absolute;top: 0px;right: 0px;bottom: 0px;left: 60%;margin: 0;border-left: 1px solid grey;padding: 0.3em 0.5em;background-color: white;}
#qtypechoicecontainer #chooseqtype .instruction,
#qtypechoicecontainer #chooseqtype .selected .qtypesummary {display: block;}

#categoryquestions { margin: 0; }
#categoryquestions td,
#categoryquestions th { padding: 0 0.2em; }
.questionbank .singleselect { margin: 0; }

/* Question editing form */
#combinedfeedbackhdr div.fhtmleditor {padding: 0;}
#combinedfeedbackhdr div.fcheckbox {margin-bottom: 1em;}

.que {clear: left;text-align: left;margin: 0 auto 1.8em auto;}
.dir-rtl .que {text-align: right;}

.que .info {float: left;width: 7em;padding:0.5em;margin-bottom: 1.8em;background: #eee;}
.que h2.no {margin: 0;font-size: 0.8em;line-height: 1;}
.que span.qno {font-size: 1.5em;font-weight:bold;}
.que .info > div {font-size: 0.8em;margin-top: 0.7em;}
.que .info .questionflag.editable {cursor:pointer;}
.que .info .editquestion img,
.que .info .questionflag img,
.que .info .questionflag input {vertical-align: bottom;}

.que .content {margin: 0 0 0 8.5em;}

.que .formulation,
.que .outcome,
.que .comment,
.que .history {padding: 0.5em;margin: 0 0 0.5em;}
.que .formulation {background: #e4f1fa;}
.que .outcome {background: #fff3bf;}
.que .comment {background: #e0ffe0;}
.que .history {background: #eee;}

.que .ablock {margin: 0.7em 0 0.3em 0;}
.que .im-controls {margin-top: 0.5em;text-align: left;}
.dir-rtl .que .im-controls {text-align: right;}

.que .specificfeedback,
.que .generalfeedback,
.que .rightanswer,
.que .im-feedback,
.que .feedback,
.que p {margin: 0 0 0.5em;}
.que .qtext {margin-bottom: 1.5em;}

.que .correct {background-color: #afa;}
.que .notanswered,
.que .incorrect {background-color: #faa;}
.que .partiallycorrect {background-color: #ff9;}
.que .validationerror {color: #a00;}
.que .grading,
.que .comment,
.que .commentlink,
.que .history {margin-top: 0.5em;}

.que .history h3 {margin: 0 0 0.2em;font-size: 1em;}
.que .history table {width: 100%;margin: 0;}
.que .history .current {font-weight: bold;}

.importerror {margin-top: 10px;border-bottom: 1px solid #555;}
.mform .que.comment .fitemtitle {width: 20%;}

/** Overide for RTL layout **/
.dir-rtl #qtypechoicecontainer #chooseqtype .instruction,
.dir-rtl #qtypechoicecontainer #chooseqtype .qtypesummary {right: 60%;left: 0%; border-left:0;border-right: 1px solid grey;}
#qtypechoicecontainer #chooseqtype .qtypeoption {padding-right: 0.3em;}