//header组件整体的内容
import React,{Component} from "react";
import {connect} from 'react-redux';
import {CSSTransition} from "react-transition-group";
import {GlobalIcon} from '../../statics/iconfont/iconfont';
import {actionCreators} from "./store";
import {Link} from "react-router-dom";
import {actionCreators as loginActionCreators} from "../../pages/login/store"
import{
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
}from "./style"


//UI组件Header负责渲染页面上的样式
//无状态组件可以直接写成Header等于一个函数
class Header extends Component{
    getListArea(){
        const{focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage}=this.props;//结构赋值：=this.props.focused
        const newList=list.toJS();
        const pageList=[];
        if(newList.length){
            //判断的原因：刚进入页面时还未通过聚焦搜索框获取List值,会使得下面的key值都为undefined
            for(let i=(page-1)*10;i<page*10&&i<newList.length;i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        
        if(focused || mouseIn){
            //focused：输入框聚焦显示否则反之；
            //mouseIn：鼠标移入热门框显示否则反之，这样使得点击换一批时输入框失焦也能显示热门框
            return(
                <SearchInfo 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                
                    <SearchInfoTitle>
                        热门搜索  
                        <SearchInfoSwitch 
                        onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}
                        >
                            <span ref={(icon)=>{this.spinIcon=icon}} className="iconfont spin">&#xe68f;</span>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                 </SearchInfo>
            )
        }else {
            return null;
        }
    }

    render(){
        const {focused,handleInputFocus,handleInputBlur,list,login,logout}=this.props;
        return (
            <HeaderWrapper>
                <GlobalIcon />
                <Link to="/">
                <Logo />
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left"> 下载App</NavItem>
                    {
                        login ? 
                        <NavItem onClick={logout} className="right">退出</NavItem> :
                        <Link to="/login"><NavItem className="right">登陆</NavItem> </Link>
                        
                    }
                    <NavItem className="right">
                    <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? "focused":""}
                                onFocus={()=>handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            ></NavSearch>
                        </CSSTransition>
                        
                        <span className={focused ? "focused iconfont zoom":"iconfont zoom"}>
                        &#xe617;
                        </span>
                        {this.getListArea()}
                    </SearchWrapper>
                    
                </Nav>
                <Addition>
                    <Link to="/write">
                        <Button className="writing">
                        <span className="iconfont">&#xe615;</span>
                        写文章</Button>
                        <Button className="reg">注册</Button>
                        
                    </Link>
                    
                </Addition>
            </HeaderWrapper>
            );
    }
}
    

   //容器组件：connect方法返回的组件，负责处理数据和逻辑 

// store传给组件的数据:store里的数据映射到组件的props
const mapStateToProps=(state) =>{
    return{
        focused:state.get("header").get("focused"),
        list:state.getIn(["header","list"]),//与两个get连写等价
        page:state.getIn(["header","page"]),
        totalPage:state.getIn(["header","totalPage"]),
        mouseIn:state.getIn(["header","mouseIn"]),
        login:state.getIn(["login","login"])
    }
}
// 组件传给store
const mapDispathToProps=(dispatch) =>{
    return{
        handleInputFocus(list){
            (list.size===0)&&dispatch(actionCreators.getList());//返回函数redux
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page,totalPage,spin){
            let originAngle=spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle=parseInt(originAngle,10);
            }else{
                originAngle=0;
            }
            spin.style.transform="rotate("+(originAngle+360)+"deg)";
            console.log(originAngle);
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())
        }
        
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Header);