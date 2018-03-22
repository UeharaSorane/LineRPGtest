var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Accessory = require('./AccessoriesIllustration.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
var WeaponsArray = Accessory.GetArray();
///

///引入資料庫

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var WeaponBoxArr= [];

DB.useServiceAccountAuth(creds, function (err) {
	var PlayerNumber = 0;
	
 // 是先將資料讀進陣列
	DB.getCells(13 , 
		function (err, cells) {
			if (err) {
				console.log( err );
			}else{
				
				for(var i = 0; i<cells.length; i++){
					if(cells[i].row == 1){
						PlayerNumber++;
					
					}
				}
				
				for(var i = 0; i<PlayerNumber; i++){
					WeaponBoxArr[i] = [];
					var WeaponNumber = 0;
					
					for(var j = 0; j<cells.length; j++){
						
						if(cells[j].col == i+1){
							WeaponBoxArr[i][j-WeaponNumber] = cells[j].value;
						}else{
							WeaponNumber++;
						}
					
					}
					
				}
				console.log('玩家所持武器庫 讀取完成');
			}
		

			
			});
	
		
		
	});

function SearchAccessory(UserID){
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前裝備飾品: ' + BattleStatesDataArray[j][5] + '持有飾品一覽:\n';
					for(var k = 1; k<WeaponBoxArr[i].length; k++){
						rply.text += WeaponBoxArr[i][k] + '\n';
					}
					rply.text += '\n 想更換飾品的話，請輸入 飾品更換 要裝備的飾品名';
					
					return rply;
					
				}
				
			}
		}
	}

	rply.text = '找不到你的角色的飾品庫，請向GM確認';
	return rply;

}

function SwitchAccess(UserID,Accessory){
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前裝備飾品: ' + BattleStatesDataArray[j][5] + '\n';
					for(var k = 1; k<WeaponBoxArr[i].length; k++){
						if(WeaponBoxArr[i][k] == Accessory){
							for(var l =0; l<WeaponsArray.length; l++){
								if(WeaponsArray[l][1] == Accessory){
									
									rply.text += '更換成: ' + WeaponsArray[l][1] + '\n\
											\n -----能力值變動-----\
											\n 飾品被動: ' + BattleStatesDataArray[j][6] + '->' + WeaponsArray[l][2] + '\
											\n Hp:' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]);
									BattleStatesDataArray[j][12] = WeaponsArray[l][3];
									rply.text += '->' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]) + '\n\
											\n Mp:' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]);
									
									BattleStatesDataArray[j][17] = WeaponsArray[l][4];
									
									rply.text+= '->' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]) +'\n\
											\n Atk:' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]);
									BattleStatesDataArray[j][22] = WeaponsArray[l][5];
									
									rply.text += '->' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]) +'\n\
									\n-------------------------';
									
									
									BattleStatesDataArray[j][5] = WeaponsArray[l][1];
									BattleStatesDataArray[j][6] = WeaponsArray[l][2];
									
									BattleStates.saveArray(BattleStatesDataArray);
									
									return rply;
									
									
								}
							
							}
							
							rply.text += '\n 錯誤！你持有圖鑑沒有的飾品，請回報給GM確認';
							return rply;
							
						}
					}
					if(Accessory == null){
						rply.text = '請輸入你要裝備的飾品！';
						return rply;
					}
					
					rply.text = '你尚未擁有飾品' + Accessory + '喔！';
					return rply;
					
				}
				
			}
			
			rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
			return rply;
			
		}
	}

	rply.text = '找不到你的角色的飾品庫，請向GM確認';
	return rply;
	
}

module.exports = {
	SearchAccessory,
	SwitchAccess
};