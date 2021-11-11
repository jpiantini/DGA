import Grid from '@mui/material/Grid';
import {
    FooterMiturLogo,
    FooterRoutes,
} from './FooterConstants';
import {
    Image,
    SubTitle,
    FooterContainer,
    LinkText,
    FooterText,
    CenterContainer
} from './styles/FooterStyles';

function Footer() {
    return (
            <FooterContainer>
                <CenterContainer style={{ width: '100%', textAlign: 'start' }}>
                    <SubTitle style={{ margin: '10px' }}>Directorio de servicios</SubTitle>

                    <Grid container justifyContent="center" direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            FooterRoutes.map((item) => (
                                <Grid item direction="column" key={item.value}>
                                    <FooterText style={{ fontSize: '15px' }}>{item.title}</FooterText>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {
                                            item.routes.map((subItem) => (
                                                <LinkText href="https://www.mitur.gob.do/politicas-de-privacidad/">{subItem.title}</LinkText>
                                            ))
                                        }
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>
                </CenterContainer>
                <CenterContainer>
                    <Image src={FooterMiturLogo} />
                    <LinkText href="https://www.mitur.gob.do/politicas-de-privacidad/" style={{ textDecoration: 'underline' }}>Politica de Privacidad</LinkText>
                    <FooterText>@2021 Ministerio de Turismo de la República Dominicana. Todos los derechos reservados.</FooterText>
                </CenterContainer>
            </FooterContainer>
    );
}

export default Footer;
