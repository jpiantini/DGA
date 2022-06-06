import { useState, Fragment } from "react";
import {
  Container,
  MenuButton,
  DrawerMenuContainer,
  Image,
  LineContainer
} from "./styles/HeaderStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoggedInMenu from "../../../../components/LoggedInMenu/LoggedInMenu";
import Notifications from "../../../../components/Notifications/Notifications";
import DrawerMenu from "../../../../components/DrawerMenu/DrawerMenu";
import LogoSecondaryWhite from '../../../../assets/images/LogoSecondaryWhite.png'

function Header(props) {
  const matchesWidth = useMediaQuery("(min-width:1000px)");
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, profileImg } = useSelector((state) => state.authReducer);

  const goToRoute = (route) => {
    history.push(route);
  };

  return (
    <Fragment>
      {matchesWidth ? //big devices header
        <Container>
          <LineContainer>
            <div style={{ display: 'flex' }}>
              <Image onClick={() => goToRoute("/")} src={LogoSecondaryWhite} />
            </div>
            <div style={{ display: 'flex' }}>
              <MenuButton onClick={() => props.servicesRef.current.scrollIntoView({behavior:'smooth',block:'center'})}>
                Trámites
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
                  <MenuButton onClick={() => goToRoute("/app/myDesk")}>
                    Mi escritorio
                  </MenuButton>
                  <LoggedInMenu />
                  <div style={{ width: "0.5rem" }} />
                  <Notifications color='white' />
                </Fragment>
              }
            </div>

          </LineContainer>
        </Container>
        :
        <Container>
          <LineContainer>
            <Image onClick={() => goToRoute("/")} src={LogoSecondaryWhite} />
            <DrawerMenu layout="public" />
          </LineContainer>
        </Container>


      }
    </Fragment >
  );
}

export default Header;
