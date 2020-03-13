import React,{PureComponent} from "react";
import {withRouter} from "react-router-dom";
import {DetailWrapper,Header, Content} from "./style";
import {actionCreators} from "./store";
import {connect} from "react-redux";
class Detail extends PureComponent{
    render(){
        const {title,content}=this.props;
        return(
            <DetailWrapper>
                <Header>{title}</Header>
                <Content 
                dangerouslySetInnerHTML={{__html:content}} 
                />
                {/* 这样content中的内容不会被转译 */}
            </DetailWrapper>
        )
    }
    componentDidMount(){
        //在这其中发送ajax请求获取数据
        this.props.changeDetailData(this.props.match.params.id);

    }
}
const mapState = (state)=>({
    title:state.getIn(["detail","title"]),
    content:state.getIn(["detail","content"])
});
const mapDispatch=(dispatch)=>({
    changeDetailData(id){
        dispatch(actionCreators.getDetailData(id));
    }
});
export default connect(mapState,mapDispatch)(withRouter(Detail));

