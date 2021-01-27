import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = ({ colors, removeColor }) => {
    const colorBoxes = colors.map((c, i) =>
        <DraggableColorBox
            key={c.name}
            index={i}
            {...c}
            removeColor={removeColor}
        />
    );

    return (
        <div style={{ height: '100%' }}>
            {colorBoxes}
        </div>
    );
};

export default SortableContainer(DraggableColorList);
