import { styled } from '@mui/system';
import FONT_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
});

export const ButtonsMenuContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '80%',
    },
    '@media (min-width:1200px)': {
        width: '70%',
    },
});