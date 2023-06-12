import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./FilterTabs.css";

export interface IFilterTabsProps {
  names: string[];
  active: string;
  setActive: (name: string) => void;
}

export default function FilterTabs({
  names,
  active,
  setActive,
}: IFilterTabsProps) {
  return (
    <Tabs
      activeKey={active}
      onSelect={(name) => setActive(name!)}
      className="border-bottom-0"
    >
      {names.map((name) => (
        <Tab key={name} eventKey={name} title={name}></Tab>
      ))}
    </Tabs>
  );
}
