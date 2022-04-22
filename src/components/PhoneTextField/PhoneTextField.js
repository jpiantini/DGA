import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Container, Separator } from './styles/PhoneTextFieldStyles';
import InputMask from 'react-input-mask';
import { BodyText, FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import { StyledOption } from '../Select/styles/SelectStyles';
import { FormControl, FormGroup, FormHelperText } from '@mui/material';


function PhoneTextField({ id, title, placeholder, helperText = " ", value = "", onChange, onBlur, error, unMaskedValue, required, disabled }) {

    const prefixList = [
        {
            label: "809",
            value: "809"
        },
        {
            label: "829",
            value: "829"
        },
        {
            label: "849",
            value: "849"
        },

    ]
    //take the phone prefix or put 809 as default
    const [phonePrefix, setPhonePrefix] = useState(value.substring(0, 3) || "809");

    const removeTextFromInputMaskValue = (value) => {
        let NewValue = value.replace(/[^0-9\.]+/g, '');
        return NewValue;
    }

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
            <FormControl disabled={disabled} required={required} error={error} fullWidth component='fieldset' variant='standard'>
                <FormGroup>
                    <Row style={{ width: '100%' }}>
                        <StyledTextInput
                            sx={{ width: '30%' }}
                            value={phonePrefix}
                            onChange={(e) => {
                                setPhonePrefix(e.target.value);
                                onChange({
                                    target:
                                    {
                                        id: id,
                                        value: ""
                                    }
                                });

                            }}
                            select
                            disabled={disabled}
                            SelectProps={{
                                native: true //for use option tag instead of MenuItem
                            }}
                        //   helperText={" "}
                        >
                            {prefixList?.map((option) => ( //use option or StyledOption instead of MenuItem because this tag has an bug 
                                <StyledOption key={option.value} value={option.value}>
                                    {option.label}
                                </StyledOption>
                            ))}

                        </StyledTextInput>
                        <Separator />
                        <InputMask
                            id={id}
                            mask={"999-9999"}
                            maskChar={null}
                            disabled={disabled}
                            value={value.substring(3, 10)}
                            onBlur={
                                (e) => {
                                    onBlur && onBlur({
                                        target:
                                        {
                                            id: e.target.id,
                                            value: phonePrefix + removeTextFromInputMaskValue(e.target.value)
                                        }
                                    })
                                }
                            }
                            onChange={
                                (e) => {
                                    onChange({
                                        target:
                                        {
                                            id: e.target.id,
                                            value: phonePrefix + removeTextFromInputMaskValue(e.target.value)
                                        }
                                    })
                                }
                            }>

                            {(inputProps) =>
                                <StyledTextInput
                                    disabled={disabled}
                                    {...inputProps}
                                    fullWidth
                                    variant='outlined'
                                    placeholder={placeholder}
                                    type={"text"}
                                //      helperText={helperText}
                                //     error={error}
                                />
                            }
                        </InputMask>
                    </Row>
                </FormGroup>
                <FormHelperText sx={{fontSize:'0.90rem'}}>{helperText}</FormHelperText>
            </FormControl>
        </Container>
    );
}

export default memo(PhoneTextField);