var express = require('express');
var app = express(); // create our app w/ express
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override');
var service = require('./services/service.js');
var session = require('express-session');
var request = require('request');

var rp = require('request-promise');
app.use(session({ secret: 'schoolofshanthi' }));
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users                
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '5000mb' })); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//app.use(require('prerender-node').set('prerenderToken', 'hwKUGpPw0I6fWSIsrJ4H'));
app.engine('html', require('ejs').renderFile);

app.get('/api/gallery', function (req, res) {
    service.getAllPhotoNames().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
})

app.post('/api/submit', function (req, res) {
    console.log(req);
    console.log(res)
    var status = service.SendMail(req.body);
    res.status(200).send("Your application sucessfully submitted! Please check mail for details");
});
app.post('/api/event/save', function (req, res) {
    service.SaveEvent(req.body).then((result) => {
        if (result.optype == "COPY") {
            res.send(result);
        }
        else {
            res.status(200).send("Event has been saved successfully!!");
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.post('/api/edit/event', function (req, res) {
    service.EditEvent(req.body);
    res.status(200).send("Event has been saved successfully!!");
});

app.post('/api/yogablog/save', function (req, res) {
    service.saveYogaBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});

/*app.post('/api/blog/save', function(req, res) {
    service.saveBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});*/
app.get('/api/event/getevent/:id', function (req, res) {
    var id = req.params.id;
    service.getEvent(id).then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/api/event/getIp', function (req, res) {
    service.getIp().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/api/yoga/getblog/:id', function (req, res) {
    var id = req.params.id;
    service.getYogaBlog(id).then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/api/event/getAll', function (req, res) {
    var events;
    service.ReadAllEvents().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.delete('/api/delete/event', function (req, res) {
    service.deleteEvent(req.body);
    res.status(200).send("The event has been deleted successfully!!");
});

app.delete('/api/blog/delete', function (req, res) {
    service.deleteKnowYogaBlogs(req.body);
    res.status(200).send("The blog has been deleted successfully!!");
});

app.delete('/api/santhiblog/delete', function (req, res) {
    service.deleteSanthiBlogs(req.body);
    res.status(200).send("The Santhi blog has been deleted successfully!!");
});

app.post('/api/news/delete', function (req, res) {
    service.deleteNews(req.body);
    res.status(200).send("The news has been deleted successfully!!");
});
/*app.get('/api/yoga/getAllBlogs', function(req, res) {
    var events;
    service.ReadAllYogaBlogs().then((result) => {
        res.send(result);
    }).catch(function(error) {
        res.status(500).send(error);
    });
});*/

/***************************************************/


app.get('/settings', function (req, res) {
    var activeSession = req.session;
    if (activeSession.isActive) {
        res.render('../public/settings/settings.html');
    } else {
        res.render('unauthorized.html');
    }
})

app.post('/api/login', function (req, res) {
    var activeSession = req.session;
    service.checkLogin(req).then((result) => {
        if (result) {
            activeSession.isActive = true;
            res.status(200).send(true);
            //res.render('settings.html');
        } else {
            activeSession.isActive = false;
            res.status(401).send(error);
        }
        //res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/login', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/#/login');
        }
    });
});

app.get('/api/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/#/login');
        }
    });
});

app.get('/api/yogaBlog/getAllBlogs', function (req, res) {
    var events;
    service.ReadAllKnowYogaBlogs().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
app.get('/api/santhiblog/getAllBlogs', function (req, res) {
    var events;
    service.getAllSanthiBlogs().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/api/yoga/getYoga/:id', function (req, res) {
    var id = req.params.id;
    service.getYoga(id).then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

app.get('/api/santhi/getSanthi/:id', function (req, res) {
    var id = req.params.id;
    service.getSanthi(id).then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});


app.get('/api/news/getnews/:id', function (req, res) {
    var id = req.params.id;
    service.getNews(id).then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
app.get('/api/news/getAll', function (req, res) {
    var events;
    service.ReadAllNews().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
app.post('/api/news/updateNews', function (req, res) {
    service.updateNews(req.body);
    res.status(200).send("News has been updated successfully!!");
});

app.post('/api/santhiblog/save', function (req, res) {
    service.saveSanthiBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});

app.post('/api/blog/save', function (req, res) {
    service.saveKnowYogaBlog(req.body);
    res.status(200).send("The blog has been saved successfully!!");
});

app.post('/api/save/news', function (req, res) {
    service.saveNews(req.body);
    res.status(200).send("News has been saved successfully!!");
});

app.post('/api/update/knowyoga', function (req, res) {
    service.updateKnowYogaBlog(req.body);
    res.status(200).send("Blog has been updated successfully!!");
});

app.post('/api/update/santhiblog', function (req, res) {
    service.updateSanthiBlog(req.body);
    res.status(200).send("Blog has been updated successfully!!");
});

/*app.post('/api/event/duplicate', function (req, res) {
    service.duplicateEvent(req.body);
    res.status(200).send("Duplicated successfully!!");
});*/

app.post('/api/saveGeneralSettings', function (req, res) {
    service.saveGeneralSettings(req.body);
    res.status(200).send("Settings saved successfully!!");
});
app.get('/api/getGeneralSettings', function (req, res) {
    service.getGeneralSettings().then((result) => {
        res.send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");