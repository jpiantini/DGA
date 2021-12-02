import { Fragment, useRef, useEffect } from 'react';
import { SmallHeightDivider, StyledButtonOutlined } from '../../../../theme/Styles';
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

function DocumentsOfRequestsCard({ title,data }) {

    const openDocument = (url) => {
        window.open(url, '_blank');  
    }

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
                <SmallHeightDivider/>
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
                                    <IconButton onClick={() => openDocument(item.url)} sx={{ padding: 0 }}>
                                        <StyledDescriptionIcon />
                                    </IconButton>
                                </Column>

                            </RowContainer>
                            <LineDivider />
                        </Fragment>

                    ))
                }





            </ContentContainer>
            <SmallHeightDivider />
            <SmallHeightDivider />
        </Container>
    );
}

export default DocumentsOfRequestsCard;
