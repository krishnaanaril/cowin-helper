import { HttpErrorResponse } from "@angular/common/http";

export const statesMock = {
    "states":
        [
            { "state_id": 1, "state_name": "Andaman and Nicobar Islands" },
            { "state_id": 2, "state_name": "Andhra Pradesh" },
            { "state_id": 3, "state_name": "Arunachal Pradesh" },
        ],
    "ttl": 24
}

export const districtsMock = {
    "districts":
        [
            { "district_id": 301, "district_name": "Alappuzha" },
            { "district_id": 307, "district_name": "Ernakulam" },
            { "district_id": 306, "district_name": "Idukki" },
        ],
    "ttl": 24
}

export const mock404ErrorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
});

export const searchForDayMock = {
    "sessions":
        [
            {
                "center_id": 578076,
                "name": "Bharath Hospital",
                "address": "BHARATH HOSPITAL AZAD LANE KOTTAYAM",
                "state_name": "Kerala",
                "district_name": "Kottayam",
                "block_name": "Kumarakom CHC",
                "pincode": 686001,
                "from": "10:30:00",
                "to": "13:30:00",
                "lat": 9,
                "long": 76, "fee_type": "Paid",
                "session_id": "cc0e4eea-102e-488c-9265-794203233a79",
                "date": "26-06-2022", "available_capacity": 448,
                "available_capacity_dose1": 150,
                "available_capacity_dose2": 150,
                "fee": "386.25", "allow_all_age": false,
                "min_age_limit": 18, "max_age_limit": 44,
                "vaccine": "COVISHIELD",
                "slots":
                    [
                        { "time": "10:30AM-12:30PM", "seats": 0 },
                        { "time": "12:30PM-01:30PM", "seats": 0 }
                    ]
            }
        ]
};

export const searchForWeekMock = {
    "centers":
        [
            {
                "center_id": 578076,
                "name": "Bharath Hospital",
                "address": "BHARATH HOSPITAL AZAD LANE KOTTAYAM",
                "state_name": "Kerala", "district_name": "Kottayam",
                "block_name": "Kumarakom CHC", "pincode": 686001, "lat": 9, "long": 76,
                "from": "10:30:00", "to": "13:30:00", "fee_type": "Paid",
                "sessions": [
                    {
                        "session_id": "cc0e4eea-102e-488c-9265-794203233a79",
                        "date": "26-06-2022", "available_capacity": 448, "min_age_limit": 18,
                        "max_age_limit": 44, "allow_all_age": false, "vaccine": "COVISHIELD",
                        "slots":
                            [
                                { "time": "10:30AM-12:30PM", "seats": 0 },
                                { "time": "12:30PM-01:30PM", "seats": 0 }
                            ],
                        "available_capacity_dose1": 150,
                        "available_capacity_dose2": 150
                    },
                    {
                        "session_id": "441d5967-32d4-4f43-ac65-7e602eaa569d",
                        "date": "02-07-2022", "available_capacity": 450,
                        "min_age_limit": 18, "max_age_limit": 44, "allow_all_age": false,
                        "vaccine": "COVISHIELD",
                        "slots":
                            [
                                { "time": "09:00AM-10:00AM", "seats": 0 },
                                { "time": "10:00AM-11:00AM", "seats": 0 },
                                { "time": "11:00AM-12:00PM", "seats": 0 },
                                { "time": "12:00PM-01:00PM", "seats": 0 }
                            ], "available_capacity_dose1": 150,
                        "available_capacity_dose2": 150
                    }],
                "vaccine_fees": [{ "vaccine": "COVISHIELD", "fee": "386.25" }]
            }
        ]
}