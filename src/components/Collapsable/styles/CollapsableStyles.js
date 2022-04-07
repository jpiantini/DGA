import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  //borderWidth: '0.5px',
  borderRadius: '30px',
  //borderColor: COLORS.secondary,
  //border: ` 0px solid ${COLORS.secondary}`,
  '&:hover': {
    backgroundColor: COLORS.snow,
    cursor: 'pointer'
  }
});

export const ItemsContainer = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'column',
  width: '96%',
  alignSelf: 'center',
}));

export const RowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
});

export const Title = styled('p')({
  textTransform: 'uppercase',
  margin: '0px',
  fontSize: '20px',
  color: COLORS.secondary,
  fontFamily: FONTS_FAMILY.regular.body,
  textAlign: 'left',
});

export const LineDivider = styled('div')({
  width: '100%',
  height: '1px',
  backgroundColor: COLORS.secondary
});


export const BodyText = styled('p')(props => ({
  display: 'flex',
  margin: 0,
 // textAlign: 'left',
  fontSize: '15px',
  color: COLORS.black,
  fontFamily: FONTS_FAMILY.regular.body,
  textAlign:'justify'

}));