import LinechartWidget from './components/LinechartWidget';
import TableWidget from './components/TableWidget';
import TextBlockWidget from './components/TextBlockWidget';
import { GridBg } from './styles/base-style';

const Dashboard = () => {
    return (
        <GridBg>
            <TableWidget />
            <TextBlockWidget />
            <LinechartWidget />
        </GridBg>
    );
};

export default Dashboard;
