import { MenuListProps, MenuItemProps } from "@mui/material";

export interface Props extends MenuListProps {
  items: Array<MenuItemProps>;
  handelClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
}

export interface ItemProps {
  id: number;
  name: string;
}
