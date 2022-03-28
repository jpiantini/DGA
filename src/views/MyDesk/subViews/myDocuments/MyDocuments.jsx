import { Fragment, useState } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import { MediumHeightDivider, SmallHeightDivider, StyledPagination } from '../../../../theme/Styles';
import Fade from 'react-reveal/Fade';
import DocumentsOfRequestsCard from '../../../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './MyDocumentsConstants';
import { useQuery, useQueryClient } from 'react-query';
import { getPersonalDocuments } from '../../../../api/MyDocuments';
import { DocumentsContainer, SectionTitle } from '../../styles/MyDeskStyles';
import { format } from 'date-fns';
import COLORS from '../../../../theme/Colors';
import { cacheConfig } from '../../../../cacheConfig';
import { replaceGuionToSlashFromString } from '../../../../utilities/functions/StringUtil';
import CenterLoading from '../../../../components/CenterLoading/CenterLoading';

function MyDocuments() {

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(['userData']);

    const [currentPage, setCurrentPage] = useState(1);

    const { data: documentsData, isLoading: documentsDataLoading } = useQuery(['documentsData', currentPage],
        () => getPersonalDocuments(userData.payload.citizen_id, currentPage),{
            staleTime:cacheConfig.staleTimeForRequestedServiceDetail
        })

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const documentsDataForShow = documentsData?.data?.map((document) => {
        return {
            name: `${document.name}.${document.extension}`,
            documentType: document.extension,
            date: format(new Date(replaceGuionToSlashFromString(document.created_at)), 'yyyy-MM-dd'),
            url: document.url,
            type: document.extension

        }
    })

    if (documentsDataLoading) return <CenterLoading/>
    return (
        <Fade right >
            <MediumHeightDivider />
            {
                documentsData?.data?.length > 0 ?
                    <DocumentsContainer>
                        <DocumentsOfRequestsCard title={"Personales"} data={documentsDataForShow} />
                        <SmallHeightDivider />
                        <StyledPagination count={documentsData?.last_page} page={currentPage}
                            onChange={(event, page) => {
                                handleChangePage(page);
                            }} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
                    </DocumentsContainer>
                    :
                    <SectionTitle>
                        No hay documentos personales
                    </SectionTitle>
            }
            <SmallHeightDivider />
        </Fade>

    );
}

export default MyDocuments;
