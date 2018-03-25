var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var PlayerData = require('./PlayerData.js');
var WeaponBox = require('./WeaponBox.js');
var BadgeBox = require('./BadgeBox.js');
var MateBox = require('./MateBox.js');


var ShopDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var ShopArr= [];

ShopDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	ShopDB.getRows(18 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ShopArr[i] = [];
					
					ShopArr[i][0] = rows[i].goodid;
					ShopArr[i][1] = rows[i].name;
					ShopArr[i][2] = rows[i].type;
					ShopArr[i][3] = rows[i].cost;
					ShopArr[i][4] = rows[i].weapon;
					ShopArr[i][5] = rows[i].accessory;
					ShopArr[i][6] = rows[i].badge;
					ShopArr[i][7] = rows[i].mate;
					ShopArr[i][8] = rows[i].item;
					ShopArr[i][9] = Number(rows[i].WMS);
					ShopArr[i][10] = Number(rows[i].WMM);
					ShopArr[i][11] = Number(rows[i].WML);
					ShopArr[i][12] = Number(rows[i].GMS);
					ShopArr[i][13] = Number(rows[i].GMM);
					ShopArr[i][14] = Number(rows[i].GMM);
					ShopArr[i][15] = rows[i].gdescription;
					
				}
				//console.log(ShopArr);
				console.log('夥伴商店資料 讀取完成');
			}
		

			
			});
	
		
		
	});

function MateShop(UserID,Goods){

}