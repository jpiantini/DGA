import React, { useState } from 'react';
import { FIELD_TYPES, MASK_LIST, MASK_TYPE } from '../FormConstants';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar } from '@mui/material';
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
import { cleanNumbersFromString, cleanNumberWithDecimal, localToString } from '../../../../../utilities/functions/StringUtil';
import ModalForm from './ModalForm';
import { GridContainer, BodyText } from './Styles';
import CheckBoxGroup from '../../../../../components/CheckBoxGroup/CheckBoxGroup';
import PhoneTextField from '../../../../../components/PhoneTextField/PhoneTextField';
import { cedulaValidationService } from '../../../../../api/RenderField';

const RenderField = (props) => {

  const [modalVisible, setModalVisible] = useState(false)

  const LocalOnChange = (val) => {

    //call rule change
    switch (props.type) {
      case FIELD_TYPES.select:
        // data object of form json. reference -> ArrayUtil/dataToSelect.js
        const currentSelectedValue = localToArray(props.data).find(item => item.value == props.value); 
        if (val?.target.value) { //new selectedValue
          props.changeRule(localToString(localToArray(props.data).find(item => item.value == val.target.value).rule))
        } else if (currentSelectedValue?.invertRule) { //current selectedValue
          props.changeRule(localToString(currentSelectedValue.invertRule));
        }
        break;
      case FIELD_TYPES.checkboxGroup:
        const selectedOption = mapArrayDiff(val.target.value, props.value)[0]
        if (selectedOption) {
          props.changeRule(props.values.find(item => item.value == selectedOption)?.rule)
        } else {
          const unselectedOption = mapArrayDiff(props.value, val.target.value)[0]
          props.changeRule(props.values.find(item => item.value == unselectedOption)?.ruleF)
      
        }
        break;
      case FIELD_TYPES.radioGroup:
        if (localToString(val.target.value).length > 0) {
          props.changeRule(props.values.find(item => item.value == val.target.value)?.rule)
        } else {
          props.changeRule(props.values.find(item => item.value == props.value)?.invertRule)
        }
        break;
    }

    //change val
    //  if (typeof props.onChange == 'function') {
    switch (MASK_LIST[props.Mask || '']) {
      case MASK_LIST[7]:
        props.onChange(props.fieldKey, cleanNumbersFromString(val.target.value))
        break;
      case MASK_LIST[12]:
        props.onChange(props.fieldKey, cleanNumberWithDecimal(val.target.value))
        break;
      default:
        props.onChange(props.fieldKey, val.target.value);
        break;
    }
  }

  const handleValidationOnBlur = (val) => {
    props.setFieldTouched(props.fieldKey, true, true)
    // 0 IS CEDULA FOR VALIDATE
    if (props.Mask === '0') {
      try {
        cedulaValidationService(val.target.value).then((response) => {
          if (response?.success && response?.exist) {
            //DO NOTHING CEDULA IS VALID
          } else {
            props.setFieldError(props.fieldKey, "Cedula invalida,introduzca una cedula valida")
          }
        });
      } catch (error) {
        props.setFieldError(props.fieldKey, "Ha ocurrido un error validando la cedula")
      }
    }
  }


  const insertFormData = ({ values, fatherKey, listIndex }) => {
    if (typeof props.onChange == 'function') {
      const value = localToArray(props.value)
      if (listIndex !== undefined) {
        value[listIndex] = values
        props.onChange(fatherKey, [...value])
      } else {
        props.onChange(fatherKey, [...value, values])
      }
      setModalVisible(false)
    }
  }

  const deleteGridElement = (position) => {
    if (position != undefined && typeof props.onChange == 'function') {
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



  const RenderGridItem = ({ item, index }) => {
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

            <BodyText>{`${props.label} ${index + 1}`}</BodyText>
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
          <RadioButtonGroup
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
        )
      case FIELD_TYPES.checkboxGroup:
        return (
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
        )
      case FIELD_TYPES.select:
        return (
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
          />
        )
      case FIELD_TYPES.text:
        if (['2', '3'].includes(localToString(props.Mask))) {
          return (
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
          )
        }
        if (['0', '1', '6'].includes(localToString(props.Mask))) {
          return (
            <TextField
              id={props.fieldKey}
              title={props.label}
              value={props.value}
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
          )
        }
        return (
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
            multiline={props.multiline}
          />
        )
        case FIELD_TYPES.textarea:
          return (
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
          )
      case FIELD_TYPES.date:
        return (
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
        )
      case FIELD_TYPES.time:
        return (
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
        )
      case FIELD_TYPES.file:
        return (
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
          />
        )
      case FIELD_TYPES.grid:
        return (
          <div>
            <SubTitle >
              {props.label}
            </SubTitle>
            <SmallHeightDivider />
            <GridContainer>
              {
                localToArray(props.value).map((item, index) => (
                  <RenderGridItem item={item} index={index} />
                ))
              }
            </GridContainer>
            <SmallHeightDivider />
            <StyledButton onClick={() => setModalVisible(true)}>
              Agregar
            </StyledButton>
            <ModalForm
              title={props.label}
              isVisible={modalVisible}
              onVisibleChange={setModalVisible}
              fields={props.fields}
              doRequest={insertFormData}
              fatherKey={localToString(props.fieldKey)}
            />
          </div>
        )

      case FIELD_TYPES.header:
        if (props.subtype === 'h1') {
          return null
        } else {
          return (
            <SubTitle id={props.fieldKey}>
              {props.label}
            </SubTitle>
          )
        }

      default:
        return null
    }
  }
  return (
    props.hidden == true ? // dont return grid with spaces and prevent white spaces between elements
      null
      :
      props.type === 'header' ?
        <Grid item xs={12} sm={12} md={12}>
          {Field()}
        </Grid>
        :
        props.type === 'grid' ?
          <Grid item xs={12} sm={12} md={12}>
            {Field()}
          </Grid>
          :
          <Grid item xs={3} sm={6} md={6}>
            {Field()}
          </Grid>

  )
}

export default React.memo(RenderField)