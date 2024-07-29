import './chart.scss';
import { Pie } from 'react-chartjs-2';
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
export const Chart = () => {
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

  function shuffle(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateRandomColors(num: number) {
    const baseColorsArray = Object.values(baseColors).flat();
    const shuffledColors = shuffle(baseColorsArray.slice());

    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(shuffledColors[i % shuffledColors.length]);
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
          <div className="country-item ">
            <p>GLOBAL DISTRIBUTION</p>
            {!!userStats?.countries_data?.length &&
              userStats?.countries_data?.map((res) => {
                return (
                  <div className="country" key={res?.name}>
                    <div>{res?.name}</div>
                  </div>
                );
              })}
          </div>
          <div className="activities-item">
            <div>
              <p className="title">FUNDED ACTIVITIES</p>
              <div className="pie-label">
                {userStats?.activities?.map((act, index) => {
                  return (
                    <div key={index} className="label">
                      <p style={{ color: colors[index] }}> . </p>
                      <p>{act.name}</p>
                    </div>
                  );
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
