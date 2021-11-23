import { height, styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderWidth:'0.5px',
  borderColor:COLORS.secondary,
  border:` 1px solid ${COLORS.secondary}`,
});

export const ItemsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '98%',
  justifyContent:'center',
  alignSelf:'center'
});

export const RowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'space-between'
});



export const Title = styled('h1')({
  textTransform:'uppercase',
  margin: '0px',
  fontSize: '20px',
  color: COLORS.secondary,
  fontFamily: 'Source Sans Pro',
  fontWeight: '400',
  textAlign:'left',
});

export const LineDivider = styled('div')({
  width: '100%',
  height: '1px',
  backgroundColor: COLORS.secondary
});
