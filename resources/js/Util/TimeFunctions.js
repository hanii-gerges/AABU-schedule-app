import React from 'react';
import moment from "moment";

export const extractTimeFromString = str =>
    str.replace(new RegExp("[^\\d\\.\\-AMP]", "g"), "");

export const extractDaysFromString = str =>
    str.replace(new RegExp("[\\d\\.\\-AMP]", "g"), "");

export const getValidMomentTime = time => {
    time = extractTimeFromString(time)
        .split("-")[0]
        .toLowerCase()
        .replace(".", ":");
    return moment(time, "hh.mma");
};
