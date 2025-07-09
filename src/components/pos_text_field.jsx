import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import { StyleColors } from '../util/helper/Extension';

/**
 * Reusable TextField for POS forms with consistent styling.
 *
 * Props:
 * - name: field name
 * - label: input label
 * - type: input type (e.g., text, password, number)
 * - prefixIcon: optional icon component to place at the start
 * - suffixIcon: optional icon component to place at the end
 * - multiline: boolean for textarea
 * - rows: number of textarea rows
 * - value: controlled value
 * - onChange: change handler
 * - sx: additional sx overrides
 * - ...rest: other TextField props
 */
export default function POSFormTextField({
    name,
    label,
    type = 'text',
    prefixIcon,
    suffixIcon,
    multiline = false,
    rows = 1,
    value,
    onChange,
    sx = {},
    ...rest
}) {
    // Build InputProps with optional adornments
    const inputProps = {};
    if (prefixIcon) {
        inputProps.startAdornment = (
            <InputAdornment position="start">
                {prefixIcon}
            </InputAdornment>
        );
    }
    if (suffixIcon) {
        inputProps.endAdornment = (
            <InputAdornment position="end">
                {suffixIcon}
            </InputAdornment>
        );
    }

    return (
        <FormControl fullWidth margin="normal">
            <TextField
                name={name}
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                multiline={multiline}
                placeholder={label}
                rows={multiline ? rows : undefined}
                InputLabelProps={{ shrink: true }}
                InputProps={inputProps}
                sx={{
                    ...StyleColors.TextFieldStyle,
                    ...sx,
                }}
                {...rest}
            />
        </FormControl>
    );
}

POSFormTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    prefixIcon: PropTypes.node,
    suffixIcon: PropTypes.node,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    sx: PropTypes.object,
};
