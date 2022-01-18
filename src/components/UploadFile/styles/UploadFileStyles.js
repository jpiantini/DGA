import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});


export const StyledUploadFileIcon = styled(UploadFileIcon)({
  color: COLORS.secondary,
  fontSize: '40px',
  '&:hover': {
    color: COLORS.primary,
  }
});

export const InputFileButtonContainer = styled('label')({
  display: 'inline-block',
  cursor: 'pointer',
});

export const InputFile = styled('input')({
  display: 'none'
});

export const RowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
});

export const RowSeparator = styled('div')({
  width: '20px'
});