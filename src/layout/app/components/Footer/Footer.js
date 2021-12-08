import { FooterMiturLogo } from "./FooterConstants";
import {
  Image,
  FooterContainer,
  LinkText,
  FooterText,
  CenterContainer,
} from "./styles/FooterStyles";
import { useHistory } from "react-router";
function Footer() {
  const history = useHistory();
  return (
    <FooterContainer>
      <CenterContainer>
        <Image src={FooterMiturLogo} />
        <LinkText
          onClick={() => history.push("/app/policy")}
          style={{ textDecoration: "underline" }}
        >
          Politica de Privacidad
        </LinkText>
        <FooterText>
          @2021 Ministerio de Turismo de la República Dominicana. Todos los
          derechos reservados.
        </FooterText>
      </CenterContainer>
    </FooterContainer>
  );
}

export default Footer;
