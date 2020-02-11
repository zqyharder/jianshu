import axios from "axios";//用于ajax数据的获取
import * as constants from "./constants";
// import {fromJS} from "immutable";
const changeDetail=(title,content)=>({
    type:constants.CHANGE_DETAIL,
    title,
    content


});
export const getDetailData=(id)=>{
    return(dispatch)=>{
        axios.get("/api/detail.json?id="+id).then((res)=>{
            const result=res.data.data;
            dispatch(changeDetail(result.title,result.content));
            //两层data的原因：从json中读到的文件中，假数据在data里
        }).catch(()=>{
            console.log("error");
        })
    }
};