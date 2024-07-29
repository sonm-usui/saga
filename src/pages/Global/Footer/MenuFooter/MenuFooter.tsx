import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './MenuFooter.scss';

interface IMenuItem {
  value: string;
  path?: string;
}

interface IMenus {
  title: string;
  items: Array<IMenuItem>;
}

interface IProps {
  menus: Array<IMenus>;
}

const MenuFooter = (props: IProps) => {
  const { menus } = props;
  return (
    <Row justify="space-between">
      {menus.map(({ items, title }, index) => (
        <Col span={12} key={index}>
          {/* <div className="menuFooter_title">{title}</div> */}
          <div className="menuFooter_list">
            {items.map(({ value, path }) => (
              <Link to={path || '/'} key={value}>
                {value}
              </Link>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default MenuFooter;
