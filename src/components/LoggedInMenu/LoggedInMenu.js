import { useState, useRef } from 'react';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import {
    Container, StyledPaper, UserImage,
} from './styles/LoggedInMenuStyles';

function LoggedInMenu({ image }) {

    const [hover, setHover] = useState(false);
    const containerRef = useRef(null);

    const handleHovering = (hoverState) => {
        setHover(hoverState);
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
                                <MenuItem >Mi configuración</MenuItem>
                                <Divider sx={{ width: '100%' }} />
                                <MenuItem >Cerrar sesión</MenuItem>
                            </MenuList>
                    </StyledPaper>
                    </Grow>
                )}
        </Popper>
        </Container >
    );
}

export default LoggedInMenu;