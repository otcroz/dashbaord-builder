import { TextBlock } from '../styles/widget-style';
import { WidgetProps } from '../types/widgetTypes';
import BaseWidget from './BaseWidget';

const TextBlockWidget = ({ widget, children }: WidgetProps) => {
    return (
        <BaseWidget widget={widget}>
            <TextBlock value={widget.props.content} />
        </BaseWidget>
    );
};

export default TextBlockWidget;
