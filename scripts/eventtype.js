
$(function () {

  $("#imagefile").fileinput({
    theme: "gly",
    showRemove: false,
    showUpload: false,
    showClose: true,
    hideThumbnailContent: false // hide image, pdf, text or other content in the thumbnail preview
});
  $('#uploadbutton').click(function (e) {
    e.preventDefault();
    console.log('uploadbutton clicked');

    var event_name = $('#name').val();
    var file_data = $("#imagefile").prop("files")[0];
    var form_data = new FormData();
    console.log("event name" + event_name);
    form_data.append("upfile", file_data);
    form_data.append("eventname", event_name);
    console.log("form_data" + form_data);

    $.ajax({
      url: "/api/upload", 
      cache: true,
      contentType: false,
      processData: false,
      data: form_data, // Setting the data attribute of ajax with file_data
      type: 'post',
      success: function (datas) {
        console.log('data' + datas);
        var status = datas.status;
        if (status) {
          LoadDataDromDb();
          swal("Success", datas.message, "success");
        }
        else {

          swal("Failed", "Error", "error");
        }

      }, error: function (datass) {
        console.log("error");
        console.log(datass);
      }
    });
  });


  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    console.log('Load_button clicked');

    var data = {};



    var event_name = $('#name').val();
    var event_name = $('#name').val();
    data.event_name = event_name;
    console.log("event_name" + event_name);

    var url;
    if ($('#sumbitbutton').text() == "Submit") {
      url = "/api/addeventtype"



    }
    else {
      data.event_id = window.itemid;
      url = "api/updateventtype"
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

  });
});

var mytable;

$(document).ready(function () {
  mytable=null;
  LoadDataDromDb();
  loadDrpdown();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'api/deleteeventtype',
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

      url: '/api/listeventtypebyid',
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

    url: '/api/listeventtype',
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

  $('#name').val("");


}

function Updatevalue(res) {

  console.log(res);

  var data = res.data

  var name = data[0].event_type_name



  $('#sumbitbutton').text("UPDATE");

  window.itemid = data[0].type_id
  console.log("itemid  " + itemid);
  $('#name').val(name);



}


function updateDataTable(dataAsJsonArry) {

  if(mytable)
  mytable.destroy();
   mytable = $('#memberDatatable').DataTable({
    destory: true,
    "scrollX": true,
    destory: true,
    bRetrieve: true,
    searching: true,


    data: dataAsJsonArry.data,
    columns: [
      { data: "type_id" },
      { data: "event_type_name" },
      // { data: "MemberImage"},
      { data: "event_icon" },

      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm  alignclass  ">';
          html += '<button type="button" data_id=' + data.type_id + ' class="btnView btn btn-outline btn-primary"><i class="ti-eye"></i></button>';
          html += '<button type="button" data_id=' + data.type_id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.type_id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
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
      console.log(res);
      var message = res.message
      var status = res.status
      var dataarray = res.data
      if (status) {
        updateDropdown(res);
      }
      else {

      }
    }
  });
}


function updateDropdown(res) {
  console.log("drpp bbvalue" + res);
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










