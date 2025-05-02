import LinechartWidget from './LinechartWidget';
import TableWidget from './TableWidget';
import TextBlockWidget from './TextBlockWidget';
import { ButtonBox, Button, Menubox, Menu } from '../styles/base';
import { useState } from 'react';
import { useWidgetStore } from '../store/widgetStore';
import { loadJSONFile, saveJSONFile } from '../utils/fileHandlers';
import { useThemeStore } from '../store/themeStore';
import { useShallow } from 'zustand/react/shallow';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { addWidget, setWidget } = useWidgetStore(
        useShallow((state) => ({ addWidget: state.addWidget, setWidget: state.setWidget })),
    );
    const widgets = useWidgetStore(useShallow((state) => state.widgets));
    const { theme, setTheme } = useThemeStore(
        useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme })),
    );

    const loadWidgets = () => {
        return widgets.map((widget) => {
            switch (widget.type) {
                case 'chart':
                    return <LinechartWidget key={widget.id} widget={widget} />;
                case 'table':
                    return <TableWidget key={widget.id} widget={widget} />;
                case 'text':
                    return <TextBlockWidget key={widget.id} widget={widget} />;
            }
        });
    };

    return (
        <>
            {loadWidgets()}
            <ButtonBox>
                <Button onClick={() => (theme == 'light' ? setTheme('dark') : setTheme('light'))}>
                    {theme == 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
                </Button>
                <Button onClick={() => saveJSONFile(widgets)}>현재 상태 저장하기</Button>
                <Button onClick={() => loadJSONFile(setWidget)}>위젯 불러오기</Button>
                <Button onClick={() => setIsOpen(!isOpen)}>위젯 추가</Button>
            </ButtonBox>
            <Menubox style={isOpen ? { display: 'block' } : { display: 'none' }}>
                <Menu onClick={() => addWidget('chart')}>라인 차트</Menu>
                <Menu onClick={() => addWidget('table')}>테이블</Menu>
                <Menu onClick={() => addWidget('text')}>텍스트 블록</Menu>
            </Menubox>
        </>
    );
};

export default Dashboard;
