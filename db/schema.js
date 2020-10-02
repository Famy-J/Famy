const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const saltRounds = 10;


// Create a user schema
const schemaUsers = new mongoose.Schema({
  name: String,
  password: String,
  AccountNumber: Number,
  email: String,
  tokens: Number,
  currentskin: Number,
  friends: [{ name: String, Messages: Array }],
  invitation: [{ name: String }],
  AccountStatus: { Banned: Boolean, Reason: String, Periode: String },
  Balance: Number
})

// Create a collection from the user schema
const Users = mongoose.model('Users', schemaUsers);

// Create avatar schema
const avatarSchema = mongoose.Schema({
  avatar: String,
  image: String,
  price: Number,
});

// Create a collection from avatar schema
const Avatar = mongoose.model("Avatar", avatarSchema);

// Create an account number schema
const schemaAccountNumber = new mongoose.Schema({ AccountNumber: Number })

// Create collection from account number schema
const AccountNumberdB = mongoose.model('AccountNumber', schemaAccountNumber);

// Create an instance from the account number collection
const id = new AccountNumberdB({ AccountNumber: 0 })

// Create a function to register users and assign an id for each user incremented by 1 for every registration
const registerUser = async function (data, res) {
  var AccountNumber;
  var user;
  await Users.findOne({ name: data.name }).then((result) => { user = result; });
  if (user !== null) {
    console.log("done");
    res.send({ Registred: true });
  } else {
    await AccountNumberdB.find().then((data) => { AccountNumber = data[0].AccountNumber; });

    await AccountNumberdB.updateOne({ AccountNumber: AccountNumber + 1 });
    var password = data.password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // Now we can store the password hash in the database with the other data.
      return new Users({
        email: data.email,
        name: data.name,
        password: hash,
        AccountNumber: AccountNumber,
        currentskin: "",
        friends: [],
        invitation: [],
        AccountStatus: { Banned: false, Reason: "", Periode: "" },
        Balance: 0
      }).save((err, doc) => {
        console.log(doc.AccountNumber)
        res.send({ id: doc.AccountNumber })
      });
    });
  }
};

// Create a function to login if the data set by the user correspond with the existed data in the database 
const loginUser = function (data, res) {
   Users.findOne({ name: data.name }).then((result) => {
    console.log(result)
    if (result === null) {
      res.send({ Registred: false });
    } else {
      // Compare the current user password with the existing hashed password stored in the database
      bcrypt.compare(data.password, result.password, (err, result) => {
        if (result === true) {
          res.send({
            Registred: true,
            data: { name: result.name, Id: result.AccountNumber, skin: result.currentskin },
          });
        } else {
          res.send({ Registred: false });
        }
      });
    }
  });
};

// Allow users to choose a character 
const updateskin = function (id, currentskin, res) {
  Users.update({ AccountNumber: id }, { currentskin }).then(result => {
    res.send("Selected")
  })
}

// Create a function to find the current balance of the online user 
const findBalance = async function (id, res) {
  await Users.findOne({ AccountNumber: id })
    .then((data) => {
      res.send(data.Balance)
      console.log(data.Balance)
    })
    .catch(err => {
      console.log(err);
    })
};

// Update user's balance after making a purchase
const updateBalance = function (id, balance, res) {
  Users.update({ AccountNumber: id }, { balance }).then(result => {
    res.send("Balance updated")
  });
};

const schemainvitationid=new mongoose.Schema({Iid:Number})// InvitationsId

const invitationid=mongoose.model('invitationid', schemainvitationid);

const Iid=new invitationid({Iid:0})

const invitation=async function(from,to,res){
  console.log(to)
  var fromN=''
  var Nid=null
  await Users.findOne({ AccountNumber: from }).then((result) => {fromN=result.name})
  await invitationid.findOne().then(data=>{
    Nid=data.Iid
  })
  await invitationid.update({},{Iid:Nid+1})
  await Users.update({AccountNumber:from},{$push:{invitation:{from:fromN,To:to,id:Nid}}}).
then(res.send())
}

const fetchinvitations=function(id,res){
  Users.findOne({AccountNumber:id}).then(data=>{
    res.send(data.invitation)
  })
  }

module.exports = {
  registerUser,
  loginUser,
  Users,
  id,
  updateskin,
  Avatar,
  updateBalance,
  findBalance,
  Iid,
  invitation,
  fetchinvitations
};