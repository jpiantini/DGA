import { Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import { MediumHeightDivider, SmallHeightDivider } from '../../../../theme/Styles';
import Fade from 'react-reveal/Fade';
import DocumentsOfRequestsCard from '../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './MyDocumentsConstants';

function MyDocuments() {

    return (
        <Fade right >
            <MediumHeightDivider />
            <TextInformation title="Solicitudes en proceso" />
            <SmallHeightDivider />
            {
                MockupDocuments.map((document) => (
                    <Fragment>
                        <DocumentsOfRequestsCard title={document.title} data={document.data} />
                        <SmallHeightDivider />
                    </Fragment>
                ))
            }
            <SmallHeightDivider />

            <TextInformation title="Solicitudes completadas" />
            <SmallHeightDivider />
            {
                MockupDocuments.map((document) => (
                    <Fragment>
                        <DocumentsOfRequestsCard title={document.title} data={document.data} />
                        <SmallHeightDivider />
                    </Fragment>
                ))
            }
            <SmallHeightDivider />
        </Fade>

    );
}

export default MyDocuments;
