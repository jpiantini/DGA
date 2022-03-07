import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const ButtonContainer = styled('div')({
    width: '30%',
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
});