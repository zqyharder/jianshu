import styled from "styled-components";
export const HomeWrapper = styled.div`
    overflow:hidden;
    width:960px;
    margin:0 auto;
`;
export const HomeLeft = styled.div`
    width:625px;
    margin-left:15px;
    padding-top:30px;
    width:625px;
    float:left;
    .banner-img{
        height:270px;
        width:625px;

    }
`;
export const HomeRight = styled.div`
    width:280px;
    float:right;
`;
export const TopicWritter = styled.div`
    overflow:hidden;
    padding:20px 0 10px 0;
    margin-left:-24px;
    border-bottom:1px solid #dcdcdc;
`;
export const TopicItem = styled.div`
    float:left;
    padding:5px;
    background:#f7f7f7;
    height:32px;
    line-height:32px;
    margin-left:24px; 
    margin-bottom:18px;  
    font-size:14px;
    color:#000;
    border:1px solid #dcdcdc;
    border-radius:4px;
`;
export const ListItem = styled.div`
    overflow:hidden;
    padding:20px 0;
    border:bottom:1px solid #dcdcdc;
    .pic{
        display:block;
        width:125px;
        height:100px;
        float:right;
        border-radius:10px;
    }
`;
export const ListInfo = styled.div`
    width:500px;
    float:left;
    .title{
        font-size:18px;
        line-height:27px;
        font-weight:bold;
        color:#333;
    }
    .desc{
        line-height:18px;
        color:#999;
        font-size:13px;
    }
`;
export const RecommendWrapper = styled.div`
    margin:30px 0;
    width:280px;
`;
export const RecommendItem = styled.div`
    width:280px;
    height:50px;
    
    background:url(${(props)=>props.imgUrl} );
    ${'' /* styled-components中的多行字符串语法 */}
    background-size:contain;
`;
export const WriterWrapper = styled.div`
    width:280px;
    margin: 0 0 20px;
    text-align: left;
    border:1px solid #dcdcdc;
    height:300px;
`;
export const WriterItem = styled.div`
    width:280px;
    line-height:20px;
    margin-top:15px;
`;
export const LoadMore =styled.div`
    width:100%;
    height:40px;
    line-height:40px;
    margin:30px;
    background:#a5a5a5;
    text-align:center;
    border-radius:20px;
    color:#fff;
    cursor:pointer;
`;
export const BackTop =styled.div`
    position:fixed;
    right:100px;
    bottom:100px;
    font-size:14px;
    width:60px;
    height:60px;
    line-height:60px;
    text-align:center;
    border:1px solid #ccc;
`;