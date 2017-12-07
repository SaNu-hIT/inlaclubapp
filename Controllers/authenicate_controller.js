var connection = require('./../Config');
module.exports.authenticate=function(req,res){

    var phonenumber=req.body.phonenumber;
    var password=req.body.password;
     console.log(phonenumber);
      console.log(password);

    connection.query('SELECT * FROM login_credentials WHERE username = ?',[phonenumber], function (error, results, fields) {
      if (error) {
       
         console.log("Api error please report admin");
          res.json({
            status:false,
            message:"Api error please report admin"
            })
              
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'Successfully authenticated'
                })
                console.log("Successfully authenticated");
            }else{
               res.send(String(phonenumber));
                res.json({
                  status:false,
                  message:"Phonenumber and password does not match"
                 });
                 console.log("Phonenumber and password does not match");
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"User does not exits"
          });
             console.log("User does not exits");
         
        }
      }
    });
}
