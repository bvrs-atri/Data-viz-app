// context/DataContext.tsx
"use client";

import { Event, data as initialData } from "@/lib/data";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataContextType {
  data: Event[];
  setData: React.Dispatch<React.SetStateAction<Event[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Event[]>(initialData);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
