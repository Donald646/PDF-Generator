import { React, useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

//const API_URL = "https://worksheetcreator-32445e06bf4d.herokuapp.com";

//const API_URL = "http://127.0.0.1:5000";

export const LibraryPage = () => {
  const [storageKeys, setStorageKeys] = useState([]);
  const handleDelete = (key) => {
    localStorage.removeItem(key);
  };
  useEffect(() => {
    const getAllKeys = () => {
      const localStorageKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === "debug") {
          //pass
        } else {
          localStorageKeys.push(key);
        }
      }

      setStorageKeys(localStorageKeys);
      console.log(storageKeys);
    };
    getAllKeys();
  }, [storageKeys]);

  const styles = { iconButtons: { m: 2 } };

  return (
    <List dense={false}>
      {storageKeys.map((key, index) => (
        <ListItem
          secondaryAction={
            <div>
              <Link to={`/library-viewer/${key}`}>
                <IconButton
                  edge="end"
                  aria-label="visibility"
                  className="icon-button visibility"
                  sx={styles.iconButtons}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(key)}
                className="icon-button delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          }
          key={index}
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={key} />
        </ListItem>
      ))}
    </List>
  );
};
