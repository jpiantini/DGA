import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
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
import { getAllServices, getGeneralInformationsFromWordpress } from '../../api/ListOfServicesPerCategory';
import { useQuery } from 'react-query';

function ListOfServicesPerCategory() {

    const matchesWidth = useMediaQuery('(min-width:867px)');
    const history = useHistory();
    let { categoryID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const { data:generalInformationData } = useQuery(['generalInformationData'], () => getGeneralInformationsFromWordpress())
    const { data:listOfServices } = useQuery(['listOfServices'], () => getAllServices())

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);
    const [currentDirection, setCurrentDirection] = useState();
    const [ListServicesState, setListServicesState] = useState([]);

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
        if (categoryID == 1 || categoryID == 2 || categoryID == 3 || categoryID == 0) {
            //UPDATE APP HEADER SUBTITLE
            let localCurrentDirection = titles.find((title) => title.id == categoryID); //find title in mockup info need 
            dispatch(UpdateAppSubHeaderTitle(localCurrentDirection.title)) // TITLE OF SUBHEADER APP
            setCurrentDirection(localCurrentDirection);
            if (categoryID == 0) {
                setListServicesState(ListServices);
            } else {
                setListServicesState(ListServices.filter((item) => item.relationToID == localCurrentDirection.id))
            }
        }
        else {
            //IF ENTERED CATEGORY AS PARAM DOES`NT EXISTS REDIRECT TO FIRST CATEGORY
            history.push('/app/listOfServices/0')
        }
    }, [categoryID]);

    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general" content={
                        generalInformationData?.find((item) => item.id == currentDirection?.wordpressID)?.descriptionGeneral
                    } />
                    <SmallHeightDivider />

                    {
                        matchesWidth &&
                        <Fragment>
                            <TextInformation title="Servicios" />
                            <SmallHeightDivider />
                            <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {
                                    ListServicesState.map((item) => (
                                        <Grid key={item.id} item xs={4} sm={4} md={4}>
                                            <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleServiceRequest(item.id)} OnViewInformationPress={() => history.push('/app/serviceDescription/1') /*1 is the service ID*/} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Fragment>
                    }
                </Container>
            </Row>
            {
                !matchesWidth &&
                <Fragment>
                    <TextInformation title="Servicios" />
                    <SmallHeightDivider />
                    <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            ListServicesState.map((item) => (
                                <Grid item key={item.id}>
                                    <ServiceCard itemId={item.id} {...item} onRequestPress={() => handleServiceRequest(item.id)} OnViewInformationPress={() => history.push('/app/serviceDescription/1') /*1 is the service ID*/} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Fragment>
            }
        </Container>
    );
}

export default ListOfServicesPerCategory;
