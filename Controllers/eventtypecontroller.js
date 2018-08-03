var connection = require('./../Config');
module.exports.addeventtype = function (req, res) {
  var event_type_name = req.body.event_name;
  var icons_url = req.body.icons_url;
  var sql = "INSERT INTO `club_app_event_type`(`event_type_name`,`event_icon`) VALUES ('" + event_type_name + "','" + icons_url + "')"
  connection.query(sql, function (err, result) {
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

module.exports.listeventtype = function (req, res) {

  var sql = "SELECT * FROM `club_app_event_type` ORDER BY `type_id` ASC"



  console.log(sql);


  connection.query(sql, function (err, result, fields) {

    if (err) {

      res.json({
        status: false,
        message: "No data found"

      })
    } else {
      // console.log(result);
      res.json({
        status: true,
        message: "Successful",
        data: result
      })
    }

  });


}

module.exports.listeventtypebyid = function (req, res) {
  var codes = req.body.code;
  console.log(codes);
  var sql = "SELECT * FROM club_app_event_type WHERE type_id = '" + codes + "'";
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
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


module.exports.deleteeventtype = function (req, res) {
  var code = req.body.code;

  var sql = "DELETE FROM club_app_event_type WHERE type_id = '" + code + "'";

  connection.query(sql, function (err, result) {
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

module.exports.getEventType = function (req, res) {
  var sql = "SELECT * FROM club_app_event_type";
  console.log(sql);
  connection.query(sql, function (err, result, fields) {
    if (err) {

      res.json({
        status: false,
        message: "No data found"

      })
    } else {
      console.log("Result : "+result);
      res.json({
        status: true,
        message: "Successful",
        data: result
      })
            console.log("Result : "+res);
    }

  });

}





module.exports.updateventtype = function (req, res) {
  
  var event_id = req.body.event_id
  var type_id = req.body.type_id; //input
  var event_title = req.body.event_title; //input
  var event_description = req.body.event_description; //input
  var event_date = req.body.event_date; //input
  var event_time = req.body.devent_timeob;
  var event_venue = req.body.event_venue;
  // var sql = "UPDATE 'categories' SET name = '"+categoryname+"' WHERE id = '"+code+"'";
  var sql = "UPDATE club_app_event_type SET type_id='" + type_id + "',event_title='" + event_title + "',event_description='" + event_description + "', event_date='" + event_date + "',event_time='" + event_time + "',event_venue='" + event_venue + "' WHERE event_id=" + event_id;
  connection.query(sql, function (err, result) {
    console.log(err);
    if (err) {
      res.json({
        status: false,
        message: "Api error please report to admin"
      })
    } else {
      res.json({
        status: true,
        message: "Successfully updated"
      })
    }
  });

}





var uploadpath;
var event_name = "test";



module.exports.uploadimagebase = function (req, res) {

  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;


    console.log("uploadpath" + uploadpath);

    uploadpath = './uploads/' + name;
    var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+name

    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.json({
          status: false,
          message: "File Upload Failed"
        })
      }
      else {
        res.json({
          status: true,
          message: "File Upload success",
          path:  name
        })


        console.log("File Uploaded", name);

      }
    });
  }
  else {


    res.json({
      status: false,
      message: "No File selected !"
    })

  }
}
module.exports.uploadimage = function (req, res) {
  var total;
 var current;
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
      total = req.body.total;
      current = req.body.current;
    console.log("event_name" + event_name);
    var event_name=req.body.eventname;
    uploadpath =  name;
    console.log("uploadpath" + uploadpath);
    console.log("event_name" + event_name);
    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.json({
          status: false,
          message: "File Upload Failed"
        })
      }
      else {

        var sql = "INSERT INTO `club_app_event_type`(`event_type_name`,`event_icon`) VALUES ('" + event_name + "','" + uploadpath + "')"
        connection.query(sql, function (err, result) {
          console.log(err);
          if (err) {
            res.json({
              status: false,
              message: "Api error please report to admin"
            })
          } else {
            res.json({
              status: true,
              message: "Successfully saved",
              totals:total,
              currents:current
            })
          }
        });


        console.log("File Uploaded", name);

      }
    });
  }
  else {


    res.json({
      status: false,
      message: "No File selected !"
    })

  }
}

module.exports.updateventtypes = function (req, res) {
  var total;
 var current;
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
      total = req.body.total;
      current = req.body.current;
    console.log("event_name" + event_name);
    var event_name=req.body.eventname;
    uploadpath =  name;
    console.log("uploadpath" + uploadpath);
    console.log("event_name" + event_name);
    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.json({
          status: false,
          message: "File Upload Failed"
        })
      }
      else {

        var sql = "INSERT INTO `club_app_event_type`(`event_type_name`,`event_icon`) VALUES ('" + event_name + "','" + uploadpath + "')"
        connection.query(sql, function (err, result) {
          console.log(err);
          if (err) {
            res.json({
              status: false,
              message: "Api error please report to admin"
            })
          } else {
            res.json({
              status: true,
              message: "Successfully saved",
              totals:total,
              currents:current
            })
          }
        });


        console.log("File Uploaded", name);

      }
    });
  }
  else {


    res.json({
      status: false,
      message: "No File selected !"
    })

  }
}
