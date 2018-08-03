
$(function () {
  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    console.log('Load_button clicked');

    var data = {};
    var type_id = $('#type_id option:selected').val();
    // var type_id = e.options[e.selectedIndex].value;
    var event_title = $('#event_title').val();
    var event_description = $('#event_description').val();
    var event_date = $('#event_date').val();
    var event_time = $('#event_time').val();
    var event_venue = $('#event_venue').val();
    if (validateForm(type_id, event_title, event_description, event_date, event_time, event_venue)) {
      // var MemberImage=req.files.MemberImage.name
      data.type_id = type_id; //input
      data.event_title = event_title; //input
      data.event_description = event_description; //input
      data.event_date = event_date; //input
      data.event_time = event_time; //input
      data.event_venue = event_venue; //input
      console.log("data json" + data);
      var url;
      if ($('#sumbitbutton').text() == "Submit") {
        url = "/api/addevents"
        // console.log("MemberImage"+MemberImage);
      } else {

        data.event_id = window.itemid;
        url = "/api/updatevents"
      }
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data), //input data to be sent to the server
        contentType: 'application/json',
        url: url,
        success: function (res) {
          console.log('success');
          console.log(res);

          var message = res.message
          var status = res.status
          console.log("Message" + message);
          console.log("status" + status);
          if (status) {
            LoadDataDromDb();
            swal("Success", message, "success");
            clearAll()

          }
          else {
            swal("Oops", message, "error");

          }


          $("#demo").html(res);  //summation displayed in the HTML page   
        }
      });
    }

    
  });


});




var mytable;

$(document).ready(function () {
  mytable = null;




  LoadDataDromDb();


  loadDrpdown();


  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input



swal({
    title: "Are you sure?",
    text: "You will not be able to recover this event !",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, I am sure!',
    cancelButtonText: "No, cancel it!",
    closeOnConfirm: false,
    closeOnCancel: false
 },
 function(isConfirm){

   if (isConfirm){
 

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/deleteevents',
      success: function (res) {
        console.log('success');
        console.log(res);
        var message = res.message
        var status = res.status
        console.log("Message" + message);
        console.log("status" + status);
        var dataarray = res.data
        if (status) {

          LoadDataDromDb();
          swal("Success", message, "success");
        }
        else {


          swal("Failed", "Error", "Error");
        }


      }
    });

    } else {
      swal("Cancelled", "Click ok to close");
         e.preventDefault();
    }
 });


  });



  $(document).on('click', '.btnEdit', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',

      url: '/api/listeventsbyid',
      success: function (res) {
        console.log('success');
        console.log(res);
        var message = res.message
        var status = res.status
        console.log("Message" + message);
        console.log("status" + status);

        var dataarray = res.data
        if (status) {
          console.log("JPOSD" + JSON.stringify(res));
          // LoadDataDromDb();

          Updatevalue(res);



        }
        else {


        }



      }
    });



  });


});


function LoadDataDromDb() {


  $.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',

    url: '/api/listevents',
    success: function (res) {
      console.log('success');
      console.log(res);

      var message = res.message
      var status = res.status

      var dataarray = res.data
      if (status) {



        updateDataTable(res);



      }
      else {


      }



    }
  });

}
function clearAll() {

  $('#type_id').val(-1).change();
  $('#event_title').val("");
  $('#event_description').val("");
  $('#event_date').val("");
  $('#event_time').val("");
  $('#event_venue').val("");

}

function Updatevalue(res) {

  console.log(res);

  var data = res.data

  var type_id = data[0].type_id

  var event_title = data[0].event_title
  var event_description = data[0].event_description

  var event_date = data[0].event_date
  var event_time = data[0].event_time

  var event_venue = data[0].event_venue

  $('#sumbitbutton').text("UPDATE");

  window.itemid = data[0].event_id
  console.log("type_id  " + type_id);
  
  $('#type_id').val(type_id).change();
  $('#event_title').val(event_title);


  // $('#selectBasic option:selected').selected=1
  $('#event_description').val(event_description);
  $('#event_date').val(event_date);
  $('#event_time').val(event_time);
  $('#event_venue').val(event_venue);


}


function updateDataTable(dataAsJsonArry) {
  if (mytable)
    mytable.destroy();

  mytable = $('#memberDatatable').DataTable({
    destory: true,
    "scrollX": true,
    destory: true,
    bRetrieve: true,
    searching: true,


    data: dataAsJsonArry.data,
    columns: [
      { data: "event_id" },
      { data: "type_id" },
      // { data: "MemberImage"},
      { data: "event_title" },
      { data: "event_description" },
      { data: "event_date" },

      { data: "event_time" },
      { data: "event_venue" },
      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm alignclass ">';
          html += '<button type="button" data_id=' + data.event_id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.event_id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      }
    ]

  });
  console.log("Reload table");


  mytable.draw();

}

function loadDrpdown() {
  console.log("drop downvalue");
  $.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',
    url: '/api/getEventTypes',
    success: function (res) {
      console.log('success');
    
      var message = res.message
      var status = res.status

      
      if (status) {
        updateDropdown(res);
      }
      else {
        console.log("drop error");
      }



    }
  });
}


function updateDropdown(res) {


  var arry = res.data;
  var count = arry.length;
  $("#type_id").empty();

  for (var i = 0; i < count; i++) {
   
    var id = res.data[i].type_id
    var event_type_name = res.data[i].event_type_name
  

    $("#type_id").append("<option value='" + id + "'>" + event_type_name + "</option>");
  }
  $("#type_id").append('<option value="-1">Select event type</option>');
  $("#type_id").val('-1');

}


var type_id = $('#type_id option:selected').val()
// var type_id = e.options[e.selectedIndex].value;
var event_title = $('#event_title').val();
var event_description = $('#event_description').val();
var event_date = $('#event_date').val();
var event_time = $('#event_time').val();
var event_venue = $('#event_venue').val();






function validateForm(type_id, event_title, event_description, event_date, event_time, event_venue) {


  console.log("type_id ",type_id);


  var isvaid = true;
  if (type_id == ""||type_id == "-1") {
    alerts("Event Type  Required");
    isvaid = false;
    return isvaid;
  }
  else if (event_title == "") {
    alerts("Event Title Required");
    isvaid = false;
    return isvaid;
  }

  else if (event_description == "") {
    alerts("Event Description Required");
    isvaid = false;
    return isvaid;
  }
  else if (event_date == "") {
    alerts("Event Date Required");
    isvaid = false;
    return isvaid;
  }
  else if (event_time == "") {
    alerts("Event Time Required");
    isvaid = false;
    return isvaid;
  }
  else if (event_venue == "") {
    alerts("Event Venue Required");
    isvaid = false;
    return isvaid;
  }
  else {
    isvaid = true;
    return isvaid;
  }



}

function alerts(message)
{
  Command: toastr["error"](message)
  
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

}