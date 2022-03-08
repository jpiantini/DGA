import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';
import { BodyText } from '../../../theme/Styles';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
});

export const ButtonContainer = styled('div')({
    width: '200px',
    marginTop: '20px'
});

export const TextListContainer = styled('ul')({
    margin: 0,
    paddingLeft: 17
});

export const TextOrderedListContainer = styled('ol')({
    margin: 0,
    paddingLeft: 17
});

export const PriceContainer = styled('div')({
    width: '100%',
    textAlign:'left'
});

export const CardPriceTitle = styled(BodyText)({
    marginTop:'5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    fontFamily: FONTS_FAMILY.regular.body,
});

export const CardPriceGray = styled(BodyText)({
    color: COLORS.gray,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    fontFamily: FONTS_FAMILY.regular.body,
});
