import { combineReducers} from "redux-immutable";
import {reducer as headerReducer} from "../common/header/store";//会自动寻找store下的index.js
//as  es6起别名
import {reducer as homeReducer}  from "../pages/home/store";
import {reducer as detailReducer} from "../pages/detail/store";
import {reducer as loginReducer} from "../pages/login/store";

const reducer=combineReducers({
    header:headerReducer, //因此调用focus属性时必须是.header.focused
    home:homeReducer,
    detail:detailReducer,
    login:loginReducer
});
export default reducer;