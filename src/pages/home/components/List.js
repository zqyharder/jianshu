import React,{PureComponent} from "react";
import {ListItem,ListInfo,LoadMore} from "../style";
import {connect} from "react-redux";
import {actionCreators} from "../store";
import {Link} from "react-router-dom";//避免多次HTML请求，单页路由加载
class List extends PureComponent{
    render() {
        const {list,getMoreList,page}=this.props;
        return (
            <div>
            {
                list.map((item,index) =>{
                   return(
                    <Link key={index} to={"/detail/" + item.get("id")}>
                    {/* 点击数据进入详情页的时候，把这条数据的id带给详情页 */}
                    <ListItem >
                        <img className="pic" alt="" src={item.get("imgUrl")}></img>
                        <ListInfo>
                            <h3 className="title">{item.get("title")}</h3>
                            <p className="desc"> {item.get("desc")}</p>
                        </ListInfo>
                    </ListItem>
                    </Link>
                    
                   )     
                })
            }
            <LoadMore onClick={()=>getMoreList(page)}>更多内容</LoadMore>
            </div>
        )
    }
}
const mapState =(state)=>({
    list:state.getIn(["home","articleList"]),
    page:state.getIn(["home","articlePage"])
})
const mapDispatch=(dispatch)=>({
    getMoreList(page){
        dispatch(actionCreators.getMoreList(page));
    }
})
export default connect(mapState,mapDispatch)(List);