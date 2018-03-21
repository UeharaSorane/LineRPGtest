var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Weapons = require('./WeaponIllustration.js');
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
	DB.getCells(12 , 
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
					
					for(var j = 1; j<=cells.length; j++){
						
						if(cells[j].col == i+1){
							WeaponBoxArr[i][j-WeaponNumber-1] = cells[j].value;
						}else{
							WeaponNumber++;
						}
					
					}
					
					for(var j = 0;)
					
				}
				
     				console.log(WeaponBoxArr[0]);

				
				//console.log(cells);
				//console.log('玩家所持武器庫 讀取完成');
			}
		

			
			});
	
		
		
	});
