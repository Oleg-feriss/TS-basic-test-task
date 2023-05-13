import { Stat } from './simulation';

interface StatInformation {
  winAmount: number;
  hitCount: number;
}

export class WinStatistic implements Stat {
  private stats: StatInformation[] = [];
  private mergedStats: StatInformation[] = [];

  public log(winAmount: number, hitCount: number): void {
    if (winAmount < 0 || hitCount <= 0) {
      return;
    }

    const roundedWinAmount = Math.round(winAmount * 10) / 10;

    const isAlreadyWinAmount = this.stats.find(
      (stat) => stat.winAmount === roundedWinAmount
    );

    if (isAlreadyWinAmount) {
      isAlreadyWinAmount.hitCount += hitCount;
      return;
    }

    this.stats.push({ winAmount: roundedWinAmount, hitCount });
  }

  public getHitCount(winAmount: number): number {
    const currentWinAmount = this.mergedStats.find(
      (mergedStat) => mergedStat.winAmount === Math.round(winAmount * 10) / 10
    );

    if (!currentWinAmount) {
      return 0;
    }

    return currentWinAmount.hitCount;
  }

  public merge(anotherStat: WinStatistic): void {
    if (!this.mergedStats.length) {
      this.mergedStats = [...anotherStat.stats];
      return;
    }

    this.mergedStats = this.mergedStats.reduce((accumulator, current) => {
      const { winAmount, hitCount } = current;

      const existingWinAmount = anotherStat.stats.find((stat) => {
        return winAmount === stat.winAmount;
      });

      if (existingWinAmount) {
        accumulator.push({
          winAmount,
          hitCount: hitCount + existingWinAmount.hitCount,
        });

        return accumulator;
      }

      accumulator.push(current);
      return accumulator;
    }, [] as StatInformation[]);
  }

  public print(): void {
    const sumOfAllWins = this.mergedStats.reduce((accumulator, mergedStat) => {
      return accumulator + mergedStat.winAmount * mergedStat.hitCount;
    }, 0);

    const averageWinAmount =
      this.mergedStats.reduce((averageAmount, mergedStat) => {
        return averageAmount + mergedStat.winAmount;
      }, 0) / this.mergedStats.length;

    const minMaxWinAmount = this.mergedStats
      .filter((mergedStat) => mergedStat.winAmount > 0)
      .reduce(
        ([min, max], stat) => {
          return [Math.min(min, stat.winAmount), Math.max(max, stat.winAmount)];
        },
        [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
      );

    const sorted = [...this.mergedStats].sort(
      (a, b) => a.winAmount - b.winAmount
    );

    console.log(`
      Total win amount: ${sumOfAllWins}.
      The average win amount: ${averageWinAmount}.
      The smallest non-zero win is ${minMaxWinAmount[0]}, the biggest is ${minMaxWinAmount[1]}.

      All unique wins (sorted 0..9) : 
    `);

    sorted.forEach((item, index) => {
      console.log(`${index + 1}. ${item.winAmount}: ${item.hitCount}`);
    });
  }
}
