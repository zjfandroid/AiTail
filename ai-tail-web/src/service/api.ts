import { TApi } from "./type";

const server = `/drift-agent`

export default <TApi>{
  vault: {
    list: `${server}/drift-vault/page`,
    detail: `${server}/drift-vault/info`,

  },
  vaultDepositor: {
    genDepositTx: `${server}/vault-depositor/genDepositTx`,
    genRequestWithdrawTx: `${server}/vault-depositor/genRequestWithdrawTx`,
    genWithdrawTx: `${server}/vault-depositor/genWithdrawTx`,
    getVaultDepositor: `${server}/vault-depositor/getVaultDepositor`,
  },
  static: {
    getStatistical: `${server}/statistical/page`,
    getLatestRecord: `${server}/statistical/latest-record`,
    getTotalStatistical: `${server}/total-statistical/page`,
    getTotalLastRecord: `${server}/total-statistical/latest-record`,
  },
  txHistory: {
    update: `${server}/tx-history/update`,
    list: `${server}/tx-history/page`,
  }
}