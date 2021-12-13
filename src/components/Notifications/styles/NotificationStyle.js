import { color, styled } from '@mui/system';
import Paper from '@mui/material/Paper';

import NotificationsIcon from '@mui/icons-material/Notifications';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  cursor: 'pointer',
});

export const NotificationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '300px',
  '@media(max-width:768px)': {
    width: '250px',
  },
});

export const textContainer = styled('span')({
  boxSizing: 'inherit',
  justifyContent: 'center',
  overflow: 'hidden',
  '@media(max-width:768px)': {
    justifyContent: 'center',
  },
});
export const NotificationTitle = styled('h3')({
  width: '100%',
  fontFamily: 'Nunito Sans',
  textAlign: 'center',
  fontSize: '1rem',
});

export const NotificationText = styled('p')({
  width: '100%',
  fontFamily: 'Nunito Sans',

  textAlign: 'center',
});
export const StyledNotificationIcon = styled(NotificationsIcon)((props) => ({

  color: props.color === 'white' ? COLORS.white : COLORS.black,
  '&:hover,&:focus': {
    color: COLORS.primary,
  },
  '@media (min-width:768px)': {
    fontSize: '35px',
  },
  '@media (min-width:1200px)': {
    fontSize: '45px'
  },
}));

export const StyledPaper = styled(Paper)({
  boxShadow:
    '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
  marginTop: '2px',
  minWidth: '200px',
});
