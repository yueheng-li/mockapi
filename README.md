

--------------------------------------------------------------------------------
mongodb install && import db
server: mongod --dbpath "C:\A-LICHUNHUI\mongdb\data"
client: mongo

use bookdb

db.bookcollection.drop()
db.books.insert([
 { "name" : "think in java", "img":"java.jpg", "description" : "java is langugae." },
 { "name" : "think in .net", "img":"net.jpg", "description" : ".net is langugae." },
 { "name" : "think in javascript", "img":"js.jpg", "description" : "javascirpt is langugae." }
 ])


db.bookcollection.find().pretty()
db.bookcollection.find({"by":"tutorials yiibai","title": "MongoDB Overview"}).pretty()

---------------------------------------------------------------------------------
安装npm
https://nodejs.org/en/download/

cd node
npm install
npm start

----------------------------------------------------------------------------------
mongodb 
创建一个数据库
>use mydb
检查数据库列表
>show dbs
删除新数据库
>use mydb
>db.dropDatabase()
创建集合
>db.books.insert([{ "name" : "think in java", "img":"java.jpg", "description" : "java is langugae." }])
检查集合列表
>show collections
删除集合
>db.bookcollection.drop()

----------------------------------------------------------------------------------

--------------------------------------------------------------
npm install formidable@latest
大文件upload处理


------------------------------------------------------------------------
mock API
04.01.02. Get Campaign Information
/shops/AAA/campaigns?offset=10&limit=50&fields=campaign_status,campaign_id&filters=campaign_status:before_preparation&sorted_by=-campaign_id
db.shops.insert([
{"shop_id": "shop_A1","campaign_id": 1000,"campaign_name": "bingo event","start_date": new Date(),"end_date": new Date(),"budget": 10000,"discount_type": "Am","discount_rate": 100,"coupon_batch_date": new Date(),"enable_exclusion": true,"allow_combined": true,"max_order": 100,"item_registration_type": "register","status": "ok"},
{"shop_id": "shop_A1","campaign_id": 1001,"campaign_name": "bingo event","start_date": new Date(),"end_date": new Date(),"budget": 10000,"discount_type": "Am","discount_rate": 100,"coupon_batch_date": new Date(),"enable_exclusion": true,"allow_combined": true,"max_order": 100,"item_registration_type": "register","status": "ok"},
{"shop_id": "shop_A1","campaign_id": 1002,"campaign_name": "bingo event","start_date": new Date(),"end_date": new Date(),"budget": 10000,"discount_type": "Am","discount_rate": 100,"coupon_batch_date": new Date(),"enable_exclusion": true,"allow_combined": true,"max_order": 100,"item_registration_type": "register","status": "ok"},
{"shop_id": "shop_A1","campaign_id": 1003,"campaign_name": "bingo event","start_date": new Date(),"end_date": new Date(),"budget": 10000,"discount_type": "Am","discount_rate": 100,"coupon_batch_date": new Date(),"enable_exclusion": true,"allow_combined": true,"max_order": 100,"item_registration_type": "register","status": "ok"}])
