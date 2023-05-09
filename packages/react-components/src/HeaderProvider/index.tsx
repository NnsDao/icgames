import React, { createContext, useContext, useState } from "react";

// 定义 Context 对象
interface IHeaderContext {
  backdropFilter: string;
  setBackdropFilter: React.Dispatch<React.SetStateAction<string>>;
}
const HeaderContext = createContext<IHeaderContext | undefined>(undefined);

// 定义 Provider 组件
export const HeaderProvider: React.FC = ({ children }) => {
  const [backdropFilter, setBackdropFilter] = useState("blur(10px)");

  return (
    <HeaderContext.Provider value={{ backdropFilter, setBackdropFilter }}>
      {children}
    </HeaderContext.Provider>
  );
};

// 自定义 hook，用于访问全局状态
export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within an HeaderProvider");
  }

  return context;
};