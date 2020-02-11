import React from "react";
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),//加载当前目录下的index.js
  loading(){//没加载好时的显示
    return <div>正在加载</div>
  } 
});

export default ()=><LoadableComponent />
