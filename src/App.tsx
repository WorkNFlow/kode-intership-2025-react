import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

export interface User {
    id: number;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    userTag: string;
    department: string;
    birthday: string;
    phone: string;
}


export const NetworkContext = createContext<{
    isOnline: boolean;
    isLoading: boolean;
}>({
    isOnline: true,
    isLoading: true
});

export type Language = "ru" | "en";

export const LanguageContext = createContext<{
    language: Language;
    toggleLanguage: () => void;
}>({
    language: "ru",
    toggleLanguage: () => {},
});

export const ThemeContext = createContext<{
    isDarkMode: boolean;
    toggleTheme: () => void;
}>({
    isDarkMode: false,
    toggleTheme: () => {},
});

const App = () => {
    const [isOnline, setOnline] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(true);

    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language');

        if (savedLanguage === 'ru' || savedLanguage === 'en') {
            return savedLanguage;
        }

        return "ru";
    });

    const toggleLanguage = () => {
        const newLanguage: Language = language === "ru" ? "en" : "ru";
        setLanguage(newLanguage);
        // Сохраняем в localStorage
        localStorage.setItem('language', newLanguage);
    };

    useEffect(() => {
        const updateNetworkStatus = () => {
            setOnline(navigator.onLine);
        };

        const handleLoad = () => {
            setLoading(false);
        };

        const detectBrowserLanguage = () => {
            const savedLanguage = localStorage.getItem('language');

            if (savedLanguage === 'ru' || savedLanguage === 'en') {
                return;
            }

            const browserLang = navigator.language.toLowerCase();

            const detectedLang: Language = browserLang.includes("ru") ? "ru" : "en";

            setLanguage(detectedLang);
            localStorage.setItem('language', detectedLang);
        };

        // Определяем язык при инициализации
        detectBrowserLanguage();

        window.addEventListener("load", updateNetworkStatus);
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);
        const timer = setTimeout(handleLoad, 1000);

        return () => {
            window.removeEventListener("load", updateNetworkStatus);
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
            clearTimeout(timer);
        };
    }, []);



    // Инициализация состояния с проверкой localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Проверяем localStorage
        const savedMode = localStorage.getItem('darkMode');

        if (savedMode !== null) {
            return savedMode === 'true';
        }

        return document.body.classList.contains("dark");
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
    };

    return (
        <NetworkContext.Provider value={{ isOnline, isLoading }}>
            <LanguageContext.Provider value={{ language, toggleLanguage }}>
                <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:id" element={<Details />} />
                    </Routes>
                </ThemeContext.Provider>
            </LanguageContext.Provider>
        </NetworkContext.Provider>
    );
};

export default App;