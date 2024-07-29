import { useAppDispatch } from '../../store';
import { actionGetNftUserStats, actionGetNftUserTokens } from '../../store/Nft/actions';

export const nftService = () => {
  const dispatch = useAppDispatch();

  const handleGetNftUserStats = async (user_address: string) => {
    dispatch(
      actionGetNftUserStats({
        params: {
          user_address
        }
      })
    );
  };

  const handleGetNftUserTokens = async (user_address: string) => {
    dispatch(
      actionGetNftUserTokens({
        params: {
          user_address
        }
      })
    );
  };

  return {
    handleGetNftUserStats,
    handleGetNftUserTokens
  };
};
