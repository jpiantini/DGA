import { useState, useLayoutEffect, useEffect } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { Grid } from '@mui/material';
import ServiceCard from './components/ServiceCard/ServiceCard';
import { titles, ListServices } from './ListOfServicesPerCategoryConstants';
import { useHistory } from 'react-router';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    Container,
} from './styles/ListOfServicesPerCategoryStyles';

function ListOfServicesPerCategory() {

    const matchesWidth = useMediaQuery('(min-width:867px)');
    const history = useHistory();
    let { id } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);

    const handleServiceRequest = (serviceID) => {
        if (authenticated) {
            //send to service request 
     //       alert('Servicio solicitado');
            history.push(`/app/requestService/${serviceID}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        if (id == 1 || id == 2 || id == 3) {
            //UPDATE APP HEADER SUBTITLE
            let Title = titles.find((title) => title.id == id)?.title; //find title in mockup info need 
            dispatch(UpdateAppSubHeaderTitle(Title)) // TITLE OF SUBHEADER APP
        }else if (id == 0) {
            dispatch(UpdateAppSubHeaderTitle('TODOS LOS SERVICIOS')) // IN CASE IF NEEDED SHOW ALL SERVICES
        }
         else {
            //IF ENTERED CATEGORY AS PARAM DOES`NT EXISTS REDIRECT TO FIRST CATEGORY
            history.push('/app/listOfServices/1')
            let Title = titles.find((title) => title.id == 1)?.title;
            dispatch(UpdateAppSubHeaderTitle(Title))
        }
    }, []);

    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
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
                            <Grid container direction="row" justifyContent="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {
                                    ListServices.map((item) => (
                                        <Grid item >
                                            <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleServiceRequest(item.id)} OnViewInformationPress={() => history.push('/app/serviceDescription/1') /*1 is the service ID*/} />
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
                                    <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleServiceRequest(item.id)} OnViewInformationPress={() => history.push('/app/serviceDescription/1') /*1 is the service ID*/} />
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
