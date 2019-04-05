var linebot = require('linebot');
var express = require('express');
require('fs').readdirSync(__dirname + '/modules/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./modules/' + file);
  }
});

var bot = linebot({
  	channelSecret: process.env.LINE_CHANNEL_SECRET, //這裡是讓系統抓在Heroku設定的數據
  	channelAccessToken: process.env.LINE_CHANNEL_ACCESSTOKEN // 同上
});

var app = express();

app.post('/', bot.parser());

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
	console.log("好，沒事");
});

var rply = ['',''];

bot.on('message', function(event) {
	event.source.profile().then(function (profile) {
		console.log(event);
		var src = event.source;
		var msg = event.message;
		
		if(event.message.type == 'text'){
			rply = exports.analytics.parseInput(msg.text, src.userId, profile.displayName, src.groupId);
			
			if(rply[0] == 'none'){
				if(event.source.groupId == null){
					exports.analytics.TalkCheck(src.userId,profile.displayName);
				}
				
				if(event.source.userId != 'U7b7830437667bf4b7b54eaf02e762690'){
					
					var say = profile.displayName+'說:'+event.message.text;
					if(event.source.groupId != null)say+= '(群組)';
					bot.push('U7b7830437667bf4b7b54eaf02e762690',say);
				}
			}else if(rply[0] == 'rply'){
				event.reply(rply[1]).then(function (data) {
				  // success
				}).catch(function (error) {
				  // error
				});
			}else if(rply[0] == 'push'){
			}
		}
	});
});
