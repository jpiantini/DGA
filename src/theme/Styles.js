import { styled } from '@mui/system';
import { Button } from '@mui/material';
import COLORS from './Colors';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const Row = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const StyledButton = styled(Button)({
    minHeight: '38px',
    width: '100%',
    borderRadius: '0',
    color: COLORS.white,
    backgroundColor: COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '13.5px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    },
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
    }
});

export const StyledButtonOutlined = styled(Button)(props => ({
    minHeight: '38px',
    width: '100%',
    borderColor: COLORS.secondary,
    borderRadius: 0,
    color: props.active ? COLORS.white : COLORS.secondary,
    backgroundColor: props.active ? COLORS.secondary : COLORS.white,
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '13.5px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    },
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.secondary,
    }
}));

export const BodyText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
});

export const RowBodyDivider = styled('div')({
    width:'7%'
});
export const SmallHeightDivider = styled('div')({
    height:'15px'
});

export const MediumHeightDivider = styled('div')({
    height:'60px'
});

