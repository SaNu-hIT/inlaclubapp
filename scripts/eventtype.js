
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
    if (validateForm(event_name, file_data)) {

    console.log("event name" + event_name);
    form_data.append("upfile", file_data);
    form_data.append("eventname", event_name);
    console.log("form_data" + form_data);
      $(".modal").show();
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
          $(".modal").hide();
          LoadDataDromDb();
          swal("Success", datas.message, "success");
          clearAll();
        }
        else {

          swal("Failed", "Error", "error");
        }

      }, error: function (datass) {
        console.log("error");
        console.log(datass);
      }
    });

    }



  });
$('#resetbutton').click(function (e) {
    e.preventDefault();


clearAll();

  });

  
});

var mytable;

$(document).ready(function () {
  mytable=null;
    $("#memberimagesrc").hide();
  LoadDataDromDb();
  loadDrpdown();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input
   



swal({
    title: "Are you sure?",
    text: "You will not be able to recover this event type !",
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
      url: 'api/deleteeventtype',
      success: function (res) {
        var message = res.message
        var status = res.status
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


    $('#name').focus();
window.scrollBy(0, -50)

    data.code = id; //input
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',

      url: '/api/listeventtypebyid',
      success: function (res) {

        var message = res.message
        var status = res.status
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
        $(".modal").show();
  $.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',

    url: '/api/listeventtype',
    success: function (res) {


      var message = res.message
      var status = res.status

      var dataarray = res.data
      if (status) {



        updateDataTable(res);
              $(".modal").hide();



      }
      else {
      $(".modal").hide();

      }



    }
  });

}


function Updatevalue(res) {

  console.log(res);

  var data = res.data

  var name = data[0].event_type_name
  var imagesrc = data[0].event_icon
  console.log("imagesrc"+imagesrc);


  $('#sumbitbutton').text("UPDATE");

  window.itemid = data[0].type_id

  $('#name').val(name);

  $("#memberimagesrc").attr("src", imagesrc);

  $("#memberimagesrc").show();
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
          html += '<button type="button" data_id=' + data.type_id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '</div>';
          return html;
        }
      ,"bSortable": false}
    ]

  });



  mytable.draw();

}

function loadDrpdown() {
        $(".modal").show();
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
              $(".modal").hide();
      }
      else {

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
  $("#type_id").append('<option value="-1">Select Event Type</option>');
  $("#type_id").val('-1');

}


function clearAll() {
  console.log("clear all")

  $('#name').val("");

  $("#imagefile").fileinput('clear');

}



function validateForm(event_name, file_data) {
  var isvaid = true;
  if (event_name == "") {
    alerts("event_name is required");
    isvaid = false;
    return isvaid;
  }
  else if (file_data == "") {
    alerts("file_data is required");
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


