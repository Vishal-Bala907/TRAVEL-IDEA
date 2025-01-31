"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getArchives } from "../server/basic/basic";
import { IoPersonCircle } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { IoMdArchive } from "react-icons/io";
import Profile from "../profile/Profile";
import DropDown from "../admin/DropDown";
import { FaFileInvoice } from "react-icons/fa";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header2() {
  const router = useRouter();
  const [showProfile, setShowProfile] = React.useState(false);
  const role = useSelector((state) => state.user.role);
  const auth = useSelector((state) => state.user.auth);
  const mobile = useSelector((state) => state.user.phone);
  const [archiveCount, setArchiveCount] = React.useState(0);
  console.log(auth);

  React.useEffect(() => {
    getArchives(mobile)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mobile]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#093258" }}>
      <Container maxWidth="xl" sx={{ padding: "10px 0px" }}>
        <Toolbar disableGutters>
          <img
            onClick={() => {
              router.push("/");
            }}
            className="max-w-[140px] cursor-pointer"
            src="/img/FINAL LOGO.png"
            alt="logo"
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* {pages.map((page) => ( */}
              <MenuItem onClick={handleCloseNavMenu}>
                <img
                  className="max-w-[15px] max-h-[15px]"
                  src="/img/general/whatsapp.png"
                  alt="earth"
                />
                <a href="#" className="text-white">
                  Chat with us
                </a>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <FontAwesomeIcon
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  icon={faPhone}
                />
                <a href="#" className="text-dark px-4 py-2 rounded-md">
                  075 148 529 14
                </a>
              </MenuItem>
              <MenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/arc");
                  setAnchorElNav(null);
                }}
              >
                <div className="flex flex-row gap-4" title="Archives">
                  <IoMdArchive
                    style={{ fontSize: "x-large" }}
                    onClick={() => {
                      router.push("/arc");
                      setAnchorElNav(null);
                    }}
                  />
                  <span>Archives</span>
                </div>
              </MenuItem>

              {role !== "ROLE_ADMIN" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  className="cursor-pointer"
                >
                  <div className="relative">
                    <Tooltip title="Visa History">
                      <FaFileInvoice
                        style={{
                          fontSize: "x-large",
                          margin: "0px 0px 0px 10px",
                        }}
                        onClick={() => {
                          router.push("/history");
                          setAnchorElNav(null);
                        }}
                      />
                    </Tooltip>
                  </div>
                </MenuItem>
              )}
              {role === "ROLE_ADMIN" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  className="cursor-pointer"
                >
                  <DropDown />
                </MenuItem>
              )}

              {/* ))} */}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box
            className="flex justify-end items"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", margin: "0px 25px" },
            }}
          >
            <div className="flex justify-center flex-row flex-wrap items-center">
              {role === "ROLE_ADMIN" && <DropDown />}
              <div className="w-fit flex justify-center flex-row items-center gap-3 px-3">
                <img
                  className="max-w-[15px] max-h-[15px] cursor-pointer"
                  src="/img/general/whatsapp.png"
                  alt="earth"
                />
                <a href="#" className="text-white cursor-pointer">
                  Chat with us
                </a>
              </div>
              <div className="w-fit flex justify-center flex-row items-center gap-1 px-3 cursor-pointer">
                <FontAwesomeIcon
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  icon={faPhone}
                />
                <a href="#" className="text-dark px-4 py-2 rounded-md">
                  075 148 529 14
                </a>
              </div>

              <div className="relative cursor-pointer">
                <Tooltip title="Archives">
                  <IoMdArchive
                    style={{ fontSize: "x-large" }}
                    onClick={() => {
                      router.push("/arc");
                    }}
                  />
                </Tooltip>
              </div>
              {role !== "ROLE_ADMIN" && (
                <div className="relative cursor-pointer">
                  <Tooltip title="Visa History">
                    <FaFileInvoice
                      style={{
                        fontSize: "x-large",
                        margin: "0px 0px 0px 10px",
                      }}
                      onClick={() => {
                        router.push("/history");
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {auth && (
              <Tooltip title="Profile">
                <IoPersonCircle
                  className="cursor-pointer"
                  style={{
                    fontSize: "xxx-large",
                    margin: "0px 0px 0px 10px",
                  }}
                  onClick={() => {
                    setShowProfile(true);
                  }}
                />
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
      {showProfile && (
        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      )}
    </AppBar>
  );
}
export default Header2;
