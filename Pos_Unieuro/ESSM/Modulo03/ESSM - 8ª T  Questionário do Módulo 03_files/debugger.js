var debugWindow;
function showDebug(name) {
    //appAPI.db.get(function (openDebug)
    //{
    try {

        //            if (openDebug == null)
        //            {
        //                appAPI.db.set(success,"debug", 0);
        //                appAPI.db.set(success,"debuglevel", 0);
        //                return;
        //            }
        //            else
        //            {
        //                if (!openDebug)
        //                {
        //                    return;
        //                }
        //            }
        var windowname = "Debug";
        if (name) {
            windowname = name;
        }
        debugWindow = window.open("", windowname, "left=0,top=0,width=300,height=700,scrollbars=yes," + "status=yes,resizable=yes");
        //   debugWindow = appAPI.openURL("", "window", "left=0,top=0,width=300,height=700,scrollbars=yes," +
        // "status=yes,resizable=yes");
        debugWindow.opener = self;
        // open the document for writing
        debugWindow.document.open();
        debugWindow.document.write("<HTML><HEAD><TITLE>Debug Window</TITLE></HEAD><BODY><PRE>\n");
        debugWindow.document.write('###########################################################################################' + "\n");
    }
    catch (ee) { }
    // }, "debug");


}

function debug(text) {
    debug(text, 1);
}
// If the debug window exists, then write to it
function debug(text, level) {
    try {
        //        var dlevel = appAPI.db.get("debuglevel");
        //        if (dlevel && (level < dlevel || typeof(level) == "undefined"))
        //        {
        //            return;
        //        }
        text = new Date().getTime() + "----" + text;
        if (debugWindow && !debugWindow.closed) {
            if (level) {
                var styling = '<span style="color:';
                switch (level) {
                    case 1: styling += "gray";
                        break;
                    case 2: styling += "black";
                        break;
                    case 3: styling += "white;background-color:green";
                        break;
                    case 4: styling += "black;background-color:yellow";
                        break;
                    case 5: styling += "red";
                        break;
                    case 6: styling += "white;background-color:blue";
                        break;
                }
                styling += '">';
                debugWindow.document.write(styling + text + "</span>\n");
            }
            else {
                debugWindow.document.write(text + "\n");
            }
        }
    }
    catch (ee) { }
}

// If the debug window exists, then close it
function hideDebug() {
    if (window.top.debugWindow && !window.top.debugWindow.closed) {
        window.top.debugWindow.close();
        window.top.debugWindow = null;
    }
}


function logStackTrace() {
    var callstack = [];
    var isCallstackPopulated = false;
    try {
        i.dont.exist += 0; //doesn't exist- that's the point
    } catch (e) {
        if (e.stack) { //Firefox / chrome
            var lines = e.stack.split('\n');
            for (var i = 0, len = lines.length; i < len; i++) {
                callstack.push(lines[i]);
            }
            //Remove call to logStackTrace()
            callstack.shift();
            isCallstackPopulated = true;
        }
        else if (window.opera && e.message) { //Opera
            var lines = e.message.split('\n');
            for (var i = 0, len = lines.length; i < len; i++) {
                if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
                    var entry = lines[i];
                    //Append next line also since it has the file info
                    if (lines[i + 1]) {
                        entry += " at " + lines[i + 1];
                        i++;
                    }
                    callstack.push(entry);
                }
            }
            //Remove call to logStackTrace()
            callstack.shift();
            isCallstackPopulated = true;
        }
    }
    if (!isCallstackPopulated) { //IE and Safari
        var currentFunction = arguments.callee.caller;
        while (currentFunction) {
            var fn = currentFunction.toString();
            var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
            callstack.push(fname);
            currentFunction = currentFunction.caller;
        }
    }

    debug(callstack.join('\n'));

}
