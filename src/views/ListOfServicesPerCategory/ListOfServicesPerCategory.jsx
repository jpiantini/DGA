import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import Collapsable from '../../components/Collapsable/Collapsable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { Grid } from '@mui/material';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
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
import CenterLoading from '../../components/CenterLoading/CenterLoading';

function ListOfServicesPerCategory() {

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
    const [ListServicesState, setListServicesState] = useState([]);

    const handleServiceRequest = (service) => {
        if (authenticated) {
            history.push(`/app/requestService/${service.id}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        if (categoryID == 1 || categoryID == 2 || categoryID == 3) {
            //find direction in local info  
            let localCurrentDirection = localDirections.find((direction) => direction.id == categoryID);
            // TITLE OF SUBHEADER APP
            dispatch(UpdateAppSubHeaderTitle(localCurrentDirection.title))
            setCurrentDirection(localCurrentDirection);
            if (listOfServices != undefined) {
                setListServicesState(listOfServices.find((direction) => direction.id == categoryID).services);
            }
        }
        else {
            //IF ENTERED CATEGORY AS PARAM DOES`NT EXISTS REDIRECT TO ALL SERVICES
            history.push('/app/allServices')
        }
    }, [categoryID, listOfServices]);

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

                    <Fragment>
                        <TextInformation title="Tramites" />
                        <SmallHeightDivider />
                        <Grid alignItems="center" container direction="row" justifyContent={!matchesWidth ? "center" : "flex-start"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                ListServicesState?.map((item) => (
                                    <Grid key={item.id} item >
                                        <ServiceCard itemId={item.id}
                                            title={item.name}
                                            subTitle={item.description}
                                            relationTo={localDirections.find((direction) => direction.id == item.direction_id).title}
                                            onRequestPress={() => handleServiceRequest(item)}
                                            disableRequestButton={item.type_id === 1 ? true : false}
                                            OnViewInformationPress={() => history.push(`/app/serviceDescription/${item.id}`)} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Fragment>

                    <MediumHeightDivider />

                    <Fragment>
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
                    </Fragment>



                </Container>
            </Row>

        </Container>
    );
}

export default ListOfServicesPerCategory;
