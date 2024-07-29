import { motion, useInView } from 'framer-motion';
import './Diligence.scss';
import due1 from '../../../../assets/images/pngs/due-1.png';
import due2 from '../../../../assets/images/pngs/due-2.png';
import due3 from '../../../../assets/images/pngs/due-3.png';
import due4 from '../../../../assets/images/pngs/due-4.png';
import { Button } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import { useEffect, useRef, useState } from 'react';

const Diligence = ({ setIsOpen }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const hoverVariants = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div
      className="diligence"
      id="diligence"
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      variants={itemVariants}>
      <div className="container">
        <div className="title">Due Diligence</div>
        <motion.div className="des" variants={itemVariants}>
          Coala Pay combines best-in-class international aid due diligence processes with
          state-of-the-art KYC to ensure all marketplace partners are thoroughly vetted.
        </motion.div>
        <motion.div className="list-info" variants={containerVariants} ref={ref}>
          <motion.div className="item-info" variants={itemVariants}>
            All aid recipient partners undergo a thorough review of their registration documents,
            organisational structures, and capacity to implement aid activities in their proposed
            geographies.
          </motion.div>
          <motion.div className="item-info" variants={itemVariants}>
            Where possible, Coala Pay also conducts a review of partners’ financial accounting,
            including current sources of funding, and recent monitoring and evaluation reports.
          </motion.div>
          <motion.div className="item-info" variants={itemVariants}>
            When necessary, Coala Pay also reviews partners’ social media footprint and conducts a
            community assessment to ensure their activities are supported by the communities in
            which they work and are undertaken respectfully and effectively.
          </motion.div>
          <motion.div className="item-info" variants={itemVariants}>
            In order to reach smaller or informal partners, for instance, refugee-led organisations,
            Coala Pay partners with CertiK to provide a full KYC of organisation leadership in
            contexts which lack sufficiently rigorous or safe local registration requirements.
          </motion.div>
          <motion.div className="item-info" variants={itemVariants}>
            This process includes a liveness check, assesses partner staff against current sanctions
            or politically exposed persons lists, and reviews wallet transactions to ensure all
            partners comply with AML standards.
          </motion.div>
          <motion.div className="item-info" variants={itemVariants}>
            Coala Pay customises due diligence processes to fit contextual needs. This enables us to
            meet even the most stringent compliance requirements, while streamlining processes for
            local organisations.
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Diligence;
