var Negotiation=require("./negotiate"),HtmlApps=require("./html");exports.statusCodes={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Large",415:"Unsupported Media Type",416:"Request Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",507:"Insufficient Storage"},exports.statusMessages={};for(var code in exports.statusCodes)exports.statusMessages[exports.statusCodes[code]]=+code;exports.statusWithNoEntityBody=function(e){return e>=100&&199>=e||204==e||304==e},exports.appForStatus=function(e){return function(t){return exports.responseForStatus(t,e,t.method+" "+t.path)}},exports.responseForStatus=function(e,t,n){if(void 0===exports.statusCodes[t])throw"Unknown status code";var i=exports.statusCodes[t];if(exports.statusWithNoEntityBody(t))return{status:t,headers:{}};var r={};r["text/plain"]=exports.textResponseForStatus,e.handleHtmlFragmentResponse&&(r["text/html"]=exports.htmlResponseForStatus);var a=Negotiation.negotiate(e,r)||exports.textResponseForStatus;return a(e,t,i,n)},exports.textResponseForStatus=function(e,t,n,i){var r=n+"\n";i&&(r+=i+"\n");var a=r.length;return{status:t,statusMessage:n,headers:{"content-length":a},body:[r]}},exports.htmlResponseForStatus=function(e,t,n,i){return{status:t,statusMessage:n,headers:{},htmlTitle:n,htmlFragment:{forEach:function(e){e("<h1>"+HtmlApps.escapeHtml(n)+"</h1>\n"),e("<p>Status: "+t+"</p>\n"),i&&e("<pre>"+HtmlApps.escapeHtml(i)+"</pre>\n")}}}},exports.badRequest=exports.appForStatus(400),exports.notFound=exports.appForStatus(404),exports.methodNotAllowed=exports.appForStatus(405),exports.noLanguage=exports.notAcceptable=exports.appForStatus(406);