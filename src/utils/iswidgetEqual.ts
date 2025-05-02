import { Widget } from '../types/base';

// 객체 내의 각각의 값이 같은지 확인
const areWidgetsEqual = (prev: Widget, next: Widget) => {
    return (
        prev.id === next.id &&
        prev.type === next.type &&
        prev.position.x === next.position.x &&
        prev.position.y === next.position.y &&
        prev.size.w === next.size.w &&
        prev.size.h === next.size.h &&
        prev.props.content === next.props.content &&
        prev.props.zIndex === next.props.zIndex
    );
};

export const areEqual = (prevProps: { widget: Widget }, nextProps: { widget: Widget }) => {
    return areWidgetsEqual(prevProps.widget, nextProps.widget);
};
