import './Funding.scss';
import DotSvg from '../../../../assets/images/svgs/DotSvg';
import leafGreen from '../../../../assets/images/pngs/leaf-green.png';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Funding = () => {
  const controls = useAnimation();
  const leftRef = useRef(null);
  const isInView = useInView(leftRef);
  const ref = useRef<null | HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  return (
    <div className="funding" id="funding">
      <div className="container">
        <motion.div
          animate={controls}
          style={{
            opacity: hasAnimated ? 1 : 0,
            scale: hasAnimated ? 1 : 0,
            transition: 'all 0.9s'
          }}
          className="funding-top">
          <div className="title-funding">
            Founded by former humanitarians, Coala Pay is making aid funding better for everybody.
          </div>
          <img className="leaf-1" src={leafGreen} alt="" />
          <img className="leaf-2" src={leafGreen} alt="" />
        </motion.div>
        <div className="content">
          <motion.div
            ref={leftRef}
            animate={controls}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 0.9s'
            }}
            className="left">
            <div className="title-left">Who is it for?</div>
            <br />
            <div>
              International non profits
              <br />
              Charitable Foundations
              <br />
              Family offices
              <br />
              Web3 projects and businesses
              <br />
              Registered charities
              <br />
              Local aid organisations
            </div>
          </motion.div>
          <motion.div
            animate={controls}
            style={{
              opacity: hasAnimated ? 1 : 0,
              scale: hasAnimated ? 1 : 0,
              transition: 'all 1.5s'
            }}
            className="right">
            <b className="title-right">Public & Private Sector</b>
            <br />
            <br />
            Our public aid funding marketplace makes it easier than ever to find and fund truly
            grassroots aid initiatives, enabling web3 communities to achieve sustainable social
            impact.
            <br />
            <br />
            Our programme management and payments tools are available to institutional users. From
            local partner identification to rapid needs assessments, subgrantee due diligence,
            payments, and anticipatory action, Coala Pay is designed to get{' '}
            <span>money where it needs to go - fast.</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
