import { motion, useInView } from 'framer-motion';
import './WhyWeb3.scss';
import whyWeb3 from '../../../../assets/images/pngs/why-web3.png';
import { useEffect, useRef, useState } from 'react';

const WhyWeb3 = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (inView) {
      setHasAnimated(true);
    }
  }, [inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="whyweb3" id="whyweb3">
      <div className="container">
        <motion.div
          className="content"
          ref={ref}
          initial="hidden"
          animate={hasAnimated ? 'visible' : 'hidden'}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="left-text">
            <motion.div
              className="title"
              initial="hidden"
              animate={hasAnimated ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.8 }}>
              Why Web3
            </motion.div>

            <motion.div className="content-1" variants={fadeInUp}>
              It should be as easy to get money to a local aid organization halfway around the world
              as it is to chip in on a crowdfunding campaign for your neighbor, or donate to an
              international non profit organization.
            </motion.div>
            <motion.div className="content-2" variants={fadeInUp}>
              Legacy financial infrastructure was not built for international aid. Not only does
              that make it hard to know where and how to help when a crisis occurs, it makes the
              international aid sector itself slow and inefficient.
              <br />
              <br />
              We want to change all that. We’re building tools to support the aid sector in
              delivering its critical work faster and less expensively. We’re leveraging the
              decentralized nature and ethos of web3 to get more money to grassroots aid
              organizations working locally in their own communities.
              <br />
              <br />
              Because <span>international aid should feel more like mutual aid.</span>
            </motion.div>
          </div>
          <motion.img
            src={whyWeb3}
            alt=""
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyWeb3;
