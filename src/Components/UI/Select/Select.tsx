import { Select, SelectProps } from 'antd';
import React from 'react';
import './Select.scss';
import ArrowDownSvg from '../../../assets/images/svgs/ArrowDownSvg';

interface SelectComponentProps extends SelectProps {
  className?: string;
  onSelectFunc?: (value: any, option: any) => void;
  onDeselect?: (value: any, option: any) => void;
  options: any[];
  placeholder?: string;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
  initialValue?: any;
  showSearch?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  className = '',
  onSelectFunc,
  onDeselect,
  options,
  placeholder,
  mode,
  disabled,
  initialValue,
  showSearch = false,
  ...selectProps
}) => {
  return (
    <Select
      {...selectProps}
      mode={mode ? mode : undefined}
      placeholder={placeholder}
      options={options}
      bordered={false}
      value={initialValue ? initialValue : undefined}
      className={`select ${className || ''}`}
      suffixIcon={<ArrowDownSvg fill="#1D1B1E" />}
      onSelect={onSelectFunc}
      onDeselect={onDeselect}
      disabled={disabled}
      showSearch={showSearch}
    />
  );
};

export default SelectComponent;
