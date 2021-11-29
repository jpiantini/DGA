import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { StyledTextInput, Title, Container } from './styles/TextFieldStyles';
import InputMask from 'react-input-mask';
import { Row } from '../../theme/Styles';


function TextField({ id, title, placeholder, helperText, value, onChange, type, error, mask, unMaskedValue, required }) {

    const removeTextFromInputMaskValue = (value) => {
        let NewValue = value.replace(/[^0-9\.]+/g, "");
        return NewValue;
    }

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

            {
                mask ?
                    <InputMask
                        id={id}
                        mask={mask}
                        maskChar={null}
                        value={value}
                        onChange={
                            unMaskedValue ?
                                (e) => {
                                    onChange({
                                        target:
                                        {
                                            id: e.target.id,
                                            value: removeTextFromInputMaskValue(e.target.value)
                                        }
                                    })
                                }
                                :
                                onChange
                        }>

                        {(inputProps) =>
                            <StyledTextInput
                                {...inputProps}
                                fullWidth
                                variant="outlined"
                                //   focused
                                InputProps={{
                                    style: {
                                        borderRadius: '0',
                                        width: '100%',
                                        height: '40px',
                                        fontSize: '17px',
                                        backgroundColor: COLORS.white,
                                    },
                                }}
                                placeholder={placeholder}
                                type={type}
                                helperText={helperText}
                                error={error}
                            />
                        }
                    </InputMask>
                    :
                    <StyledTextInput
                        fullWidth
                        id={id}
                        //  focused
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
                        type={type}
                        helperText={helperText}
                        error={error}
                    />
            }
        </Container>
    );
}

export default memo(TextField);