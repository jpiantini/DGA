import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';
import { boxShadowConfig } from '../../../../../theme/Styles';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
});

export const ContentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:COLORS.snow,
    padding:'5px',
    borderRadius:'10px'
});

export const StyledUserIcon = styled(AccountCircleIcon)({
    color:COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '40px',
    },
    '@media (min-width:768px)': {
        fontSize: '45px',
    },
    '@media (min-width:1200px)': {
        fontSize: '50px',
    }
    });

    export const CommentDateText = styled('p')({
        marginTop:'5px',
        textAlign: 'left',
        fontSize: '12px',
        color: COLORS.black,
        fontFamily: FONTS_FAMILY.regular.body
    });