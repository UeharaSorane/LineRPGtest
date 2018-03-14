var rply ={type : 'text'}; //type是必需的,但可以更改
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');

function main(UserID) {
	 let PlayerNumber = 0;
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.getRows(1, function (err, rows) {
		PlayerNumber = rows.length;
	  });
	});
	
	
			
	///確認玩家資料
      
	rply.text =  '資料庫連結沒有問題\
			\n一共有' + PlayerNumber + '筆玩家資料';
				
	return rply;
	
	///

}

function CreatNewPlayer(UserID,CName,Gold,MiraStone,Title) {
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(1, { UserID: UserID, CName: CName, Gold: Gold, MiraStone: MiraStone,Title: Title }, function(err) {
		  if(err) {
		    console.log(err);
		  }
		});
	});
	
	
			
	///確認玩家資料
      
	rply.text = '玩家資料 ' + CName + '建立完成!';
				
	return rply;
	
	///

}



module.exports = {
	main,
	CreatNewPlayer
};
