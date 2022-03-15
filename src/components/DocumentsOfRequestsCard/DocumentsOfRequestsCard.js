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
} from './styles/DocumentsOfRequestsCardStyles';
import { DocumentViewer } from 'react-documents';
import { Dialog } from '@mui/material';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from 'react-redux';
import { ShowGlobalLoading, HideGlobalLoading } from '../../redux/actions/UiActions';
import { downloadPDF } from '../../utilities/functions/DownloadUtil';

function DocumentsOfRequestsCard({ title, data, onSelectClick, showSelectButton = false, disableCardStyle = false, hideDownloadButton = false }) {

    const dispatch = useDispatch();

    const [currentDocumentURL, setCurrentCurrentURL] = useState();
    const [viewerOpen, setViewerOpen] = useState(false);

    const handleViewer = async ({ url, type }) => {
        if (url) {
            setViewerOpen(true);
            if (type === 'pdf') {
                let downloadedDocument = await downloadPDF(url);
                setCurrentCurrentURL({ url: downloadedDocument, type: type });
            } else {
                setCurrentCurrentURL({ url: url, type: type });
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
                    data?.map((item) => (
                        <div>
                            <RowContainer >
                                <Column style={{ width: '35%' }}>
                                    <BodyText>
                                        {item.name}
                                    </BodyText>

                                </Column>
                                {
                                    /* <Column style={{ width: '42%' }}>
                                         <BodyText>
                                             {item.documentType.toUpperCase()}
                                         </BodyText>
                                     </Column>
                                     */
                                }
                                <Column style={{ width: '18%' }}>
                                    <BodyText>
                                        {item.date}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '15%' }}>
                                    <Row>
                                        <IconButton title='Ver'
                                            onClick={() => handleViewer({ url: item.url, type: item.documentType })} sx={{ padding: 0 }}>
                                            <StyledDescriptionIcon />
                                        </IconButton>
                                        {
                                        !hideDownloadButton &&
                                            <Fragment>
                                                <div style={{ width: '15px' }} />
                                                <IconButton title='Descargar'
                                                    onClick={() => window.open(item.url, '_blank')} sx={{ padding: 0 }}>
                                                    <StyledDownloadIcon />
                                                </IconButton>
                                            </Fragment>
                                        }
                                        {
                                            showSelectButton &&
                                            <Fragment>
                                                <div style={{ width: '15px' }} />
                                                <IconButton title='Seleccionar'
                                                    onClick={() => onSelectClick(item)} sx={{ padding: 0 }}>
                                                    <StyledCheckIcon />
                                                </IconButton>
                                            </Fragment>
                                        }

                                    </Row>

                                </Column>

                            </RowContainer>
                            <LineDivider />
                        </div>

                    ))
                }
                <Dialog
                    open={viewerOpen}
                    onClose={handleViewer}
                    onBackdropClick={handleViewer}
                    fullWidth
                    maxWidth="xl"
                >
                    {
                        currentDocumentURL?.type === "pdf" ?
                            <DocumentViewer style={{ height: '90vh', width: '100%' }} viewer="url" url={currentDocumentURL?.url} />
                            :
                            <TransformWrapper>
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                    <Fragment>
                                        <TransformComponent wrapperStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <img src={currentDocumentURL?.url} style={{ maxWidth: '100%', alignSelf: 'center' }} />
                                        </TransformComponent>

                                        <div>
                                            <StyledButton style={{borderRadius:0}} onClick={() => zoomIn()}>Zoom +</StyledButton>
                                            <StyledButton style={{borderRadius:0}} onClick={() => zoomOut()}>Zoom -</StyledButton>
                                            <StyledButton style={{borderRadius:0}} onClick={() => resetTransform()}>Reiniciar</StyledButton>
                                        </div>
                                    </Fragment>
                                )}
                            </TransformWrapper>
                    }
                </Dialog>

            </ContentContainer>
            <SmallHeightDivider />
            <SmallHeightDivider />
        </Container>
    );
}

export default memo(DocumentsOfRequestsCard);
