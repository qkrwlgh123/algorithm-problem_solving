/** 최소힙 클래스 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx].distance <= this.heap[index].distance) break;
      this.swap(parentIdx, index);
      index = parentIdx;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastNode;
      this.bubbleDown();
    }

    return root;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].distance < this.heap[smallest].distance
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].distance < this.heap[smallest].distance
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }
}

function solution(N, road, K) {
  /** 노드별 최단거리 리스트 ({ node: 0, cost: 3}) 출발노드 거리 초기화 */
  const nodesDistanceList = Array.from({ length: N }, (_, idx) => ({
    node: idx,
    distance: Infinity,
  }));
  nodesDistanceList[0].distance = 0;

  /** 최소힙 */
  const minHeap = new MinHeap();
  minHeap.push(nodesDistanceList[0]);

  /** 방문한 노드 리스트 (0, 1, 2) */
  const visitedNodeList = Array.from({ length: N }, () => false);

  /** 인접행렬 초기화 */
  road.sort((a, b) => b[2] - a[2]);

  const matrix = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );

  road.forEach((roadInfo) => {
    const startNode = roadInfo[0] - 1;
    const arrivalNode = roadInfo[1] - 1;
    const cost = roadInfo[2];

    matrix[startNode][arrivalNode] = cost;
    matrix[arrivalNode][startNode] = cost;
  });

  while (minHeap.heap.length > 0) {
    const { node, distance } = minHeap.pop();

    if (visitedNodeList[node]) continue;

    for (let i = 0; i < matrix[node].length; i++) {
      if (matrix[node][i] === 0) continue;

      const prevDistance = nodesDistanceList[node].distance;
      const weight = matrix[node][i];

      if (prevDistance + weight < nodesDistanceList[i].distance) {
        nodesDistanceList[i].distance = prevDistance + weight;
        minHeap.push({ node: i, distance: nodesDistanceList[i].distance });
      }
    }
    visitedNodeList[node] = true;
  }

  return nodesDistanceList
    .map((node) => node.distance)
    .filter((distance) => distance <= K).length;
}
