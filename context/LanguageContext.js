// context/LanguageContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("ES");

    useEffect(() => {
        AsyncStorage.getItem("@lang").then((saved) => {
            if (saved) setLanguage(saved);
        });
    }, []);

    const changeLanguage = async (value) => {
        setLanguage(value);
        try {
            await AsyncStorage.setItem("@lang", value);
        } catch { }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
