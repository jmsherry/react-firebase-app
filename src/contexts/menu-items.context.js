import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { v4 as uuidv4 } from "uuid";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
// import {PeopleContext} from './people.context';

export const MenuItemsContext = createContext({
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  items: [],
});

export const MenuItemsProvider = (props) => {
  const [items, setItems] = useState([]);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();
  // const { people } = useContext(PeopleContext);

  const addItem = async (formData) => {
   
      const newItem = { ...formData, _id: uuidv4() };
      console.log("new item", newItem);
      setItems([...items, newItem]);
      addToast(`Added ${newItem.name}`, {
        appearance: "success",
      });
  };

  const updateItem = async (id, updates, fullOwner) => {
    console.log("here", id, updates);
   
      // Get index
      const index = items.findIndex((item) => item._id === id);

      // Get actual item
      const oldItem = items[index];
      console.log("here", oldItem);
      // Merge with updates
      const newItem = {
        ...oldItem,
        ...updates, // order here is important for the override!!
      };

      // this is a bit sketchy, but shouldn't go out of line
      if(typeof newItem.owner === 'string') {
        newItem.owner = fullOwner;
      }

      console.log("here", newItem);
      // recreate the items array
      const updatedItems = [
        ...items.slice(0, index),
        newItem,
        ...items.slice(index + 1),
      ];
      
      setItems(updatedItems);
      addToast(`Updated ${newItem.name}`, {
        appearance: "success",
      });
  };

  const deleteItem = async (id) => {  
      // Get index
      const index = items.findIndex((item) => item._id === id);
      const deletedItem = items[index];
      // recreate the items array without that item
      const updatedItems = [
        ...items.slice(0, index),
        ...items.slice(index + 1),
      ];
      setItems(updatedItems);
      addToast(
        `Deleted ${deletedItem.name}`,
        {
          appearance: "success",
        }
      );
  };

  return (
    <MenuItemsContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {props.children}
    </MenuItemsContext.Provider>
  );
};
