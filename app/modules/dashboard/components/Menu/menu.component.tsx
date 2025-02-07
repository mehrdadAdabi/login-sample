import { Fade, Menu, MenuItem } from "@mui/material";
import { ItemProps, Props } from "./types/menu.type";
import { useEffect, useState } from "react";

function BaseMenu(props: Props) {
  const { items, isOpen, handelClick, ...rest } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(isOpen);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (handelClick) {
      handelClick();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        open={open}
        onClose={handleClose}
        {...rest}
        TransitionComponent={Fade}
      >
        {items.map((item: any, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default BaseMenu;
