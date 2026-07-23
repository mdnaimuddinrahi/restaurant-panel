import commonEN from "./locales/en/common.json";
import authEN from "./locales/en/auth.json";
import employeeEN from "./locales/en/employee.json";
import rolepermissionEN from "./locales/en/rolepermission.json";

import commonBD from "./locales/bd/common.json";
import authBD from "./locales/bd/auth.json";
import employeeBD from "./locales/bd/employee.json";
import rolepermissionBD from "./locales/bd/rolepermission.json";

export const resources = {
    en: {
        common: commonEN,
        auth: authEN,
        employee: employeeEN,
        rolepermission: rolepermissionEN,
    },

    bd: {
        common: commonBD,
        auth: authBD,
        employee: employeeBD,
        rolepermission: rolepermissionBD,
    }
};