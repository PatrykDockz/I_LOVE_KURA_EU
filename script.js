// I LOVE KURA EU - Shop Functionality

let cartCount = 0;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Add click handlers to favorite icons
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', toggleFavorite);
    });
});

// Add item to cart
function addToCart(event) {
    const button = event.currentTarget;
    const card = button.closest('.product-card');
    const productName = card.querySelector('.mdl-card__title-text').textContent;
    
    // Increment cart count
    cartCount++;
    updateCartDisplay();
    
    // Visual feedback
    button.textContent = 'Added!';
    button.disabled = true;
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.innerHTML = '<i class="material-icons">shopping_cart</i> Add to Cart';
        button.disabled = false;
    }, 2000);
}

// Toggle favorite
function toggleFavorite(event) {
    const icon = event.currentTarget.querySelector('.material-icons');
    if (icon.textContent === 'favorite_border') {
        icon.textContent = 'favorite';
        icon.style.color = '#ff4081';
        showNotification('Added to favorites!');
    } else {
        icon.textContent = 'favorite_border';
        showNotification('Removed from favorites');
    }
}

// Update cart count in navigation
function updateCartDisplay() {
    const cartLinks = document.querySelectorAll('a[href="#cart"]');
    cartLinks.forEach(link => {
        link.innerHTML = `<i class="material-icons">shopping_cart</i> Cart (${cartCount})`;
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'shop-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
