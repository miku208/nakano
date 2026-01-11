document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const scriptName = document.getElementById('script-name');
    const scriptVersion = document.getElementById('script-version');
    const scriptAuthor = document.getElementById('script-author');
    const scriptThumbnail = document.getElementById('script-thumbnail');
    const scriptDescription = document.getElementById('script-description');
    const downloadBtn = document.getElementById('download-btn');
    const descriptionBtn = document.getElementById('description-btn');
    const descriptionContent = document.getElementById('description-content');
    const closeDescriptionBtn = document.getElementById('close-description');
    const overlay = document.getElementById('overlay');
    
    // Data script dari JSON
    let scriptData = {};
    
    // Fetch data dari script.json
    fetch('data/script.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data script');
            }
            return response.json();
        })
        .then(data => {
            // Simpan data
            scriptData = data;
            
            // Update UI dengan data dari JSON
            updateScriptUI();
        })
        .catch(error => {
            console.error('Error:', error);
            // Fallback data jika fetch gagal
            scriptData = {
                name: "Script Bot Otomatisasi",
                description: "Script bot yang dirancang untuk bersenang senang dengan berbagai fitur.\n\nFitur \n• Integrasi API eksternal\n• jaga grup\n• panel menu\n\nCara Penggunaan:\n1. Download script\n2. Ekstrak file zip\n3. Jalankan npm start\n4. Konfigurasi sesuai kebutuhan\n5. Jalankan bot\n\nCatatan Penting:\n- Script ini gratis untuk penggunaan pribadi\n- Dilarang memperjualbelikan ulang\n- Update rutin tersedia di website resmi",
                version: "7.1.0",
                author: "MikuHost",
                download_url: "#",
                thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            };
            
            updateScriptUI();
        });
    
    // Fungsi untuk mengupdate UI dengan data script
    function updateScriptUI() {
        scriptName.textContent = scriptData.name;
        scriptVersion.textContent = scriptData.version;
        scriptAuthor.textContent = scriptData.author;
        scriptDescription.textContent = scriptData.description;
        scriptThumbnail.src = scriptData.thumbnail;
        scriptThumbnail.alt = `Thumbnail untuk ${scriptData.name}`;
        downloadBtn.href = scriptData.download_url;
        
        // Set placeholder icon jika tidak ada thumbnail
        scriptThumbnail.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
        };
    }
    
    // Event listener untuk tombol Deskripsi
    descriptionBtn.addEventListener('click', function() {
        descriptionContent.classList.remove('hidden');
        overlay.classList.remove('hidden');
        
        // Scroll ke deskripsi jika di mobile
        if (window.innerWidth < 768) {
            descriptionContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Event listener untuk tombol close deskripsi
    closeDescriptionBtn.addEventListener('click', function() {
        descriptionContent.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    
    // Event listener untuk overlay
    overlay.addEventListener('click', function() {
        descriptionContent.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    
    // Event listener untuk Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            descriptionContent.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    });
    
    // Fallback untuk icon.png jika tidak ada
    const siteIcon = document.getElementById('site-icon');
    siteIcon.onerror = function() {
        // Ganti dengan placeholder icon
        this.src = '/data/icon.png';
        this.style.backgroundColor = '#6c63ff';
        this.style.padding = '12px';
    };
});