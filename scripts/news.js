
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

    var hasimages = $('#hasimage').val();
     console.log("hasimage" + hasimages);

    if (validateForm(news_title, news_description, news_date, images,hasimages)) {

      $(".modal").show();
      data.news_title = news_title; //input
      data.news_description = news_description; //input
      data.news_date = news_date; //input
     
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
              $(".modal").hide();

          }
          else {
              $(".modal").hide();
            swal("Oops", message, "error");

          }


          $("#demo").html(res);  //summation displayed in the HTML page   
        }
      });

    }


    //end

  });


 
$('#resetbutton').click(function (e) {
    e.preventDefault();


clearAll();

  });




});



var mytable;

$(document).ready(function () {
  mytable=null;


$("#hasimage").val("false");
    

  $("#input-14").change(function () {


  var files = $("#input-14").prop("files");

  var total = files.length
   
   if (total>0) {
  
 

  $("#hasimage").val("true");
  }
  else
  {
     
 
    $("#hasimage").val("false");
  }



  });

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





  });



$(document).on('click', '.btnDeleteImage', function (e){
    e.preventDefault();
    console.log('Load_button clicked');
    var data = {};
   var id = $(this).attr('data_ids');
    var news_ids = $(this).attr('news_ids');
    console.log(id);
    var data = {};
    data.code = id; 
  console.log('Delete button clicked',data);
     
   swal({
    title: "Are you sure?",
    text: "You will not be able to recover this news image !",
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
      url: '/api/deletenewsImage',
      success: function (res) {
        e.preventDefault();
        console.log('success');
        console.log(res);
        var message = res.message
        var status = res.status
        console.log("Delete Message" + message);
        console.log("Delete status" + status);

        var dataarray = res.data
        if (status) {

           console.log('Delete button clicked id',id);
         LoadImageAlso(news_ids)
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

      



          Updatevalue(res);
         


        }
        else {


        }



      }
    });
     LoadImageAlso(id);



  });



  


});


function LoadDataDromDb() {

       $(".modal").show();
clearAll();

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
     $(".modal").hide();


      }
      else {
     $(".modal").hide();

      }



    }
  });

}



function LoadImageAlso(id) {
     $(".modal").show();
      console.log("data before call ",data);
 var data = {};
    data.code = id; 

    console.log("data before call ",data);
  $.ajax({
    type: 'POST',
    //input data to be sent to the server
    data: JSON.stringify(data),
    contentType: 'application/json',

    url: '/api/listnewsimagebyid',
    success: function (res) {
      console.log('success');
      console.log(res);

      var message = res.message
      var status = res.status

      var dataarray = res.data
      if (status) {



       UpdateNewsImageGrid(res);

     $(".modal").hide();

      }
      else {
             $(".modal").hide();


      }



    }
  });

}
function clearAll() {

$('#sumbitbutton').text("Submit");
  $('#news_title').val("");
  $('#news_description').val("");
  $('#news_date').val("");
  $("#input-14").fileinput('clear');
 $("#newsimags").html("");
  

  

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

  var news_dates = new Date(news_date).toISOString().slice(0,10);

  $('#news_title').val(news_title);

  $('#news_description').val(news_description);
  $('#news_date').val(news_dates);

  $("#memberimagesrc").attr("src", Image);
  $("#memberimagesrc").show();


}


function UpdateNewsImageGrid(res) {

  console.log("News Image list",res);

  var data = res.data
if (data.length>0) {


$("#hasimage").val("true");


  let Html='';
 for (i = 0; i < data.length; i++) {
  Html+= '<div class="col-md-3">';
 Html+= '                  <div class="imageFixedDiv">';
Html+= '                      <img id="memberimagesrc_"  src="'+data[i].news_imageurl+'" style="width:100%"  class="imagefitcover">';
 Html+= '                    </div>';
   Html+= '                 <div class="imageFixedDiv text-center">';
                      Html+= '<button type="button"  data_ids="'+data[i].image_id+'" news_ids="'+data[i].news_id+'" class="btnDeleteImage btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
   Html+= '              </div>';
Html+= '               </div>';

}
  $("#newsimags").html(Html);
}
else{

  
$("#hasimage").val("false");
$("#newsimags").html("");
}

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
      { data: "news_description" ,"bSortable": false},
      { data: "news_date" },


      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm alignclass">';
          html += '<button type="button" data_id=' + data.news_id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.news_id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      ,"bSortable": false}
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


function validateForm(news_title, news_description, news_date, images,hasimage) {

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

  // else if (hasimage=="false") {
   
  //   alerts("Images is required");
  //   isvaid = false;
  //   return isvaid;
  
  // }
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