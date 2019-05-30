export type PromiseJob = () => void;

export default class PromiseMock {
  static waiting: PromiseJob[];

  static clear(): void;
  static getResult<T>(promise: Promise<T>): T;
  static install(): void;
  static run(count?: number): void;
  static runAll(strict?: boolean): void;
  static uninstall(): void;
}
