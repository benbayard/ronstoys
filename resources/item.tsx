import { Resource } from 'rest-hooks';

export class ItemResource extends Resource {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly height: number;
  readonly width: number;
  readonly length: number;
  readonly quantity: number;
  readonly accessories: string[] | null;

  pk() {
    return this.id;
  }

  static urlRoot = '/api/items';
}
