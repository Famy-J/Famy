var random=function(XorY){
    if(XorY==="x"){
      return Math.floor(Math.random(6)*27)
    }else{
    return Math.floor(Math.random(6)*30)
    }
    }

   module.exports={
       random
   }