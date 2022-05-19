import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { getAllServices } from '../../../../api/ListOfServicesPerCategory';
import { capitalizeFirstLetter } from '../../../../utilities/functions/StringUtil';
import {
    Title,
    FooterContainer,
    LinkText,
    FooterText,
    CenterContainer,
    TitleDivider
} from './styles/FooterStyles';

function Footer({FooterRoutes}) {
    const history = useHistory();

    const { data: listOfServices,isLoading } = useQuery(['listOfServices'], () => getAllServices())
    if(isLoading) return null;
    return (
            <FooterContainer>
                <CenterContainer >
                    <Title>Directorio de tramites</Title>
                    <TitleDivider/>
                    <Grid container justifyContent="space-between" direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            listOfServices.map((direction) => (
                                <Grid item direction="column" key={direction.id}>
                                    <FooterText>{direction.name}</FooterText>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {
                                            direction.services.map((service) => (
                                                <LinkText title={capitalizeFirstLetter(service.name)}
                                                onClick={() => history.push(`/app/serviceDescription/${service.id}`)}>
                                                {capitalizeFirstLetter(service.name)}</LinkText>
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
