var connection = require('./../Config');
module.exports.addevents = function (req, res) {



  var type_id = req.body.type_id; //input
  var event_title = req.body.event_title; //input
  var event_description = req.body.event_description; //input
  var event_date = req.body.event_date; //input
  var event_time = req.body.event_time; //input                                                                
  var event_venue = req.body.event_venue; //input

  var sql = "INSERT INTO `club_app_events_list`(`type_id`, `event_title`, `event_description`, `event_date`, `event_time`, `event_venue`) VALUES ('" + type_id + "','" + event_title + "'," + connection.escape(event_description) + ",'" + event_date + "','" + event_time + "','" + event_venue + "')"
  console.log(sql);
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

module.exports.listevents = function (req, res) {

  var sql = "SELECT * FROM `club_app_events_list` ORDER BY `event_id` ASC"



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

module.exports.listeventsbyid = function (req, res) {
  var codes = req.body.code;
  console.log(codes);
  var sql = "SELECT * FROM club_app_events_list WHERE event_id = '" + codes + "'";
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


module.exports.deleteevents = function (req, res) {
  var code = req.body.code;

  var sql = "DELETE FROM club_app_events_list WHERE event_id = '" + code + "'";

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

module.exports.getEventTypes = function (req, res) {
  var sql = "SELECT * FROM club_app_event_type";
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




var connection = require('./../Config');
module.exports.updatevents = function (req, res) {
  var event_id = req.body.event_id
  var type_id = req.body.type_id; //input
  var event_title = req.body.event_title; //input
  var event_description = req.body.event_description; //input
  var event_date = req.body.event_date; //input
  var event_time = req.body.event_time;
  var event_venue = req.body.event_venue;
  // var sql = "UPDATE 'categories' SET name = '"+categoryname+"' WHERE id = '"+code+"'";
  var sql = "UPDATE club_app_events_list SET type_id='" + type_id + "',event_title='" + event_title + "',event_description=" + connection.escape(event_description) + ", event_date='" + event_date + "',event_time='" + event_time + "',event_venue='" + event_venue + "' WHERE event_id=" + event_id;
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
