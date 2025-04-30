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
import { ChartTitle } from '../styles/widget-style';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../types/widgetTypes';

const LinechartWidget = ({ widget, children }: WidgetProps) => {
    return (
        <BaseWidget widget={widget}>
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
        </BaseWidget>
    );
};

export default LinechartWidget;
