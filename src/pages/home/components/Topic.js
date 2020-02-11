import React,{PureComponent} from "react";
import {connect} from "react-redux";
import {TopicWritter,TopicItem} from "../style";
//单独为Topic组件建一个文件夹里面放index加样式style太复杂了，这里我们全放在外部home下的style
class Topic extends PureComponent{
    render() {
        const {list}=this.props;
        return (
            <TopicWritter>
            {
                list.map((item)=>{
                    return(
                        //用get是因为是immutable类型
                        <TopicItem key={item.get("id")}>{item.get("title")}</TopicItem>
                    )
                })
            }
                
            </TopicWritter>
        )
    }
}
const mapState =(state)=>({ 
    list:state.getIn(["home","topicList"])
});
export default connect(mapState,null)(Topic);
//null因为不用改变数据