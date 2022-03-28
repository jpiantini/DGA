import { Fragment } from "react";
import MiturLogo from "../../../../assets/images/MiturLogoSecondary.png";
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
  const matchesWidth = useMediaQuery("(min-width:820px)");

  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, profileImg } = useSelector((state) => state.authReducer);

  const goToRoute = (route) => {
    history.push(route);
  };

  return (
    <Container>
      <LineContainer>
      <Image onClick={() => goToRoute("/")} src={MiturLogo} />
      {matchesWidth ?
        <MenuContainer>
          <MenuButton onClick={() => goToRoute("/app/listOfServices/0")}>
            Servicios
          </MenuButton>
          <MenuButton onClick={() => goToRoute("/app/generalQueries")}>
            Consultas generales
          </MenuButton>
          <MenuDivider />
          <MenuButton onClick={() => goToRoute("/app/contact")}>
            Contacto
          </MenuButton>
          <MenuDivider />
          {!authenticated ?
            <MenuButton onClick={() => goToRoute("/public/login")}>
              Iniciar Sesión
            </MenuButton>
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
          <DrawerMenu layout="app"/>
        </DrawerMenuContainer>
      }
      </LineContainer>
    </Container>
  );
}

export default Header;
