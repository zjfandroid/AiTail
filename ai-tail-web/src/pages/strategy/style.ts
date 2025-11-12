import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  background: #F2F2F2;
  .content{
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content-opt{
    width: 620px;
    margin: 16px auto 16px auto;
    >div{
      font-weight: 700;
      font-size: 16px;
      color: #4d4d4d;
      cursor: pointer;
    }
  }
`;

export const Header = styled.header`
  margin-bottom: 16px;
    .header-title{
      font-weight: 600;
      font-size: 40px;
      color: #252525;
      line-height: 48px;
      padding-bottom: 8px;
    }
    .header-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      color: #4E5969;
      line-height: 22px;
    }`

export const OptContentWrapper = styled.div`
  width: 30%;
  padding: 24px;
  background: #FCFCFC;
  border-radius: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05);
  box-sizing: border-box;
  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .header-item{
      width: 100px;
      font-weight: 400;
      font-size: 16px;
      color: #4E5969;
      line-height: 24px;
      cursor: pointer;
      &:hover{
        color: #252525;
        font-weight: 600;
      }
    }
    .header-item-active{
      color: #252525;
      font-weight: 600;
    }
  }
  .info{
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 8px 0;
    .info-tag{
      padding: 0 16px;
      height: 36px;
      line-height: 36px;
      background: #ECF3FF;
      border-radius: 10px;
      border: 1px solid #5495F9;
      font-weight: 400;
      font-size: 14px;
      color: #5495F9;
    }
  }
  .opt-content{
    .opt-content-tile{
      font-weight: 600;
      font-size: 14px;
      color: #93A3BC;
    }
    .opt-content-progess{
      margin: 8px 0;
      padding: 16px;
      background: #F7F8FA;
      border-radius: 10px;
      .opt-content-progess-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .vault-title{
          font-weight: 600;
          font-size: 14px;
          color: #252525;
        }
        .vault-type{
          cursor: pointer;
          font-weight: 400;
          font-size: 14px;
          color: #4E5969;
          line-height: 22px;
        }
      }
      .opt-content-progess-value{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        font-weight: 400;
        font-size: 14px;
        color: #4E5969;
        line-height: 22px;
      }
    }
  }
  .opt-data{
    .opt-data-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
      .opt-data-header-label{
        font-weight: 600;
        font-size: 14px;
        color: #93A3BC;
      }
      .opt-data-header-value{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        color: #4E5969;
        line-height: 22px;
        img{
          width: 16px;
          margin-right: 8px;
        }
      }
    }
    .opt-data-input{
      width: 100%;
      height: 68px;
      line-height: 68px;
      background: #F7F8FA;
      border-radius: 10px;
      box-sizing: border-box;
      .ant-input-affix-wrapper{
        border: none;
        background-color: transparent;
        line-height: 68px;
        box-shadow: none;
      }
      input{
        font-weight: 600;
        font-size: 16px;
        color: #252525;
      }
      .opt-data-input-label{
        display: flex;
        align-items: center;
        width: 150px;
        img{
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        span{
          font-weight: 600;
          font-size: 16px;
          color: #252525;
        }
      }
      .opt-data-input-button{
        font-weight: 600;
        font-size: 14px;
        color: #93A3BC;
        line-height: 22px;
        cursor: pointer;
      }
    }
    .opt-data-message{
      width: 100%;
      margin: 12px 0;
      padding: 16px 12px;
      border: 1px solid #EF971C;
      border-radius: 14px;
      font-weight: 400;
      font-size: 14px;
      color: #EF971C;
      line-height: 22px;
      box-sizing: border-box;
    }
    .opt-data-value{
      width: 100%;
      padding: 16px 12px;
      background: #F7F8FA;
      box-sizing: border-box;
      border-radius: 14px;
      .opt-data-value-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
        font-weight: 400;
        font-size: 14px;
        color: #4E5969;
        line-height: 22px;
      }
    }
    .opt-data-info{
      display: flex;
      margin: 12px 0;
      border: 1px solid #E5E6EB;
      border-radius: 12px;
      padding: 12px 16px;
      box-sizing: border-box;
      .opt-data-info-icon{
        width: 60px;
        font-size: 14px;
      }
      .opt-data-info-text{
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
      }
    }
  }
  .opt-opt{
    margin-top: 12px;
    .opt-opt-info{
      margin-bottom: 12px;
      font-weight: 400;
      font-size: 12px;
      color: #4E5969;
      line-height: 20px;
    }
    .opt-opt-button{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: linear-gradient( 93deg, #2536EB 0%, #45C3F2 42%, #2536EB 100%);
      border-radius: 14px;
      font-weight: bold;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      cursor: pointer;
    }
  }
`

export const ChartWrapper = styled.div`
  width: calc(70% - 24px);
  background: #FCFCFC;
  border-radius: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05);
  box-sizing: border-box;
  .chart-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid #E5E6EB;
    box-sizing: border-box;
    .chart-header-label{
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 16px;
      color: #252525;
      line-height: 24px;
      img{
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
    .chart-header-select{
      width: 60px;
      .ant-select-selector{
        border: none;
        box-shadow: none !important;
        font-weight: 400;
        font-size: 16px;
        color: #4E5969;
        line-height: 20px;
      }
    }
  }
  .chart-content{
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    .chart-content-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .chart-content-title-label{
        font-weight: 600;
        font-size: 16px;
        color: #252525;
        line-height: 24px;
      }
      .chart-content-title-seelct{
        .ant-segmented{
          height: 36px;
          padding: 3px 6px;
          border-radius: 18px;
          background: #F5F5F5;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        }
        .ant-segmented-item {
          border-radius: 15px !important;
        }
        .ant-segmented-item-selected{
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
        }
        .ant-segmented-item-label{
          width: 100px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          border-radius: 15px !important;
        
        }
      }
    }
  }
  .chart-chart{
      padding-bottom: 16px
    }
`

export const CardWrapper = styled.div`
    max-width: 620px;
    margin: 16px auto 40px auto;
    padding: 30px 48px;
    background: #fafafa;
    -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, .05);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .05);
    border-radius: 14px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    .title{
      padding-bottom: 30px;
      font-size: 32px;
      font-family: Chivo-Bold, Chivo;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 33px;
    }
    .content-tabs{
      display: flex;
      box-sizing: border-box;
      .content-tab-item{
        width: 50%;
        padding: 18px 0;
        font-weight: 700;
        text-align: center;
        font-size: 16px;
        color: grey;
        font-family:  Chivo-Bold, Chivo;
        border-bottom: 2px solid #dfdfe0;
        cursor: pointer;
        box-sizing: border-box;
      }
      .select-tab{
        color:  #1a1a1a;
        border-bottom: 3px solid  #1a1a1a
      }
    }
    .footer-content{
      button{
        height: 44px;
        color: #fff !important;
        background-color: #1a1a1a !important;
        border-radius: 22px;
      }
    }
`

export const InputComponentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background: #f3f3f5;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 6px;
  box-sizing: border-box;
  .input-label{
    display: flex;
    align-items: center;
    width: 150px;
    img{
      width: 24px;
      height: 24px;
    }
    span{
      padding-left: 15px;
      font-size: 24px;
      font-family: Chivo-Bold, Chivo;
      font-weight: 700;
      color: #333
    }
  }
  .input-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    .input-balance{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;
      color: #4d4d4d;
      margin-bottom: 10px;
      text-align: right;
      .input-balance-primary{
        color: #3c82ff;
      }
      .input-balance-max{
        display: inline-block;
        width: 36px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border-radius: 6px;
        border: 1px solid #333;
        cursor: pointer;
        margin-left: 10px;
      }
    }
    .input-field{
      display: flex;
      justify-content: flex-end;
       width: 100%;
      .ant-input-number{
        width: 240px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        font-size: 22px;
        font-family: Chivo-Bold, Chivo;
        font-weight: 700;
        color: #1a1a1a;
        text-align: right;
        background: #dfdfe0;
      }
    }
  }
`

export const DataListWrapper = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
  line-height: 32px;
  background: #f3f3f5;
  border-radius: 8px;
  .data-item{
    display: flex;
    width: 50%;
    .data-value{
      padding-left: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #3c82ff;
    }
  }
`

export const DespositWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  .card-item-info{
    padding: 12px 16px;
    border: 1px solid #156de1;
    border-radius: 8px;
    font-size: 14px;
    p{
      color: #333;
      margin-bottom: 10px;
      text-align: left;
    }
    .tips{
      color: #999;
    }
  }
`

