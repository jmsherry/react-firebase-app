import React, { createContext, useState, /* useContext, */ useEffect } from "react";
import { useToasts } from "react-toast-notifications";
// import { v4 as uuidv4 } from "uuid";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "./firebase";
// import { AuthContext } from "./auth.context";

export const MenuItemsContext = createContext({
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  items: [],
  loading: false,
  error: false,
});

export const MenuItemsProvider = (props) => {
  const [items, setItems] = useState([]);
  // const [err, setErr] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(false);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();
  // const { user } = useContext(AuthContext);
  const collection = firebase.firestore().collection("menu-items");
  
  const [snapshot, loading, error] = useCollection(collection, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (error) {
  //     setError(err);
  console.log(error)
  addToast(`Error: ${error}`, {
    appearance: "error",
  });
    }
  }, [error, addToast]);

  useEffect(() => {
    if (snapshot) {

      setItems(
        snapshot.docs.map((doc) => Object.assign({ id: doc.id }, doc.data()))
      );
      // setLoaded(true);

    }
  }, [snapshot /*, loaded */]);

  // console.log("user", user);
  // setItems()

  const addItem = async (formData) => {
    try {
      collection.add(formData);
      addToast(`Added ${formData.name}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err)
      addToast(`Error Adding ${formData.name}`, {
        appearance: "error",
      });
    }
  };

  const updateItem = async (original, updates) => {
    console.log("updateItem", original, updates);

    collection.doc(original.id).update(updates);

    addToast(`Updated ${original.name}`, {
      appearance: "success",
    });
  };

  const deleteItem = async (id) => {
    console.log("delete id", id);
    const { name } = items.find((item) => item.id === id);
    try {
      collection.doc(id).delete();
      addToast(`Deleted ${name}`, {
        appearance: "success",
      });
    } catch (err) {
      console.error(err);
      addToast(`Error deleting ${name}`, {
        appearance: "error",
      });
    }
  };

  return (
    <MenuItemsContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {props.children}
    </MenuItemsContext.Provider>
  );
};
