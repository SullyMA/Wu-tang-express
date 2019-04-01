const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://sully:demo@cluster0-jh7gt.mongodb.net/test?retryWrites=true";
const dbName = "sully";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
    res.render('index.ejs')
})
function clan(e){
  e.preventDefault()
  //grab values from all the checked radios and assign them to variables

  //create a class for name options template
  class WuTang {
    constructor(color, transit, values, role, trait){
      this.color = parseInt(color),
      this.transit = parseInt(transit),
      this.values = parseInt(values),
      this.role = parseInt(role),
      this.trait = parseInt(trait)
    }
  }
  //create objects that pass the variables containing the values from checked radioes
  let userTang = new WuTang(pickedColor, pickedTransit, pickedValues, pickedRole, pickedTrait);

  //make sum equal to zero, to then add object property values
  let sum = 0;
  //make object values into a string and add each value to sum
  Object.values(userTang).forEach(num => {
    sum = sum+num;
  })
  //return name of checkResult comparison to the DOM
  document.querySelector('h2').textContent = checkResult(sum);
}

//make a function to compare values and return a wutang name to the DOM
  function checkResult(sum){
    console.log("hello", sum)

    // if (5 === sum){
    //   return 'RZA-recta'
    // }else if(6 === sum/
    //   return 'StinkyLeg'
    // }else if(7 === sum){
    //   return 'Wavy Baller'
    // }else if(8 === sum){
    //   return 'Ghost Killah'
    // }else if(9 === sum){
    //   return 'Blazer-Z'
    // }else if(10 === sum){
    //   return 'Reak-w-me'
    // }else{
    //   return 'no name for this'
    // }
  }

// const names = ["name1", "name2"];
app.post('/', (req, res) => {
  let pickedColor = req.body.color
  let pickedTransit = req.body.transport
  let pickedValues = req.body.valuables
  let pickedRole = req.body.role
  let pickedTrait = req.body.trait
  //parseInt strings into integers
  let sum = parseInt(pickedColor)+ parseInt(pickedTransit)+ parseInt(pickedValues) + parseInt(pickedRole) + parseInt(pickedTrait)
  // let name=checkResult(sum)
  db.collection('names').findOne({"sum":sum},function(err, result) {
    if (err) return console.log(err)
    console.log(result.name)
    res.render('index.ejs', {name:result.name})
  })
    console.log("sum is", sum)
      //sending the variable name to index.ejs

})
