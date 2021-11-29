import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { StyledTextInput, Title, Container } from './styles/DatePickerStyles';
import { Row } from '../../theme/Styles';
import MenuItem from '@mui/material/MenuItem';
import MUIDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


function DatePicker({ id, title, placeholder, helperText, value, onChange, error, required }) {
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MUIDatePicker
                id={id}
                renderInput={props => <StyledTextInput  {...props}
                    />}
                placeholder={placeholder}
                value={value}
                onChange={(e) => console.log(e)}
                helperText={helperText}
                error={error} 
            />

            </LocalizationProvider>
            
        </Container>
    );
}

export default memo(DatePicker);