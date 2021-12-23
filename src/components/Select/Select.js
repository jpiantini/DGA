import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import {  Title, Container, StyledOption } from './styles/SelectStyles';
import { Row, SmallHeightDivider, StyledTextInput } from '../../theme/Styles';
import MenuItem from '@mui/material/MenuItem';


function Select({ id, title,data, placeholder, helperText=" ", value, onChange,onBlur, error, required,disabled }) {
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
                SelectProps={{
                    native:true //for use option tag instead of MenuItem
                }}
            >
                <option unselectable={true}/>
                {data?.map((option) => ( //use option or StyledOption instead of MenuItem because this tag has an bug 
                 <StyledOption key={option.value} value={option.value}>
                        {option.label}
                    </StyledOption>
                ))}

            </StyledTextInput>
        </Container>
    );
}

export default memo(Select);