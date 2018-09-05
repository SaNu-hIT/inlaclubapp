
$(function () {
var isedit=false;
  $("#SpouseImage").fileinput({
    theme: "gly",
    showRemove: false,
    showUpload: false,
    showClose: true,
    hideThumbnailContent: false // hide image, pdf, text or other content in the thumbnail preview
  });
  $("#MemberImage").fileinput({
    theme: "gly",
    showRemove: false,
    showUpload: false,
    showClose: true,
    hideThumbnailContent: false // hide image, pdf, text or other content in the thumbnail preview
  });
  $('#sumbitbutton').click(function (e) {
    e.preventDefault();
    var MemberImagefile = $("#MemberImage").prop("files")[0];
    var spauceimagefile = $("#SpouseImage").prop("files")[0];
    var data = new FormData();
    var title = $('#title_for option:selected').text();
    var names = $('#name').val();
    var mobile_no = $('#mobile_no').val();
    var email = $('#email').val();
    var office_no = $('#office_no').val();
    var dob = $('#dob').val();
    var address = $('#address').val();
    var title_for_spouse = $('#title_for_spouse option:selected').text();
    var nameOf_spouse = $('#nameOf_spouse').val();
    var spouse_mobileNo = $('#spouse_mobileNo').val();
    var spouse_email = $('#spouse_email').val();
    var spouse_dob = $('#spouse_dob').val();
    var weeding_date = $('#weeding_date').val();
    var Profession = $('#Profession').val();
        var empProfession = $('#empProfession').val();
    var memberimage = $('#MemberImage_value').val();
    var spouceimage = $('#SpouseImage_value').val();

var ismarredflag=false;

var ismarred=$("#ismarried").val();

console.log("YES ismarried",ismarred);
if (ismarred=="YES") {
ismarredflag=true
}
else
{
  ismarredflag=false;
}

var isedit=false;
var isedits=$("#isedits").val();
console.log("YES isedits",isedits);
if (isedits=="YES") {
isedit=true
}
else
{
  isedit=false;
}
console.log("isedit","isedit");


console.log("isedit",isedit);


console.log("ismarredflag",ismarredflag);

    if (validateForm(title, names, mobile_no, email, office_no, dob, address, memberimage, title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date,  Profession, spouceimage
    ,ismarredflag,isedit)) {

if (ismarredflag) {

  ismarried="YES";
}
else
{
  ismarried="NO";
}


      data.append("memberimage", memberimage);

      data.append("spouceimage", spouceimage);


      data.append("title", title);
      data.append("name", names);
      data.append("mobile_no", mobile_no);
      data.append("email", email);
      data.append("office_no", office_no);
      data.append("dob", dob);
      data.append("address", address);
      data.append("title_for_spouse", title_for_spouse);
      data.append("spouse_mobileNo", spouse_mobileNo);

      data.append("nameOf_spouse", nameOf_spouse);
      data.append("spouse_email", spouse_email);
      data.append("spouse_dob", spouse_dob);
      data.append("weeding_date", weeding_date);
      data.append("ismarried", ismarried);
      data.append("Profession", Profession);
      data.append("empProfession", empProfession);


      var url;
      if ($('#sumbitbutton').text() == "Submit") {
        url = "/api/addmember"
      } else {

        var cid = window.itemid;
        data.append("cid", cid);
        url = "/api/updatemember"
      }
      jQuery.ajax({
        type: 'POST',
        data: data, //input data to be sent to the server
        cache: true,
        contentType: false,
        processData: false,
        type: 'post',
        url: url,
        success: function (res) {
          var message = res.message
          var status = res.status
          if (status) {


            window.lastid = res.lastid;

            var lastid=window.lastid;

       if ($('#sumbitbutton').text() == "Submit") {
           uploadChildDetails(lastid);
      } 
      else {

        var cid = window.itemid;
             uploadChildDetails(cid);
        
      }


      

            clearAll()
          }
          else {
            swal("Oops", message, "error");
          }


          $("#demo").html(res);  //summation displayed in the HTML page   
        }
      });
    }
//     else {

// // swal("Oops", "Member can not add spouce deatils, Check Married Option for", "error");


//       console.log("Hey lo cancelss");
//     }


  });




$('#resetbutton').click(function (e) {
    e.preventDefault();

// calculate_Totals();
// uploadChildDetails(9);
clearAll();

  });
});

var mytable;
function readURL(input,attrValue) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $(attrValue).attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
};

$(document).ready(function () {


// GenerateTableRows();  

  $(document).on('click', '#btnAddAnoutherLine', function () {
    // child_title child_name  child_mobile_no  child_email  child_office_no  child_dob
    // e.preventDefault();    

    GenerateTableRows();




  });


$("#isedits").val("NO");

  mytable = null;


$("#maritalstatus_2").prop('checked', true);


  $("#married_div").hide();
  // $("#spousediv").hide();


 $("#ismarried").val("NO");


  $("#memberimagesrc").hide();
  $("#spuseimagesrc").hide();


$("#maritalstatus_1").on('click change', function() {
   
if($(this).prop("checked")) {

  $("#married_div").show();
    $("#spousediv").show();
        $("#ismarried").val("YES");

      }
      
    
      



});


$("#maritalstatus_2").on('click change', function() {
   
if($(this).prop("checked")) {
    $("#married_div").hide();  
     // $("#spousediv").hide();
    $("#ismarried").val("NO");
     
        
      }
   
     



});




  LoadDataDromDb();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    var data = {};
    data.code = id; //input




swal({
    title: "Are you sure?",
    text: "You will not be able to recover this member!",
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
  jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'api/deleteMember',
      success: function (res) {
        var message = res.message
        var status = res.status
        var dataarray = res.data
        if (status) {
clearAll();
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



  $("#MemberImage").change(function () {
   
    var file = $("#MemberImage").prop("files")[0];
    
    uploadData(file, "mem")

  });
  $("#SpouseImage").change(function () {


   
    var file = $("#SpouseImage").prop("files")[0];
   
    uploadData(file, "spo")


  });


  $("#childimage").change(function () {
 
    var file = $("#childimage").prop("files")[0];
   
    uploadData(file, "chi")
  });



  $(document).on('click', '.btnEdit', function () {
   $('#isedits').val("YES");


    var id = $(this).attr('data_id');
    console.log("id",id);
    var data = {};
    data.code = id; //input
    jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/listMemberbyid',
      success: function (res) {
        var message = res.message
        var status = res.status


        var dataarray = res.data
        if (status) {

          // LoadDataDromDb();

          // clearAll();
          Updatevalue(res);



        }
        else {


        }



      }
    });

    jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/listChildbyid',
      success: function (res) {
        var message = res.message
        var status = res.status


        var dataarray = res.data
        if (status) {

          // LoadDataDromDb();

          UpdateChildvalue(res);



        }
        else {


        }



      }
    });




    



  });




 $(document).on("click", ".btnRemoveRow", function () {

        console.log($(this).parent().closest('tr'));
        if ($('#tblItemsList tbody tr').length == 1) {
            swal("Warning", "The last item from the table can't be removed.", "warning");
            return;
        }
        
        $('#tblItemsList tbody tr').each(function (i) {
            //  $("td:first", this).html(i + 1);
            $("td:first", this).find('label').each(function () {
                $(this).html(i + 1);
                // console.log('value: ' + $(this).value);
            });
        });
        $("#hiddenNosItems").val($('#tblItemsList tbody tr').length);


           var attr_data_id= $(this).attr('data_id');
          console.log("attr_data_id id ",attr_data_id)
          let id= $("#txt_ChildId"+attr_data_id).value;
          console.log("Student id ",id)


swal({
    title: "Are you sure?",
    text: "You will not be able to recover this member !",
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
  jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'api/deleteChild',
      success: function (res) {
        var message = res.message
        var status = res.status
        var dataarray = res.data
        if (status) {

          $(this).parent().closest('tr').remove();
     
          // swal("Success", message, "success");


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

// $(this).parent().closest('tr').remove();




    });




  $(document).on('click', '#sumbitbuttonchild', function (e) {
    // child_title child_name  child_mobile_no  child_email  child_office_no  child_dob
    e.preventDefault();
    var data = new FormData();
    var child_title = $('#child_title').val();
    var child_name = $('#child_name').val();
    var child_email = $('#child_email').val();
    var child_mobile_no = $('#child_mobile_no').val();
    var child_office_no = $('#child_office_no').val();
    var child_dob = $('#child_dob').val();
    var childimage_value = $('#childimage_value').val();
     var ids = window.lastid;
    if (validateFormchild(child_title, child_name, child_mobile_no, child_email, child_office_no, child_dob, childimage_value,ids)) {
      data.append("child_title", child_title);
      data.append("child_name", child_name);
      data.append("child_mobile_no", child_mobile_no);
      data.append("child_email", child_email);
      data.append("child_office_no", child_office_no);
      data.append("child_dob", child_dob);
      data.append("childimage_value", childimage_value);
      data.append("cid", ids);
      var url;
      url = "/api/addChild"
      jQuery.ajax({
        type: 'POST', 
        data: data, //input data to be sent to the server
        cache: true,
        contentType: false,
        processData: false,
        type: 'post',
        url: url,
        success: function (res) {
          var message = res.message
          var status = res.status
          if (status) {

            clearModel();
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


});


function
clearModel() {

  $('#child_title').val("");
  $('#child_name').val("");
  $('#child_email').val("");
  $('#child_mobile_no').val("");
  $('#child_office_no').val("");
  $('#child_dob').val("");
  $('#childimage_value').val("");
  $("#childimage").fileinput('clear');
  


}

function uploadData(file_data, detail) {

  $(".modal").show();
  var imagedata;
  var img;
  var form_data = new FormData();
  form_data.append("upfile", file_data);
  jQuery.ajax({
    url: "/api/uploadimage",
    cache: true,
    contentType: false,
    processData: false,
    data: form_data, // Setting the data attribute of ajax with file_data
    type: 'post',
    success: function (datas) {
      var status = datas.status;
      if (status) {
        // swal("Success", datas.message, "success");
        img = datas.path;

        if (detail == "mem") {

          memberimage = img;

          $('#MemberImage_value').val(memberimage);
        }
        else if (detail == "spo") {
          // var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+img
          spouceimage = img;
          $('#SpouseImage_value').val(spouceimage);

        }
        else {
          // var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+img
          childimage = img;
          $('#childimage_value').val(childimage);
        }

         $(".modal").hide();

      }
      else {
        $(".modal").hide();

        swal("Failed", "Error", "error");
      }
    }, error: function (datass) {
      console.log("error");

      swal("Failed", "Error", "error");
      $(".modal").hide();
    }
  });
}

function LoadDataDromDb() {

       $(".modal").show();
  jQuery.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',
    url: '/api/listMembers',
    success: function (res) {
      var message = res.message
      var status = res.status
      var dataarray = res.data
      if (status) {
        updateTable(res);
             $(".modal").hide();
      }
      else {
             $(".modal").hide();
      }
    }
  });

}
function validateFormchild(child_title, child_name, child_mobile_no, child_email, child_office_no, child_dob, childimage_value,ids) {


  var isvaid = true;
  var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  var mob_regex = /[2-9]{2}\d{8}/;
  var name_regex = /^[a-zA-Z]+$/;

  if (child_title == "") {
    alerts("Title is required");
    isvaid = false;
    return isvaid;

  }
  else if (!check_Alphas(child_name)) {

    isvaid = false;
    return isvaid;
  }
  else if (!child_mobile_no.match(mob_regex)) {
    // else if (mobile_no == "") {
    alerts("Child Mobile Number Required");
    isvaid = false;
    return isvaid;
  }
  else if (!child_email.match(email_regex)) {

    alerts(" Valid Email Required");
    isvaid = false;
    return isvaid;

  }
  else if (!child_office_no.match(mob_regex) ) {
    alerts("Land Line Number Required");
    isvaid = false;
    return isvaid;
  }
  else if (child_dob == "") {
    alerts("Dob Required");
    isvaid = false;
    return isvaid;
  }
  else if (childimage_value == "") {
    alerts("Childimage Required");
    isvaid = false;
    return isvaid;
  }
  else if (ids == "") {
    alerts("ID  Required");
    isvaid = false;
    return isvaid;
  }
  else {
    isvaid = true;
    return isvaid;
  }

}

function check_Alpha(letters){
    var regex = /^[a-zA-Z]+$/;

     if(letters == " "){
      alerts("Name Field cannot be left empty");
   
      return false;
    }
    if(regex.test(letters) == false){
   alerts("Name must be in alphabets only");

   return false;
    }
   
    return true;  
  }

  function check_Alphas(letters){
    var regex = /^[a-zA-Z]+$/;

     if(letters == " "){
      alerts("Partner Name Field cannot be left empty");
   
      return false;
    }
    if(regex.test(letters) == false){
   alerts("Partner Name must be in alphabets only");
 
   return false;
    }
   
    return true;
  }

// function validateForm(memberimage, spouceimage,name, title,  mobile_no, email, office_no, dob, address,
//   title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date, ismarried, Profession) {
function validateForm(title, name, mobile_no, email, office_no, dob, address, memberimage, title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date,  Profession, spouceimage,ismarredflag,isedit) {

 console.log("ismarredflag in vaidation",ismarredflag)

  var isvaid = true;
  var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  var mob_regex = /^[789]\d{9}$/;
  var name_regex = /^[a-zA-Z]+$/;
  if (title == "") {
    alerts("Title  Required");
    isvaid = false;
    return isvaid;

  }
  else if (!check_Alpha(name)) {
  
    isvaid = false;
    return isvaid;
  }
  else if (!mobile_no.match(mob_regex) || mobile_no.length == 0) {
    // else if (mobile_no == "") {
    alerts("Mobile Number Required");
    isvaid = false;
    return isvaid;
  }
  else if (!email.match(email_regex) || email.length == 0) {

    alerts("Email Id Required");
    isvaid = false;
    return isvaid;

  }
  
  // else if (office_no == "") {
  //   alerts("Office Number Required");
  //   isvaid = false;
  //   return isvaid;
  // }
  else if (dob == "") {
    alerts("Date Of Birth Required");
    isvaid = false;
    return isvaid;
  }
  else if (address == "") {
    alerts("Address  Required");
    isvaid = false;
    return isvaid;
  }
  // else if (memberimage == "") {
    
  //   alerts("Memberimage Required");

  //   // swal("Good job!", "You clicked the button!", "warning")
  //   isvaid = false;
  //   return isvaid;
  
  // }
  
  else if (ismarredflag) {

  if (weeding_date == "") {
    alerts("Wedding Date Required");
    isvaid = false;
    return isvaid;
  }else if (title_for_spouse == "") {
    alerts("Partner Tittle Required");
    isvaid = false;
    return isvaid;
  }

  else if (!check_Alphas(nameOf_spouse)) {
  
    isvaid = false;
    return isvaid;
  }
  else if (spouse_mobileNo.length == 0) {
    alerts("Partner Mobile Number Required");
    isvaid = false;
    return isvaid;
  }
  else if (!spouse_email.match(email_regex)) {
    // else if (spouse_email == "") {
    alerts("Enter A Valid Partner Email Id");
    isvaid = false;
    return isvaid;
  }
  else if (spouse_dob == "") {
    alerts("Partner Date Of Birth Required");
    isvaid = false;
    return isvaid;
  }
  else if (!ValidateChildDetails()) {

    // alerts(" Required");
    isvaid = false;
    return isvaid;

  }
  // else if (Profession == "") {
  //   alerts("Profession  required");
  //   isvaid = false;
  //   return isvaid;
  // } 
  // else if (spouceimage == "") {
  //   alerts("Partner Image  Required");
  //   isvaid = false;
  //   return isvaid;
  // }
  else
  {

    isvaid = true;
    return isvaid;
  }


  }
  else
  {
    isvaid = true;
    return isvaid;
  }

}




function alerts(message) {
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

function clearAll() {

  $("#SpouseImage").fileinput('clear');
  $("#MemberImage").fileinput('clear');
  $('#textCategoryName').val("");
  $('#textCategoryId').val("");
  $('#name').val("");
  $('#mobile_no').val("");
  $('#email').val("");
  $('#office_no').val("");
  $('#dob').val("");
  $('#address').val("");
  $('#nameOf_spouse').val("");
  $('#spouse_mobileNo').val("");
  $('#spouse_email').val("");
  $('#spouse_dob').val("");
  $('#weeding_date').val("");
  $('#MemberImage_value').val("");
  $('#SpouseImage_value').val("");
  $('#Profession').val("");

    $('#empProfession').val("");

  $('#memberimagesrc').attr('src', '');
  $('#spuseimagesrc').attr('src', '');
  $("#memberimagesrc").hide();
  $("#spuseimagesrc").hide();


  $('#sumbitbutton').text("Submit");


  $("#isedits").val("NO");




$("#maritalstatus_2").prop('checked', true);

  $("#memberimagesrc").hide();
  
    $("#spuseimagesrc").hide();

  $("#married_div").hide();
  // $("#spousediv").hide();


 

  $('#tblItemsList').html('');
 $("#ismarried").val("NO");




}

function Updatevalue(res) {


  var data = res.data
  var name = data[0].name

  window.itemid = data[0].cid

  var titl = data[0].title
  var mobile_no = data[0].mobile_no

  var email = data[0].email
  var office_no = data[0].office_no

  var dob = data[0].dob
  var address = data[0].address

  var title_for_spouse = data[0].title_for_spouse
  var nameOf_spouse = data[0].nameOf_spouse

  var spouse_mobileNo = data[0].spouse_mobileNo
  var spouse_email = data[0].spouse_email

  var spouse_dob = data[0].spouse_dob
  var weeding_date = data[0].weeding_date

  var ismarried = data[0].ismarried
  var MemberImage = data[0].MemberImage

  var SpouseImage = data[0].SpouseImage
  var Profession = data[0].Profession
  var Member_Profession = data[0].Member_Profession



console.log("weeding_date with out format",weeding_date);

  

var dob_new = new Date(dob).toISOString().slice(0,10);

if (ismarried=="YES") {
var weeding_date_new = new Date(weeding_date).toISOString().slice(0,10);
var spouse_dob_new = new Date(spouse_dob).toISOString().slice(0,10);
$("#maritalstatus_1").prop('checked', true);
   $("#spousediv").show();
  $("#married_div").show();
   $("#ismarried").val("YES");  
}
if (ismarried=="NO") {
$("#maritalstatus_2").prop('checked', true);

  $("#married_div").hide();
     $("#ismarried").val("NO");
     // $("#spousediv").hide();
}
  $('#sumbitbutton').text("UPDATE");
  $('#textCategoryName').val("");
  $('#textCategoryId').val("");
  $('#title_for').val(titl);
  $('#title_for_spouse').val(title_for_spouse);
  $('#name').val(name);
  $('#mobile_no').val(mobile_no);
  $('#email').val(email);
  $('#office_no').val(office_no);
  $('#dob').val(dob_new);
  $('#address').val(address);
  $('#nameOf_spouse').val(nameOf_spouse);
  $('#spouse_mobileNo').val(spouse_mobileNo);
  $('#spouse_email').val(spouse_email);
  $('#spouse_dob').val(spouse_dob_new);
  $('#weeding_date').val(weeding_date_new);
  $('#ismarried').val(ismarried);


  $('#Profession').val(Profession);
  $('#MemberImage_value').val(MemberImage);
  $('#SpouseImage_value').val(SpouseImage);
    $('#empProfession').val(Member_Profession);


  $("#memberimagesrc").attr("src", MemberImage);
  $("#spuseimagesrc").attr("src", SpouseImage);
  $("#memberimagesrc").show();
  $("#spuseimagesrc").show();

  




}
function updateTable(dataAsJsonArry) {
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
      { data: "cid" },
      
      {
        "render": function (data, type, JsonResultRow, meta) {
          var image = JsonResultRow.MemberImage;
          return '<img src="' + image + '" alt="" class="img-thumbnail img-responsive imagefit">';
        }
      ,"bSortable": false},
      { data: "name" },
      { data: "address" },
      { data: "mobile_no" },

      { data: "email" },
      // { data: "office_no" },
      { data: "dob" },
      // { data: "title_for_spouse" },
      { data: "nameOf_spouse" },
      // { data: "SpouseImage"},
      {
        "render": function (data, type, JsonResultRow, meta) {
          var image = JsonResultRow.SpouseImage;
          return '<img src="' + image + '" alt="" class="img-thumbnail img-responsive">';
        }
      ,"bSortable": false},

      { data: "Profession" },
      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm alignclass">';
          html += '<button type="button" data_id=' + data.cid + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.cid + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      ,"bSortable": false}
    ]
  });
  mytable.draw();

}
function UpdateChildrenDetails(tittle,texts) {


  swal({
    title: tittle,
    text: texts,
    type: "success",
    showCancelButton: true,
    confirmButtonClass: "btn-primary",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: false
  },
    function (isConfirm) {
      if (isConfirm) {

        // swal("Deleted!", "Your imaginary file has been deleted.", "success");
        swal.close();
        $("#popup").click();
       

      } else {
 
        swal("Cancelled", "", "success");
      }
    });

 

}


function GenerateTableRows() {


 


        // $( ".dates" ).datetimepicker( "destroy" );

    var i = $("#hiddenNosItems").val();
    i++;
    $("#hiddenNosItems").val(i);
    var html = '<tr>';
    html += ' <td> <label>' + i + '.</label>';
    html += '<input type="hidden" data_id=' + i + ' data-attr-id="S_ChildId" id="txt_ChildId' + i + '" value="0">';
    html += '<a href="javascript:void(0)" data-toggle="tooltip" title="" class="btnRemoveRow btn btn-outline btn-danger" alf="" data-original-title="Delete"><i class="fa fa-times"></i></a>';
    html += '</td>'; 
    html += '<td width="8%">';
    html += '  <select id="textTittle' + i + '" data-attr-id="Tittle"  data_id=' + i + ' class="form-control">'+
                                                      '<option value="Mr.">Mr.</option>'+
                                                       ' <option value="Mrs.">Mrs.</option>'+
                                                          '<option value="Ms.">Ms.</option>'+
                                                        '<option value="Miss">Miss</option>'+
                                                    '</select>';
    html += '</td>';
    html += ' <td width="15%">';
    html += '<input value="" data_id=' + i + ' data-attr-id="Name" type="text" id="txt_Name_Id' + i + '" name="Name' + i + '" class="form-control S_Name" placeholder="Enter Name">';
    html += '</td>';  
    html += ' <td width="15%">';
    html += ' <input  data_id=' + i + ' type="number" data-attr-id="Mobile_Number" id="txtMobile_Number' + i + '" name="Mobile_Number' + i + '" class="form-control S_Mobile_Number" placeholder="Mobile Number">';
    html += '</td>';
    html += '<td width="15%">';
    html += '<input  type="text" data-attr-id="Email" data_id=' + i + ' id="txt_Email' + i + '" name="EmailId' + i + '" class="form-control S_Email" placeholder="Email">';
    html += ' </td>';
    html += '<td width="15%">';
    html += '<input data_id=' + i + ' data-attr-id="Land_Line_Number" type="number" id="txt_Land_Line_Number_ID' + i + '" name="Land_Line_Number' + i + '" class="form-control S_Land_Line_Number" placeholder="Land Line Number">';
    html += ' </td>';
    html += '<td width="15%">';
    html += '<input data_id=' + i + ' data-attr-id="Date_Of_Birth" type="text" id="txt_Date_Of_Birth_Id' + i + '" name="Date_Of_Birth' + i + '"  class="form-control" placeholder=" Date Of Birth">';
    html += ' </td>';
    html += '<td width="15%">';
    html += ' <input  class="inputFile" data_id=' + i + ' type="file" name="input14[]" data-attr-id="Child_Image"  id="txt_ChildImage' + i + '" accept="image/*" '+'>';
    html  += '  <img data_id=' + i + ' src="" id="childimagepreview' + i + '" type="hidden"  style="width:60%" class="imagefitcover">'
    html += ' </td>';
    html += '</tr>';
    $('#tblItemsList').append(html);


    
      $(".inputFile").on('change',function(){
        console.log('change file');
        var data_id= $(this).attr('data_id');
        readURL(this,"#childimagepreview"+data_id);
    });


  var lengt= $('#tblItemsList tbody tr').length;
   console.log(lengt);
var id ="txt_Date_Of_Birth_Id"+lengt;
   console.log(id);   
 $("#txt_Date_Of_Birth_Id"+lengt).datetimepicker({
format: 'YYYY-MM-DD' });  
    // $('.Account_Id').select2();
    // loadItemsList_autocomplete($("#txtItem_Id_" + i));
    // loadTaxGroupList_autocomplete($("#txtTax_Group_Id_" + i))
    // $("#txtItem_Id_" + i).focus();
    
} 

function GenerateTableEditRows(res) {
$('#tblItemsList').html('');

  console.log("res Child details from db",res);

console.log("res length",res.data.length);
for (var i = 0; i < res.data.length; i++) {
  
    $("#hiddenNosItems").val(i+1);
    var html = '<tr>';
    html += ' <td> <label>' + i+1 + '.</label>';
    html += '<input type="hidden" data_id=' + i + ' data-attr-id="S_ChildId" id="txt_ChildId' + i + '" value="'+res.data[i].childID+'">';
    html += '<input type="hidden" data_id=' + i + ' data-attr-id="S_MmeberId" id="txt_MemberId' + i + '" value="'+res.data[i].childID+'">';
    html += '<a href="javascript:void(0)" data-toggle="tooltip" title="" class="btnRemoveRow btn btn-outline btn-danger" alf="" data-original-title="Delete"><i class="fa fa-times"></i></a>';
    html += '</td>'; 
    html += '<td width="8%">';
    html += '  <select value="'+res.data[i].title+'" id="textTittle' + i + '" data-attr-id="Tittle"  data_id=' + i + ' class="form-control">'+
                                                      '<option value="Mr.">Mr.</option>'+
                                                       ' <option value="Mrs.">Mrs.</option>'+
                                                          '<option value="Ms.">Ms.</option>'+
                                                        '<option value="Miss">Miss</option>'+
                                                    '</select>';
    html += '</td>';
    html += ' <td width="15%">';
    html += '<input value="'+res.data[i].name+'" data_id=' + i + ' data-attr-id="Name" type="text" id="txt_Name_Id' + i + '" name="Name' + i + '" class="form-control S_Name" placeholder="Enter Name">';
    html += '</td>';  
    html += ' <td width="15%">';
    html += ' <input value="'+res.data[i].mobile_no+'" data_id=' + i + ' type="number" data-attr-id="Mobile_Number" id="txtMobile_Number' + i + '" name="Mobile_Number' + i + '" class="form-control S_Mobile_Number" placeholder="Mobile Number">';
    html += '</td>';
    html += '<td width="15%">';
    html += '<input value="'+res.data[i].email+'" type="text" data-attr-id="Email" data_id=' + i + ' id="txt_Email' + i + '" name="EmailId' + i + '" class="form-control S_Email" placeholder="Email">';
    html += ' </td>';
    html += '<td width="15%">';
    html += '<input value="'+res.data[i].office_no+'" data_id=' + i + ' data-attr-id="Land_Line_Number" type="number" id="txt_Land_Line_Number_ID' + i + '" name="Land_Line_Number' + i + '" class="form-control S_Land_Line_Number" placeholder="Land Line Number">';
    html += ' </td>';
    html += '<td width="15%">';
    html += '<input value="'+res.data[i].dob+'" data_id=' + i + ' data-attr-id="Date_Of_Birth" type="text" id="txt_Date_Of_Birth_Id' + i + '" name="Date_Of_Birth' + i + '"  class="form-control date"  placeholder=" Date Of Birth">';
    html += ' </td>';
    html += '<td width="15%">';
    html += ' <input  class="inputFile" data_id=' + i + ' type="file" name="input14[]" data-attr-id="Child_Image"  id="txt_ChildImage' + i + '" accept="image/*" '+'>';
    html  += '  <img data_id=' + i + ' src="'+res.data[i].imageUrl+'" id="childimagepreview' + i + '" type="hidden"  style="width:60%" class="imagefitcover">'
    html += ' </td>';
    html += '</tr>';
    $('#tblItemsList').append(html);




    
      $(".inputFile").on('change',function(){
        console.log('change file');
        var data_id= $(this).attr('data_id');
        readURL(this,"#childimagepreview"+data_id);
    });
      }


    
}


function UpdateChildvalue(res) {
  console.log("res",res);
 GenerateTableEditRows(res);

}

function ValidateChildDetails()
{

                    
    $('#tblItemsList tbody tr').each(function (i) {     
     
     
        $("td", this).find('input, select, label, textarea').each(function () {
          var attrVal = $(this).attr('data-attr-id');


 


             if (this.tagName == 'INPUT' && attrVal == 'txt_Name_Id') {
              let valueItemId = $(this).attr('txt_Name_Id');
              if (valueItemId == '' || valueItemId == undefined || valueItemId == '0' || valueItemId == null ) {
                   $($(this)).attr('style', 'border: red 1px solid !important;');
                    return false;
              }
              else {
                return true;

                  $($(this)).attr('style', '');
              }
          }

            
        });
       
      

 
        
    });


  
}


function uploadChildDetails(memberid) {


    var itemList = [];
    var myRows = [];  
    var myRows = [];
    var ItemsDataResult = [];
    var jsonRow = [];
    var data = new FormData();
    let isValid = true;





                    
    $('#tblItemsList tbody tr').each(function (i) {     
        myRows[i] = {};
     
        $("td", this).find('input, select, label, textarea').each(function () {
          var attrVal = $(this).attr('data-attr-id');


 



           if (this.tagName == 'INPUT' && attrVal == 'Child_Image') {
              let valueItemId = $(this).prop('item_id')
              var attrVal = $(this).attr('data-attr-id');
              var attr_data_id= $(this).attr('data_id');
              myRows[i][attrVal] = valueItemId;
              myRows[i]["memberid"] = memberid;
              let isFileAvailable=true;
              // check file
              if(isFileAvailable){
                let imageSrc= $("#childimagepreview"+attr_data_id).attr('src');
                // var data = imageSrc.replace(/^data:image\/\w+;base64,/, "");
                 var attrVal = $(this).attr('data-attr-id');
                  myRows[i][attrVal] = imageSrc ;
              }

          }
      
          
           else {
              var attrVal = $(this).attr('data-attr-id');
              myRows[i][attrVal] = this.value;
          }


            
        });
       
        ItemsDataResult.push(myRows[i]);

 
        
    });

     
    
   console.log(ItemsDataResult)





      var url;
      if ($('#sumbitbutton').text() == "Submit") {
        url = "/api/addChildrenDetails"
      } else {
        url = "/api/updateChildDetails"
      }
      console.log(url)

      jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(ItemsDataResult),
      contentType: 'application/json',
      url: url,
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

}





