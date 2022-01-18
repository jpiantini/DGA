import { FormLabel } from '@mui/material';
import { styled } from '@mui/system';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import COLORS from '../../../theme/Colors';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

export const CheckboxContainer = styled('div')(props => ({
    display:'flex',
    flexDirection: 'row',
    marginTop: props.index == 0 ? 0: '40px',
    alignItems:'center'
}));

export const StyledCheckBoxGroup = styled(ToggleButtonGroup)({
    display: 'flex ',
    flexDirection: 'column !important',
    ' & .btn-check': {
        width: '20px !important',
        height: '20px !important',
        cursor:'pointer',
        'accent-color': COLORS.tertiary
    },

});


export const StyledFormLabel = styled(FormLabel)({
   color:COLORS.black,
   display:'flex',
   marginLeft:'40px',
  bottom:25
});
export const StyledToggleButton = styled(ToggleButton)({

});