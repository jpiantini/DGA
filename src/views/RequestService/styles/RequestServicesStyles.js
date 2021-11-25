import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const ButtonsContainer = styled('div')({
    display:'flex',
    flexDirection:'row',
   width:'100%',
   justifyContent:'space-between'
});

export const ButtonContainer = styled('div')({
   width:'25%',
});

