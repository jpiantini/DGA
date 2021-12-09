import React from 'react';
import Select from '../../../../../components/Select/Select';
import TextField from '../../../../../components/TextField/TextField';
import { Title } from '../../../../../theme/Styles';
import { FIELD_TYPES } from '../FormConstants';

const RenderField = (props) => {

  const LocalOnChange = (val) => {
    if (typeof props.onChange == 'function') {
      props.onChange(props.fieldKey, val.target.value);
    }
  }

  const Field = () => {
    if (props.hidden) {
      return null
    }

    switch (props.type) {
      case FIELD_TYPES.select:
        return (
          <Select
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur}
            data={props.data}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.text:
        return (
          <TextField
          id={props.fieldKey}
          title={props.label}
          value={props.value}
         // mask={props.mask}
         // unMaskedValue={true} //RETURN VALUE WITHOUT MASK 
          onChange={LocalOnChange}
          onBlur={props.handleBlur}
          data={props.data}
          error={props.error}
          helperText={props.helperText}
          placeholder={props.placeholder}
          disabled={!props.enabled}
          required={props.required}
          multiline={props.multiline}
        />
        )
      case FIELD_TYPES.header:
        return (
          <Title id={props.fieldKey}>
            {props.label}
          </Title>
        )
      default:
        return null
    }
  }
  return (
    
      <Field />

  )
}

export default React.memo(RenderField)