import React from "react"
import axios from "axios"
class Maincharacter extends React.Component {
    constructor(props){
        super(props)
        this.state={
          character:0,
          Id:0,
          name:"",
         FD:0,
         FU:0,
         FL:0,
         FR:0,
         face:[{D0:`./chars/${this.props.skin}/FD/fd0.png`,D1:`./chars/${this.props.skin}/FD/fd1.png`,D2:`./chars/${this.props.skin}/FD/fd2.png`,
         R0:`./chars/${this.props.skin}/FR/fr0.png`,R1:`./chars/${this.props.skin}/FR/fr1.png`,R2:`./chars/${this.props.skin}/FR/fr2.png`,L0:`./chars/${this.props.skin}/FL/fl0.png`,L1:`./chars/${this.props.skin}/FL/fl1.png`,
         L2:`./chars/${this.props.skin}/FL/fl2.png`,u0:`./chars/${this.props.skin}/FU/fu0.png`,u1:`./chars/${this.props.skin}/FU/fu1.png`,u2:`./chars/${this.props.skin}/FU/fu2.png`}],
         currentP:`./chars/${this.props.skin}/FD/fd0.png`,
         positionX:230,
         positionY:490,
        }
        this.mouveView=this.mouveView.bind(this)
    }
   componentDidMount(){
      console.log("called")
      setTimeout(()=>{this.setState({positionX:(this.props.MainP.x*10)+130,positionY:(this.props.MainP.y*10)+100,Id:this.props.id,character:this.props.skin})},1500)
 
    }
    mouveView (e){
      console.log("work")
      var charN=this.state.character
      var x=e.keyCode
      var PX=e.target
      if(x===87){//top
        if(this.state.positionX<=390&&this.state.positionX>130){
        

          axios({
            method: 'post',
            url: '/position',
            data: {
            positionX:this.state.positionX-10,positionY:this.state.positionY,name:this.state.name,id:this.state.Id,Face:'top',skin:this.props.skin
            }
          }).then(data=>{
            if(data.data.move){
              this.setState({FU:this.state.FU+1})
              if(this.state.FU%3===0){
                this.setState({currentP:this.state.face[0]["u2"]})
              }else if(this.state.FU%2===0){
                this.setState({currentP:this.state.face[0]["u1"]})
              }else{this.setState({currentP:this.state.face[0]["u0"]})}
                this.setState({positionX:this.state.positionX-10})
            }
          })
        }

      }if(x===65){//left
        if(this.state.positionY<=390&&this.state.positionY>100){
          this.setState({FL:this.state.FL+1})
          if(this.state.FL%3===0){
            this.setState({currentP:this.state.face[0]["L2"]})
          }else if(this.state.FL%2===0){
            this.setState({currentP:this.state.face[0]["L1"]})
          }else{this.setState({currentP:this.state.face[0]["L0"]})}
            this.setState({positionY:this.state.positionY-10})
            axios({
              method: 'post',
              url: '/position',
              data: {
              positionX:this.state.positionX,positionY:this.state.positionY-10,name:this.state.name,id:this.state.Id,Face:'left',skin:this.props.skin
              }
            }).then(data=>{
              if(data.data.move){
                

              }
            })
          }
      }if(x===68){//right
        if(this.state.positionY<390&&this.state.positionY>=0){
          this.setState({FR:this.state.FR+1})
              if(this.state.FR%3===0){
                this.setState({currentP:this.state.face[0]["R2"]})
              }else if(this.state.FR%2===0){
                this.setState({currentP:this.state.face[0]["R1"]})
              }else{this.setState({currentP:this.state.face[0]["R0"]})}
                this.setState({positionY:this.state.positionY+10})
          axios({
            method: 'post',
            url: '/position',
            data: {
            positionX:this.state.positionX,positionY:this.state.positionY+10,name:this.state.name,id:this.state.Id,Face:'right',skin:this.props.skin
            }
          }).then(data=>{
            if(data.data.move){
            
              
            }
          })
        }
          
      }if(x===83){//down
        if(this.state.positionX>=130&&this.state.positionX<390){
          this.setState({FD:this.state.FD+1})
          if(this.state.FD%3===0){
            this.setState({currentP:this.state.face[0]["D2"]})
          }else if(this.state.FD%2===0){
            this.setState({currentP:this.state.face[0]["D1"]})
          }else{this.setState({currentP:this.state.face[0]["D0"]})}
            this.setState({positionX:this.state.positionX+10})
            
          axios({
            method: 'post',
            url: '/position',
            data: {
            positionX:this.state.positionX+10,positionY:this.state.positionY,name:this.state.name,id:this.state.Id,Face:'Down',skin:this.props.skin
            }
          }).then(data=>{
            if(data.data.move){
              
            
            }
          })
        }
      }
    }

    render() {
      return <div>
        <img src={this.state.currentP} onKeyDown={this.mouveView} tabIndex="0" style={{"top":this.state.positionX+"px","left":this.state.positionY+"px"}} id="main"/>
        </div>
      
    }
  }

  export default Maincharacter