export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function sum(array) {
    return array.reduce((a, b) => a + b, 0)
}
