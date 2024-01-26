import React from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Cloud from "@mui/icons-material/Cloud";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Box } from "@mui/material";
import { palette } from "@mui/system";

export default function SideBar() {
  return (
    <Box
      id="sidebar"
      sx={{
        width: { lg: "220px" },
        // flex: "0",
        // border: "2px solid blue",
        // backgroundColor: "#1d3557",
        // borderRight: "1px solid #457b9d",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          // border: "3px solid red",
          height: "100%",
          backgroundColor: "#264653",
          borderRight: "2px solid #a8dadc",
          // border: "2px solid blue",
        }}
      >
        <MenuList
          sx={{
            display: "flex",
            flexDirection: { xs: "row", lg: "column" },
            // backgroundColor: "#1d3557",
            // border: "1px solid #457b9d",
          }}
        >
          <Link to="/">
            <MenuItem sx={{ color: "#f1faee" }}>
              <ListItemIcon>
                <MovieOutlinedIcon
                  style={{ color: "#f1faee" }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
          </Link>
          <Link to="/movies">
            <MenuItem sx={{ color: "#f1faee" }}>
              <ListItemIcon>
                <MovieOutlinedIcon
                  style={{ color: "#f1faee" }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>Movies</ListItemText>
            </MenuItem>
          </Link>
          <Link to="/tvseries">
            <MenuItem sx={{ color: "#f1faee" }}>
              <ListItemIcon>
                <LiveTvOutlinedIcon
                  style={{ color: "#f1faee" }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>TV Series</ListItemText>
            </MenuItem>
          </Link>
          <Link to="/bookmarks">
            <MenuItem sx={{ color: "#f1faee" }}>
              <ListItemIcon>
                <BookmarkOutlinedIcon
                  style={{ color: "#f1faee" }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>Bookmarks</ListItemText>
              {/* <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography> */}
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
}
