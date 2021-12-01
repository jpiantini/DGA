import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container, InputFile, StyledUploadFileIcon, InputFileButtonContainer, RowContainer, RowSeparator } from './styles/UploadFileStyles';
import { Row, StyledTextInput } from '../../theme/Styles';


function UploadFile({ id, title, placeholder, helperText, onChange, error, required }) {

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
                <Title>{title} </Title>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <Title style={{ color: COLORS.red }}>*</Title>
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

                />
                <RowSeparator />
                <InputFileButtonContainer htmlFor={id}>
                    <StyledUploadFileIcon />
                </InputFileButtonContainer>
                <InputFile id={id} type="file" onChange={(e) => {
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