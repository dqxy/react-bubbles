import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const index = colors.findIndex(item => item.id === colorToEdit.id);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("%%" + colorToEdit.id);
        let colorArray = colors;
        colorArray[index] = res.data;

        // update state in App through the setter function
        // navigate user to the item page (or to the shop)
        // (Potentially, you could just show a success message without navigating)
        updateColors(colorArray);
        console.log(colorArray);
        updateColors(colorArray);
        const newList = colorArray;
        
        updateColors(newList);
        setEditing(false);
      })
      .catch(err => console.log(err));
    // ********** Make the put request ********** //
  };
    
  

  const deleteColor = color => {
    // make a delete request to delete this color

    const newSavedList = colors.filter(e => {
      return e.id !== color.id;
    });

    updateColors(newSavedList);

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        //check saved list for movie, removes if it is there
        const newSavedList = colors.filter(e => {
          return e.id !== colors.id;
        });
        updateColors(newSavedList);
        //set new list to reflect deleted item
        const newList = colors.filter(e => {
          return e.id !== color.id;
        });
        updateColors(newList);
      //  history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
