// TabsDefault.js

import React, { useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function TabsDefault({ onSelectRole }) {
  const [activeTab, setActiveTab] = useState('teacher');

  const data = [
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];
  

  const handleTabChange = (value) => {
    setActiveTab(value);
    onSelectRole(value);
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value }) => (
          <TabPanel key={value} value={value}>
            { "Default content"} 
            {/* You can put any content you want here, or nothing if just switching tabs is enough */}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
