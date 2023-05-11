import { StartPort } from '../core/start-port';

const startPort = new StartPort();

class RocketService {
  private rockets = startPort.getAllRockets().map((rocket) => rocket.name);

  public getAllSortedRockets(): string {
    return this.rockets.sort().join();
  }

  public getRocketByName(rocketName: string): string | undefined {
    return this.rockets.find(
      (rocket) => rocket.toLowerCase() === rocketName.toLowerCase()
    );
  }

  public isRocketExists(name: string): boolean {
    return this.rockets.some(
      (rocket) => rocket.toLowerCase() === name.toLowerCase()
    );
  }

  public addNewRocket(name: string): void {
    this.rockets.push(name);
  }
}

export const rocketService = new RocketService();
