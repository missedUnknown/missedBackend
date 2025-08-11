const socket = io();

socket.on("statusUpdate", (data) => {
  document.getElementById("statusBadge").textContent = data.status;
  document.getElementById("version").textContent = data.version;
  document.getElementById("uptime").textContent = data.uptime + "s";
  document.getElementById("serverTime").textContent = data.serverTime;

  if(data.status === "Online")
  {
    document.getElementById("statusBadge").classList.add("online");
    document.getElementById("statusBadge").classList.remove("offline");
  } else
  {
    document.getElementById("statusBadge").classList.add("offline");
    document.getElementById("statusBadge").classList.remove("online");
  }
});
