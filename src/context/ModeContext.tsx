import React, { createContext, useContext, useState, useEffect } from 'react';

type Mode = 'Edit' | 'Test';

interface ModeContextType {
    mode: Mode;
    toggleMode: () => void;
}
const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<Mode>(() => {
        const savedMode = localStorage.getItem('mode');
        return (savedMode as Mode) || 'edit';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        localStorage.setItem('mode', mode);
    }, [mode]);

    const toggleMode = () => {
        setMode(prev => prev === 'Edit' ? 'Test' : 'Edit');
    };

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (context === undefined) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
}; 