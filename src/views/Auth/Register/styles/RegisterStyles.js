import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width:320px)': {
        width: '320px',
    },
    '@media (min-width:768px)': {
        width: "768px",
    },
    '@media (min-width:1200px)': {
        width: "1000px",
    },
});


export const ButtonsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
});

export const ButtonContainer = styled('div')({
    width: '30%',
});


export const FinalStepContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
});