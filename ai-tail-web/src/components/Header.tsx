import styled from "styled-components"
import LogoPng from "@/assets/images/logo.png"
import { ConnectButton, Connector, useAccount } from '@ant-design/web3';
import walletPng from '@/assets/images/address.svg'
import { useContext } from "react";
import { GlobalContext } from "@/layouts/ConfigProvider";
import { useNavigate } from "umi";

const HeaderDiv = styled.div`
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #0e1117;
  .header{
    width: 96%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .header-content {
    display: flex;
    align-items: center;
  }
  .logo{
    display: flex;
    align-items: center;
    width: 120px;
    img{
      width: 100%;
      object-fit: contain;
      cursor: pointer;
    }
  }
  .menu{
    display: flex;
    align-items: center;
    padding-left: 100px;
    .menu-item{
      margin-right: 80px;
      color: #959aa6;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      font-family: Chivo-Regular, Chivo;
      &:hover{
        color: #fff;
      }
    }
  }
  .header-wallet{
    button{
      height: 36px;
      margin: 20px 0;
      padding: 0 20px;
      text-align: center;
      font-size: 14px;
      font-family: Chivo-Regular, Chivo;
      color: #fff;
      background: transparent;
      border-radius: 18px;
      cursor: pointer;
      vertical-align: middle;
      img{
        margin-top: 4px;
        width: 20px;
      }
      &:hover{
        background: transparent !important;
        border: 1px solid #fff !important;
        color: #fff !important;
      }
    }
    .app-button{
      background: transparent !important;
      border: 1px solid #fff !important;
      color: #fff !important;
    }
  }
`

const Header = () => {
  const {page} = useContext(GlobalContext)!;
  const navigator = useNavigate();
  const menuList = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Position", path: "/position" },
    { name: "Earn", path: "/jdn" },
    { name: "GP", path: "/gp" },
  ]

  const { account } = useAccount();

  console.log('account', account)

  const onConnected = (account: any) => {
    console.log('Connected: ' + account)
  }

  const openHome = () => {
    window.location.href = "https://crestprotocol.com/";
  }
  
  return <HeaderDiv>
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <img onClick={openHome} src={LogoPng} alt="" />
        </div>
        {page !== 'home' &&<div className="menu">
          {menuList.map((item) => {
            return <a key={item.name} href={item.path} className="menu-item">
              {item.name}
            </a>
          })}
        </div>}
      </div>
      <div className="header-wallet">
        {page !== 'home' && <Connector onConnected={onConnected}>
          <ConnectButton
            icon={<img src={walletPng} alt="" />}
            account={account}
          />
        </Connector>}
        {
          page === 'home' && <button className="app-button" onClick={() => navigator('/jdn')}>Launch App</button>

        }
      </div>
    </div>
  </HeaderDiv>
}

export default Header