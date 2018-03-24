var express  = require('express');
    var app = express();                               // create our app w/ express
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override');
var service = require('./services/service.js');

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users                
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json({limit: '5000mb'}));                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
//app.use(require('prerender-node').set('prerenderToken', 'hwKUGpPw0I6fWSIsrJ4H'));
 app.engine('html', require('ejs').renderFile);
    
app.get('/api/gallery',function(req,res){
    service.getAllPhotoNames().then((result)=>{     
        res.send(result);
    }).catch(function (error) {
     res.status(500).send(error);   
});
})
app.post('/api/submit',function(req,res){
    
    service.SendMail(req.body);
    res.status(200).send("Your application has been submitted successfully!!");
});
app.post('/api/event/save',function(req,res){ 
    service.SaveEvent(req.body);
    res.status(200).send("Event has been saved successfully!!");
});

app.post('/api/edit/event',function(req,res){ 
    service.EditEvent(req.body);
    res.status(200).send("Event has been saved successfully!!");
});

app.post('/api/yogablog/save',function(req,res){ 
    service.saveYogaBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});
app.post('/api/blog/save',function(req,res){ 
    service.saveBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});
app.get('/api/event/getevent/:id',function(req,res){
    var id = req.params.id;
     service.getEvent(id).then((result)=>{     
        res.send(result);
    }).catch(function (error) {
     res.status(500).send(error);   
});
});

app.get('/api/yoga/getblog/:id',function(req,res){
    var id = req.params.id;
     service.getYogaBlog(id).then((result)=>{     
        res.send(result);
    }).catch(function (error) {
     res.status(500).send(error);   
});
});

app.get('/api/event/getAll',function(req,res){
    var events ;
     service.ReadAllEvents().then((result)=>{     
        res.send(result);
    }).catch(function (error) {
     res.status(500).send(error);   
});
});

app.delete('/api/delete/event',function(req,res){ 
    service.deleteEvent(req.body);
    res.status(200).send("The event has been deleted successfully!!");
});

app.get('/api/yoga/getAllBlogs',function(req,res){
    var events ;
     service.ReadAllYogaBlogs().then((result)=>{     
        res.send(result);
    }).catch(function (error) {
     res.status(500).send(error);   
});
});
app.get('/settings',function(req,res){
    res.render('settings.html');
})
// listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");