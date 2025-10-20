// JavaScript simplificado para el texto circular
console.log('Script cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando creación del texto circular');
    
    const circularElement = document.querySelector('.circular-text');
    if (!circularElement) {
        console.error('No se encontró el elemento .circular-text');
        return;
    }
    
    console.log('Elemento encontrado:', circularElement);
    
    // Parámetros básicos
    const text = circularElement.getAttribute('data-text') || 'TEXTO CIRCULAR';
    const size = 400;
    const color = '#00ff88';
    const fontSize = 16;
    
    console.log('Creando SVG con parámetros:', { text, size, color, fontSize });
    
    // Crear SVG simple
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    
    // Crear círculo de fondo para referencia
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', size/2);
    circle.setAttribute('cy', size/2);
    circle.setAttribute('r', size/2 - 20);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#333');
    circle.setAttribute('stroke-width', '1');
    
    // Crear path circular para el texto
    const radius = size/2 - 30;
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
    textElement.style.animation = 'rotateText 20s linear infinite';
    textElement.style.transformOrigin = 'center';
    
    // Crear textPath
    const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textPath.setAttribute('href', '#' + pathId);
    textPath.textContent = text + ' * ' + text + ' * ' + text;
    
    textElement.appendChild(textPath);
    
    // Agregar elementos al SVG
    svg.appendChild(circle);
    svg.appendChild(path);
    svg.appendChild(textElement);
    
    // Limpiar contenido anterior y agregar SVG
    circularElement.innerHTML = '';
    circularElement.appendChild(svg);
    
    console.log('SVG creado y agregado exitosamente');
    
    // Si después de 2 segundos no se ve nada, mostrar el SVG de respaldo
    setTimeout(() => {
        const fallbackSvg = document.getElementById('fallback-svg');
        if (fallbackSvg && circularElement.children.length === 0) {
            console.log('Mostrando SVG de respaldo');
            fallbackSvg.style.display = 'block';
        }
    }, 2000);
});