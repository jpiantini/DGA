import { useState } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import {
    ButtonContainer,
    Container,
} from './styles/ListOfServicesPerCategoryStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { Grid } from '@mui/material';
import ServiceCard from './components/ServiceCard/ServiceCard';
import { ListServices } from './ListOfServicesPerCategoryConstants';
import { useHistory } from 'react-router';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';

function ListOfServicesPerCategory() {
    const matchesWidth = useMediaQuery('(min-width:867px)');
    const history = useHistory();

    const [loginOrRegisterModalStatus,setLoginOrRegisterModalStatus] = useState(false);

    const handleLoginOrRegisterModal = () => {
        //CREATE OTHER FUNCTION TO VALIDATE LOGIN AND START REQUEST OR OPEN MODAL
        setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
    }
    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={handleLoginOrRegisterModal} onCloseClick={handleLoginOrRegisterModal}/>
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general"
                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                     sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                     sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                     Stet clita"
                    />
                    <SmallHeightDivider />
                    
                    {
                        matchesWidth &&
                        <>
                        <TextInformation title="Servicios" />
                        <SmallHeightDivider />
                        <Grid  container direction="row" justifyContent="flex-start"  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                ListServices.map((item) => (
                                    <Grid item >
                                        <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleLoginOrRegisterModal()} OnViewInformationPress={() => history.push('/app/serviceDescription')}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        </>
                    }
                </Container>
            </Row>
            {
                !matchesWidth &&
                <>
                <TextInformation title="Servicios" />
                <SmallHeightDivider />
                <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        ListServices.map((item) => (
                            <Grid item >
                                <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleLoginOrRegisterModal()} OnViewInformationPress={() => history.push('/app/serviceDescription')}/>
                            </Grid>
                        ))
                    }
                </Grid>
                </>
            }
        </Container>
    );
}

export default ListOfServicesPerCategory;
