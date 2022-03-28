import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';
import DescriptionIcon from '@mui/icons-material/Description';
import { boxShadowConfig } from '../../../theme/Styles';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';

export const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    width: '100%',
    boxShadow: props.disableCardStyle ? null : boxShadowConfig,
}));

export const ContentContainer = styled('div')(props => ({
    width: props.disableCardStyle ? '100%' : '95%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
}));

export const RowContainer = styled('div')({
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
});

export const Column = styled('div')({
    display: 'inline-block',
    flexDirection: 'column',
    textAlign: 'left',
    alignItems: 'flex-start',
    alignSelf: 'center',
    wordWrap:'break-word',
});

export const Title = styled('h1')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: FONTS_FAMILY.regular.title,
    textAlign: 'start',
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '17px',
    },
    '@media (min-width:1200px)': {
        fontSize: '35px',
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


export const StyledDescriptionIcon = styled(DescriptionIcon)({
    color: COLORS.tertiary,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const StyledDownloadIcon = styled(DownloadIcon)({
    color: COLORS.tertiary,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});


export const StyledCheckIcon = styled(CheckIcon)({
    color: COLORS.tertiary,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const StyledClearIcon = styled(ClearIcon)({
    color: COLORS.tertiary,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const StyledCloseIcon = styled(CloseIcon)({
    color: COLORS.black,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '30px',
    }
});