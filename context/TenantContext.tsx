'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type StoreInfo = {
  id: string;
  tenantId?: string;
  shopDomain: string;
  accessToken?: string;
  createdAt?: string;
};

type TenantContextValue = {
  stores: StoreInfo[];
  selected: StoreInfo | null;
  addStore: (s: StoreInfo) => void;
  selectStore: (s: StoreInfo | string | null) => void;
  removeStore: (id: string) => void;
};

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

const STORES_KEY = 'onboardedStores_v1';
const SELECTED_KEY = 'selectedStore_v1';

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<StoreInfo[]>([]);
  const [selected, setSelected] = useState<StoreInfo | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORES_KEY);
      const parsed: StoreInfo[] = raw ? JSON.parse(raw) : [];
      setStores(parsed);
      const selRaw = localStorage.getItem(SELECTED_KEY);
      if (selRaw) setSelected(JSON.parse(selRaw));
      else if (parsed.length) {
        setSelected(parsed[0]);
        localStorage.setItem(SELECTED_KEY, JSON.stringify(parsed[0]));
      }
    } catch (e) {
      console.error('Tenant load error', e);
    }
  }, []);

  const persist = (next: StoreInfo[]) => {
    setStores(next);
    localStorage.setItem(STORES_KEY, JSON.stringify(next));
  };

  const addStore = (s: StoreInfo) => {
    const next = [s, ...stores.filter(x => x.id !== s.id)];
    persist(next);
    selectStore(s);
  };

  const selectStore = (s: StoreInfo | string | null) => {
    let next: StoreInfo | null = null;
    if (typeof s === 'string') next = stores.find(x => x.id === s) ?? null;
    else next = s;
    setSelected(next);
    localStorage.setItem(SELECTED_KEY, JSON.stringify(next));
  };

  const removeStore = (id: string) => {
    const next = stores.filter(s => s.id !== id);
    persist(next);
    if (selected?.id === id) {
      const newSel = next[0] ?? null;
      setSelected(newSel);
      localStorage.setItem(SELECTED_KEY, JSON.stringify(newSel));
    }
  };

  return (
    <TenantContext.Provider value={{ stores, selected, addStore, selectStore, removeStore }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
};
