import { useState, Fragment } from 'react';
import MiturLogo from '../../../../assets/images/MiturLogoSecondary.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import LoggedInMenu from '../../../../components/LoggedInMenu/LoggedInMenu';
import {
    Container,
    MenuContainer,
    Image,
    MenuButton,
    MenuDivider,
    DrawerList,
    DrawerListItemButton,
    DrawerListItemContainer
} from './styles/HeaderStyles';

function Header() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const [drawerState, setDrawerState] = useState(false);


    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const goToRoute = (route) => {
        history.push(route);
    }

    return (
        <Container >
            <Image src={MiturLogo} />
            {
                matchesWidth ?
                    <MenuContainer>
                        <MenuButton onClick={() => goToRoute('/')}>Inicio</MenuButton>
                        <MenuDivider />
                        <MenuButton onClick={() => goToRoute('/app/listOfServices/0')}>Servicios</MenuButton>
                        <MenuDivider />
                        <MenuButton onClick={() => goToRoute('/app/contact')}>Contacto</MenuButton>
                        <MenuDivider />
                        {
                            !authenticated ?
                                <MenuButton onClick={() => goToRoute('/public/login')}>Iniciar Sesión</MenuButton>
                                :
                                <Fragment>
                                    <MenuButton onClick={() => goToRoute('/app/myDesk')}>Mi escritorio</MenuButton>
                                    <MenuDivider />
                                    <LoggedInMenu />
                                </Fragment>
                        }
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
                                    <DrawerListItemButton color="inherit" onClick={() => goToRoute('/app/listOfServices/0')}>Servicios</DrawerListItemButton>
                                </DrawerListItemContainer>
                                <DrawerListItemContainer>
                                    <DrawerListItemButton color="inherit" onClick={() => goToRoute('/app/contact')}>Contacto</DrawerListItemButton>
                                </DrawerListItemContainer>
                                {
                                    !authenticated ?
                                        <DrawerListItemContainer>
                                            <DrawerListItemButton color="inherit" onClick={() => goToRoute('/public/login')}>
                                                INICIAR SESIÓN
                                            </DrawerListItemButton>
                                        </DrawerListItemContainer>
                                        :
                                        <DrawerListItemContainer>
                                            <DrawerListItemButton color="inherit" onClick={() => goToRoute('/app/myDesk')}>Mi escritorio</DrawerListItemButton>
                                        </DrawerListItemContainer>
                                }

                            </DrawerList>
                        </Drawer>
                    </MenuContainer>

            }

        </Container>
    );
}

export default Header;
