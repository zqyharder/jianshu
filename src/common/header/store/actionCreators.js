import * as constants from "./constants";
import {fromJS} from "immutable";
import axios from "axios";

const changeList=(data)=>({
    type:constants.CHANGE_LIST,
    data:fromJS(data),
    totalPage:Math.ceil(data.length/10)
});

export const searchFocus =()=>({
    type:constants.SEARCH_FOCUS
});

export const searchBlur =()=>({
    type:constants.SEARCH_BLUR
});
export const mouseEnter =()=>({
    type:constants.MOUSE_ENTER
});
export const mouseLeave =()=>({
    type:constants.MOUSE_LEAVE
});
export const changePage =(page)=>({
    type:constants.CHANGE_PAGE,
    page
});

//返回函数则必须用redux-thunk
export const getList=()=>{
    return(dispatch)=>{
        axios.get("/api/headerList.json").then((res)=>{
            const data=res.data;
            dispatch(changeList(data.data));
            //changeList用于将axios获取的数据写入state中的list
            //两层data的原因：从json中读到的文件中，有success和data，假数据在data里
        }).catch(()=>{
            console.log("error");
        })
    }
}//从后端接收数据，成功则为then，失败则为catch