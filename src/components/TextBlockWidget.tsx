import { BaseBg, TextBlock } from '../styles/widget-style';

interface TextBlockWidgetProps {
    content: string;
}

const TextBlockWidget = ({ content }: TextBlockWidgetProps) => {
    return (
        <BaseBg>
            <TextBlock value={content} />
        </BaseBg>
    );
};

export default TextBlockWidget;
