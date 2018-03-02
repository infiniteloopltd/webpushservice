var http = require('http');
var url = require('url');
const webpush = require('web-push');
http.createServer(function (req, res) {
	try
	{
		var queryData = url.parse(req.url, true).query;
		res.writeHead(200, {'Content-Type': 'text/html'});		
		webpush.setVapidDetails(
		  'mailto:fiach.reid@gmail.com',
		  queryData.publicKey,
		  queryData.privateKey
		);
		var pushSubscription = {
		  "endpoint": queryData.endpoint,
		  "expirationTime":null,
		  "keys":{
			  "p256dh": queryData.p256dh,
			  "auth": queryData.auth
			}
		};
		webpush.sendNotification(pushSubscription, queryData.payload);
		res.end("OK");
	}
	catch (ex)
	{
		res.end(ex.toString());
	}   
}).listen(process.env.PORT);
