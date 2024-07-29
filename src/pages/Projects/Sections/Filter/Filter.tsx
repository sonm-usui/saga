import React, { useEffect, useState } from 'react';
import CollapseComponent from '../../../../Components/UI/Collapse/Collapse';

import './Filter.scss';
import { IFilters, PROJECT_TYPE_FILTERS } from './data';
import { Button } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import SelectComponent from '../../../../Components/UI/Select/Select';

interface IFilterProps {
  // eslint-disable-next-line no-unused-vars
  initialFilter: { [key: string]: string | number };
  allFilters: IFilters[];
  onApplyFilter: (filter: { [key: string]: string | number }) => void;
}

export const Filter: React.FC<IFilterProps> = ({ onApplyFilter, initialFilter, allFilters }) => {
  const [filters, setFilters] = useState<any>(initialFilter);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);

  const handleApplyClick = () => {
    onApplyFilter(filters);
  };

  useEffect(() => {
    if (!projectTypes.includes('all')) {
      setFilters({ ...filters, filter_type: projectTypes.join(',') });
    }
  }, [projectTypes]);

  return (
    <div className="filter-projects">
      {/* <div className="filter-by">Filter By: </div> */}

      <CollapseComponent panelHeader="Filter By:" className="filter-projects-collapse">
        {allFilters.map((filter) => (
          <>
            <div className="item-filter">
              <div className="title-field">{filter.title}</div>
              {filter.filters === PROJECT_TYPE_FILTERS ? (
                <SelectComponent
                  mode="multiple"
                  options={filter.filters}
                  className="select-filter"
                  placeholder="Select type"
                  allowClear
                  initialValue={projectTypes}
                  maxCount={3}
                  onSelectFunc={(value) => {
                    setProjectTypes([...projectTypes, value]);
                  }}
                  onDeselect={(value) => {
                    setProjectTypes(projectTypes.filter((el) => el !== value));
                  }}
                />
              ) : (
                <SelectComponent
                  options={filter.filters}
                  className="select-filter"
                  placeholder="Select type"
                  allowClear
                  value={filters[filter.key] || 'all'}
                  initialValue={filters[filter.key] || 'all'}
                  onSelectFunc={(value) => {
                    setFilters({ ...filters, [filter.key]: value });
                  }}
                />
              )}
            </div>
          </>
        ))}
      </CollapseComponent>

      <Button
        className="filter-btn"
        type={ButtonTypes.filled}
        size={ButtonSizes.smallMedium}
        color={ButtonColors.white}
        background={ButtonBackgrounds.black}
        onClick={handleApplyClick}>
        apply filter
      </Button>
    </div>
  );
};

export default Filter;
