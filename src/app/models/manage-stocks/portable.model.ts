import {Product} from './product.model';
import {Memory} from './memory.model';
import {Camera} from './camera.model';
import {Cpu} from './cpu.model';
import {Systemos} from './system-os.model';
import {GenericCategory} from './category.model';

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
  portableCategory: GenericCategory;

  constructor(obj?: any) {
    super(obj);
    this.connection = obj ? (obj.connection ? obj.connection : '') : '';
    this.battery = obj ? (obj.battery ? obj.battery : '') : '';
    this.screen = obj ? (obj.screen ? obj.screen : 0) : 0;
    this.sim = obj ? (obj.sim ? obj.sim : '') : '';
    this.dimension = obj ? (obj.dimension ? obj.dimension : '') : '';
    this.weight = obj ? (obj.weight ? obj.weight : 0) : 0;
    this.ipRating = obj ? (obj.ipRating ? obj.ipRating : '') : '';
    this.fingerprint = obj ? (obj.fingerprint ? eval(obj.fingerprint) : false) : false;
    this.waterproof = obj ? (obj.waterproof ? eval(obj.waterproof) : false) : false;
    this.splashproof = obj ? (obj.splashproof ? eval(obj.splashproof) : false) : false;
    this.dushproof = obj ? (obj.dushproof ? eval(obj.dushproof) : false) : false;
    this.memory = obj ? (obj.memory ? obj.memory : new Memory()) : new Memory();
    this.camera = obj ? (obj.camera ? obj.camera : new Camera()) : new Camera();
    this.cpu = obj ? (obj.cpu ? obj.cpu : new Cpu()) : new Cpu();
    this.os = obj ? (obj.os ? obj.os : new Systemos()) : new Systemos();
    this.portableCategory = obj ? (obj.portableCategory ? obj.portableCategory : new GenericCategory()) : new GenericCategory();
  }
}
