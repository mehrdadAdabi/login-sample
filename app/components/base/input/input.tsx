import React from "react";
import TextField from "@mui/material/TextField";
import { BaseInputProps } from "./types/input.type";

const BaseInput = (props: BaseInputProps = {}) => {
  return <TextField {...props} variant="outlined" fullWidth />;
};

export default BaseInput;
