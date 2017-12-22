var connection = require(
  './../Config');
module.exports.addnews = function (
  req, res) {

  //input
  var news_title = req.body.news_title; //input
  var news_description = req.body
    .news_description; //input
   var news_date = req.body.news_date; //input

  var sql =
    "INSERT INTO `club_app_news_list`( `news_title`, `news_description`, `news_date`) VALUES (" +
    connection.escape(news_title) + "," +
    connection.escape(news_description) +",'"+news_date+"')"

  console.log("SQL" + sql);

  connection.query(sql,
    function (err, result) {
      console.log(err);
      if (err) {
        res.json({

          status: false,
          message: "Api error please report to admin"
        })
      } else {
        var id = result.insertId
        res.json({
          status: true,
          message: "Successfully saved",
          id: id

        })
      }
    });

}





module.exports.listnews =
  function (req, res) {

    var sql =
      "SELECT * FROM `club_app_news_list` ORDER BY `news_id` ASC"



    console.log(sql);


    connection.query(sql,
      function (err, result,
        fields) {

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





module.exports.listnewsbyid =
  function (req, res) {
    var codes = req.body.code;
    console.log(codes);
    // var sql =
    //   "SELECT * FROM club_app_news_list WHERE news_id = '" +
    //   codes + "'";
      var sql =
      "SELECT * FROM club_app_news_list WHERE news_id = '" +
      codes + "'";
    console.log(sql);
    connection.query(sql,
      function (err, result,
        fields) {
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



module.exports.deletenews =
  function (req, res) {
    var code = req.body.code;

    var sql =
      "DELETE FROM club_app_news_list WHERE news_id = '" +
      code + "'";

    connection.query(sql,
      function (err, result) {
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





module.exports.updatenews =
  function (req, res) {

    var news_id = req.body.news_id;
    var news_title = req.body.news_title; //input
    var news_description = req.body.news_description; //input
    var news_date = req.body.news_date; //input
    console.log("news_date" + news_date);
    console.log("news_description " + news_description);
    news_title = mysql_real_escape_string(news_title);
    news_description = mysql_real_escape_string(news_description);
    console.log("news_title" + news_title);
    console.log("news_description " + news_description);
    var sql =
      "UPDATE `club_app_news_list` SET `news_title`=" +
      ["'"+news_title+"'"] +
      ",`news_description`=" +
      ["'"+news_description+"'"] +
      ",`news_date`=" +
      ["'"+news_date+"'"] +
      " WHERE `news_id`=" +
      news_id;

      console.log("sql " + sql);
    // var sql = 'UPDATE posts SET news_title = ?,news_description = ?,news_date = ?, WHERE news_id = ?', [news_title,news_description,news_date, news_id];
    connection.query(sql,
      function (err, result) {
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

module.exports.uploadimagenews = function (req, res) {
  if (req.files.upfile) {
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    news_id = req.body.news_id;

    uploadpath = './uploads/' + name;

    file.mv(uploadpath, function (err) {
      if (err) {
        console.log("File Upload Failed", name, err);
        res.json({
          status: false,
          message: "File Upload Failed"
        })
      }
      else {
        var sql = "INSERT INTO `club_app_news_image_list`(`news_id`,`news_imageurl`) VALUES ('" + news_id + "','" + uploadpath + "')"
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

function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
    }
  });
}
