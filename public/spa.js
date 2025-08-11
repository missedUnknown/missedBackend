document.addEventListener("click", function (e) {
  const link = e.target.closest("a[data-spa]");
  if(link)
  {
    e.preventDefault();
    fetch(link.href)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("statusBadge").textContent = data.status;
        document.getElementById("version").textContent = data.version;
        document.getElementById("uptime").textContent = data.uptime + "s";
        document.getElementById("serverTime").textContent = data.serverTime;

        // Update badge color
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
  }
});
