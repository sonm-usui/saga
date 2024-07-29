import { useState } from 'react';
import './Tabs.scss';
import {
  Tab as ReactTab,
  Tabs as ReactTabs,
  ReactTabsFunctionComponent,
  TabList,
  TabPanel,
  TabProps
} from 'react-tabs';
import SurveyForm from '../SurveyForm/SurveyForm';

interface TabsProps {
  className?: string;
  tabItems: string[];
  setSelectedIndex?: (index: number) => void;
  initialSelectedIndex?: number;
}

const Tab: ReactTabsFunctionComponent<TabProps> = ({ children, ...otherProps }: TabProps) => (
  <ReactTab {...otherProps}>
    <div className="tab-inner">
      <h1>{children}</h1>
    </div>
  </ReactTab>
);

Tab.tabsRole = 'Tab';

const Tabs = ({ className, tabItems, setSelectedIndex, initialSelectedIndex }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedIndex || 0);
  return (
    <ReactTabs
      selectedIndex={selectedTab}
      onSelect={(index) => setSelectedTab(index)}
      className={`tabs ${className} ${selectedTab === -1}`}>
      <TabList>
        <Tab>About</Tab>
        <Tab>Register</Tab>
      </TabList>

      <TabPanel>
        <div className="text">
          Coala Pay combines best-in-class international aid due diligence processes with
          state-of-the-art KYC to ensure all marketplace partners are thoroughly vetted.
          <br />
          <br />
          All aid recipient partners undergo a thorough review of their registration documents,
          organisational structures, and capacity to implement aid activities in their proposed
          geographies.
          <br />
          <br />
          Where possible, Coala Pay also conducts a review of partners’ financial accounting,
          including current sources of funding, and recent monitoring and evaluation reports.
          <br />
          <br />
          When necessary, Coala Pay also reviews partners’ social media footprint and conducts a
          community assessment to ensure their activities are supported by the communities in which
          they work and are undertaken respectfully and effectively.
          <br />
          <br />
          In order to reach smaller or informal partners, for instance, refugee-led organisations,
          Coala Pay partners with CertiK to provide a full KYC of organisation leadership in
          contexts which lack sufficiently rigorous or safe local registration requirements.
          <br />
          <br />
          This process includes a liveness check, assesses partner staff against current sanctions
          or politically exposed persons lists, and reviews wallet transactions to ensure all
          partners comply with AML standards.
        </div>
      </TabPanel>
      <TabPanel>
        <div className="survey-form">
          <SurveyForm />
        </div>
      </TabPanel>
    </ReactTabs>
  );
};

export default Tabs;
