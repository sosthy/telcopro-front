import {Product} from './product.model';
import {Memory} from './memory.model';
import {Camera} from './camera.model';
import {Cpu} from './cpu.model';
import {PortableCategory} from './portable-category.model';
import {PortableItem} from './portable-item.model';
import {Systemos} from './system-os.model';

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
  memory: Memory;
  camera: Camera;
  cpu: Cpu;
  os: Systemos;
  portableCategory: PortableCategory;

  constructor(obj?: any) {
    super();
    this.connection = obj ? (obj.connection ? obj.connection : null) : null;
    this.battery = obj ? (obj.battery ? obj.battery : '') : '';
    this.screen = obj ? (obj.screen ? obj.screen : 0) : 0;
    this.sim = obj ? (obj.sim ? obj.sim : '') : '';
    this.dimension = obj ? (obj.dimension ? obj.dimension : 0) : 0;
    this.weight = obj ? (obj.weight ? obj.weight : 0) : 0;
    this.ipRating = obj ? (obj.ipRating ? obj.ipRating : '') : '';
    this.fingerprint = obj ? (obj.fingerprint ? obj.fingerprint : false) : false;
    this.waterproof = obj ? (obj.waterproof ? obj.waterproof : false) : false;
    this.splashproof = obj ? (obj.splashproof ? obj.splashproof : false) : false;
    this.dushproof = obj ? (obj.dushproof ? obj.dushproof : false) : false;
    this.memory = obj ? (obj.memory ? obj.memory : null) : null;
    this.camera = obj ? (obj.camera ? obj.camera : null) : null;
    this.cpu = obj ? (obj.cpu ? obj.cpu : null) : null;
    this.os = obj ? (obj.os ? obj.os : null) : null;
    this.portableCategory = obj ? (obj.portableCategory ? obj.portableCategory : null) : null;
  }
}
