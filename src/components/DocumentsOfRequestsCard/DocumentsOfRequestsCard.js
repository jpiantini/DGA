import { Fragment, useState, memo } from 'react';
import { SmallHeightDivider, StyledButton, StyledButtonOutlined } from '../../theme/Styles';
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
} from './styles/DocumentsOfRequestsCardStyles';
import { DocumentViewer } from 'react-documents';
import { Dialog } from '@mui/material';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch } from 'react-redux';
import { ShowGlobalLoading, HideGlobalLoading } from '../../redux/actions/UiActions';
import { downloadPDF } from '../../utilities/functions/DownloadUtil';

function DocumentsOfRequestsCard({ title, data }) {

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
        <Container >
            <SmallHeightDivider />
            <ContentContainer>
                <Title>{title}</Title>

                <RowContainer>
                    <Column style={{ width: '35%' }}>
                        <BodyText>
                            Nombre del Documento
                        </BodyText>
                    </Column>

                    <Column style={{ width: '42%' }}>
                        <BodyText>
                            Tipo Archivo
                        </BodyText>
                    </Column>

                    <Column style={{ width: '18%' }}>
                        <BodyText>
                            Fecha
                        </BodyText>
                    </Column>

                    <Column style={{ width: '5%' }}>
                        <BodyText >
                            Ver
                        </BodyText>
                    </Column>
                </RowContainer>
                <SmallHeightDivider />
                {
                    data?.map((item) => (
                        <Fragment>
                            <RowContainer >
                                <Column style={{ width: '35%' }}>
                                    <BodyText>
                                        {item.name}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '42%' }}>
                                    <BodyText>
                                        {item.documentType.toUpperCase()}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '18%' }}>
                                    <BodyText>
                                        {item.date}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '5%' }}>
                                    <IconButton onClick={() => handleViewer({ url: item.url, type: item.documentType })} sx={{ padding: 0 }}>
                                        <StyledDescriptionIcon />
                                    </IconButton>
                                </Column>

                            </RowContainer>
                            <LineDivider />

                        </Fragment>

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
                                            <StyledButton onClick={() => zoomIn()}>Zoom +</StyledButton>
                                            <StyledButton onClick={() => zoomOut()}>Zoom -</StyledButton>
                                            <StyledButton onClick={() => resetTransform()}>Reiniciar</StyledButton>
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
