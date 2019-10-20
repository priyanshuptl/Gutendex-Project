import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function SimpleList(props) {
  const { items = [], onSelect } = props;

  return (
    <List component="nav" aria-label="Book Genres">
      {items.map(item => (
        <ListItem button key={`/books/${item}`} onClick={() => onSelect(item)}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}
