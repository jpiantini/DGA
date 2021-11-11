import { useState } from 'react';
import { Container, MenuButton,  DrawerList, DrawerListItemButton, DrawerListItemContainer } from './styles/HeaderStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { useHistory } from "react-router-dom";

function Header() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const [drawerState, setDrawerState] = useState(false);

    const history = useHistory();
    const goToRoute = (route) => {
        history.push(route);
    }

    return (
        matchesWidth ?
            <Container>
                <MenuButton>Mis Servicios</MenuButton>
                <div style={{ width: '15px' }} />
                <MenuButton>Contacto</MenuButton>
                <div style={{ width: '15px' }} />
                <MenuButton variant="outlined" color="inherit" onClick={() => goToRoute('public/login')}>
                    Iniciar sesión
                </MenuButton>
                <div style={{ width: '15px' }} />
                <MenuButton variant="outlined" color="inherit" onClick={() => goToRoute('public/register')}>Registrar</MenuButton>
                <div style={{ width: '15px' }} />
            </Container>
            :
            <Container>
                <MenuButton color="inherit" startIcon={<MenuIcon style={{ fontSize: '40px' }} />} name="drawerState" onClick={() => setDrawerState(!drawerState)} />
                <Drawer
                    anchor={'right'}
                    open={drawerState}
                    onClose={() => setDrawerState(!drawerState)}
                >
                    <DrawerList >
                        <DrawerListItemContainer >
                            <DrawerListItemButton color="inherit" >INICIO</DrawerListItemButton>
                        </DrawerListItemContainer>
                        <DrawerListItemContainer>
                            <DrawerListItemButton color="inherit" >MIS SERVICIOS</DrawerListItemButton>
                        </DrawerListItemContainer>
                        <DrawerListItemContainer>
                            <DrawerListItemButton color="inherit" onClick={() => goToRoute('public/login')}>
                                INICIAR SESIÓN
                            </DrawerListItemButton>
                        </DrawerListItemContainer>
                        <DrawerListItemContainer>
                            <DrawerListItemButton color="inherit" onClick={() => goToRoute('public/register')}>REGISTRAR</DrawerListItemButton>
                        </DrawerListItemContainer>
                    </DrawerList>
                </Drawer>
            </Container>
    );
}

export default Header;
