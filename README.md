# MAPF Bechmark Website
A web-based system for the MAPF community to track and validate the results on [standardised benchmarks](https://movingai.com/benchmarks/mapf/index.html).
- Our website is accessible at: http://tracker.pathfinding.ai
- If you would like to see our system in action, we have a demo video available at: http://tracker.pathfinding.ai/systemDemo.

 
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
The current website can be easily compiled or built using npm, we provide scripts to set up the website in development/deployment mode:
* For development:
```shell script
cd server 
npm run dev
``` 
* For deployment:
```shell script
cd server 
npm run build
node server.js 
```
## Contact
For any question, please contact Bojie.Shen@monash.edu or Zhe.Chen@monash.edu
