import React from 'react';
import EthereumSvg from '../../../../assets/images/svgs/EthereumSvg';
import { IProjectItem } from '../../data';
import InfoProject from './info/info';
import './ItemProject.scss';
import {
  Button,
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { replace } from 'lodash';
import { appPaths } from '../../../../constants';

interface IProps {
  item: IProjectItem;
}

const ItemProject = (props: IProps) => {
  const { item } = props;
  return (
    <div className="item-project">
      <div className="item-project-left" style={{ backgroundColor: `${item.image}` }} />
      <div className="item-project-right">
        <div className="item-project-right-title">{item.title}</div>
        <div className="item-project-right-description">{item.description}</div>
        <div className="item-project-right-fund">
          <Button
            type={ButtonTypes.filled}
            size={ButtonSizes.smallMedium}
            color={ButtonColors.black}
            background={ButtonBackgrounds.green}
            className="item-project-right-fund-btn">
            <p className="item-project-right-fund-text">
              Fund Now:&nbsp; <EthereumSvg fill="black" /> &nbsp; <span>{item.fund}</span>
            </p>
          </Button>
        </div>
        <div className="item-project-right-info">
          {item.info.map((item, index) => (
            <Link to={replace(appPaths.organizationDetails.path, ':id', String(1))} key={index}>
              <InfoProject image={item.title} value={item.value} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemProject;
