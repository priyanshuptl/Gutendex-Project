import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const { items = [] } = props;

  return (
    <List component="nav" aria-label="Book Genres">
      {items.map(item => (
        <ListItemLink key={`/books/${item}`} href={`/books/${item}`}>
          <ListItemText primary={item} />
        </ListItemLink>
      ))}
    </List>
  );
}
