import React, { Component } from 'react';
import { SortableContainer as RSHContainer, SortableElement as RSHElement } from 'react-sortable-hoc';

const SortableItem = RSHElement(({ value }) => <div>{value}</div>);

const SortableContainer = RSHContainer(({ items }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    );
});
/**
 * 
 * @param {SortableListProps} props 
 */
export default function SortableList(props) {
    return (
        <SortableContainer
            {...props}
            // This sets that the itme must be dragged for at least distance 1 before it is considered a sort
            distance={1}
        />
    );
};

/**
 * @typedef SortableListProps
 * @property {any[]} items
 * @property {function({ oldIndex: number, newIndex: number})} onSortEnd
 */