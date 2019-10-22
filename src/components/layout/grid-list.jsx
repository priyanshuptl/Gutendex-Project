import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const getColLength = () => {
  const xs = window.matchMedia("(max-width:767px)");
  const sm = window.matchMedia("(max-width:991px) and (min-width:768px)");
  const md = window.matchMedia("(max-width:1199px) and (min-width:992px)");
  const lg = window.matchMedia("(min-width:1200px)");
  if (xs.matches) {
    return 2;
  } else if (sm.matches) {
    return 4;
  } else if (md.matches) {
    return 6;
  } else if (lg.matches) {
    return 8;
  }
};

export default function TitlebarGridList({
  tileData,
  subHeader,
  onClickGridItem
}) {
  const classes = useStyles();
  const colCount = getColLength();

  return (
    <div className={classes.root}>
      <GridList
        cols={colCount}
        cellHeight={240}
        spacing={5}
        className={classes.gridList}
      >
        {subHeader && (
          <GridListTile
            key="Subheader"
            cols={colCount}
            style={{ height: "auto" }}
          >
            <ListSubheader component="div">{subHeader}</ListSubheader>
          </GridListTile>
        )}
        {tileData.map(tile => (
          <GridListTile key={tile.title} onClick={() => onClickGridItem(tile)}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={tile.author && <span>by: {tile.author}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
