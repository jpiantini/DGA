import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import { SubTitle } from '../../../../../theme/Styles';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        cursor: 'pointer',
    }
});

export const BodyText = styled('p')({
    margin: 0,
    marginTop: '1%',
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.regular.body,
    textAlign: 'start',
    '@media (min-width:320px)': {
        fontSize: '10px',
    },
    '@media (min-width:768px)': {
        fontSize: '13px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    }
});

export const LineDivider = styled('div')({
    width: '100%',
    display: 'flex',
    height: '1px',
    marginTop: '10px',
    backgroundColor: COLORS.grayPlaceholder
});

export const StyledInsertDriveFileIcon = styled(InsertDriveFileIcon)(props => ({
    color: props.isHover ? COLORS.primary : COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '30px',
    },
    margin:0,
}));