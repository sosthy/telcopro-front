import {Product} from './product.model';
import {Memory} from './memory.model';
import {Camera} from './camera.model';
import {Cpu} from './cpu.model';
import {Systemos} from './system-os.model';
import {GenericCategory} from "./category.model";

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
    this.connection = obj ? (obj.connection ? obj.connection : null) : null;
    this.battery = obj ? (obj.battery ? obj.battery : null) : null;
    this.screen = obj ? (obj.screen ? obj.screen : null) : null;
    this.sim = obj ? (obj.sim ? obj.sim : null) : null;
    this.dimension = obj ? (obj.dimension ? obj.dimension : null) : null;
    this.weight = obj ? (obj.weight ? obj.weight : null) : null;
    this.ipRating = obj ? (obj.ipRating ? obj.ipRating : null) : null;
    this.fingerprint = obj ? (obj.fingerprint ? eval(obj.fingerprint) : false) : false;
    this.waterproof = obj ? (obj.waterproof ? eval(obj.waterproof) : false) : false;
    this.splashproof = obj ? (obj.splashproof ? eval(obj.splashproof) : false) : false;
    this.dushproof = obj ? (obj.dushproof ? eval(obj.dushproof) : false) : false;
    this.memory = obj ? (obj.memory ? obj.memory : null) : null;
    this.camera = obj ? (obj.camera ? obj.camera : null) : null;
    this.cpu = obj ? (obj.cpu ? obj.cpu : null) : null;
    this.os = obj ? (obj.os ? obj.os : null) : null;
    this.portableCategory = obj ? (obj.portableCategory ? obj.portableCategory : null) : null;
  }
}
