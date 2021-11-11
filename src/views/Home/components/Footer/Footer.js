import Grid from '@mui/material/Grid';
import {
    FooterRoutes,
} from './FooterConstants';
import {
    Title,
    FooterContainer,
    LinkText,
    FooterText,
    CenterContainer,
    TitleDivider
} from './styles/FooterStyles';

function Footer() {
    return (
            <FooterContainer>
                <CenterContainer >
                    <Title>Directorio de servicios</Title>
                    <TitleDivider/>
                    <Grid container justifyContent="flex-start" direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
            </FooterContainer>
    );
}

export default Footer;
