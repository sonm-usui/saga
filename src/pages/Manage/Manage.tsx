import { Card, Modal, Spin } from 'antd';
import './Manage.scss';
import React, { useEffect, useState } from 'react';
import { TOAST_MESSAGES } from '../../config';
import InfoSvg from '../../assets/images/svgs/InfoSvg';

const Manage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Modal.info({
      title: 'Swap & Send',
      content: TOAST_MESSAGES.squid.disclaimer
    });
  }, []);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}
      <div className="iframe-container">
        <iframe
          className="squid"
          title="squid_widget"
          width="420"
          height="700"
          src="https://widget.squidrouter.com/iframe?config=%7B%22integratorId%22%3A%22squid-swap-widget%22%2C%22companyName%22%3A%22Squid%22%2C%22style%22%3A%7B%22neutralContent%22%3A%22%234f4eff%22%2C%22baseContent%22%3A%22%230b0b09%22%2C%22base100%22%3A%22%23b0ff01%22%2C%22base200%22%3A%22%23fafafa%22%2C%22base300%22%3A%22%23fffdfd%22%2C%22error%22%3A%22%23ED6A5E%22%2C%22warning%22%3A%22%23FFB155%22%2C%22success%22%3A%22%232EAEB0%22%2C%22primary%22%3A%22%234f008d%22%2C%22secondary%22%3A%22%23b0ff01%22%2C%22secondaryContent%22%3A%22%23F7F6FB%22%2C%22neutral%22%3A%22%23FFFFFF%22%2C%22roundedBtn%22%3A%2226px%22%2C%22roundedCornerBtn%22%3A%22999px%22%2C%22roundedBox%22%3A%221rem%22%2C%22roundedDropDown%22%3A%2220rem%22%7D%2C%22slippage%22%3A1.5%2C%22infiniteApproval%22%3Afalse%2C%22enableExpress%22%3Atrue%2C%22apiUrl%22%3A%22https%3A%2F%2Fapi.squidrouter.com%22%2C%22comingSoonChainIds%22%3A%5B%5D%2C%22titles%22%3A%7B%22swap%22%3A%22Swap%22%2C%22settings%22%3A%22Settings%22%2C%22wallets%22%3A%22Wallets%22%2C%22tokens%22%3A%22Select%20Token%22%2C%22chains%22%3A%22Select%20Chain%22%2C%22history%22%3A%22History%22%2C%22transaction%22%3A%22Transaction%22%2C%22allTokens%22%3A%22Select%20Token%22%2C%22destination%22%3A%22Destination%20address%22%2C%22depositAddress%22%3A%22Deposit%20address%22%2C%22seimetamask%22%3A%22Important%20message!%22%7D%2C%22priceImpactWarnings%22%3A%7B%22warning%22%3A3%2C%22critical%22%3A5%7D%2C%22environment%22%3A%22mainnet%22%2C%22showOnRampLink%22%3Atrue%2C%22defaultTokens%22%3A%5B%5D%7D"
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={handleIframeLoad}
        />
        <div className="warning">
          <div className="title">
            <InfoSvg fillColor="#1677ff" /> Swap & Send
          </div>
          <div className="des">{TOAST_MESSAGES.squid.disclaimer}</div>
        </div>
      </div>
    </>
  );
};

export default Manage;
