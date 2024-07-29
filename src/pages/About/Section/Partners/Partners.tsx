import './Partners.scss';
import MasterCardSvg from '../../../../assets/images/svgs/MasterCardSvg';
import CertikSvg from '../../../../assets/images/svgs/CertikSvg';
import LatticeSvg from '../../../../assets/images/svgs/LatticeSvg';
import CvvcSvg from '../../../../assets/images/svgs/CvvcSvg';
import factorCapital from '../../../../assets/images/svgs/factor-capital.svg';
import batchery from '../../../../assets/images/svgs/batchery.svg';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  return (
    <div className="partners" id="partners" ref={ref}>
      <div className="container">
        <div className="list-partners">
          <motion.div
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 0.9s',
              transitionDelay: '0.2s'
            }}
            className="item-partner">
            <LatticeSvg />
          </motion.div>
          <motion.div
            animate={controls}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 0.9s',
              transitionDelay: '0.3s'
            }}
            className="item-partner">
            <CvvcSvg />
          </motion.div>
          <motion.div
            animate={controls}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 0.9s',
              transitionDelay: '0.4s'
            }}
            className="item-partner">
            <img src={factorCapital} alt="" />
          </motion.div>
          <motion.div
            animate={controls}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 0.9s',
              transitionDelay: '0.5s'
            }}
            className="item-partner">
            <img src={batchery} alt="" />
          </motion.div>
        </div>
        <motion.div
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            opacity: hasAnimated ? 1 : 0,
            scale: hasAnimated ? 1 : 0,
            transition: 'all 0.9s',
            transitionDelay: '0.8s'
          }}
          className="content">
          <div className="left">
            <div className="topic">Our Funding</div>
            <div className="content-topic">
              Coala Pay is supported by an outstanding group of investors with grant funding from
              Coinbase Giving and Stellar Development Foundation.
            </div>
          </div>
          <div className="right">
            <div className="topic">Our partners</div>
            <div className="content-topic">Our partners make our work possible.</div>
            <div className="list-card">
              <a>
                <MasterCardSvg />
              </a>
              <a>
                <CertikSvg />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
