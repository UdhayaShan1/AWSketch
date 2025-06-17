import { notification } from "antd";

export function displayErrorNotification(errorMsg: string) {
    notification['error']({
        message: errorMsg,
        placement: 'top'
    });
}

export function displaySuccessNotification(successMsg: string) {
    notification['success']({
        message: successMsg,
        placement: 'top'
    });
}
