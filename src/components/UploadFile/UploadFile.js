import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Container, InputFile, StyledUploadFileIcon, InputFileButtonContainer, RowContainer, RowSeparator, StyledFolderIcon,PaginationContainer } from './styles/UploadFileStyles';
import { FieldTitle, Row, SmallHeightDivider, StyledPagination, StyledTextInput } from '../../theme/Styles';
import FormModal from '../FormModal/FormModal';
import DocumentsOfRequestsCard from '../DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { format } from 'date-fns';
import { useQuery, useQueryClient } from 'react-query';
import { getPersonalDocuments } from '../../api/MyDocuments';
import { cacheConfig } from '../../cacheConfig';


function UploadFile({ id, title, placeholder, onChange, value, onBlur, error, required, hideDownloadButton, helperText = " ", findDocuments = false }) {

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(['userData']);
    //TO DO ADD PAGINATION
    const [currentPage, setCurrentPage] = useState(1);

    const { data: documentsData, isLoading: documentsDataLoading } = useQuery(['documentsData', currentPage],
        () => getPersonalDocuments(userData.payload.citizen_id, currentPage), {
        staleTime: cacheConfig.staleTimeForRequestedServiceDetail
    })

    const [documentModalIsOpen, setDocumentModalIsOpen] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(value?.name);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFileName(e.target.files[0].name);
            return e.target.files[0]
        }
    }

    const handleDocumentSelect = (e) => {
        setSelectedFileName(e.name);
        handleModalVisibility();
        return {
            isARoute: true,
            name: e.nameClear,
            extension: e.type,
            type: e.type === 'pdf' ? `application/pdf` : `image/${e.type}`,
            route: e.route,
        }
    }

    const handleModalVisibility = () => {
        setDocumentModalIsOpen(!documentModalIsOpen);
    }

    const documentsDataForShow = documentsData?.data?.map((document) => {
        return {
            name: `${document.name}.${document.extension}`,
            nameClear: document.name,
            documentType: document.extension,
            date: format(new Date(document.created_at), 'yyyy-MM-dd'),
            url: document.url,
            type: document.extension,
            route: document.route

        }
    })

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }


    if (documentsDataLoading) return null;
    return (
        <Container>

            <Row>
                <FieldTitle>{title} </FieldTitle>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <FieldTitle style={{ color: COLORS.red }}>*</FieldTitle>
                    </Fragment>
                    : null}

            </Row>


            <RowContainer>
                <StyledTextInput
                    fullWidth
                    placeholder={placeholder}
                    value={selectedFileName}
                    helperText={helperText}
                    error={error}
                    InputProps={{
                        readOnly: true
                    }}
                />{
                    findDocuments &&
                    <Fragment>
                        <RowSeparator />
                        <div onClick={handleModalVisibility} title='Seleccionar documento'>
                            <StyledFolderIcon />
                        </div>
                    </Fragment>
                }
                <RowSeparator />
                <InputFileButtonContainer title='Subir archivo' htmlFor={id}>
                    <StyledUploadFileIcon />
                </InputFileButtonContainer>
                <InputFile id={id} type='file'
                    onBlur={(e) => {
                        onBlur && onBlur({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    }
                    onChange={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    } />
            </RowContainer>
            <FormModal open={documentModalIsOpen} onClose={handleModalVisibility} title="Mis documentos">
                <DocumentsOfRequestsCard data={documentsDataForShow} disableCardStyle showSelectButton hideDownloadButton={hideDownloadButton}
                    onSelectClick={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: handleDocumentSelect(e)
                            }
                        })
                    }}
                />
                <PaginationContainer>
                    <StyledPagination count={documentsData?.last_page} page={currentPage}
                        onChange={(event, page) => {
                            handleChangePage(page);
                        }} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
                    <SmallHeightDivider />
                </PaginationContainer>
                <SmallHeightDivider />
            </FormModal>
        </Container>
    );
}

export default memo(UploadFile);