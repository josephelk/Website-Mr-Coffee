// Main JavaScript file for MR.COFFEE website
document.addEventListener("DOMContentLoaded", () => {
  // Handle hash links for menu categories
  if (window.location.hash) {
    const hash = window.location.hash.substring(1) // Remove the # character

    // Check if we're on the menu page and the hash corresponds to a menu category
    const menuCategories = document.querySelectorAll(".menu-category")
    const filterButtons = document.querySelectorAll(".filter-btn")

    if (menuCategories.length > 0 && filterButtons.length > 0) {
      // Hide all menu categories first
      menuCategories.forEach((category) => {
        category.classList.remove("active")
      })

      // Remove active class from all filter buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Show the category that matches the hash
      const targetCategory = document.getElementById(hash)
      if (targetCategory) {
        targetCategory.classList.add("active")

        // Also activate the corresponding filter button
        const targetButton = document.querySelector(`.filter-btn[data-filter="${hash}"]`)
        if (targetButton) {
          targetButton.classList.add("active")
        }

        // Scroll to the category section with a slight offset
        setTimeout(() => {
          const menuSection = document.getElementById("menu-section")
          if (menuSection) {
            menuSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
    }
  }
  
  
  
  // ===== COMMON FUNCTIONALITY =====

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navMenu && navMenu.classList.contains("active") && !event.target.closest("nav")) {
      navMenu.classList.remove("active")

      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.remove("active"))
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close modal when clicking on X or outside
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".close-modal")

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.style.display = "none"
    })
  })

  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })

  // ===== REWARDS PAGE FUNCTIONALITY =====

  // Reward buttons functionality
  const rewardButtons = document.querySelectorAll(".reward-btn")
  const downloadModal = document.getElementById("download-modal")

  if (rewardButtons.length > 0 && downloadModal) {
    rewardButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Show download app modal
        downloadModal.style.display = "flex"
      })
    })

    // Close modal with button
    const closeConfirmation = document.getElementById("close-confirmation")
    if (closeConfirmation) {
      closeConfirmation.addEventListener("click", () => {
        downloadModal.style.display = "none"
      })
    }
  }

  // ===== MENU PAGE FUNCTIONALITY =====

  // Menu filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const menuCategories = document.querySelectorAll(".menu-category")

  if (filterButtons.length > 0 && menuCategories.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Get filter value
        const filter = this.getAttribute("data-filter")

        // Hide all menu categories
        menuCategories.forEach((category) => {
          category.classList.remove("active")
        })

        // Show selected category
        document.getElementById(filter).classList.add("active")
      })
    })
  }

  // ===== ORDER PAGE FUNCTIONALITY =====

  // Form elements
  const orderForm = document.getElementById("order-form")

  if (orderForm) {
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const phoneInput = document.getElementById("phone")
    const addressInput = document.getElementById("address")
    const orderTypeSelect = document.getElementById("order-type")
    const itemCheckboxes = document.querySelectorAll('input[name="items"]')
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]')

    // Error message elements
    const nameError = document.getElementById("name-error")
    const emailError = document.getElementById("email-error")
    const phoneError = document.getElementById("phone-error")
    const addressError = document.getElementById("address-error")
    const orderTypeError = document.getElementById("order-type-error")
    const itemsError = document.getElementById("items-error")

    // Price calculation elements
    const subtotalElement = document.getElementById("subtotal")
    const taxElement = document.getElementById("tax")
    const totalElement = document.getElementById("total")

    // Modal elements
    const orderConfirmation = document.getElementById("order-confirmation")
    const orderDetails = document.getElementById("order-details")
    const closeConfirmation = document.getElementById("close-confirmation")

    // Calculate prices whenever an item or addon is selected/deselected
    function calculatePrices() {
      let subtotal = 0

      // Add prices of selected items
      itemCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          subtotal += Number.parseFloat(checkbox.getAttribute("data-price"))
        }
      })

      // Add prices of selected addons
      addonCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          subtotal += Number.parseFloat(checkbox.getAttribute("data-price"))
        }
      })

      // Calculate tax and total
      const tax = subtotal * 0.08 // 8% tax
      const total = subtotal + tax

      // Update display
      subtotalElement.textContent = "$" + subtotal.toFixed(2)
      taxElement.textContent = "$" + tax.toFixed(2)
      totalElement.textContent = "$" + total.toFixed(2)
    }

    // Add event listeners to checkboxes
    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", calculatePrices)
    })

    addonCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", calculatePrices)
    })

    // Form validation functions
    function validateName() {
      const name = nameInput.value.trim()

      if (name === "") {
        nameError.textContent = "Name is required"
        nameError.style.display = "block"
        return false
      }

      if (name.length < 2) {
        nameError.textContent = "Name must be at least 2 characters"
        nameError.style.display = "block"
        return false
      }

      nameError.style.display = "none"
      return true
    }

    function validateEmail() {
      const email = emailInput.value.trim()

      if (email === "") {
        emailError.textContent = "Email is required"
        emailError.style.display = "block"
        return false
      }

      // Simple email validation without regex
      if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.indexOf("@") === 0 ||
        email.lastIndexOf(".") < email.indexOf("@")
      ) {
        emailError.textContent = "Please enter a valid email address"
        emailError.style.display = "block"
        return false
      }

      emailError.style.display = "none"
      return true
    }

    function validatePhone() {
      const phone = phoneInput.value.trim()

      if (phone === "") {
        phoneError.textContent = "Phone number is required"
        phoneError.style.display = "block"
        return false
      }

      // Check if phone contains only digits and has appropriate length
      let digitsOnly = ""
      for (let i = 0; i < phone.length; i++) {
        if (phone[i] >= "0" && phone[i] <= "9") {
          digitsOnly += phone[i]
        }
      }

      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        phoneError.textContent = "Phone number must have 10-15 digits"
        phoneError.style.display = "block"
        return false
      }

      phoneError.style.display = "none"
      return true
    }

    function validateAddress() {
      const address = addressInput.value.trim()
      const orderType = orderTypeSelect.value

      if (orderType === "delivery" && address === "") {
        addressError.textContent = "Address is required for delivery"
        addressError.style.display = "block"
        return false
      }

      addressError.style.display = "none"
      return true
    }

    function validateOrderType() {
      const orderType = orderTypeSelect.value

      if (orderType === "") {
        orderTypeError.textContent = "Please select an order type"
        orderTypeError.style.display = "block"
        return false
      }

      orderTypeError.style.display = "none"
      return true
    }

    function validateItems() {
      let itemSelected = false

      itemCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          itemSelected = true
        }
      })

      if (!itemSelected) {
        itemsError.textContent = "Please select at least one item"
        itemsError.style.display = "block"
        return false
      }

      itemsError.style.display = "none"
      return true
    }

    // Add input event listeners for real-time validation
    nameInput.addEventListener("input", validateName)
    emailInput.addEventListener("input", validateEmail)
    phoneInput.addEventListener("input", validatePhone)
    addressInput.addEventListener("input", validateAddress)
    orderTypeSelect.addEventListener("change", validateOrderType)

    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", validateItems)
    })

    // Order type change handler
    orderTypeSelect.addEventListener("change", function () {
      if (this.value === "delivery") {
        addressInput.setAttribute("required", "required")
        document.querySelector('label[for="address"]').innerHTML = 'Delivery Address <span class="required">*</span>'
      } else {
        addressInput.removeAttribute("required")
        document.querySelector('label[for="address"]').textContent = "Delivery Address"
      }
    })

    // Form submission
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Validate all fields
      const isNameValid = validateName()
      const isEmailValid = validateEmail()
      const isPhoneValid = validatePhone()
      const isAddressValid = validateAddress()
      const isOrderTypeValid = validateOrderType()
      const areItemsValid = validateItems()

      // If all validations pass
      if (isNameValid && isEmailValid && isPhoneValid && isAddressValid && isOrderTypeValid && areItemsValid) {
        // Generate order details for confirmation
        let orderDetailsHTML = "<h3>Order Summary</h3>"
        orderDetailsHTML += "<p><strong>Name:</strong> " + nameInput.value + "</p>"
        orderDetailsHTML += "<p><strong>Email:</strong> " + emailInput.value + "</p>"
        orderDetailsHTML += "<p><strong>Phone:</strong> " + phoneInput.value + "</p>"
        orderDetailsHTML += "<p><strong>Order Type:</strong> " + orderTypeSelect.value + "</p>"

        if (orderTypeSelect.value === "delivery") {
          orderDetailsHTML += "<p><strong>Delivery Address:</strong> " + addressInput.value + "</p>"
        }

        orderDetailsHTML += "<h4>Items:</h4><ul>"

        itemCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            orderDetailsHTML += "<li>" + checkbox.value + " - $" + checkbox.getAttribute("data-price") + "</li>"
          }
        })

        orderDetailsHTML += "</ul>"

        const selectedAddons = []
        addonCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedAddons.push(checkbox.value)
          }
        })

        if (selectedAddons.length > 0) {
          orderDetailsHTML += "<h4>Add-ons:</h4><ul>"
          addonCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
              orderDetailsHTML += "<li>" + checkbox.value + " - $" + checkbox.getAttribute("data-price") + "</li>"
            }
          })
          orderDetailsHTML += "</ul>"
        }

        orderDetailsHTML += "<p><strong>Subtotal:</strong> " + subtotalElement.textContent + "</p>"
        orderDetailsHTML += "<p><strong>Tax:</strong> " + taxElement.textContent + "</p>"
        orderDetailsHTML += "<p><strong>Total:</strong> " + totalElement.textContent + "</p>"

        // Display order confirmation
        orderDetails.innerHTML = orderDetailsHTML
        orderConfirmation.style.display = "flex"

        // Reset form
        orderForm.reset()
        calculatePrices()
      }
    })

    // Close confirmation modal
    if (closeConfirmation) {
      closeConfirmation.addEventListener("click", () => {
        orderConfirmation.style.display = "none"
      })
    }

    // Initialize price calculation
    calculatePrices()
  }
})


// Modal functionality for rewards page - TAMBAHKAN INI
const claimRewardButtons = document.querySelectorAll('.claim-reward');
const downloadModal = document.getElementById('download-modal');

if (claimRewardButtons.length > 0 && downloadModal) {
  claimRewardButtons.forEach(button => {
    button.addEventListener('click', function() {
      downloadModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });

  // Close modal when X is clicked
  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      downloadModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === downloadModal) {
      downloadModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  });
}
