import { TextField } from '@mui/material';

import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
});

export const StyledTextInput = styled(TextField)({
    width: '100%',
    alignSelf: 'center',
    borderWidth: '5px',

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: COLORS.secondary,
    },
    '&:hover fieldset': {
      borderColor: COLORS.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.secondary,
      borderWidth: '1px'
    },
  },
});

export const Title = styled('h1')({
    marginTop: '3px',
    fontSize: '17px',
    color: COLORS.black,
    fontFamily: 'Nunito Sans',
    fontWeight: '400',

});