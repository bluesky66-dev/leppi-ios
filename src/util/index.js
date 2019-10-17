import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Base64} from 'js-base64';
import countries from 'world-countries';

export const widthPercentage = dimension => {
    return widthPercentageToDP(dimension / 375 * 100);
};

export const strToFDKey = str => {
    return Base64.encode(str);
};

export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getCallingCode = (country) => {
    let callingCode = '';
    countries.map(function (el) {
        if (el.cca2.toUpperCase() == country.toUpperCase()) {
            callingCode = el.callingCode[0]
        }
    });
    return callingCode;
};
