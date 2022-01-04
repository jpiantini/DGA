import { useState, useRef,memo } from 'react';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
    Container, StyledPaper, UserImage,
} from './styles/LoggedInMenuStyles';
import { AuthLogout } from '../../redux/actions/AuthActions';
import { ShowGlobalLoading,HideGlobalLoading } from '../../redux/actions/UiActions';
import { useSelector } from 'react-redux';

function LoggedInMenu({ image }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { profileImg } = useSelector((state) => state.authReducer);

    const [hover, setHover] = useState(false);
    const containerRef = useRef(null);

    const handleHovering = (hoverState) => {
        setHover(hoverState);
    }

    const HandleLogOut = () => {
        dispatch(ShowGlobalLoading('Cerrando sesión'));
        setTimeout(() => { //TO MAKE AN LOGOUT USER EXPERIENCE
            dispatch(AuthLogout());
            dispatch(HideGlobalLoading());
        }, 2000);

    }

    console.log(profileImg)
    return (
        <Container ref={containerRef}
            onMouseOver={() => handleHovering(true)} onMouseOut={() => handleHovering(false)}>
            <UserImage src={profileImg} onClick={() => history.push('/app/myDesk')} />
            <Popper
                open={hover}
                anchorEl={containerRef.current}
                role={undefined}
                placement='bottom-end'
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                'right top',
                        }}
                    >
                        <StyledPaper>
                            <MenuList>
                                <MenuItem onClick={() => history.push('/app/myConfiguration')}>Mi configuración</MenuItem>
                                <Divider sx={{ width: '100%' }} />
                                <MenuItem onClick={HandleLogOut}>Cerrar sesión</MenuItem>
                            </MenuList>
                        </StyledPaper>
                    </Grow>
                )}
            </Popper>
        </Container >
    );
}

export default memo(LoggedInMenu);