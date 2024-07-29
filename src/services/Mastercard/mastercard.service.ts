import { useAppDispatch } from '../../store';
import { actionGetUserBalance } from '../../store/Mastercard/actions';

export const mastercardService = () => {
  const dispatch = useAppDispatch();

  const handleGetUserBalance = async (alias: string) => {
    dispatch(
      actionGetUserBalance({
        alias
      })
    );
  };

  return {
    handleGetUserBalance
  };
};
