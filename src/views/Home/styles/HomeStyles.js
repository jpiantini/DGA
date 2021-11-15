import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { TextField, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});
export const HomeContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});
export const ContainerBackground = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '70vh',
    justifyContent: 'center'
});

export const MediumContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    '@media (min-width:360px)': {
        minHeight: '270px',
    },
    '@media (min-width:768px)': {
        minHeight: '300px',
    },
    '@media (min-width:1200px)': {
        minHeight: '380px',
    },
    '@media (min-width:2048px)': {
        minHeight: '500px',
    },
    '@media (min-width:3840px)': {
        minHeight: '1000px',
    },
});



export const HomeTextContainer = styled('div')({
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    marginBottom: '15%',
    justifyContent: 'center',
    width: '90%',
    minHeight: '80vh'
});

export const DefaultButton = styled(Button)({
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.black
    },
    '@media (min-width:360px)': {
        fontSize: '15px',
        borderRadius: '20px',
        width: '150px'
    },
    '@media (min-width:768px)': {
        fontSize: '15px',
        borderRadius: '20px',
        width: '150px'
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
        borderRadius: '20px',
        width: '230px'
    },
    '@media (min-width:2048px)': {
        fontSize: '25px',
        borderRadius: '22px',
        width: '400px'
    },
    '@media (min-width:3840px)': {
        fontSize: '40px',
        borderRadius: '35px',
        width: '500px'
    },
});

export const HomeTitle = styled('h1')({
    margin: 0,
    width: '50%',
    color: COLORS.white,
    fontFamily: 'Fira Sans',
    '@media (min-width:360px)': {
        fontSize: '25px'
    },
    '@media (min-width:768px)': {
        fontSize: '30px'
    },
    '@media (min-width:1200px)': {
        fontSize: '50px'
    },
    '@media (min-width:2048px)': {
        fontSize: '65px'
    },
    '@media (min-width:3840px)': {
        fontSize: '120px'
    },
});


export const HomeSubTitle = styled('h3')({
    margin: 0,
    width: '50%',
    color: COLORS.white,
    fontFamily: 'Nunito Sans',
    '@media (min-width:360px)': {
        fontSize: '13px'
    },
    '@media (min-width:768px)': {
        fontSize: '14px'
    },
    '@media (min-width:1200px)': {
        fontSize: '18px'
    },
    '@media (min-width:2048px)': {
        fontSize: '30px'
    },
    '@media (min-width:3840px)': {
        fontSize: '55px'
    },
});

export const DarkOverlay = styled('div')({
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
});

export const StyledDescriptionIcon = styled(DescriptionIcon)({
    color: COLORS.primary,
    '@media (min-width:320px)': {
        fontSize: '50px'
    },
    '@media (min-width:768px)': {
        fontSize: '70px'
    },
    '@media (min-width:1200px)': {
        fontSize: '100px'
    },
    '@media (min-width:2048px)': {
        fontSize: '130px'
    },
    '@media (min-width:3840px)': {
        fontSize: '300px'
    },
});

export const StyledPersonAddIcon = styled(PersonAddIcon)({
    color: COLORS.primary,
    '@media (min-width:320px)': {
        fontSize: '50px'
    },
    '@media (min-width:768px)': {
        fontSize: '70px'
    },
    '@media (min-width:1200px)': {
        fontSize: '100px'
    },
    '@media (min-width:2048px)': {
        fontSize: '130px'
    },
    '@media (min-width:3840px)': {
        fontSize: '300px'
    },
});

export const StyledSearchIcon = styled(SearchIcon)({
    color: COLORS.primary,
    '@media (min-width:320px)': {
        fontSize: '50px'
    },
    '@media (min-width:768px)': {
        fontSize: '70px'
    },
    '@media (min-width:1200px)': {
        fontSize: '100px'
    },
    '@media (min-width:2048px)': {
        fontSize: '130px'
    },
    '@media (min-width:3840px)': {
        fontSize: '300px'
    },
});


export const Title = styled('h1')({
    margin: 0,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (min-width:320px)': {
        fontSize: '30px'
    },
    '@media (min-width:768px)': {
        fontSize: '40px'
    },
    '@media (min-width:1200px)': {
        fontSize: '50px'
    },
    '@media (min-width:2048px)': {
        fontSize: '70px'
    },
    '@media (min-width:3840px)': {
        fontSize: '130px'
    },
});

export const SubTitle = styled('h3')({
    margin: 0,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (min-width:320px)': {
        fontSize: '15px'
    },
    '@media (min-width:768px)': {
        fontSize: '18px'
    },
    '@media (min-width:1200px)': {
        fontSize: '20px'
    },
    '@media (min-width:2048px)': {
        fontSize: '30px'
    },
    '@media (min-width:3840px)': {
        fontSize: '70px'
    },
});

export const SearcherSubTitle = styled('h3')({
    color: COLORS.secondary,
    marginBottom: '10px',
    textAlign: 'left',
    fontFamily: 'Nunito Sans',
    '@media (min-width:320px)': {
        fontSize: '15px'
    },
    '@media (min-width:768px)': {
        fontSize: '15px'
    },
    '@media (min-width:1200px)': {
        fontSize: '16px'
    },
    '@media (min-width:2048px)': {
        fontSize: '22px'
    },
    '@media (min-width:3840px)': {
        fontSize: '50px'
    },
});

export const SearcherTitle = styled('h3')({
    color: COLORS.secondary,
    margin: '0',
    textAlign: 'left',
    fontSize: '30px',
    fontFamily: 'Nunito Sans',
    '@media (max-width:768px)': {
        fontSize: '23px'
    },
});

export const AnalyticsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
});

export const SearcherContainer = styled('div')({
    width: '83%',
    alignItems: 'flex-start',
    alignSelf: 'center'
});

export const SelectorContainer = styled('div')({
    width: '100%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    padding: '1%'
});

export const SelectorsSearcherContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'space-evenly',
    '@media (max-width:830px)': {
        flexDirection: 'column',
    },
});


  export const StyledSearchIconForSearcher = styled(SearchIcon)({
    '@media (min-width:2048px)': {
        fontSize:'28px'
    },
    '@media (min-width:3840px)': {
        fontSize:'60px'
    },
});
export const SearchTextInput = styled(TextField)({
    width: '100%',
    alignSelf: 'center',
    '& .MuiOutlinedInput-input': {
        '@media (min-width:2048px)': {
            fontSize: '30px',
        },
        '@media (min-width:3840px)': {
            fontSize: '60px',
        },
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: COLORS.secondary,
            borderRadius: 0,
            '@media (min-width:2048px)': {
                height: '80px',
                borderWidth: '1px',
            },
            '@media (min-width:3840px)': {
                height: '130px',
                borderWidth: '2px',
            },
        },
        '&:hover fieldset': {
            borderColor: COLORS.secondary,
            borderRadius: 0,
        },
        '&.Mui-focused fieldset': {
            borderColor: COLORS.secondary,
            borderWidth: '1px',
            borderRadius: 0,
            '@media (min-width:3840px)': {
                borderWidth: '2px',
            },

        },
    },
});

export const SearchSelect = styled(TextField)({
    alignSelf: 'start',
    width: '100%',
    '& .MuiOutlinedInput-input': {
        '@media (min-width:2048px)': {
            fontSize: '30px',
        },
        '@media (min-width:3840px)': {
            fontSize: '60px',
        },
    },
    '& .MuiMenuItem-root':{
        fontSize:'100px'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: COLORS.secondary,
            borderRadius: 0,
            '@media (min-width:2048px)': {
                height: '80px',
                borderWidth: '1px',
            },
            '@media (min-width:3840px)': {
                height: '130px',
                borderWidth: '2px',
            },
        },
        '&:hover fieldset': {
            borderColor: COLORS.secondary,
            borderRadius: 0,
        },
        '&.Mui-focused fieldset': {
            borderColor: COLORS.secondary,
            borderWidth: '1px',
            borderRadius: 0,
            '@media (min-width:3840px)': {
                borderWidth: '2px',
            },
        },
    },
    '@media (max-width:830px)': {
        width: '100%',
        paddingBottom: '5px'
    },
});

export const ServicesListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
});

export const ServicesTitle = styled('h1')({
    fontSize: '50px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    //   textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});

export const ServicesSubtitle = styled('h1')({
    fontSize: '30px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    //  textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '20px'
    },
});


export const LinkText = styled('a')({
    color: COLORS.white,
    fontSize: '12px',
    fontFamily: 'Quicksand',
    margin: '3px',
    textDecoration: 'none',
    '&:hover,&:focus': {
        textDecoration: 'underline',
    }
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'left',
    alignSelf: 'center',
    textAlign: 'left'
});

