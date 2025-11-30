document.addEventListener("DOMContentLoaded", () => { 
  const popupOverlay = document.getElementById("popupOverlay");
  const popupBooking = document.getElementById("popupBooking");

  window.openPopupBooking = function (roomName) {
    if (popupOverlay && popupBooking) {
        popupOverlay.classList.add("active");
        popupBooking.classList.add("active");
    }

    const select = document.getElementById("popupRoom");
    if (!select) return;

    // Nếu KHÔNG truyền roomName → dùng phòng mặc định
    if (!roomName) {
        // Chọn phòng mặc định
        select.value = "Deluxe Standard";  // hoặc "1 phòng ngủ" tùy bạn
        return;
    }

    // Nếu có truyền roomName → chọn đúng phòng
    select.selectedIndex = -1;
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.trim() === roomName.trim()) {
            select.selectedIndex = i;
            break;
        }
    }
};


  // đóng popup
  window.closePopupBooking = function () {
    popupOverlay.classList.remove("active");
    popupBooking.classList.remove("active");
  };

  popupOverlay.addEventListener("click", closePopupBooking);

 window.handleBookingSubmit = function (e) {
  e.preventDefault();

  const msg = document.getElementById("bookingSuccess");
  msg.classList.remove("hidden");

  document.getElementById("popupBookingForm").reset();

  setTimeout(() => {
    msg.classList.add("hidden");
    closePopupBooking();
  }, 3000);
};
});
