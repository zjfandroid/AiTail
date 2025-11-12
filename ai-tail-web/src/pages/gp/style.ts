import styled from "styled-components";

export const StrategyListWrapper = styled.div`
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
    .header-action{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30px 0 24px 0;
      font-weight: 400;
      font-size: 14px;
      color: #4E5969;
      line-height: 22px;
      .Segmented{
        .ant-segmented{
          height: 36px;
          padding: 2px 4px;
          border-radius: 18px;
          background: #F2F2F2;
          box-shadow: 0px 0 2px 0px rgba(0, 0, 0, 0.05);
        }
        .ant-segmented-item {
          border-radius: 14px !important;
        }
        .ant-segmented-item-selected{
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        }
        .ant-segmented-item-label{
          width: 80px;
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          border-radius: 14px !important;
        
        }
      }
      .header-action-switch{
        .header-action-switch-label{
          font-weight: 400;
          font-size: 16px;
          color: #1a1a1a;
          margin-left: 8px;
        }
      }
      .ant-btn{
        background: #1a1a1a;
        border-color: #1a1a1a;
        color: #fff;
        border-radius: 18px;
        height: 36px;
        padding: 0 16px;
        font-weight: 500;
        &:hover{
          background: #333;
          border-color: #333;
        }
      }
      .create-btn{
        margin-left: auto;
      }
      .create-btn{
        margin-left: auto;
      }
    }
  .StrategyList-content{
    .StrategyList-list{
      width: 100%;
      margin-bottom: 24px;
      background: #fff;
      padding: 32px 30px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
      border-radius: 20px;
      box-sizing: border-box;
      .StrategyList-list-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 16px;
        .StrategyList-list-item-name{
          display: flex;
          align-items: center;
          width: 280px;
          font-size: 24px;
          font-family: Chivo-Bold, Chivo;
          font-weight: 700;
          color:  #1a1a1a;
          .StrategyList-list-item-name-logo{
            margin-right: 8px;
            img{
              width: 28px
            }
          }
        }
        .StrategyList-list-item-list{
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: calc(100% - 360px);
          font-size: 16px;
          font-family: SanFranciscoText-Bold, SanFranciscoText;
          font-weight: 700;
          color:  #1a1a1a;
          .StrategyList-list-item-item-label{
            font-size: 12px;
            font-family: SanFranciscoText-Medium, SanFranciscoText;
            font-weight: 500;
            color:  grey;
            padding-bottom: 4px;
          }
        }
        .StrategyList-list-item-action{
          width: 200px;
          font-size: 16px;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          
          .action-buttons {
            display: flex;
            align-items: center;
            gap: 8px;
            
            .expand-icon {
              cursor: pointer;
              margin-right: 8px;
              transition: all 0.2s;
              
              &:hover {
                color: #F0B90B;
              }
            }
            
            .edit-btn {
              height: 28px;
              padding: 0 12px;
              font-size: 12px;
              border-radius: 14px;
              background: #F0B90B;
              border-color: #F0B90B;
              color: #1a1a1a;
              
              &:hover {
                background: #E1A706;
                border-color: #E1A706;
              }
            }
            
            .start-btn {
              height: 28px;
              padding: 0 12px;
              font-size: 12px;
              border-radius: 14px;
              background: transparent;
              border-color: #2B3139;
              color: #848E9C;
              
              &:hover {
                border-color: #F0B90B;
                color: #F0B90B;
              }
            }
          }
        }
      }
    }
  }
`

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
    }
`

export const DetailWrapper = styled.div`
  display: flex;
    width: 100%;
    background: #f0f0f0;
    padding: 26px 26px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-size: 14px;
    font-family: SanFranciscoText-Regular, SanFranciscoText;
    font-weight: 400;
    color: #333;
    line-height: 16px;
    border-radius: 20px;
    margin-bottom: 16px;
    .detail-item{
      width: calc(33% - 10px);
      height: 160px;
      border-radius: 16px;
      border: 2px solid rgba(0, 0, 0, .04);
      padding: 0 30px 10px 30px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      .detail-item-title{
        font-size: 16px;
        font-weight: 700;
        padding-top: 14px;
        padding-bottom: 6px;
      }
      .detail-item-list{
        line-height: 22px;
        display: flex;
        font-size: 12px;
        font-family: SanFranciscoText-Bold, SanFranciscoText;
        font-weight: 700;
        color:  #333;
        .detail-item-list-label{
          width: 100px;
          font-size: 12px;
          font-family: SanFranciscoText-Medium, SanFranciscoText;
          font-weight: 500;
          color: #999
        }
      }
      .detail-item-link{
        font-size: 12px;
        font-family: SanFranciscoText-Medium, SanFranciscoText;
        font-weight: 500;
        color: #999;
        text-decoration: underline;
        cursor: pointer;
        line-height: 28px
      }
      .detail-item-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .detail-item-content-list{
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          padding-top: 10px;
          font-family: SanFranciscoText-Medium, SanFranciscoText;
          font-weight: 500;
          color: #999;
          .detail-item-content-list-title{
            font-size: 16px;
            font-family: SanFranciscoText-Bold, SanFranciscoText;
            font-weight: 700;
            color: #333;
            padding-bottom: 16px;
            padding-top: 8px;
          }
        }
      }
      .detail-item-buttons{
        display: flex;
        justify-content: space-between; 
        align-items: center;
        width: 100%;
        margin-top: 24px;
        .detail-item-button-link{
          width: 100%;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          text-align: center;
          background: #1a1a1a;
          border-radius: 22px;
          color: #fff;
          cursor: pointer;
          &:hover{
            opacity: 0.8;
          }
        }
        .detail-item-button{
          width: 100%;
          button{
            height: 100%;
            margin: 20px 0;
           width: 100%;
          height: 36px;
          line-height: 36px;
            text-align: center;
            font-size: 14px;
            font-family: Chivo-Regular, Chivo;
            color: #fff;
             background: #1a1a1a;
            border-radius: 18px;
            cursor: pointer;
            vertical-align: middle;
            img{
              margin-top: 4px;
              width: 20px;
            }
            &:hover{
              opacity: 0.8;
            }
          }
        }
      }
    }
`