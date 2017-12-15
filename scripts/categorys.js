$(function () {
  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    console.log('Load_button clicked');
    var data = {};

    var CategoryName = $('#textCategoryName').val();
    // var CategoryId = $('#textCategoryId').val();

    data.categoryname = CategoryName; //input
    // data.code = CategoryId; //input

    var url;
    if ($('#sumbitbutton').text() == "Submit") {
      url = "/api/addcategoy"

    } else {

      var cid = window.id;
      console.log("cid", cid);
     data.code = cid; //input
      url = "/api/updateCategory"



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

  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input



    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',

      url: '/api/deleteCategory',
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
          swal("Cartegory", message, "success");




        }
        else {


        }


        $("#demo").html(res);  //summation displayed in the HTML page   
      }
    });



  });

  $(document).on('click', '.btnEdit', function () {
    var id = $(this).attr('data_id');
    console.log("DATA ID"+id);
    var data = {};



    data.code = id; //input





    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',

      url: '/api/listCategorybyid',
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
          html += '<button type="button" data_id=' + data.id + ' class="btnView btn btn-outline btn-primary"><i class="ti-eye"></i></button>';
          html += '<button type="button" data_id=' + data.id + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.id + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      }
    ]

  });
  console.log("Reload table");


   mytable.draw();

}
