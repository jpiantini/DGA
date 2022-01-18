import { Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import { MediumHeightDivider, SmallHeightDivider } from '../../../../theme/Styles';
import Fade from 'react-reveal/Fade';
import DocumentsOfRequestsCard from '../../../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './MyInstitutionalDocumentsConstants';

function MyInstitutionalDocuments() {

    return (
        <Fade right >
            <MediumHeightDivider />
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

export default MyInstitutionalDocuments;
