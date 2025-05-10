import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import styled from 'styled-components';

const defaultToastOption: ToastOptions = {
    position: 'top-left',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: false,
    closeButton: false,
    theme: 'light',
};

export const Toast = {
    info: (message: string, options: ToastOptions = {}) => {
        toast.info(message, {
            ...defaultToastOption,
            ...options,
        });
    },
    success: (message: string, options: ToastOptions = {}) => {
        toast.success(message, { ...defaultToastOption, ...options });
    },
    error: (message: string, options: ToastOptions = {}) => {
        toast.error(message, { ...defaultToastOption, ...options });
    },
};

export const StyledToastConatiner = styled(ToastContainer)`
    .Toastify__toast {
        background-color: white;
    }

    // success
    .Toastify__toast--success {
        border: 2px solid green;
        color: green;
    }

    .Toastify__progress-bar--success {
        background-color: green;
    }

    // error
    .Toastify__toast--error {
        border: 2px solid red;
        color: red;
    }

    .Toastify__progress-bar--error {
        background-color: red;
    }
`;
