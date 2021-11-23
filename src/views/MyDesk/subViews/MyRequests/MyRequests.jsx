import { useState, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { MockupCompletedRequests, MockupInProcessRequests, MockupRejectedRequests } from '../../MyDeskConstants';
import RequestCard from './../../components/RequestCard/RequestCard';
import RequestDetailModal from './../../components/RequestDetailModal/RequestDetailModal';
import Fade from 'react-reveal/Fade';

function MyRequests() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    const [openRequestDetailModal, setOpenRequestDetailModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState();

    const handleRequestDetailModalStatus = (request) => {
        setSelectedRequest(request);
        setOpenRequestDetailModal(!openRequestDetailModal);
    }

    return (
        <Fade right >
            <MediumHeightDivider />
            <TextInformation title="Solicitudes en proceso" />

            {
                MockupInProcessRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={request.percent}
                            onClick={() => handleRequestDetailModalStatus(request)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <TextInformation title="Solicitudes Completadas" />

            {
                MockupCompletedRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={'100%'}
                            onClick={() => handleRequestDetailModalStatus(request)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <TextInformation title="Solicitudes Rechazadas" />

            {
                MockupRejectedRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={'100%'}
                            onClick={() => handleRequestDetailModalStatus(request)}
                            variant={request.status} />
                    </Fragment>
                ))
            }
            <RequestDetailModal
                selectedItem={selectedRequest}
                open={openRequestDetailModal}
                onCloseClick={handleRequestDetailModalStatus}
            //OnContinueClick
            />
        </Fade>

    );
}

export default MyRequests;
