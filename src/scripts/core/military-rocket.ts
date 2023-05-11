import { RocketBase } from './rocket-base';

export class MilitaryRocket extends RocketBase {
  public name = 'TOP SECRET';

  public launch(): void {
    console.log('TOP SECRET');
  }
}
