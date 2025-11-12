import { Helmet, Outlet } from 'umi';
import './index.less';
import '../assets/css/global.less';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext'
import {
  CoinbaseWallet,
  OKXWallet,
  PhantomWallet,
  SolanaWeb3ConfigProvider,
  SolflareWallet,
} from '@ant-design/web3-solana';
import { GlobalProvider } from './ConfigProvider';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    // 当屏幕尺寸小于768px时，跳转到移动端页面
    if (window.innerWidth < 768) {
      window.location.href = 'https://mobile.crest.money';
    }
  }, [])
  return (
    <SolanaWeb3ConfigProvider
      autoConnect={true}
      autoAddRegisteredWallets={true}
      wallets={[CoinbaseWallet(), PhantomWallet(), SolflareWallet(), OKXWallet()]}
    >
      <LanguageProvider>
        <GlobalProvider>
          <div className='app-container'>
            <Helmet>
              <title>{'Crest Protocol - JDN'}</title>
            </Helmet>
            <Header />
            <div className='container-content' id='main-content'>
              <Outlet />
            </div>
            <Footer />
          </div>
        </GlobalProvider>
      </LanguageProvider>
    </SolanaWeb3ConfigProvider>
  );
}
