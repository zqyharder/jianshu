import React,{PureComponent} from "react";
import {WriterWrapper,WriterItem} from "../style";
class Writer extends PureComponent{
    render() {
        return (
            <WriterWrapper>
                <WriterItem>
                    <img className="" src="" alt=""></img>
                    <h3>title</h3>
                    <p>desc</p>

                </WriterItem>
            </WriterWrapper>
        )
    }
}
export default Writer;