import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField, InputAdornment, Avatar, CircularProgress } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { StyleColors } from '../util/helper/Extension';

/**
 * POSFormImageUpload
 *
 * A file-upload field that:
 * - lets the user pick an image
 * - uploads it to your API endpoint
 * - displays an Avatar preview as prefixIcon once done
 *
 * Props:
 * - name: form field name
 * - label: input label
 * - uploadUrl: the API upload endpoint (optional, uses default)
 * - uploadPreset: (kept for compatibility but not used)
 * - value: current image URL
 * - onUpload: callback(imageUrl) after successful upload
 * - onError: (optional) callback(err)
 * - sx: style overrides
 * - rest: other TextField props
 */
export default function POSFormImageUpload({
    name,
    label,
    uploadUrl = 'https://file.txteams.net/api/v1/storage/upload',
    uploadPreset, // kept for compatibility
    value,
    onUpload,
    onError,
    sx = {},
    ...rest
}) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('https://file.txteams.net/api/v1/storage/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic UlNfUE9TOnJzcG9zLXNlY3JldC0hMjM=',
                },
                body: formData, // Use FormData directly
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            // Check for the correct response structure
            if (json.data && json.data.preview_url) {
                onUpload(json.data.preview_url);
            } else if (json.secure_url) {
                onUpload(json.secure_url);
            } else {
                throw new Error('Upload failed - no URL in response');
            }
        } catch (err) {
            console.error('Upload error', err);
            onError?.(err);
        } finally {
            setUploading(false);
        }
    };

    // Build InputProps: show Avatar (if have value) or UploadIcon
    const inputProps = {
        startAdornment: (
            <InputAdornment position="start">
                {uploading ? (
                    <CircularProgress size={24} />
                ) : value ? (
                    <Avatar src={value} sx={{ width: 32, height: 32 }} />
                ) : (
                    <UploadIcon />
                )}
            </InputAdornment>
        ),
    };

    return (
        <FormControl fullWidth margin="normal">
            <TextField
                name={name}
                label={label}
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleFileChange}
                placeholder={label}
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

POSFormImageUpload.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string,
    uploadPreset: PropTypes.string,
    value: PropTypes.string,               // current image URL
    onUpload: PropTypes.func.isRequired,    // (url: string) => void
    onError: PropTypes.func,
    sx: PropTypes.object,
};