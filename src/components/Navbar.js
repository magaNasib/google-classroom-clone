import { Avatar, IconButton, MenuItem, Menu } from "@material-ui/core";
import { Add, Apps, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { auth, logout } from "../firebase";
import { createDialogAtom, joinDialogAtom } from "../utils/atoms";
import CreateClass from "./CreateClass";
import JoinClass from "./JoinClass";
import HamburguerMenu from "./SideMenuBar";
import { HamburguerButton } from "./style-hamburguer-button";

import "./Navbar.css";
import { Container } from "./styles";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);
  const [showHamburguer, setShowHamburguer] = useState(false);

  const onClickHamburguer = (e) => setShowHamburguer(!showHamburguer);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HamburguerMenu hide={showHamburguer} />
      <Container>
        <CreateClass />
        <JoinClass />
        <nav className="navbar">
          <div className="navbar__left">
            <HamburguerButton
              show={showHamburguer}
              onClick={(e) => onClickHamburguer(e)}
            >
              <MenuIcon />
              {/* <div></div>
             <div></div>
             <div></div> */}
            </HamburguerButton>

            <span>Learn</span>
            <span>Space</span>
          </div>
          <div className="navbar__right">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Add />
            </IconButton>
            <IconButton>
              <Apps />
            </IconButton>
            <IconButton onClick={logout}>
              <Avatar src={user?.photoURL} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setCreateOpened(true);
                  handleClose();
                }}
              >
                Create Class
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setJoinOpened(true);
                  handleClose();
                }}
              >
                Join Class
              </MenuItem>
            </Menu>
          </div>
        </nav>
      </Container>
    </>
  );
}

export default Navbar;
