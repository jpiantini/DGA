import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import { SubTitle } from '../../../../../theme/Styles';
import CloseIcon from '@mui/icons-material/Close';

export const TitleContainer = styled('div')(props => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: props.hovering ? COLORS.primary : COLORS.secondary,
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
}));

export const Container = styled('div')({
    border: '2px solid',
    borderColor:COLORS.secondary,
    borderRadius:'10px',
    "@media (min-width:320px)": {
        width: "300px",
    },
    "@media (min-width:768px)": {
        width: "325px",
    },
    "@media (min-width:1200px)": {
        width: "350px",
    },
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        borderColor:COLORS.primary,
        cursor: 'pointer',
        transform:'scale(1.1)'

    }
});

export const Image = styled('img')(props => ({
    margin: '0 auto',
    width: "100%",
    height: '180px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
}));

export const CardTitle = styled(SubTitle)({
    color: COLORS.white,
    textAlign: 'center',
    "@media (min-width:320px)": {
        fontSize: "15px",
    },
    "@media (min-width:768px)": {
        fontSize: "15px",
    },
    "@media (min-width:1200px)": {
        fontSize: "15px",
    },
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