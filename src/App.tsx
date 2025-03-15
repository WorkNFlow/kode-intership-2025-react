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

// Создаем контекст для языка
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

    // Инициализируем состояние языка с проверкой localStorage
    const [language, setLanguage] = useState<Language>(() => {
        // Проверяем localStorage
        const savedLanguage = localStorage.getItem('language');

        // Если есть сохраненное значение, используем его
        if (savedLanguage === 'ru' || savedLanguage === 'en') {
            return savedLanguage;
        }

        // Если нет сохраненного значения, возвращаем "ru" по умолчанию
        return "ru";
    });

    // Функция для переключения языка с сохранением в localStorage
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

        // Определяем язык браузера только если нет значения в localStorage
        const detectBrowserLanguage = () => {
            // Проверяем localStorage
            const savedLanguage = localStorage.getItem('language');

            // Если есть сохраненное значение, не меняем текущий язык
            if (savedLanguage === 'ru' || savedLanguage === 'en') {
                return;
            }

            // Получаем язык из navigator.language
            const browserLang = navigator.language.toLowerCase();

            // Проверяем, содержит ли строка "ru", иначе устанавливаем "en"
            const detectedLang: Language = browserLang.includes("ru") ? "ru" : "en";

            // Устанавливаем определенный язык и сохраняем в localStorage
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

        // Если есть сохраненное значение, используем его
        if (savedMode !== null) {
            return savedMode === 'true';
        }

        // Иначе используем значение из классов body как было раньше
        return document.body.classList.contains("dark");
    });

    // Применяем тему при монтировании компонента и при изменении isDarkMode
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
        // Сохраняем в localStorage
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