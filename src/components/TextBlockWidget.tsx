import { TextBlock } from '../styles/widget-style';
import { WidgetProps } from '../types/widgetTypes';
import BaseWidget from './BaseWidget';
import { useWidgetStore } from '../store/widgetStore';

const TextBlockWidget = ({ widget }: WidgetProps) => {
    const updateContent = useWidgetStore((state) => state.updateContent);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value);
        updateContent(widget.id, e.target.value);
    };

    // 텍스트 입력 완료 후 전역 상태에 저장
    const handleBlur = () => {
        updateContent(widget.id, widget.props.content);
    };

    return (
        <BaseWidget widget={widget}>
            <TextBlock value={widget.props.content} onChange={handleChange} onBlur={handleBlur} />
        </BaseWidget>
    );
};

export default TextBlockWidget;
