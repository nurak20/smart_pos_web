
export const StyleColors = {
    componentsGreen: 'rgb(211, 85, 133)',
    componentsHover: 'rgb(179, 56, 103)',
    textDarkGray: 'rgb(41, 40, 40)',
    textGray: 'rgb(119, 118, 118)',
    appColorLv1: '#f9f6f8',
    appColorLv2: '#f4eff2',
    appColorLv3: '#ebdfe6',
    appColorLv4: '#dbc6d1',
    appColorLv5: '#b08499',
    appColorLv6: '#99697d',
    appColorLv7: '#825567',
    appColorLv8: '#6c4855',
    appColorLv9: '#5c3f4b',
    appColorLv10: '#352229',
    ButtonStyle: {
        background: '#6c4855',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '400',
        maxHeight: '47px',
        color: "white",
        padding: '10px 20px',
        textTransform: "none",
        '&:hover': {
            background: '#352229',
        },
        '&:disabled': {
            background: '#6c4855',
            color: '#bdbdbd',
        },
        transition: 'all 0.3s ease',
    },
    ButtonStyleOutline: {
        background: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '400',
        maxHeight: '47px',
        color: "#352229",
        padding: '10px 20px',
        textTransform: "none",
        '&:hover': {
            background: '#f4eff2',
        },
        '&:disabled': {
            background: '#6c4855',
            color: '#bdbdbd',
        },
        transition: 'all 0.3s ease',
    },
    TextFieldStyle: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            outline: 'none !important',
            '& fieldset': {
                borderColor: "var(--components-color)",
                borderWidth: '0.5px',
            },
            '&:hover fieldset': {
                borderColor: "var(--components-color)",
                borderWidth: '0.5px',
            },
            '&.Mui-focused fieldset': {
                outline: 'none !important',
                outlineWidth: '0px !important',
                borderColor: "var(--components-color)",
                borderWidth: '1px',
                boxShadow: 'none !important',
            },
            '&:focus': {
                outline: 'none !important',
                boxShadow: 'none !important',
            },
            '&:focus-visible': {
                outline: 'none !important',
                boxShadow: 'none !important',
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: "var(--components-color)",
            },
        },
        '& .MuiOutlinedInput-input': {
            outline: 'none !important',
            boxShadow: 'none !important',
            '&:focus': {
                outline: 'none !important',
                boxShadow: 'none !important',
            },
            '&:focus-visible': {
                outline: 'none !important',
                boxShadow: 'none !important',
            },
        },
    }

};





export const StyleTextField =
{
    '& .MuiOutlinedInput-root': {
        outline: 'none !important',
        '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: '#e91e63',
            borderWidth: '1px',
        },
        '&.Mui-focused fieldset': {
            outline: 'none !important',
            outlineWidth: '0px !important',
            borderColor: '#e91e63',
            borderWidth: '2px',
            boxShadow: 'none !important',
        },
        '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
        '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: '#e91e63',
        },
    },
    '& .MuiOutlinedInput-input': {
        outline: 'none !important',
        boxShadow: 'none !important',
        '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
        '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
    },
}




const TextFieldStyle = {
    '& .MuiOutlinedInput-root': {
        outline: 'none !important',
        maxHeight: '56px', // Set maximum height for the input container
        height: '56px',    // Set fixed height (optional)
        '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: '#e91e63',
            borderWidth: '1px',
        },
        '&.Mui-focused fieldset': {
            outline: 'none !important',
            outlineWidth: '0px !important',
            borderColor: '#e91e63',
            borderWidth: '2px',
            boxShadow: 'none !important',
        },
        '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
        '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: '#e91e63',
        },
    },
    '& .MuiOutlinedInput-input': {
        outline: 'none !important',
        boxShadow: 'none !important',
        maxHeight: '24px',  // Set max height for the actual input text
        height: '24px',     // Set fixed height for input text
        padding: '16px 14px', // Adjust padding as needed
        overflow: 'hidden',   // Hide overflow if text is too long
        textOverflow: 'ellipsis', // Add ellipsis for overflow text
        '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
        '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
    },
};

// Alternative versions with different height options:

// Version 1: Small TextField (40px height)
const TextFieldStyleSmall = {
    '& .MuiOutlinedInput-root': {
        outline: 'none !important',
        maxHeight: '40px',
        height: '40px',
        '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: '#e91e63',
            borderWidth: '1px',
        },
        '&.Mui-focused fieldset': {
            outline: 'none !important',
            outlineWidth: '0px !important',
            borderColor: '#e91e63',
            borderWidth: '2px',
            boxShadow: 'none !important',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: '#e91e63',
        },
    },
    '& .MuiOutlinedInput-input': {
        outline: 'none !important',
        boxShadow: 'none !important',
        padding: '8px 12px',
        fontSize: '14px',
    },
};

// Version 2: Large TextField (64px height)
const TextFieldStyleLarge = {
    '& .MuiOutlinedInput-root': {
        outline: 'none !important',
        maxHeight: '64px',
        height: '64px',
        '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: '#e91e63',
            borderWidth: '1px',
        },
        '&.Mui-focused fieldset': {
            outline: 'none !important',
            outlineWidth: '0px !important',
            borderColor: '#e91e63',
            borderWidth: '2px',
            boxShadow: 'none !important',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: '#e91e63',
        },
    },
    '& .MuiOutlinedInput-input': {
        outline: 'none !important',
        boxShadow: 'none !important',
        padding: '20px 14px',
        fontSize: '16px',
    },
};

// Version 3: Multiline TextField with max height
const TextFieldStyleMultiline = {
    '& .MuiOutlinedInput-root': {
        outline: 'none !important',
        maxHeight: '120px', // Allow for multiple lines
        overflow: 'auto',   // Add scroll if content exceeds max height
        '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: '#e91e63',
            borderWidth: '1px',
        },
        '&.Mui-focused fieldset': {
            outline: 'none !important',
            outlineWidth: '0px !important',
            borderColor: '#e91e63',
            borderWidth: '2px',
            boxShadow: 'none !important',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: '#e91e63',
        },
    },
    '& .MuiOutlinedInput-input': {
        outline: 'none !important',
        boxShadow: 'none !important',
        resize: 'none', // Prevent manual resizing
        '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
        },
    },
};

// Usage examples:
// <TextField sx={TextFieldStyle} />
// <TextField sx={TextFieldStyleSmall} />
// <TextField sx={TextFieldStyleLarge} />
// <TextField multiline rows={3} sx={TextFieldStyleMultiline} />

export {
    TextFieldStyle,
    TextFieldStyleSmall,
    TextFieldStyleLarge,
    TextFieldStyleMultiline
};


/**
 * Formats a date according to the given format string.
 * Supported tokens:
 *   YYYY – 4-digit year
 *   MM   – zero-padded month (01–12)
 *   DD   – zero-padded day of month (01–31)
 *   HH   – zero-padded hour (00–23)
 *   mm   – zero-padded minute (00–59)
 *   ss   – zero-padded second (00–59)
 *
 * @param {Date|string|number} date    A Date object, timestamp, or date string
 * @param {string}            format  A format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns {string}                 The formatted date
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    const d = date instanceof Date ? date : new Date(date);
    const pad = (n) => String(n).padStart(2, '0');

    const map = {
        YYYY: d.getFullYear(),
        MM: pad(d.getMonth() + 1),
        DD: pad(d.getDate()),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds()),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (token) => map[token]);
}

/**
 * Formats a number as USD, e.g. 1234.5 → “$1,234.50”
 * @param {number} amount        The numeric value to format
 * @param {string} [locale]      BCP 47 locale (default: 'en-US')
 * @returns {string}             The formatted currency string
 */
export function formatUSD(amount, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}


/**
 * Formats a number as Khmer Riel (no decimals), e.g. 1234567 → “៛1,234,567”
 * @param {number} amount        The numeric value to format
 * @param {string} [locale]      BCP 47 locale (default: 'km-KH')
 * @returns {string}             The formatted currency string
 */
export function formatKHR(amount, locale = 'km-KH') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'KHR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
