import React from "react"
import axios from "axios"
class Characters extends React.Component {
    constructor(props){
        super(props)
        this.state={
          skin:undefined,
          face:[{D0:`./chars/${this.props.skin}/FD/fd0.png`,D1:`./chars/${this.props.skin}/FD/fd1.png`,D2:`./chars/${this.props.skin}/FD/fd2.png`,
          R0:`./chars/${this.props.skin}/FR/fr0.png`,R1:`./chars/${this.props.skin}/FR/fr1.png`,R2:`./chars/${this.props.skin}/FR/fr2.png`,L0:`./chars/${this.props.skin}/FL/fl0.png`,L1:`./chars/${this.props.skin}/FL/fl1.png`,
          L2:`./chars/${this.props.skin}/FL/fl2.png`,u0:`./chars/${this.props.skin}/FU/fu0.png`,u1:`./chars/${this.props.skin}/FU/fu1.png`,u2:`./chars/${this.props.skin}/FU/fu2.png`}],
          currentP:`./chars/${this.props.skin}/FD/fd0.png`,
          positionX:230,
          positionY:490,
          Faceing:undefined,
          FD:0,
          FU:0,
          FL:0,
          FR:0,
        }
        this.sendinvitation=this.sendinvitation.bind(this)
    }
 sendinvitation(){
   console.log("workcalled")
  axios({
    url: '/Sinvitation',
    method: 'post',
    data:{from:this.props.Mid,to:this.state.id}
  })
 }

    static getDerivedStateFromProps(nextprops){
      const  XYFS=function(string){
        var result=[]
       result.push(string.split("-")[0]) 
       result.push(string.split("-")[1].split("=")[0])
       result.push(string.split("-")[1].split("=")[1].split("?")[0])
       result.push(string.split("-")[1].split("=")[1].split("?")[1]*1)
       return result
      }
      var id=nextprops.id*1
      return {
        positionX:XYFS(nextprops.position)[0],
        positionY:XYFS(nextprops.position)[1],
        Faceing:XYFS(nextprops.position)[2],
        skin:XYFS(nextprops.position)[3],
        id:id
      }
    }
    render() {
      return <img src={this.state.Faceing} onKeyDown={this.mouveView} tabIndex="0" style={{"top":this.state.positionX+"px","left":this.state.positionY+"px"}} className="main" onClick={this.sendinvitation}/>
    }
  }

  export default Characters