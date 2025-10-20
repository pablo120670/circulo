// JavaScript para el texto circular
console.log('Script cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando creación del texto circular');
    
    function createCircularText(element) {
        console.log('Creando texto circular para elemento:', element);
        
        const text = element.getAttribute('data-text') || 'TEXTO CIRCULAR';
        const size = parseInt(element.getAttribute('data-size')) || 200;
        const color = element.getAttribute('data-color') || '#ffffff';
        const speed = parseFloat(element.getAttribute('data-speed')) || 25;
        const fontSize = parseInt(element.getAttribute('data-font-size')) || 12;
        const separator = element.getAttribute('data-separator') || '✦';
        const spacing = parseFloat(element.getAttribute('data-spacing')) || 1.2;
        const separatorMode = element.getAttribute('data-separator-mode') || 'auto';
        const manualText = element.getAttribute('data-manual-text') || text;
        
        console.log('Parámetros:', { text, size, color, speed, fontSize });
        
        let spacedText;
        let repeatedText;
        
        if (separatorMode === 'manual') {
            // Modo manual: usar el texto con guiones y reemplazar por el separador elegido
            spacedText = manualText.replace(/-/g, ` ${separator} `);
            repeatedText = `${spacedText} ${separator} ${spacedText}`;
        } else {
            // Modo automático: dividir el texto en palabras y agregar separadores
            const words = text.split(' ').filter(word => word.trim() !== '');
            spacedText = words.join(` ${separator} `);
            repeatedText = `${spacedText} ${separator} ${spacedText}`;
        }
        
        console.log('Texto procesado:', repeatedText);
        
        // Crear un elemento temporal para medir el texto con espaciado
        const tempText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tempText.setAttribute('font-size', fontSize);
        tempText.setAttribute('font-family', 'Poppins, sans-serif');
        tempText.setAttribute('letter-spacing', `${spacing * 0.1}em`);
        tempText.textContent = spacedText;
        tempText.style.visibility = 'hidden';
        tempText.style.position = 'absolute';
        tempText.style.top = '-9999px';
        
        document.body.appendChild(tempText);
        const textLength = tempText.getComputedTextLength();
        document.body.removeChild(tempText);
        
        console.log('Longitud del texto:', textLength);
        
        // Calcular el radio basado en la longitud del texto con espaciado
        const circumference = textLength * 1.4; // 40% de margen para separadores
        const radius = circumference / (2 * Math.PI);
        const finalRadius = Math.max(radius, size / 4); // Radio mínimo
        
        console.log('Radio calculado:', finalRadius);
        
        // Crear el SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        
        // Crear el path circular
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathId = 'circlePath-' + Math.random().toString(36).substr(2, 9);
        path.setAttribute('id', pathId);
        path.setAttribute('d', `M${size/2},${size/2} m-${finalRadius},0 a${finalRadius},${finalRadius} 0 1,1 ${finalRadius*2},0 a${finalRadius},${finalRadius} 0 1,1 -${finalRadius*2},0`);
        
        // Crear el texto
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('font-size', fontSize);
        textElement.setAttribute('font-family', 'Poppins, sans-serif');
        textElement.setAttribute('fill', color);
        textElement.setAttribute('letter-spacing', `${spacing * 0.1}em`);
        textElement.style.animation = `rotateText ${speed}s linear infinite`;
        textElement.style.transformOrigin = 'center';
        
        const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textPath.setAttribute('href', '#' + pathId);
        textPath.textContent = repeatedText;
        
        textElement.appendChild(textPath);
        
        // Crear el defs
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(path);
        
        svg.appendChild(defs);
        svg.appendChild(textElement);
        
        element.appendChild(svg);
        console.log('SVG creado y agregado al elemento');
    }
    
    // Aplicar a todos los elementos con clase circular-text
    const elements = document.querySelectorAll('.circular-text');
    console.log('Elementos encontrados:', elements.length);
    
    elements.forEach(createCircularText);
    
    // Función para recalcular en caso de redimensionamiento
    window.addEventListener('resize', function() {
        document.querySelectorAll('.circular-text').forEach(function(element) {
            element.innerHTML = '';
            createCircularText(element);
        });
    });
});
