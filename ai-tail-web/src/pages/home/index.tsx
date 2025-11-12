import imag24Png from '@/assets/images/home/image24.png'
import imag24Png2x from '@/assets/images/home/image24@2x.png'
import ethPng from '@/assets/images/home/eth.png'
import ethPng2x from '@/assets/images/home/eth@2x.png'
import imag21Png from '@/assets/images/home/image21-1.png'
import imag21Png2x from '@/assets/images/home/image21-1@2x.png'
import Solana1Png from '@/assets/images/home/Solana1.png'
import Solana1Png2x from '@/assets/images/home/Solana1@2x.png'
import imag26Png from '@/assets/images/home/image26.png'
import imag26Png2x from '@/assets/images/home/image26@2x.png'
import driftPng from '@/assets/images/home/drift.png'
import driftPng2x from '@/assets/images/home/drift@2x.png'
import Frame1Png from '@/assets/images/home/Frame1.png'
import Frame1Png2x from '@/assets/images/home/Frame1@2x.png'
import Frame171Png from '@/assets/images/home/Frame171.png'
import Frame171Png2x from '@/assets/images/home/Frame171@2x.png'
import FramePng from '@/assets/images/home/Frame.png'
import FramePng2x from '@/assets/images/home/Frame@2x.png'
import part11Png from '@/assets/images/home/part11.png'
import part11Png2x from '@/assets/images/home/part11@2x.png'
import Frame183Png from '@/assets/images/home/Frame183.png'
import Frame183Png2x from '@/assets/images/home/Frame183@2x.png'
import imagePng from '@/assets/images/home/image.png'
import imagePng2x from '@/assets/images/home/image@2x.png'
import image12Png from '@/assets/images/home/image12.png'
import image12Png2x from '@/assets/images/home/image12@2x.png'
import usdc2Img from '@/assets/images/logo/usdc.svg'
import { useContext, useEffect, useState } from 'react'
import vaultService from "@/service/vault"
import { toFixed } from '@/utils'
import './index.less'
import { GlobalContext } from '@/layouts/ConfigProvider'
const Home = () => {
  const {setPage} = useContext(GlobalContext)!;
  const pixelRatio = window.devicePixelRatio || 1
  const imag24PngUrl = pixelRatio > 1 ? imag24Png2x : imag24Png
  const ethPngUrl = pixelRatio > 1 ? ethPng2x : ethPng
  const Solana1PngUrl = pixelRatio > 1 ? Solana1Png2x : Solana1Png
  const imag21PngUrl = pixelRatio > 1 ? imag21Png2x : imag21Png
  const imag26PngUrl = pixelRatio > 1 ? imag26Png2x : imag26Png
  const driftPngUrl = pixelRatio > 1 ? driftPng2x : driftPng
  const Frame1PngUrl = pixelRatio > 1 ? Frame1Png2x : Frame1Png
  const Frame171PngUrl = pixelRatio > 1 ? Frame171Png2x : Frame171Png
  const FramePngUrl = pixelRatio > 1 ? FramePng2x : FramePng
  const part11PngUrl = pixelRatio > 1 ? part11Png2x : part11Png
  const Frame183PngUrl = pixelRatio > 1 ? Frame183Png2x : Frame183Png
  const imagePngUrl = pixelRatio > 1 ? imagePng2x : imagePng
  const image12PngUrl = pixelRatio > 1 ? image12Png2x : image12Png

  const [gmxApy, setGmxApy] = useState('--')
  const [jlpApy, setJlpApy] = useState('--')
  const [partInfo1Show, setPartInfo1Show] = useState(false)
  const [partInfo2Show, setPartInfo2Show] = useState(false)

  const changePartInfoShow = (val: string) => {
    if (val === '1') {
      setPartInfo1Show(!partInfo1Show)
    } else {
      setPartInfo2Show(!partInfo2Show)
    }
  }

  const open = (url: string) => {
    window.open(url)
  }

  const getData = () => {
    vaultService.getTotalLastRecord().then((res: any) => {
      if (res.data) {
        const value = res.data.annualizedReturn && res.data.annualizedReturn !== '-1.0000000000' ? toFixed((res.data.annualizedReturn * 100), 2) + '%' : '0%'
        setJlpApy(value)
      } else {
        setJlpApy('22%')
      }
    }).catch((err) => {
      console.log(err)
      setJlpApy('22%')
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setPage('home')
    return () => {
      setPage('')
    }
  }, [])

  useEffect(() => {
    const Content = document.querySelector('#main-content') as HTMLElement
    if (Content) {
      // 设置宽度100%
      Content.style.width = '100%'
      // 设置margin为0
      Content.style.margin = '0'
    }
    return () => {
      if (Content) {
        Content.style.width = '1200px'
        Content.style.margin = '0 auto'
      }
    }
  }, [])


  return <div className="home-content">
    <div className="banner">
      <div className="container-home content-banner">
        <div className="content-banner-content">
          <div className="strong" style={{ fontSize: '64px' }}>Crest Protocol</div>
          <div className="content-banner-content-info">The best destination for stablecoin investment</div>
        </div>
      </div>
    </div>
    {/* <div className="container-home part-collaborate">
      <div>Collaborate with</div>
      <img src={imag21PngUrl}
        style={{ height: '36px' }}
        alt="" />
      <img src={ethPngUrl}
        style={{ height: '30px' }}
        alt="" />
      <img src={Solana1PngUrl}
        style={{ height: '33px' }}
        alt="" />
      <img src={imag24PngUrl}
        style={{ height: '22px' }}
        alt="" />
      <img src={driftPngUrl}
        style={{ height: '26px' }}
        alt="" />
      <img src={imag26PngUrl}
        style={{ height: '27px' }}
        alt="" />
    </div> */}
    {/* <div className="container-home part-card">
      <div className="part-card-item"
        onClick={() => open('https://gdn.crestprotocol.com/#/earn/gdn')}>
        <div className="part-card-item-img">
          <img src={Frame1PngUrl}
            alt="" />
        </div>
        <div className="part-card-item-title">JLP Hyperliquid Loop</div>
        <div className="part-card-item-logo">
          <div className="part-card-item-logo-left">
            <div className="part-card-item-logo-left-label">Deposit Asset:</div>
            <div className="part-card-item-logo-left-img">
              <img src={usdc2Img}
                alt="" />
            </div>
          </div>
          <div className="part-card-item-logo-right">
            <div className="part-card-item-logo-right-label">Underlying: </div>
            <div className="part-card-item-logo-right-img">
              <img src={imag24PngUrl}
                style={{ height: '12px' }}
                alt="" />
            </div>
            <div className="part-card-item-logo-right-img">
              <img src={imag21PngUrl}
                style={{ height: '26px' }}
                alt="" />
            </div>
          </div>

        </div>
        <div className="part-card-item-data">
          <div style={{ height: 280 }}>Comming Soon</div>
          <div className="part-card-item-data-title">
            <div className="part-card-item-data-title-label">APR</div>
            <div className="part-card-item-data-title-value">{gmxApy}</div>
          </div>
          <div className="part-card-item-data-input">
            <div className="part-card-item-data-input-label">Current Share Price</div>
            <div className="part-card-item-data-input-value">$1.086</div>
          </div>
          <div className="part-card-item-data-info"
            v-if="partInfo1Show">Description: <br />
            GMX-GM Delta Neutral，Based on GMX V2, purchase GM to provide liquidity of mainstream currencies and at the same time hedge mainstream currencies in GMX.</div>
          <div className="part-card-item-data-more"
            onClick={(E) => {
              E.stopPropagation()
              changePartInfoShow('1')
            }}>Learn More </div>
        </div>
      </div >
      <div className="part-card-item"
        onClick={() => open('https://jdn.crestprotocol.com/')} >
        <div className="part-card-item-img">
          <img src={Frame171PngUrl}
            alt="" />
        </div>
        <div className="part-card-item-title">JLP Delta Neture</div>
        <div className="part-card-item-logo">
          <div className="part-card-item-logo-left">
            <div className="part-card-item-logo-left-label">Deposit Asset:</div>
            <div className="part-card-item-logo-left-img">
              <img src={usdc2Img}
                alt="" />
            </div>
          </div>
          <div className="part-card-item-logo-right">
            <div className="part-card-item-logo-right-label">Underlying: </div>
            <div className="part-card-item-logo-right-img">
              <img src={imag26PngUrl}
                alt="" />
            </div>
            <div className="part-card-item-logo-right-img">
              <img src={Solana1PngUrl}
                style={{ height: '24px' }}
                alt="" />
            </div>
          </div>

        </div>
        <div className="part-card-item-data">
          <div className="part-card-item-data-title">
            <div className="part-card-item-data-title-label">APR</div>
            <div className="part-card-item-data-title-value">{jlpApy}</div>
          </div>
          <div className="part-card-item-data-input">
            <div className="part-card-item-data-input-label">Current Share Price</div>
            <div className="part-card-item-data-input-value">$1.067</div>
          </div>
          <div className="part-card-item-data-info"
            v-if="partInfo2Show">Description: <br />
            This strategy leverages and hedges JDN, a liquidity pool token from Jupiter and Solana, to optimize yield for USDC depositors. lt factors in trading timing, premium opportunities, borrowing costs, and the recent behavior of Jupiter traders to ensure efficient yield generation.</div>
          <div className="part-card-item-data-more"
            onClick={(e) => {
              e.stopPropagation()
              changePartInfoShow('2')
            }}>Learn More </div >
        </div >
      </div >
    </div > */}
    <div className="container-home part-item1">
      <div className="part-item1-content">
        <div className="part-item1-content-title">The best destination for stablecoin investment</div>
        <div className="part-item1-content-info">The returns of principal-guaranteed stable coins are low, while quantitative strategies are exclusive to institutions or high-net-worth clients. How can ordinary investors also obtain high returns from stable coins? Crest has built a bridge connecting DeFi investors and quantitative strategies, allowing ordinary investors to enjoy the high returns and low risks brought by quantitative strategies.</div>
      </div>
      <div className="part-item1-img">
        <img src={part11PngUrl}
          alt="" />
      </div>
    </div>
    <div className="container-home part-item2">
      <div className="part-item2-title"><span className="color-F56262">Features of Crest</span></div>
      <div className="part-item2-content">
        <div className="part-item2-content-img">
          <img src={Frame183PngUrl}
            alt="" />
        </div>
        <div className="part-item2-content-data">
          <div className="part-item2-content-data-title">Quantitative Strategy Robot</div>
          <div className="part-item2-content-data-info">All strategies are taken over by the robot, 7x24 hours operation, responding tomarket changes in milliseconds, and strictly executing according to preset rules. andyou only need to deposit, view earnings, and withdraw funds.</div>
        </div>
      </div>
      <div className="part-item2-content">
        <div className="part-item2-content-data">
          <div className="part-item2-content-data-title">Delta-neutral Strategy</div>
          <div className="part-item2-content-data-info">Automatic delta-neutral hedging to eliminate market risk.Due to the existence ofGamma (the rate of change of Delta), crest robot monitor and adjust its positionsregularly. When the price of the underlying asset fluctuates significantly, Gamma maycause Delta to deviate from neutrality, and rebalancing is required by buying andselling spot or contracts.</div>
        </div>
        <div className="part-item2-content-img">
          <img src={image12PngUrl}
            alt="" />
        </div>
      </div>
      <div className="part-item2-content">
        <div className="part-item2-content-img">
          <img src={imagePngUrl}
            alt="" />
        </div>
        <div className="part-item2-content-data">
          <div className="part-item2-content-data-title">Fund security</div>
          <div className="part-item2-content-data-info">Funds are managed by a third-party platform, and only users can deposit andwithdraw funds.Crest's Delegate address only has operation permissions.</div>
        </div>
      </div>
    </div>
  </div >
}

export default Home