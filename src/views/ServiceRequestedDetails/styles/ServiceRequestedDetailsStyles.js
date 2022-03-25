import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { boxShadowConfig } from '../../../theme/Styles';
import SendIcon from '@mui/icons-material/Send';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const ChatContainer = styled('div')({
    display: 'flex',
    flexDirection:'column',
    width: '100%',
    border: ` 2px solid ${COLORS.secondary}`,
    borderRadius: '25px',
   // height: '500px',
});

export const MessageItem = styled('div')(props => ({
    alignSelf:props.isUserMessage ? 'flex-end':'flex-start',
    maxWidth: '90%',
    borderRadius: '10px',
    margin:'5px',
    padding:'18px',
    backgroundColor:props.isUserMessage ? COLORS.notificationComplete : COLORS.notificationWarning,
}));

export const ChatTopContainer = styled('div')(props => ({
    position:'relative',
    display: 'flex',
    overflow:'auto',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: props.isEmpty ? 'center':'flex-start',
    width: '97%',
    height: '430px',
    maxHeight: '430px',
    
}));


export const MessageText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '16px',
    color: COLORS.black,
    fontFamily:FONTS_FAMILY.regular.body
});

export const MessageDateText = styled('p')({
    marginBottom: 0,
    textAlign: 'left',
    fontSize: '12px',
    color: COLORS.black,
    fontFamily:FONTS_FAMILY.regular.body
});

export const ChatBottomContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '100%',
    borderTop: ` 2px solid ${COLORS.secondary}`,
    height: '70px',
});

export const InputMessageContainer = styled('div')({
    '@media (min-width: 320px)': {
        width: '80%',
    },
    '@media (min-width: 768px)': {
        width: '90%',
    },
    '@media (min-width: 1200px)': {
        width: '90%',
    }
});

export const ButtonMessageContainer = styled('div')({
    '@media (min-width: 320px)': {
        width: '20%',
    },
    '@media (min-width: 768px)': {
        width: '10%',
    },
    '@media (min-width: 1200px)': {
        width: '10%',
    }
});



export const ButtonContainer = styled('div')({
    marginTop: '20px',
    '@media (min-width: 320px)': {
        width: '100%',
    },
    '@media (min-width: 768px)': {
        width: '250px',
    }
    ,
    '@media (min-width: 1200px)': {
        width: '300px',
    }
});

export const ImageContainer = styled('div')({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '220px',
    border: ` 1px solid ${COLORS.secondary}`,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '@media (min-width:320px)': {
        width: '200px',
    },
    '@media (min-width:768px)': {
        width: '280px',
    },
    '@media (min-width:1200px)': {
        width: '300px',
    },
    '&:hover': {
        boxShadow: boxShadowConfig,
        borderColor: COLORS.primary,
    }
});

export const LogoImage = styled('img')({
    '@media (min-width:320px)': {
        width: '100px',
    },
    '@media (min-width:768px)': {
        width: '120px',
    },
    '@media (min-width:1200px)': {
        width: '150px',
    },
});

export const StyledSendIcon = styled(SendIcon)({
    color: COLORS.secondary,
    '&:hover': {
        color: COLORS.primary,
    },
    '@media (min-width:320px)': {
        fontSize: '35px',
    },
    '@media (min-width:768px)': {
        fontSize: '35px',
    },
    '@media (min-width:1200px)': {
        fontSize: '40px',
    }
});