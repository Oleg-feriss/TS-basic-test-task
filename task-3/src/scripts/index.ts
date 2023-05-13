import { WinStatistic } from './win-statistic';
import { CreateStatFn, Simulation, Stat } from './simulation';

// const winStatistic: Stat = new WinStatistic();
const createStat: CreateStatFn = () => new WinStatistic();

Simulation.runSimulation(createStat);
