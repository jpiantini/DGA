import { useState, Fragment } from "react";
import {
  Container,
  MenuButton,
  DrawerMenuContainer
} from "./styles/HeaderStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoggedInMenu from "../../../../components/LoggedInMenu/LoggedInMenu";
import Notifications from "../../../../components/Notifications/Notifications";
import DrawerMenu from "../../../../components/DrawerMenu/DrawerMenu";

function Header() {
  const matchesWidth = useMediaQuery("(min-width:768px)");
  const [drawerState, setDrawerState] = useState(false);
  const [registerInformationModalVisible, setRegisterInformationModalVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, profileImg } = useSelector((state) => state.authReducer);

  const goToRoute = (route) => {
    history.push(route);
  };

  const handleregisterInformationModalVisibility = () => {
    setRegisterInformationModalVisible(!registerInformationModalVisible);
  };

  return (
    <Fragment>
      {matchesWidth ? //big devices header

        <Container>
          <MenuButton onClick={() => goToRoute("/app/listOfServices/0")}>
            Servicios
          </MenuButton>
          <div style={{ width: "1rem" }} />
          <MenuButton onClick={() => goToRoute("/app/generalQueries")}>
            Consultas generales
          </MenuButton>
          <div style={{ width: "1rem" }} />
          <MenuButton onClick={() => goToRoute("/app/contact")}>
            Contacto
          </MenuButton>

          <div style={{ width: "1rem" }} />
          {!authenticated ?
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
            :
            <Fragment>
              <LoggedInMenu />
              <div style={{ width: "0.5rem" }} />
              <Notifications color='white' />
            </Fragment>
          }

        </Container>
        :
          <DrawerMenuContainer>
            <DrawerMenu layout="public" />
          </DrawerMenuContainer>

      }
    </Fragment>
  );
}

export default Header;
