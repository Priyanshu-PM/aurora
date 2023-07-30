import { create } from 'zustand';

interface userProModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const UseProModal = create<userProModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
}))