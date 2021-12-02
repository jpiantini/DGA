import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import {  Title, Container } from './styles/SelectStyles';
import { Row, StyledTextInput } from '../../theme/Styles';
import MenuItem from '@mui/material/MenuItem';


function Select({ id, title,data, placeholder, helperText, value, onChange,onBlur, error, required,disabled }) {
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
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                helperText={helperText}
                error={error}
                select
                disabled={disabled}
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