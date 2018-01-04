
$(function () {
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
    console.log('Load_button clicked');
    var MemberImagefile = $("#MemberImage").prop("files")[0];
    var spauceimagefile = $("#SpouseImage").prop("files")[0];
    var data = new FormData();
    var title = $('#selectBasic option:selected').text()
    var names = $('#name').val();

    // console.log(name, "Hello, world!");


    var mobile_no = $('#mobile_no').val();
    var email = $('#email').val();
    var office_no = $('#office_no').val();
    var dob = $('#dob').val();
    console.log('Load' + dob);
    var address = $('#address').val();
    var title_for_spouse = $('#title_for_spouse option:selected').text()
    var nameOf_spouse = $('#nameOf_spouse').val();
    var spouse_mobileNo = $('#spouse_mobileNo').val();
    var spouse_email = $('#spouse_email').val();
    var spouse_dob = $('#spouse_dob').val();
    var weeding_date = $('#weeding_date').val();
    // var ismarried = $('#ismarried').val();
    var Profession = $('#Profession').val();
    var memberimage = $('#MemberImage_value').val();
    var spouceimage = $('#SpouseImage_value').val();
    // if (validateForm(memberimage, spouceimage, title, name, mobile_no, email, office_no, dob, address,
    //   title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date, ismarried, Profession)) {


    if (validateForm(title, names, mobile_no, email, office_no, dob, address, memberimage, title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date, ismarried, Profession, spouceimage
    )) {


      // name  mobile_no office_no email dob address MemberImage nameOf_spouse spouse_mobileNo spouse_email  spouse_dob 
      // weeding_date  Profession  ismarried SpouseImage

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


      var url;
      if ($('#sumbitbutton').text() == "Submit") {
        url = "/api/addmember"
        // console.log("MemberImage"+MemberImage);
      } else {

        var cid = window.itemid;
        console.log("cid", cid);
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
          console.log("Message" + message);
          console.log("status" + status);
          if (status) {

            window.lastid = res.lastid;
            LoadDataDromDb();
            // mytable.ajax.reload();
            // swal("Success", message, "success");
            // alertbox
            console.log("lasy id"+res.lastid);

            UpdateChildrenDetails("Saved","Do you want to add  children details");


            clearAll()
          }
          else {
            swal("Oops", message, "error");
          }


          $("#demo").html(res);  //summation displayed in the HTML page   
        }
      });
    }
    else {

      console.log("Hey lo cancel");
    }


  });


});

var mytable;

$(document).ready(function () {
  mytable = null;


  $("#maritalstatus_1").click( function()
  {
      // $("#maritalstatus_1").attr("checked","checked");
      ismarried="YES";
      console.log("YES");


  });
  $("#maritalstatus_2").click( function()
  {
      // $("#maritalstatus_2").attr("checked","checked");
      ismarried="NO";
      console.log("NO");
  });

  // $('#name').val("Saneesh test");
  // $('#mobile_no').val("8086479017");
  // $('#email').val("sanufeliz@gmail.com");
  // $('#office_no').val("8086479017");
  // $('#dob').val("2018-01-02");
  // $('#address').val("varakil h kulapparachal");
  // // $('#title_for_spouse option:selected').text()
  // $('#nameOf_spouse').val("New spouse");
  // $('#spouse_mobileNo').val("8086479017");
  // $('#spouse_email').val("sanufeliz@gmail.com");
  // $('#spouse_dob').val("2018-01-02");
  // $('#weeding_date').val("2018-01-02");
  // $('#ismarried').val("yes");

  // $('#Profession').val("admoin");



  $("#memberimagesrc").hide();
  $("#spuseimagesrc").hide();
  LoadDataDromDb();
  $(document).on('click', '.btnDelete', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input
    jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'api/deleteMember',
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



  $("#MemberImage").change(function () {
    // alert($(this).val());
    var file = $("#MemberImage").prop("files")[0];
    // var file    = document.querySelector('input[type=file]').files[0];
    // var reader = new FileReader();

    // var preview = document.getElementById('memberimagesrc.spuseimagesrc');
    // //var preview = document.querySelector('img');

    // var reader = new FileReader();

    // reader.addEventListener("load", function () {
    //   preview.src = reader.result;
    // }, false);

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    // $("#memberimagesrc").attr("src", file_data);
    uploadData(file, "mem")

  });
  $("#SpouseImage").change(function () {
    // alert($(this).val());
    var file = $("#SpouseImage").prop("files")[0];
    // // $("#file_data").attr("src", file_data);
    // var reader = new FileReader();
    // var preview = document.getElementById('spuseimagesrc');
    // //var preview = document.querySelector('img');
    // var reader = new FileReader();
    // reader.addEventListener("load", function () {
    //   preview.src = reader.result;
    // }, false);
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    uploadData(file, "spo")
  });


  $("#childimage").change(function () {
    // alert($(this).val());
    var file = $("#childimage").prop("files")[0];
    // // $("#file_data").attr("src", file_data);
    // var reader = new FileReader();
    // var preview = document.getElementById('spuseimagesrc');
    // //var preview = document.querySelector('img');
    // var reader = new FileReader();
    // reader.addEventListener("load", function () {
    //   preview.src = reader.result;
    // }, false);
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    uploadData(file, "chi")
  });



  $(document).on('click', '.btnEdit', function () {
    var id = $(this).attr('data_id');
    console.log(id);
    var data = {};
    data.code = id; //input
    jQuery.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/listMemberbyid',
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
  $(document).on('click', '#sumbitbuttonchild', function () {
    // child_title child_name  child_mobile_no  child_email  child_office_no  child_dob
    // e.preventDefault();
    console.log("submitchilc");
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
      // if ($('#sumbitbuttonchild').text() == "Submit") {
      url = "/api/addChild"
      console.log("child");
      // } else {

      //   var cid = window.itemid;
      //   console.log("cid", cid);
      //   data.append("cid", cid);

      //   url = "/api/updatemember"



      // }
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
          console.log("Message" + message);
          console.log("status" + status);
          if (status) {
            // LoadDataDromDb();
            // mytable.ajax.reload();
            clearModel();
            swal("Success", message, "success");
            // alertbox
           

            // UpdateChildrenDetails("Saved","Do you want to add another child details");



          
          }
          else {
            swal("Oops", message, "error");
          }


          $("#demo").html(res);  //summation displayed in the HTML page   
        }
      });
    }
    else {

      console.log("Hey lo cancel");
    }





    // var id = $(this).attr('data_id');
    // console.log(id);
    // var data = {};
    // data.code = id; //input
    // jQuery.ajax({
    //   type: 'POST',
    //   data: JSON.stringify(data),
    //   contentType: 'application/json',
    //   url: '/api/listMemberbyid',
    //   success: function (res) {
    //     console.log('success');
    //     console.log(res);
    //     var message = res.message
    //     var status = res.status
    //     console.log("Message" + message);
    //     console.log("status" + status);

    //     var dataarray = res.data
    //     if (status) {

    //       // LoadDataDromDb();

    //       Updatevalue(res);



    //     }
    //     else {


    //     }



    //   }
    // });



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
      console.log('data' + datas);
      var status = datas.status;
      if (status) {
        // swal("Success", datas.message, "success");
        img = datas.path;


        if (detail == "mem") {

          var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+img
          memberimage = paathwithdata;

          console.log("membar image in upload " + memberimage);
          $('#MemberImage_value').val(memberimage);


          // MemberImage_value
        }
        else if (detail == "spo") {
          var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+img
          spouceimage = paathwithdata;
          $('#SpouseImage_value').val(spouceimage);
          console.log("spouceimage image in upload" + spouceimage);

        }
        else {
          var paathwithdata='https://inlaclubapp.herokuapp.com/static/'+img
          childimage = paathwithdata;
          $('#childimage_value').val(childimage);
          console.log("chil imahe  image in upload" + childimage);
        }

      }
      else {

        swal("Failed", "Error", "error");
      }
    }, error: function (datass) {
      console.log("error");
    }
  });
}

function LoadDataDromDb() {
  jQuery.ajax({
    type: 'POST',
    //input data to be sent to the server
    contentType: 'application/json',
    url: '/api/listMembers',
    success: function (res) {
      console.log('success');
      console.log(res);
      var message = res.message
      var status = res.status
      var dataarray = res.data
      if (status) {
        updateTable(res);
      }
      else {
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
  else if (!child_name.match(name_regex) || child_name.length == 0) {
    alerts("name is required");
    isvaid = false;
    return isvaid;
  }
  else if (!child_mobile_no.match(mob_regex) || child_mobile_no.length == 0) {
    // else if (mobile_no == "") {
    alerts("child mobile no is required");
    isvaid = false;
    return isvaid;
  }
  else if (!child_email.match(email_regex) || child_email.length == 0) {

    alerts(" Valid email is required");
    isvaid = false;
    return isvaid;

  }
  else if (child_office_no == "") {
    alerts("Office number is required");
    isvaid = false;
    return isvaid;
  }
  else if (child_dob == "") {
    alerts("Dob is required");
    isvaid = false;
    return isvaid;
  }
  else if (childimage_value == "") {
    alerts("Childimage is required");
    isvaid = false;
    return isvaid;
  }
  else if (ids == "") {
    alerts("id is required");
    isvaid = false;
    return isvaid;
  }
  else {
    isvaid = true;
    return isvaid;
  }

}


// function validateForm(memberimage, spouceimage,name, title,  mobile_no, email, office_no, dob, address,
//   title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date, ismarried, Profession) {
function validateForm(title, name, mobile_no, email, office_no, dob, address, memberimage, title_for_spouse, nameOf_spouse, spouse_mobileNo, spouse_email, spouse_dob, weeding_date, ismarried, Profession, spouceimage) {
  var isvaid = true;
  var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  var mob_regex = /[2-9]{2}\d{8}/;
  var name_regex = /^[a-zA-Z]+$/;
  if (title == "") {
    alerts("Title is required");

    isvaid = false;
    return isvaid;

  }
  else if (name.length == 0) {
    alerts("name is required");
    isvaid = false;
    return isvaid;
  }
  else if (mobile_no.length == 0) {
    // else if (mobile_no == "") {
    alerts("mobile no is required");
    isvaid = false;
    return isvaid;
  }
  else if (!email.match(email_regex) || email.length == 0) {

    alerts(" Valid email is required");
    isvaid = false;
    return isvaid;

  }

  else if (memberimage == "") {
    alerts("Memberimage is required");

    // swal("Good job!", "You clicked the button!", "warning")

    isvaid = false;
    return isvaid;
  }
  else if (spouceimage == "") {
    alerts("spouceimage is required");
    isvaid = false;
    return isvaid;
  }




  else if (office_no == "") {
    alerts("office_no is required");
    isvaid = false;
    return isvaid;
  }
  else if (dob == "") {
    alerts("dob is required");
    isvaid = false;
    return isvaid;
  }
  else if (address == "") {
    alerts("address is required");
    isvaid = false;
    return isvaid;
  }
  else if (title_for_spouse == "") {
    alerts("title_for_spouse is required");
    isvaid = false;
    return isvaid;
  }

  else if (nameOf_spouse.length == 0) {
    // else if (nameOf_spouse == "") {
    alerts("nameOf spouse is required");
    isvaid = false;
    return isvaid;
  }
  else if (spouse_mobileNo.length == 0) {
    // else if (spouse_mobileNo == "") {
    alerts("spouse_mobileNo is required");
    isvaid = false;
    return isvaid;
  }
  else if (!spouse_email.match(email_regex) || spouse_email.length == 0) {
    // else if (spouse_email == "") {
    alerts("spouse_email is required");
    isvaid = false;
    return isvaid;
  }
  else if (spouse_dob == "") {
    alerts("spouse_dob is required");
    isvaid = false;
    return isvaid;
  }
  else if (weeding_date == "") {
    alerts("weeding_date is required");
    isvaid = false;
    return isvaid;
  } else if (ismarried == "") {
    alerts("ismarried is required");
    isvaid = false;
    return isvaid;
  }
  else if (Profession == "") {
    alerts("Profession is required");
    isvaid = false;
    return isvaid;
  } else {
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
  // $('#selectBasic option:selected').selected=1
  $('#name').val("");
  $('#mobile_no').val("");
  $('#email').val("");
  $('#office_no').val("");
  $('#dob').val("");
  $('#address').val("");
  // $('#title_for_spouse option:selected').text()
  $('#nameOf_spouse').val("");
  $('#spouse_mobileNo').val("");
  $('#spouse_email').val("");
  $('#spouse_dob').val("");
  $('#weeding_date').val("");
  // $('#ismarried').val("");
  $('#MemberImage_value').val("");
  $('#SpouseImage_value').val("");
  $('#Profession').val("");


  // var $el = $('#SpouseImage');
  // $el.wrap('<form>').closest('form').get(0).reset();
  // $el.unwrap();
  // var $ell = $('#MemberImage');
  // $ell.wrap('<form>').closest('form').get(0).reset();
  // $ell.unwrap();
  $('#memberimagesrc').attr('src', '');
  $('#spuseimagesrc').attr('src', '');
  $("#memberimagesrc").hide();
  $("#spuseimagesrc").hide();
}

function Updatevalue(res) {

  console.log(res);

  var data = res.data
  var name = data[0].name

  window.itemid = data[0].cid

  var title = data[0].title
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

  $('#sumbitbutton').text("UPDATE");
  $('#textCategoryName').val("");
  $('#textCategoryId').val("");
  $('#selectBasic').val(title);
  $('#title_for_spouse').val(title_for_spouse);
  // $('#selectBasic option:selected').selected=1
  $('#name').val(name);
  $('#mobile_no').val(mobile_no);
  $('#email').val(email);
  $('#office_no').val(office_no);
  $('#dob').val(dob);
  $('#address').val(address);
  // $('#title_for_spouse option:selected').text()
  $('#nameOf_spouse').val(nameOf_spouse);
  $('#spouse_mobileNo').val(spouse_mobileNo);
  $('#spouse_email').val(spouse_email);
  $('#spouse_dob').val(spouse_dob);
  $('#weeding_date').val(weeding_date);
  $('#ismarried').val(ismarried);
  $('#Profession').val(Profession);
  $('#MemberImage_value').val(MemberImage);
  $('#SpouseImage_value').val(SpouseImage);
  // $('#MemberImage').val(MemberImage);
  // $('#SpouseImage').val(SpouseImage);

  console.log("MemberImage " + MemberImage);
  console.log("SpouseImage " + SpouseImage);
  $("#memberimagesrc").attr("src", MemberImage);
  $("#spuseimagesrc").attr("src", SpouseImage);
  $("#memberimagesrc").show();
  $("#spuseimagesrc").show();
}
function updateTable(dataAsJsonArry) {
  //$('#memberDatatable').DataTable().destory();
  if (mytable)
    mytable.destroy();
  mytable = $('#memberDatatable').DataTable({
    destory: true,
    "scrollX": true,
    destory: true,
    bRetrieve: true,
    searching: true,
    data: dataAsJsonArry.data,
    // "columnsDefs":[
    //   {className:"hiddencnt" , "target":[4]},
    //   {className:"hiddencnt"  , "target":[5]}
    //   ],
    columns: [
      { data: "cid" },
      // { data: "title" },
      // { data: "MemberImage"},
      {
        "render": function (data, type, JsonResultRow, meta) {
          var image = JsonResultRow.MemberImage;
          console.log("IMAGE"+image);
          return '<img src="' + image + '" alt="" class="img-thumbnail img-responsive imagefit">';
        }
      },
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
          console.log("IMAGE"+image);
          return '<img src="' + image + '" alt="" class="img-thumbnail img-responsive">';
        }
      },

      // { data: "spouse_mobileNo" },

      // { data: "spouse_email" },
      // { data: "spouse_dob" },

      // { data: "weeding_date" },
      // { data: "ismarried" },
      { data: "Profession" },
      {
        data: null, render: function (data, row, type) {
          var html = '<div role="group" aria-label="Basic example" class="btn-group btn-group-sm alignclass">';
          html += '<button type="button" data_id=' + data.cid + ' class="btnView btn btn-outline btn-primary"><i class="ti-eye"></i></button>';
          html += '<button type="button" data_id=' + data.cid + ' class="btnEdit btn btn-outline btn-success"><i class="ti-pencil"></i></button>';
          html += '<button type="button" data_id=' + data.cid + '  class="btnDelete btn btn-outline btn-danger"><i class="ti-trash"></i></button>';
          html += '</div>';
          return html;
        }
      }
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

        $("#popup").click();
        swal.close();

      } else {
        swal("Cancelled", "Your data will be saved", "success");
      }
    });

  // swal({
  //   title: "Member added",
  //   text: "Do you want to enter child details!",
  //   type: "success",
  //   showCancelButton: true,

  //   confirmButtonClass: "btn-primary",

  //   confirmButtonText: "Yes, Enter child details",
  //   closeOnConfirm: false
  // },
  // function(){
  //   swal({
  //     title: "Enter child details",
  //     text: "Enter Child Name:",
  //     type: "input",
  //     showCancelButton: true,
  //     closeOnConfirm: false,
  //     inputPlaceholder: "Enter Child Name",
  //     inputPlaceholder: "Enter Child Name"





  //   },

  //   function (inputValue) {
  //     if (inputValue === false) return false;
  //     if (inputValue === "") {
  //       swal.showInputError("You need to write something!");
  //       return false
  //     }
  //     swal("Nice!", "You wrote: " + inputValue, "success");
  //   }

  //   );
  // });

}