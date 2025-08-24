export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  bubbleSortHelper(auxiliaryArray, animations);
  return animations;
}

function bubbleSortHelper(auxiliaryArray, animations) {
  const n = auxiliaryArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push(['comparison1', j, j + 1]);
      animations.push(['comparison2', j, j + 1]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push(['swap', j, auxiliaryArray[j + 1]]);
        animations.push(['swap', j + 1, auxiliaryArray[j]]);
        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
    }
  }
}