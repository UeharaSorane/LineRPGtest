var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// 系統幫助
function Help(userN) {
	rply.text =
	'嗨！'+userN+'我是上原空音，簡單介紹一下我能做什麼吧！\
	\n --傷害骰(a XdY+b)--\
	\n 如果輸入2d6+1　攻撃！\
	\n 就會輸出）2d6+1：攻撃  9[6+3]+1 = 10\
	\n 如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。\
	\n 以下還有其他例子\
	\n 5 3D6 	：分別骰出5次3d6\
	\n 5B10：不加總的擲骰 會進行小至大排序 \
	\n 5B10 9：如上,另外計算其中有多少粒大過9 \
	\n 5U10 8：進行5D10 每骰出一粒8會有一粒獎勵骰 \
	\n 5U10 8 9：如上,另外計算其中有多少粒大過9 \
	\n--機率骰(ccb)--\
	\n CCb （目標値）：做出成功或失敗的判定\
	\n例）CCb 30\
	\n--Bot娛樂功能--\
	\n 占卜運氣功能 字句中包括運氣即可\
	\n 死亡FLAG：句子裡出現 Flag/flag/插旗 就能讓你輕鬆插旗\
	\n 如果呼叫空音的名子...好像會有事情發生？';

	return ['rply',rply];
}

////////////////

module.exports = {
	Help:Help
};
