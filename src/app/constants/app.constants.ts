import { Page } from "@models/app.model";
import { LanguageTypes } from "./messages.constants";

export const baseUrl : string = 'http://localhost:8081';
export const roles : string[] = ['User', 'Admin'];
export const defaultLanguage : LanguageTypes = 'en';
export const typeOptions = [{ label: 'Movie', value: 'movie' }, { label: 'Series', value: 'series' }, { label: 'Episode', value: 'episode' }];


export const pages : Page[] = [
    {
        headerEn:'OM Movies',
        headerAr:'OM أفلام',
        path:'/admin-movies-om',
        permission:'ADMIN'
    },
    {
        headerEn:'DB Movies',
        headerAr:'أفلام المسؤول',
        path:'/admin-movies-db',
        permission:'ADMIN'
    },
    {
        headerEn:'User Movies',
        headerAr:'أفلام المستخدم',
        path:'/user-movies-db',
        permission:'USER'
    },
    {
        headerEn:'Register',
        headerAr:'إنشاء حساب',
        path:'/register',
        permission:'ADMIN'
    },
];
