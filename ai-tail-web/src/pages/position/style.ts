import styled from "styled-components";

export const PositionWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 24px 0;
  box-sizing: border-box;
  background: #F2F2F2;
  .position-content{
    width: 100%;
    padding-top:24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .position-table{
    width: 100%;
    margin-top:24px;
    padding: 24px;
    background: #FCFCFC;
    border-radius: 20px;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05);
    box-sizing: border-box;
    .position-table-header{
      width: 100%;
      margin-bottom: 24px;
      .ant-segmented{
        height: 48px;
        padding: 4px 8px;
        border-radius: 24px;
        background: #F5F5F5;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      }
      .ant-segmented-item {
        border-radius: 20px !important;
      }
      .ant-segmented-item-selected{
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
      }
      .ant-segmented-item-label{
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-radius: 20px !important;
       
      }
    }
    .position-table-content{
      .ant-table-placeholder{
        background-color: #fcfcfc !important;
      }
    }
  }
`