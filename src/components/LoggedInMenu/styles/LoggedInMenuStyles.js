import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  cursor: 'pointer',
});

export const UserImage = styled('img')({
  borderRadius: '100%',
  '@media (min-width:768px)': {
    height: '45px',
    width: '45px',
    },
  '@media (min-width:1200px)': {
    height: '60px',
    width: '60px',
  },
});

export const StyledPaper = styled(Paper)({
  boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
  marginTop: '10px',
  minWidth: '200px',
});

