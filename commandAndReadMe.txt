-npm init (it will create package.json file)
-npm install bcrypt express jsonwebtoken mongoose nodemon
-To run :- nodemon app.js 
-->in package.json i added the script "dev":"nodemon app.js" so now to run the backend server/project just type :- 'npm run dev'.
-->Hence to run any script written in package.json file just use command :- 'npm run scriptName'

---To Setup MonogDb inside your Project----
->Now as we installed moongose,now we can setup mongo db either on our local machine (as we have done mysql) or we can use some outside service.So in this project we will use the free hosted copy of mongoDb coz its very easy to setup,free hosted mongoDb instance:- 'cloud.mongodb.com'.So go to cloud.mongodb.com and log in with your account and then click on 'Build a Cluster' button and then follow the intructions from videos strating 170th video

->To password hashing we are using bcrypt.But thier is one prob:-

As we know this in any hashing algo which generates random char or alphanumeric string for the password string provided,the main concern is it gives same hash string for same password string for eg if user1 enters password sunil1 then its hash string is hjiayaha and user2 also enters same password sunil1 so hash key generated for that password string will also be hjiayaha.

The user comes to register on our system and enter his/her username and password then we will apply any hashing algo to generate hash String/key and will then store that key as the password of that user in db.Next time when user comes in ,he/she will enter password and we will again convert it into hash key and compare if its same as stored in db or not.

So sometime,Hacker might do Rainbow Table Attack on our System to get the original password from the hashkey he got from our system db by doing some tricks.Now what happens in Rainbow Table Attack is once hacker gets this hash string/key then he start  searching top 5000,10000,etc passwords and their hash key.For eg data hacker got is:- 
password	hashKey
Sunil1		hjiayaha
nikhil2		odsjdisl
jayesh3		djbsakss

Now the hashKey hacker got from our system db is 'djbsakss' and from the data he has of password and their hash key ,it will be easy for him to get the original password which is jayesh3 and then he can log in into our system by entering user and that password.

So to prevent this what we will do is :- we will first append some random string to the user password before applying any hash algo to it and also after hash key/string is generated then we will append this random string to hash string and will then store it into db.Now we are using bcrypt as hashing algo in our proj and this random string in bcrypt is known as salt