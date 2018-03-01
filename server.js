var http = require('http');
var url = require('url');
const webpush = require('web-push');
http.createServer(function (req, res) {
    var queryData = url.parse(req.url, true).query;
    res.writeHead(200, {'Content-Type': 'text/html'});
    var vapidKeys = {
        publicKey: queryData.publicKey,
        privateKey: queryData.privateKey
    };
    webpush.setVapidDetails(
      'mailto:fiach.reid@gmail.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
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
}).listen(8081);
