export type NotificationType = {
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

export type NotificationContextType = {
  showNotification: (
    message: string,
    severity: NotificationType["severity"]
  ) => void;
};
