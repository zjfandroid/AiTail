import fetchApi from '../base/fetchApi';
import api from '../api'

class VaultService {
  getVaultList(params: any) {
    return fetchApi.get(api.vault.list || '', params);
  }
  getVaultDetail(address: string) {
    return fetchApi.get(api.vault.detail + `/${address}`, {});
  }
  genDepositTx(params: any) {
    return fetchApi.get(api.vaultDepositor.genDepositTx || '', params);
  }
  genRequestWithdrawTx(params: any) {
    return fetchApi.get(api.vaultDepositor.genRequestWithdrawTx || '', params);
  }
  genWithdrawTx(params: any) {
    return fetchApi.get(api.vaultDepositor.genWithdrawTx || '', params);
  }
  getVaultDepositor(params: any) {
    return fetchApi.get(api.vaultDepositor.getVaultDepositor || '', params);
  }
  getStatistical(params: any) {
    return fetchApi.get(api.static.getStatistical || '', params);
  }
  getLatestRecord(address: string) {
    return fetchApi.get(api.static.getLatestRecord + `/${address}`, {});
  }
  getTotalStatistical(params: any) {
    return fetchApi.get(api.static.getTotalStatistical || '', params);
  }
  getTotalLastRecord() {
    return fetchApi.get(api.static.getTotalLastRecord, {});
  }
  updateTxHistory(params: any) {
    return fetchApi.post(api.txHistory.update || '', params);
  }
  getTxHistoryList(params: any) {
    return fetchApi.get(api.txHistory.list || '', params);
  }
}

const vaultService = new VaultService();
export default vaultService;