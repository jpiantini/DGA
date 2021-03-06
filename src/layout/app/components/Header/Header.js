import { Fragment } from "react";
import LogoSecondary from "../../../../assets/images/LogoSecondary.jpeg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoggedInMenu from "../../../../components/LoggedInMenu/LoggedInMenu";
import {
  Container,
  MenuContainer,
  Image,
  MenuButton,
  MenuDivider,
  DrawerMenuContainer,
  LineContainer
} from "./styles/HeaderStyles";
import Notifications from "../../../../components/Notifications/Notifications";
import DrawerMenu from "../../../../components/DrawerMenu/DrawerMenu";

function Header() {
  //THE MIN WIDTH DEPENDS OF QUANTITY OF ELEMENTS IN HEADER FOR PREVENT OVERFLOW and SCROLL
  const matchesWidth = useMediaQuery("(min-width:1000px)");

  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, profileImg } = useSelector((state) => state.authReducer);

  const goToRoute = (route) => {
    history.push(route);
  };

  return (
    <Container>
      <LineContainer>
        <Image onClick={() => goToRoute("/")} src={LogoSecondary} />
        {matchesWidth ?
          <MenuContainer>
            <MenuButton onClick={() => goToRoute("/public")}>
              Inicio
            </MenuButton>
            <MenuButton onClick={() => goToRoute("/app/listOfServices/0")}>
              Trámites
            </MenuButton>
            <MenuDivider />
            <MenuButton onClick={() => goToRoute("/app/contact")}>
              Contacto
            </MenuButton>
            <MenuDivider />
            {!authenticated ?
              <Fragment>
                <MenuButton onClick={() => goToRoute("/public/login")}>
                  Iniciar Sesión
                </MenuButton>
                <MenuButton onClick={() => goToRoute("/app/register")}>
                  Registrar
                </MenuButton>
              </Fragment>
              :
              <Fragment>
                <MenuButton onClick={() => goToRoute("/app/myDesk")}>
                  Mi escritorio
                </MenuButton>
                <MenuDivider />
                <LoggedInMenu />
                <div style={{ width: "0.5rem" }} />
                <Notifications color='black' />
              </Fragment>
            }
          </MenuContainer>
          :
          <DrawerMenuContainer>
            <DrawerMenu layout="app" />
            {authenticated &&
              <Notifications color='black' />
            }
          </DrawerMenuContainer>
        }
      </LineContainer>
    </Container>
  );
}

export default Header;
