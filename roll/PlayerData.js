var rply ={type : 'text'}; //type是必需的,但可以更改
var BoxOpen = require('./BoxOpen.js');
var BattleStates = require('./BattleStates.js');
var WB = require('./WeaponBox.js');
var AB = require('./AccessoryBox.js');
var BB = require('./BadgeBox.js');
var MB = require('./MateBox.js');
var SB = require('./SkillBox.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = Number(rows[i].gold);
					CharArr[i][3] = Number(rows[i].mirastone);
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = Number(rows[i].wmaterials);
					CharArr[i][8] = Number(rows[i].wmaterialm);
					CharArr[i][9] = Number(rows[i].wmateriall);
					CharArr[i][10] = Number(rows[i].gmaterials);
					CharArr[i][11] = Number(rows[i].gmaterialm);
					CharArr[i][12] = Number(rows[i].gmateriall);
					CharArr[i][13] = Number(rows[i].mateshards);
					
				}
				//console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(1 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].UserID = CharArr[i][0];
						rows[i].Cname = CharArr[i][1];
						rows[i].Gold = CharArr[i][2];
						rows[i].MiraStone = CharArr[i][3];
						rows[i].Title = CharArr[i][4];
						rows[i].InheritIO = CharArr[i][5];
						rows[i].InheritPassword = CharArr[i][6];
						rows[i].WmaterialS = CharArr[i][7];
						rows[i].WmaterialM = CharArr[i][8];
						rows[i].WmaterialL = CharArr[i][9];
						rows[i].GmaterialS = CharArr[i][10];
						rows[i].GmaterialM = CharArr[i][11];
						rows[i].GmaterialL = CharArr[i][12];
						rows[i].MateShards = CharArr[i][13];
						rows[i].save();

					}

					}
					console.log('玩家基本資料 更新完成');


				});



		});
	
	BattleStates.ArrayUpdate();
}
	

function main(UserID) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='你的基本資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13];
			
			if(CharArr[i][5] == 1) rply.text += '\n!!!警告 繼承模式開啟中，請盡速繼承!!!';
			
			ArrayUpdate();
			BattleStates.ArrayUpdate();
			WB.UpdateArray();
			//AB.UpdateArray();
			BB.UpdateArray();
			MB.UpdateArray();
			SB.UpdateArray();

			return rply;

		}
	}
	
	rply.text = '你的Line帳號尚未建立角色，請輸入 玩家建立 角色名 稱號(選填)  以建立角色';

	return rply;

	
	
  
	
	///

}

function SearchPlayer(Name) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == Name) {
			rply.text ='查詢結果:\
				\n角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13];

			return rply;

		}
	}
	
	if(Name == null){
		rply.text = '請輸入要查詢的角色名！';

		return rply;
		
	}
	
	rply.text = '找不到角色名為 ' + Name + ' 的角色喔！';

	return rply;

	
	
  
	
	///

}

function CreatNewPlayer(UserID,CName,Title,weapon) {
	var CTitle;
	var CharArrleng = CharArr.length;
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';

			return rply;
		}
	}
	
	
	if(CName == null||weapon == null) {
		
		rply.text = '有資料沒有填進去喔!';
				
		return rply;
        }
	
	if(Title == null) {
		
		CTitle = '冒險者';

        }else if(Title != null){
		CTitle = Title;
	}
	
	if(weapon == '木劍' || weapon == '木短杖' || weapon == '木長杖' ||weapon == '木弓' ||weapon == '普通筆記本'){
		/*BattleStates.CreatNewPlayer(UserID,CName,weapon);
		WB.CreatNewPlayer(UserID,weapon);
		AB.CreatNewPlayer(UserID);
		BB.CreatNewPlayer(UserID);
		MB.CreatNewPlayer(UserID);
		SB.CreatNewPlayer(UserID);*/
		
	}else{
		rply.text = '請不要輸入起始武器以外的武器喔...';

		return rply;
	}
	
	CharArr[CharArrleng] = [];
	
	console.log(CharArrleng);
	
	CharArr[CharArrleng][0] = UserID;
	CharArr[CharArrleng][1] = CName;
	CharArr[CharArrleng][2] = 1000;
	CharArr[CharArrleng][3] = 5;
	CharArr[CharArrleng][4] = CTitle;
	CharArr[CharArrleng][5] = 0;
	CharArr[CharArrleng][7] = 0;
	CharArr[CharArrleng][8] = 0;
	CharArr[CharArrleng][9] = 0;
	CharArr[CharArrleng][10] = 0;
	CharArr[CharArrleng][11] = 0;
	CharArr[CharArrleng][12] = 0;
	CharArr[CharArrleng][13] = 0;
	///確認玩家資料
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(1, { Userid: UserID}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
      
	rply.text = '玩家資料 ' + CName + ' 建立完成！';
				
	return rply;
	
	///

}

function InheritModeOn(userID,Cname,password){
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{
		for(var i=0; i< CharArr.length; i++){
			if(CharArr[i][1] == Cname && CharArr[i][0] !=userID){
				rply.text = '此角色不是屬於你的喔!';

				return rply;
			}
		
		}
		
		if(password == null){
			rply.text = '請輸入要用來繼承的專用密碼！(一旦建立就不能修改，請勿必記下)';

			return rply;
	
		}else{
			for(var i=0; i< CharArr.length; i++){
				if (CharArr[i][1] == Cname) {
					if (CharArr[i][5] == 1) {
						rply.text = '此角色已經開啟繼承模式了！如果忘記密碼，請找GM處理';

						return rply;
					}
					CharArr[i][5] = 1;
					CharArr[i][6] = password;
					DB.useServiceAccountAuth(creds, function (err) {
		
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 1;
									rows[i].inheritpassword = password;
									rows[i].save();
								}
							});
					});
					rply.text = '角色' + Cname + '開啟繼承模式！請輸入 繼承 角色名 繼承密碼 進行繼承';
					
					ArrayUpdate();
			
					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
	}
}

function InheritChatacter(UserID,Cname,password){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID && CharArr[i][1] != Cname){
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		
		}
	}
	
	
	if(Cname == null){
		rply.text = '請輸入要繼承的角色名！';

		return rply;
		
	}else{

		for(var i=0; i< CharArr.length; i++){
			if (CharArr[i][1] == Cname) {
				if (CharArr[i][5] == 0) {
					rply.text = '此角色尚未開啟繼承模式！';

					return rply;
				}else if (password != CharArr[i][6] ) {
					rply.text = '繼承密碼有誤，請重新嘗試！';

					return rply;
					
				}else if(CharArr[i][0] == UserID){
					rply.text = '此角色是屬於你目前使用的Line帳號喔！關閉繼承模式';
					CharArr[i][5] = 0;
					DB.useServiceAccountAuth(creds, function (err) {
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 0;
									rows[i].save();
								}
							});
					});

					return rply;
				}
				CharArr[i][5] = 0;
				CharArr[i][0] = UserID;
				CharArr[i][6] = '';
				DB.useServiceAccountAuth(creds, function (err) {
					DB.getRows(1 , 
						function (err, rows) {
							if (err) {
								console.log( err );
							}else{
								rows[i].inheritio = 0;
								rows[i].userID = UserID;
								rows[i].inheritPassword = password;
								rows[i].save();
							}
						});
				});
				rply.text = '角色' + Cname + '繼承完成！請輸入 玩家情報以進行確認';
				
				ArrayUpdate();

				return rply;

			}

		}
		rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';

		return rply;
		
	}
}

function box(UserID){
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='玩家 ' + CharArr[i][1] + '開啟寶箱！';
			
			var OpenedBox = BoxOpen.main()
			
			rply.text += '\n' + OpenedBox[9];
			
			CharArr[i][2] += Number(OpenedBox[0]);
			CharArr[i][3] += Number(OpenedBox[1]);
			CharArr[i][7] += Number(OpenedBox[3]);
			CharArr[i][8] += Number(OpenedBox[4]);
			CharArr[i][9] += Number(OpenedBox[5]);
			CharArr[i][10] += Number(OpenedBox[6]);
			CharArr[i][11] += Number(OpenedBox[7]);
			CharArr[i][12] += Number(OpenedBox[8]);
			
			ArrayUpdate();

			return rply;

		}
	}
	
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;

}

function GetArray(){
	return CharArr;

}

function switchName(UserID,Name){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的名字';
				return rply;
			}
			
			CharArr[i][1] = Name;
			ArrayUpdate();
			BattleStates.switchName(UserID,Name);
			
			
			rply.text = '更名成功！你現在的名字為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}

function switchTitle(UserID,Name){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的名字';
				return rply;
			}
			
			CharArr[i][4] = Name;
			ArrayUpdate();
			
			rply.text = '更換稱號成功！你現在的稱號為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}


module.exports = {
	main,
	SearchPlayer,
	CreatNewPlayer,
	ArrayUpdate,
	InheritModeOn,
	InheritChatacter,
	box,
	GetArray,
	switchName,
	switchTitle
};
