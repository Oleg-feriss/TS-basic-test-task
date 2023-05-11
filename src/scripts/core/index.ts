import { StartPort } from './start-port';

const startPort = new StartPort();
const allRockets = startPort.getAllRockets();

for (const [index, rocket] of allRockets.entries()) {
  console.log(`Prepare to the next launch #${index + 1}:`);
  rocket.launch();
}
