import { StyledCell, StyledTable } from '../styles/widget-style';
import dummyData from '../data/dummyTableData.json';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../types/widgetTypes';

const TableWidget = ({ widget }: WidgetProps) => {
    return (
        <BaseWidget widget={widget}>
            <StyledTable>
                <tbody>
                    {dummyData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((cell, colIdx) => (
                                <StyledCell key={colIdx}>{cell}</StyledCell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </BaseWidget>
    );
};

export default TableWidget;
