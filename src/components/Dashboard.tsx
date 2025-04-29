import LinechartWidget from './LinechartWidget';
import TableWidget from './TableWidget';
import TextBlockWidget from './TextBlockWidget';
import { ButtonBox, Button, GridBg } from '../styles/base-style';

const Dashboard = () => {
    return (
        <GridBg>
            <TableWidget />
            <TextBlockWidget />
            <LinechartWidget />
            <ButtonBox>
                <Button>모드</Button>
                <Button>저장/불러오기</Button>
                <Button>위젯 추가</Button>
            </ButtonBox>
        </GridBg>
    );
};

export default Dashboard;
