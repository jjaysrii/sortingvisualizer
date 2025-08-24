import React, { Component } from 'react';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort.js';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort.js';
import { getInsertionSortAnimations } from '../SortingAlgorithms/insertionSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/selectionSort.js';
import './SortingVisualizer.css';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      size: 50,
      speed: 5, // Lower is faster
      isRunning: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = [];
    for (let i = 0; i < this.state.size; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  };

  handleChangeSize = (e) => {
    this.setState({ size: parseInt(e.target.value) }, () => this.resetArray());
  };

  handleChangeSpeed = (e) => {
    this.setState({ speed: 51 - parseInt(e.target.value) }); // Higher slider value = slower animation
  };

  visualizeAlgo = (algo) => {
    if (this.state.isRunning) return;
    this.setState({ isRunning: true });
    let animations = [];
    const arrayCopy = this.state.array.slice(); // Work on a copy
    switch (algo) {
      case 'bubble':
        animations = getBubbleSortAnimations(arrayCopy);
        break;
      case 'merge':
        animations = getMergeSortAnimations(arrayCopy);
        break;
      case 'quick':
        animations = getQuickSortAnimations(arrayCopy);
        break;
      case 'insertion':
        animations = getInsertionSortAnimations(arrayCopy);
        break;
      case 'selection':
        animations = getSelectionSortAnimations(arrayCopy);
        break;
      default:
        return;
    }

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].classList.remove('comparing', 'sorted');
    }

    const speed = this.state.speed;
    for (let i = 0; i < animations.length; i++) {
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];
      if (action === 'comparison1') {
        setTimeout(() => {
          arrayBars[barOneIdx].classList.add('comparing');
          arrayBars[barTwoIdxOrHeight].classList.add('comparing');
        }, i * speed);
      } else if (action === 'comparison2') {
        setTimeout(() => {
          arrayBars[barOneIdx].classList.remove('comparing');
          arrayBars[barTwoIdxOrHeight].classList.remove('comparing');
        }, i * speed);
      } else if (action === 'swap' || action === 'overwrite') {
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
          if (i === animations.length - 1) arrayBars[barOneIdx].classList.add('sorted');
        }, i * speed);
      }
    }

    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].classList.add('sorted');
      }
      this.setState({ isRunning: false });
    }, animations.length * speed);
  };

  render() {
    const { array, size, speed, isRunning } = this.state;
    return (
      <div className="visualizer-container">
        <h1 className="app-title">Sorting Algorithm Visualizer</h1>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
                width: `${800 / size}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="controls">
          <label>Array Size: {size}</label>
          <input
            type="range"
            min="10"
            max="200"
            value={size}
            onChange={this.handleChangeSize}
            disabled={isRunning}
          />
          <label>Animation Speed (Fast-Slow): {51 - speed}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={51 - speed}
            onChange={this.handleChangeSpeed}
            disabled={isRunning}
          />
          <button onClick={this.resetArray} disabled={isRunning}>
            Generate New Array
          </button>
          <button onClick={() => this.visualizeAlgo('bubble')} disabled={isRunning}>
            Bubble Sort
          </button>
          <button onClick={() => this.visualizeAlgo('merge')} disabled={isRunning}>
            Merge Sort
          </button>
          <button onClick={() => this.visualizeAlgo('quick')} disabled={isRunning}>
            Quick Sort
          </button>
          <button onClick={() => this.visualizeAlgo('insertion')} disabled={isRunning}>
            Insertion Sort
          </button>
          <button onClick={() => this.visualizeAlgo('selection')} disabled={isRunning}>
            Selection Sort
          </button>
        </div>
      </div>
    );
  }
}

export default SortingVisualizer;