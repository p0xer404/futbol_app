import React, { useState } from 'react';

export const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      {children}
    </div>
  );
};

export const TabsList = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

export const TabsTrigger = ({ children, onClick }) => {
  return (
    <button
      className="tabs-trigger"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, isActive }) => {
  return (
    <div className={`tabs-content ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
};
