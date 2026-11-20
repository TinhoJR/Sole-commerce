document.addEventListener("DOMContentLoaded", function() {

   let menuToggler = document.querySelector(".bar-wrapper");
    menuToggler.addEventListener("click", function() {
        this.classList.toggle("change");
    }); 


    // AD HEADLINES

    const marqueeTrack = document.querySelector(".marquee-track") 

    if(marqueeTrack) {
        const paragraph = marqueeTrack.querySelectorAll("p")
        if (paragraph.length > 0) {
        marqueeTrack.classList.add("animate-marquee")
    }
    }



    const thumbnails = document.querySelectorAll(".product-thumbnail");
    const mainImage = document.querySelector("#main-product-image");

    function selectProductImage(thumbnail) {
        mainImage.src = thumbnail.dataset.imageUrl;

        thumbnails.forEach((item) => {
            const selected = item === thumbnail;

            item.classList.toggle("active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
    }

    // Prefer the designated cover image.
    // If none is marked, use the first available image.
    const initialThumbnail =
        Array.from(thumbnails).find(
            (thumbnail) => thumbnail.dataset.isCover === "true"
        ) || thumbnails[0];

    if (initialThumbnail) {
        selectProductImage(initialThumbnail);
    }

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            selectProductImage(thumbnail);
        });
    });

    const gridToggle = document.getElementById("gridToggle");
    const productGrid = document.getElementById("productGrid");

    if(gridToggle) {
        gridToggle.addEventListener("click", () => {

            console.log("clicked")

        productGrid.classList.toggle("four-columns");

        gridToggle.textContent =
            productGrid.classList.contains("four-columns")
            ? "3 Grid"
            : "4 Grid";

    });
    }



const registerForm = document.querySelector(".register-form");

const password1 = document.querySelector("#id_password1");
const password2 = document.querySelector("#id_password2");

if(registerForm) {

    registerForm.addEventListener("submit", function(event) {

    if (password1.value !== password2.value) {

        event.preventDefault();

        alert("Passwords do not match!");

        password2.focus();

    }

});

}


let paymentForm = document.querySelector(".payment-form")

if (paymentForm) {
    paymentForm.addEventListener("submit", function() {
    alert("yooo")
    })
}


})