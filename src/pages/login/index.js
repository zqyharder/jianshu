import React,{PureComponent} from "react";
import {Redirect} from "react-router-dom";//重定向
import {connect} from "react-redux";
import {LoginWrapper,LoginBox, Input,Button} from "./style";
import {actionCreators}from "./store";

class Login extends PureComponent{
    render(){
        const {loginStatus}=this.props;
        if(! loginStatus){
            return(
                <LoginWrapper>
                <LoginBox>
                    <Input placeholder="账号" ref={(input)=>{this.account=input}} />
                    <Input placeholder="密码" type="password" ref={(input)=>{this.password=input}} />
                    <Button onClick={()=>{this.props.login(this.account.value,this.password.value)}}>登陆</Button>
                </LoginBox>
                </LoginWrapper>
            )    
        }else{
            return <Redirect to="/" />
        }
        
    }
}

const mapState=(state)=>({
    loginStatus:state.getIn(["login","login"])
})

const mapDespatch=(dispatch)=>({
    login(accountElem,passwordElem){
        dispatch(actionCreators.login(accountElem,passwordElem))
        
    }
})
export default connect(mapState,mapDespatch)(Login);

