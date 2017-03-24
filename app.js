var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host : '192.168.56.101',
  port : 3306,
  user : 'latilt',
  password : 'tjfrud7130',
  database : 'newsdb'
})

connection.connect()

app.listen('3000', function() {
  console.log("Start Server port 3000")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.get('/', function(req, res) {

  var query = connection.query('SELECT title, imgurl, subscribed FROM PRESS', function(err, rows) {
    if(err) throw err;
    if(rows) {
      res.render('main.ejs', {'list' : rows})
    }
  })
})

app.get('/news', function(req, res) {
  var responseData = []
  var query = connection.query('SELECT TITLE, IMGURL, SUBSCRIBED, NEWS FROM PRESS P JOIN NEWSLIST L ON P.TITLE = L.PRESSTITLE', function(err, rows) {
    if(err) throw err;
    if(rows) {
      responseData = rows.reduce(function(acc, val, index, array) {
        if(acc.length === 0) {
          acc.push({title : val.TITLE, imgurl : val.IMGURL, newslist : [val.NEWS], subscribed : (val.SUBSCRIBED === 1) ? true : false})
        } else {
          var targetIndex = acc.findIndex(function(e, i, a) {
            return e.title === val.TITLE;
          });
          if(targetIndex >= 0) {
            acc[targetIndex].newslist.push(val.NEWS)
          } else {
            acc.push({title : val.TITLE, imgurl : val.IMGURL, newslist : [val.NEWS], subscribed : (val.SUBSCRIBED === 1) ? true : false})
          }
        }

        return acc
      }, [])
    } else {
      console.log(rows)
    }
    res.json(responseData)
  })

})

app.post('/news/subscribed', function(req, res) {
  var query = connection.query('UPDATE PRESS SET SUBSCRIBED = ' + req.body.subscribed + ' WHERE TITLE = "' + req.body.title +'"', function(err, rows) {
    if(err) throw err
    if(rows) {

    }
    res.json(rows)
  })
})
