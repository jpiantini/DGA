import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%'
});

export const ButtonContainer = styled('div')({
    width:'200px',
    marginTop:'20px'
});

export const TextListContainer = styled('ul')({
    margin:0,
    paddingLeft:17
});

export const TextOrderedListContainer = styled('ol')({
    margin:0,
    paddingLeft:17
});

