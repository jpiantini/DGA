import { Fragment, useState, memo } from 'react';
import { SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
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
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

function DocumentsOfRequestsCard({ title, data }) {

    const [currentDocumentURL, setCurrentCurrentURL] = useState();

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
                            Tipo de Documento
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
                                        {item.documentType}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '18%' }}>
                                    <BodyText>
                                        {item.date}
                                    </BodyText>
                                </Column>

                                <Column style={{ width: '5%' }}>
                                    <IconButton onClick={() => setCurrentCurrentURL(item.url)} sx={{ padding: 0 }}>
                                        <StyledDescriptionIcon />
                                    </IconButton>
                                </Column>

                            </RowContainer>
                            <LineDivider />

                        </Fragment>

                    ))
                }
                {
                    currentDocumentURL &&
                    <div>
                        <DocViewer pluginRenderers={[PDFRenderer, PNGRenderer]} documents={[{ uri: currentDocumentURL }]} />
                    </div>

                }


            </ContentContainer>
            <SmallHeightDivider />
            <SmallHeightDivider />
        </Container>
    );
}

export default memo(DocumentsOfRequestsCard);
