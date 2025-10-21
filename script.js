// JavaScript para el texto circular
document.addEventListener('DOMContentLoaded', function() {
    const circularElement = document.querySelector('.circular-text');
    if (!circularElement) return;
    
    // Parámetros
    const text = circularElement.getAttribute('data-text') || 'TEXTO CIRCULAR';
    const size = parseInt(circularElement.getAttribute('data-size')) || 400;
    const color = circularElement.getAttribute('data-color') || '#00ff88';
    const speed = parseFloat(circularElement.getAttribute('data-speed')) || 20;
    const fontSize = parseInt(circularElement.getAttribute('data-font-size')) || 16;
    
    // Crear SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    
    // Círculo de referencia removido
    
    // Crear path circular para el texto
    const radius = size/2 - 40;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathId = 'textPath-' + Date.now();
    path.setAttribute('id', pathId);
    path.setAttribute('d', `M ${size/2 - radius},${size/2} A ${radius},${radius} 0 1,1 ${size/2 + radius},${size/2} A ${radius},${radius} 0 1,1 ${size/2 - radius},${size/2}`);
    path.setAttribute('fill', 'none');
    
    // Crear texto
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('font-size', fontSize);
    textElement.setAttribute('font-family', 'Poppins, sans-serif');
    textElement.setAttribute('fill', color);
    textElement.style.animation = `rotateText ${speed}s linear infinite`;
    textElement.style.transformOrigin = 'center';
    
    // Crear textPath
    const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textPath.setAttribute('href', '#' + pathId);
    textPath.textContent = text + ' * ' + text + ' * ' + text;
    
    textElement.appendChild(textPath);
    
    // Agregar elementos al SVG
    svg.appendChild(path);
    svg.appendChild(textElement);
    
    // Limpiar y agregar SVG
    circularElement.innerHTML = '';
    circularElement.appendChild(svg);
});