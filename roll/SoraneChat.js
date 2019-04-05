var linebot = require('linebot');
var rollbase = require('./rollbase.js');
var {Wit, log} = require("node-wit");

var bot = linebot({
  	channelSecret: process.env.LINE_CHANNEL_SECRET, //這裡是讓系統抓在Heroku設定的數據
  	channelAccessToken: process.env.LINE_CHANNEL_ACCESSTOKEN // 同上
});

var WitClient = new Wit({
  	accessToken: "QEF3CPJXJGTFFS3OJUXEOPXU5V5UJGIX" // 同上
});
	
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// 空音閒談
function randomReply(userID,userName,chat) {
	var rplyArr = [] ;
	WitClient.message(chat, {}).then((data) => {
		console.log(data.entities);
		
		if(data.entities.starburst != null){
			rplyArr = [userName+'\！幫我撐十秒！！！', 
				   '化成'
				  ];
		}else{
			if(data.entities.thinking != null){
				if(data.entites.foodshop != null){
					/*let shopchoice = [];
					for(var i = 0;i<data.entites.foodshop.length;i++){
						shopchoice[i] = data.entites.foodshop[i].value;
					}*/
					rplyArr = [
						/*'\你可以選擇' + shopchoice[Math.floor((Math.random() * (shopchoice.length)) + 0)],
						'\你可以試試' + shopchoice[Math.floor((Math.random() * (shopchoice.length)) + 0)],*/
						'\我覺得你該追求自己的本性',
						'\你來決定吧'
					];
					
				}else{
					rplyArr = ['\痾...不予置評。',
						   '你何不問問神奇海螺呢？',
						  '\嗯....(專心打太鼓達人中)'];
				}
			}else if(data.entities.sorry != null){
				rplyArr = ['你想要我道歉嗎？但是我內心毫無悔意。',
					   '對...不...起...嘛...QAQ'
					  ];
			}else if(data.entities.wtf != null){
				rplyArr = [userName+'\藍色那包記得去吃', 
					   '蛤？',
					   '鬧爆',
					   '比起做這些小動作，你為何不先糾正自己的品格呢？'
					  ];
			}else if(data.entities.calling != null){
				rplyArr = [
					userName+'，感覺你很閒呢…能一直找我聊天...',
					'\有什麼事嗎？', 
					'\如果沒有需要，我回去打街機喔。',  
					'\如果有不會的指令的話，輸入help吧！',
					'\Wryyyyyyyyyyyyyyyyyy!!!!!(DIO臉)。',
					'\攤',
					'\儘管我只是一個bot，也是有遊戲要玩的。',
					'\想要確認自己的手氣的話，試試輸入"運氣"如何？',
					'\所以我說'+userName+'啊！你應該也有要做的事吧？',
					'\話說'+userName+'，你也喜歡音G嗎？',
					'\我是擔當bot而不是教機率學的，如果妳臉黑，我只會叫你儲值(被巴。',
					'\！',
					'\接下我最後的波紋吧！'+userName+'!!!!!',
					'\我的喜好嗎...？當然是音樂遊戲啊！',
					'\我的父親(?)，施彥任內心有點脆弱，拜托沒事不要傷他的心喔。',
					'\比起一直找我聊天，不如試著找其他事做吧。',
					'\稍微...讓我休息一下吧(攤'
				];
			}
		}
		
		rply.text =  rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
		bot.push(userID,rply.text);
		//bot.push("U7b7830437667bf4b7b54eaf02e762690",data.entities);
	}).catch(console.error);
	return ['push',rply];
}
////////////////

module.exports = {
	randomReply	
};
