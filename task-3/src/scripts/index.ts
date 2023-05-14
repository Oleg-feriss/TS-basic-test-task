import { WinStatistic } from './win-statistic';
import { CreateStatFn, Simulation } from './simulation';

const createStat: CreateStatFn = () => new WinStatistic();

Simulation.runSimulation(createStat);
