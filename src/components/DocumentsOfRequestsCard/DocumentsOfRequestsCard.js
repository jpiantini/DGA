import { Fragment, useState, memo } from 'react';
import { SmallHeightDivider, StyledButton, Row } from '../../theme/Styles';
import IconButton from '@mui/material/IconButton';
import {
    Container,
    RowContainer,
    Title,
    ContentContainer,
    BodyText,
    LineDivider,
    StyledDescriptionIcon,
    Column,
    StyledDownloadIcon,
    StyledCheckIcon,
    StyledClearIcon,
    StyledCloseIcon,
    StyledCheckBoxIcon,
    StyledCheckBoxOutlineBlankIcon,
} from './styles/DocumentsOfRequestsCardStyles';
import { DocumentViewer } from 'react-documents';
import { Dialog } from '@mui/material';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from 'react-redux';
import { downloadFile } from '../../utilities/functions/DownloadUtil';
import { typesForDownload } from './DocumentsOfRequestsCardConstants';

function DocumentsOfRequestsCard({ title, data, onSelectClick, onDeleteClick, hideSeeButton = false, showDeleteButton = false, showSelectButton = false, disableCardStyle = false, hideDownloadButton = false, selectedItemsByIndex = [] }) {

    const dispatch = useDispatch();

    const [currentDocumentURL, setCurrentCurrentURL] = useState();
    const [viewerOpen, setViewerOpen] = useState(false);

    const handleViewer = async ({ url, extension }) => {
        const _extension = extension === "vnd.ms-excel" ? "xls" :
            extension === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ?
                "xlsx" : extension
        if (url) {
            setViewerOpen(true);
            if (_extension === 'pdf' || _extension === 'xls' || _extension === 'xlsx') {
                const type = typesForDownload[_extension]
                let downloadedDocument = await downloadFile(url, type);
                setCurrentCurrentURL({ url: downloadedDocument, type: _extension });
            } else {
                setCurrentCurrentURL({ url: url, type: _extension });
            }

        } else {
            setCurrentCurrentURL(undefined);
            setViewerOpen(false);
        }
    };

    return (
        <Container disableCardStyle={disableCardStyle}>
            <SmallHeightDivider />
            <ContentContainer disableCardStyle={disableCardStyle}>
                <Title>{title}</Title>
                <RowContainer>
                    <Column style={{ width: '35%' }}>
                        <BodyText>
                            Nombre del Documento
                        </BodyText>
                    </Column>
                    {/*
                    <Column style={{ width: '42%' }}>
                        <BodyText>
                            Tipo Archivo
                        </BodyText>
                    </Column>
                   */}

                    <Column style={{ width: '18%' }}>
                        <BodyText>
                            Fecha
                        </BodyText>
                    </Column>

                    <Column style={{ width: '15%' }}>
                        <BodyText >
                            Acción
                        </BodyText>
                    </Column>
                </RowContainer>
                <SmallHeightDivider />
                {
                    data?.map((item, index) => {
                        const thisItemIsPreviouslySelected = selectedItemsByIndex.includes(index) ? true : false;
                        return (
                                <div key={index}>
                                    <RowContainer >
                                        <Column style={{ width: '35%' }}>
                                            <BodyText>
                                                {item.name}
                                            </BodyText>

                                        </Column>

                                        <Column style={{ width: '18%' }}>
                                            <BodyText>
                                                {item.date}
                                            </BodyText>
                                        </Column>

                                        <Column style={{ width: '15%' }}>
                                            <Row>
                                                {
                                                    !hideSeeButton &&
                                                    <IconButton title='Ver'
                                                        onClick={() => handleViewer({ url: item.url, extension: item.documentType })} sx={{ padding: 0 }}>
                                                        <StyledDescriptionIcon title='Ver' />
                                                    </IconButton>
                                                }

                                                {
                                                    !hideDownloadButton &&
                                                    <Fragment>
                                                        <div style={{ width: '15px' }} />
                                                        <IconButton title='Descargar'
                                                            onClick={() => window.open(item.url, '_blank')} sx={{ padding: 0 }}>
                                                            <StyledDownloadIcon title='Descargar' />
                                                        </IconButton>
                                                    </Fragment>
                                                }
                                                {
                                                    showSelectButton &&
                                                    <Fragment>
                                                        <div style={{ width: '15px' }} />
                                                        <IconButton title={'Seleccionar'}
                                                            onClick={() => {
                                                                thisItemIsPreviouslySelected ? 
                                                                onDeleteClick(item, index)
                                                                :
                                                                onSelectClick(item, index)
                                                            }} sx={{ padding: 0 }}>
                                                            {
                                                                thisItemIsPreviouslySelected ?
                                                                    <StyledCheckBoxIcon />
                                                                    :
                                                                    <StyledCheckBoxOutlineBlankIcon />
                                                            }
                                                        </IconButton>
                                                    </Fragment>
                                                }
                                                {
                                                    showDeleteButton &&
                                                    <Fragment>
                                                        <div style={{ width: '15px' }} />
                                                        <IconButton title='Eliminar'
                                                            onClick={() => onDeleteClick(item, index)} sx={{ padding: 0 }}>
                                                            <StyledClearIcon title='Eliminar' />
                                                        </IconButton>
                                                    </Fragment>
                                                }
                                            </Row>
                                        </Column>
                                    </RowContainer>
                                    <LineDivider />
                                </div>
                            )
                    }
                    )
                }
                <Dialog
                    open={viewerOpen}
                    onClose={handleViewer}
                    onBackdropClick={handleViewer}
                    fullWidth
                    maxWidth="xl"
                >
                    {
                        currentDocumentURL?.type === "pdf" || currentDocumentURL?.type === "xls" || currentDocumentURL?.type === "xlsx" ?
                            <DocumentViewer style={{ height: '90vh', width: '100%' }} viewer="url" url={currentDocumentURL?.url} />
                            :
                            <Fragment>
                                <IconButton sx={{ zIndex: 99999999, width: '50px', alignSelf: 'flex-end', position: 'absolute', backgroundColor: '#FFF' }} onClick={handleViewer}>
                                    <StyledCloseIcon />
                                </IconButton>
                                <TransformWrapper>
                                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                        <Fragment>
                                            <TransformComponent wrapperStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={currentDocumentURL?.url} style={{ maxWidth: '100%', alignSelf: 'center' }} />
                                            </TransformComponent>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <StyledButton style={{ borderRadius: 0 }} onClick={() => zoomIn()}>Zoom +</StyledButton>
                                                <StyledButton style={{ borderRadius: 0 }} onClick={() => zoomOut()}>Zoom -</StyledButton>
                                                <StyledButton style={{ borderRadius: 0 }} onClick={() => resetTransform()}>Reiniciar</StyledButton>
                                            </div>
                                        </Fragment>
                                    )}
                                </TransformWrapper>
                            </Fragment>
                    }
                </Dialog>
            </ContentContainer>
            <SmallHeightDivider />
            <SmallHeightDivider />
        </Container >
    );
}

export default memo(DocumentsOfRequestsCard);
