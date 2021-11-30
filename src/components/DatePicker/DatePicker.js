import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/DatePickerStyles';
import { Row, StyledTextInput } from '../../theme/Styles';
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
                    inputFormat="dd/MM/yyyy"
                    renderInput={props => <StyledTextInput  {...props} helperText={helperText} error={error}/>}
                    toolbarPlaceholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </LocalizationProvider>
        </Container>
    );
}

export default memo(DatePicker);