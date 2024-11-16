import { Random } from 'random-js'

const random = new Random()

const levels = {
    level1: 'abcdef',
    level2: 'abcdefghijklmnopqrstuvwxyz',
    level3: 'abcdefghijklmnopqrstuvwxyzñ',
    level4: 'abcdefghijklmnopqrstuvwxyzñ0123456789',
    level5: 'abcdefghijklmnopqrstuvwxyzñ0123456789',
    level6: 'abcdefghijklmnopqrstuvwxyzñ0123456789',
    level7: 'Enhorabuena, has superado todos los niveles! Sigue practicando para mejorar tu mecanografía!'
}

const symbols = '.,!?@#$*&()-=+<>/[]{}\\|\'"'
const accent = 'áéíóú'

// Generar palabras random
function generateRandomWord(level, minLen = 2, maxLen = 8) {
    const characters = levels[level] //<-//Caracteres que se utilizaran según el nivel
    const wordLength = random.integer(minLen, maxLen) //<-Length de la palabra aleatorio entre minLen y maxLen
    let word = ''

    // Incluir símbolos en los niveles 5 y 6
    for (let i = 0; i < wordLength; i++) {
        // Añadir un símbolo con cierta probabilidad dependiendo del nivel
        if ((level === 'level5' && random.bool(0.1)) || (level === 'level6' && random.bool(0.2))) {
            word += random.pick(symbols); // Añadir símbolos
        } else if ((level === 'level3' && random.bool(0.05)) || (level === 'level4' && random.bool(0.1)) || (level === 'level5' && random.bool(0.15)) || (level === 'level6' && random.bool(0.2))) {
            word += random.pick(accent)// Añadir acentos
        } else {
            word += random.pick(characters); // Añadir un carácter del nivel
        }
    }

    if (level !== 'level1' && random.bool(0.3)) {
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
    if (level !== 'level1' && level !== 'level2' && level  !== 'level3') {
        punctuation = random.pick(['.', '!', '?'])
    } 
    return sentence.join(' ') + punctuation
}

export { generateRandomWord, generateRandomSentences }