import { Random } from 'random-js'

const random = new Random()

const levels = {
    level1: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa'], // Palabras de 2 a 5 letras
    level2: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa', 'perro', 'amigo', 'fruta', 'mujer', 'niño', 'nieve', 'panal', 'luz', 'viento', 'silla'], // Palabras sencillas, sin tildes
    level3: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa', 'perro', 'amigo', 'fruta', 'mujer', 'niño', 'nieve', 'panal', 'luz', 'viento', 'silla', 'plátano', 'juguete', 'coche', 'pelota', 'zapato', 'pájaro', 'niña', 'ratón', 'luna', 'cielo'], // Palabras con acento
    level4: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa', 'perro', 'amigo', 'fruta', 'mujer', 'niño', 'nieve', 'panal', 'luz', 'viento', 'silla', 'plátano', 'juguete', 'coche', 'pelota', 'zapato', 'pájaro', 'niña', 'ratón', 'luna', 'cielo', 'elefante', 'ciudad', 'felicidad', 'delfín', 'ratón', 'camino', 'despacho', 'reconocimiento', 'escuela', 'espejo'], // Palabras más largas y complejas
    level5: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa', 'perro', 'amigo', 'fruta', 'mujer', 'niño', 'nieve', 'panal', 'luz', 'viento', 'silla', 'plátano', 'juguete', 'coche', 'pelota', 'zapato', 'pájaro', 'niña', 'ratón', 'luna', 'cielo', 'elefante', 'ciudad', 'felicidad', 'delfín', 'ratón', 'camino', 'despacho', 'reconocimiento', 'escuela', 'espejo', 'acertijo', 'misterio', 'examen', 'ejercicio', 'esfuerzo', 'mariposa', 'elección', 'teoría', 'relación', 'estrategia'], // Palabras de longitud intermedia
    level6: ['el', 'la', 'es', 'un', 'de', 'en', 'sol', 'luna', 'flor', 'agua', 'rojo', 'gato', 'casa', 'perro', 'amigo', 'fruta', 'mujer', 'niño', 'nieve', 'panal', 'luz', 'viento', 'silla', 'plátano', 'juguete', 'coche', 'pelota', 'zapato', 'pájaro', 'niña', 'ratón', 'luna', 'cielo', 'elefante', 'ciudad', 'felicidad', 'delfín', 'ratón', 'camino', 'despacho', 'reconocimiento', 'escuela', 'espejo', 'acertijo', 'misterio', 'examen', 'ejercicio', 'esfuerzo', 'mariposa', 'elección', 'teoría', 'relación', 'estrategia', 'experimentar', 'estrategia', 'meditación', 'reconocimiento', 'desafío', 'resiliencia', 'extraordinario', 'filosofía', 'progresión', 'conocimiento'], // Palabras complejas
    level7: ['Enhorabuena, has superado todos los niveles!'], // Palabras complicadas y largas
}
// Generar palabras random
function generateRandomWord(level) {
    return random.pick(levels[level]) // Escoge una palabra aleatoria de los niveles
}

// Generar frases
function generateRandomSentences(level, wordCount) {
    if (level === 'level7') return levels.level7.join(' ') // Si es nivel 7, devuelve la frase del nivel

    const sentence = []
    for (let i = 0; i < wordCount; i++) {
        sentence.push(generateRandomWord(level)) // Genera una palabra por nivel
    }

    let punctuation = ''
    if (level !== 'level1' && level !== 'level2' && level !== 'level3') {
        punctuation = random.pick(['.', '!', '?'])
    }
    return sentence.join(' ') + punctuation
}

export { generateRandomWord, generateRandomSentences }
