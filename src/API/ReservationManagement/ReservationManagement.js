import {API, ImageAPI} from '../Api';

export const getReservationList = async args => {
    try {
        const response = await API.post('mng/order_list.php', args);
        return response;
    } catch (error) {}
};

export const getReservationDetail = async args => {
    try {
        const response = await API.post('mng/order_view.php', args);
        return response;
    } catch (error) {}
};

export const reservationEdit = async args => {
    try {
        const response = await API.post('mng/order_edit.php', args);
        return response;
    } catch (error) {}
};
export const reservationComplete = async args => {
    try {
        const response = await ImageAPI(args, 'opt_image', 'mng/order_proc.php', true);
        return response;
    } catch (error) {}
};

export const getCouponReservationList = async args => {
    try {
        const response = await API.post('mng/order_list_coupon.php', args);
        return response;
    } catch (error) {}
};

export const getCouponReservationDetail = async args => {
    try {
        const response = await API.post('mng/order_view_coupon.php', args);
        return response;
    } catch (error) {}
};

export const couponReservationEdit = async args => {
    try {
        const response = await API.post('mng/order_edit_coupon.php', args);
        return response;
    } catch (error) {}
};

export const reservationDatetimeEdit = async args => {
    try {
        const response = await API.post('mng/order_datetime_edit.php', args);
        return response;
    } catch (error) {}
};

export const getReservationDayList = async args => {
    try {
        const response = await API.post('mng/order_day_list.php', args);
        return response;
    } catch (error) {}
};

export const reservationDayListSave = async args => {
    try {
        const response = await API.post('mng/order_day_add.php', args);
        return response;
    } catch (error) {}
};

export const reservationTimeListSave = async args => {
    try {
        const response = await API.post('mng/order_time_add.php', args);
        return response;
    } catch (error) {}
};

export const reservationTimeList = async args => {
    try {
        const response = await API.post('mng/order_time_list.php', args);
        return response;
    } catch (error) {}
};

export const getOrderCount = async args => {
    try {
        const response = await API.post('mng/order_day_cnt.php', args);
        return response;
    } catch (error) {}
};
export const sendAllApprove = async args => {
    try {
        const response = await API.post('mng/order_ok_all.php', args);
        return response;
    } catch (error) {}
};

export const getAllOrderList = async args => {
    try {
        const response = await API.post('mng/order_list_all.php', args);
        return response;
    } catch (error) {}
};

export const updateCheckList = async args => {
    try {
        const response = await API.post('mng/order_proc_after.php', args);
        return response;
    } catch (error) {}
};

export const getIsCouponType = async args => {
    try {
        const response = await API.post('mng/get_order_info.php', args);
        return response;
    } catch (error) {}
};
