import { useState, Fragment, useEffect } from "react";
import {
    Container,
    MenuButton,
    DrawerList,
    DrawerListItemButton,
    DrawerListItemContainer,
    ProfileImage,
    StyledDrawer
} from "./styles/DrawerMenuStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImportantInformationModal from "../../components/ImportantInformationModal/ImportantInformationModal";
import { isMobile } from "react-device-detect";
import { HideGlobalLoading, ShowGlobalLoading } from "../../redux/actions/UiActions";
import { AuthLogout } from "../../redux/actions/AuthActions";
import LocalStorageService from "../../services/LocalStorageService";
import { removeLocalStorageSessionData } from "../../auth/AuthFunctions";

function DrawerMenu({ layout }) {
    const matchesWidth = useMediaQuery("(min-width:768px)");

    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [drawerState, setDrawerState] = useState(false);
    const [registerInformationModalVisible, setRegisterInformationModalVisible] = useState(false);
    const [userImage, setUserImage] = useState("");


    const goToRoute = (route) => {
        setDrawerState(false);
        history.push(route);
    };

    const handleregisterInformationModalVisibility = () => {
        setRegisterInformationModalVisible(!registerInformationModalVisible);
    };

    const HandleLogOut = () => {
        dispatch(ShowGlobalLoading('Cerrando sesión'));
        setTimeout(() => { //TO MAKE AN LOGOUT USER EXPERIENCE
            removeLocalStorageSessionData();
            dispatch(AuthLogout());
            window.location.reload();
            //   dispatch(HideGlobalLoading());
        }, 1500);

    }

    useEffect(() => {
        setUserImage(LocalStorageService.getItem('profile_img'));
    }, []);

    return (
        <Container removeRight={layout === "app" ? true:false} layout={layout}>
            {isMobile &&
                <ImportantInformationModal
                    open={registerInformationModalVisible}
                    buttonTitle='Ir a la store'
                    content='Para tener una mejor experiencia instale la app mitur.'
                    buttonClick={() => goToRoute("/app/register")} //SEND TO DOWNLOAD APP LINK
                    onCloseClick={handleregisterInformationModalVisibility}
                    onBackDropClick={handleregisterInformationModalVisibility}
                />
            }

            <MenuButton
                color='inherit'
                startIcon={<MenuIcon style={{ fontSize: "40px" }} />}
                name='drawerState'
                onClick={() => setDrawerState(!drawerState)}
                layout={layout}
            />
            <StyledDrawer
                anchor={"right"}
                open={drawerState}
                onClose={() => setDrawerState(!drawerState)}
                layout={layout}
            >
                {authenticated && <ProfileImage src={userImage} />}
                <DrawerList>
                    <DrawerListItemContainer layout={layout}>
                        <DrawerListItemButton
                            color='inherit'
                            onClick={() => goToRoute("/public")}
                        >
                            INICIO
                        </DrawerListItemButton>
                    </DrawerListItemContainer>
                    <DrawerListItemContainer layout={layout}>
                        <DrawerListItemButton
                            color='inherit'
                            onClick={() => goToRoute("/app/listOfServices/0")}
                        >
                            trámites
                        </DrawerListItemButton>
                    </DrawerListItemContainer>
                    <DrawerListItemContainer layout={layout}>
                        <DrawerListItemButton
                            color='inherit'
                            onClick={() => goToRoute("/app/generalQueries")}
                        >
                            CONSULTAS GENERALES
                        </DrawerListItemButton>
                    </DrawerListItemContainer>
                    <DrawerListItemContainer layout={layout}>
                        <DrawerListItemButton
                            color='inherit'
                            onClick={() => goToRoute("/app/contact")}
                        >
                            CONTACTO
                        </DrawerListItemButton>
                    </DrawerListItemContainer>
                    {!authenticated ?
                        <Fragment>
                            <DrawerListItemContainer layout={layout}>
                                <DrawerListItemButton
                                    color='inherit'
                                    onClick={() => goToRoute("/public/login")}
                                >
                                    INICIAR SESIÓN
                                </DrawerListItemButton>
                            </DrawerListItemContainer>
                            <DrawerListItemContainer layout={layout}>
                                <DrawerListItemButton
                                    color='inherit'
                                    onClick={(e) => {
                                        isMobile
                                            ? handleregisterInformationModalVisibility()
                                            : goToRoute("/app/register");
                                    }}
                                >
                                    REGISTRAR
                                </DrawerListItemButton>
                            </DrawerListItemContainer>
                        </Fragment>
                        :
                        <Fragment>
                            <DrawerListItemContainer layout={layout}>
                                <DrawerListItemButton
                                    color='inherit'
                                    onClick={() => goToRoute("/app/myDesk")}
                                >
                                    Mi escritorio
                                </DrawerListItemButton>
                            </DrawerListItemContainer>

                            <DrawerListItemContainer layout={layout}>
                                <DrawerListItemButton
                                    color='inherit'
                                    onClick={() => goToRoute("/app/myConfiguration")}
                                >
                                    Mi configuracion
                                </DrawerListItemButton>
                            </DrawerListItemContainer>
                        </Fragment>
                    }
                </DrawerList>
                {
                    authenticated &&
                    <div>
                        <DrawerListItemContainer layout={layout}>
                            <DrawerListItemButton
                                color='inherit'
                                onClick={HandleLogOut}
                            >
                                Cerrar sesión
                            </DrawerListItemButton>
                        </DrawerListItemContainer>
                    </div>
                }
            </StyledDrawer>
        </Container>
    );
}

export default DrawerMenu;
