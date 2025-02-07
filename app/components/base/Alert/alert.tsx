"use client";

import React, { useState, ReactNode, createContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { NotificationContextType, NotificationType } from "./types/alert.type";

export const NotificationContext = createContext<
  NotificationContextType | string
>("");

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const showNotification = (
    message: string,
    severity: NotificationType["severity"]
  ) => {
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
      >
        {notification! && (
          <Alert severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};
