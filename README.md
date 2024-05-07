[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/2i4vCRmk)
# All Pairs Shortest Paths

**Disclaimer:** I worked with Howard Shaw on this assignment. 

In the lectures, we've seen Dijkstra's algorithm for finding the shortest paths
from a given vertex to all other vertices in the graph. We've also covered the
Floyd-Warshall algorithm for finding the shortest path between all *pairs* of
vertices. It works as follows:

Given a graph $G = (V, E)$ with weighted edges:
- initialize a $|V|\times|V|$ matrix `dist` to $\infty$
- for each vertex $v \in V$, `dist[v][v] = 0`
- for each edge $(u,v) = e \in E$, `dist[u][v] = weight((u,v))`
- for each vertex $k\in V$:
    - for each vertex $i\in V$:
        - for each vertex $j\in V$:
            - `if dist[i][j] > dist[i][k] + dist[k][j]:`
              `dist[i][j] = dist[i][k] + dist[k][j]`

Implement this algorithm, starting with the template I provided in `code.js`.
The function takes a weighted graph graph and returns the matrix with the
distances, as described above. You can choose any data structures you like for
the implementation.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case time complexity ($\Theta$) of the algorithm? Add your
answer, including your reasoning, to this markdown file.

### Answer

#### TL;DR

`allPairsShortestPaths` $\in \mathrm{\Theta}(|V|^{3})$

#### Reasoning

Our implementation of `allPairsShortestPaths` has two sets of nested `for` loops that are each non-constant. The first set of nested `for` loops is initializing an adjacency matrix that is equivalent in size to the input graph. The new matrix is representing the distances between any two arbitrary vertices of the input graph. Since these `for` loops are creating a whole new graph comprised of adjacency *matrices*, and we know that this new graph will be equivalently sized to the input graph, we know that the runtime **must** be $\mathrm{\Theta}(|V|^{2})$. That follows naturally because it will have to go through and create vertex to ensure the size is equivalent.

The latter set of three nested `for` loops goes through each and every node in the input graph and determines the length between them. In the worst case, each `for` loop would have to parse through the entire length of the input graph in order to check the distance between each node from any position. Since we know that it takes $\mathrm{\Theta}(|V|)$ to iterate through every vertex in an adjacency *matrix*, it follows very naturally that three nested `for` loops that iterate through the number of vertices in the same graph would have a runtime complexity of: $\mathrm{\Theta}(|V| * |V| * |V|) \equiv \mathrm{\Theta}(|V|^{3})$.

In conclusion, since each set of nested `for` loops are sequential to each other, we know the worst-case time complexity will be $\mathrm{\Theta}(|V|^{3} + |V|^{2}) \implies \mathrm{\Theta}(|V|^{3})$.