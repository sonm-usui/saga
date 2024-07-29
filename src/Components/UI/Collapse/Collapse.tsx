import React, { ReactNode } from 'react';
import { Collapse, CollapseProps } from 'antd';
const { Panel } = Collapse;
import './Collapse.scss';
import ArrowDownSvg from '../../../assets/images/svgs/ArrowDownSvg';

interface CollapseComponentProps extends CollapseProps {
  className?: string;
  wrapIconClassName?: string;
  panelHeader: string;
  children: ReactNode;
  defaultActiveKey?: string[];
  expandedIconJSX?: ReactNode;
  unexpandedIconJSX?: ReactNode;
}

const CollapseComponent: React.FC<CollapseComponentProps> = ({
  className = '',
  wrapIconClassName = 'icon',
  panelHeader,
  children,
  defaultActiveKey = ['1'],
  expandedIconJSX = <ArrowDownSvg className="icon-unexpanded" />,
  unexpandedIconJSX = <ArrowDownSvg />
}) => {
  return (
    <Collapse
      className={`collapse-component ${className}`}
      defaultActiveKey={defaultActiveKey}
      ghost
      expandIconPosition="end"
      expandIcon={({ isActive }) =>
        isActive ? (
          <div className={wrapIconClassName}>{expandedIconJSX}</div>
        ) : (
          <div className={wrapIconClassName}>{unexpandedIconJSX}</div>
        )
      }>
      <Panel header={panelHeader} key="1">
        {children}
      </Panel>
    </Collapse>
  );
};

export default CollapseComponent;
