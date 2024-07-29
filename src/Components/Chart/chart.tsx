import Leaf1 from '../../assets/images/svgs/Leaf1';
import Leaf2 from '../../assets/images/svgs/Leaf2';
import Leaf3 from '../../assets/images/svgs/Leaf3';
import Leaf4 from '../../assets/images/svgs/Leaf4';
import Leaf5 from '../../assets/images/svgs/Leaf5';
import './chart.scss';
import { Pie } from 'react-chartjs-2';

import { Tabs } from '../../Components';
import { nftService } from '../../services';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';
import { selectorNftUserStats, selectorNftUserTokens } from '../../store/Nft/selectors';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
  // Register the ArcElement to avoid the "arc is not a registered element" error
} from 'chart.js';

// Register the necessary components
ChartJS.register(Title, Tooltip, Legend, ArcElement);
export const Chart: React.FC = () => {
  const { handleGetNftUserStats, handleGetNftUserTokens } = nftService();
  const userStats = useAppSelector(selectorNftUserStats);
  const userTokens = useAppSelector(selectorNftUserTokens);
  const baseColors = {
    neon: [
      'rgba(57, 255, 20, 0.8)', // Neon green
      'rgba(255, 20, 147, 0.8)', // Neon pink
      'rgba(0, 255, 255, 0.8)', // Neon cyan
      'rgba(255, 165, 0, 0.8)' // Neon orange
    ]
  };
  const colors = generateRandomColors(userStats?.activities?.length ?? 0);
  function getRandomColor() {
    const colors = Object.values(baseColors).flat(); // Flatten the array of color variants
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function generateRandomColors(num: number) {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  }
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: userStats?.activities.map((res) => res.amount),
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('rgba', 'rgba').replace(', 0.6)', ', 1)')),
        borderWidth: 1
      }
    ]
  };
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
        <div className="impact-title">
          Lorem ipsum dolor sit amet, In elit viverra ultrices lectus, non rhoncus consectetur
          adipiscing elit.
        </div>
        <p className="sub-impact-title">my impact</p>
        {userStats && (
          <div className="impact-container">
            <div className="impact-card">
              <div className="estimated">{userStats?.beneficiaries_count}</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>BENEFICIARIES TO DATE</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">{userStats?.countries_data?.length}</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>COUNTRIES PROVIDED WITH AID</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">{userStats.usd}%</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>MORE THAN OTHER FUNDERS</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">2000</div>
              <div className="card-description">
                <div className="card-icon"></div>
                <p>ETH INVESTED IN CHANGE</p>
              </div>
            </div>
          </div>
        )}
        <div className="countries-container">
          <div className="country-item">
            <p className="container-title">GLOBAL DISTRIBUTION</p>
            <div className="country-list">
              {!!userStats?.countries_data?.length &&
                userStats?.countries_data?.map((res) => {
                  return (
                    <div className="country" key={res?.name}>
                      <div>{res?.name}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="activities-item">
            <div>
              <p className="container-title">FUNDED ACTIVITIES</p>
              <div className="pie-label">
                {userStats?.activities?.map((act, index) => {
                  return <p key={index}>{act.name}</p>;
                })}
              </div>
            </div>
            <div className="pie-container">
              <Pie style={{ height: '300px', width: '300px' }} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
