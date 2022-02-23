import { styled } from '@mui/system';
import FONT_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
});

export const ButtonContainer = styled('div')({
    width:'200px',
    marginTop:'20px'
});

export const ContactInfoContainer = styled('div')({
    fontFamily: FONT_FAMILY.regular.body
});

export const MapContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
    height:'300px',
});