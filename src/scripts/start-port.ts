import { RocketBase } from './rocket-base';
import { SpaceXRocket } from './spacex-rocket';
import { NasaRocket } from './nasa-rocket';
import { MilitaryRocket } from './military-rocket';

export class StartPort {
  public getAllRockets(): RocketBase[] {
    const possibleRockets = [SpaceXRocket, NasaRocket, MilitaryRocket];
    const rockets: RocketBase[] = [];

    for (let i = 0; i < 10; i++) {
      const rocket = new possibleRockets[
        Math.floor(Math.random() * possibleRockets.length)
      ]();

      rockets.push(rocket);
    }

    return rockets;
  }
}
