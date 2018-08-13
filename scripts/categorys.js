$(function () {



  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    console.log('Load_button clicked');
    var data = {};
    var CategoryName = $('#textCategoryName').val();
    data.categoryname = CategoryName; //input
    var url;
    if ($('#sumbitbutton').text() == "Submit") {
      url = "/api/addcategoy"

    } else {
      var cid = window.id;
      console.log("cid", cid);
     data.code = cid; //input
      url = "/api/updateCategory"
    }
    if (validateForm(CategoryName)) {
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
          
          clearAll();
          swal("Success", message, "success");

        }
        else {
          swal("Oops", message, "error");
        }
        $("#demo").html(res);  //summation displayed in the HTML page   
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
  LoadDataDromDb();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input




swal({
    title: "Are you sure?",
    text: "You will not be able to recover this category !",
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
      url: '/api/deleteCategory',
      success: function (res) {
        var message = res.message
        var status = res.status
        var dataarray = res.data
        if (status) {
          LoadDataDromDb();
          swal("Cartegory", message, "success");
        }
        else {

        }

        $("#demo").html(res);  
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
    console.log("DATA ID"+id);
    var data = {};
    data.code = id; 
      $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/listCategorybyid',
      success: function (res) {
       

        var message = res.message
        var status = res.status
  

        var dataarray = res.data
        if (status) {

          // LoadDataDromDb();

          Updatevalue(res);



        }
        else {


        }


        $("#demo").html(res);  //summation displayed in the HTML page   
      }
    });



  });
  // LoadDataDromDb();

});


function LoadDataDromDb() {
  $.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',

    url: '/api/listCategory',
    success: function (res) {
      console.log('success');
      console.log(res);

      var message = res.message
      var status = res.status
      console.log("Message" + message);
      console.log("status" + status);

      var dataarray = res.data
      if (status) {



        updateDataTable(res);



      }
      else {


      }


      $("#demo").html(res);  //summation displayed in the HTML page   
    }
  });

}
function clearAll() {
$('#sumbitbutton').text("Submit");
  $('#textCategoryName').val("");
  $('#textCategoryId').val("");



}

function Updatevalue(res) {

  console.log(res);


  var data = res.data
  var id = data[0].id
  var name = data[0].name
  window.id= data[0].id  




  $('#sumbitbutton').text("UPDATE");
  $('#textCategoryName').val(name);
  $('#textCategoryId').val(id);



}


function updateDataTable(dataAsJsonArry) {

  console.log(dataAsJsonArry);

  if(mytable)
  mytable.destroy();
   mytable = $('#categoryDatatable').DataTable({
    destory: true,
    bRetrieve: true,
    searching: false,
    data: dataAsJsonArry.data,
    columns: [
      { data: "id" },
      { data: "name" },
      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm  alignclass  ">';
          html += '<button type="button" data_id=' + data.id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      ,"bSortable": false}
    ]

  });
  console.log("Reload table");


   mytable.draw();

}

function validateForm(CategoryName) {
  var isvaid = true;
  if (CategoryName == "") {
    alerts("Category Name is required");
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