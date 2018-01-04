var express = require("express");
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var multer = require('multer');
var session = require('express-session')
var app = express();
var upload = require('express-fileupload');
app.use(upload()); 
var authenticateController = require('./Controllers/authenicate_controller');
var registerController = require('./Controllers/register_controller');
var addcategory_controller = require('./Controllers/categorycontroller');
var memberscontroller = require('./Controllers/memberscontroller');
var eventcontroller = require('./Controllers/eventcontroler');
var newstcontroller = require('./Controllers/newscontroller');
var eventtypecontroller = require('./Controllers/eventtypecontroller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.engine('html', require('ejs').renderFile);
app.engine('ejs', engine);


app.get('/s', function (req, res) {
    res.sendFile(__dirname + '/Views/uploadfile.html');
})
app.post('/api/upload', eventtypecontroller.uploadimage)
app.post('/api/uploadimagenews', newstcontroller.uploadimagenews)

app.post('/api/uploadimage', eventtypecontroller.uploadimagebase)


app.post('/api/listMembers', memberscontroller.listMembers);



app.get('/', function (req, res) {
    res.render('login.html');
});

app.get('/base', function (req, res) {
    res.render('base.ejs');

});

app.get('/forgot', function (req, res) {
    res.render('forgot.html');

});

app.get('/events', function (req, res) {

    res.render('addevents.ejs');

});

app.get('/category', function (req, res) {
    res.render('category.ejs');

});

app.get('/base', function (req, res) {
    res.render('basetemplate.html');

});

app.get('/member', function (req, res) {
    res.render('addmember.ejs');

});

app.get('/news', function (req, res) {
    res.render('addnews.ejs');

});

app.get('/eventtype', function (req, res) {
    res.render('eventtype.ejs');

});

app.get('/upload', function (req, res) {
    res.render('uploadfile.html');

});

app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);
app.post('/api/addcategoy', addcategory_controller.addcategoy);
app.post('/api/listCategory', addcategory_controller.listCategory);
app.post('/api/listCategorybyid', addcategory_controller.listCategorybyid);

app.post('/api/updateCategory', addcategory_controller.updateCategory);
app.post('/api/deleteCategory', addcategory_controller.deletecategory);
app.post('/api/addmember', memberscontroller.addmember);
app.post('/api/addChild', memberscontroller.addChild);


app.post('/api/updatemember', memberscontroller.updateMember);
app.post('/api/listMembers', memberscontroller.listMembers);

app.post('/api/listMemberbyid', memberscontroller.listMemberbyid);
app.post('/api/deleteMember', memberscontroller.deleteMember);
app.post('/api/addevents', eventcontroller.addevents);
app.post('/api/listevents', eventcontroller.listevents);
app.post('/api/listeventsbyid', eventcontroller.listeventsbyid);

app.post('/api/deleteevents', eventcontroller.deleteevents);
app.post('/api/getEventTypes', eventcontroller.getEventTypes);
app.post('/api/updatevents', eventcontroller.updatevents);
app.post('/api/addnews', newstcontroller.addnews);

app.post('/api/listnews', newstcontroller.listnews);
app.post('/api/listnewssbyid', newstcontroller.listnewsbyid);
app.post('/api/deletenews', newstcontroller.deletenews);
app.post('/api/updatenews', newstcontroller.updatenews);
app.post('/api/addeventtype', eventtypecontroller.addeventtype);

app.post('/api/listeventtype', eventtypecontroller.listeventtype);
app.post('/api/listeventtypebyid', eventtypecontroller.listeventtypebyid);
app.post('/api/deleteeventtype', eventtypecontroller.deleteeventtype);
app.post('/api/getEventType', eventtypecontroller.getEventType);
app.post('/api/updateventtype', eventtypecontroller.updateventtype);
app.post('/api/uploadimage', eventtypecontroller.uploadimage);
app.listen(process.env.PORT || 8080, function(){
  console.log('listening on ports');
});
