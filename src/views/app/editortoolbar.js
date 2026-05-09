
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 10,
    margin: `0 0 ${5}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "rgb(166, 202, 216,0.1)" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "rgb(166, 202, 216,0.1)" : "rgb(166, 202, 216,0.1)",
    padding:  10,
    // width: 250
  });