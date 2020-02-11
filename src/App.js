//路由页面
import React, {Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from "react-router-dom";
import Header from "./common/header";
import Home from "./pages/home";
import Detail from "./pages/detail/loadable.js";
import Login from "./pages/login";
import Write from "./pages/write";
import store from "./store";
import {GlobalStyled} from "./style";

class App extends Component{
  render(){
    return(
      <Provider store={store}>
          <BrowserRouter>
            <div>
            <GlobalStyled />
              <Header/>
            {/* exact表示完全和路径相同则显示，不然的detail路径都显示 */}
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/write" exact component={Write}></Route>

              <Route path="/detail/:id" exact component={Detail}></Route>
              {/* 访问detail路径害传递一个参数，参数的名字叫做id */}
            </div>
          </BrowserRouter>
      </Provider>
    
    );
  }
}


export default App;
