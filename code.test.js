// DISCLAIMER: I worked with Howard Shaw on this assignment. We both contributed to the code, testing code, and writeup.

// Idea was inspired by IshitaPatel18's testing code when they mentioned
// using Dijkstra's to find the solutions for their graphs. Additionally
// used the following as a reference:
// https://dev.to/glebec/property-testing-with-jsverify-part-i-3one

const fs = require('fs');
const jsc = require('jsverify');
// const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

// arbitrarily chosen limits. NUM doesn't seem to make a significant
// difference in runtime. LEN however will finish tests up to 300, 
// but it takes several minutes, anything over 100 starts to slow down
// noticeably and thus 100 was chosen as a 'good-enough' value
const LIMIT_LEN = 100
const LIMIT_NUM = 500

// generates randomized matrix representation of size (0 to LIMIT_LEN) squared
const randGraph = () => {
    const randInt = (N) => Math.floor(Math.random() * N)
    let rand = randInt(LIMIT_LEN)
    let n = new Array(rand)
    for (let i = 0; i < n.length; i++) {
        n[i] = new Array(rand)
        for (let j = 0; j < n.length; j++) n[i][j] = (i == j) ? 0 : randInt(LIMIT_NUM)
    }
    return n
}

// used to dynamically find solutions to generated graphs, syntax
// was made a bit unreadable for the sake of brevity but it's just 
// our Dijkstra's implementation refactored
const dijkstra = (graph, sourceNode, dist = [], visited = [], currentNode = 0) => {
    for (let i = 0; i < graph.length; i++) dist[i] = (i == sourceNode) ? 0 : Infinity
    while (visited.length != graph.length) {
        let currentDist = Infinity
        for (let i = 0; i < graph.length; i++)
            if ((dist[i] < currentDist) && (!visited.includes(i))) {
                currentDist = dist[i]
                currentNode = i
            }
        visited.push(currentNode)
        for (let i = 0; i < graph.length; i++)
            if (graph[currentNode][i] > 0) {
                let newDist = Math.min(dist[i], dist[currentNode] + graph[currentNode][i])
                dist[i] = (newDist != 0 && i != currentNode) ? newDist : dist[i]
            }
    }
    return dist;
}

// uses Dijktra's algorithm to find all pairs shortest paths for each randomly generated graph
const allPairsSolution = (graph) => {
    let res = new Array()
    for (let i = 0; i < graph.length; i++) res[i] = dijkstra(graph, i) 
    return res
}

// doesn't technically use 'n', but runs plenty of tests with random graphs
const test =
    jsc.forall("nat", function(n) {
        graph = randGraph()
        return JSON.stringify(allPairsSolution(graph)) ==
        JSON.stringify(allPairsShortestPaths(graph))
    })
jsc.assert(test)