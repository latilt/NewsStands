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
  //res.sendFile(__dirname + '/public/main.html')
  // var pressList = "";
  // news.forEach(function(e) {
  //   pressList = pressList + "<li><img id='" + e.title + "' src='" + e.imgurl + "' style='border-color:" + ((e.subscribed) ? "red" : "black") + "'/></li>"
  // });
  res.render('main.ejs', {'list' : news})
  //res.sendFile(__dirname + '/views/main.ejs')
})

app.get('/news', function(req, res) {
  var responseData = {}
  var query = connection.query('SELECT TITLE, IMGURL, SUBSCRIBED, NEWS FROM PRESS P JOIN NEWSLIST L ON P.TITLE = L.PRESSTITLE', function(err, rows) {
    if(err) throw err;
    if(rows) {
      console.log(rows)
    } else {
      console.log(rows)
    }
    res.json(rows)
  })

})

app.post('/news/subscribed', function(req, res) {
  console.log(req.body.title)
  news.forEach(function(e) {
    if(e.title === req.body.title) {
      e.subscribed = (e.subscribed) ? false : true
      console.log(e)
    }
  })
  var responseData = {result : "ok", data : req.body.title}
  res.json(responseData)
})

var news = [
  {
    "title": "sbs",
    "imgurl": "http://img.naver.net/static/newsstand/up/2014/0715/055.gif",
    "newslist": [
      "[가보니] 가상 경주도 즐기고, 내 손으로 자동차도 만들고",
      "리캡차'가 사라진다",
      "갤럭시S8' 출시? '갤노트7' 처리 계획부터 밝혀야",
      "블로코-삼성SDS, 블록체인 사업 '맞손",
      "[블록체인 톺아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록체인"
    ],
    "subscribed" : true
  },
  {
    "title": "mbc",
    "imgurl": "http://img.naver.net/static/newsstand/up/2014/0715/214.gif",
    "newslist": [
      "Lorem ipsum dolor sit amet, consectetur adipisicin",
      "ipsum dolor sit amet, consectetur adipisicin",
      "dolor sit amet, consectetur adipisicin",
      "amet, consectetur adipisicin"
    ],
    "subscribed" : false
  },
  {
    "title": "kbs",
    "imgurl": "http://img.naver.net/static/newsstand/up/2014/0715/056.gif",
    "newslist": [
      "Lorem ipsum dolor sit amet, consectetur adipisicin",
      "ipsum dolor sit amet, consectetur adipisicin",
      "dolor sit amet, consectetur adipisicin",
      "amet, consectetur adipisicin"
    ],
    "subscribed" : true
  },
  {
    "title": "mbn",
    "imgurl": "http://img.naver.net/static/newsstand/up/2015/0424/nsd163650137.gif",
    "newslist": [
      "Lorem ipsum dolor sit amet, consectetur adipisicin",
      "ipsum dolor sit amet, consectetur adipisicin",
      "dolor sit amet, consectetur adipisicin",
      "amet, consectetur adipisicin"
    ],
    "subscribed" : false
  },
  {
    "title": "ytn",
    "imgurl": "http://img.naver.net/static/newsstand/up/2015/1112/nsd184430988.jpg",
    "newslist": [
      "Lorem ipsum dolor sit amet, consectetur adipisicin",
      "ipsum dolor sit amet, consectetur adipisicin",
      "dolor sit amet, consectetur adipisicin",
      "amet, consectetur adipisicin"
    ],
    "subscribed" : false
  }
]
