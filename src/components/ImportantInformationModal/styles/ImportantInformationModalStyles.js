import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../theme/Colors';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '430px',
    '@media(max-width:768px)': {
        minHeight: '300px',
    },
});

export const Header = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    width: '100%',
    minHeight: '150px',
    alignItems: 'center',
    justifyContent: 'center'
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
});

export const IconDivider = styled('div')({
    width: '30px'
});

export const Title = styled('h1')({
    fontFamily: 'Fira Sans',
    '@media (min-width:360px)': {
        fontSize: '25px',
    },
    '@media (min-width:768px)': {
        fontSize: '32px',
    },
    '@media (min-width:1200px)': {
        fontSize: '35px',
    },
    color: COLORS.white,
});

export const ButtonsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50%',
    alignItems: 'center'
});

export const TextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'left'
});

export const BodyText = styled('p')({
    fontFamily: 'Nunito Sans',
    '@media (min-width:360px)': {
        fontSize: '15px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '20px',
    },
    color: COLORS.black,
    textAlign: 'left'
});

export const StyledAnnouncementOutlinedIcon = styled(AnnouncementOutlinedIcon)({
    color: COLORS.white,
    '@media (min-width:360px)': {
        fontSize: '75px',
    },
    '@media (min-width:768px)': {
        fontSize: '90px',
    },
    '@media (min-width:1200px)': {
        fontSize: '100px',
    },
});


