import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义全局上下文的类型
interface GlobalContextType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // 全局状态示例
  const [page, setPage] = useState<string>('jdn');

  const value: GlobalContextType = {
    page, 
    setPage
  };



  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
