import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import Collapsable from '../../components/Collapsable/Collapsable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { Grid } from '@mui/material';
import ServiceCard from './components/ServiceCard/ServiceCard';
import { localDirections, ListServices } from './ListOfServicesPerCategoryConstants';
import { useHistory } from 'react-router';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    Container,
} from './styles/ListOfServicesPerCategoryStyles';
import { getAllQuestions, getAllServices, getGeneralInformationsFromWordpress } from '../../api/ListOfServicesPerCategory';
import { useQuery } from 'react-query';

function ListOfServicesPerCategory() {

    const matchesWidth = useMediaQuery('(min-width:867px)');
    const history = useHistory();
    let { categoryID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const { data: generalInformationData, isLoading: generalInformationDataLoading } = useQuery(['generalInformationData'], () => getGeneralInformationsFromWordpress())
    const { data: allQuestionsData, isLoading: allQuestionsDataLoading } = useQuery(['allQuestionsData'], () => getAllQuestions())
    const { data: listOfServices, isLoading: listOfServicesLoading } = useQuery(['listOfServices'], () => getAllServices())

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);
    const [currentDirection, setCurrentDirection] = useState();
    const [ListServicesState, setListServicesState] = useState([]);

    const handleServiceRequest = (serviceID) => {
        if (authenticated) {
            history.push(`/app/requestService/${serviceID}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        if (categoryID == 1 || categoryID == 2 || categoryID == 3 || categoryID == 0) {
            //find direction in local info  
            let localCurrentDirection = localDirections.find((direction) => direction.id == categoryID);
            // TITLE OF SUBHEADER APP
            dispatch(UpdateAppSubHeaderTitle(localCurrentDirection.title))
            setCurrentDirection(localCurrentDirection);
            if (listOfServices != undefined) {
                if (categoryID == 0) {
                    setListServicesState([...listOfServices[0].services, ...listOfServices[1].services, ...listOfServices[2].services]);
                } else {
                    setListServicesState(listOfServices.find((direction) => direction.id == categoryID).services);
                }
            }
        }
        else {
            //IF ENTERED CATEGORY AS PARAM DOES`NT EXISTS REDIRECT TO ALL SERVICES CATEGORY
            history.push('/app/listOfServices/0')
        }
    }, [categoryID, listOfServices]);

    if (listOfServicesLoading || allQuestionsDataLoading || listOfServicesLoading) return null

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
                                    ListServicesState?.map((item) => (
                                        <Grid key={item.id} item xs={4} sm={4} md={4}>
                                            <ServiceCard itemId={item.id}
                                                title={item.name}
                                                subTitle={item.description}
                                                relationTo={localDirections.find((direction) => direction.id == item.direction_id).title}
                                                onRequestPress={() => handleServiceRequest(item.id)}
                                                OnViewInformationPress={() => history.push(`/app/serviceDescription/${item.id}`)} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Fragment>
                    }
                    <MediumHeightDivider />

                    <TextInformation title="Preguntas frecuentes" />
                    <SmallHeightDivider />
                    {
                        allQuestionsData[currentDirection?.wordpressKey]?.map((question) => (
                            <div>
                                <Collapsable title={question.question} content={question.answer} />
                                <SmallHeightDivider />

                            </div>
                        ))
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
                            ListServicesState?.map((item) => (
                                <Grid item key={item.id}>
                                    <ServiceCard itemId={item.id}
                                        title={item.name}
                                        subTitle={item.description}
                                        relationTo={localDirections.find((direction) => direction.id == item.direction_id).title}
                                        onRequestPress={() => handleServiceRequest(item.id)}
                                        OnViewInformationPress={() => history.push(`/app/serviceDescription/${item.id}`)} />
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
