const express = require("express");
const app = express();
const port = 3000;
const portS = process.env.PORT || 4001;
const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const { random } = require("./Game/game");
const game = require("./Game/game");
const dbF = require("./db/schema");
const { id } = require("./db/schema");

app.use(express.static(__dirname + "/client/dist"));

app.use(express.json());

mongoose.connect(
  "mongodb+srv://famy:2222@cluster0.ye5b9.gcp.mongodb.net/famy?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/position", (req, res) => {
  console.log(req.body);
  res.send();
});

app.post("/selectChar", (req, res) => {
  // Will Update the account skin with the selected skin from the signup0
  console.log(req.body);
  dbF.updateskin(req.body.id, req.body.currentskin, res);
});

app.post("/login", (req, res) => {
  //Deal with the login request to the server
  dbF.loginUser(req.body, res);
});

app.post("/register", (req, res) => {
  dbF.registerUser(req.body, res);
});
app.post("/feedbacks", async (res, req) => {
  const feedback = new dbF.Feedbacks({
    feedbacks: res.body.feedback,
  });
  await feedback
    .save()
    .then((res) => {
      console.log("feedback saved");
    })
    .catch((e) => {
      console.log(error);
    });
  res.end();
});

app.get("/ban", async (req, res) => {
  await dbF.Feedbacks.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.post("/tokens/users", async (res, req) => {
  // const update = { token: res.body.token };
  // const filter = {id: res.params.id};
  // await dbF.Users.findByIdAndUpdate(filter, update)
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((e) => {
  //    console.log(e);
  //   });
});
//////////////////////Socket Io

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  socket.on("id", (data) => {
    console.log("id", data);
    console.log("A new client is Online Id: " + data);
    randomSpawn(data);
    console.log(matrix);
  });

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 200);
  socket.on("disconnect", () => {
    console.log("Client disconnected ");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  socket.emit("Simulationdata", "test");
};

server.listen(portS, () => console.log(`Listening on port ${portS}`));

////////////////////////////   Game

var matrix = Array.from(Array(26), (x) => Array(29).fill(0));

console.table(matrix);

var randomSpawn = function (id, res) {
  var x = game.random("x");
  var y = game.random("y");
  if (matrix[x][y] === 0) {
    matrix[x][y] = id;
    res.send({ x: x, y: y });
  } else {
    randomSpawn(id);
  }
};
//currentpositionX
//currentpositionY
const mouve = function (PX, PY, Id, res, req) {
  var currentpositionX = (PX - 130) / 10;
  var currentpositionY = (PY - 100) / 10;
  if (matrix[currentpositionY][currentpositionX] !== undefined) {
    if (req.body.Face === "top") {
      // if(matrix[currentpositionY][currentpositionX]!=0){res.send({move:false})}
      if (matrix[currentpositionY][currentpositionX] === 0) {
        matrix[currentpositionY][currentpositionX] = Id;
        matrix[currentpositionY + 1][currentpositionX] = 0;
        //  res.send({move:true})
      }
    } else if (req.body.Face === "Down") {
      // if(matrix[currentpositionY][currentpositionX]!=0){res.send({move:false})}
      if (matrix[currentpositionY][currentpositionX] === 0) {
        matrix[currentpositionY][currentpositionX] = Id;
        matrix[currentpositionY - 1][currentpositionX] = 0;
        //  res.send({move:true})
      }
    } else if (req.body.Face === "left") {
      // if(matrix[currentpositionY][currentpositionX]!=0){res.send({move:false})}
      if (matrix[currentpositionY][currentpositionX] === 0) {
        matrix[currentpositionY][currentpositionX] = Id;
        matrix[currentpositionY][currentpositionX + 1] = 0;
        //  res.send({move:true})
      }
    } else if (req.body.Face === "right") {
      // if(matrix[currentpositionY][currentpositionX]!=0){res.send({move:false})}
      if (matrix[currentpositionY][currentpositionX] === 0) {
        matrix[currentpositionY][currentpositionX] = Id;
        matrix[currentpositionY][currentpositionX - 1] = 0;
        //  res.send({move:true})
      }
    }
    console.table(matrixs);
  } else {
    res.send("empty");
  }
};
//mouve()

// dbF.id.save((result,err)=>{ // if you want to set the accounts id to 0 uncomment this
//   console.log(result,err)
// })
