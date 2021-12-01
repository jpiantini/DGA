import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import {  Title, Container } from './styles/SelectStyles';
import { Row, StyledTextInput } from '../../theme/Styles';
import MenuItem from '@mui/material/MenuItem';


function Select({ id, title,data, placeholder, helperText, value, onChange, error, required }) {
    return (
        <Container>
            <Row>
                <Title>{title} </Title>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <Title style={{ color: COLORS.red }}>*</Title>
                    </Fragment>
                    : null}
            </Row>
            <StyledTextInput
                fullWidth
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                helperText={helperText}
                error={error}
                select
            >
                {data?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}

            </StyledTextInput>
        </Container>
    );
}

export default memo(Select);