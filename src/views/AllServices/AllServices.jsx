import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import Collapsable from '../../components/Collapsable/Collapsable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { Grid } from '@mui/material';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { localDirections, ListServices } from './AllServicesConstants';
import { useHistory } from 'react-router';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    Container,
} from './styles/AllServicesStyles';
import { getAllQuestions, getAllServices, getGeneralInformationsFromWordpress } from '../../api/ListOfServicesPerCategory';
import { useQuery } from 'react-query';
import CenterLoading from '../../components/CenterLoading/CenterLoading';

function AllServices() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { categoryID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const { data: generalInformationData, isLoading: generalInformationDataLoading } = useQuery(['generalInformationData'], () => getGeneralInformationsFromWordpress())
    const { data: allQuestionsData, isLoading: allQuestionsDataLoading } = useQuery(['allQuestionsData'], () => getAllQuestions())
    const { data: listOfServices, isLoading: listOfServicesLoading } = useQuery(['listOfServices'], () => getAllServices())

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);
    const [currentDirection, setCurrentDirection] = useState();

    const handleServiceRequest = (service) => {
        if (authenticated) {
                history.push(`/app/requestService/${service.id}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        //find direction in local info  
        let localCurrentDirection = localDirections.find((direction) => direction.id == 0);
        // TITLE OF SUBHEADER APP
        dispatch(UpdateAppSubHeaderTitle(localCurrentDirection.title))
        setCurrentDirection(localCurrentDirection);
    }, []);

    if (generalInformationDataLoading || allQuestionsDataLoading || listOfServicesLoading) return <CenterLoading />

    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                {
                    matchesWidth &&
                    <Fragment>
                        <ServiceDirectoryMenu />
                        <RowBodyDivider />
                    </Fragment>
                }

                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general" content={
                        generalInformationData?.find((item) => item.id == currentDirection?.wordpressID)?.descriptionGeneral
                    } />
                    <SmallHeightDivider />

                    {
                        listOfServices?.map((item) => (
                            <Fragment key={item.id}>
                                <TextInformation title={item.name} />
                                <SmallHeightDivider />
                                <Grid alignItems="center" container direction="row" justifyContent={!matchesWidth ? "center" : "flex-start"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {
                                        item.services?.map((service) => (
                                            <Grid key={service.id} item>
                                                <ServiceCard itemId={service.id}
                                                    title={service.name}
                                                    subTitle={service.description}
                                                    relationTo={localDirections.find((direction) => direction.id == service.direction_id).title}
                                                    onRequestPress={() => handleServiceRequest(service)}
                                                    disableRequestButton={service.type_id === 1 ? true:false}
                                                    OnViewInformationPress={() => history.push(`/app/serviceDescription/${service.id}`)} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <MediumHeightDivider />
                            </Fragment>
                        ))
                    }
                    <MediumHeightDivider />
                </Container>
            </Row>
        </Container>
    );
}

export default AllServices;
