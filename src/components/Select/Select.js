import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container, StyledOption } from './styles/SelectStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import { Autocomplete } from '@mui/material';

function Select({ id, title, data, placeholder, helperText = " ", value, onChange, onBlur, error, required, disabled, search = false,disableEmptyValue=false }) {
 let objectValue = value === undefined ? null:data?.find((item) => item.value == value)
   return (
        <Container>
            <Row>
                <FieldTitle>{title} </FieldTitle>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <FieldTitle style={{ color: COLORS.red }}>*</FieldTitle>
                    </Fragment>
                    : null}
            </Row>
            {
                search ?

                    <Autocomplete
                        disablePortal
                        fullWidth
                        disableClearable
                        select
                        unselectable
                        noOptionsText="No hay opciones"
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        value={objectValue}
                        disabled={disabled}
                        options={data}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, newValue) => onChange && onChange({
                            target: {
                                id: id,
                                value: newValue.value
                            }
                        })}
                        ListboxProps={{style:{margin:0}}}
                        /* onBlur={(e,newValue) => onBlur && onBlur({
                                target:{
                                    id:id,
                                    value:newValue.value
                                }
                            })}*/
                        renderInput={(params) =>
                             <StyledTextInput {...params}
                              InputProps={{...params.InputProps,style:{padding:3}}}
                              helperText={helperText}
                              FormHelperTextProps={{sx:{fontSize:'0.90rem'}}}
                              error={error}
                               />}
                    />
                    :
                    <StyledTextInput
                        fullWidth
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        helperText={helperText}
                        FormHelperTextProps={{sx:{fontSize:'0.90rem'}}}
                        error={error}
                        select
                        disabled={disabled}
                        SelectProps={{
                            native: true //for use option tag instead of MenuItem
                        }}
                    >
                        {
                            !disableEmptyValue &&
                            <option unselectable={true} />
                        }

                        {data?.map((option) => ( //use option or StyledOption instead of MenuItem because this tag has an bug 
                            <StyledOption key={option.value} value={option.value}>
                                {option.label}
                            </StyledOption>
                        ))}

                    </StyledTextInput>

            }
        </Container>
    );
}

export default memo(Select);