import { useState, useRef } from 'react';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import {
    Container, StyledPaper, UserImage,
} from './styles/LoggedInMenuStyles';
import { AuthLogout } from '../../redux/actions/AuthActions';

function LoggedInMenu({ image }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [hover, setHover] = useState(false);
    const containerRef = useRef(null);

    const handleHovering = (hoverState) => {
        setHover(hoverState);
    }

    const HandleLogOut = () => {
        dispatch(AuthLogout());
    }
    return (
        <Container ref={containerRef} onMouseOver={() => handleHovering(true)} onMouseOut={() => handleHovering(false)}>
            <UserImage src="https://www.w3schools.com/howto/img_avatar.png" />
            <Popper
                open={hover}
                anchorEl={containerRef.current}
                role={undefined}
                placement="bottom-end"
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
                                <MenuItem onClick={() => history.push('/app/myDesk')}>Mi configuración</MenuItem>
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

export default LoggedInMenu;