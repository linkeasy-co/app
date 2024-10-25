import React, { useEffect, useState } from 'react';
import '../styles/Tabs.scss'; // Crie o arquivo de estilos para customizar as abas

const Tabs = ({ tabs }) => {
  const firstAcess = localStorage.getItem('firstAcess');
  const chooseDate = localStorage.getItem('chooseDate');
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if(firstAcess) {
      setActiveTab(2);
    }if(chooseDate) {
      setActiveTab(1);
    }
  }, [firstAcess]);



  return (
    <div className="tabs">
      <div className="tab-headers">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
