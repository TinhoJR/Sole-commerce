document.addEventListener("DOMContentLoaded", function() {

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    

    let checkoutPage = document.querySelector(".checkout-page");
    let checkoutTemplate = document.getElementById("checkout-item-template")
    let checkoutItemsPage = document.getElementById("checkout-items");
    let checkoutSubmit = document.getElementById("checkout-payment-form")
    function getSavedCart() {
        try {
            let savedCart = JSON.parse(localStorage.getItem("shop"));

            if (!Array.isArray(savedCart)) {
                return [];
            }
            return savedCart

        } catch (error){
            console.error("Failed to read cart:", error)
            return [];
        }
    }


    function filter_cart_storage(storage) {

        let backend_cart = []
        storage.forEach(item => {
            const filtered_cart = {
                "product_id": item.productId,
                "product_qty": item.productQty,
                "attribute": {},
            }

            backend_cart.push(filtered_cart)
        })

        return backend_cart

    }


    async function handle_checkout(url,updated_cart) {

        try {

        const response = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,        
            },
            body: JSON.stringify(updated_cart),

        })

        if (response.status === 200) {

        }

        if(!response.ok){
        console.log("Request Failed", response.status);
        return null;  
        }



        const data = await response.json();

        if(!data) {
            console.log("NO DATA AVAILABLE");
            return null;
        }


        return data

        }

        catch (error){
            console.error("Checkout request failed:", error);
            return null;
        }

    
    }   
    
    function clear_cart() {
        localStorage.removeItem("shop")
    }


    async function checkout() {

        if(checkoutPage) {
            
            console.log("SENDING...")
            const current_cart = getSavedCart()
            const updatedcart = filter_cart_storage(current_cart)
            const url = "/cart/checkout/"

            const data = await handle_checkout(url,updatedcart)

            if (!data || data.length === 0) {
                console.log("No checkout data received");
                return;
            }

            console.log(data[0].product_id)

            data.forEach(dataitem => {

                templateClone = checkoutTemplate.content.cloneNode(true)
                const checkoutWrapper = templateClone.querySelector(".checkout-item")

                checkoutWrapper.setAttribute("data-product-id", dataitem.product_id)

            
                templateClone.querySelector(".checkout-item-title").textContent = dataitem.product_title;
                templateClone.querySelector(".checkout-item-quantity").textContent = dataitem.product_qty;
                templateClone.querySelector(".checkout-item-price").textContent = `$${(dataitem.product_price)}`;
                templateClone.querySelector(".checkout-item-image img").src = dataitem.product_img;


                checkoutItemsPage.append(templateClone);

            })

                console.log("ALL DONE")
                console.log(data[0].product_price)

        }


    }

    checkout()

    checkoutSubmit.addEventListener("submit", async function(event) {
        
        event.preventDefault();
        const current_cart = getSavedCart()
        const updatedcart = filter_cart_storage(current_cart)

        const formData =  new FormData(this)
        const form_details = Object.fromEntries(formData.entries())

        const payload = {
            cart: updatedcart,
            form_details: form_details
        }

        const url = "/checkout/order/"

        const data = await handle_checkout(url,payload)

        if(!data){
            return
        }

        const status = data.status;
        const order_id = data.order_id;

        if(status === 200) {
            clear_cart()

            window.location.href = `/payment/${order_id}/`;
        }

        console.log(order_id)
        
    })


})