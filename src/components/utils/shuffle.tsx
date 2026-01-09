export function FisherYatesShuffle(array: any[]) {
    let n = array.length;

    // Iterate from the last element to the first
    while (n > 1) {
        // Generate a random index between 0 and n-1
        const randomIndex = Math.floor(Math.random() * n);
        n--;

        // Swap the current element with the randomly chosen one
        [array[n], array[randomIndex]] = [array[randomIndex], array[n]];
    }

    return array;
}