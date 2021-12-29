import { color, styled } from '@mui/system';
import Paper from '@mui/material/Paper';

import NotificationsIcon from '@mui/icons-material/Notifications';
import COLORS from '../../../theme/Colors';
import { MenuItem, MenuList } from '@mui/material';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  cursor:'pointer',
  zIndex:1000

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
  boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
  marginTop:'10px',
  minWidth:'200px',
});

export const NotificationContainer = styled('div')(props =>({
  display:'flex',
  flexDirection:'column',
  textAlign:'left',
  width:'380px',
  minHeight:'10px',
  backgroundColor: props.isRecent ? COLORS.white : COLORS.fieldGray,
  '&:hover':{
    backgroundColor:COLORS.snow,
    cursor:'pointer'
  }
}))

export const NotificationTitle = styled('h3')({
  margin:'10px',
  marginTop:'5px',
  width: '100%',
  fontFamily: FONTS_FAMILY.regular.title,
  textAlign:'left',
  fontSize: '15px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1, /* number of lines to show */
  '-webkit-box-orient': 'vertical',
});

export const NotificationText = styled('p')({
  margin:'10px',
  marginTop:'5px',
  width: '100%',
  textAlign:'left',
  fontFamily: FONTS_FAMILY.regular.body,
  fontSize: '13px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3, /* number of lines to show */
  '-webkit-box-orient': 'vertical',
});