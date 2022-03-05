import { Fragment, useState } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import { MediumHeightDivider, SmallHeightDivider, StyledPagination } from '../../../../theme/Styles';
import Fade from 'react-reveal/Fade';
import DocumentsOfRequestsCard from '../../../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './MyInstitutionalDocumentsConstants';
import { useQuery, useQueryClient } from 'react-query';
import { getInstitutionalDocuments } from '../../../../api/MyInstitutionalDocuments';
import { DocumentsContainer, SectionTitle } from '../../styles/MyDeskStyles';
import { format } from 'date-fns';
import COLORS from '../../../../theme/Colors';

function MyInstitutionalDocuments() {

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(['userData']);

    const [currentPage, setCurrentPage] = useState(1);

    const { data: institutionalDocumentsData, isLoading: institutionalDocumentsDataLoading } = useQuery(['institutionalDocumentsData'], () => getInstitutionalDocuments(userData.payload.citizen_id))

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const documentsDataForShow = institutionalDocumentsData?.data?.map((document) => {
        return {
            name: `${document.name}.${document.extension}`,
            documentType: document.extension,
            date: format(new Date(document.created_at), 'yyyy-MM-dd'),
            url: document.url,
            type: document.extension

        }
    })


    if (institutionalDocumentsDataLoading) return null
    return (
        <Fade right >
            <MediumHeightDivider />
            {
                institutionalDocumentsData?.data?.length > 0 ?
                    <DocumentsContainer>
                        <DocumentsOfRequestsCard title={"Institucionales"} data={documentsDataForShow} />
                        <SmallHeightDivider />
                        <StyledPagination count={institutionalDocumentsData?.last_page} page={currentPage}
                            onChange={(event, page) => {
                                handleChangePage(page);
                            }} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
                    </DocumentsContainer>
                    :
                    <SectionTitle>
                        No hay documentos institucionales
                    </SectionTitle>
            }
            <SmallHeightDivider />
        </Fade>

    );
}

export default MyInstitutionalDocuments;


