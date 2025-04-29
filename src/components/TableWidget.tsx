import { StyledCell, StyledTable, BaseBg } from '../styles/widget-style';
import dummyData from '../data/dummyTableData.json';

const TableWidget = () => {
    return (
        <BaseBg>
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
        </BaseBg>
    );
};

export default TableWidget;
