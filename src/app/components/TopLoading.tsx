import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';

import { RootState } from '@/store';

const TopLoading = () => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  return isLoading ? <LinearProgress color="secondary" /> : null;
};

export default TopLoading;

