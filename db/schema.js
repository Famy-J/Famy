const mongoose = require("mongoose");

const schemaUsers = new mongoose.Schema({ 
    name: String,
    password:String,
    AccountNumber:Number,
    email:String,
    tokens:Number,
    currentskin:Number,
    friends:[{name:String,Messages:Array}],
    invitation:[{from:String,To:String,id:Number}],
    AccountStatus:{Banned:Boolean,Reason:String,Periode:String},
    Balance:Number
  })

  const Users= mongoose.model('Users', schemaUsers);

  const schemaAccountNumber=new mongoose.Schema({AccountNumber:Number})

const AccountNumberdB=mongoose.model('AccountNumber', schemaAccountNumber);

const id=new AccountNumberdB({AccountNumber:0})

const registerUser = async function (data, res) {
  var AccountNumber;
  var user;
  await Users.findOne({ name: data.name }).then((result) => {user = result;});
  if (user !== null) {
    console.log("done");
    res.send({ Registred: true });
  }else {
    await AccountNumberdB.find().then((data) => {AccountNumber = data[0].AccountNumber;});

    await AccountNumberdB.updateOne({ AccountNumber: AccountNumber + 1 });

    return new Users({
        email:data.email,
      name: data.name,
      password: data.password,
      AccountNumber: AccountNumber,
      currentskin:"",
      friends:[],
      invitation:[],
      AccountStatus:{Banned:false,Reason:"",Periode:""},
      Balance:0
    }).save((err, doc) => {
      console.log(doc.AccountNumber)
      res.send({id:doc.AccountNumber})
    });
  }
};

const loginUser = async function (data, res) {
  await Users.findOne({ name: data.name }).then((result) => {
    console.log(result)
    if (result === null) {
      res.send({ Registred: false});
    } else {
      if (result.password === data.password) {
        res.send({
          Registred: true,
          data: { name: result.name, Id: result.AccountNumber,skin:result.currentskin},
        });
      } else {
        res.send({ Registred: false });
      }
    }
  });
};

const updateskin=function(id,currentskin,res){
  Users.update({AccountNumber:id},{currentskin}).then(result=>{res.send("Selected")})
}

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
  Iid,
  invitation,
  fetchinvitations
};

