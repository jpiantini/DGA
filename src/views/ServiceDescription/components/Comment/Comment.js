import { Rating } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React, { memo, useState } from 'react';
import { BodyText } from '../../../../theme/Styles';
import { replaceGuionToSlashFromString } from '../../../../utilities/functions/StringUtil';
import {
    CommentDateText,
    Container,
    ContentContainer,
    StyledUserIcon
} from './styles/CommentStyles';

function Comment({ userName, date, comment,rating=0 }) {

    return (
        <Container>
            <ContentContainer>
                <strong>
                    <BodyText>
                        {userName}
                    </BodyText>
                </strong>
                <BodyText>
                    {comment}
                </BodyText>

                <CommentDateText>
                    {format(new Date(replaceGuionToSlashFromString(date)), "dd 'de' MMMM yyyy hh:mm a", { locale: es })}
                </CommentDateText>
                <Rating
                    value={rating}
                    precision={0.5}
                    readOnly
                    size="small"
                />
            </ContentContainer>
        </Container >

    );
}

export default memo(Comment);
