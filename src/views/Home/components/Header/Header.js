import { useState, Fragment } from "react";
import {
  Container,
  MenuButton,
  DrawerList,
  DrawerListItemButton,
  DrawerListItemContainer,
} from "./styles/HeaderStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoggedInMenu from "../../../../components/LoggedInMenu/LoggedInMenu";
import ImportantInformationModal from "../../../../components/ImportantInformationModal/ImportantInformationModal";
import { isMobile } from "react-device-detect";
import Notifications from "../../../../components/Notifications/Notifications";
import { MenuDivider } from "../../../../layout/app/components/Header/styles/HeaderStyles";

function Header() {
  const matchesWidth = useMediaQuery("(min-width:768px)");
  const [drawerState, setDrawerState] = useState(false);
  const [registerInformationModalVisible, setRegisterInformationModalVisible] =
    useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authReducer);

  const goToRoute = (route) => {
    history.push(route);
  };

  const handleregisterInformationModalVisibility = () => {
    setRegisterInformationModalVisible(!registerInformationModalVisible);
  };

  return (
    <Fragment>
      {matchesWidth ? (
        <Container>
          <MenuButton onClick={() => goToRoute("/app/listOfServices/0")}>
            Servicios
          </MenuButton>
          <div style={{ width: "1rem" }} />
          <MenuButton onClick={() => goToRoute("/app/contact")}>
            Contacto
          </MenuButton>

          <div style={{ width: "1rem" }} />
          {!authenticated ? (
            <Fragment>
              <MenuButton
                variant='outlined'
                color='inherit'
                onClick={() => goToRoute("public/login")}
              >
                Iniciar sesión
              </MenuButton>
              <div style={{ width: "1rem" }} />
              <MenuButton
                variant='outlined'
                color='inherit'
                onClick={() => goToRoute("/app/register")}
              >
                Registrar
              </MenuButton>
            </Fragment>
          ) : (
            <Fragment>
              <LoggedInMenu />,
              <Notifications color='white' />
            </Fragment>
          )}
        </Container>
      ) : (
        <Container>
          {isMobile && (
            <ImportantInformationModal
              open={registerInformationModalVisible}
              buttonTitle='Ir a la store'
              content='Para tener una mejor experiencia instale la app mitur.'
              buttonClick={() => goToRoute("/app/register")} //SEND TO DOWNLOAD APP LINK
              onCloseClick={handleregisterInformationModalVisibility}
              onBackDropClick={handleregisterInformationModalVisibility}
            />
          )}

          <MenuButton
            color='inherit'
            startIcon={<MenuIcon style={{ fontSize: "40px" }} />}
            name='drawerState'
            onClick={() => setDrawerState(!drawerState)}
          />
          <Drawer
            anchor={"right"}
            open={drawerState}
            onClose={() => setDrawerState(!drawerState)}
          >
            <DrawerList>
              <DrawerListItemContainer>
                <DrawerListItemButton color='inherit'>
                  INICIO
                </DrawerListItemButton>
              </DrawerListItemContainer>
              <DrawerListItemContainer>
                <DrawerListItemButton
                  color='inherit'
                  onClick={() => goToRoute("/app/listOfServices/0")}
                >
                  SERVICIOS
                </DrawerListItemButton>
              </DrawerListItemContainer>
              <DrawerListItemContainer>
                <DrawerListItemButton
                  color='inherit'
                  onClick={() => goToRoute("/app/contact")}
                >
                  CONTACTO
                </DrawerListItemButton>
              </DrawerListItemContainer>
              {!authenticated && (
                <Fragment>
                  <DrawerListItemContainer>
                    <DrawerListItemButton
                      color='inherit'
                      onClick={() => goToRoute("public/login")}
                    >
                      INICIAR SESIÓN
                    </DrawerListItemButton>
                  </DrawerListItemContainer>
                  <DrawerListItemContainer>
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
              )}
            </DrawerList>
          </Drawer>
        </Container>
      )}
    </Fragment>
  );
}

export default Header;
