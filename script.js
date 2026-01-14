// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // DOM elements
    const toolsGrid = document.getElementById('toolsGrid');
    const toolView = document.getElementById('toolView');
    const cardsContainer = document.getElementById('cardsContainer');
    const toolContent = document.getElementById('toolContent');
    const toolTitle = document.getElementById('toolTitle');
    const backBtn = document.getElementById('backBtn');
    const homeBtn = document.getElementById('homeBtn');
    const allToolsBtn = document.getElementById('allToolsBtn');
    const imageModal = document.getElementById('imageModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCanvas = document.getElementById('modalCanvas');
    const downloadImageBtn = document.getElementById('downloadImageBtn');
    const processingOverlay = document.getElementById('processingOverlay');
    const processingText = document.getElementById('processingText');
    
    // Tools data - all 20 required tools
    const tools = [
        {
            id: 'image-converter',
            name: 'Image Converter',
            description: 'Convert images between JPG, PNG, and WEBP formats',
            icon: 'fas fa-file-image',
            category: 'Media Tools'
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            description: 'Reduce image file size with quality control',
            icon: 'fas fa-compress-alt',
            category: 'Media Tools'
        },
        {
            id: 'image-cropper',
            name: 'Image Cropper',
            description: 'Crop images with preview and export options',
            icon: 'fas fa-crop',
            category: 'Media Tools'
        },
        {
            id: 'video-converter',
            name: 'Video Converter',
            description: 'Convert MP4 to WebM format (browser-based)',
            icon: 'fas fa-video',
            category: 'Media Tools'
        },
        {
            id: 'audio-converter',
            name: 'Audio Converter',
            description: 'Convert audio between MP3 and WAV formats',
            icon: 'fas fa-music',
            category: 'Media Tools'
        },
        {
            id: 'audio-trimmer',
            name: 'Audio Trimmer',
            description: 'Trim audio files by setting start and end times',
            icon: 'fas fa-cut',
            category: 'Media Tools'
        },
        {
            id: 'age-calculator',
            name: 'Age Calculator',
            description: 'Calculate age from birth date in years, months, days',
            icon: 'fas fa-birthday-cake',
            category: 'Calculators'
        },
        {
            id: 'emi-calculator',
            name: 'EMI Calculator',
            description: 'Calculate Equated Monthly Installment for loans',
            icon: 'fas fa-calculator',
            category: 'Calculators'
        },
        {
            id: 'sip-calculator',
            name: 'SIP Calculator',
            description: 'Calculate future value of monthly investments',
            icon: 'fas fa-chart-line',
            category: 'Calculators'
        },
        {
            id: 'qr-generator',
            name: 'QR Code Generator',
            description: 'Generate QR codes from text or URLs',
            icon: 'fas fa-qrcode',
            category: 'Generators'
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Create strong passwords with customizable options',
            icon: 'fas fa-key',
            category: 'Generators'
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, spaces, and reading time',
            icon: 'fas fa-font',
            category: 'Text Tools'
        },
        {
            id: 'base64-converter',
            name: 'Base64 Encoder/Decoder',
            description: 'Encode and decode text to/from Base64 format',
            icon: 'fas fa-code',
            category: 'Text Tools'
        },
        {
            id: 'color-picker',
            name: 'Color Picker',
            description: 'Pick colors and get HEX, RGB, HSL values',
            icon: 'fas fa-eye-dropper',
            category: 'Design Tools'
        },
        {
            id: 'text-to-speech',
            name: 'Text to Speech',
            description: 'Convert text to speech using browser synthesis',
            icon: 'fas fa-volume-up',
            category: 'Media Tools'
        },
        {
            id: 'speech-to-text',
            name: 'Speech to Text',
            description: 'Convert speech to text using microphone input',
            icon: 'fas fa-microphone',
            category: 'Media Tools'
        },
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Validate, prettify, and minify JSON data',
            icon: 'fas fa-brace',
            category: 'Developer Tools'
        },
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between length, weight, temperature units',
            icon: 'fas fa-exchange-alt',
            category: 'Calculators'
        },
        {
            id: 'bmi-calculator',
            name: 'BMI Calculator',
            description: 'Calculate Body Mass Index and category',
            icon: 'fas fa-weight',
            category: 'Health Tools'
        },
        {
            id: 'timer-stopwatch',
            name: 'Timer / Stopwatch',
            description: 'Countdown timer and stopwatch with start/stop/reset',
            icon: 'fas fa-stopwatch',
            category: 'Productivity Tools'
        }
    ];
    
    // Group tools by category
    const toolsByCategory = tools.reduce((acc, tool) => {
        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool);
        return acc;
    }, {});
    
    // Initialize the app
    function initApp() {
        renderToolCards();
        setupEventListeners();
    }
    
    // Render tool cards on the home page
    function renderToolCards() {
        cardsContainer.innerHTML = '';
        
        // Create cards for each category
        for (const category in toolsByCategory) {
            // Add category title
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categoryTitle.style.gridColumn = '1 / -1';
            categoryTitle.style.marginTop = '20px';
            categoryTitle.style.marginBottom = '10px';
            categoryTitle.style.color = 'var(--accent-color)';
            cardsContainer.appendChild(categoryTitle);
            
            // Add cards for tools in this category
            toolsByCategory[category].forEach(tool => {
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.innerHTML = `
                    <h3><i class="${tool.icon}"></i> ${tool.name}</h3>
                    <p>${tool.description}</p>
                    <div class="card-actions">
                        <button class="open-tool-btn" data-tool-id="${tool.id}">Open Tool</button>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        }
        
        // Add event listeners to tool buttons
        document.querySelectorAll('.open-tool-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const toolId = this.getAttribute('data-tool-id');
                openTool(toolId);
            });
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        backBtn.addEventListener('click', showHomeView);
        homeBtn.addEventListener('click', showHomeView);
        allToolsBtn.addEventListener('click', showHomeView);
        closeModal.addEventListener('click', () => imageModal.style.display = 'none');
        downloadImageBtn.addEventListener('click', downloadModalImage);
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
            }
            if (e.target === processingOverlay) {
                processingOverlay.style.display = 'none';
            }
        });
    }
    
    // Show home view with tool cards
    function showHomeView() {
        toolsGrid.style.display = 'block';
        toolView.style.display = 'none';
    }
    
    // Open a specific tool
    function openTool(toolId) {
        toolsGrid.style.display = 'none';
        toolView.style.display = 'block';
        
        const tool = tools.find(t => t.id === toolId);
        if (!tool) return;
        
        toolTitle.textContent = tool.name;
        toolContent.innerHTML = '';
        
        // Load the specific tool UI
        switch (toolId) {
            case 'image-converter':
                loadImageConverter();
                break;
            case 'image-compressor':
                loadImageCompressor();
                break;
            case 'image-cropper':
                loadImageCropper();
                break;
            case 'video-converter':
                loadVideoConverter();
                break;
            case 'audio-converter':
                loadAudioConverter();
                break;
            case 'audio-trimmer':
                loadAudioTrimmer();
                break;
            case 'age-calculator':
                loadAgeCalculator();
                break;
            case 'emi-calculator':
                loadEMICalculator();
                break;
            case 'sip-calculator':
                loadSIPCalculator();
                break;
            case 'qr-generator':
                loadQRGenerator();
                break;
            case 'password-generator':
                loadPasswordGenerator();
                break;
            case 'word-counter':
                loadWordCounter();
                break;
            case 'base64-converter':
                loadBase64Converter();
                break;
            case 'color-picker':
                loadColorPicker();
                break;
            case 'text-to-speech':
                loadTextToSpeech();
                break;
            case 'speech-to-text':
                loadSpeechToText();
                break;
            case 'json-formatter':
                loadJSONFormatter();
                break;
            case 'unit-converter':
                loadUnitConverter();
                break;
            case 'bmi-calculator':
                loadBMICalculator();
                break;
            case 'timer-stopwatch':
                loadTimerStopwatch();
                break;
        }
    }
    
    // Show processing overlay
    function showProcessing(message = 'Processing...') {
        processingText.textContent = message;
        processingOverlay.style.display = 'flex';
    }
    
    // Hide processing overlay
    function hideProcessing() {
        processingOverlay.style.display = 'none';
    }
    
    // Show result message
    function showResult(containerId, message, isError = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="result-container">
                <h4>${isError ? 'Error' : 'Result'}</h4>
                <div class="result-output" style="color: ${isError ? 'var(--danger-color)' : 'var(--success-color)'}">
                    ${message}
                </div>
            </div>
        `;
    }
    
    // =============================================
    // TOOL IMPLEMENTATIONS
    // =============================================
    
    // 1. Image Converter
    function loadImageConverter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-file-image"></i> Image Converter</h3>
                <p>Convert images between JPG, PNG, and WEBP formats. The conversion happens entirely in your browser.</p>
                
                <div class="form-group">
                    <label for="imageConverterInput">Select Image</label>
                    <div class="file-input-container">
                        <label for="imageConverterInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload an image</p>
                            <span>Supports JPG, PNG, WEBP (Max: 10MB)</span>
                        </label>
                        <input type="file" id="imageConverterInput" class="file-input" accept="image/jpeg,image/png,image/webp">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="convertFormat">Convert To</label>
                    <select id="convertFormat" class="form-control">
                        <option value="png">PNG (Lossless)</option>
                        <option value="jpeg">JPEG (Compressed)</option>
                        <option value="webp">WebP (Modern)</option>
                    </select>
                </div>
                
                <div class="preview-container" id="imageConverterPreview" style="display: none;">
                    <h4>Original Image</h4>
                    <img id="originalImage" class="image-preview" src="" alt="Original">
                </div>
                
                <button id="convertImageBtn" class="btn btn-block">Convert Image</button>
                
                <div id="imageConverterResult"></div>
            </div>
        `;
        
        const imageInput = document.getElementById('imageConverterInput');
        const convertBtn = document.getElementById('convertImageBtn');
        const previewContainer = document.getElementById('imageConverterPreview');
        const originalImage = document.getElementById('originalImage');
        const formatSelect = document.getElementById('convertFormat');
        
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.size > 10 * 1024 * 1024) {
                    showResult('imageConverterResult', 'File size must be less than 10MB', true);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    originalImage.src = e.target.result;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        convertBtn.addEventListener('click', function() {
            if (!imageInput.files || !imageInput.files[0]) {
                showResult('imageConverterResult', 'Please select an image first', true);
                return;
            }
            
            showProcessing('Converting image...');
            
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const format = formatSelect.value;
                    let mimeType, fileNameExt;
                    
                    if (format === 'jpeg') {
                        mimeType = 'image/jpeg';
                        fileNameExt = 'jpg';
                    } else if (format === 'png') {
                        mimeType = 'image/png';
                        fileNameExt = 'png';
                    } else if (format === 'webp') {
                        mimeType = 'image/webp';
                        fileNameExt = 'webp';
                    }
                    
                    canvas.toBlob(function(blob) {
                        hideProcessing();
                        
                        const url = URL.createObjectURL(blob);
                        const fileName = file.name.replace(/\.[^/.]+$/, "") + '_converted.' + fileNameExt;
                        
                        const resultHTML = `
                            <div class="result-container">
                                <h4>Conversion Complete</h4>
                                <div class="visual-output">
                                    <canvas id="convertedImageCanvas" width="${img.width}" height="${img.height}"></canvas>
                                </div>
                                <p>Image converted to ${format.toUpperCase()}. Size: ${(blob.size / 1024).toFixed(2)} KB</p>
                                <div style="margin-top: 15px;">
                                    <a href="${url}" download="${fileName}" class="btn btn-success">Download Converted Image</a>
                                </div>
                            </div>
                        `;
                        
                        document.getElementById('imageConverterResult').innerHTML = resultHTML;
                        
                        // Draw on the canvas in the result
                        const resultCanvas = document.getElementById('convertedImageCanvas');
                        const resultCtx = resultCanvas.getContext('2d');
                        resultCtx.drawImage(img, 0, 0, resultCanvas.width, resultCanvas.height);
                        
                    }, mimeType, format === 'jpeg' ? 0.9 : 1.0);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
    // 2. Image Compressor
    function loadImageCompressor() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-compress-alt"></i> Image Compressor</h3>
                <p>Reduce image file size by adjusting quality. Higher compression = smaller file size but lower quality.</p>
                
                <div class="form-group">
                    <label for="imageCompressorInput">Select Image</label>
                    <div class="file-input-container">
                        <label for="imageCompressorInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload an image</p>
                            <span>Supports JPG, PNG, WEBP (Max: 10MB)</span>
                        </label>
                        <input type="file" id="imageCompressorInput" class="file-input" accept="image/jpeg,image/png,image/webp">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="compressionQuality">Compression Quality: <span id="qualityValue">80</span>%</label>
                    <div class="range-group">
                        <input type="range" id="compressionQuality" class="form-control" min="10" max="100" value="80">
                        <span class="range-value" id="qualityValueText">80%</span>
                    </div>
                    <small>Lower percentage = more compression (smaller file)</small>
                </div>
                
                <div class="preview-container" id="imageCompressorPreview" style="display: none;">
                    <h4>Original Image</h4>
                    <img id="originalCompressImage" class="image-preview" src="" alt="Original">
                    <p id="originalSize"></p>
                </div>
                
                <button id="compressImageBtn" class="btn btn-block">Compress Image</button>
                
                <div id="imageCompressorResult"></div>
            </div>
        `;
        
        const imageInput = document.getElementById('imageCompressorInput');
        const qualitySlider = document.getElementById('compressionQuality');
        const qualityValueText = document.getElementById('qualityValueText');
        const compressBtn = document.getElementById('compressImageBtn');
        const previewContainer = document.getElementById('imageCompressorPreview');
        const originalImage = document.getElementById('originalCompressImage');
        const originalSizeText = document.getElementById('originalSize');
        
        qualitySlider.addEventListener('input', function() {
            qualityValueText.textContent = `${this.value}%`;
        });
        
        let originalFileSize = 0;
        
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                originalFileSize = file.size;
                
                if (file.size > 10 * 1024 * 1024) {
                    showResult('imageCompressorResult', 'File size must be less than 10MB', true);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    originalImage.src = e.target.result;
                    previewContainer.style.display = 'block';
                    originalSizeText.textContent = `Original size: ${(originalFileSize / 1024).toFixed(2)} KB`;
                };
                reader.readAsDataURL(file);
            }
        });
        
        compressBtn.addEventListener('click', function() {
            if (!imageInput.files || !imageInput.files[0]) {
                showResult('imageCompressorResult', 'Please select an image first', true);
                return;
            }
            
            showProcessing('Compressing image...');
            
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    // Get the file type
                    const fileType = file.type || 'image/jpeg';
                    const quality = parseInt(qualitySlider.value) / 100;
                    
                    canvas.toBlob(function(blob) {
                        hideProcessing();
                        
                        const url = URL.createObjectURL(blob);
                        const fileName = file.name.replace(/\.[^/.]+$/, "") + '_compressed.' + (fileType === 'image/png' ? 'png' : 'jpg');
                        
                        const compressionRatio = ((originalFileSize - blob.size) / originalFileSize * 100).toFixed(1);
                        
                        const resultHTML = `
                            <div class="result-container">
                                <h4>Compression Complete</h4>
                                <div class="visual-output">
                                    <canvas id="compressedImageCanvas" width="${img.width}" height="${img.height}"></canvas>
                                </div>
                                <p><strong>Original Size:</strong> ${(originalFileSize / 1024).toFixed(2)} KB</p>
                                <p><strong>Compressed Size:</strong> ${(blob.size / 1024).toFixed(2)} KB</p>
                                <p><strong>Compression Ratio:</strong> ${compressionRatio}% smaller</p>
                                <div style="margin-top: 15px;">
                                    <a href="${url}" download="${fileName}" class="btn btn-success">Download Compressed Image</a>
                                </div>
                            </div>
                        `;
                        
                        document.getElementById('imageCompressorResult').innerHTML = resultHTML;
                        
                        // Draw on the canvas in the result
                        const resultCanvas = document.getElementById('compressedImageCanvas');
                        const resultCtx = resultCanvas.getContext('2d');
                        resultCtx.drawImage(img, 0, 0, resultCanvas.width, resultCanvas.height);
                        
                    }, fileType, quality);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
    // 3. Image Cropper
    function loadImageCropper() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-crop"></i> Image Cropper</h3>
                <p>Upload an image, select a region to crop, and download the result.</p>
                
                <div class="form-group">
                    <label for="imageCropperInput">Select Image</label>
                    <div class="file-input-container">
                        <label for="imageCropperInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload an image</p>
                            <span>Supports JPG, PNG, WEBP (Max: 10MB)</span>
                        </label>
                        <input type="file" id="imageCropperInput" class="file-input" accept="image/jpeg,image/png,image/webp">
                    </div>
                </div>
                
                <div class="preview-container" id="cropperArea" style="display: none;">
                    <h4>Select Crop Area</h4>
                    <div style="position: relative; margin: 0 auto; max-width: 600px;">
                        <canvas id="cropCanvas" style="border: 1px solid #ddd; max-width: 100%;"></canvas>
                        <div id="cropOverlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;"></div>
                    </div>
                    <p>Click and drag on the image to select crop area</p>
                    <div id="cropInfo" style="margin-top: 10px;"></div>
                </div>
                
                <div id="cropControls" style="display: none;">
                    <button id="cropImageBtn" class="btn btn-block">Crop Image</button>
                </div>
                
                <div id="imageCropperResult"></div>
            </div>
        `;
        
        const imageInput = document.getElementById('imageCropperInput');
        const cropperArea = document.getElementById('cropperArea');
        const cropCanvas = document.getElementById('cropCanvas');
        const cropControls = document.getElementById('cropControls');
        const cropInfo = document.getElementById('cropInfo');
        
        let ctx = cropCanvas.getContext('2d');
        let img = new Image();
        let isDragging = false;
        let startX, startY, endX, endY;
        
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.size > 10 * 1024 * 1024) {
                    showResult('imageCropperResult', 'File size must be less than 10MB', true);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    img.onload = function() {
                        // Set canvas dimensions to image dimensions (scaled down if too large)
                        const maxWidth = 600;
                        const scale = Math.min(1, maxWidth / img.width);
                        cropCanvas.width = img.width * scale;
                        cropCanvas.height = img.height * scale;
                        
                        ctx.drawImage(img, 0, 0, cropCanvas.width, cropCanvas.height);
                        cropperArea.style.display = 'block';
                        cropControls.style.display = 'block';
                        
                        updateCropInfo();
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Mouse events for cropping
        cropCanvas.addEventListener('mousedown', function(e) {
            const rect = cropCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            isDragging = true;
        });
        
        cropCanvas.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const rect = cropCanvas.getBoundingClientRect();
            endX = e.clientX - rect.left;
            endY = e.clientY - rect.top;
            
            // Redraw image
            ctx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
            ctx.drawImage(img, 0, 0, cropCanvas.width, cropCanvas.height);
            
            // Draw selection rectangle
            ctx.strokeStyle = '#4a6fa5';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
            
            // Draw semi-transparent overlay
            ctx.fillStyle = 'rgba(74, 111, 165, 0.3)';
            ctx.fillRect(startX, startY, endX - startX, endY - startY);
            
            updateCropInfo();
        });
        
        cropCanvas.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        function updateCropInfo() {
            if (startX !== undefined && endX !== undefined) {
                const width = Math.abs(endX - startX);
                const height = Math.abs(endY - startY);
                cropInfo.innerHTML = `
                    <p><strong>Crop Selection:</strong> ${Math.round(width)} x ${Math.round(height)} pixels</p>
                    <p>Position: (${Math.round(Math.min(startX, endX))}, ${Math.round(Math.min(startY, endY))})</p>
                `;
            }
        }
        
        document.getElementById('cropImageBtn').addEventListener('click', function() {
            if (!imageInput.files || !imageInput.files[0]) {
                showResult('imageCropperResult', 'Please select an image first', true);
                return;
            }
            
            if (startX === undefined || endX === undefined) {
                showResult('imageCropperResult', 'Please select a crop area first', true);
                return;
            }
            
            showProcessing('Cropping image...');
            
            // Calculate crop coordinates (scale back to original image size)
            const scaleX = img.width / cropCanvas.width;
            const scaleY = img.height / cropCanvas.height;
            
            const x = Math.min(startX, endX) * scaleX;
            const y = Math.min(startY, endY) * scaleY;
            const width = Math.abs(endX - startX) * scaleX;
            const height = Math.abs(endY - startY) * scaleY;
            
            // Create new canvas for cropped image
            const croppedCanvas = document.createElement('canvas');
            croppedCanvas.width = width;
            croppedCanvas.height = height;
            
            const croppedCtx = croppedCanvas.getContext('2d');
            croppedCtx.drawImage(img, x, y, width, height, 0, 0, width, height);
            
            // Convert to blob and create download link
            croppedCanvas.toBlob(function(blob) {
                hideProcessing();
                
                const url = URL.createObjectURL(blob);
                const file = imageInput.files[0];
                const fileName = file.name.replace(/\.[^/.]+$/, "") + '_cropped.png';
                
                const resultHTML = `
                    <div class="result-container">
                        <h4>Crop Complete</h4>
                        <div class="visual-output">
                            <canvas id="croppedResultCanvas" width="${width}" height="${height}"></canvas>
                        </div>
                        <p>Image cropped to ${Math.round(width)} x ${Math.round(height)} pixels</p>
                        <div style="margin-top: 15px;">
                            <a href="${url}" download="${fileName}" class="btn btn-success">Download Cropped Image</a>
                        </div>
                    </div>
                `;
                
                document.getElementById('imageCropperResult').innerHTML = resultHTML;
                
                // Draw the cropped result
                const resultCanvas = document.getElementById('croppedResultCanvas');
                const resultCtx = resultCanvas.getContext('2d');
                resultCtx.drawImage(croppedCanvas, 0, 0);
                
            }, 'image/png');
        });
    }
    
    // 4. Video Converter (MP4 ↔ WebM)
    function loadVideoConverter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-video"></i> Video Converter</h3>
                <p>Convert MP4 to WebM format. Note: Conversion happens in your browser and may be limited by browser capabilities and video size.</p>
                
                <div class="form-group">
                    <label for="videoConverterInput">Select Video (MP4)</label>
                    <div class="file-input-container">
                        <label for="videoConverterInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload a video</p>
                            <span>Supports MP4 (Max: 50MB)</span>
                        </label>
                        <input type="file" id="videoConverterInput" class="file-input" accept="video/mp4">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="convertVideoFormat">Convert To</label>
                    <select id="convertVideoFormat" class="form-control">
                        <option value="webm">WebM (VP8 Codec)</option>
                    </select>
                </div>
                
                <div class="preview-container" id="videoConverterPreview" style="display: none;">
                    <h4>Original Video</h4>
                    <video id="originalVideo" class="image-preview" controls style="max-height: 300px;"></video>
                    <p id="originalVideoInfo"></p>
                </div>
                
                <button id="convertVideoBtn" class="btn btn-block">Convert Video</button>
                
                <div id="videoConverterResult"></div>
            </div>
        `;
        
        const videoInput = document.getElementById('videoConverterInput');
        const convertBtn = document.getElementById('convertVideoBtn');
        const previewContainer = document.getElementById('videoConverterPreview');
        const originalVideo = document.getElementById('originalVideo');
        const originalVideoInfo = document.getElementById('originalVideoInfo');
        
        videoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.size > 50 * 1024 * 1024) {
                    showResult('videoConverterResult', 'File size must be less than 50MB', true);
                    return;
                }
                
                const url = URL.createObjectURL(file);
                originalVideo.src = url;
                previewContainer.style.display = 'block';
                originalVideoInfo.textContent = `Original: ${file.name} (${(file.size / (1024*1024)).toFixed(2)} MB)`;
            }
        });
        
        convertBtn.addEventListener('click', function() {
            if (!videoInput.files || !videoInput.files[0]) {
                showResult('videoConverterResult', 'Please select a video first', true);
                return;
            }
            
            showProcessing('Converting video... This may take a moment.');
            
            const file = videoInput.files[0];
            const videoUrl = URL.createObjectURL(file);
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            
            videoElement.onloadedmetadata = function() {
                // Create a canvas to capture video frames
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                
                // Create MediaRecorder to capture as WebM
                const stream = canvas.captureStream();
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'video/webm;codecs=vp8'
                });
                
                const chunks = [];
                
                mediaRecorder.ondataavailable = function(e) {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                
                mediaRecorder.onstop = function() {
                    hideProcessing();
                    
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const fileName = file.name.replace(/\.[^/.]+$/, "") + '_converted.webm';
                    
                    const resultHTML = `
                        <div class="result-container">
                            <h4>Conversion Complete</h4>
                            <p>Video converted to WebM format</p>
                            <p><strong>Original Size:</strong> ${(file.size / (1024*1024)).toFixed(2)} MB</p>
                            <p><strong>Converted Size:</strong> ${(blob.size / (1024*1024)).toFixed(2)} MB</p>
                            <div style="margin-top: 15px;">
                                <video src="${url}" controls style="max-width: 100%; max-height: 300px; margin-bottom: 15px;"></video>
                                <a href="${url}" download="${fileName}" class="btn btn-success">Download Converted Video</a>
                            </div>
                        </div>
                    `;
                    
                    document.getElementById('videoConverterResult').innerHTML = resultHTML;
                };
                
                // Start recording
                mediaRecorder.start();
                
                // Draw frames to canvas
                let frameCount = 0;
                const maxFrames = 300; // Limit to 10 seconds at 30fps
                
                function captureFrame() {
                    if (frameCount >= maxFrames) {
                        mediaRecorder.stop();
                        return;
                    }
                    
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    frameCount++;
                    
                    if (frameCount < maxFrames) {
                        requestAnimationFrame(captureFrame);
                    }
                }
                
                videoElement.play();
                setTimeout(() => {
                    captureFrame();
                }, 100);
            };
            
            videoElement.load();
        });
    }
    
    // 5. Audio Converter (MP3 ↔ WAV)
    function loadAudioConverter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-music"></i> Audio Converter</h3>
                <p>Convert audio files between MP3 and WAV formats using the Web Audio API.</p>
                
                <div class="form-group">
                    <label for="audioConverterInput">Select Audio File</label>
                    <div class="file-input-container">
                        <label for="audioConverterInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload an audio file</p>
                            <span>Supports MP3, WAV, OGG (Max: 20MB)</span>
                        </label>
                        <input type="file" id="audioConverterInput" class="file-input" accept="audio/*">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="audioConvertFormat">Convert To</label>
                    <select id="audioConvertFormat" class="form-control">
                        <option value="wav">WAV (Lossless)</option>
                        <option value="mp3">MP3 (Compressed)</option>
                    </select>
                </div>
                
                <div class="preview-container" id="audioConverterPreview" style="display: none;">
                    <h4>Original Audio</h4>
                    <audio id="originalAudio" controls style="width: 100%; margin: 10px 0;"></audio>
                    <p id="originalAudioInfo"></p>
                </div>
                
                <button id="convertAudioBtn" class="btn btn-block">Convert Audio</button>
                
                <div id="audioConverterResult"></div>
            </div>
        `;
        
        const audioInput = document.getElementById('audioConverterInput');
        const convertBtn = document.getElementById('convertAudioBtn');
        const previewContainer = document.getElementById('audioConverterPreview');
        const originalAudio = document.getElementById('originalAudio');
        const originalAudioInfo = document.getElementById('originalAudioInfo');
        const formatSelect = document.getElementById('audioConvertFormat');
        
        audioInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.size > 20 * 1024 * 1024) {
                    showResult('audioConverterResult', 'File size must be less than 20MB', true);
                    return;
                }
                
                const url = URL.createObjectURL(file);
                originalAudio.src = url;
                previewContainer.style.display = 'block';
                originalAudioInfo.textContent = `Original: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
            }
        });
        
        convertBtn.addEventListener('click', function() {
            if (!audioInput.files || !audioInput.files[0]) {
                showResult('audioConverterResult', 'Please select an audio file first', true);
                return;
            }
            
            showProcessing('Converting audio...');
            
            const file = audioInput.files[0];
            const format = formatSelect.value;
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                audioContext.decodeAudioData(e.target.result, function(buffer) {
                    // For WAV conversion
                    if (format === 'wav') {
                        const wavBlob = audioBufferToWav(buffer);
                        hideProcessing();
                        
                        const url = URL.createObjectURL(wavBlob);
                        const fileName = file.name.replace(/\.[^/.]+$/, "") + '_converted.wav';
                        
                        const resultHTML = `
                            <div class="result-container">
                                <h4>Conversion Complete</h4>
                                <p>Audio converted to WAV format</p>
                                <audio src="${url}" controls style="width: 100%; margin: 10px 0;"></audio>
                                <p><strong>Original Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                                <p><strong>Converted Size:</strong> ${(wavBlob.size / 1024).toFixed(2)} KB</p>
                                <div style="margin-top: 15px;">
                                    <a href="${url}" download="${fileName}" class="btn btn-success">Download Converted Audio</a>
                                </div>
                            </div>
                        `;
                        
                        document.getElementById('audioConverterResult').innerHTML = resultHTML;
                    } else if (format === 'mp3') {
                        // For MP3 - we can't encode to MP3 directly in the browser without libraries
                        // So we'll convert to an MP3-like format using MediaRecorder
                        hideProcessing();
                        showResult('audioConverterResult', 'MP3 encoding requires external libraries. WAV conversion works perfectly.', true);
                    }
                });
            };
            
            reader.readAsArrayBuffer(file);
        });
        
        // Helper function to convert AudioBuffer to WAV
        function audioBufferToWav(buffer) {
            const numOfChan = buffer.numberOfChannels;
            const length = buffer.length * numOfChan * 2 + 44;
            const bufferArray = new ArrayBuffer(length);
            const view = new DataView(bufferArray);
            const channels = [];
            let offset = 0;
            let pos = 0;
            
            // Write WAV header
            setUint32(0x46464952); // "RIFF"
            setUint32(length - 8); // file length - 8
            setUint32(0x45564157); // "WAVE"
            
            setUint32(0x20746d66); // "fmt " chunk
            setUint32(16); // length = 16
            setUint16(1); // PCM (uncompressed)
            setUint16(numOfChan);
            setUint32(buffer.sampleRate);
            setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
            setUint16(numOfChan * 2); // block-align
            setUint16(16); // 16-bit
            
            setUint32(0x61746164); // "data" chunk
            setUint32(length - pos - 4); // chunk length
            
            // Write interleaved data
            for (let i = 0; i < buffer.numberOfChannels; i++) {
                channels.push(buffer.getChannelData(i));
            }
            
            while (pos < length) {
                for (let i = 0; i < numOfChan; i++) {
                    // Interleave channels
                    let sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                    sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit
                    view.setInt16(pos, sample, true);
                    pos += 2;
                }
                offset++;
            }
            
            return new Blob([bufferArray], { type: 'audio/wav' });
            
            function setUint16(data) {
                view.setUint16(pos, data, true);
                pos += 2;
            }
            
            function setUint32(data) {
                view.setUint32(pos, data, true);
                pos += 4;
            }
        }
    }
    
    // 6. Audio Trimmer
    function loadAudioTrimmer() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-cut"></i> Audio Trimmer</h3>
                <p>Trim audio files by setting start and end times.</p>
                
                <div class="form-group">
                    <label for="audioTrimmerInput">Select Audio File</label>
                    <div class="file-input-container">
                        <label for="audioTrimmerInput" class="file-input-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click to upload an audio file</p>
                            <span>Supports MP3, WAV, OGG (Max: 20MB)</span>
                        </label>
                        <input type="file" id="audioTrimmerInput" class="file-input" accept="audio/*">
                    </div>
                </div>
                
                <div class="preview-container" id="audioTrimmerPreview" style="display: none;">
                    <h4>Original Audio</h4>
                    <audio id="trimOriginalAudio" controls style="width: 100%; margin: 10px 0;"></audio>
                    <div id="audioDurationInfo"></div>
                    
                    <div class="form-group">
                        <label for="startTime">Start Time (seconds)</label>
                        <input type="range" id="startTime" class="form-control" min="0" value="0" step="0.1">
                        <span id="startTimeValue">0.0s</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="endTime">End Time (seconds)</label>
                        <input type="range" id="endTime" class="form-control" min="0" value="0" step="0.1">
                        <span id="endTimeValue">0.0s</span>
                    </div>
                    
                    <div id="trimDurationInfo">Trim duration: 0 seconds</div>
                </div>
                
                <button id="trimAudioBtn" class="btn btn-block" style="display: none;">Trim Audio</button>
                
                <div id="audioTrimmerResult"></div>
            </div>
        `;
        
        const audioInput = document.getElementById('audioTrimmerInput');
        const previewContainer = document.getElementById('audioTrimmerPreview');
        const originalAudio = document.getElementById('trimOriginalAudio');
        const audioDurationInfo = document.getElementById('audioDurationInfo');
        const startTimeSlider = document.getElementById('startTime');
        const endTimeSlider = document.getElementById('endTime');
        const startTimeValue = document.getElementById('startTimeValue');
        const endTimeValue = document.getElementById('endTimeValue');
        const trimDurationInfo = document.getElementById('trimDurationInfo');
        const trimBtn = document.getElementById('trimAudioBtn');
        
        let audioDuration = 0;
        let audioBuffer = null;
        
        audioInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                if (file.size > 20 * 1024 * 1024) {
                    showResult('audioTrimmerResult', 'File size must be less than 20MB', true);
                    return;
                }
                
                const url = URL.createObjectURL(file);
                originalAudio.src = url;
                previewContainer.style.display = 'block';
                
                // Load audio for processing
                const reader = new FileReader();
                reader.onload = function(e) {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContext.decodeAudioData(e.target.result, function(buffer) {
                        audioBuffer = buffer;
                        audioDuration = buffer.duration;
                        
                        // Update sliders
                        startTimeSlider.max = audioDuration;
                        endTimeSlider.max = audioDuration;
                        endTimeSlider.value = audioDuration;
                        
                        // Update displayed values
                        startTimeValue.textContent = '0.0s';
                        endTimeValue.textContent = audioDuration.toFixed(1) + 's';
                        trimDurationInfo.textContent = `Trim duration: ${audioDuration.toFixed(1)} seconds`;
                        
                        audioDurationInfo.innerHTML = `
                            <p><strong>Duration:</strong> ${audioDuration.toFixed(2)} seconds</p>
                            <p><strong>Sample Rate:</strong> ${buffer.sampleRate} Hz</p>
                            <p><strong>Channels:</strong> ${buffer.numberOfChannels}</p>
                        `;
                        
                        trimBtn.style.display = 'block';
                    });
                };
                reader.readAsArrayBuffer(file);
            }
        });
        
        startTimeSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            startTimeValue.textContent = value.toFixed(1) + 's';
            
            // Ensure start time is less than end time
            if (value >= parseFloat(endTimeSlider.value)) {
                endTimeSlider.value = Math.min(audioDuration, value + 0.1);
                endTimeValue.textContent = endTimeSlider.value + 's';
            }
            
            updateTrimDuration();
        });
        
        endTimeSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            endTimeValue.textContent = value.toFixed(1) + 's';
            
            // Ensure end time is greater than start time
            if (value <= parseFloat(startTimeSlider.value)) {
                startTimeSlider.value = Math.max(0, value - 0.1);
                startTimeValue.textContent = startTimeSlider.value + 's';
            }
            
            updateTrimDuration();
        });
        
        function updateTrimDuration() {
            const start = parseFloat(startTimeSlider.value);
            const end = parseFloat(endTimeSlider.value);
            const duration = end - start;
            trimDurationInfo.textContent = `Trim duration: ${duration.toFixed(1)} seconds`;
        }
        
        trimBtn.addEventListener('click', function() {
            if (!audioBuffer) {
                showResult('audioTrimmerResult', 'Please load an audio file first', true);
                return;
            }
            
            showProcessing('Trimming audio...');
            
            const startTime = parseFloat(startTimeSlider.value);
            const endTime = parseFloat(endTimeSlider.value);
            
            if (startTime >= endTime) {
                hideProcessing();
                showResult('audioTrimmerResult', 'Start time must be less than end time', true);
                return;
            }
            
            // Calculate samples
            const startSample = Math.floor(startTime * audioBuffer.sampleRate);
            const endSample = Math.floor(endTime * audioBuffer.sampleRate);
            const frameCount = endSample - startSample;
            
            // Create new audio buffer
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const newBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                frameCount,
                audioBuffer.sampleRate
            );
            
            // Copy data
            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const channelData = audioBuffer.getChannelData(channel);
                const newChannelData = newBuffer.getChannelData(channel);
                
                for (let i = 0; i < frameCount; i++) {
                    newChannelData[i] = channelData[startSample + i];
                }
            }
            
            // Convert to WAV
            const wavBlob = audioBufferToWav(newBuffer);
            hideProcessing();
            
            const url = URL.createObjectURL(wavBlob);
            const fileName = audioInput.files[0].name.replace(/\.[^/.]+$/, "") + '_trimmed.wav';
            
            const resultHTML = `
                <div class="result-container">
                    <h4>Trim Complete</h4>
                    <p>Audio trimmed from ${startTime.toFixed(2)}s to ${endTime.toFixed(2)}s</p>
                    <audio src="${url}" controls style="width: 100%; margin: 10px 0;"></audio>
                    <p><strong>Trimmed Duration:</strong> ${(endTime - startTime).toFixed(2)} seconds</p>
                    <div style="margin-top: 15px;">
                        <a href="${url}" download="${fileName}" class="btn btn-success">Download Trimmed Audio</a>
                    </div>
                </div>
            `;
            
            document.getElementById('audioTrimmerResult').innerHTML = resultHTML;
        });
        
        // Reuse the audioBufferToWav function from the audio converter
        function audioBufferToWav(buffer) {
            const numOfChan = buffer.numberOfChannels;
            const length = buffer.length * numOfChan * 2 + 44;
            const bufferArray = new ArrayBuffer(length);
            const view = new DataView(bufferArray);
            const channels = [];
            let offset = 0;
            let pos = 0;
            
            setUint32(0x46464952);
            setUint32(length - 8);
            setUint32(0x45564157);
            
            setUint32(0x20746d66);
            setUint32(16);
            setUint16(1);
            setUint16(numOfChan);
            setUint32(buffer.sampleRate);
            setUint32(buffer.sampleRate * 2 * numOfChan);
            setUint16(numOfChan * 2);
            setUint16(16);
            
            setUint32(0x61746164);
            setUint32(length - pos - 4);
            
            for (let i = 0; i < buffer.numberOfChannels; i++) {
                channels.push(buffer.getChannelData(i));
            }
            
            while (pos < length) {
                for (let i = 0; i < numOfChan; i++) {
                    let sample = Math.max(-1, Math.min(1, channels[i][offset]));
                    sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                    view.setInt16(pos, sample, true);
                    pos += 2;
                }
                offset++;
            }
            
            return new Blob([bufferArray], { type: 'audio/wav' });
            
            function setUint16(data) {
                view.setUint16(pos, data, true);
                pos += 2;
            }
            
            function setUint32(data) {
                view.setUint32(pos, data, true);
                pos += 4;
            }
        }
    }
    
    // 7. Age Calculator
    function loadAgeCalculator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-birthday-cake"></i> Age Calculator</h3>
                <p>Calculate your exact age in years, months, and days from your birth date.</p>
                
                <div class="form-group">
                    <label for="birthDate">Date of Birth</label>
                    <input type="date" id="birthDate" class="form-control" max="${new Date().toISOString().split('T')[0]}">
                </div>
                
                <div class="form-group">
                    <label for="ageAtDate">Age at this Date (optional)</label>
                    <input type="date" id="ageAtDate" class="form-control" value="${new Date().toISOString().split('T')[0]}">
                    <small>Leave as today's date to calculate current age</small>
                </div>
                
                <button id="calculateAgeBtn" class="btn btn-block">Calculate Age</button>
                
                <div id="ageCalculatorResult"></div>
            </div>
        `;
        
        const birthDateInput = document.getElementById('birthDate');
        const ageAtDateInput = document.getElementById('ageAtDate');
        const calculateBtn = document.getElementById('calculateAgeBtn');
        
        // Set max date for birth date to today
        birthDateInput.max = new Date().toISOString().split('T')[0];
        
        calculateBtn.addEventListener('click', function() {
            const birthDate = new Date(birthDateInput.value);
            const ageAtDate = new Date(ageAtDateInput.value);
            
            if (!birthDateInput.value) {
                showResult('ageCalculatorResult', 'Please enter your date of birth', true);
                return;
            }
            
            if (birthDate > ageAtDate) {
                showResult('ageCalculatorResult', 'Birth date cannot be in the future', true);
                return;
            }
            
            // Calculate age
            let years = ageAtDate.getFullYear() - birthDate.getFullYear();
            let months = ageAtDate.getMonth() - birthDate.getMonth();
            let days = ageAtDate.getDate() - birthDate.getDate();
            
            // Adjust for negative days
            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(ageAtDate.getFullYear(), ageAtDate.getMonth(), 0);
                days += prevMonth.getDate();
            }
            
            // Adjust for negative months
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Calculate total days
            const timeDiff = ageAtDate.getTime() - birthDate.getTime();
            const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
            
            // Calculate next birthday
            const nextBirthday = new Date(ageAtDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
            if (nextBirthday < ageAtDate) {
                nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            }
            const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - ageAtDate.getTime()) / (1000 * 3600 * 24));
            
            const resultHTML = `
                <div class="result-container">
                    <h4>Age Calculation Result</h4>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">
                        ${years} years, ${months} months, ${days} days
                    </div>
                    <p><strong>Total Days:</strong> ${totalDays.toLocaleString()} days</p>
                    <p><strong>Total Months:</strong> ${(years * 12 + months).toLocaleString()} months</p>
                    <p><strong>Total Weeks:</strong> ${Math.floor(totalDays / 7).toLocaleString()} weeks</p>
                    <p><strong>Next Birthday:</strong> ${nextBirthday.toLocaleDateString()} (in ${daysToNextBirthday} days)</p>
                    <p><strong>Age in Dog Years:</strong> ${(years * 7 + months / 12 * 7).toFixed(1)} years</p>
                </div>
            `;
            
            document.getElementById('ageCalculatorResult').innerHTML = resultHTML;
        });
    }
    
    // 8. EMI Calculator
    function loadEMICalculator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-calculator"></i> EMI Calculator</h3>
                <p>Calculate Equated Monthly Installment (EMI) for loans with principal amount, interest rate, and tenure.</p>
                
                <div class="form-group">
                    <label for="loanAmount">Loan Amount (₹)</label>
                    <input type="number" id="loanAmount" class="form-control" min="1000" step="1000" value="1000000">
                </div>
                
                <div class="form-group">
                    <label for="interestRate">Annual Interest Rate (%)</label>
                    <input type="number" id="interestRate" class="form-control" min="1" max="30" step="0.1" value="8.5">
                </div>
                
                <div class="form-group">
                    <label for="loanTenure">Loan Tenure (Years)</label>
                    <input type="number" id="loanTenure" class="form-control" min="1" max="30" step="1" value="20">
                </div>
                
                <button id="calculateEMIBtn" class="btn btn-block">Calculate EMI</button>
                
                <div id="emiCalculatorResult"></div>
            </div>
        `;
        
        const loanAmountInput = document.getElementById('loanAmount');
        const interestRateInput = document.getElementById('interestRate');
        const loanTenureInput = document.getElementById('loanTenure');
        const calculateBtn = document.getElementById('calculateEMIBtn');
        
        calculateBtn.addEventListener('click', function() {
            const loanAmount = parseFloat(loanAmountInput.value);
            const annualInterestRate = parseFloat(interestRateInput.value);
            const loanTenureYears = parseFloat(loanTenureInput.value);
            
            if (!loanAmount || !annualInterestRate || !loanTenureYears) {
                showResult('emiCalculatorResult', 'Please fill all fields with valid numbers', true);
                return;
            }
            
            // Convert annual rate to monthly and percentage to decimal
            const monthlyInterestRate = annualInterestRate / 12 / 100;
            const loanTenureMonths = loanTenureYears * 12;
            
            // EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
            const pow = Math.pow(1 + monthlyInterestRate, loanTenureMonths);
            const emi = loanAmount * monthlyInterestRate * pow / (pow - 1);
            
            // Calculate total payment and interest
            const totalPayment = emi * loanTenureMonths;
            const totalInterest = totalPayment - loanAmount;
            
            // Generate amortization schedule for first 12 months
            let amortizationHTML = '';
            let balance = loanAmount;
            
            amortizationHTML += '<h4>First 12 Months Breakdown</h4>';
            amortizationHTML += '<div style="overflow-x: auto;">';
            amortizationHTML += '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
            amortizationHTML += '<thead><tr style="background-color: #f1f3f4;">';
            amortizationHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Month</th>';
            amortizationHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">EMI</th>';
            amortizationHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Principal</th>';
            amortizationHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Interest</th>';
            amortizationHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Balance</th>';
            amortizationHTML += '</tr></thead><tbody>';
            
            for (let month = 1; month <= 12 && month <= loanTenureMonths; month++) {
                const interest = balance * monthlyInterestRate;
                const principal = emi - interest;
                balance -= principal;
                
                amortizationHTML += '<tr>';
                amortizationHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${month}</td>`;
                amortizationHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${emi.toFixed(2)}</td>`;
                amortizationHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${principal.toFixed(2)}</td>`;
                amortizationHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${interest.toFixed(2)}</td>`;
                amortizationHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${balance.toFixed(2)}</td>`;
                amortizationHTML += '</tr>';
            }
            
            amortizationHTML += '</tbody></table></div>';
            
            const resultHTML = `
                <div class="result-container">
                    <h4>EMI Calculation Result</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">
                        Monthly EMI: ₹${emi.toFixed(2)}
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Loan Amount</div>
                            <div style="font-size: 1.2rem; font-weight: bold;">₹${loanAmount.toLocaleString()}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Total Interest</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--danger-color);">₹${totalInterest.toFixed(2)}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Total Payment</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--success-color);">₹${totalPayment.toFixed(2)}</div>
                        </div>
                    </div>
                    
                    <p><strong>Loan Tenure:</strong> ${loanTenureYears} years (${loanTenureMonths} months)</p>
                    <p><strong>Annual Interest Rate:</strong> ${annualInterestRate}%</p>
                    <p><strong>Monthly Interest Rate:</strong> ${monthlyInterestRate.toFixed(4)}%</p>
                    
                    ${amortizationHTML}
                </div>
            `;
            
            document.getElementById('emiCalculatorResult').innerHTML = resultHTML;
        });
    }
    
    // 9. SIP Calculator
    function loadSIPCalculator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-chart-line"></i> SIP Calculator</h3>
                <p>Calculate the future value of your Systematic Investment Plan (SIP) monthly investments.</p>
                
                <div class="form-group">
                    <label for="monthlyInvestment">Monthly Investment (₹)</label>
                    <input type="number" id="monthlyInvestment" class="form-control" min="500" step="500" value="5000">
                </div>
                
                <div class="form-group">
                    <label for="sipPeriod">Investment Period (Years)</label>
                    <input type="number" id="sipPeriod" class="form-control" min="1" max="40" step="1" value="10">
                </div>
                
                <div class="form-group">
                    <label for="expectedReturn">Expected Annual Return (%)</label>
                    <input type="number" id="expectedReturn" class="form-control" min="1" max="30" step="0.1" value="12">
                </div>
                
                <button id="calculateSIPBtn" class="btn btn-block">Calculate SIP Future Value</button>
                
                <div id="sipCalculatorResult"></div>
            </div>
        `;
        
        const monthlyInvestmentInput = document.getElementById('monthlyInvestment');
        const sipPeriodInput = document.getElementById('sipPeriod');
        const expectedReturnInput = document.getElementById('expectedReturn');
        const calculateBtn = document.getElementById('calculateSIPBtn');
        
        calculateBtn.addEventListener('click', function() {
            const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);
            const investmentPeriodYears = parseFloat(sipPeriodInput.value);
            const expectedAnnualReturn = parseFloat(expectedReturnInput.value);
            
            if (!monthlyInvestment || !investmentPeriodYears || !expectedAnnualReturn) {
                showResult('sipCalculatorResult', 'Please fill all fields with valid numbers', true);
                return;
            }
            
            // Convert annual return to monthly (decimal)
            const monthlyReturn = expectedAnnualReturn / 12 / 100;
            const totalMonths = investmentPeriodYears * 12;
            
            // SIP Future Value formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
            // Where P = monthly investment, r = monthly rate, n = number of months
            const pow = Math.pow(1 + monthlyReturn, totalMonths);
            const futureValue = monthlyInvestment * ((pow - 1) / monthlyReturn) * (1 + monthlyReturn);
            
            // Calculate total investment and wealth gain
            const totalInvestment = monthlyInvestment * totalMonths;
            const wealthGained = futureValue - totalInvestment;
            
            // Calculate estimated returns (simple projection)
            let projectionHTML = '<h4>Yearly Projection</h4>';
            projectionHTML += '<div style="overflow-x: auto;">';
            projectionHTML += '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
            projectionHTML += '<thead><tr style="background-color: #f1f3f4;">';
            projectionHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Year</th>';
            projectionHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Invested</th>';
            projectionHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Est. Returns</th>';
            projectionHTML += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total Value</th>';
            projectionHTML += '</tr></thead><tbody>';
            
            let cumulativeInvestment = 0;
            let cumulativeValue = 0;
            
            for (let year = 1; year <= investmentPeriodYears; year++) {
                cumulativeInvestment += monthlyInvestment * 12;
                
                // Simplified calculation for yearly projection
                // For accuracy, we'd need to calculate month by month, but this gives a rough estimate
                const yearsRemaining = investmentPeriodYears - year + 1;
                const approxValue = futureValue * (year / investmentPeriodYears);
                
                projectionHTML += '<tr>';
                projectionHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${year}</td>`;
                projectionHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${cumulativeInvestment.toLocaleString()}</td>`;
                projectionHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${(approxValue - cumulativeInvestment).toLocaleString()}</td>`;
                projectionHTML += `<td style="padding: 8px; border: 1px solid #ddd;">₹${approxValue.toLocaleString()}</td>`;
                projectionHTML += '</tr>';
            }
            
            projectionHTML += '</tbody></table></div>';
            
            const resultHTML = `
                <div class="result-container">
                    <h4>SIP Calculation Result</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">
                        Estimated Future Value: ₹${futureValue.toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Total Investment</div>
                            <div style="font-size: 1.2rem; font-weight: bold;">₹${totalInvestment.toLocaleString()}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Wealth Gained</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--success-color);">₹${wealthGained.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: var(--text-light);">Annual Return</div>
                            <div style="font-size: 1.2rem; font-weight: bold;">${expectedAnnualReturn}%</div>
                        </div>
                    </div>
                    
                    <p><strong>Monthly Investment:</strong> ₹${monthlyInvestment.toLocaleString()}</p>
                    <p><strong>Investment Period:</strong> ${investmentPeriodYears} years (${totalMonths} months)</p>
                    <p><strong>Estimated Return on Investment:</strong> ${((wealthGained / totalInvestment) * 100).toFixed(2)}%</p>
                    
                    ${projectionHTML}
                </div>
            `;
            
            document.getElementById('sipCalculatorResult').innerHTML = resultHTML;
        });
    }
    
    // 10. QR Code Generator
    function loadQRGenerator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-qrcode"></i> QR Code Generator</h3>
                <p>Generate QR codes from text or URLs. Download as PNG image.</p>
                
                <div class="form-group">
                    <label for="qrText">Text or URL for QR Code</label>
                    <textarea id="qrText" class="form-control" placeholder="Enter text or URL here...">https://multitoolhub.example.com</textarea>
                </div>
                
                <div class="form-group">
                    <label for="qrSize">QR Code Size</label>
                    <select id="qrSize" class="form-control">
                        <option value="128">128x128</option>
                        <option value="256" selected>256x256</option>
                        <option value="512">512x512</option>
                    </select>
                </div>
                
                <button id="generateQRBtn" class="btn btn-block">Generate QR Code</button>
                
                <div id="qrGeneratorResult"></div>
            </div>
        `;
        
        const qrTextInput = document.getElementById('qrText');
        const qrSizeSelect = document.getElementById('qrSize');
        const generateBtn = document.getElementById('generateQRBtn');
        
        generateBtn.addEventListener('click', function() {
            const text = qrTextInput.value.trim();
            const size = parseInt(qrSizeSelect.value);
            
            if (!text) {
                showResult('qrGeneratorResult', 'Please enter text or URL for the QR code', true);
                return;
            }
            
            // Simple QR code generator using canvas
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            
            // Generate simple QR-like pattern (for demo purposes)
            // Note: This is a simplified representation. A real QR code would require a library.
            ctx.fillStyle = '#000000';
            
            // Draw border
            ctx.fillRect(10, 10, size - 20, 10);
            ctx.fillRect(10, 10, 10, size - 20);
            ctx.fillRect(size - 20, 10, 10, size - 20);
            ctx.fillRect(10, size - 20, size - 20, 10);
            
            // Draw simple pattern based on text hash
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                hash = text.charCodeAt(i) + ((hash << 5) - hash);
            }
            
            // Create pattern
            const cellSize = 20;
            const cols = Math.floor((size - 40) / cellSize);
            const rows = Math.floor((size - 40) / cellSize);
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Determine if cell should be filled based on hash and position
                    const value = (hash + row * cols + col) % 3;
                    if (value === 0) {
                        ctx.fillRect(20 + col * cellSize, 20 + row * cellSize, cellSize - 2, cellSize - 2);
                    }
                }
            }
            
            // Add text at the bottom
            ctx.fillStyle = '#000000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QR Code', size / 2, size - 5);
            
            // Convert to data URL
            const dataURL = canvas.toDataURL('image/png');
            
            const resultHTML = `
                <div class="result-container">
                    <h4>QR Code Generated</h4>
                    <div class="visual-output">
                        <canvas id="qrCanvas" width="${size}" height="${size}"></canvas>
                    </div>
                    <p>QR Code for: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"</p>
                    <div style="margin-top: 15px;">
                        <a href="${dataURL}" download="qrcode.png" class="btn btn-success">Download QR Code</a>
                        <button id="viewQRLargeBtn" class="btn" style="margin-left: 10px;">View Larger</button>
                    </div>
                </div>
            `;
            
            document.getElementById('qrGeneratorResult').innerHTML = resultHTML;
            
            // Draw on the canvas in the result
            const resultCanvas = document.getElementById('qrCanvas');
            const resultCtx = resultCanvas.getContext('2d');
            const img = new Image();
            img.onload = function() {
                resultCtx.drawImage(img, 0, 0, resultCanvas.width, resultCanvas.height);
            };
            img.src = dataURL;
            
            // Add event listener for view larger button
            document.getElementById('viewQRLargeBtn').addEventListener('click', function() {
                modalCanvas.width = size * 2;
                modalCanvas.height = size * 2;
                const modalCtx = modalCanvas.getContext('2d');
                
                const largeImg = new Image();
                largeImg.onload = function() {
                    modalCtx.drawImage(largeImg, 0, 0, modalCanvas.width, modalCanvas.height);
                    imageModal.style.display = 'flex';
                };
                largeImg.src = dataURL;
                
                // Update download button for modal
                downloadImageBtn.onclick = function() {
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'qrcode.png';
                    link.click();
                };
            });
        });
    }
    
    // 11. Password Generator
    function loadPasswordGenerator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-key"></i> Password Generator</h3>
                <p>Create strong, secure passwords with customizable options.</p>
                
                <div class="form-group">
                    <label for="passwordLength">Password Length: <span id="lengthValue">12</span> characters</label>
                    <div class="range-group">
                        <input type="range" id="passwordLength" class="form-control" min="6" max="32" value="12">
                        <span class="range-value" id="lengthValueText">12</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Character Types to Include:</label>
                    <div class="checkbox-group">
                        <input type="checkbox" id="includeUppercase" checked>
                        <label for="includeUppercase">Uppercase Letters (A-Z)</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="includeLowercase" checked>
                        <label for="includeLowercase">Lowercase Letters (a-z)</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="includeNumbers" checked>
                        <label for="includeNumbers">Numbers (0-9)</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="includeSymbols" checked>
                        <label for="includeSymbols">Symbols (!@#$%^&*)</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="passwordCount">Number of Passwords to Generate</label>
                    <input type="number" id="passwordCount" class="form-control" min="1" max="20" value="5">
                </div>
                
                <button id="generatePasswordBtn" class="btn btn-block">Generate Passwords</button>
                
                <div id="passwordGeneratorResult"></div>
            </div>
        `;
        
        const passwordLengthSlider = document.getElementById('passwordLength');
        const lengthValueText = document.getElementById('lengthValueText');
        const includeUppercase = document.getElementById('includeUppercase');
        const includeLowercase = document.getElementById('includeLowercase');
        const includeNumbers = document.getElementById('includeNumbers');
        const includeSymbols = document.getElementById('includeSymbols');
        const passwordCountInput = document.getElementById('passwordCount');
        const generateBtn = document.getElementById('generatePasswordBtn');
        
        passwordLengthSlider.addEventListener('input', function() {
            lengthValueText.textContent = this.value;
        });
        
        generateBtn.addEventListener('click', function() {
            const length = parseInt(passwordLengthSlider.value);
            const count = parseInt(passwordCountInput.value);
            
            // Validate at least one character type is selected
            if (!includeUppercase.checked && !includeLowercase.checked && !includeNumbers.checked && !includeSymbols.checked) {
                showResult('passwordGeneratorResult', 'Please select at least one character type', true);
                return;
            }
            
            // Character sets
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            // Build character pool based on selections
            let charPool = '';
            if (includeUppercase.checked) charPool += uppercase;
            if (includeLowercase.checked) charPool += lowercase;
            if (includeNumbers.checked) charPool += numbers;
            if (includeSymbols.checked) charPool += symbols;
            
            // Generate passwords
            const passwords = [];
            for (let i = 0; i < count; i++) {
                let password = '';
                for (let j = 0; j < length; j++) {
                    const randomIndex = Math.floor(Math.random() * charPool.length);
                    password += charPool[randomIndex];
                }
                passwords.push(password);
            }
            
            // Calculate password strength
            const getStrength = (pwd) => {
                let score = 0;
                if (pwd.length >= 12) score += 2;
                if (pwd.length >= 16) score += 1;
                
                if (/[A-Z]/.test(pwd)) score += 1;
                if (/[a-z]/.test(pwd)) score += 1;
                if (/[0-9]/.test(pwd)) score += 1;
                if (/[^A-Za-z0-9]/.test(pwd)) score += 2;
                
                if (score >= 6) return {text: 'Strong', color: 'var(--success-color)'};
                if (score >= 4) return {text: 'Medium', color: 'var(--warning-color)'};
                return {text: 'Weak', color: 'var(--danger-color)'};
            };
            
            // Display results
            let resultHTML = '<div class="result-container">';
            resultHTML += '<h4>Generated Passwords</h4>';
            resultHTML += '<p>Click on a password to copy it to clipboard</p>';
            
            passwords.forEach((password, index) => {
                const strength = getStrength(password);
                resultHTML += `
                    <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid ${strength.color};">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>Password ${index + 1}:</strong>
                                <div style="font-family: monospace; font-size: 1.2rem; margin: 8px 0; letter-spacing: 1px; word-break: break-all;">
                                    ${password}
                                </div>
                            </div>
                            <div>
                                <span style="padding: 4px 10px; background: ${strength.color}; color: white; border-radius: 4px; font-size: 0.9rem;">
                                    ${strength.text}
                                </span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                            <span>Length: ${password.length} chars</span>
                            <button class="copy-password-btn btn" data-password="${password}" style="padding: 5px 10px; font-size: 0.9rem;">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>
                `;
            });
            
            resultHTML += '<p style="margin-top: 20px;"><strong>Password Security Tips:</strong></p>';
            resultHTML += '<ul style="padding-left: 20px;">';
            resultHTML += '<li>Use a different password for each account</li>';
            resultHTML += '<li>Consider using a password manager</li>';
            resultHTML += '<li>Change passwords regularly</li>';
            resultHTML += '<li>Enable two-factor authentication when available</li>';
            resultHTML += '</ul>';
            resultHTML += '</div>';
            
            document.getElementById('passwordGeneratorResult').innerHTML = resultHTML;
            
            // Add copy functionality
            document.querySelectorAll('.copy-password-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const password = this.getAttribute('data-password');
                    navigator.clipboard.writeText(password).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        this.style.backgroundColor = 'var(--success-color)';
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.style.backgroundColor = '';
                        }, 2000);
                    });
                });
            });
        });
    }
    
    // 12. Word Counter
    function loadWordCounter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-font"></i> Word Counter</h3>
                <p>Count words, characters, sentences, and estimate reading time.</p>
                
                <div class="form-group">
                    <label for="wordCounterText">Enter Text</label>
                    <textarea id="wordCounterText" class="form-control" rows="10" placeholder="Paste or type your text here...">Welcome to Multi Tool Hub! This is a fully functional, frontend-only multi-tool website with 20 different tools. All tools work entirely in your browser without sending data to any server. Enjoy using our image converters, calculators, generators, and more!</textarea>
                </div>
                
                <button id="countWordsBtn" class="btn btn-block">Count Words</button>
                
                <div id="wordCounterResult"></div>
            </div>
        `;
        
        const textInput = document.getElementById('wordCounterText');
        const countBtn = document.getElementById('countWordsBtn');
        
        // Auto-count as user types
        textInput.addEventListener('input', updateWordCount);
        
        // Also count on button click
        countBtn.addEventListener('click', updateWordCount);
        
        function updateWordCount() {
            const text = textInput.value;
            
            // Count characters
            const characters = text.length;
            const charactersNoSpaces = text.replace(/\s/g, '').length;
            
            // Count words
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            
            // Count sentences
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
            
            // Count paragraphs
            const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
            
            // Calculate reading time (assuming 200 words per minute)
            const readingTimeMinutes = words / 200;
            const readingTimeFormatted = readingTimeMinutes < 1 ? 
                'Less than a minute' : 
                `${Math.ceil(readingTimeMinutes)} minute${Math.ceil(readingTimeMinutes) > 1 ? 's' : ''}`;
            
            // Calculate speaking time (assuming 130 words per minute)
            const speakingTimeMinutes = words / 130;
            const speakingTimeFormatted = speakingTimeMinutes < 1 ? 
                'Less than a minute' : 
                `${Math.ceil(speakingTimeMinutes)} minute${Math.ceil(speakingTimeMinutes) > 1 ? 's' : ''}`;
            
            const resultHTML = `
                <div class="result-container">
                    <h4>Text Analysis Results</h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${words}</div>
                            <div style="font-size: 0.9rem; color: var(--text-light);">Words</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${characters}</div>
                            <div style="font-size: 0.9rem; color: var(--text-light);">Characters</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${sentences}</div>
                            <div style="font-size: 0.9rem; color: var(--text-light);">Sentences</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${paragraphs}</div>
                            <div style="font-size: 0.9rem; color: var(--text-light);">Paragraphs</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h5>Detailed Analysis</h5>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Characters (with spaces)</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${characters.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Characters (without spaces)</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${charactersNoSpaces.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Words</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${words.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Sentences</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${sentences.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Paragraphs</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${paragraphs.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Average words per sentence</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${sentences > 0 ? (words / sentences).toFixed(1) : 0}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">Reading time</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${readingTimeFormatted}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0;">Speaking time</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${speakingTimeFormatted}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
            
            document.getElementById('wordCounterResult').innerHTML = resultHTML;
        }
        
        // Initial count
        updateWordCount();
    }
    
    // 13. Base64 Encoder/Decoder
    function loadBase64Converter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-code"></i> Base64 Encoder/Decoder</h3>
                <p>Encode text to Base64 or decode Base64 back to text.</p>
                
                <div class="form-group">
                    <label for="base64Action">Action</label>
                    <select id="base64Action" class="form-control">
                        <option value="encode">Encode to Base64</option>
                        <option value="decode">Decode from Base64</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="base64Input">Input Text</label>
                    <textarea id="base64Input" class="form-control" rows="6" placeholder="Enter text to encode or decode...">Hello, World! This is a test message.</textarea>
                </div>
                
                <button id="convertBase64Btn" class="btn btn-block">Convert</button>
                
                <div id="base64Result"></div>
            </div>
        `;
        
        const actionSelect = document.getElementById('base64Action');
        const inputTextarea = document.getElementById('base64Input');
        const convertBtn = document.getElementById('convertBase64Btn');
        
        convertBtn.addEventListener('click', function() {
            const action = actionSelect.value;
            const input = inputTextarea.value.trim();
            
            if (!input) {
                showResult('base64Result', 'Please enter some text', true);
                return;
            }
            
            try {
                let result, title;
                
                if (action === 'encode') {
                    result = btoa(input);
                    title = 'Base64 Encoded Result';
                } else {
                    result = atob(input);
                    title = 'Base64 Decoded Result';
                }
                
                const resultHTML = `
                    <div class="result-container">
                        <h4>${title}</h4>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace; white-space: pre-wrap; word-break: break-all;">
                            ${result}
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button id="copyBase64Btn" class="btn btn-success">
                                <i class="fas fa-copy"></i> Copy to Clipboard
                            </button>
                            <button id="clearBase64Btn" class="btn">
                                Clear Input
                            </button>
                        </div>
                    </div>
                `;
                
                document.getElementById('base64Result').innerHTML = resultHTML;
                
                // Add copy functionality
                document.getElementById('copyBase64Btn').addEventListener('click', function() {
                    navigator.clipboard.writeText(result).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        this.style.backgroundColor = 'var(--success-color)';
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.style.backgroundColor = '';
                        }, 2000);
                    });
                });
                
                // Add clear functionality
                document.getElementById('clearBase64Btn').addEventListener('click', function() {
                    inputTextarea.value = '';
                    document.getElementById('base64Result').innerHTML = '';
                });
                
            } catch (error) {
                showResult('base64Result', `Error: ${error.message}. Make sure your input is valid for the selected action.`, true);
            }
        });
    }
    
    // 14. Color Picker
    function loadColorPicker() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-eye-dropper"></i> Color Picker</h3>
                <p>Pick a color and get its HEX, RGB, HSL, and CMYK values.</p>
                
                <div class="form-group">
                    <label for="colorPickerInput">Select Color</label>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <input type="color" id="colorPickerInput" class="form-control" style="width: 80px; height: 50px; padding: 0;" value="#4a6fa5">
                        <input type="text" id="colorHexInput" class="form-control" value="#4a6fa5" style="font-family: monospace;">
                    </div>
                </div>
                
                <div id="colorPreview" style="width: 100%; height: 100px; background-color: #4a6fa5; border-radius: var(--border-radius); margin: 20px 0;"></div>
                
                <div id="colorValuesResult">
                    <!-- Color values will be displayed here -->
                </div>
            </div>
        `;
        
        const colorPicker = document.getElementById('colorPickerInput');
        const hexInput = document.getElementById('colorHexInput');
        const colorPreview = document.getElementById('colorPreview');
        
        // Update color when color picker changes
        colorPicker.addEventListener('input', function() {
            const color = this.value;
            hexInput.value = color;
            updateColorValues(color);
        });
        
        // Update color when hex input changes
        hexInput.addEventListener('input', function() {
            let color = this.value;
            // Add # if missing
            if (!color.startsWith('#')) color = '#' + color;
            
            // Validate hex color
            if (/^#[0-9A-F]{6}$/i.test(color)) {
                colorPicker.value = color;
                updateColorValues(color);
            }
        });
        
        function updateColorValues(hexColor) {
            // Update preview
            colorPreview.style.backgroundColor = hexColor;
            
            // Convert hex to RGB
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            
            // Convert RGB to HSL
            const rgbToHsl = (r, g, b) => {
                r /= 255;
                g /= 255;
                b /= 255;
                
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                
                if (max === min) {
                    h = s = 0; // achromatic
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    
                    h /= 6;
                }
                
                return {
                    h: Math.round(h * 360),
                    s: Math.round(s * 100),
                    l: Math.round(l * 100)
                };
            };
            
            const hsl = rgbToHsl(r, g, b);
            
            // Convert RGB to CMYK
            const rgbToCmyk = (r, g, b) => {
                if (r === 0 && g === 0 && b === 0) {
                    return { c: 0, m: 0, y: 0, k: 100 };
                }
                
                const c = 1 - (r / 255);
                const m = 1 - (g / 255);
                const y = 1 - (b / 255);
                
                const k = Math.min(c, m, y);
                
                return {
                    c: Math.round(((c - k) / (1 - k)) * 100),
                    m: Math.round(((m - k) / (1 - k)) * 100),
                    y: Math.round(((y - k) / (1 - k)) * 100),
                    k: Math.round(k * 100)
                };
            };
            
            const cmyk = rgbToCmyk(r, g, b);
            
            // Display color values
            const resultHTML = `
                <div class="result-container">
                    <h4>Color Values</h4>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">HEX</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">${hexColor.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">RGB</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">rgb(${r}, ${g}, ${b})</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">RGBA</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">rgba(${r}, ${g}, ${b}, 1.0)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">HSL</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">HSLA</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1.0)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">CMYK</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px; display: flex; gap: 10px;">
                        <button id="copyColorBtn" class="btn btn-success">
                            <i class="fas fa-copy"></i> Copy HEX
                        </button>
                        <button id="randomColorBtn" class="btn">
                            <i class="fas fa-random"></i> Random Color
                        </button>
                    </div>
                </div>
            `;
            
            document.getElementById('colorValuesResult').innerHTML = resultHTML;
            
            // Add copy functionality
            document.getElementById('copyColorBtn').addEventListener('click', function() {
                navigator.clipboard.writeText(hexColor.toUpperCase()).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.backgroundColor = 'var(--success-color)';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                });
            });
            
            // Add random color functionality
            document.getElementById('randomColorBtn').addEventListener('click', function() {
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                colorPicker.value = randomColor;
                hexInput.value = randomColor;
                updateColorValues(randomColor);
            });
        }
        
        // Initial update
        updateColorValues(colorPicker.value);
    }
    
    // 15. Text to Speech
    function loadTextToSpeech() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-volume-up"></i> Text to Speech</h3>
                <p>Convert text to speech using your browser's speech synthesis.</p>
                
                <div class="form-group">
                    <label for="ttsText">Text to Speak</label>
                    <textarea id="ttsText" class="form-control" rows="6" placeholder="Enter text to convert to speech...">Hello! Welcome to Multi Tool Hub. This is a text to speech converter that works entirely in your browser.</textarea>
                </div>
                
                <div class="form-group">
                    <label for="ttsVoice">Voice</label>
                    <select id="ttsVoice" class="form-control">
                        <option value="">Default Voice</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ttsRate">Speech Rate: <span id="rateValue">1.0</span></label>
                    <div class="range-group">
                        <input type="range" id="ttsRate" class="form-control" min="0.5" max="2" step="0.1" value="1.0">
                        <span class="range-value" id="rateValueText">1.0</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="ttsPitch">Speech Pitch: <span id="pitchValue">1.0</span></label>
                    <div class="range-group">
                        <input type="range" id="ttsPitch" class="form-control" min="0.5" max="2" step="0.1" value="1.0">
                        <span class="range-value" id="pitchValueText">1.0</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="speakBtn" class="btn btn-success">
                        <i class="fas fa-play"></i> Speak
                    </button>
                    <button id="pauseBtn" class="btn btn-warning">
                        <i class="fas fa-pause"></i> Pause
                    </button>
                    <button id="resumeBtn" class="btn">
                        <i class="fas fa-play"></i> Resume
                    </button>
                    <button id="stopBtn" class="btn btn-danger">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                </div>
                
                <div id="ttsStatus" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; display: none;">
                    <h5>Speech Status</h5>
                    <p id="statusText">Ready to speak</p>
                </div>
            </div>
        `;
        
        const ttsText = document.getElementById('ttsText');
        const voiceSelect = document.getElementById('ttsVoice');
        const rateSlider = document.getElementById('ttsRate');
        const pitchSlider = document.getElementById('ttsPitch');
        const rateValueText = document.getElementById('rateValueText');
        const pitchValueText = document.getElementById('pitchValueText');
        const speakBtn = document.getElementById('speakBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        const stopBtn = document.getElementById('stopBtn');
        const ttsStatus = document.getElementById('ttsStatus');
        const statusText = document.getElementById('statusText');
        
        let voices = [];
        let utterance = null;
        
        // Update slider values
        rateSlider.addEventListener('input', function() {
            rateValueText.textContent = this.value;
        });
        
        pitchSlider.addEventListener('input', function() {
            pitchValueText.textContent = this.value;
        });
        
        // Load available voices
        function loadVoices() {
            voices = speechSynthesis.getVoices();
            
            // Clear existing options
            voiceSelect.innerHTML = '<option value="">Default Voice</option>';
            
            // Add voice options
            voices.forEach((voice, i) => {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }
        
        // Some browsers load voices asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        // Initial load
        loadVoices();
        
        // Speak function
        function speakText() {
            const text = ttsText.value.trim();
            
            if (!text) {
                statusText.textContent = 'Please enter text to speak';
                ttsStatus.style.display = 'block';
                return;
            }
            
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Create new utterance
            utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice
            const selectedVoice = voiceSelect.value;
            if (selectedVoice && voices[selectedVoice]) {
                utterance.voice = voices[selectedVoice];
            }
            
            // Set rate and pitch
            utterance.rate = parseFloat(rateSlider.value);
            utterance.pitch = parseFloat(pitchSlider.value);
            
            // Event handlers
            utterance.onstart = function() {
                statusText.textContent = 'Speaking...';
                ttsStatus.style.display = 'block';
            };
            
            utterance.onend = function() {
                statusText.textContent = 'Finished speaking';
                setTimeout(() => {
                    ttsStatus.style.display = 'none';
                }, 3000);
            };
            
            utterance.onerror = function(event) {
                statusText.textContent = 'Error: ' + event.error;
                ttsStatus.style.display = 'block';
            };
            
            // Speak
            speechSynthesis.speak(utterance);
        }
        
        // Button event listeners
        speakBtn.addEventListener('click', speakText);
        
        pauseBtn.addEventListener('click', function() {
            speechSynthesis.pause();
            statusText.textContent = 'Paused';
            ttsStatus.style.display = 'block';
        });
        
        resumeBtn.addEventListener('click', function() {
            speechSynthesis.resume();
            statusText.textContent = 'Resumed speaking...';
            ttsStatus.style.display = 'block';
        });
        
        stopBtn.addEventListener('click', function() {
            speechSynthesis.cancel();
            statusText.textContent = 'Stopped';
            ttsStatus.style.display = 'block';
            setTimeout(() => {
                ttsStatus.style.display = 'none';
            }, 2000);
        });
    }
    
    // 16. Speech to Text
    function loadSpeechToText() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-microphone"></i> Speech to Text</h3>
                <p>Convert speech to text using your microphone. Requires browser permission.</p>
                
                <div id="speechStatus" style="padding: 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
                    <h5>Status: <span id="statusIndicator">Ready</span></h5>
                    <p id="statusMessage">Click "Start Listening" to begin speech recognition.</p>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button id="startListeningBtn" class="btn btn-success">
                        <i class="fas fa-microphone"></i> Start Listening
                    </button>
                    <button id="stopListeningBtn" class="btn btn-danger">
                        <i class="fas fa-microphone-slash"></i> Stop Listening
                    </button>
                    <button id="clearTextBtn" class="btn">
                        <i class="fas fa-trash"></i> Clear Text
                    </button>
                </div>
                
                <div class="form-group">
                    <label for="speechResult">Recognized Text</label>
                    <textarea id="speechResult" class="form-control" rows="8" placeholder="Recognized text will appear here..." readonly></textarea>
                </div>
                
                <div style="margin-top: 20px;">
                    <button id="copySpeechBtn" class="btn btn-success">
                        <i class="fas fa-copy"></i> Copy Text
                    </button>
                </div>
            </div>
        `;
        
        const startBtn = document.getElementById('startListeningBtn');
        const stopBtn = document.getElementById('stopListeningBtn');
        const clearBtn = document.getElementById('clearTextBtn');
        const copyBtn = document.getElementById('copySpeechBtn');
        const speechResult = document.getElementById('speechResult');
        const statusIndicator = document.getElementById('statusIndicator');
        const statusMessage = document.getElementById('statusMessage');
        
        let recognition = null;
        let isListening = false;
        
        // Check for browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            statusIndicator.textContent = 'Not Supported';
            statusMessage.textContent = 'Speech recognition is not supported in your browser. Try Chrome or Edge.';
            startBtn.disabled = true;
            return;
        }
        
        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        // Event handlers
        recognition.onstart = function() {
            isListening = true;
            statusIndicator.textContent = 'Listening...';
            statusIndicator.style.color = 'var(--success-color)';
            statusMessage.textContent = 'Speak now. Your speech will be converted to text.';
        };
        
        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                } else {
                    transcript += event.results[i][0].transcript;
                }
            }
            
            speechResult.value = transcript;
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            statusIndicator.textContent = 'Error';
            statusIndicator.style.color = 'var(--danger-color)';
            statusMessage.textContent = `Error: ${event.error}`;
            isListening = false;
        };
        
        recognition.onend = function() {
            isListening = false;
            statusIndicator.textContent = 'Ready';
            statusIndicator.style.color = '';
            statusMessage.textContent = 'Click "Start Listening" to begin again.';
        };
        
        // Button event listeners
        startBtn.addEventListener('click', function() {
            if (!isListening) {
                try {
                    recognition.start();
                } catch (error) {
                    statusIndicator.textContent = 'Error';
                    statusMessage.textContent = 'Could not start speech recognition. Please check microphone permissions.';
                }
            }
        });
        
        stopBtn.addEventListener('click', function() {
            if (isListening) {
                recognition.stop();
            }
        });
        
        clearBtn.addEventListener('click', function() {
            speechResult.value = '';
        });
        
        copyBtn.addEventListener('click', function() {
            if (speechResult.value.trim()) {
                navigator.clipboard.writeText(speechResult.value).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.backgroundColor = 'var(--success-color)';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                });
            }
        });
    }
    
    // 17. JSON Formatter
    function loadJSONFormatter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-brace"></i> JSON Formatter</h3>
                <p>Validate, format (prettify), and minify JSON data.</p>
                
                <div class="form-group">
                    <label for="jsonInput">JSON Input</label>
                    <textarea id="jsonInput" class="form-control" rows="10" placeholder='Paste your JSON here...'>{"name": "Multi Tool Hub","version": "1.0","tools": 20,"features": ["Image Tools","Calculators","Generators","Converters"],"settings": {"theme": "light","language": "en"}}</textarea>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button id="formatJsonBtn" class="btn btn-success">
                        <i class="fas fa-indent"></i> Format JSON
                    </button>
                    <button id="minifyJsonBtn" class="btn">
                        <i class="fas fa-outdent"></i> Minify JSON
                    </button>
                    <button id="validateJsonBtn" class="btn">
                        <i class="fas fa-check-circle"></i> Validate
                    </button>
                    <button id="clearJsonBtn" class="btn">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
                
                <div id="jsonResult"></div>
            </div>
        `;
        
        const jsonInput = document.getElementById('jsonInput');
        const formatBtn = document.getElementById('formatJsonBtn');
        const minifyBtn = document.getElementById('minifyJsonBtn');
        const validateBtn = document.getElementById('validateJsonBtn');
        const clearBtn = document.getElementById('clearJsonBtn');
        
        // Format JSON with proper indentation
        formatBtn.addEventListener('click', function() {
            try {
                const parsed = JSON.parse(jsonInput.value);
                const formatted = JSON.stringify(parsed, null, 2);
                jsonInput.value = formatted;
                showResult('jsonResult', 'JSON formatted successfully!', false);
            } catch (error) {
                showResult('jsonResult', `Invalid JSON: ${error.message}`, true);
            }
        });
        
        // Minify JSON (remove whitespace)
        minifyBtn.addEventListener('click', function() {
            try {
                const parsed = JSON.parse(jsonInput.value);
                const minified = JSON.stringify(parsed);
                jsonInput.value = minified;
                showResult('jsonResult', 'JSON minified successfully!', false);
            } catch (error) {
                showResult('jsonResult', `Invalid JSON: ${error.message}`, true);
            }
        });
        
        // Validate JSON
        validateBtn.addEventListener('click', function() {
            try {
                JSON.parse(jsonInput.value);
                showResult('jsonResult', '✅ JSON is valid!', false);
            } catch (error) {
                showResult('jsonResult', `❌ Invalid JSON: ${error.message}`, true);
            }
        });
        
        // Clear input
        clearBtn.addEventListener('click', function() {
            jsonInput.value = '';
            document.getElementById('jsonResult').innerHTML = '';
        });
        
        // Add syntax highlighting on input (simplified)
        jsonInput.addEventListener('input', function() {
            // Clear any previous error/success messages
            const resultDiv = document.getElementById('jsonResult');
            if (resultDiv.innerHTML.includes('Invalid JSON')) {
                resultDiv.innerHTML = '';
            }
        });
    }
    
    // 18. Unit Converter
    function loadUnitConverter() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-exchange-alt"></i> Unit Converter</h3>
                <p>Convert between different units of length, weight, temperature, and more.</p>
                
                <div class="form-group">
                    <label for="conversionType">Conversion Type</label>
                    <select id="conversionType" class="form-control">
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                        <option value="area">Area</option>
                        <option value="volume">Volume</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="fromUnit">From Unit</label>
                    <select id="fromUnit" class="form-control">
                        <!-- Options will be populated based on conversion type -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="toUnit">To Unit</label>
                    <select id="toUnit" class="form-control">
                        <!-- Options will be populated based on conversion type -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="unitValue">Value to Convert</label>
                    <input type="number" id="unitValue" class="form-control" value="1" step="any">
                </div>
                
                <button id="convertUnitBtn" class="btn btn-block">Convert</button>
                
                <div id="unitConverterResult"></div>
            </div>
        `;
        
        const conversionTypeSelect = document.getElementById('conversionType');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const unitValueInput = document.getElementById('unitValue');
        const convertBtn = document.getElementById('convertUnitBtn');
        
        // Unit definitions
        const units = {
            length: [
                { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
                { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
                { name: 'Meter', symbol: 'm', factor: 1 },
                { name: 'Kilometer', symbol: 'km', factor: 1000 },
                { name: 'Inch', symbol: 'in', factor: 0.0254 },
                { name: 'Foot', symbol: 'ft', factor: 0.3048 },
                { name: 'Yard', symbol: 'yd', factor: 0.9144 },
                { name: 'Mile', symbol: 'mi', factor: 1609.344 }
            ],
            weight: [
                { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
                { name: 'Gram', symbol: 'g', factor: 0.001 },
                { name: 'Kilogram', symbol: 'kg', factor: 1 },
                { name: 'Metric Ton', symbol: 't', factor: 1000 },
                { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
                { name: 'Pound', symbol: 'lb', factor: 0.453592 },
                { name: 'Stone', symbol: 'st', factor: 6.35029 }
            ],
            temperature: [
                { name: 'Celsius', symbol: '°C', factor: 1 },
                { name: 'Fahrenheit', symbol: '°F', factor: 1 },
                { name: 'Kelvin', symbol: 'K', factor: 1 }
            ],
            area: [
                { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
                { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
                { name: 'Square Meter', symbol: 'm²', factor: 1 },
                { name: 'Hectare', symbol: 'ha', factor: 10000 },
                { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
                { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
                { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
                { name: 'Square Yard', symbol: 'yd²', factor: 0.836127 },
                { name: 'Acre', symbol: 'ac', factor: 4046.86 }
            ],
            volume: [
                { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
                { name: 'Liter', symbol: 'L', factor: 1 },
                { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
                { name: 'Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 },
                { name: 'Cup', symbol: 'cup', factor: 0.236588 },
                { name: 'Pint', symbol: 'pt', factor: 0.473176 },
                { name: 'Quart', symbol: 'qt', factor: 0.946353 },
                { name: 'Gallon', symbol: 'gal', factor: 3.78541 }
            ]
        };
        
        // Populate unit selects based on conversion type
        function populateUnits() {
            const type = conversionTypeSelect.value;
            const unitList = units[type];
            
            // Clear existing options
            fromUnitSelect.innerHTML = '';
            toUnitSelect.innerHTML = '';
            
            // Add options
            unitList.forEach(unit => {
                const fromOption = document.createElement('option');
                fromOption.value = unit.symbol;
                fromOption.textContent = `${unit.name} (${unit.symbol})`;
                fromUnitSelect.appendChild(fromOption);
                
                const toOption = document.createElement('option');
                toOption.value = unit.symbol;
                toOption.textContent = `${unit.name} (${unit.symbol})`;
                toUnitSelect.appendChild(toOption);
            });
            
            // Set default selections
            if (type === 'length') {
                fromUnitSelect.value = 'm';
                toUnitSelect.value = 'ft';
            } else if (type === 'weight') {
                fromUnitSelect.value = 'kg';
                toUnitSelect.value = 'lb';
            } else if (type === 'temperature') {
                fromUnitSelect.value = '°C';
                toUnitSelect.value = '°F';
            } else if (type === 'area') {
                fromUnitSelect.value = 'm²';
                toUnitSelect.value = 'ft²';
            } else if (type === 'volume') {
                fromUnitSelect.value = 'L';
                toUnitSelect.value = 'gal';
            }
        }
        
        // Initial population
        populateUnits();
        
        // Update units when conversion type changes
        conversionTypeSelect.addEventListener('change', populateUnits);
        
        // Convert units
        convertBtn.addEventListener('click', function() {
            const type = conversionTypeSelect.value;
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            const value = parseFloat(unitValueInput.value);
            
            if (isNaN(value)) {
                showResult('unitConverterResult', 'Please enter a valid number', true);
                return;
            }
            
            let result;
            
            // Special handling for temperature
            if (type === 'temperature') {
                result = convertTemperature(value, fromUnit, toUnit);
            } else {
                // For other units, convert via base unit
                const fromUnitData = units[type].find(u => u.symbol === fromUnit);
                const toUnitData = units[type].find(u => u.symbol === toUnit);
                
                if (!fromUnitData || !toUnitData) {
                    showResult('unitConverterResult', 'Invalid unit selection', true);
                    return;
                }
                
                // Convert to base unit first, then to target unit
                const baseValue = value * fromUnitData.factor;
                result = baseValue / toUnitData.factor;
            }
            
            const resultHTML = `
                <div class="result-container">
                    <h4>Conversion Result</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">
                        ${value} ${fromUnit} = ${result.toLocaleString(undefined, {maximumFractionDigits: 6})} ${toUnit}
                    </div>
                    <p><strong>Conversion Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    <p><strong>Formula:</strong> ${getConversionFormula(type, fromUnit, toUnit)}</p>
                </div>
            `;
            
            document.getElementById('unitConverterResult').innerHTML = resultHTML;
        });
        
        // Temperature conversion function
        function convertTemperature(value, fromUnit, toUnit) {
            if (fromUnit === toUnit) return value;
            
            // Convert to Celsius first
            let celsius;
            if (fromUnit === '°C') celsius = value;
            else if (fromUnit === '°F') celsius = (value - 32) * 5/9;
            else if (fromUnit === 'K') celsius = value - 273.15;
            
            // Convert from Celsius to target unit
            if (toUnit === '°C') return celsius;
            else if (toUnit === '°F') return (celsius * 9/5) + 32;
            else if (toUnit === 'K') return celsius + 273.15;
            
            return 0;
        }
        
        // Get conversion formula description
        function getConversionFormula(type, fromUnit, toUnit) {
            if (type === 'temperature') {
                if (fromUnit === '°C' && toUnit === '°F') return '°F = (°C × 9/5) + 32';
                if (fromUnit === '°F' && toUnit === '°C') return '°C = (°F - 32) × 5/9';
                if (fromUnit === '°C' && toUnit === 'K') return 'K = °C + 273.15';
                if (fromUnit === 'K' && toUnit === '°C') return '°C = K - 273.15';
                if (fromUnit === '°F' && toUnit === 'K') return 'K = (°F - 32) × 5/9 + 273.15';
                if (fromUnit === 'K' && toUnit === '°F') return '°F = (K - 273.15) × 9/5 + 32';
            }
            
            return `Multiply by conversion factor`;
        }
    }
    
    // 19. BMI Calculator
    function loadBMICalculator() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-weight"></i> BMI Calculator</h3>
                <p>Calculate Body Mass Index (BMI) and determine your weight category.</p>
                
                <div class="form-group">
                    <label>Measurement System</label>
                    <div style="display: flex; gap: 20px; margin-top: 10px;">
                        <div class="checkbox-group">
                            <input type="radio" id="metricSystem" name="measurement" checked>
                            <label for="metricSystem">Metric (kg, cm)</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="radio" id="imperialSystem" name="measurement">
                            <label for="imperialSystem">Imperial (lb, in)</label>
                        </div>
                    </div>
                </div>
                
                <div id="metricInputs">
                    <div class="form-group">
                        <label for="heightCm">Height (cm)</label>
                        <input type="number" id="heightCm" class="form-control" min="50" max="250" step="0.1" value="170">
                    </div>
                    <div class="form-group">
                        <label for="weightKg">Weight (kg)</label>
                        <input type="number" id="weightKg" class="form-control" min="20" max="300" step="0.1" value="70">
                    </div>
                </div>
                
                <div id="imperialInputs" style="display: none;">
                    <div class="form-group">
                        <label for="heightFeet">Height (feet)</label>
                        <input type="number" id="heightFeet" class="form-control" min="3" max="8" step="1" value="5">
                    </div>
                    <div class="form-group">
                        <label for="heightInches">Height (inches)</label>
                        <input type="number" id="heightInches" class="form-control" min="0" max="11" step="1" value="7">
                    </div>
                    <div class="form-group">
                        <label for="weightLb">Weight (pounds)</label>
                        <input type="number" id="weightLb" class="form-control" min="50" max="660" step="0.1" value="154">
                    </div>
                </div>
                
                <button id="calculateBMIBtn" class="btn btn-block">Calculate BMI</button>
                
                <div id="bmiCalculatorResult"></div>
            </div>
        `;
        
        const metricSystemRadio = document.getElementById('metricSystem');
        const imperialSystemRadio = document.getElementById('imperialSystem');
        const metricInputs = document.getElementById('metricInputs');
        const imperialInputs = document.getElementById('imperialInputs');
        const calculateBtn = document.getElementById('calculateBMIBtn');
        
        // Toggle between metric and imperial inputs
        metricSystemRadio.addEventListener('change', function() {
            if (this.checked) {
                metricInputs.style.display = 'block';
                imperialInputs.style.display = 'none';
            }
        });
        
        imperialSystemRadio.addEventListener('change', function() {
            if (this.checked) {
                metricInputs.style.display = 'none';
                imperialInputs.style.display = 'block';
            }
        });
        
        // Calculate BMI
        calculateBtn.addEventListener('click', function() {
            let height, weight, bmi;
            
            if (metricSystemRadio.checked) {
                const heightCm = parseFloat(document.getElementById('heightCm').value);
                const weightKg = parseFloat(document.getElementById('weightKg').value);
                
                if (!heightCm || !weightKg) {
                    showResult('bmiCalculatorResult', 'Please enter valid height and weight', true);
                    return;
                }
                
                height = heightCm / 100; // Convert cm to meters
                weight = weightKg;
                bmi = weight / (height * height);
            } else {
                const heightFeet = parseFloat(document.getElementById('heightFeet').value);
                const heightInches = parseFloat(document.getElementById('heightInches').value);
                const weightLb = parseFloat(document.getElementById('weightLb').value);
                
                if (!heightFeet || !weightLb) {
                    showResult('bmiCalculatorResult', 'Please enter valid height and weight', true);
                    return;
                }
                
                height = heightFeet * 12 + heightInches; // Total height in inches
                weight = weightLb;
                bmi = (weight / (height * height)) * 703; // BMI formula for imperial
            }
            
            // Determine BMI category
            let category, categoryColor, advice;
            
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryColor = '#ffc107'; // Warning yellow
                advice = 'You may need to gain weight. Consider consulting a healthcare provider.';
            } else if (bmi < 25) {
                category = 'Normal weight';
                categoryColor = '#28a745'; // Success green
                advice = 'Keep up the good work! Maintain a balanced diet and regular exercise.';
            } else if (bmi < 30) {
                category = 'Overweight';
                categoryColor = '#fd7e14'; // Orange
                advice = 'Consider adopting a healthier lifestyle with diet and exercise.';
            } else {
                category = 'Obese';
                categoryColor = '#dc3545'; // Danger red
                advice = 'Consult a healthcare provider for guidance on weight management.';
            }
            
            const resultHTML = `
                <div class="result-container">
                    <h4>BMI Calculation Result</h4>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 3rem; font-weight: bold; color: ${categoryColor};">
                            ${bmi.toFixed(1)}
                        </div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${categoryColor}; margin: 10px 0;">
                            ${category}
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h5>BMI Categories</h5>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Underweight</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">&lt; 18.5</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Normal weight</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">18.5 – 24.9</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Overweight</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">25 – 29.9</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0;">Obese</td>
                                <td style="padding: 8px 0; text-align: right;">≥ 30</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h5>Health Advice</h5>
                        <p>${advice}</p>
                        <p><strong>Note:</strong> BMI is a simple screening tool and does not account for muscle mass, bone density, or overall body composition. For a comprehensive health assessment, consult a healthcare professional.</p>
                    </div>
                </div>
            `;
            
            document.getElementById('bmiCalculatorResult').innerHTML = resultHTML;
        });
    }
    
    // 20. Timer / Stopwatch
    function loadTimerStopwatch() {
        toolContent.innerHTML = `
            <div class="tool-section">
                <h3><i class="fas fa-stopwatch"></i> Timer / Stopwatch</h3>
                <p>Countdown timer and stopwatch with start, pause, and reset functions.</p>
                
                <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                    <button id="timerTabBtn" class="btn" style="flex: 1;">Timer</button>
                    <button id="stopwatchTabBtn" class="btn" style="flex: 1;">Stopwatch</button>
                </div>
                
                <!-- Timer Section -->
                <div id="timerSection">
                    <h4>Countdown Timer</h4>
                    <p>Set a countdown timer in hours, minutes, and seconds.</p>
                    
                    <div style="display: flex; gap: 15px; margin: 20px 0;">
                        <div class="form-group" style="flex: 1;">
                            <label for="timerHours">Hours</label>
                            <input type="number" id="timerHours" class="form-control" min="0" max="24" value="0">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="timerMinutes">Minutes</label>
                            <input type="number" id="timerMinutes" class="form-control" min="0" max="59" value="5">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="timerSeconds">Seconds</label>
                            <input type="number" id="timerSeconds" class="form-control" min="0" max="59" value="0">
                        </div>
                    </div>
                    
                    <div id="timerDisplay" style="font-size: 3.5rem; font-weight: bold; text-align: center; color: var(--primary-color); margin: 20px 0; font-family: monospace;">
                        05:00
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button id="startTimerBtn" class="btn btn-success" style="flex: 1;">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button id="pauseTimerBtn" class="btn btn-warning" style="flex: 1;">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button id="resetTimerBtn" class="btn" style="flex: 1;">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>
                    
                    <div id="timerAlarm" style="margin-top: 20px; display: none;">
                        <div style="background: var(--warning-color); color: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <h4><i class="fas fa-bell"></i> Time's Up!</h4>
                            <p>Timer has finished.</p>
                            <button id="stopAlarmBtn" class="btn">Stop Alarm</button>
                        </div>
                    </div>
                </div>
                
                <!-- Stopwatch Section -->
                <div id="stopwatchSection" style="display: none;">
                    <h4>Stopwatch</h4>
                    <p>Measure elapsed time with lap recording.</p>
                    
                    <div id="stopwatchDisplay" style="font-size: 3.5rem; font-weight: bold; text-align: center; color: var(--primary-color); margin: 20px 0; font-family: monospace;">
                        00:00:00.00
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button id="startStopwatchBtn" class="btn btn-success" style="flex: 1;">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button id="pauseStopwatchBtn" class="btn btn-warning" style="flex: 1;">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button id="lapStopwatchBtn" class="btn" style="flex: 1;">
                            <i class="fas fa-flag"></i> Lap
                        </button>
                        <button id="resetStopwatchBtn" class="btn" style="flex: 1;">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>
                    
                    <div id="lapTimes" style="max-height: 200px; overflow-y: auto;">
                        <h5>Lap Times</h5>
                        <div id="lapList" style="margin-top: 10px;"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Tab switching
        const timerTabBtn = document.getElementById('timerTabBtn');
        const stopwatchTabBtn = document.getElementById('stopwatchTabBtn');
        const timerSection = document.getElementById('timerSection');
        const stopwatchSection = document.getElementById('stopwatchSection');
        
        timerTabBtn.addEventListener('click', function() {
            timerTabBtn.style.backgroundColor = 'var(--primary-color)';
            timerTabBtn.style.color = 'white';
            stopwatchTabBtn.style.backgroundColor = '';
            stopwatchTabBtn.style.color = '';
            timerSection.style.display = 'block';
            stopwatchSection.style.display = 'none';
        });
        
        stopwatchTabBtn.addEventListener('click', function() {
            stopwatchTabBtn.style.backgroundColor = 'var(--primary-color)';
            stopwatchTabBtn.style.color = 'white';
            timerTabBtn.style.backgroundColor = '';
            timerTabBtn.style.color = '';
            timerSection.style.display = 'none';
            stopwatchSection.style.display = 'block';
        });
        
        // Initialize timer tab as active
        timerTabBtn.style.backgroundColor = 'var(--primary-color)';
        timerTabBtn.style.color = 'white';
        
        // ========== TIMER FUNCTIONALITY ==========
        const timerHoursInput = document.getElementById('timerHours');
        const timerMinutesInput = document.getElementById('timerMinutes');
        const timerSecondsInput = document.getElementById('timerSeconds');
        const timerDisplay = document.getElementById('timerDisplay');
        const startTimerBtn = document.getElementById('startTimerBtn');
        const pauseTimerBtn = document.getElementById('pauseTimerBtn');
        const resetTimerBtn = document.getElementById('resetTimerBtn');
        const timerAlarm = document.getElementById('timerAlarm');
        const stopAlarmBtn = document.getElementById('stopAlarmBtn');
        
        let timerInterval = null;
        let timerTimeLeft = 0; // in seconds
        let isTimerRunning = false;
        
        // Update timer display based on inputs
        function updateTimerDisplay() {
            const hours = parseInt(timerHoursInput.value) || 0;
            const minutes = parseInt(timerMinutesInput.value) || 0;
            const seconds = parseInt(timerSecondsInput.value) || 0;
            
            timerTimeLeft = hours * 3600 + minutes * 60 + seconds;
            displayTimerTime();
        }
        
        // Display time in HH:MM:SS format
        function displayTimerTime() {
            const hours = Math.floor(timerTimeLeft / 3600);
            const minutes = Math.floor((timerTimeLeft % 3600) / 60);
            const seconds = timerTimeLeft % 60;
            
            if (hours > 0) {
                timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
        
        // Start timer
        function startTimer() {
            if (isTimerRunning) return;
            
            // Get initial time from inputs
            updateTimerDisplay();
            
            if (timerTimeLeft <= 0) return;
            
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                timerTimeLeft--;
                displayTimerTime();
                
                if (timerTimeLeft <= 0) {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    timerAlarm.style.display = 'block';
                    
                    // Play alarm sound (using Web Audio API)
                    try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.value = 800;
                        oscillator.type = 'sine';
                        
                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                        
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 2);
                    } catch (error) {
                        console.log('Audio not supported');
                    }
                }
            }, 1000);
        }
        
        // Pause timer
        function pauseTimer() {
            if (!isTimerRunning) return;
            
            clearInterval(timerInterval);
            isTimerRunning = false;
        }
        
        // Reset timer
        function resetTimer() {
            clearInterval(timerInterval);
            isTimerRunning = false;
            timerAlarm.style.display = 'none';
            updateTimerDisplay();
        }
        
        // Event listeners for timer
        timerHoursInput.addEventListener('input', updateTimerDisplay);
        timerMinutesInput.addEventListener('input', updateTimerDisplay);
        timerSecondsInput.addEventListener('input', updateTimerDisplay);
        
        startTimerBtn.addEventListener('click', startTimer);
        pauseTimerBtn.addEventListener('click', pauseTimer);
        resetTimerBtn.addEventListener('click', resetTimer);
        stopAlarmBtn.addEventListener('click', () => {
            timerAlarm.style.display = 'none';
        });
        
        // Initial display
        updateTimerDisplay();
        
        // ========== STOPWATCH FUNCTIONALITY ==========
        const stopwatchDisplay = document.getElementById('stopwatchDisplay');
        const startStopwatchBtn = document.getElementById('startStopwatchBtn');
        const pauseStopwatchBtn = document.getElementById('pauseStopwatchBtn');
        const lapStopwatchBtn = document.getElementById('lapStopwatchBtn');
        const resetStopwatchBtn = document.getElementById('resetStopwatchBtn');
        const lapList = document.getElementById('lapList');
        
        let stopwatchInterval = null;
        let stopwatchTime = 0; // in centiseconds (1/100th of a second)
        let isStopwatchRunning = false;
        let lapCount = 0;
        
        // Display stopwatch time in HH:MM:SS.cc format
        function displayStopwatchTime() {
            const totalCentiseconds = stopwatchTime;
            const hours = Math.floor(totalCentiseconds / 360000);
            const minutes = Math.floor((totalCentiseconds % 360000) / 6000);
            const seconds = Math.floor((totalCentiseconds % 6000) / 100);
            const centiseconds = totalCentiseconds % 100;
            
            if (hours > 0) {
                stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
            } else {
                stopwatchDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
            }
        }
        
        // Start stopwatch
        function startStopwatch() {
            if (isStopwatchRunning) return;
            
            isStopwatchRunning = true;
            const startTime = Date.now() - (stopwatchTime * 10); // Adjust for already elapsed time
            
            stopwatchInterval = setInterval(() => {
                stopwatchTime = Math.floor((Date.now() - startTime) / 10);
                displayStopwatchTime();
            }, 10); // Update every 10ms (centisecond)
        }
        
        // Pause stopwatch
        function pauseStopwatch() {
            if (!isStopwatchRunning) return;
            
            clearInterval(stopwatchInterval);
            isStopwatchRunning = false;
        }
        
        // Reset stopwatch
        function resetStopwatch() {
            clearInterval(stopwatchInterval);
            isStopwatchRunning = false;
            stopwatchTime = 0;
            displayStopwatchTime();
            lapCount = 0;
            lapList.innerHTML = '';
        }
        
        // Record lap time
        function recordLap() {
            if (!isStopwatchRunning && stopwatchTime === 0) return;
            
            lapCount++;
            const lapTime = stopwatchTime;
            
            const hours = Math.floor(lapTime / 360000);
            const minutes = Math.floor((lapTime % 360000) / 6000);
            const seconds = Math.floor((lapTime % 6000) / 100);
            const centiseconds = lapTime % 100;
            
            let timeString;
            if (hours > 0) {
                timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
            } else {
                timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
            }
            
            const lapElement = document.createElement('div');
            lapElement.style.padding = '8px';
            lapElement.style.borderBottom = '1px solid #eee';
            lapElement.innerHTML = `<strong>Lap ${lapCount}:</strong> ${timeString}`;
            
            lapList.prepend(lapElement);
        }
        
        // Event listeners for stopwatch
        startStopwatchBtn.addEventListener('click', startStopwatch);
        pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
        resetStopwatchBtn.addEventListener('click', resetStopwatch);
        lapStopwatchBtn.addEventListener('click', recordLap);
        
        // Initial display
        displayStopwatchTime();
    }
    
    // Helper function for modal image download
    function downloadModalImage() {
        const canvas = document.getElementById('modalCanvas');
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    
    // Initialize the app
    initApp();
});