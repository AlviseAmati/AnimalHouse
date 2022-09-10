// creazione server node e parte login con file json
const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const fs = require("fs")
const cors = require("cors")


const app = express()
const port = 8081

const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/public', express.static('public'))


const json = fs.readFileSync("user.json", "utf8");  
const data = JSON.parse(json); 

app.post('/login',(req,res) => { 
  const {user} = req.body; 
  console.log(req.body)
  console.log(user)

  if(user){
    for(var usr of data.users){
      if(usr.username == user.username && usr.password == user.password){
        res.json({ 
          username: usr.username,  
          type: usr.type
        })
        return
      }
    }
    res.sendStatus(401)
  }else{
    res.sendStatus(400)
  }
})

app.post('/register',(req,res) => { 
  const {user} = req.body; 
  console.log(req.body)
  console.log(user)

  if(user){
    for(var usr of data.users){
      if(usr.username == user.username || usr.email == user.email ){  
        res.sendStatus(409);
        return;
      }
    }
    let newUser = {username: user.username,password: user.password ,email: user.email, type: "normal",favouriteAnimals :["","",""],memoryGameBestResult:0,quizGameBestResult:0};
        data.users.push(newUser);
        console.log(newUser)
        fs.writeFileSync("user.json", JSON.stringify(data));
        res.json({ 
          username: usr.username,  
          type: usr.type
        })
        return
  }else{
    res.sendStatus(400)
  }
})

app.get('/loadEcommerce',(req,res) => {  

  const json = fs.readFileSync("ecommerce.json", "utf8");  
  const data = JSON.parse(json);
  if(data.items){
    res.json({ 
      items : data.items
    })
    return
  }else{
    res.sendStatus(400)
  }
})

app.get('/getUsers',(req,res) => {
  if(data.users){
    res.json({
      users: data.users
    })
  }else{
    res.sendStatus(400)
  }
})

app.post('/addScore',(req,res) => {
  const json = fs.readFileSync("leaderboard.json", "utf8");  
  const data = JSON.parse(json);
  console.log("Tentativo di aggiunta score")
  const {value} = req.body;
  console.log(value.score);
  console.log(value.name);


  if(value){
    var min = 9999;
    var pos;
    var add = true;
    if(value.type == "quiz"){
      if(data.quiz.length >= 10){
        for(var valuePos in data.quiz){
          if(min > data.quiz[valuePos].score){
            min =  data.quiz[valuePos].score;
            pos = valuePos;
          }
        }
        if(min < value.score){
          data.quiz.splice(pos,1);
        }else{
          add = false;
        }
      }if(add == true){
        let newValue = {name: value.name,score: value.score};
        data.quiz.push(newValue);
        fs.writeFileSync("leaderboard.json", JSON.stringify(data));
      }
    }else if(value.type == "memory"){
      if(data.memory.length >= 10){
        for(var valuePos in data.memory){
          if(min > data.memory[valuePos].score){
            min =  data.memory[valuePos].score;
            pos = valuePos;
          }
        }
        if(min < value.score){
          data.memory.splice(pos,1);
        }else{
          add = false;
        }
      }
      if(add == true){
        let newValue = {name: value.name,score: value.score};
        data.memory.push(newValue);
        fs.writeFileSync("leaderboard.json", JSON.stringify(data));
      }
    }
    res.sendStatus(200);
  }
})

app.get('/getLeaderboards',(req,res) => {

  console.log("Invio leaderboards")
  const json = fs.readFileSync("leaderboard.json", "utf8");  
  const data = JSON.parse(json);
  data.quiz.sort((a, b) => b.score - a.score ); 
  data.memory.sort((a, b) => b.score - a.score);

  if(data.quiz && data.memory){
    res.json({
      quiz: data.quiz,
      memory: data.memory
    })
  }else{
    res.sendStatus(400)
  }
})

app.post('/addItem',(req,res) => {
  const json = fs.readFileSync("ecommerce.json", "utf8");  
  const data = JSON.parse(json);
  console.log("Tentativo di aggiunta item")

  const {item} = req.body;
  if(item){
    for(var itm of data.items){
      if(item.name == itm.name){
        return;
      }
    }
    let newItem = {name: item.name,description: item.description ,price: item.price, img: item.image, category: item.category};
    data.items.push(newItem);
    fs.writeFileSync("ecommerce.json", JSON.stringify(data));
    res.sendStatus(200);
    console.log(newItem);
  }
})

app.delete('/removeItem',(req,res) => {
  const json = fs.readFileSync("ecommerce.json", "utf8");  
  const data = JSON.parse(json);
  console.log("Tentativo di rimozione item")
  const item = req.body;
  if(item){
    for(var itmPos in data.items){
      if(item.name == data.items[itmPos].name){
        data.items.splice(itmPos,1);
        break;
      }
    }
    fs.writeFileSync("ecommerce.json", JSON.stringify(data));
    res.sendStatus(200);
  }
})

app.get('/getPosts',(req,res) => {
  const json = fs.readFileSync("dashboard.json", "utf8");  
  const data = JSON.parse(json);
  console.log("get post")

  if(data.posts){
    res.json({
      posts: data.posts
    })
  }else{
    res.sendStatus(400)
  }

})

app.post('/addPost',(req,res) => {
  const json = fs.readFileSync("dashboard.json", "utf8");  
  const data = JSON.parse(json);
  console.log("Tentativo di aggiunta post")

  const {post} = req.body;
  if(post){
    let newPost = {username: post.username,text: post.text ,image: post.image, title: post.title};
    data.posts.push(newPost);
    fs.writeFileSync("dashboard.json", JSON.stringify(data));
    res.sendStatus(200);
  }
})

app.post('/addFavouriteAnimals',(req,res) => {
  const {user} = req.body;
  console.log(user);
  for(var usr of data.users){
    if(usr.username == user.username){  
        usr.favouriteAnimals= [user.a1,user.a2,user.a3];
        fs.writeFileSync("user.json", JSON.stringify(data));
        res.sendStatus(200);
    }
  }
})

app.post('/addBestMemoryResult',(req,res) => {
  const {user} = req.body;
  console.log(user);
  for(var usr of data.users){
    if(usr.username == user.username && usr.memoryGameBestResult < user.result){  
        usr.memoryGameBestResult= user.result
        fs.writeFileSync("user.json", JSON.stringify(data));
        res.sendStatus(200);
    }
  }
})

app.post('/addBestQuizResult',(req,res) => {
  const {user} = req.body;
  console.log(" aggiunta  quiz" + user);
  for(var usr of data.users){
    if(usr.username == user.username && usr.quizGameBestResult < user.result){  
        usr.quizGameBestResult= user.result
        fs.writeFileSync("user.json", JSON.stringify(data));
        res.sendStatus(200);
    }
  }
})

app.get('/getServices',(req,res) => {
  const json = fs.readFileSync("service.json", "utf8");  
  const data = JSON.parse(json);
  console.log("get services")

  if(data.services){
    res.json({
      services: data.services
    })
  }else{
    res.sendStatus(400)
  }
})

app.post('/addService',(req,res) => {
  const json = fs.readFileSync("service.json", "utf8");  
  const data = JSON.parse(json);
  console.log("Tentativo di aggiunta prenotazione")

  const {service} = req.body;
  if(service){
    let newService = {username: service.username,service: service.service ,place: service.place, date: service.date};
    data.services.push(newService);
    fs.writeFileSync("service.json", JSON.stringify(data));
    res.sendStatus(200);
  }
})


app.listen(port, () => { 
    console.log("Express in ascolto su porta " + port)
  })


  const usersFile = getUsersFile()
  const users = usersFile.users


  function getUsersFile(){
    console.log('getUserArray()');
    const json = JSON.parse(fs.readFileSync("user.json", "utf8"));
    return json
}

  function createUser(userData){
    return {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        favouriteAnimals :["","",""],
        memoryGameBestResult:0,
        quizGameBestResult:0
    }
}

function addUserToUsersFile(user){
    usersFile.users.push(user);
    updateUsersFile();
}

function deleteUserFromUsersFile(index){
    usersFile.users.splice(index, 1)
    updateUsersFile()
}

function updateUsersFile(){
    fs.writeFileSync("user.json", JSON.stringify(usersFile));
}

function checkUserExistance(newUser){
    console.log('checkUsernameExistance()');
    console.log('checkUsernameExistance() - newUser.username: ' + JSON.stringify(newUser.username))
    const data = getUsersArray();
    for(let user of data.users){
        console.log('checkUsernameExistance() - user: ' + JSON.stringify(user));
        if(user.username == newUser.username || user.email == newUser.email){
            console.log("username exists");
            return false;
        }
    }
    console.log("username doesn't exists");
    return data;
}

function createPassword(){
    return '1234';
}

function searchUser(userID){
    userData = {
        "email" : userID,
        "username" : userID
    }
    user = lookForUser(userData)
    return user
}

function lookForUser(userData){
    for(let user of users){
        console.log("lookForUser - userData: " + JSON.stringify(userData.username));
        console.log("lookForUser - userData: " + JSON.stringify(userData.email));
        if(user.username == userData.username || user.email == userData.email){
            console.log("lookForUser - the user exists");
            return user
        }
    }
    console.log("lookForUser - the user doesn't exists");
    return false
}

app.post('/addUser', (req, res) => {
    
    console.log("/addUser");
    console.log("/addUser - req.body: " + JSON.stringify(req.body));
    console.log("/addUser - req.body.username: " + JSON.stringify(req.body.username));
    if(! lookForUser(req.body)){
       console.log("/addUser - checked that user doesn't exists");
       const user = createUser(req.body)
       addUserToUsersFile(user);
       res.status(200).json(user);
       return
    } else {
        console.log('/addUser - 400');
        res.sendStatus(400);
    }
})

app.get('/getUser', (req, res) => {
    console.log('/getUser');
    console.log('/getUser - req.query.id: ' + JSON.stringify(req.query.id))
    
    user = searchUser(req.query.id);
    if(user){
        res.status(200).json(user);
        return
    }
    console.log('/getUser - 400');
    res.sendStatus(400);
})

app.patch('/modifyPassword', (req, res) =>{
    console.log("/modifyPassword");
    user = searchUser(req.body.id);
    if(user){
        console.log("NEW PASSWORD: " +req.body.password)
        console.log("NEW PASSWORD: " +JSON.stringify(req.body.password))
        user.password = req.body.password;
        updateUsersFile();
        console.log('/modifyPassword - 200');
        res.sendStatus(200);
        return
    }
    console.log("/modifyPassword - 400");
    res.sendStatus(400);
})

app.patch('/restorePassword', (req, res) =>{
    console.log("/restorePassword");
    user = searchUser(req.body.id);
    if(user){
        user.password = createPassword();
        updateUsersFile();
        console.log('/restorePassword - 200');
        res.sendStatus(200);
        return
    }
    console.log("/restorePassword - 400");
    res.sendStatus(400);
})



function lookForUserIndex(id){
    console.log("lookForUserIndex")
    for(let i = 0; i<users.length; i++){
        console.log("lookForUserIndex - users[].username: " + users[i].username)
        if(users[i].username == id || users[i].email == id){
            return i
        }
    }
    return false
}

app.delete('/deleteUser', (req,res) =>{
    console.log("/deleteUser")
    console.log('/getUser - req.query.id: ' + JSON.stringify(req.query.id))
    userIndex = lookForUserIndex(req.query.id)
    if(userIndex){
        deleteUserFromUsersFile(userIndex)
        res.sendStatus(200)
        return
    }
    res.sendStatus(400)
})
  