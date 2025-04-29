import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import dummyLineChartData from '../data/dummyLinechartData.json';
import { ChartTitle, BaseBg } from '../styles/widget-style';

const LinechartWidget = () => {
    return (
        <BaseBg>
            <ChartTitle>주간 데이터 라인 차트</ChartTitle>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyLineChartData} margin={{ top: 5, right: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="line" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#aabbcc"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </BaseBg>
    );
};

export default LinechartWidget;
