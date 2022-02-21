import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  width:'100%',
  height:'100%',
  backgroundColor:COLORS.white,
});


export const Title = styled('h1')({
  color: COLORS.black,
  fontFamily: FONTS_FAMILY.regular.body,
  '@media (min-width:320px)': {
    fontSize: '25px',
  },
  '@media (min-width:768px)': {
    fontSize: '28px',
  },
  '@media (min-width:1200px)': {
    fontSize: '30px',
  }
});

export const LogoImage = styled('img')({
  '@media (min-width:320px)': {
      width: '75%',
      margin: '10%',
  },
  '@media (min-width:768px)': {
      width: '75%',
      margin: '17%',

  },
  '@media (min-width:1200px)': {
      width: '50%',
      margin: '15%',

  },
});
