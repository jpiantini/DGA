import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';
import { BodyText } from '../../../theme/Styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import { Fab } from '@mui/material';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const TopContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
});

export const TopItemContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

});

export const StyledFab = styled(Fab)({
    color: COLORS.white,
    backgroundColor: COLORS.secondary,
    width: '200px',
    borderRadius: '50px',
    '&:hover': {
        backgroundColor: COLORS.primary,
    },
    bottom: 16,
    top: 0,
    marginTop: '50px',
    alignSelf: 'flex-end',
    position: '-webkit-sticky',
    position: 'sticky',
    '@media print': {
        display: 'none'
    }

});

export const ButtonContainer = styled('div')({
    width: '200px',
    marginTop: '20px'
});

export const TextListContainer = styled('ul')({
    margin: 0,
    paddingLeft: 17
});

export const TextOrderedListContainer = styled('ol')({
    margin: 0,
    paddingLeft: 17
});

export const PriceContainer = styled('div')({
    width: '100%',
    textAlign: 'left'
});

export const CardPriceTitle = styled(BodyText)({
    marginTop: '5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    fontFamily: FONTS_FAMILY.regular.body,
});

export const CardPriceGray = styled(BodyText)({
    marginTop: '10px',
    color: COLORS.gray,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    fontFamily: FONTS_FAMILY.regular.body,
});

export const StyledFacebookIcon = styled(FacebookIcon)({
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

export const StyledTwitterIcon = styled(TwitterIcon)({
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

export const StyledEmailIcon = styled(EmailIcon)({
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

export const StyledPrintIcon = styled(PrintIcon)({
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

export const VariationsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    '@media (min-width:320px)': {
        flexDirection: 'column'
    },
    '@media (min-width:768px)': {
        flexDirection: 'row'
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row'
    }
});
