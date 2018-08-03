
$(function () {

  $("#input-14").fileinput({
    theme: "gly",
    showRemove: false,
    showUpload: false,
    showClose: true,
    hideThumbnailContent: false // hide image, pdf, text or other content in the thumbnail preview
});
  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    console.log('Load_button clicked');
    var data = {};
    var news_title = $('#news_title').val();
    var news_description = $('#news_description').val();
    var news_date = $('#news_date').val();
    var images = $("#input-14").prop("files");
    if (validateForm(news_title, news_description, news_date, images)) {
      data.news_title = news_title; //input
      data.news_description = news_description; //input
      data.news_date = news_date; //input
      console.log("data json NEWS" + data.news_date);
      var url;
      if ($('#sumbitbutton').text() == "Submit") {
        url = "/api/addnews"
        // console.log("MemberImage"+MemberImage);
      } else {

        data.news_id = window.itemid;
        url = "/api/updatenews"
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


            var id = res.id

            console.log("last inbsert id " + id);
            uploadImages(id);
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


    //end

  });


});
//data


var mytable;

$(document).ready(function () {
  mytable=null;
$("#memberimagesrc").hide();

  LoadDataDromDb();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input


swal({
    title: "Are you sure?",
    text: "You will not be able to recover this news !",
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
      url: '/api/deletenews',
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



    // $.ajax({
    //   type: 'POST',
    //   data: JSON.stringify(data),
    //   contentType: 'application/json',
    //   url: '/api/deletenews',
    //   success: function (res) {
    //     console.log('success');
    //     console.log(res);
    //     var message = res.message
    //     var status = res.status
    //     console.log("Message" + message);
    //     console.log("status" + status);
    //     var dataarray = res.data
    //     if (status) {
    //       LoadDataDromDb();
    //       swal("Success", message, "success");
    //     }
    //     else {


    //       swal("Failed", "Error", "Error");
    //     }


    //   }
    // });



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

      url: '/api/listnewssbyid',
      success: function (res) {
        console.log('success');
        console.log(res);
        var message = res.message
        var status = res.status
        console.log("Message" + message);
        console.log("status" + status);

        var dataarray = res.data
        if (status) {

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

    url: '/api/listnews',
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


  $('#news_title').val("");
  $('#news_description').val("");
  $('#news_date').val("");
  $("#input-14").fileinput('clear');
 
  // var $el = $('#input-14');
  // $el.fileinput('destroy');
  // $el.fileinput(fileinput_options)
  //  var $el = $('#input-14');
  //  $el.wrap('<form>').closest('form').get(0).reset();
  //  $el.unwrap();

  

}

function Updatevalue(res) {

  console.log(res);

  var data = res.data


  var news_title = data[0].news_title
  var news_description = data[0].news_description
  var news_date = data[0].news_date
  var Image = data[0].news_date

  $('#sumbitbutton').text("UPDATE");

  window.itemid = data[0].news_id
  console.log("itemid  " + itemid);

  $('#news_title').val(news_title);

  $('#news_description').val(news_description);
  $('#news_date').val(news_date);

  $("#memberimagesrc").attr("src", Image);
  $("#memberimagesrc").show();


}


function updateDataTable(dataAsJsonArry) {

  if(mytable)
  mytable.destroy();
   mytable = $('#newsDatatable').DataTable({
    destory: true,
    "scrollX": true,
    destory: true,
    bRetrieve: true,
    searching: true,


    data: dataAsJsonArry.data,
    columns: [
      { data: "news_id" },
      { data: "news_title" },
      { data: "news_description" },
      { data: "news_date" },


      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm alignclass">';
          html += '<button type="button" data_id=' + data.news_id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.news_id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      }
    ]

  });
  console.log("Reload table");


  mytable.draw();

}

function uploadImages(id) {



  var files = $("#input-14").prop("files");

  var total = files.length
  console.log("total " + total);
  for (i = 0; i < files.length; i++) {
    var form_data = new FormData();
    var file_data = $("#input-14").prop("files")[i];
    console.log("i " + i);
    var tot = i + 1;

    form_data.append("upfile", file_data);
    form_data.append("news_id", id);
    form_data.append("totals", total);
    form_data.append("currents", tot);
    upload(form_data);

  }

  var sa = JSON.stringify(form_data)

  console.log("form_data" + sa);




}

function upload(form_data) {


  $.ajax({
    url: "/api/uploadimagenews",
    cache: true,
    async: false,
    contentType: false,
    processData: false,
    data: form_data, // Setting the data attribute of ajax with file_data
    type: 'post',
    success: function (datas) {
      console.log('data' + datas);
      var status = datas.status;
      if (status) {

        console.log(' image uipload success');

        var tot = form_data.get("totals");
        var curre = form_data.get("currents");
        console.log(' total ' + tot);
        console.log(' current ' + curre);

        if (tot == curre) {
          clearAll()
          swal("Success", datas.message, "success");
        }

      }
      else {

        swal("Failed", "Error", "error");
      }

    }, error: function (datass) {
      console.log(' image uipload failed');

      console.log(datass);
    }
  });


}


function validateForm(news_title, news_description, news_date, images) {

  var isvaid = true;

  if (news_title == "") {
    alerts("News Title  Required");
    isvaid = false;
    return isvaid;
  }
  else if (news_description == "") {
    alerts("News Description  Required");
    isvaid = false;
    return isvaid;
  }

  else if (news_date == "") {
    alerts("News date  Required");
    isvaid = false;
    return isvaid;
  }
  else if (images.length == 0) {
    alerts("Images is required");
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