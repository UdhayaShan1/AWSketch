import { notification } from "antd";

export function displayErrorNotification(errorMsg: string) {
    notification['error']({
        message: errorMsg,
        placement: 'top'
    });
}
