interface NotifyOptions {
  title?: string;
  body: string;
  icon?: string;
  onClick?: () => void;
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.warn("Este navegador não suporta notificações.");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  // Denied
  return false;
};

export const notifyTask = async (options: NotifyOptions) => {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    // fallback simples
    console.info("Notificação não permitida, exibindo alerta fallback.");
    alert(`${options.title || "TaskMaster"}: ${options.body}`);
    return;
  }

  const notification = new Notification(options.title || "TaskMaster", {
    body: options.body,
    icon: options.icon || "/icon-192.png",
  });

  if (options.onClick) {
    notification.onclick = () => {
      options.onClick!();
      notification.close();
    };
  }
};
