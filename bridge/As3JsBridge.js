var debug = 1;
var remote_ip = '127.0.0.1';

function includeJS(incFile)
{
    document.write('<script type="text/javascript" src="' + incFile+ '"></scr' + 'ipt>');
}

function QSHandler()
{
  var qs=location.search.substr(1).split("&");
  this.data=[];
  for(var i=0;i<qs.length;i++) 
    this.data[qs[i].split("=")[0]]=qs[i].split("=")[1];
  this.QueryString=function(x) 
  {
    return this.data[x];
  };
} 

var Request = new QSHandler();


var mode = Request.QueryString("mode");
if (mode==undefined)
  mode = "node";


if (mode=="html")
  includeJS("bridge/HtmlBridge.js");
else if (mode=="node")
  includeJS("bridge/NodeWebkitBridge.js");
else if (mode=="stage")
  includeJS("bridge/StageWebViewBridge.js");
  

