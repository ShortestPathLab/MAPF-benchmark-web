# MAPF Bechmark Website
An improvement technique of Conflict-Based Search (CBS) [1] for Multi-Agent Path Finding (MAPF).
CHBP reasons the conflicts beyond the two agents and allow us to (i) generate stronger heuristics; and (ii) explore more bypasses. 
CHBP can seamlessly integrate with the current state-of-the-art solver CBSH2-RTC. 
Experimental results show that CHBP improves CBSH2-RTC by solving more instances. 
On the co-solvable instances, CHBP runs faster than CBSH2-RTC with speedups ranging from several factors to over one order of magnitude.

 
## Requirements 
The implementation requires the external libraries: [nodejs](https://nodejs.org/en). 

If you are using Ubuntu, you can install them simply by:
```shell script
sudo apt install nodejs
sudo apt install npm
``` 
If you are using Mac, you can install them simply by:
```shell script
brew install node
```
If the above methods do not work, you can also follow the instructions
on the [website](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) and install it manually.

## Compiling and Running
The current website can be easily compiled or built using npm 


For development:
```shell script
cd server 
npm run dev
``` 

For deployment:
```shell script
cd server 
npm run build
node server.js 
``` 

