##2020/2/5
简书项目整理：

1、创建项目：create-react-app-jianshu

2、使用模块或功能：

    styled-components
        简介：
            第三方模块，进行各组件样式管理
        安装：
            yarn add styled-components
        引入：
            import styled from "styled-components"
        全局样式：
            import {createGlobalStyle} from "styled-components";export const GlobalStyled=createGlobalStyle``;使用为import {GlobalStyled} from "./style";
        <GLobalStyled />

    iconfont：
        网址：
            iconfont.cn
        可用文件选择:
            svg,ttf,woff,eot,iconfont.css,(demounicode.html为使用文档)
        使用：放在src/statics/iconfont
            使用时<span className="iconfont">&#xe636;</span>
        文件处理：
            iconfont.css:重命名为js；调整格式，在每个文件的引入位置加相对路径./;小的class可以删除；使用全局样式

    react-transition-group：
        简介：动画
        安装：yarn add react-transition-group
        引入：
            import {CSSTransition} from "react-transition-group";
        使用：
            <CSSTransition
            in={focused}
            timeout={200}//动画时长
            classNames="slide"
            >
        挂载样式：
            slide-enter{transition:all .2s ease-out;}//入场第一个时刻
            slide-enter-active{width:240px;}//执行时
            slide-exit{transition:all .2s ease-out;}//退出
            slide-exit-active{width:160px；}//退出后
    
    immutable.js
        简介：
            Facebook开发的第三方库，将数据变成不可改的immutable对象，使得原始state不能进行修改
        安装：
            yarn add immutable
        引用：
            import {fromJS} from "immutable"
            //fromJS方法使得JS对象转换为immutable对象
        使用：
            修改reducer的数据：
                数据存储加fromJS(JS对象)
                数据更改用state.set或merge
            使用时要state.get('')或getIn(['',''])而不是直接.
    redux—immutable   
        简介：
            其中的方法生成的内容都是immutable内容，如此统一项目中所有数据都是immutable内容
        安装：
            yarn add redux-immutable
        使用：
            根store文件下的reducer，import { combineReducers} from "redux-immutable";这样combineReducer生成的reducer里是immutable数据内容

3、初始文件功能
    index.js:项目入口
        引入：
            App.js,
            style.js
            import ReactDOM from 'react-dom';
            import React,{Component} from "react";
        内容：渲染，ReactDOM.render(<App />, document.getElementById('root'));   
    App.js：根组件
        引入：
            import React,{Component} from "react";
            Header 组件
        内容：组件定义
        导出：
            export default App;

    style.js：全局样式，而不是css，采用reset.css的内容，以统一不同浏览器运行效果
4、header：在文件夹common下，因为是所有页面共用的
    index.js:组件入口
        引入：
            import React,{Component} from "react";
            各子组件
        内容：
            组件定义，使用各子组件   
        导出：export default Header
    style.js:组件样式
        引入：
            import styled from "styled-components";
        导出：
            各子组件： export const SearchInfoList=styled.div``;建带有样式的子组件供index使用)
             <!-- 样式为图片时，不能直接使用地址；应该先import logoPic from "文件地址"；这样webpack会自动找到文件夹中的图片打包到logoPic文件；使用时url(${logoPic});为多行文本嵌变量-->
5.react—redux进行数据管理：
    安装：
        yarn add redux
        yarn add react-redux
    使用：
        index.js：项目总入口
            引入：
                import React from 'react';
                import ReactDOM from 'react-dom';
                import './style.js';
                import App from './App';
                import "./statics/iconfont/iconfont";
            内容：
                ReactDOM.render(<App />, document.getElementById('root'));

        App.js:
            引入：
                import store from "./store";//与总store创立连接
                import {Provider} from "react-redux";
            使用：
                用<Provider store={store}>作为根组件的最外层,表示provider里面的内容都可以使用store；Provider里的内容包含在一个div里保证provider的内容都在一个标签里
            导出：
                export default App;

        store/index.js:创建store实例
            //项目总store入口
            引入：
                import {createStore，compose} from "redux";
                import reducer from "./reducer";//由reducer的数据来创建store
            内容：
                //redux开发者工具，compose是包装函数，里面的函数会依次执行
                
                const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

                const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
            导出：
                export default store;

        store/reducer.js:整合所有子组件的reducer
            引入：
                import { combineReducers} from "redux-immutable";
                import {reducer as 子组件Reducer名} from "子组件文件夹位置/store";
            内容：//存储拆解，不同的模块使用自己的store最终整合到一起
                const reducer=combineReducers({
                子组件名:子组件reducer名 });
            导出：
                export default reducer;
     
        内层组件：
            index.js:
                //子组件入口
                引入：
                    import React,{PureComponent} from "react";
                    import {子子组件名} from "./style";
                    import {actionCreators} from "./store";//引入action
                    import {connect} from 'react-redux';//与export一起使得该组件与store建立连接
                内容：
                    组件定义：class 组件名

                    store数据获取：
                        //从当前目录store文件夹下的reducer获取
                        const mapState =(state)=>{
                            return{
                                数据名：state.getIn(["store名","数据名"])
                                }     
                        //这样在组件中使用时用this.props.数据名而不是state
                            }
                    向store更改数据：
                        const mapDespatch =(dispatch)=>{
                            dispatch(actionCreators.函数名())
                        }
                        //在组件中使用方法采用this.props.方法名
                导出：
                    export default connect(mapState,mapDespatch)(组件名));
            style.js:
                引入：
                    import styled from "styled-components";
                导出：
                    各子组件： export const SearchInfoList=styled.div``;建带有样式的子组件供index使用)

            store文件夹：
                index.js://相当于header/store部分的出口文件，则根store想引用这里的reducer只用引用到store，会自动的找到下面的index，恰好index导出了reducer
                    引入：
                        import reducer from './reducer';
                        import * as actionCreators from "./actionCreators";
                        import * as constants from "./constants";
                    导出：//全部导出使得各文件使用时路径简单
                        export {reducer,actionCreators,constants}
                reducer.js:存放数组和根据action的类型执行更改数据的操作
                    引入：
                        import * as constants from "./constants";
                    内容：保存数据
                        const defaultState=fromJS({
                        数据名：值
                        );
                    导出：修改数据
                        export default (state=defaultState,action)=>{
                            switch(action.type){
                                case 动作名:
                                    return state.set("数据名",action.value);
                                default:
                                    return state;
                            }
                        }   
                        若批量修改：
                            const 函数名=(state,action)=>{
                                return state.merge({
                                    数据名：action.数据
                                })
                            }
                            return 函数名(state,action);


    
                constants.js:
                    导出：
                        export const 常量名=“组件名/常量名”；//之所以要加组件名是防止命名冲突

                actionCreators.js:
                    引入：
                        import * as constants from "./constants";
                        
                    内容：返回对象
                        export const  =(数据)=>({
                            type:constants.常量名,
                            数据（可无
                        });
    总结：
        所有数据储存在store/reducer文件里，由组件index用connect连接。

        组件index使用数据则mapState()，会自动从reducer中获取数据，

        组件index更改数据则mapDiapatch派发action，采用actionCreators里的方法，

        actionCreators里包含方法类型和传入数据,
        (方法类型引入constants里的常量），

        reducer的export default进行数据修改。state.set单数据修改；state.merge批量修改
        


        搜索框动画：
        1）静态：设定一个状态作为聚焦判断，对标签添加一个class，当聚焦时增加一个class，设置其对应的样式
        2）绑定事件：onFocus,onBlur
        3) 动画：CSSTransition
5、ajax获取数据
    安装：
        yarn add redux-thunk
        //用于使得actionCreators可以返回函数的中间件
        yarn add axios//用于异步请求
    配置：
        （创建store的时候被使用）
        根store/index：
            import redux from "redux-thunk"；

            import {applyMiddleware} from "react";

            const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
        假数据：(后端提供的数据)
            创建：
                public/api/组件接口名.json
            组成：
                {
                    "success":"true,
                    "data":
                }
            上线前删除
    使用：
        打通逻辑：(即获取数据并存入store)
            组件index:派发action，
                dispatch(actionCreators.函数名())
            actionCreators.js:返回函数而不是对象
                import axios from "axios"

                const 操作函数名 =(data))=>({
                    type:constants.常量名，
                    data：from(data)
                    //由于在redcer中数据全是immutable对象，因此要统一，api传入的数据也应转换为immutable类型
                })

                export const 函数名=()=>{
                    return(dispatch)=>{
                        axios.get("/api/组件接口名.json").then((res)=>{
                        const data=res.data;
                        dispatch(操作函数名(data.data));
                        //派发函数对reducer进行更改
                        //两层data的原因：从json中读到的文件中，假数据在data里
                    }).catch(()=>{
                        console.log("error");
                    })//请求接口数据成功则执行then否则catch
                }
            reducer.js
                完善相应action的操作
        展示数据：
            组件index：
                mapstate中获取数据，
                //对数据中的内容进行循环展示
                数据名.map((item)=>{
                    return <div key={item}>{item}</div>
                })
    数据分页显示：
        数据处理：
            store/reducer.js
                数据存储：
                    增加page：1（当前显示页）与totalPage：1（所有数据一共分多少页显示）
                数据改变：state.set("totalPage",action.totalPage)
            acitonCreators.js
                在ajax获取数据的函数返回数据里增加totalPage：data.length/单页面显示项数,Math.ceil()取整；（即获取数据准备去改变数据存储时也会改变页码
        页面显示：
            组件index：
                mapSet：获取page ,totalPage
                组件定义：    
                    const  pageList=[];
                    const newList=list.toJS();//这样可以使用数组[i]
                    if(newList.length){//刚进入页面时就会被渲染，这时初始数据为空，因此获取到的key值全是undefined而不唯一，所以要等数据获得后再做分页的展示
                        for(let i=(page-1)*10;i<page*10&&i<newList.length;i++){
                            pageList.push(
                                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                            )
                        }
                    }
                    {pageList}//显示
        切换分页：
            组件index：
                绑定事件：某模块onClick={()=>函数名(page,totalPage)}//箭头函数的方法可以传参数
                mapDispath：
                函数名(page,totalPage){
                    if(page<totalPage){
                        dispatch(actionCreators.changePage(page+1));
                    }else{
                        dispatch(actionCreators.changePage(1));
            }
                
                }
            actionCreators.js:派发action类型
            reducer：更改数据state.set
        规避不必要的ajax请求：
            （即只获取一次请求而不是每次点击都请求
            组件index.js:
                mapDispatch
                    函数引入参数，当list.size>0时不执行ajax请求的函数
6、react路由
    根据URL的不同显示不同内容改变
    安装：
        yarn add react-router-dom

    根组件App.js:
        引入：
            import {BrowserRouter,Route} from "react-router-dom";
            import 子组件名 from "./pages/子组件文件夹"
        使用：
            在class里用<BrowserRouter>包裹（BrowserRouter里只能有一个children，所以里面的内容都包括在一个div里）
            <Router path='/路径' exact render={()=><div></div>}>
            //表示当url为path时render要渲染的内容；‘/’表示根路径；exact表示路径必须完全一样；若要渲染内容为组件把render改为component={子组件名}

8、动态路由：
    多个页面间的数据传递，首页跳转到详情页，详情页根据id请求显示不同内容
    Link标签：
        点击数据进入详情页(detail页面))时将这条数据的id带给详情页
        <Link key={index} to={"/detail/" + item.get("id")}>
    App.js：
        只有路径完全匹配时才进入detail组件，修改path为”/detail/：id“，表示访问detail路径还传递一个参数，参数的名字叫做id
    detail下的index.js：详情页的数据匹配
        componentDidMount(){
            //在这其中发送ajax请求获取数据
            this.props.函数名(this.props.match.params.id);
            //将id参数传递进来
        }
        mapDispatch中相应的函数填加传入参数，进而actionCreator里的函数，都将id传入进来；
        请求接口的时候将id传入后端
            axios.get("/api/detail.json?id="+id).then((res)=>{
            //这样根据不同的内容请求不同的接口
9、异步组件
    react-loadable：将组件变成异步加载的组件
        安装：yarn add react-loadable
        使用：
            组件文件夹/loadable.js://复制文档
                import React from "react";//使得可以使用JSX语法
                import Loadable from 'react-loadable';

                const LoadableComponent = Loadable({
                loader: () => import('./'),//加载当前目录下的index.js
                loading(){//没加载好时的显示
                    return <div>正在加载</div>
                } 
                });

                export default ()=><LoadableComponent />
            根组件App.js：
                import Detail from "./pages/detail/loadable.js";//不再是直接引入detail而是loadable
    withRouter路由：
        组件index.js:
            import {withRouter} from "react-router-dom";
            export default connect(mapState,mapDespatch)(withRouter(Detail));//让Detail可以获得router里面的所有参数和内容

10、小知识点：
    更新旋转动画：
        使用react或css里的transition过渡效果，每次点击则更新transform对应的rotate值即可；ref使得获取react渲染的真实dom结点，以此改变他上面的css样式
    返回顶部功能：
        绑定onClick事件函数
        函数(){
            window.scrollTo(0,0);
        }
        实现拖到后面才显示返回顶部这个按钮
            store添加showScroll数据
            index.js
                this.props.showScroll ? 显示返会顶部:null;

                componentDidMount(){//组件加载完成时调用；绑定事件bindEvent
                    this.bindEvent()
                }
                //组件被销毁执行,这样组件被去除时绑定的事件也要被销毁
                componentWillUnmount(){
                    window.removeEventListener("scroll",this.props.changeScrollTopShow)

                }

                bindEvent(){
                    window.removeEventListener("scroll",this.props.changeScrollTopShow) //当滚动时要进行的操作 
                }

                mapDipatch:
                    changeScrollTopShow(){
                        if(document.documentElement.scrollTop>100){//滚动距离大于100
                            dispatch(actionCreators.topShow(true))//使得数据showSCroll为true即显示返回顶部
                        }else{
                            dispatch(actionCreators.topShow(false))

                        }
                    }
    如果要用PureComponent则必须用immutable去管理数据否则会有坑

11、上线：
    删除假数据api，
    控制台在项目目录下执行 npm run build，进行打包，将build发给后端的同学


