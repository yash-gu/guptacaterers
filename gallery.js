document.addEventListener('DOMContentLoaded', function() {
    // Sample gallery data - replace with your actual images
    const galleryData = [
        { src: 'images/gallery/wedding1.jpg', alt: 'Wedding Catering', category: 'wedding' },
        { src: 'images/gallery/wedding2.jpg', alt: 'Wedding Buffet', category: 'wedding' },
        { src: 'images/gallery/corporate1.jpg', alt: 'Corporate Event', category: 'corporate' },
        { src: 'images/gallery/party1.jpg', alt: 'Private Party', category: 'party' },
        { src: 'images/gallery/wedding3.jpg', alt: 'Wedding Desserts', category: 'wedding' },
        { src: 'images/gallery/corporate2.jpg', alt: 'Conference Catering', category: 'corporate' },
    ];

    const gallery = document.querySelector('.gallery-grid');
    
    // Generate gallery items
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-category">${item.category}</div>
                <button class="gallery-view" data-index="${index}">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
        `;
        gallery.appendChild(galleryItem);
    });

    // Initialize lightbox functionality
    initLightbox();
});

function initLightbox() {
    // Lightbox implementation
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="" class="lightbox-img">
            <div class="lightbox-caption"></div>
            <button class="lightbox-nav prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-nav next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-img {
            max-height: 80vh;
            max-width: 90vw;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            padding: 15px;
            cursor: pointer;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-nav.prev { left: 20px; }
        .lightbox-nav.next { right: 20px; }
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}
