document.addEventListener("DOMContentLoaded", () => {
    const distroCards = document.querySelectorAll(".distro-card");
    const distrosGrid = document.getElementById("distrosGrid");
    const distroPortal = document.getElementById("distroPortal");
    const backToGrid = document.getElementById("backToGrid");
    const portalTitle = document.getElementById("portalTitle");
    const portalDesc = document.getElementById("portalDesc");

    // Open Portal on Card Click
    distroCards.forEach((card) => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const name = card.querySelector("h2").textContent;
            const sub = card.querySelector("p").textContent;

            portalTitle.textContent = name;
            portalDesc.textContent = `Configuration portal for ${name} (${sub})`;

            distrosGrid.style.display = "none";
            document.querySelector(".search-container").style.display = "none";
            distroPortal.style.display = "block";
        });
    });

    // Back to Grid Button Click
    backToGrid?.addEventListener("click", () => {
        distroPortal.style.display = "none";
        distrosGrid.style.display = "grid";
        document.querySelector(".search-container").style.display = "block";
    });
});