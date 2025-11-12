import { DataListWrapper } from "../style";

export interface IData {
  label: string;
  value: number | string;
  type: string;
  key: string;
  style?: any;
}

interface IDataList {
  list: IData[]
}

const DataList = (props: IDataList) => {
  const { list } = props;
  return <DataListWrapper>
    {
      list.map((item, index) => (
        <div key={index} className="data-item" style={index % 2 === 0 ? { justifyContent: 'flex-start', ...item.style } : { justifyContent: 'flex-end', ...item.style }}>
          <div className="data-label">{item.label}</div>
          {item.type === 'number' && <div className="data-value">${item.value}</div>}
          {item.type === 'string' && <div className="data-value">{item.value}</div>}
        </div>
      ))
    }
  </DataListWrapper>
}

export default DataList