export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSortHelper(auxiliaryArray, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(auxiliaryArray, startIdx, endIdx, animations);
  quickSortHelper(auxiliaryArray, startIdx, pivotIdx - 1, animations);
  quickSortHelper(auxiliaryArray, pivotIdx + 1, endIdx, animations);
}

function partition(auxiliaryArray, startIdx, endIdx, animations) {
  const pivotValue = auxiliaryArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push(['comparison1', i, endIdx]);
    animations.push(['comparison2', i, endIdx]);
    if (auxiliaryArray[i] < pivotValue) {
      animations.push(['swap', i, auxiliaryArray[pivotIdx]]);
      animations.push(['swap', pivotIdx, auxiliaryArray[i]]);
      swap(auxiliaryArray, i, pivotIdx);
      pivotIdx++;
    }
  }
  animations.push(['swap', pivotIdx, auxiliaryArray[endIdx]]);
  animations.push(['swap', endIdx, auxiliaryArray[pivotIdx]]);
  swap(auxiliaryArray, pivotIdx, endIdx);
  return pivotIdx;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}