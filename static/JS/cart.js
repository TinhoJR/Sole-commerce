document.addEventListener("DOMContentLoaded", function() {

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    let cartPage = document.querySelector(".shopping-cart-wrapper");
    let cartTemplate = document.getElementById("cart-item-template")
    let emptyCartMgs = document.querySelector(".empty-cart-mgs")

    const miniCartWrapper = document.querySelector(".miniCart-holder");
    const miniCartTemplate = document.getElementById("mini-CartItem-template");

    refreshCartUI()

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

    function showCart() {
        let parentWrapper = document.querySelector(".parentCart-holder");
        if(!parentWrapper) return;
        parentWrapper.style.display = "block";
        const miniImgMobile =  document.querySelector(".product-miniImage-mobile");
        if(miniImgMobile) miniImgMobile.style.display = "none";
        document.querySelector("body").classList.add("noscroll");
    // HIDE MINI CART WHEN X IS CLICKED
        let closeCart = document.querySelector(".closeCart");
        if(closeCart) {
            closeCart.addEventListener("click", function() {
             parentWrapper.style.display = "none";
             document.querySelector("body").classList.remove("noscroll");
             if(miniImgMobile) miniImgMobile.style.display = "block";
        })
        }
    }

    function loadCart() {

        if(!cartPage) return
        cartPage.innerHTML = ""; // CLEAR CART PAGE

        let savedCart = getSavedCart()

        if(emptyCartMgs){
            if(savedCart.length === 0) {
            emptyCartMgs.style.display = "block";
            }
            else {
                emptyCartMgs.style.display = "none";
            }
        }

        savedCart.forEach(cartItem => {
            let templeteClone = cartTemplate.content.cloneNode(true);

            const cartWrapper = templeteClone.querySelector(".cart-display");
            cartWrapper.setAttribute("data-product-id", cartItem.productId);
            
            // ASSIGN PRODUCT DETAILS TO TEMPLATE CLONE
            templeteClone.querySelector(".product-title").textContent = cartItem.productTitle;
            templeteClone.querySelector(".product-price").textContent = `$${(cartItem.productPrice)}`;
            templeteClone.querySelector(".total-price").textContent = `$${(cartItem.productQty * cartItem.productPrice).toFixed(2)}`;  
            templeteClone.querySelector(".product-qty").textContent = cartItem.productQty; 
            templeteClone.querySelector(".product-img img").src = cartItem.productImg;

             // //SHOW DELETE BUTTON AND HIDE MINUS BTN IF QTY IS 1
            let toggleMinus_Delete = templeteClone.querySelector(".btn-wrapper");
            if (cartItem.productQty === 1) {
                toggleMinus_Delete.classList.add("show-delete")
            } else {
                    toggleMinus_Delete.classList.remove("show-delete")
            }
            // APPEND CLONE TO CARTPAGE
            cartPage.append(templeteClone)
        });

        
    }


    function renderMiniCart() {
        
        // TO AVOID ERROR
        if(!miniCartWrapper) return;
        miniCartWrapper.innerHTML = ""; // Clear Previous
        // GET SAVEDCART
        const savedCart = getSavedCart();
        // IF NO ITEM ON CART EXIT
        if (savedCart.length === 0) return;

        const lastItem = savedCart[savedCart.length - 1]; // GET ONLY THE MOST RECENTLY ADDED ITEM
        // SHOW LAST ITEM ADDED ON THE MINI CART
        const clone = miniCartTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = lastItem.productTitle;
        clone.querySelector(".product-price").textContent = `$${lastItem.productPrice}`;
        clone.querySelector(".product-img img").src = lastItem.productImg;
        // ASSIGN UNIQUE SIZE AND PRODUCT ID ON MINI CART
        const displayEl = clone.querySelector(".MiniCart-display");
        displayEl.setAttribute("data-product-id", lastItem.productId);
       

        miniCartWrapper.appendChild(clone);
    }

    let add_to_cart = document.querySelector(".add-to-cart");
    if(add_to_cart) {
        add_to_cart.addEventListener("click",function(){
        console.log("BUTTON CLICKED!")

        let cart_btn_wrapper = this.closest(".cart-btn-wrapper");

        if(!cart_btn_wrapper) return;

        let productId = cart_btn_wrapper.dataset.productId;
        let productTitle = cart_btn_wrapper.dataset.productTitle;
        let productPrice = cart_btn_wrapper.dataset.productPrice;
        let productQty = 1;
        // let productImg = document.querySelector("img[alt='product-image']").getAttribute("src");
        let productImg = cart_btn_wrapper.dataset.productImg;

        console.log("PRODUCT ID: ",productId)
        console.log("PRODUCT TITLE: ",productTitle)
        console.log("PRODUCT PRICE: ",productPrice)
        console.log("PRODUCT IMG: ",productImg)

        let added_cart = getSavedCart()
        
        let existing_cart = added_cart.find(item => 
            item.productId === productId
        );

        if(!existing_cart) {
           added_cart.push({
            productId: productId,
            productTitle: productTitle,
            productPrice: productPrice,
            productQty: productQty,
            productImg: productImg
           }) 
        }
        else {
            // INCREASE THE QTY
            existing_cart.productQty += 1
            // REMOVE THE EXISTING ITEM FROM ADDED CART TO AVOID DUPLICATE
            added_cart = added_cart.filter(item => !(item.productId === productId));
            added_cart.push(existing_cart)
        }

        localStorage.setItem("shop",JSON.stringify(added_cart));
        console.log(added_cart)
        console.log("SUCCESSFULLY ADDED TO LOCAL STORAGE")

        showCart();
        refreshCartUI();

    })
    }

    // HANDLE DELETE CART ITEM
    if(cartPage) {
        cartPage.addEventListener("click", function(e) {

            const removeBtn = e.target.closest(".remove-btn");
            if(!removeBtn) return;

            const cartDisplay = e.target.closest(".cart-display");
            const productId = cartDisplay.getAttribute("data-product-id")

            let current_cart = JSON.parse(localStorage.getItem("shop"));
            let updated_cart = current_cart.filter(item => 
                !(item.productId === productId)
            )
            localStorage.setItem("shop",JSON.stringify(updated_cart));

            refreshCartUI()
        })
    }


     function updateQuantityBtn() {
        document.addEventListener("click", function(e) {
            const minusBtn = e.target.closest(".minus-btn");
            const plusBtn = e.target.closest(".plus-btn");
            if(!minusBtn && !plusBtn) return;

            // GET PRODUCT ID 
            let cartWrapper = e.target.closest("[data-product-id]")
            if(!cartWrapper) return;
            const productId = cartWrapper.getAttribute("data-product-id");

            let savedCart = getSavedCart()
            // GRAB THE INDEX AND IF NO ITEM RETRUN
            let itemIndex = savedCart.findIndex(item => item.productId === productId)
            if(itemIndex === -1) return;

            // PREVENT MINUS BUTTON FROM GOING BELOW 1
            if(minusBtn && savedCart[itemIndex].productQty > 1) {
                savedCart[itemIndex].productQty -= 1;
            }else if(minusBtn && savedCart[itemIndex].productQty === 1) return;

            // HANDLE PLUS BTN
            if(plusBtn){
                savedCart[itemIndex].productQty += 1
            }
            // SAVE  TO STORAGE
            localStorage.setItem("shop", JSON.stringify(savedCart))

            // REFRESH PAGE
            let productqtyEl = cartWrapper.querySelector(".product-qty")
            const priceEl = cartWrapper.querySelector(".total-price");
            if(productqtyEl){
                productqtyEl.textContent = savedCart[itemIndex].productQty
            }

            const minusBtnEl = cartWrapper.querySelector(".minus-btn");
            const deleteBtnEl = cartWrapper.querySelector(".removebtn-style");
            // UPDATE DELETE AND MINUS BTN
            if (savedCart[itemIndex].productQty === 1) {
                if (minusBtnEl) minusBtnEl.style.visibility = "hidden";
                if (deleteBtnEl) deleteBtnEl.style.visibility = "visible";
            } else {
                if (minusBtnEl) minusBtnEl.style.visibility = "visible";
                if (deleteBtnEl) deleteBtnEl.style.visibility = "hidden";
            }

             if (priceEl) {
                const unitPrice = parseFloat(savedCart[itemIndex].productPrice); // PARSE FLOAT FOR MULTIPLICATION AND GETTING THE PRODUCT PRICE
                const total = unitPrice * savedCart[itemIndex].productQty; // PRODUCT PRICE ** PRODUCT QTY
                priceEl.textContent = `$${total.toFixed(2)}`;
                }

                updateCartTotalAmount()
                
        });
    }


    function updateCartTotalAmount() {

        const cartItems = getSavedCart()

        let total = cartItems.reduce((sum, item) => {
            return sum + item.productPrice * item.productQty
        }, 0);

        document.querySelectorAll(".total-cartAmount").forEach(totalAmount => {
            totalAmount.textContent = `$${total.toFixed(2)}`;
        })

    }


    function refreshCartUI() {
    loadCart();
    renderMiniCart()
    updateCartTotalAmount()
   }

    updateQuantityBtn()


})