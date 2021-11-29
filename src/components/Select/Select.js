import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { StyledTextInput, Title, Container } from './styles/SelectStyles';
import { Row } from '../../theme/Styles';
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
                InputProps={{
                    style: {
                        borderRadius: '0',
                        borderWidth: '5px',
                        width: '100%',
                        height: '40px',
                        fontSize: '17px',
                        backgroundColor: COLORS.white,
                    },
                }}
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