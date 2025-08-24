export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let key = auxiliaryArray[i];
    let j = i - 1;
    animations.push(['comparison1', i, j]); // Mark current and previous for comparison
    while (j >= 0 && auxiliaryArray[j] > key) {
      animations.push(['comparison2', j, j + 1]); // Mark comparison
      animations.push(['swap', j + 1, auxiliaryArray[j]]); // Move larger element
      auxiliaryArray[j + 1] = auxiliaryArray[j];
      j--;
    }
    animations.push(['overwrite', j + 1, key]); // Place key in correct position
    auxiliaryArray[j + 1] = key;
  }
  return animations;
}