import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%'
});


export const Title = styled('h1')({
  marginTop: '3px',
  fontSize: '20px',
  color: COLORS.secondary,
  fontFamily:FONTS_FAMILY.regular.title,
  fontWeight: 'bold',
  textAlign:'left',
});

export const LineDivider = styled('div')({
  width: '100%',
  height: '1px',
  backgroundColor: COLORS.secondary
});
