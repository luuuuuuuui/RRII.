// Define tu malla aquí
const malla = [
    { nombre: "Introducción al Derecho", correlativas: [] },
    { nombre: "Derecho Constitucional I", correlativas: ["Introducción al Derecho"] },
    { nombre: "Derecho Constitucional II", correlativas: ["Derecho Constitucional I"] },
    { nombre: "Derecho Internacional Público", correlativas: ["Derecho Constitucional II"] }
];

// Guarda el progreso en localStorage
let aprobadas = JSON.parse(localStorage.getItem('aprobadas')) || [];

function renderMalla() {
    const container = document.getElementById('malla');
    container.innerHTML = '';

    malla.forEach(materia => {
        const bloqueada = materia.correlativas.some(c => !aprobadas.includes(c));
        const aprobada = aprobadas.includes(materia.nombre);

        const div = document.createElement('div');
        div.className = 'materia';
        if (aprobada) div.classList.add('aprobada');
        if (bloqueada && !aprobada) div.classList.add('bloqueada');

        div.textContent = materia.nombre;

        if (!bloqueada) {
            div.addEventListener('click', () => {
                if (aprobada) {
                    aprobadas = aprobadas.filter(m => m !== materia.nombre);
                } else {
                    aprobadas.push(materia.nombre);
                }
                localStorage.setItem('aprobadas', JSON.stringify(aprobadas));
                renderMalla();
            });
        }

        container.appendChild(div);
    });
}

renderMalla();
