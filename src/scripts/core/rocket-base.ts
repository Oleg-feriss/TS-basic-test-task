interface IRocketBase {
  name: string;
  launch: () => void;
}

export abstract class RocketBase implements IRocketBase {
  public abstract name: string;

  public launch(): void {
    console.log(`The ${this.name} launched at ${new Date().toLocaleString()}`);
  }
}
