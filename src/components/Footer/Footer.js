import {
  Image,
  FooterContainer,
  LinkText,
  FooterText,
  CenterContainer,
  Divider,
  LogosContainer,
  CertificationsImage,
  CertificationsContainer,
  TextDivider
} from "./styles/FooterStyles";
import { useHistory } from "react-router";
import EscudoPNG from '../../assets/images/EscudoPNG.png'
import MiturPNG from '../../assets/images/LogoSecondaryWhite.png'
import A3 from '../../assets/images/A3.png'
import A2 from '../../assets/images/A2.png'
import E1 from '../../assets/images/E1.png'
import { Row, SmallHeightDivider } from '../../theme/Styles'
function Footer() {
  const history = useHistory();
  return (
    <FooterContainer>
      <CenterContainer>
        <LogosContainer>
          <Image src={EscudoPNG} />
          <Divider />
          <Image src={MiturPNG} />
        </LogosContainer>
        <strong>
          <FooterText>
            Dirección general de Aduanas
          </FooterText>
        </strong>
        <FooterText>
          Abraham Lincoln 1101, Edif. Miguel Cocco, Sto. Dgo. R.D.
        </FooterText>
        <FooterText>
          809-547-7070
        </FooterText>
        <FooterText>
          info@aduanas.gob.do
        </FooterText>
        <Row>
          <LinkText target="_blank" href="https://www.aduanas.gob.do/terminos">
            Terminos de uso
          </LinkText>
          <TextDivider />
          <LinkText onClick={() => history.push("/app/policy")}>
            Políticas de Privacidad
          </LinkText>
          <TextDivider />
          <LinkText target="_blank" href="https://www.aduanas.gob.do/faq">
            Preguntas Frecuentes
          </LinkText>
        </Row>
        <FooterText>
          © 2022. Todos los Derechos Reservados.
        </FooterText>
        <SmallHeightDivider />
        {process.env.REACT_APP_CONFIG_SHOW_OGTIC_CERTIFICATES == 1 &&
          <CertificationsContainer>
            <LogosContainer>
              <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
                <CertificationsImage src={A3} />
              </a>
              <div style={{ width: '10px' }} />
              <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
                <CertificationsImage src={A2} />
              </a>
              <div style={{ width: '10px' }} />
              <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
                <CertificationsImage src={E1} />
              </a>
            </LogosContainer>
          </CertificationsContainer>
        }
        <SmallHeightDivider />

      </CenterContainer>
    </FooterContainer>
  );
}

export default Footer;
