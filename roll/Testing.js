var rply = [];
var linebot = require('linebot');
var express = require('express');
var BattileUI = require('../battlesys/battleUI.js');

var BattleInfo = BattileUI.BattleInfo;

var bot = linebot({
	channelId: "1635505649",
	channelSecret: "b59dc842309386b494bb05541e10dfb3",
	channelAccessToken: "jCV9Fe8nB3+G91MXq2eWCz5v2w+jGsE8A+kVdln0CF3E53aW5nZnzNfnlzkmVgZkf2OAxNahvylD0Z0VJ+wGDrDkfoyMQMvm525qu2T1c3h9FeL8VMMEwbTRXTEtUYO8Bfu5x0xYMwX/aoKJSHYrEAdB04t89/1O/w1cDnyilFU="
});

function ReplyTest(UserN,myText) {
	///確認系統reply功能沒問題用
	rply[0] = 'rply';
      
	if(myText == null){
		rply[1] = UserN + '\n你啥都沒說啊...';
	}else{
		rply[1] = UserN + '你剛剛說了：' + myText;
	}		
	return rply;
	
	///

}


function SecretTalk(UserID,myText) {
	///匿名淦話
	rply[0] = 'push';
	
	bot.push('Ca06e35d5eefc0162348764ce8bdb52b5',myText);
	
	//rply[1] = myText;
	///
	
	return rply;

}

function PushTest(UserID,GroupID) {
	///確認系統push功能沒問題
	rply[0] = 'push';
	
	if(GroupID != null){
		bot.push(GroupID,'你在大聲什麼啦？');
	}else{
		bot.push(UserID,'你在大聲什麼啦？');
	}
	///
	
	return rply;

}



module.exports = {
	ReplyTest,
	PushTest,
	SecretTalk
};