import React, { useEffect, useState } from 'react';
import SelectComponent from '../../Components/UI/Select/Select';
import './Projects.scss';
import Filter from './Sections/Filter/Filter';
import { find, isEmpty, map, size } from 'lodash';
import { PAGINATES, ROLES, TYPE_MARKETPLACES_PRIVATE } from '../../config';
import {
  actionGetProjectList,
  actionGetStatisticsAccess,
  actionLeaveGetProjectList,
  actionLeaveGetStatisticsAccess
} from '../../store/Projects/actions';
import {
  selectorGetProjectsList,
  selectorGetStatisticsAccess
} from '../../store/Projects/selectors';
import { useAppDispatch, useAppSelector } from '../../store';
import { PpModal } from '../../Components/Modals';
import { RelatedProject } from '../../Components/RelatedProject/RelatedProject';
import { FILTERS, INITIAL_FILTERS } from './Sections/Filter/data';
import { PublicMarketSvg } from '../../assets/images/svgs/PublicMarketSvg';
import { PrivateMarketSvg } from '../../assets/images/svgs/PrivateMarketSvg';
import { selectorGetUser } from '../../store/Auth/selectors';
import { useSelector } from 'react-redux';
import { marketplaceAccessService } from '../../services';
import { selectorGetListMarketplaceApprove } from '../../store/MarketplaceAccess/selectors';
import { MarketPlaces } from '../../Components/UI/Button/enums';

const OPTION = [
  { value: '1', key: 'sort_fund_eth', sort: 'asc', label: 'Lowest cost' },
  { value: '2', key: 'sort_fund_eth', sort: 'desc', label: 'Highest cost' },
  { value: '3', key: 'sort_estimated_beneficiaries', sort: 'desc', label: 'Most Beneficiaries' },
  { value: '4', key: 'sort_estimated_beneficiaries', sort: 'asc', label: 'Least Beneficiaries' },
  { value: '5', key: 'sort_start_date', sort: 'asc', label: 'Earliest Start Date' }
  // { value: '6', key: 'sort_end_date', sort: 'desc', label: 'End Date' }
];

const Projects = () => {
  const user = useSelector(selectorGetUser);
  const projects = useAppSelector(selectorGetProjectsList);
  const statisticsAccess = useAppSelector(selectorGetStatisticsAccess);
  const dispatch = useAppDispatch();
  const [sortOption, setSortOption] = useState<{ [key: string]: string }>(OPTION[0]);
  const [filter, setFilter] = useState<{ [key: string]: string | number }>(INITIAL_FILTERS);
  const [typeMarket, setTypeMarket] = useState(1);
  const [marketPrivate, setMarketPrivate] = useState('');
  const { getListMarketplaceApprove } = marketplaceAccessService();
  const listMarketplace: any = useSelector(selectorGetListMarketplaceApprove);

  const [marketplaceAccess, setMarketplaceAccess] = useState<any>([]);

  const getTotalItem = (marketplace: string) => {
    if (!statisticsAccess) return 0;
    const res = find(statisticsAccess, (el: any) => el.marketplace === marketplace);
    return res ? res?.count : 0;
  };

  useEffect(() => {
    if (user) {
      getListMarketplaceApprove();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === ROLES.DONOR) {
      const findPublic = find(listMarketplace, (item: any) => item.value === MarketPlaces.PUBLIC);
      if (!findPublic) {
        setTypeMarket(2);
        setMarketPrivate(
          TYPE_MARKETPLACES_PRIVATE.find((el: any) => marketplaceAccess.includes(el.value) === true)
            ?.value || ''
        );
      } else {
        setTypeMarket(1);
      }
    }
  }, [listMarketplace, marketplaceAccess]);

  useEffect(() => {
    if (listMarketplace) {
      setMarketplaceAccess(
        map(listMarketplace, (item: any) => {
          return item.value;
        })
      );
    }
  }, [listMarketplace]);

  useEffect(() => {
    let _filter = {};
    if (typeMarket === 1) {
      _filter = { filter_marketplace: MarketPlaces.PUBLIC };
    } else {
      _filter = { filter_marketplace: marketPrivate };
    }
    setFilter({ ...filter, ..._filter });
  }, [marketPrivate, typeMarket]);

  const onFilterChange = (newFilter: { [key: string]: string | number }) => {
    const _filters = Object.keys(newFilter).reduce((acc, key) => {
      if (newFilter[key] !== 'all' && newFilter[key] !== 1) {
        acc[key] = newFilter[key];
      }
      return acc;
    }, {} as any);
    setFilter(_filters);
  };

  const mapFilters = (filter: { [key: string]: string | number }) => {
    const newFilter = Object.keys(filter).reduce((acc, key) => {
      if (filter[key] !== 'all' && filter[key] !== 1) {
        acc[key] = filter[key];
      }
      return acc;
    }, {} as any);
    return newFilter;
  };

  const fetchProjects = async () => {
    const mappedFilter = mapFilters(filter);
    const filter_marketplace = typeMarket === 2 ? marketPrivate : MarketPlaces.PUBLIC;
    if (!filter_marketplace) return;
    dispatch(
      actionGetProjectList({
        params: {
          page_size: PAGINATES.default.pageSize,
          page_index: PAGINATES.default.pageIndex,
          [sortOption.key]: sortOption.sort,
          filter_marketplace: filter_marketplace,
          ...mappedFilter
        }
      })
    );
    dispatch(
      actionGetStatisticsAccess({
        params: {
          page_size: PAGINATES.default.pageSize,
          page_index: PAGINATES.default.pageIndex,
          [sortOption.key]: sortOption.sort,
          ...mappedFilter,
          filter_marketplace: ''
        }
      })
    );
    return () => {
      dispatch(actionLeaveGetProjectList());
      dispatch(actionLeaveGetStatisticsAccess());
    };
  };
  useEffect(() => {
    fetchProjects();
  }, [sortOption, filter]);

  return (
    <div className="projects">
      <div className="projects-title">
        <div className="container">
          find & fund{' '}
          <div className="marketplace-type">
            <div className="left">
              {marketplaceAccess.includes(MarketPlaces.PUBLIC) && (
                <div
                  className="left-item type-public"
                  onClick={() => {
                    setTypeMarket(1);
                  }}>
                  <PublicMarketSvg fill={typeMarket === 1 ? '#B2FF00' : '#FFFFFF'} />
                  Public Marketplace
                  <div className="quantity">{getTotalItem(MarketPlaces.PUBLIC)}</div>
                </div>
              )}
              {(size(marketplaceAccess) > 1 ||
                (size(marketplaceAccess) && !marketplaceAccess.includes(MarketPlaces.PUBLIC))) && (
                <div
                  className="left-item"
                  onClick={() => {
                    setTypeMarket(2);
                    setMarketPrivate(
                      TYPE_MARKETPLACES_PRIVATE.find(
                        (el: any) => marketplaceAccess.includes(el.value) === true
                      )?.value || ''
                    );
                  }}>
                  <PrivateMarketSvg fill={typeMarket === 2 ? '#B2FF00' : '#FFFFFF'} />
                  PRIVATE MARKETPLACES
                </div>
              )}
            </div>
            {typeMarket === 2 && (
              <div className="right">
                {TYPE_MARKETPLACES_PRIVATE.map((item, index) => {
                  return marketplaceAccess.includes(item.value) ? (
                    <div
                      className={`right-item ${marketPrivate === item.value ? 'active' : ''}`}
                      key={index}
                      onClick={() => setMarketPrivate(item.value)}>
                      {item.label}
                      <div className="quantity">{getTotalItem(item.value)}</div>
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {/* <Explore
          explore={explore}
          onChangeExplore={onChangeExplore}
          totalProjects={size(projects?.items)}
        /> */}
        <div className="projects-main">
          <div className="projects-filter">
            <Filter initialFilter={filter} allFilters={FILTERS} onApplyFilter={onFilterChange} />
          </div>
          <div className="projects-content">
            <div className="projects-sort">
              <p>Sort By:</p>
              <SelectComponent
                options={OPTION}
                value={sortOption.value}
                initialValue={sortOption.value}
                className="projects-sort-select"
                placeholder="SORT BY"
                allowClear
                onSelectFunc={(_, option) => {
                  setSortOption(option);
                }}
              />
            </div>
            <div className="projects-list">
              {isEmpty(projects) ? (
                // <LoadingBox />
                <></>
              ) : (
                <>
                  <RelatedProject projects={projects?.items} title="" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PpModal />
    </div>
  );
};
export default Projects;
