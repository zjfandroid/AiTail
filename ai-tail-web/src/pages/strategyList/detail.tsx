import { DetailWrapper } from "./style";
import { useAccount, ConnectButton, Connector } from "@ant-design/web3"
import walletPng from '@/assets/images/address.svg'
import mock from "../strategy/mock";
import { useEffect, useState } from "react";
import MinLineChart from "@/components/chart/line/MinLine";
import useWeb3 from "../strategy/hooks";
import { toFixed } from "@/utils";
import { useNavigate } from "umi";
import dayjs from "dayjs";
import vaultService from "@/service/vault";

interface IDetail {
  data: any
}

const Detail = (props: IDetail) => {
  const { data } = props;
  const nav = useNavigate();
  const { account } = useAccount()
  const [list, setList] = useState<any[]>([])
  const { userVault } = useWeb3({ accountAddress: account?.address || '', vaultAddress: data?.vaultAddress, data: data })

  const goLinkDetail = (type: string) => {
    nav(`/jdnDetail?type=${type}&vaultAddress=${data?.vaultAddress}`)
  }

  const onConnected = (account: any) => {
    console.log('Connected: ' + account)
  }

  const getStatistical = () => {
    const req = {
      pageNumber: 1,
      pageSize: 100,
      vaultAddress: data?.vaultAddress,
    }
    vaultService.getStatistical(req).then((res: any) => {
      if (res?.data) {
        const array = res.data?.rows?.map((item: any) => {
          return {
            time: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            value: item.sharePrice ? Number(toFixed(item.sharePrice, 4)) : 0
          }
        })?.reverse() || []
        setList(array || [])
      }
    })
  }

  const openJLP = () => {
    window.open(`https://app.drift.trade/overview/?authority=${data?.vaultAddress}`, '_blank');
  }

  useEffect(() => {
    if (data?.vaultAddress) {
      getStatistical();
    }
  }, [data])

  return (
    <DetailWrapper>
      <div className="detail-item">
        <div className="detail-item-title">Strategy Detail</div>
        <div className="detail-item-list">
          <div className="detail-item-list-label">Start Time:</div>
          <div>{dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className="detail-item-list">
          <div className="detail-item-list-label">Manage Fee:</div>
          <div>30%</div>
        </div>
        <div className="detail-item-list">
          <div className="detail-item-list-label">Share Price:</div>
          <div>{toFixed(data?.sharePrice || 0, 4)}</div>
        </div>
        {/* <div className="detail-item-list">
          <div className="detail-item-list-label">Max Drawdown:</div>
          <div>{toFixed(data?.maxDrawdown * 100 || 0, 2)}%</div>
        </div> */}
        <div className="detail-item-link" onClick={openJLP}>Link to JLP</div>
      </div>
      <div className="detail-item">
        <div className="detail-item-title">Share Price</div>
        <div>
          <MinLineChart style={{ height: 120 }} data={list} />
        </div>
      </div>
      {<div className="detail-item">
        <div className="detail-item-content">
          <div className="detail-item-content-list">
            <div className="detail-item-content-list-title">Earnings</div>
            <div>USDC ${toFixed(data?.earn || 0, 4)}</div>
          </div>
          <div className="detail-item-content-list">
            <div className="detail-item-content-list-title">Deposited</div>
            <div>USDC ${toFixed(data?.balance || 0, 4)}</div>
          </div>
        </div>
        <div>
          {account?.address ? (
            <div className="detail-item-buttons">
              <div
                onClick={() => goLinkDetail('deposit')}
                className="detail-item-button-link"
                style={{ width: 'calc(50% - 8px)' }}>Deposit</div>
              <div
                onClick={() => goLinkDetail('withdraw')}
                className="detail-item-button-link"
                style={{ width: 'calc(50% - 8px)' }}> Withdraw</div>
            </div>) :
            <div className="detail-item-buttons"><div className="detail-item-button">
              <Connector onConnected={onConnected}>
                <ConnectButton
                  icon={<img style={{ marginTop: 12 }} src={walletPng} alt="" />}
                  account={account}
                />
              </Connector>
            </div>
            </div>
          }
        </div>
      </div>}
    </DetailWrapper>
  );
}

export default Detail;