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
import MiturPNG from '../../assets/images/MiturPNG.png'
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
            Ministerio de Turismo de la República Dominicana
          </FooterText>
        </strong>
        <FooterText>
          Ave. Cayetano Germosén #419, esq. Ave. Gregorio Luperón, Sector Mirador Sur, Santo Domingo, República Dominicana
        </FooterText>
        <FooterText>
          Tel.:809-221-4660 | Fax: 809-740-4500
        </FooterText>
        <FooterText>
          info@mitur.gob.do
        </FooterText>
        <Row>
          <LinkText target="_blank" href="https://www.mitur.gob.do/terminos-de-uso/">
            Terminos de uso
          </LinkText>
          <TextDivider />
          <LinkText onClick={() => history.push("/app/policy")}>
            Políticas de Privacidad
          </LinkText>
          <TextDivider />
          <LinkText target="_blank" href="https://www.mitur.gob.do/preguntas-frecuentes/">
            Preguntas Frecuentes
          </LinkText>
        </Row>
        <FooterText>
          @2021 Ministerio de Turismo de la República Dominicana. Todos los
          derechos reservados.
        </FooterText>
        <SmallHeightDivider />
        {/* remove comment when mitur get ogtic certified
        <CertificationsContainer>
          <LogosContainer>
            <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
              <CertificationsImage src={A3} />
            </a>
            <div style={{width:'10px'}}/>
            <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
              <CertificationsImage src={A2} />
            </a>
            <div style={{width:'10px'}}/>
            <a target="_blank" href="https://optic.gob.do/nortic/index.php/certificaciones/instituciones-certificadas/item/ministerio-de-turismo-mitur">
              <CertificationsImage src={E1} />
            </a>
          </LogosContainer>
        </CertificationsContainer>
        */}
        <SmallHeightDivider />

      </CenterContainer>
    </FooterContainer>
  );
}

export default Footer;
