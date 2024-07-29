import Leaf1 from '../../assets/images/svgs/Leaf1';
import Leaf2 from '../../assets/images/svgs/Leaf2';
import Leaf3 from '../../assets/images/svgs/Leaf3';
import Leaf4 from '../../assets/images/svgs/Leaf4';
import Leaf5 from '../../assets/images/svgs/Leaf5';
import './Home.scss';
import { Tabs } from '../../Components';
import { nftService } from '../../services';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';
import { selectorNftUserStats, selectorNftUserTokens } from '../../store/Nft/selectors';

export const Home: React.FC = () => {
  const { handleGetNftUserStats, handleGetNftUserTokens } = nftService();
  const userStats = useAppSelector(selectorNftUserStats);
  const userTokens = useAppSelector(selectorNftUserTokens);

  if (userStats && userTokens) {
    console.log(userStats);
    debugger;
  }
  useEffect(() => {
    handleGetNftUserStats('0x02a7A2EEFCa4718BF56D265361B11392F55947d6');
    handleGetNftUserTokens('0x02a7A2EEFCa4718BF56D265361B11392F55947d6');
  }, []);
  return (
    <div className="homepage">
      <div className="container">
        <div className="homepage__content">
          <div className="homepage__title">
            <div className="homepage__title-text">
              <p>
                Better <span>aid</span> for
              </p>
              <div className="leaf-1">
                <Leaf1 />
              </div>
              <div className="leaf-2">
                <Leaf2 />
              </div>
            </div>
            <div className="homepage__title-text">
              <p>everybody</p>
              <div className="leaf-3">
                <Leaf3 />
              </div>
              <div className="leaf-4">
                <Leaf4 />
              </div>
              <div className="leaf-5">
                <Leaf5 />
              </div>
            </div>
          </div>
        </div>
        <div className="impact-title">
          Lorem ipsum dolor sit amet, In elit viverra ultrices lectus, non rhoncus consectetur
          adipiscing elit.
        </div>
        {userStats && (
          <div className="my-impact-container">
            <div className="my-impact-card">
              <div className="estimated">{userStats?.beneficiaries_count}</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>BENEFICIARIES TO DATE</p>
              </div>
            </div>
            <div className="my-impact-card">
              <div className="estimated">{userStats?.countries_data?.length}</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>COUNTRIES PROVIDED WITH AID</p>
              </div>
            </div>
            <div className="my-impact-card">
              <div className="estimated">{userStats.usd}%</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>MORE THAN OTHER FUNDERS</p>
              </div>
            </div>
            <div className="my-impact-card">
              <div className="estimated">2000</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>ETH INVESTED IN CHANGE</p>
              </div>
            </div>
          </div>
        )}

        <div className="countries-container">
          {!!userStats?.countries_data?.length &&
            userStats?.countries_data?.map((res) => {
              return (
                <div className="country" key={res?.name}>
                  <div>{res?.name}</div>
                </div>
              );
            })}
        </div>

        {/* <div className="homepage__menu">
          <HomeMenu />
        </div> */}
      </div>
    </div>
  );
};
