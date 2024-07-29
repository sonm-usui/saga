import { useEffect, useRef, useState } from 'react';
import './WhatWeDo.scss';
import leafGreen from '../../../../assets/images/pngs/leaf-green.png';
import { map } from 'lodash';
import { motion, useInView } from 'framer-motion';

const WhatWeDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const [active, setActive] = useState(1);
  const data = [
    {
      index: '01',
      title: 'Private Marketplaces',
      content:
        'Aid sector users, from international non profits to aid consortiums, use Coala Pay for programme management and payments. These private marketplaces help institutional users manage and distribute money allocated by large aid donors to country or even region-wide aid responses via networks of international and national aid delivery partners.'
    },
    {
      index: '02',
      title: 'Tailored Support',
      content:
        'Aid sector users can customise their private marketplaces to fit their unique program needs. Coala Pay provides these users with Third Party Monitoring (TPM) and evaluation support, as required.'
    },
    {
      index: '03',
      title: 'Web3 Impact',
      content:
        'Coala Pay offers web3 communities a frictionless social impact experience. Coala Pay works with various protocols to provide blockchain-based projects and businesses with an ‘opt in to donate’-style function at their point of sale.'
    },
    {
      index: '04',
      title: 'Smart Aid',
      content:
        'Our smart contracts move donated funds directly to proposed aid activities on the public marketplace. Web3 communities can choose to curate the activities they fund or delegate that option to individual members. From food distributions to environmental protection, choose from more than 20 unique activity types, knowing money goes directly to thoroughly vetted grassroots aid interventions - no unseen middlemen.'
    }
  ];
  return (
    <div className="whatwedo" id="whatwedo" ref={ref}>
      <motion.div
        animate={hasAnimated ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        ref={ref}
        className="container">
        <div className="title">what we do</div>
        <div className="des">
          <div className="text">Coala Pay is a network of aid funding marketplaces.</div>
          <img src={leafGreen} alt="" />
        </div>
        <motion.div
          className="content"
          initial={{ y: 300, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}>
          {map(data, (item, index) => (
            <div
              key={index}
              className={`item ${active === index + 1 ? 'active' : 'inactive'}`}
              onClick={() => setActive(index + 1)}>
              <div className="index-item">{item.index}</div>
              <div className="content-item">
                <div className="title-item">{item.title}</div>
                <div className="des-item">{item.content}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatWeDo;
