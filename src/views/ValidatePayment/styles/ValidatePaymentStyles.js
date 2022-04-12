import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%'
});

export const ButtonContainer = styled('div')({
    width: '30%',
});

export const ButtonsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
});