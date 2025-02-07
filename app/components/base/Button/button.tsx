import { Button } from "@mui/material";
import { Props } from "./types/button.type";

function BaseButton({ children, ...props }: Props) {
  return (
    <Button  variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
}

export default BaseButton;
