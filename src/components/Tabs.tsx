import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsProps) {
  return (
    <div className={`tabs-container ${className}`}>
      <div className="tabs-list" role="tablist" aria-label="Sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) =>
        tab.id === activeTab ? (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="tab-panel"
          >
            {tab.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
