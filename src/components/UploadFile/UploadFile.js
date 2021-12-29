import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import {  Container, InputFile, StyledUploadFileIcon, InputFileButtonContainer, RowContainer, RowSeparator } from './styles/UploadFileStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';


function UploadFile({ id, title, placeholder, helperText=" ", onChange, onBlur, error, required }) {

    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFileName(e.target.files[0].name);
            return e.target.files[0]
        }
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


            <RowContainer>
                <StyledTextInput
                    fullWidth
                    placeholder={placeholder}
                    value={selectedFileName}
                    helperText={helperText}
                    error={error}
                    InputProps={{
                        readOnly:true
                    }}
                />
                <RowSeparator />
                <InputFileButtonContainer htmlFor={id}>
                    <StyledUploadFileIcon />
                </InputFileButtonContainer>
                <InputFile id={id} type='file'
                    onBlur={(e) => {
                        onBlur && onBlur({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    }
                    onChange={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    } />
            </RowContainer>
        </Container>
    );
}

export default memo(UploadFile);