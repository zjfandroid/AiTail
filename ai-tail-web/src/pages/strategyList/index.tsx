import { useEffect, useRef, useState } from "react";
import { Header, StrategyListWrapper } from "./style";
import vaultService from "@/service/vault"
import { numberToLetter, timeAgo, toFixed, trimSpecialChars } from "@/utils";
import { Segmented, Switch, Watermark } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Detail from "./detail";
import { useAccount } from "@ant-design/web3";
import { useWallet } from "@ant-design/web3-solana";
import JLPLOGOPng from '@/assets/images/jupiter-logo.svg';
import { CustomEmpty } from "../position";
import { getContractVaultBalance, getEarnings } from "@/utils/contractServer";

const StrategyList = () => {
  const [vaultList, setVaultList] = useState<any[]>([])
  const [desposited, setDesposited] = useState<boolean>(false)
  const [extendList, setExtendList] = useState<any[]>([])
  const { account } = useAccount()
  const { connected } = useWallet();
  const allList = useRef<any[]>([])
  console.log('vaultList', vaultList)

  const onChangeDesposited = (value: boolean) => {
    setDesposited(value)
  }

  const getVaultDepositor = async (vaultAddress: string, accountAddress: string) => {

    if (!vaultAddress || !accountAddress) {
      console.error('Vault address or account address is not provided')
      return
    }
    try {
      const req = {
        vaultAddress: vaultAddress,
        authority: accountAddress,
      }
      const res: any = await vaultService.getVaultDepositor(req)
      return res || {}
    } catch (error) {
      return {}
    }
  }

  const fetchList = () => {
    Promise.all([
      vaultService.getVaultList({ pageNumber: 1, pageSize: 100, isPrivate: false }),
      // vaultService.getVaultList({ pageNumber: 1, pageSize: 100, isPrivate: true }),
    ]).then((res: any) => {
      const array1 = res[0]?.data?.rows?.map((item: any, index: number) => {
        return {
          ...item,
          name: 'Vault ' + numberToLetter(index),
          isPrivate: false
        }
      }) || []
      // const array2 = res[1]?.data?.rows?.map((item: any, index: number) => {
      //   return {
      //     ...item,
      //     name: 'Vault ' + numberToLetter(index),
      //     isPrivate: true
      //   }
      // })
      const array = [...array1]
      setVaultList(array || [])
    }).catch((err) => {
      console.log(err)
    })
    // vaultService.getVaultList({ pageNumber: 1, pageSize: 100 }).then((res: any) => {
    //   const array = res?.data?.rows?.map((item: any, index: number) => {
    //     return {
    //       ...item,
    //       name: 'Vault ' + numberToLetter(index),
    //     }
    //   })
    //   setVaultList(array || [])

    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  const onExtend = (vaultAddress: string, isExtend: boolean) => {
    if (isExtend) {
      setExtendList(extendList.filter((item) => item !== vaultAddress))
    } else {
      setExtendList([...extendList, vaultAddress])
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    // 创建取消标志
    let isMounted = true;

    const fetchUserEarnings = async () => {
      // 检查必要条件
      if (vaultList.length === 0) return;

      try {
        // 创建更新后的保险库列表
        const updatedVaultList = await Promise.all(
          vaultList.map(async (item) => {
            if (!item.vaultAddress) return item;

            try {
              const res = account?.address ? await getVaultDepositor(item.vaultAddress, account.address) : {};
              const res1: any = await vaultService.getLatestRecord(item.vaultAddress);
              if (!res1.data && !res?.data) return item;

              const balance = getContractVaultBalance(res?.data, item);
              const earn = getEarnings(res?.data, item);
              return {
                ...item,
                earn: earn,
                balance: balance,
                annualizedReturn: res1.data?.annualizedReturn ? Number(toFixed((res1.data?.annualizedReturn * 100), 2)) : 0,
                maxDrawdown: res1.data?.maxDrawdown || 0,
                sharePrice: res1.data?.sharePrice || 0,
              };
            } catch (error) {
              console.error(`Failed to fetch depositor for vault ${item.vaultAddress}`, error);
              return item; // 出错时返回原始项
            }
          })
        );

        // 只在组件未卸载时更新状态
        if (isMounted) {
          setVaultList(updatedVaultList);
        }
      } catch (error) {
        console.error("Failed to update vault list", error);
      }
    };

    fetchUserEarnings();

    // 清理函数：组件卸载时标记为未挂载
    return () => {
      isMounted = false;
    };
  }, [account?.address, vaultList.length, connected]); // 优化依赖项

  const handleChange = (value: string) => {
    if (value === 'Lived') {
      if (allList.current.length === 0) {
        allList.current = vaultList
      }
      setVaultList(allList.current)
    } else {
      allList.current = vaultList
      setVaultList([])
    }
  };

  return (
    <StrategyListWrapper>
      <Header>
        <div className="header-title">JDN</div>
        <div className="header-info">
          <div>Empowers users to maximize returns through leveraged yield farming while managing risks via strategic hedging. </div>
        </div>
      </Header>
      <div className="header-action">
        <div className="Segmented">
          <Segmented
            onChange={handleChange}
            options={['Lived', 'Finishied']} />
        </div>
      </div>
      <div className="StrategyList-content">
        {
          vaultList.map((item) => {
            return <div className="StrategyList-list" key={item.id}>
              <div className="StrategyList-list-item">
                <div className="StrategyList-list-item-name">
                  <div className="StrategyList-list-item-name-logo">
                    <img src={JLPLOGOPng} alt="" />
                  </div>
                  <div className="content-label">{trimSpecialChars(item.vaultName)}</div>
                </div>
                <div className="StrategyList-list-item-list">
                  <div className="StrategyList-list-item-item">
                    <div className="StrategyList-list-item-item-label">Running Time</div>
                    <div>{timeAgo(item.createdAt)}</div>
                  </div>
                  <div className="StrategyList-list-item-item">
                    <div className="StrategyList-list-item-item-label">My Earnings</div>
                    <div>${toFixed(item?.earn || 0)}</div>
                  </div>
                  <div className="StrategyList-list-item-item">
                    <div className="StrategyList-list-item-item-label">TVL</div>
                    <div>${toFixed(item.totalValue || 0)}</div>
                  </div>
                  <div className="StrategyList-list-item-item">
                    <div className="StrategyList-list-item-item-label">Apy</div>
                    <div>{item?.annualizedReturn || 0}%</div>
                  </div>
                </div>
                <div className="StrategyList-list-item-action">
                  {!extendList.includes(item.vaultAddress) && <DownOutlined onClick={() => onExtend(item?.vaultAddress, false)} />}
                  {extendList.includes(item.vaultAddress) && <UpOutlined onClick={() => onExtend(item?.vaultAddress, true)} />}
                </div>
              </div>
              {extendList.includes(item.vaultAddress) && <Detail data={item} />}
            </div>
          })
        }
        {
          vaultList.length === 0 && <CustomEmpty />
        }
      </div>
    </StrategyListWrapper>
  );
}

export default StrategyList;