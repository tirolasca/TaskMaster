export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

export const notifyTask = (text: string) => {
  if (Notification.permission === "granted") {
    new Notification("TaskMaster", {
      body: text,
      icon: "/icon-192.png",
    });
  }
};
