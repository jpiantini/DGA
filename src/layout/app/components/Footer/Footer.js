import {
    FooterMiturLogo,
} from './FooterConstants';
import {
    Image,
    FooterContainer,
    LinkText,
    FooterText,
    CenterContainer
} from './styles/FooterStyles';

function Footer() {
    return (
        <FooterContainer>
            <CenterContainer>
                <Image src={FooterMiturLogo} />
                <LinkText href="https://www.mitur.gob.do/politicas-de-privacidad/" style={{ textDecoration: 'underline' }}>Politica de Privacidad</LinkText>
                <FooterText>@2021 Ministerio de Turismo de la República Dominicana. Todos los derechos reservados.</FooterText>
            </CenterContainer>
        </FooterContainer>
    );
}

export default Footer;
