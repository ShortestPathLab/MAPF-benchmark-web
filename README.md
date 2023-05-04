# MAPF Bechmark Website
An improvement technique of Conflict-Based Search (CBS) [1] for Multi-Agent Path Finding (MAPF).
CHBP reasons the conflicts beyond the two agents and allow us to (i) generate stronger heuristics; and (ii) explore more bypasses. 
CHBP can seamlessly integrate with the current state-of-the-art solver CBSH2-RTC. 
Experimental results show that CHBP improves CBSH2-RTC by solving more instances. 
On the co-solvable instances, CHBP runs faster than CBSH2-RTC with speedups ranging from several factors to over one order of magnitude.

 
## Requirements 
The implementation requires the external libraries: [CMake](https://cmake.org) and [Boost](https://www.boost.org/). 


Deployment:
```shell script
cd server 
npm run build
node server.js 
``` 

Development:
```shell script
cd server 
npm run dev
``` 
