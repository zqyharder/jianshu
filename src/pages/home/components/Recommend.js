import React,{PureComponent} from "react";
import {RecommendWrapper,RecommendItem} from "../style";
import {connect} from "react-redux";
class Recommend extends PureComponent{
    render() {
        const {list}=this.props;
        return (
            <RecommendWrapper>
            {
                list.map((item)=>{
                    return(
                <RecommendItem imgUrl={item.get("url")} key={item.get("id")}/>
                //imgTrl为传入的参数，在style.js里可以用background:url(${(props)=>props.imgUrl} )获取
                    )
                })
            }
            </RecommendWrapper>
        )
    }
}
const mapState=(state)=>({
    list:state.getIn(["home","recommendList"])
})
export default connect(mapState,null)(Recommend);