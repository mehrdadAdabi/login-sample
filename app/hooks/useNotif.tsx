import { useContext } from "react";
import { NotificationContext } from "../components/base/Alert/alert";
import { NotificationContextType } from "../components/base/Alert/types/alert.type";

export const useNotification = (): NotificationContextType => {
  return useContext(NotificationContext) as NotificationContextType;
};
