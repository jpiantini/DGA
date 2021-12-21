import { useState, useEffect, memo } from 'react';
import {
  BodyText,
  BodyTextBold,
  SmallHeightDivider,
  StyledButtonOutlined,
  StyledButton,
  MediumHeightDividers,
  MediumHeightDivider
} from '../../../../../theme/Styles';
import {
  Container,
} from '../styles/FormStyles';
import { localToArray } from '../../../../../utilities/functions/ArrayUtil';
import { useFormik } from 'formik';
import * as  yup from 'yup';
import { getFieldValidation } from '../FormFunctions';
import RenderField from '../components/RenderField';
import { localToString } from '../../../../../utilities/functions/StringUtil';
import { localToObject } from '../../../../../utilities/functions/ObjectUtil';
import FormModal from '../../../../../components/FormModal/FormModal';
import { Grid } from '@mui/material';

function ModalForm(props) {

  const [state, setState] = useState({});
  const [schemaValidation, setSchemaValidation] = useState({});
  const listIndex = localToObject(props.isVisible).listIndex
  const isModifying = listIndex !== undefined
  const { errors, setFieldTouched, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => localDoRequest({ values, actions }),
    validationSchema: yup.object().shape(schemaValidation),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (props.isVisible && localToArray(props.fields).length > 0) {
      const innerState = { ...state, ...localToObject(props.isVisible) }
      const innerSchema = {}
      props.fields.map((field) => {
        const validator = getFieldValidation(field)
        if (validator) {
          innerSchema[field.fieldKey] = getFieldValidation(field)
        }
        if (!innerState[field.fieldKey]) {
          innerState[field.fieldKey] = undefined
        }
      })
      setState(innerState)
      setSchemaValidation(innerSchema)
    }
    return () => { }
  }, [props.isVisible, props.fields])

  useEffect(() => {
    if (!props.isVisible) {
      resetForm()
      setState({})
    }
    return () => { }
  }, [props.isVisible])

  const localDoRequest = ({ values, actions }) => {
    props.doRequest({ values, fatherKey: props.fatherKey, listIndex })
  }

  const LocalRenderGrid = ({ item, index }) => {
    return (
      <RenderField
        {...item}
        key={item.key}
        fieldKey={item.fieldKey}
        value={values[item.fieldKey]}
        fatherValue={values[localToString(item.father_id)]}
        placeholder={item.placeholder}
        error={touched[item.fieldKey] && Boolean(errors[item.fieldKey])}
        helperText={touched[item.fieldKey] && errors[item.fieldKey]}
        onChange={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
    )
  }


  return (
    <FormModal open={props.isVisible} onClose={() => props.onVisibleChange(false)}>
      <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>

        {
          props.fields.map((item, index) => (
            LocalRenderGrid({ item, index })
          ))
        }

      </Grid>
      <MediumHeightDivider />
        <StyledButton onClick={handleSubmit}>
          {isModifying ? 'Guardar' : 'Añadir'}
        </StyledButton>
      <SmallHeightDivider />
    </FormModal>
  );
}

export default memo(ModalForm);
