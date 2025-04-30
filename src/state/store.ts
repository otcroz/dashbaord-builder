import { create } from 'zustand';
import { Widget } from '../types/base';

interface WidgetListStore {
    widgets: Widget[];
    addWidget: (type: string) => void;
    setWidget: (widgets: Widget[]) => void;
    setSize: (id: string, w: number, h: number) => void;
    setPosition: (id: string, x: number, y: number) => void;
}

export const useWidgetStore = create<WidgetListStore>((set) => ({
    widgets: [],
    addWidget: (type: string) => {
        set((state) => ({
            widgets: [
                ...state.widgets,
                {
                    id: `widget-${Date.now()}`,
                    type: type,
                    position: {
                        x: Math.floor(Math.random() * 800),
                        y: Math.floor(Math.random() * 600),
                    },
                    size: { w: 300, h: 300 },
                    props: {
                        content: '',
                    },
                } as Widget,
            ],
        }));
    },
    setWidget: (widgets: Widget[]) => {
        set({ widgets: widgets });
    },
    setSize: (id, w, h) => {
        set((state) => ({
            widgets: state.widgets.map((widget) =>
                widget.id === id ? { ...widget, size: { w, h } } : widget,
            ),
        }));
    },
    setPosition: (id, x, y) => {
        set((state) => ({
            widgets: state.widgets.map((widget) =>
                widget.id === id ? { ...widget, position: { x, y } } : widget,
            ),
        }));
    },
}));
