import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { handleBookmarkClickContext } from "../App";

export default function Movie_card({ values }) {
  const {
    poster_path,
    title,
    description,
    release_date,
    votes,
    id,
    category,
    isBookmarked,
  } = values;
  const { handleBookmarkClick } = React.useContext(handleBookmarkClickContext);

  const [isBookmarkedState, setIsBookmarkedState] =
    React.useState(isBookmarked);

  return (
    <Card
      id={id}
      sx={{
        minWidth: 220,
        maxWidth: 225,
        maxHeight: 375,
        backgroundColor: "#a8dadc",
        // border: "2px solid blue",
      }}
    >
      {/* <div style={{ height: "180px", width: "220px", border: "2px solid red" }}> */}
      <CardMedia
        component="img"
        alt="green iguana"
        height="180px"
        image={`https://image.tmdb.org/t/p/w185/${poster_path}`}
        // sx={{ height}}
      />
      {/* </div> */}
      <CardContent>
        <div
          style={{
            display: "flex",
            // border: "2px solid blue",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom={true}
            paragraph={true}
            variant="caption"
            component="div"
          >
            {release_date}
          </Typography>
          <Typography
            gutterBottom={true}
            paragraph={true}
            variant="caption"
            component="div"
          >
            {votes}
          </Typography>
        </div>
        <Typography gutterBottom variant="button" component="div">
          {title}
        </Typography>
        <Typography paragraph={true} variant="caption" color="text.secondary">
          {description !== ""
            ? description
            : "*No Overview available for this movie/tv show.*"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            isBookmarkedState
              ? setIsBookmarkedState(false)
              : setIsBookmarkedState(true);
            handleBookmarkClick(category, id);
          }}
          size="small"
        >
          {isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
