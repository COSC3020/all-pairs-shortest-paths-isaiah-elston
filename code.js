/*
DISCLAIMER: I worked with Howard Shaw on this assignment. We both contributed to the code and the writeup.
*/

function allPairsShortestPaths(graph, dist = []) {
    for (let list = 0; list < graph.length; list++) {
        dist[list] = new Array(graph.length).fill(Infinity)
        dist[list][list] = 0
        for (let element = 0; element < graph.length; element++) {
            if (graph[list][element] != 0) dist[list][element] = graph[list][element]
        }
    }

    for (let nodeOne = 0; nodeOne < graph.length; nodeOne++) {
        for (let nodeTwo = 0; nodeTwo < graph.length; nodeTwo++) {
            for (let nodeThree = 0; nodeThree < graph.length; nodeThree++) {
                if (dist[nodeTwo][nodeThree] > (dist[nodeTwo][nodeOne] + dist[nodeOne][nodeThree])) 
                    dist[nodeTwo][nodeThree] = dist[nodeTwo][nodeOne] + dist[nodeOne][nodeThree]
            }
        }
    }
    return dist;
}