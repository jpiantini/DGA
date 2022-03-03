import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
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
    border: ` 2px solid ${COLORS.secondary}`,
    padding: '10px',
    textAlign: 'center',
    '@media (min-width:320px)': {
        width: '150px',
    },
    '@media (min-width:768px)': {
        width: '270px',
    },
    '@media (min-width:1200px)': {
        width: '300px',
    },

});

export const CardPriceTitle = styled(BodyText)({
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

export const CardPriceGray = styled(BodyText)({
    textAlign: 'center',
    color: COLORS.gray,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});
