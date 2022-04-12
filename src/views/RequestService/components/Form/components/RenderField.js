import React, { Fragment, useState } from 'react';
import { FIELD_TYPES, MASK_LIST, MASK_TYPE } from '../FormConstants';
import { Avatar, FormControl, FormHelperText, Grid, IconButton, List, ListItem, ListItemAvatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import Select from '../../../../../components/Select/Select';
import TextField from '../../../../../components/TextField/TextField';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import { Row, SmallHeightDivider, StyledButton, SubTitle, Title } from '../../../../../theme/Styles';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import TimePicker from '../../../../../components/TimePicker/TimePicker';
import UploadFile from '../../../../../components/UploadFile/UploadFile';
import { localToArray, mapArrayDiff } from '../../../../../utilities/functions/ArrayUtil';
import { cleanNumbersFromString, formatNumberWithDecimal, localToString } from '../../../../../utilities/functions/StringUtil';
import ModalForm from './ModalForm';
import { GridContainer, BodyText } from './Styles';
import CheckBoxGroup from '../../../../../components/CheckBoxGroup/CheckBoxGroup';
import PhoneTextField from '../../../../../components/PhoneTextField/PhoneTextField';
import { cedulaValidationService, dppValidationService, mimarenaValidationService } from '../../../../../api/RenderField';
import TextFieldNumberFormat from '../../../../../components/TextFieldNumberFormat/TextFieldNumberFormat';
import { useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { searchFieldSelectedValueByFieldKey } from '../../../RequestServiceUtils';
import Swal from 'sweetalert2'
import { SweetAlert } from '../../../../../components/SweetAlert/SweetAlert';
import { cleanCommasFromNumbers } from '../../../../../utilities/functions/NumberUtil';

const RenderField = (props) => {

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['userData']);

  const [modalVisible, setModalVisible] = useState(false)
  const [textInputLoading, setTextInputLoading] = useState(false)

  const LocalOnChange = (val) => {

    //call rule change
    switch (props.type) {
      case FIELD_TYPES.select:
        // data object of form json. reference -> ArrayUtil/dataToSelect.js
        const currentSelectedValue = localToArray(props.data).find(item => item.value == props.value);
        if (val?.target.value) {
          const rulesSelect = localToString(localToArray(props.data).find(item => item.value == val.target.value).rule)
          if (rulesSelect.length > 0) {
            props.changeRule(rulesSelect)
          }
        } else if (currentSelectedValue?.invertRule) {
          const invertRulesSelect = localToString(currentSelectedValue.invertRule)
          if (invertRulesSelect.length > 0) {
            props.changeRule(invertRulesSelect);
          }
        }
        break;
      case FIELD_TYPES.checkboxGroup:
        const selectedOption = mapArrayDiff(val.target.value, props.value)[0]
        const unselectedOption = mapArrayDiff(props.value, val.target.value)[0]
        if (selectedOption) {
          const rulesCheckbox = props.values.find(item => item.value == selectedOption)?.rule
          if (rulesCheckbox.length > 0) {
            props.changeRule(rulesCheckbox)
          }
        } else {
          const invertRuleCheckbox = props.values.find(item => item.value == unselectedOption)?.ruleF
          if (invertRuleCheckbox.length > 0) {
            props.changeRule(invertRuleCheckbox)
          }
        }
        break;
      case FIELD_TYPES.radioGroup:
        if (localToString(val.target.value).length > 0) {
          const rulesRadio = props.values.find(item => item.value == val.target.value)?.rule
          if (rulesRadio.length > 0) {
            props.changeRule(rulesRadio)
          }
        } else {
          const invertRuleRadio = props.values.find(item => item.value == props.value)?.invertRule
          if (invertRuleRadio.length > 0) {
            props.changeRule(invertRuleRadio)
          }
        }
        break;
    }

    //change val
    switch (MASK_LIST[props.Mask || '']) {
      case MASK_LIST[7]:
        props.onChange(props.fieldKey, cleanNumbersFromString(val.target.value))
        break;
      case MASK_LIST[12]:
        props.onChange(props.fieldKey, formatNumberWithDecimal(val.target.value))
        break;
      default:
        props.onChange(props.fieldKey, val.target.value);
        break;
    }
  }

  const handleValidationOnBlur = async (val) => {
    props.setFieldTouched(props.fieldKey, true, true)

    // 0 IS CEDULA FOR VALIDATE
    if (props.Mask === '0' && val.target.value.length > 0) {
      try {
        setTextInputLoading(true);
        let response = await cedulaValidationService(val.target.value);
        setTextInputLoading(false);
        if (response?.success && response?.exist) {
          SweetAlert.fire({
            title: "Validación exitosa",
            text:'Cédula válida',
            icon: 'success',
            confirmButtonText: 'Ok',
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          delete _localFieldErrors[props.fieldKey]
          delete _localFieldErrors.undefined
          props.setLocalFieldErrors(_localFieldErrors);
        } else {
          SweetAlert.fire({
            title: "Error en la validación",
            text: "Cédula no válida, introduzca otra cédula",
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          _localFieldErrors[props.fieldKey] = "Cédula no válida, introduzca otra cédula";
          delete _localFieldErrors.undefined;
          props.setLocalFieldErrors(_localFieldErrors);
        }
      } catch (error) {
        SweetAlert.fire({
          title: "Error en la validación",
          text: "Ha ocurrido un error validando la cedula",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        const _localFieldErrors = {
          ...props.localFieldErrors
        }
        _localFieldErrors[props.fieldKey] = "Ha ocurrido un error validando la cedula";
        props.setLocalFieldErrors(_localFieldErrors);
        setTextInputLoading(false);
      }
    }

    // 20 IS DPP FOR VALIDATE
    if (props.Mask === '20' && val.target.value.length > 0) {
      const dependientValues = searchFieldSelectedValueByFieldKey(props.plainData, props.MaskParam, props.formValues[props.MaskParam])
      // console.log(dependientValues)
      if (dependientValues?.selectedValueObject === undefined) {
        const _localFieldErrors = {
          ...props.localFieldErrors
        }
        _localFieldErrors[props.fieldKey] = `Seleccione una opcion en el campo ${dependientValues.fieldLabel}`;
        delete _localFieldErrors.undefined;
        props.setLocalFieldErrors(_localFieldErrors);
        return;
      }
      try {
        setTextInputLoading(true);
        let response = await dppValidationService(val.target.value, dependientValues.selectedValueObject.label);
        setTextInputLoading(false);
        if (response?.success) {
          SweetAlert.fire({
            title: "Validación exitosa",
            text:`${props.label} válida`,
            icon: 'success',
            confirmButtonText: 'Ok',
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          delete _localFieldErrors[props.fieldKey]
          delete _localFieldErrors.undefined
          props.setLocalFieldErrors(_localFieldErrors);
        } else {
          SweetAlert.fire({
            title: "Error en la validación",
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          _localFieldErrors[props.fieldKey] = response.message;
          delete _localFieldErrors.undefined;
          props.setLocalFieldErrors(_localFieldErrors);
        }
      } catch (error) {
        SweetAlert.fire({
          title: "Error en la validación",
          text: "Ha ocurrido un error en la validación",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        const _localFieldErrors = {
          ...props.localFieldErrors
        }
        _localFieldErrors[props.fieldKey] = "Ha ocurrido un error en la validación";
        props.setLocalFieldErrors(_localFieldErrors);
        setTextInputLoading(false);
      }
    }

    // 21 IS MIMARENA FOR VALIDATE
    if (props.Mask === '21' && val.target.value.length > 0) {
      try {
        setTextInputLoading(true);
        let response = await mimarenaValidationService(val.target.value);
        setTextInputLoading(false);
        if (response?.success) {
          SweetAlert.fire({
            title: "Validación exitosa",
            text:`${props.label} válida`,
            icon: 'success',
            confirmButtonText: 'Ok',
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          delete _localFieldErrors[props.fieldKey]
          delete _localFieldErrors.undefined
          props.setLocalFieldErrors(_localFieldErrors);
        } else {
          SweetAlert.fire({
            title: "Error en la validación",
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          const _localFieldErrors = {
            ...props.localFieldErrors
          }
          _localFieldErrors[props.fieldKey] = response.message;
          delete _localFieldErrors.undefined;
          props.setLocalFieldErrors(_localFieldErrors);
        }
      } catch (error) {
        SweetAlert.fire({
          title: "Error en la validación",
          text: "Ha ocurrido un error en la validación",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        const _localFieldErrors = {
          ...props.localFieldErrors
        }
        _localFieldErrors[props.fieldKey] = "Ha ocurrido un error en la validación";
        props.setLocalFieldErrors(_localFieldErrors);
        setTextInputLoading(false);
      }
    }

       // undefined mask for densidad calculation 
       if (props.fieldKey === "areatotalterre1" || props.fieldKey === "canthabitacion") {
        const area = cleanCommasFromNumbers(props.formValues["areatotalterre1"]);
        const quantity = cleanCommasFromNumbers(props.formValues["canthabitacion"]);
        let hectare;
        let result;
        if(area !== undefined && quantity !== undefined){
          hectare = area / 10000;
          result = quantity/hectare;
          result = (Math.round(result * 100) / 100).toFixed(2);
          props.onChange("densidadhabitac",result); 
        }
        if(area == 0 || quantity == 0){
          props.onChange("densidadhabitac",0);
        }
      }
  }



  const insertFormData = ({ values, fatherKey, listIndex }) => {
    const value = localToArray(props.value)
    if (listIndex !== undefined) {
      value[listIndex] = values
      props.onChange(fatherKey, [...value])
    } else {
      props.onChange(fatherKey, [...value, values])
    }
    setModalVisible(false)
  }

  const deleteGridElement = (position) => {
    if (position != null && position !== undefined) {
      const result = localToArray(props.value).filter((doc, index) => index !== position)
      props.onChange(props.fieldKey, result)
    }
  }

  const childrenDataFilter = (arr, fatherKey, fatherVal) => {
    if (localToArray(arr).length === 0 || !fatherKey) {
      return arr
    }

    return localToArray(arr).filter(item => item.father == fatherVal)
  }



  const RenderGridItem = ({ fields, item, index }) => {
    let currentItemData = Object.keys(item).map((fieldKey) => {
      const fieldData = fields.find((field) => field.fieldKey === fieldKey)
      return {
        type: fieldData?.type,
        name: fieldData?.label,
        value: item[fieldKey]
      }
    })
    return (
      <Grid item xs={12} md={12}>
        <List >
          <ListItem
            secondaryAction={
              <Row>
                <IconButton onClick={() => setModalVisible({ ...item, listIndex: index })} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <div style={{ width: '15px' }} />
                <IconButton onClick={() => deleteGridElement(index)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Row>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FeedIcon />
              </Avatar>
            </ListItemAvatar>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'justify' }}>
              <strong>
                <BodyText>{`${props.label} ${index + 1}`}</BodyText>
              </strong>
              <br />
              {
                currentItemData.map((field) => (
                  <BodyText>
                    {
                      field.value === undefined || field.name === undefined ?
                        null
                        :
                        field.type === FIELD_TYPES.header ?
                          null
                          :
                          //TO DO ADD TIME CASE
                          field.type === FIELD_TYPES.date ?
                            `${field.name}: ${format(new Date(field.value), 'yyyy-MM-dd')}`
                            :
                            `${field.name}: ${field.value}`
                    }

                  </BodyText>
                ))
              }
            </div>
          </ListItem>
        </List>
      </Grid>
    )
  }


  const Field = () => {
    if (props.hidden) {
      return null
    }
    switch (props.type) {
      case FIELD_TYPES.radioGroup:
        return (
          <Grid item xs={12} sm={12} md={12}>
            <RadioButtonGroup
              row
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              options={props.data}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
            />
          </Grid>
        )
      case FIELD_TYPES.checkboxGroup:
        return (
          <Grid item xs={3} sm={6} md={12}>
            <CheckBoxGroup
              id={props.fieldKey}
              //     title={props.label}
              onChange={LocalOnChange}
              value={props.value}
              onBlur={handleValidationOnBlur}
              options={props.data}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
            />
          </Grid>
        )
      case FIELD_TYPES.select:
        return (
          <Grid item xs={3} sm={6} md={6}>
            <Select
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              data={
                childrenDataFilter(
                  props.data,
                  props.father_id,
                  props.fatherValue
                )
              }
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
              search
            />
          </Grid>
        )
      case FIELD_TYPES.text:
        if (['2', '3'].includes(localToString(props.Mask))) {
          return (
            <Grid item xs={3} sm={6} md={6}>
              <PhoneTextField
                id={props.fieldKey}
                title={props.label}
                value={props.value}
                onChange={LocalOnChange}
                onBlur={handleValidationOnBlur}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
                disabled={!props.enabled}
                required={props.required}
              />
            </Grid>
          )
        }
        if (['0', '1', '6'].includes(localToString(props.Mask))) {
          return (
            <Grid item xs={3} sm={6} md={6}>
              <TextField
                id={props.fieldKey}
                title={props.label}
                value={props.value}
                isLoading={textInputLoading}
                mask={localToString(MASK_TYPE[props.Mask || ''])}
                useMaskPresets={true}
                unMaskedValue={true} //RETURN VALUE WITHOUT MASK 
                onChange={LocalOnChange}
                onBlur={handleValidationOnBlur}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
                disabled={!props.enabled}
                required={props.required}
                multiline={props.multiline}
              />
            </Grid>
          )
        }
        if (['12'].includes(localToString(props.Mask))) {
          return (
            <Grid item xs={3} sm={6} md={6}>
              <TextFieldNumberFormat
                id={props.fieldKey}
                title={props.label}
                value={props.value}
                isLoading={textInputLoading}
                maxLength={props.length}
                onChange={LocalOnChange}
                onBlur={handleValidationOnBlur}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
                disabled={!props.enabled}
                required={props.required}
                multiline={props.multiline}
              />
            </Grid>

          )
        }
        return (
          <Grid item xs={3} sm={6} md={6}>
            <TextField
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              isLoading={textInputLoading}
              maxLength={props.length}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
              multiline={props.multiline}
            />
          </Grid>
        )
      case FIELD_TYPES.textarea:
        return (
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              maxLength={props.length}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
              multiline={true}
            />
          </Grid>
        )
      case FIELD_TYPES.date:
        return (
          <Grid item xs={3} sm={6} md={6}>
            <DatePicker
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
            />
          </Grid>

        )
      case FIELD_TYPES.time:
        return (
          <Grid item xs={3} sm={6} md={6}>
            <TimePicker
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
            />
          </Grid>

        )
      case FIELD_TYPES.file:
        return (
          <Grid item xs={3} sm={6} md={6}>
            <UploadFile
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              onChange={LocalOnChange}
              onBlur={handleValidationOnBlur}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
              extension={props.valid_exts}
              multipleDocuments={props?.multipleDocuments}
              ignoreType={['dwg']}
              findDocuments
              hideDownloadButton
            />
          </Grid>

        )
      case FIELD_TYPES.grid:
        return (
          <Grid item xs={12} sm={12} md={12}>
            <FormControl disabled={!props.enabled} error={props.error} sx={{ width: '100%' }}>
              <SubTitle >
                {props.label}
              </SubTitle>
              <SmallHeightDivider />
              {
                localToArray(props.value).map((item, index) => (
                  <Fragment>
                    <GridContainer>
                      <RenderGridItem fields={props.fields} item={item} index={index} />
                    </GridContainer>
                    <SmallHeightDivider />
                  </Fragment>
                ))
              }
              <SmallHeightDivider />
              <StyledButton onClick={() => setModalVisible(true)}>
                Agregar
              </StyledButton>
              <FormHelperText>{props.helperText}</FormHelperText>
              <ModalForm
                title={props.label}
                isVisible={modalVisible}
                onVisibleChange={setModalVisible}
                fields={props.fields}
                doRequest={insertFormData}
                fatherKey={localToString(props.fieldKey)}
              />
            </FormControl>
          </Grid>
        )

      case FIELD_TYPES.header:
        if (props.subtype === 'h1') {
          return null
        } else {
          return (
            <Grid item xs={12} sm={12} md={12}>
              <SubTitle id={props.fieldKey}>
                {props.label}
              </SubTitle>
            </Grid>
          )
        }

      default:
        return null
    }
  }
  return (
    props.hidden == true ?
      null
      :
      <Fragment>
        {Field()}
      </Fragment>
  )
}

export default React.memo(RenderField)