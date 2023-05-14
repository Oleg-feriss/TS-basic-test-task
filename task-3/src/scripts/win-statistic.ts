import { Stat } from './simulation';

export class WinStatistic implements Stat {
  private stats: Map<number, number> = new Map();
  private mergedStats: Map<number, number> = new Map();

  private filterAndAddStats(
    statistic: Map<number, number>,
    winAmount: number,
    hitCount: number
  ): void {
    const isWinAmountAlreadyExists = statistic.has(winAmount);

    if (isWinAmountAlreadyExists) {
      let hitCountOfWinAmount = statistic.get(winAmount) as number;
      statistic.set(winAmount, (hitCountOfWinAmount += hitCount));
      return;
    }

    statistic.set(winAmount, hitCount);
  }

  private roundWinAmount(winAmount: number) {
    return Math.round(winAmount * 10) / 10;
  }

  public log(winAmount: number, hitCount: number): void {
    if (winAmount < 0 || hitCount <= 0) {
      return;
    }

    const roundedWinAmount = this.roundWinAmount(winAmount);

    this.filterAndAddStats(this.stats, roundedWinAmount, hitCount);
  }

  public getHitCount(winAmount: number): number {
    const roundedWinAmount = this.roundWinAmount(winAmount);
    const currentHitCountOfWinAmount = this.mergedStats.get(roundedWinAmount);

    if (!currentHitCountOfWinAmount) {
      return 0;
    }

    return currentHitCountOfWinAmount;
  }

  public merge(anotherStat: WinStatistic): void {
    anotherStat.stats.forEach((hitCount, winAmount) => {
      this.filterAndAddStats(this.mergedStats, winAmount, hitCount);
    });
  }

  public print(): void {
    let sumOfAllWins = 0;
    this.mergedStats.forEach((hitCount, winAmount) => {
      sumOfAllWins += winAmount * hitCount;
    });

    let sumOfPossibleWins = 0;
    this.mergedStats.forEach((_hitCount, winAmount) => {
      sumOfPossibleWins += winAmount;
    });

    const averageWinAmount = sumOfPossibleWins / this.mergedStats.size;

    const winAmountArray = Array.from(this.mergedStats.keys());

    const minWinAmount = Math.min(...winAmountArray.filter(Boolean));
    const maxWinAmount = Math.max(...this.mergedStats.keys());

    const sorted = [...this.mergedStats.entries()].sort((a, b) => a[0] - b[0]);

    console.log(`
      Total win amount: ${sumOfAllWins}.
      The average win amount: ${averageWinAmount}.
      The smallest non-zero win is ${minWinAmount}, the biggest is ${maxWinAmount}.

      All unique wins (sorted 0..9) : 
    `);

    sorted.forEach((item, index) => {
      console.log(`${index + 1}. ${item[0]}: ${item[1]}`);
    });
  }
}
