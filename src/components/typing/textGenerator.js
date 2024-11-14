import { Random } from 'random-js'

const random = new Random()

const levels = {
    level1: 'abcdefghijkl',
    level2: 'abcdefghijklmnopqrstuvwxyz',
    level3: 'abcdefghijklmnopqrstuvwxyzñáéíóú',
    level4: 'abcdefghijklmnopqrstuvwxyzñáéíóú0123456789',
    level5: 'abcdefghijklmnopqrstuvwxyzñáéíóú0123456789.,!?@#$*&()-=+',
    level6: `abcdefghijklmnopqrstuvwxyzñáéíóú0123456789.,!?@#$*&()-=+<>/[]{}\\|"'`,
    level7: 'Enhorabuena, has superado todos los niveles!' //Sigue practicando para mejorar tu mecanografía!
}

// Generar palabras random
function generateRandomWord(level, minLen = 2, maxLen = 8) {
    const characters = levels[level] //<-//Caracteres que se utilizaran según el nivel
    const wordLength = random.integer(minLen, maxLen) //<-Length de la palabra aleatorio entre minLen y maxLen
    let word = ''

    for (let i = 0; i < wordLength; i++) {
        word += random.pick(characters)
    }

    if (level !== 'level1' && random.bool(0.2)) {
        word = word.charAt(0).toUpperCase() + word.slice(1)
    }

    return word
}

// Generar palabras
function generateRandomSentences(level, wordCount) {
    if (level === 'level7') return levels.level7

    const sentence = []
    for (let i = 0; i < wordCount; i++) {
        sentence.push(generateRandomWord(level))
    }

    let punctuation = ''
    if (level !== 'level1' && level !== 'level2') {
        punctuation = random.pick(['.', '!', '?'])
    } 
    return sentence.join(' ') + punctuation
}

export { generateRandomWord, generateRandomSentences }