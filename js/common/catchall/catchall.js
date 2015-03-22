window.onerror = function (msg, url, line, col, error) {
    if (window.debug == undefined || window.debug){
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;
        alert("err 1: " + msg + "\nurl: " + url + "\nline: " + line + extra);
        var suppressErrorAlert = true;
        return suppressErrorAlert;
    }
};

window.log = function (msg) {
    if (window.debug)
        alert(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ': ' + msg);
};