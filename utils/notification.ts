import { NotificationInstance } from "antd/es/notification/interface";

export function openNotification(
  api: NotificationInstance,
  status: string,
  message: string
) {
  if (status === "invalid") {
    api.warning({
      message: `Invalid input`,
      description: `${message}`,
      placement: "topRight",
      className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3",
    });
  }
  if (status === "success") {
    api.success({
      message: `Register success`,
      description: `${message}`,
      placement: "topRight",
      className:
        "bg-green-100 border border-green-400 text-green-700 px-4 py-3",
    });
  }
}
