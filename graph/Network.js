function solution(n, computers) {
  const bfs = (graph, start) => {
    const queue = [start];
    const visited = Array.from({ length: n }, (_, idx) => ({
      node: idx,
      visited: false,
    }));
    visited[start].visited = true;

    while (queue.length > 0) {
      const popedFromQueue = queue.shift();

      for (let i = 0; i < graph[popedFromQueue].length; i++) {
        if (graph[popedFromQueue][i]) {
          if (!visited[i].visited) {
            queue.push(i);
            visited[i].visited = true;
          }
        }
      }
    }
    // 네트워크가 형성된 컴퓨터 리스트 반환
    return visited.filter((node) => node.visited).map((node) => node.node);
  };

  let computerList = Array.from({ length: n }, (_, idx) => idx);

  let count = 0;

  while (computerList.length > 0) {
    const popedFromList = computerList.pop();

    const networkedList = bfs(computers, popedFromList);

    networkedList.forEach((computer) => {
      computerList = computerList.filter((node) => node !== computer);
    });

    count += 1;
  }

  return count;
}
