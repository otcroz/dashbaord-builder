import { useState } from 'react';
import { TextBlock } from '../styles/widget-style';
import { WidgetProps } from '../types/widgetTypes';
import BaseWidget from './BaseWidget';

const TextBlockWidget = ({ widget }: WidgetProps) => {
    const [text, setText] = useState(widget.props.content);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    // 텍스트 입력 완료 후 전역 상태에 저장
    const handleBlur = () => {
        widget.props.content = text;
    };

    return (
        <BaseWidget widget={widget}>
            <TextBlock value={text} onChange={handleChange} onBlur={handleBlur} />
        </BaseWidget>
    );
};

export default TextBlockWidget;
