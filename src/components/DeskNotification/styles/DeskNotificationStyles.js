import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import FONTS_FAMILY from '../../../theme/FontsFamily';
import InfoIcon from '@mui/icons-material/Info';
import { variationsColors } from '../DeskNotificationConstants';

export const Container = styled('div')(props =>({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: variationsColors[props.variant] ? variationsColors[props.variant] : COLORS.notificationSuccess,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    '@media (min-width:320px)': {
        flexDirection: 'column',
    },
    '@media (min-width:768px)': {
        flexDirection: 'column',
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
    }
}));

export const IconContainer = styled('div')({
    width: '5%',
    padding: '1%',
});

export const CloseButtonContainer = styled('div')({
    width: '5%',
});

export const TextContainer = styled('div')({
    width:'90%',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:768px)': {
        flexDirection: 'column',
    },
    alignItems:'center',
});

export const Text = styled('p')({
    color: COLORS.black,
    fontFamily:FONTS_FAMILY.regular.body,
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '13PX',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
    }
});

export const StyledCloseIcon = styled(CloseIcon)({
    color:COLORS.black,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '20px',
    }
});


export const StyledCheckCircleIcon = styled(CheckCircleIcon)({
    color:COLORS.success,
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

export const StyledWarningIcon = styled(WarningIcon)({
    color:'#ffa500',
    borderColor:'#000000',
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

export const StyledCancelIcon = styled(CancelIcon)({
    color:COLORS.red,
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

export const StyledInfoIcon = styled(InfoIcon)({
    color:COLORS.notificationComplete,
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

