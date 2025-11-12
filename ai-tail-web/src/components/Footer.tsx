import styled from "styled-components"
import LogoPng from "@/assets/images/logo.png"
import discordSvg from "@/assets/images/logos/discord.svg"
import discordSvg1 from "@/assets/images/logos/discord1.svg"
import mediumLogoPng from "@/assets/images/logos/medium-logo.png"
import mediumLogoPng1 from "@/assets/images/logos/medium-logo1.png"
import twiterSvg from "@/assets/images/logos/twiter.svg"
import twiterSvg1 from "@/assets/images/logos/twiter1.svg"
import githubSvg from "@/assets/images/logos/github.svg"
import githubSvg1 from "@/assets/images/logos/github1.svg"
import { useNavigate } from "umi"

const FooterDiv = styled.div`
width: 100%;
height: 160px;
background-color: #0e1117;
line-height: 160px;
.footer{
  width: 96%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  .logo{
    width: 120px;
    img{
      width: 100%;
      object-fit: contain;
      cursor: pointer;
    }
  }
  .content{
    display: flex;
    div {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    div:nth-child(1) {
      background-image: url(${discordSvg});
    }
    div:nth-child(2) {
      background-image: url(${mediumLogoPng});
    }
    div:nth-child(3) {
      background-image: url(${twiterSvg});
    }
    div:nth-child(4) {
      background-image: url(${githubSvg});
    }
    div:nth-child(1):hover {
      background-image: url(${discordSvg1});
    }
    div:nth-child(2):hover {
      background-image: url(${mediumLogoPng1});
    }
    div:nth-child(3):hover {
      background-image: url(${twiterSvg1});
    }
    div:nth-child(4):hover {
      background-image: url(${githubSvg1});
    }
  }
}
`

const Footer = () => {
  const navigator = useNavigate();
  const openUrl = (index: number) => {
    if (index == 1) {
      window.open("https://discord.gg/k8BpVv8xXS");
    } else if (index == 3) {
      window.open("https://twitter.com/crestprotocol");
    } else if (index == 2) {
      window.open("https://medium.com/@crestprotocol/")
    } else {
      window.open("https://github.com/crestprotocol")
    }
  }
  const openHome = () => {
    window.location.href = "https://crestprotocol.com/";
  }
  return <FooterDiv>
    <div className="footer">
      <div className="logo" onClick={openHome}>
        <img src={LogoPng} alt="" />
      </div>
      <div className="content">
        <div onClick={() => openUrl(1)}></div>
        <div onClick={() => openUrl(2)}></div>
        <div onClick={() => openUrl(3)}></div>
        <div onClick={() => openUrl(4)}></div>
      </div>
    </div>
  </FooterDiv>
}

export default Footer