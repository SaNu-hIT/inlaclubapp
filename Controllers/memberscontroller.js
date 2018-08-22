var connection = require('./../Config');
var fs = require('fs');
const mime = require('mime');
module.exports.addmember = function(req, res) {
    var title = req.body.title; //input
    var name = req.body.name; //input
    var mobile_no = req.body.mobile_no; //input
    var email = req.body.email; //input
    var office_no = req.body.office_no; //input
    var dob = req.body.dob; //input
    var address = req.body.address; //input
    var title_for_spouse = req.body.title_for_spouse; //input
    var nameOf_spouse = req.body.nameOf_spouse; //input
    var spouse_mobileNo = req.body.spouse_mobileNo; //input
    var spouse_email = req.body.spouse_email; //input
    var spouse_dob = req.body.spouse_dob; //input
    var weeding_date = req.body.weeding_date; //input
    var ismarried = req.body.ismarried; //input
    var Profession = req.body.Profession; //input
    var memberimage = req.body.memberimage; //input
    var spouceimage = req.body.spouceimage; //input
        var empProfession = req.body.empProfession; //input
    
   console.log("memberimage"+memberimage);
   console.log("spouceimage"+spouceimage);



   
    var sql = "INSERT INTO `club_app_member_contact_info`( `title`, `name`, `mobile_no`, `email`,`office_no`, `dob`, `address`, `title_for_spouse`, `nameOf_spouse`, `spouse_mobileNo`,`spouse_email`, `spouse_dob`, `weeding_date`, `ismarried`, `MemberImage`, `SpouseImage`,`Profession`,`Member_Profession`) VALUES ('" + title + "','" + name + "','" + mobile_no + "','" + email + "','" + office_no + "','" + dob + "','" + address + "','" + title_for_spouse + "','" + nameOf_spouse + "','" + spouse_mobileNo + "','" + spouse_email + "','" + spouse_dob + "','" + weeding_date + "','" + ismarried + "','" + memberimage + "','" + spouceimage + "','" + Profession + "','" + empProfession + "');"
    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) {
            res.json({
                status: false,
                message: "Api error please report to admin"
            })
        } else {
            res.json({
                status: true,
                lastid: result.insertId,
                message: "Successfully saved"
            })
        }
    });

}



module.exports.addChild = function(req, res) {



    var cid = req.body.cid; //input
    var title = req.body.child_title; //input
    var name = req.body.child_name; //input
    var mobile_no = req.body.child_mobile_no; //input
    var email = req.body.child_email; //input
    var office_no = req.body.child_office_no; //input
    var dob = req.body.child_dob; //input
 
    var childimage_value = req.body.childimage_value; //input
   
   console.log("childimage_value"+childimage_value);




   
    var sql = "INSERT INTO `club_app_children_contact_info`( `cid`, `title`, `name`, `mobile_no`,`email`, `office_no`, `dob`, `imageUrl`) VALUES ('" + cid + "','" + title + "','" + name +
     "','" + mobile_no + "','" + email + "','" + office_no + "','" + dob + "','" + childimage_value +"');"
     console.log("SQL",sql);
     connection.query(sql, function(err, result) {
        console.log(err);
        if (err) {
            res.json({
                status: false,
                message: "Api error please report to admin"
            })
        } else {
            res.json({
                status: true,
                message: "Successfully saved"
            })
        }
    });

}


module.exports.updateMember = function(req, res) {
    var cid = req.body.cid
    var title = req.body.title; //input
    var name = req.body.name; //input
    var mobile_no = req.body.mobile_no; //input
    var email = req.body.email; //input
    var office_no = req.body.office_no; //input
    var dob = req.body.dob; //input
    var address = req.body.address; //input
    var title_for_spouse = req.body.title_for_spouse; //input
    var nameOf_spouse = req.body.nameOf_spouse; //input
    var spouse_mobileNo = req.body.spouse_mobileNo; //input
    var spouse_email = req.body.spouse_email; //input
    var spouse_dob = req.body.spouse_dob; //input
    var weeding_date = req.body.weeding_date; //input
    var ismarried = req.body.ismarried; //input
    var Profession = req.body.Profession; //input
    var memberimage = req.body.memberimage; //input
    var spouceimage = req.body.spouceimage; //input
   console.log("memberimage"+memberimage);
   console.log("spouceimage"+spouceimage);


    var sql = "UPDATE club_app_member_contact_info SET title='" + title + "',name='" + name + "',mobile_no='" + mobile_no + "', email='" + email + "',office_no='" + office_no + "',dob='" + dob + "',address='" + address + "',title_for_spouse='" + title_for_spouse + "',nameOf_spouse='" + nameOf_spouse + "',spouse_mobileNo='" + spouse_mobileNo + "',spouse_email='" + spouse_email + "',spouse_dob='" + spouse_dob + "',weeding_date='" + weeding_date + "',ismarried='" + ismarried + "',MemberImage='" + memberimage + "',SpouseImage='" + spouceimage + "',Profession='" + Profession + "' WHERE cid=" + cid;
   

    // var sql = "INSERT INTO `club_app_member_contact_info`( `title`, `name`, `mobile_no`, `email`,`office_no`, `dob`, `address`, `title_for_spouse`, `nameOf_spouse`, `spouse_mobileNo`,`spouse_email`, `spouse_dob`, `weeding_date`, `ismarried`, `MemberImage`, `SpouseImage`,`Profession`) VALUES ('" + title + "','" + name + "','" + mobile_no + "','" + email + "','" + office_no + "','" + dob + "','" + address + "','" + title_for_spouse + "','" + nameOf_spouse + "','" + spouse_mobileNo + "','" + spouse_email + "','" + spouse_dob + "','" + weeding_date + "','" + ismarried + "','" + memberimage + "','" + spouceimage + "','" + Profession + "');"
    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) {
            res.json({
                status: false,
                message: "Api error please report to admin"
            })
        } else {
            res.json({
                status: true,
                message: "Successfully saved"
            })
        }
    });

}

module.exports.listMembers = function(req, res) {
    var sql = "SELECT * FROM `club_app_member_contact_info` ORDER BY `cid` DESC"
    connection.query(sql, function(err, result, fields) {
        if (err) {

            res.json({
                status: false,
                message: "No data found"    

            })
        } else {
            res.json({
                status: true,
                message: "Successful",
                data: result
            })
        }

    });
}



module.exports.listMemberbyid = function(req, res) {
    var codes = req.body.code;
    console.log(codes);
    var sql = "SELECT * FROM club_app_member_contact_info WHERE cid = '" + codes + "'";
    console.log(sql);
    connection.query(sql, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                message: "No data found"
            })
        } else {
            res.json({
                status: true,
                message: "Successful",
                data: result
            })
        }

    });




}
module.exports.listChildbyid = function(req, res) {
    var codes = req.body.code;
    console.log(codes);
    var sql = "SELECT * FROM club_app_children_contact_info WHERE cid = '" + codes + "'";
    console.log(sql);
    connection.query(sql, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                message: "No data found"
            })
        } else {
            console.log(result);
            res.json({
                status: true,
                message: "Successful",
                data: result
            })
        }

    });




}


module.exports.deleteMember = function(req, res) {
    var code = req.body.code;

    var sql = "DELETE FROM club_app_member_contact_info WHERE cid = '" + code + "'";

    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) {
            res.json({
                status: false,
                message: "Api error please report to admin"
            })
        } else {
            res.json({
                status: true,
                message: "Successfully deleted"
            })
        }
    });
}




function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}


module.exports.saveChildDetails = function (req, res) {


    var datas = req.body;
 
 console.log("data",datas)




for (var i = 0; i < datas.length; i++) {



var title = datas[i].Tittle;
var S_ChildId = datas[i].S_ChildId;
var name = datas[i].Name;
var mobile_no = datas[i].Mobile_Number;
var office_no = datas[i].Land_Line_Number
var email = datas[i].Email
var dob = datas[i].Date_Of_Birth
var Child_Image = datas[i].Child_Image;
var cid = datas[i].memberid;



if (Child_Image=="") {

childimage_value="";
}
else
{
var decodedImg = decodeBase64Image(Child_Image);
var imageBuffer = decodedImg.data;
var type = decodedImg.type;
var extension = mime.getExtension(type);
var childimage_value="";
var fileName =  name+"image." + extension;
fileName =fileName.replace(/\s/g,'');
console.log("fileName",fileName);
 try{
       fs.writeFileSync("./uploads/" + fileName, imageBuffer, 'utf8');
       childimage_value = "https://inlaclubapp.herokuapp.com/static/"+fileName
    }
 catch(err){
    console.error(err)
 }
}

 console.log("childimage_value",childimage_value);
var sql = "INSERT INTO `club_app_children_contact_info`( `cid`, `title`, `name`, `mobile_no`,`email`, `office_no`, `dob`, `imageUrl`) VALUES ('" + cid + "','" + title + "','" + name +
     "','" + mobile_no + "','" + email + "','" + office_no + "','" + dob + "','" + childimage_value +"');"
     console.log("SQL",sql);
     connection.query(sql, function(err, result) {
        console.log(err);

    });


   
}


res.json({
                status: true,
                message: "Successfully saved"
            })


}



module.exports.UpdateChildDetails = function (req, res) {
    var datas = req.body;

console.log("DATA",datas);





for (var i = 0; i < datas.length; i++) {
var title = datas[i].Tittle;
var S_ChildId = datas[i].S_ChildId;
var name = datas[i].Name;
var mobile_no = datas[i].Mobile_Number;
var office_no = datas[i].Land_Line_Number
var email = datas[i].Email
var dob = datas[i].Date_Of_Birth
var Child_Image = datas[i].Child_Image;
var cid = datas[i].memberid;


 console.log("cid",cid);
  console.log("S_ChildId",S_ChildId);

if (Child_Image=="") {

childimage_value="";
}
else
{




var decodedImg = decodeBase64Image(Child_Image);
 var imageBuffer = decodedImg.data;
 var type = decodedImg.type;

  var extension = mime.getExtension(type);
var childimage_value="";
 var fileName =  name+"image." + extension;
 fileName =fileName.replace(/\s/g,'');

 console.log("fileName",fileName);
 try{
       fs.writeFileSync("./uploads/" + fileName, imageBuffer, 'utf8');

        childimage_value = "https://inlaclubapp.herokuapp.com/static/"+fileName
    }
 catch(err){
    console.error(err)
 }

}
   var sql = "UPDATE club_app_children_contact_info SET title='" + title + "',name='" + name + "', email='" + email + "',office_no='" + office_no + "',imageUrl='" + childimage_value + "' ,dob='" + dob + "' WHERE childID=" + S_ChildId;
     console.log("fileName",sql);


     connection.query(sql, function(err, result) {
        console.log(err);
      
    });
}
res.json({ status: true,
           message: "Successfully saved"
            })
}

