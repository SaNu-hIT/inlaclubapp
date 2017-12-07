var connection = require('./../Config');
module.exports.addcategoy=function(req,res){

  var categoryname=req.body.categoryname;
  // var code=req.body.code;


  // var sql = "INSERT INTO `categories` (`id`, `name`) VALUES ('"+code+"', '"+categoryname+"');"

  var sql = "INSERT INTO `categories` (`name`) VALUES ('"+categoryname+"');"
  
  console.log(sql);

  connection.query(sql, function (err, result) {
   console.log(err);
   if (err) {
    res.json({
      status:false,
      message:"Api error please report to admin"
    })
  }else{
   res.json({
    status:true,
    message:"Successfully saved"
  })
 }
});

}
var connection = require('./../Config');
module.exports.updateCategory=function(req,res){

  var categoryname=req.body.categoryname;
  var code=req.body.code;

//  var sql = "UPDATE 'categories' SET 'name' = "+ categoryname +" WHERE 'id' = "+ code


 var sql="UPDATE `categories` SET `name`='"+ categoryname +"' WHERE id="+ code
 console.log(sql);
  connection.query(sql, function (err, result) {
   console.log(err);
   if (err) {
    res.json({
      status:false,
      message:"Api error please report to admin"
    })
  }else{
   res.json({
    status:true,
    message:"Successfully updated"
  })
 }
});

}


var connection1 = require('./../Config');
module.exports.listCategory=function(req,res){
var sql = "SELECT * FROM `categories` ORDER BY `name` ASC"
console.log(sql);
  connection1.query(sql, function (err, result, fields) {

    if (err) {

      res.json({
        status:false,
        message:"No data found"

      })
    }else{
         // console.log(result);
         res.json({
          status:true,
          message:"Successful",
          data:result
        })
       }

     });
  

}



var connection2 = require('./../Config');

module.exports.listCategorybyid=function(req,res){
 var codes=req.body.code;
 console.log(codes);
  var sql = "SELECT * FROM categories WHERE id = '"+codes+"'";
 connection2.query(sql, function (err, result, fields) {
  if (err) {
    console.log(err)
    res.json({
      status:false,
      message:"No data found"

    })
  }else{
   console.log(result);
   res.json({
    status:true,
    message:"Successful",
    data:result
  })
 }
 
});
}

var connection3 = require('./../Config');
module.exports.deletecategory=function(req,res){
  var code=req.body.code;

  var sql = "DELETE FROM categories WHERE id = '"+code+"'";

  connection3.query(sql, function (err, result) {
   console.log(err);
   if (err) {
    res.json({
      status:false,
      message:"Api error please report to admin"
    })
  }else{
   res.json({
    status:true,
    message:"Successfully deleted"
  })
 }
});

}
