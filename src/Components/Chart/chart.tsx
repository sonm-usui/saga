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
import EthereumSvg from '../../assets/images/svgs/EthereumSvg';
import InfoHeaderSvg from '../../assets/images/svgs/InfoHeaderSvg';

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
        <p className="sub-impact-title">my impact</p>
        {userStats && (
          <div className="impact-container">
            <div className="impact-card">
              <div className="estimated">{userStats?.beneficiaries_count}</div>
              <div className="card-description">
                <InfoHeaderSvg className="card-icon" />
                <p>BENEFICIARIES TO DATE</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">{userStats?.countries_data?.length}</div>
              <div className="card-description">
                <InfoHeaderSvg className="card-icon" />
                <p>COUNTRIES PROVIDED WITH AID</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">{userStats.usd}%</div>
              <div className="card-description">
                <InfoHeaderSvg className="card-icon" />
                <p>MORE THAN OTHER FUNDERS</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="estimated">2000</div>
              <div className="card-description">
                <InfoHeaderSvg className="card-icon" />
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
            <p className="container-title">FUNDED ACTIVITIES</p>
            <div className="container-info">
              <div className="pie-label">
                {userStats?.activities?.map((act, index) => {
                  return (
                    <div key={index} className="label">
                      <div className="pie-legend" style={{ backgroundColor: colors[index] }}></div>
                      <p>{act.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="pie-container">
                <Pie style={{ height: '300px', width: '300px' }} data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio">
          <p className="container-title">My portfolio</p>
          <div className="portfolio-container">
            {[...Array(4)].map((index) => (
              <div className="portfolio-card" key={index}>
                <div className="portfolio-card--img">image maybe</div>
                <div className="portfolio-card--details">
                  <p className="portfolio-card--desc">
                    Urgent roof repair for School in Northern Shan
                  </p>
                  <div className="portfolio-card--info">
                    <div className="portfolio-card--category">
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <mask
                          id="mask0_10_16475"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="22"
                          height="20">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 0H21.4159V20H0V0Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask0_10_16475)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.3564 8.3472L3.03418 6.22461V15.6344H10.3564V8.3472ZM0 17.2168H21.4159V20.0009H0V17.2168ZM10.8344 0C12.7979 0 14.3897 1.59179 14.3897 3.55529C14.3897 5.5185 12.7979 7.11014 10.8344 7.11014C8.87092 7.11014 7.27929 5.51851 7.27929 3.55529C7.27929 1.59179 8.87092 0 10.8344 0ZM18.5577 10.0454H18.6343L18.59 10.0449C19.6303 10.0449 20.4737 10.9161 20.4737 11.9904C20.4737 13.0498 19.6541 13.9113 18.6341 13.9354V15.6341H11.3115V8.3472L18.6341 6.22461V13.9356L18.5898 13.9364C17.5497 13.9364 16.7063 13.0655 16.7063 11.9906C16.7063 10.9275 17.5324 10.0638 18.5574 10.0456L18.5577 10.0454ZM3.03462 10.0454L3.07831 10.0449C2.03816 10.0449 1.19482 10.9161 1.19482 11.9904C1.19482 13.0499 2.01467 13.9114 3.03449 13.9354L3.07818 13.9362C4.11881 13.9362 4.96215 13.0653 4.96215 11.9904C4.96215 10.9273 4.13605 10.0636 3.11045 10.0454H3.03433H3.03462Z"
                            fill="#1D1B1E"
                          />
                        </g>
                      </svg>

                      <p>Education</p>
                    </div>
                    <p className="portfolio-card--by">By: The NSSYN</p>
                  </div>
                </div>
                <div className="portfolio-card--fund">
                  <p>Funded:</p>
                  <div className="ethPrice">
                    <EthereumSvg fill="black" />
                    <p>1.5 Eth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="survey-title">
          Want to know more about your impact? <span>Send a survey</span> to your beneficiaries with
          Billy!
        </div>
      </div>
    </div>
  );
};
