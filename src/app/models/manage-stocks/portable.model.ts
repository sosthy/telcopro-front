import {Product} from './product.model';
import {Memory} from './memory.model';
import {Camera} from './camera.model';
import {Cpu} from './cpu.model';
import {PortableCategory} from './portable-category.model';
import {PortableItem} from './portable-item.model';
import {SystemOs} from './system-os.model';

export class Portable extends Product {
  connection: string;
  battery: string;
  screen: number;
  sim: string;
  dimension: number;
  weight: number;
  ipRating: string;
  fingerprint: boolean;
  waterproof: boolean;
  splashproof: boolean;
  dushproof: boolean;
  portableItem: PortableItem;
  memory: Memory;
  camera: Camera;
  cpu: Cpu;
  os: SystemOs;
  portableCategory: PortableCategory;

  constructor() {
    super();
  }
}
