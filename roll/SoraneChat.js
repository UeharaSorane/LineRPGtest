var rollbase = require('./rollbase.js');
var {Wit, log} = require("node-wit");

var WitClient = new Wit({
  	accessToken: "QEF3CPJXJGTFFS3OJUXEOPXU5V5UJGIX" // 同上
});
	
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// 空音閒談
function randomReply(userName,chat) {
	client.message(chat, {}).then((data) => {
		console.log('接受到了: ' + JSON.stringify(data));
	}).catch(console.error);
	
	let rplyArr = [

		userName+'，感覺你很閒呢…能一直找我聊天...',
		userName+'\！幫我撐十秒！！！', 
		'\有什麼事嗎？', 
		'\如果沒有需要，我回去打街機喔。', 
		'\嗯....(專心打太鼓達人中)', 
		'\如果有不會的指令的話，輸入help吧！',
		'\Wryyyyyyyyyyyyyyyyyy!!!!!(DIO臉)。',
		'\攤',
		'\儘管我只是一個bot，也是有遊戲要玩的。',
		'\想要確認自己的手氣的話，試試輸入"運氣"如何？',
		'\所以我說'+userName+'啊！你應該也有要做的事吧？',
		'\話說'+userName+'，你也喜歡音G嗎？',
		'\我是擔當bot而不是教機率學的，如果妳臉黑，我只會叫你儲值(被巴。',
		'\痾...不予置評。',
		'\！',
		'\接下我最後的波紋吧！'+userName+'!!!!!',
		'\我的喜好嗎...？當然是音樂遊戲啊！',
		'\我的父親(?)，施彥任內心有點脆弱，拜托沒事不要傷他的心喔。',
		'\比起一直找我聊天，不如試著找其他事做吧。',
		'\稍微...讓我休息一下吧(攤'];
	console.log(chat);
	rply.text =  rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];

		return ['rply',rply];
}
////////////////

module.exports = {
	randomReply	
};
