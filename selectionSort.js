export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    let minIdx = i;
    animations.push(['comparison1', i, i]); // Mark current as min
    for (let j = i + 1; j < auxiliaryArray.length; j++) {
      animations.push(['comparison2', j, minIdx]); // Compare with min
      if (auxiliaryArray[j] < auxiliaryArray[minIdx]) {
        minIdx = j;
        animations.push(['comparison1', minIdx, minIdx]); // Update min marker
      }
    }
    if (minIdx !== i) {
      animations.push(['swap', i, auxiliaryArray[minIdx]]); // Swap with minimum
      animations.push(['swap', minIdx, auxiliaryArray[i]]);
      let temp = auxiliaryArray[i];
      auxiliaryArray[i] = auxiliaryArray[minIdx];
      auxiliaryArray[minIdx] = temp;
    }
  }
  return animations;
}