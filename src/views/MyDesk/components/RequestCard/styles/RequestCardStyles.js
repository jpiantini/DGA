import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import WarningIcon from '@mui/icons-material/Warning';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    width: '100%',
    boxShadow: '1px 2px 22px 2px rgba(0,0,0,0.31)',
});

export const RowContainer = styled('div')({
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
});

export const ActionRequiredTitle = styled('p')({
    margin: 0,
    color: COLORS.black,
    fontFamily: 'Nunito Sans',
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '11px',
    },
    '@media (min-width:1200px)': {
        fontSize: '14px',
    }
});

export const Title = styled('h1')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: 'Source Sans Pro',
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


export const IconContainer = styled('div')({
    '@media (min-width:320px)': {
        width: '10%',
    },
    '@media (min-width:768px)': {
        width: '6%',
    },
    '@media (min-width:1200px)': {
        width: '5%',
    }
});

export const ButtonContainer = styled('div')({
    '@media (min-width:320px)': {
        width: '30%',
    },
    '@media (min-width:768px)': {
        width: '30%',
    },
    '@media (min-width:1200px)': {
        width: '20%',
    }
});

export const StyledWarningIcon = styled(WarningIcon)({
    color: '#ffa500',
    borderColor: '#000000',
    '@media (min-width:320px)': {
        fontSize: '18x',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const ProgressBarContainer = styled('div')(props => ({
    width: '100%',
    backgroundColor: '#e6e6e6',
    borderRadius: '10px',
    height: '20px',
    alignItems:'center',
    justifyContent:'center'
}));

export const ProgressBarPercent = styled('div')(props => ({
    width: props.percent ? props.percent : '25%',
    borderRadius: '10px',
    backgroundColor: props.variant === 'completed' ? COLORS.tertiary :
        props.variant === 'rejected' ? COLORS.error : '#858585',
    height: '20px',
}));

export const ProgressBarTitle = styled('h3')(props => ({
    margin: 0,
    position: 'absolute',
    width:props.width,
    textAlign:'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (min-width:320px)': {
        fontSize: '11px',
        marginTop:'2px',
    },
    '@media (min-width:768px)': {
        fontSize: '12px',
        marginTop:'2px',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
        marginTop:'1px',
    }
}));
