import styled from "styled-components";

export const Item = styled.div`
  width: calc(20% - 13px);
  height: 102px;
  padding: 24px;
  background: #FCFCFC;
  border-radius: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05);
  box-sizing: border-box;
  .content-label{
    font-weight: 400;
    font-size: 14px;
    color: #4d4d4d;
    line-height: 24px;
    font-family: Chivo-Regular, Chivo;
  }
  .content-value{
    font-weight: bold;
    font-size: 22px;
    color: #1a1a1a;
    font-family: Chivo-Bold, Chivo;
    line-height: 38px;
  }
`