import LinechartWidget from './LinechartWidget';
import TableWidget from './TableWidget';
import TextBlockWidget from './TextBlockWidget';
import { ButtonBox, Button, GridBg, Menubox, Menu } from '../styles/base-style';
import { useState } from 'react';
import { useWidgetStore } from '../state/widgetStore';
import { loadJSONFile, saveJSONFile } from '../utils/fileHandlers';
import { changeTheme } from '../utils/themeHandlers';
import { useThemeStore } from '../state/themeStore';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { widgets, addWidget } = useWidgetStore();
    const { theme } = useThemeStore();

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
        <GridBg>
            {loadWidgets()}
            <ButtonBox>
                <Button
                    onClick={() => (theme == 'light' ? changeTheme('dark') : changeTheme('light'))}
                >
                    {theme == 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
                </Button>
                <Button onClick={() => saveJSONFile()}>현재 상태 저장하기</Button>
                <Button onClick={() => loadJSONFile()}>위젯 불러오기</Button>
                <Button onClick={() => setIsOpen(!isOpen)}>위젯 추가</Button>
            </ButtonBox>
            <Menubox style={isOpen ? { display: 'block' } : { display: 'none' }}>
                <Menu onClick={() => addWidget('chart')}>라인 차트</Menu>
                <Menu onClick={() => addWidget('table')}>테이블</Menu>
                <Menu onClick={() => addWidget('text')}>텍스트 블록</Menu>
            </Menubox>
        </GridBg>
    );
};

export default Dashboard;
