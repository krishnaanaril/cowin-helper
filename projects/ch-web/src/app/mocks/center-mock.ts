import { CenterForDay } from "../models/center-for-day";
import { CenterForWeek } from "../models/center-for-week";

export const centerForDayMock: CenterForDay = {
    center_id: 127701,
    name: 'Vizhickathodu PHC',
    address: 'Vizhickathodu PHCVizhickathodu PO Kanjirappally Kottayam',
    state_name: 'Kerala',
    district_name: 'Kottayam',
    block_name: 'Erumely CHC',
    pincode: 686518,
    lat: 9,
    long: 76,
    from: '10:00:00',
    to: '11:00:00',
    fee_type: 'Free',
    session_id: '',
    date: 'string',
    available_capacity: 1,
    min_age_limit: 1,
    vaccine: 'string',
    slots: [], 
    fee: ''
}

export const centerForWeekMock: CenterForWeek = {
    center_id: 127701,
    name: 'Vizhickathodu PHC',
    address: 'Vizhickathodu PHCVizhickathodu PO Kanjirappally Kottayam',
    state_name: 'Kerala',
    district_name: 'Kottayam',
    block_name: 'Erumely CHC',
    pincode: 686518,
    lat: 9,
    long: 76,
    from: '10:00:00',
    to: '11:00:00',
    fee_type: 'Free',
    sessions: []
}