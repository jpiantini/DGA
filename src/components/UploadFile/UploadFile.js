import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Container, InputFile, StyledUploadFileIcon, InputFileButtonContainer, RowContainer, RowSeparator, StyledFolderIcon, PaginationContainer } from './styles/UploadFileStyles';
import { FieldTitle, Row, SmallHeightDivider, StyledButton, StyledPagination, StyledTextInput } from '../../theme/Styles';
import FormModal from '../FormModal/FormModal';
import DocumentsOfRequestsCard from '../DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { format } from 'date-fns';
import { useQuery, useQueryClient } from 'react-query';
import { getPersonalDocuments } from '../../api/MyDocuments';
import { cacheConfig } from '../../cacheConfig';
import { types, typesForSelectedList, typesForExcel } from './UploadFileConstants';
import { useSnackbar } from 'notistack';
import { FormControl, FormGroup, FormHelperText } from '@mui/material';
import { replaceGuionToSlashFromString } from '../../utilities/functions/StringUtil';

function UploadFile({ id, title, placeholder, onChange, value, onBlur, disabled, error, required, hideDownloadButton, extension, helperText = " ", findDocuments = false, multipleDocuments = false, ignoreType = [] }) {

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(['userData']);
    const { enqueueSnackbar } = useSnackbar();

    const [currentPage, setCurrentPage] = useState(1);

    const { data: documentsData, isLoading: documentsDataLoading } = useQuery(['documentsData', currentPage],
        () => getPersonalDocuments(userData.payload.citizen_id, currentPage), {
        staleTime: cacheConfig.staleTimeForRequestedServiceDetail
    })

    const [selectedFilesModalIsOpen, setSelectedFilesModalIsOpen] = useState(false);
    const [myDocumentsModalIsOpen, setMyDocumentsModalIsOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(value ? value : []);
    const [selectedFileName, setSelectedFileName] = useState(value?.[0]?.name);

    const validateAndChangeSelectedFiles = (action, e) => {
        let filesLength = e.target.files.length;
        if (filesLength > 0) {
            let loopError = false;
            let data = [];
            for (let i = 0; i < filesLength; i++) {
                const file = e.target.files[i];
                const fileExtension = e.target.files[i].name.substring(e.target.files[i].name.indexOf('.') + 1)
                const fileSize = file.size / 1024 / 1024;

                if (fileSize > 120) {
                    alert('El peso limite por archivo es de 120mb');
                    loopError = true;
                    break;
                }

                if (ignoreType?.includes(fileExtension)) {
                    alert('Documento no permitido');
                    loopError = true;
                    break;
                }
                //Good select file by file type specified on extension
                if (extension != undefined) {
                    //Validate File extension valid in constants types and fileType
                    if (types.find((type) => type.includes(extension)) && file.type.includes(extension) ||
                        //Validate File extension valid in constands types and fileType in file string name example file.pdf
                        types.find((type) => type.includes(extension)) && types.find((type) => type.includes(fileExtension)) &&
                        extension.includes(fileExtension) ||
                        //Validate File extension valid in constands types and fileType in file string name example file.pdf for XLSX AND XLS
                        fileExtension === 'xlsx' && extension === 'xls' || fileExtension === 'xls' && extension === 'xlsx' ||
                        fileExtension === 'xlsx' && extension === 'xlsx' || fileExtension === 'xls' && extension === 'xls') {

                        setSelectedFileName(file.name)
                        data.push(file)
                        continue;
                    } else {
                        //bad
                        setSelectedFileName('');
                        alert(`El archivo requiere una extension .${extension}`);
                        loopError = true;
                        break;
                    }
                }
                //Good select valid file
                if (types.find((type) => type === file.type) || types.find((type) => type === fileExtension)) {
                    setSelectedFileName(file.name);
                    data.push(file);
                    continue;
                }
                //bad
                setSelectedFileName('');
                alert('Documento no permitido');
                loopError = true;
                break;
            }

            if (loopError == false) {
                //Good
                let concatData = [
                    ...selectedFiles,
                    ...data
                ]
                setSelectedFiles(concatData);
                action({
                    target: {
                        id,
                        value: concatData
                    }
                });
            } else {
                //Bad
                //   console.log('error en loop')
            }
        }
    }

    const handleDocumentSelect = (e) => {
        const fileExtension = e.name.substring(e.name.indexOf('.') + 1)
        const _extension = extension === 'xls' ?
            "application/vnd.ms-excel" :
            extension === 'xlsx' ?
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
                extension

        if (_extension != undefined) {
            if (types.find((type) => type.includes(_extension)) && e.type.includes(_extension) ||
                types.find((type) => type.includes(fileExtension)) && _extension.includes(fileExtension) ||
                //Validate File extension valid in constands types and fileType in file string name example file.pdf for XLSX AND XLS
                fileExtension === 'xlsx' && extension === 'xls' || fileExtension === 'xls' && extension === 'xlsx' ||
                fileExtension === 'xlsx' && extension === 'xlsx' || fileExtension === 'xls' && extension === 'xls'
            ) {
                //Good check selected file extension is equal than field required extension
            } else {
                //bad
                setSelectedFileName('');
                alert(`El archivo requiere una extension .${extension}`);
                return;
            }
        }
        //Good select a valid file
        setSelectedFileName(e.name);
        enqueueSnackbar("Documento agregado", { variant: 'success' })
        if (multipleDocuments == false) {
            handleMyDocumentsModalVisibility();
        }
        let concatData = [
            ...selectedFiles,
            {
                isARoute: true,
                name: e.nameClear,
                extension: e.type,
                type:
                    e.type === "xls" || e.type === "xlsx" ?
                        typesForExcel[e.type]
                        :
                        types.find((type) => type.includes(e.type)),
                route: e.route,
            }
        ]
        setSelectedFiles(concatData);
        onChange({
            target: {
                id,
                value: concatData
            }
        });
    }

    const handleRemoveFileFromSelectedFiles = (file, position) => {
        let newFiles = []
        selectedFiles.forEach((item, index) => {
            if (index != position) {
                newFiles.push(item);
            }
        });
        setSelectedFiles(newFiles)
        onChange({
            target: {
                id,
                value: newFiles
            }
        })
    }

    const handleMyDocumentsModalVisibility = () => {
        setMyDocumentsModalIsOpen(!myDocumentsModalIsOpen);
    }


    const handleSelectedFilesModalVisibility = () => {
        setSelectedFilesModalIsOpen(!selectedFilesModalIsOpen);
    }

    const documentsDataForShow = documentsData?.data?.map((document) => {
        const typeForName = document.extension === "vnd.ms-excel" ? "xls" :
            document.extension === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ?
                "xlsx" : document.extension
        return {
            name: `${document.name}.${typeForName}`,
            nameClear: document.name,
            documentType: document.extension,
            date: format(new Date(replaceGuionToSlashFromString(document.created_at)), 'yyyy-MM-dd'),
            url: document.url,
            type: document.extension,
            route: document.route

        }
    })

    const selectedFilesDataForShow = selectedFiles?.map((file) => {
        const typeForName = typesForSelectedList?.[file.type || file.extension]
        return {
            name: `${file.name}${file?.isARoute ? `.${typeForName}` : ""} `,
            nameClear: '',
            documentType: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            url: '',
            type: '',
            route: ''

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
                {
                    multipleDocuments ?
                        <FormControl fullWidth disabled={disabled} required={required} error={error} component='fieldset' variant='standard'>
                            <FormGroup >

                                <StyledButton onClick={handleSelectedFilesModalVisibility}>
                                    {value?.length > 0 ? `Ver archivos seleccionados (${value?.length})` : 'No hay archivos seleccionados'}
                                </StyledButton>
                                <FormHelperText>{helperText}</FormHelperText>
                            </FormGroup >

                        </FormControl>
                        :
                        <StyledTextInput
                            fullWidth
                            placeholder={placeholder}
                            value={selectedFileName}
                            helperText={helperText}
                            error={error}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                }
                {
                    findDocuments &&
                    <Fragment>
                        <RowSeparator />
                        <div onClick={handleMyDocumentsModalVisibility} title='Seleccionar documento'>
                            <StyledFolderIcon />
                        </div>
                    </Fragment>
                }
                <RowSeparator />
                <InputFileButtonContainer title='Subir archivo' htmlFor={id}>
                    <StyledUploadFileIcon />
                </InputFileButtonContainer>
                <InputFile id={id} type='file' multiple={multipleDocuments} accept={extension === 'pdf' ? 'application/pdf' : '*'}
                    onBlur={(e) => {
                        onBlur && validateAndChangeSelectedFiles(onBlur, e)
                    }
                    }
                    onChange={(e) => {
                        validateAndChangeSelectedFiles(onChange, e)
                    }
                    } />
            </RowContainer>
            <FormModal open={selectedFilesModalIsOpen} onClose={handleSelectedFilesModalVisibility} title={`${title} - Archivos`}>
                <DocumentsOfRequestsCard data={selectedFilesDataForShow} disableCardStyle hideSeeButton hideDownloadButton showDeleteButton
                    onDeleteClick={handleRemoveFileFromSelectedFiles}
                />

                <SmallHeightDivider />
            </FormModal>
            <FormModal open={myDocumentsModalIsOpen} onClose={handleMyDocumentsModalVisibility} title="Mis documentos">
                <DocumentsOfRequestsCard data={documentsDataForShow} disableCardStyle showSelectButton hideDownloadButton={hideDownloadButton}
                    onSelectClick={handleDocumentSelect} />
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