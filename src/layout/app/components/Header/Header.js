import { useState } from 'react';
import { Container, MenuContainer, Image, MenuButton, MenuDivider, DrawerList, DrawerListItemButton, DrawerListItemContainer } from './styles/HeaderStyles';
import MiturBlackLogo from '../../../../assets/images/MiturBlackLogo.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';

function Header() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const [drawerState, setDrawerState] = useState(false);

    const history = useHistory();
    const goToRoute = (route) => {
        history.push(route);
    }

    return (
        <Container >
            <Image src={MiturBlackLogo} />
            {
                matchesWidth ?
                    <MenuContainer>
                        <MenuButton onClick={() => goToRoute('/')}>Inicio</MenuButton>
                        <MenuDivider />
                        <MenuButton>Servicios</MenuButton>
                        <MenuDivider />
                        <MenuButton>Informaciones</MenuButton>
                        <MenuDivider />
                        <MenuButton>Contacto</MenuButton>
                        <MenuDivider />
                        <MenuButton onClick={() => goToRoute('/public/login')}>Iniciar Sesión</MenuButton>
                    </MenuContainer>
                    :
                    <MenuContainer>
                        <MenuButton color="inherit" startIcon={<MenuIcon style={{ fontSize: '40px' }} />} name="drawerState" onClick={() => setDrawerState(!drawerState)} />
                        <Drawer
                            anchor={'right'}
                            open={drawerState}
                            onClose={() => setDrawerState(!drawerState)}
                        >
                            <DrawerList >
                                <DrawerListItemContainer >
                                    <DrawerListItemButton color="inherit" onClick={() => goToRoute('/')}>INICIO</DrawerListItemButton>
                                </DrawerListItemContainer>
                                <DrawerListItemContainer>
                                    <DrawerListItemButton color="inherit" >Servicios</DrawerListItemButton>
                                </DrawerListItemContainer>
                                <DrawerListItemContainer>
                                    <DrawerListItemButton color="inherit" >Informaciones</DrawerListItemButton>
                                </DrawerListItemContainer>
                                <DrawerListItemContainer>
                                    <DrawerListItemButton color="inherit" >Contacto</DrawerListItemButton>
                                </DrawerListItemContainer>
                                <DrawerListItemContainer>
                                    <DrawerListItemButton color="inherit" onClick={() => goToRoute('/public/login')}>
                                        INICIAR SESIÓN
                                    </DrawerListItemButton>
                                </DrawerListItemContainer>
                            </DrawerList>
                        </Drawer>
                    </MenuContainer>

            }

        </Container>
    );
}

export default Header;
