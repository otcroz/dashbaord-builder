import LinechartWidget from './LinechartWidget';
import TableWidget from './TableWidget';
import TextBlockWidget from './TextBlockWidget';
import { ButtonBox, Button, GridBg, Menubox, Menu } from '../styles/base-style';
import { useState } from 'react';
import { useWidgetStore } from '../state/store';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { widgets, addWidget } = useWidgetStore();

    const loadWidgets = () => {
        return widgets.map((widget) => {
            switch (widget.type) {
                case 'chart':
                    return <LinechartWidget key={widget.id} />;
                case 'table':
                    return <TableWidget key={widget.id} />;
                case 'text':
                    return <TextBlockWidget key={widget.id} content={widget.props.content} />;
            }
        });
    };

    return (
        <GridBg>
            {loadWidgets()}
            <ButtonBox>
                <Button>모드</Button>
                <Button>현재 상태 저장하기</Button>
                <Button>불러오기</Button>
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
