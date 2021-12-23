import { TextField } from '@mui/material';

import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop:'10px'
});

export const StyledOption = styled('option')({
  fontSize:'18px',
});

export const Title = styled('h1')({
  marginTop: '3px',
  color: COLORS.black,
  fontFamily: 'Nunito Sans',
  fontWeight: '400',
  '@media (min-width:320px)': {
    fontSize: '11px',
  },
  '@media (min-width:768px)': {
    fontSize: '15px',
  },
  '@media (min-width:1200px)': {
    fontSize: '17px',
  }
});