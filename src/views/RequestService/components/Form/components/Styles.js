import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';

export const GridContainer = styled('div')({
    backgroundColor: COLORS.snow
});

export const BodyText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '18px',
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.regular.body,
});