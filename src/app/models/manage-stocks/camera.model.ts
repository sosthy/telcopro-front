
export class Camera {
  id: number;
  frontCamera: number;
  backCamera: number;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.frontCamera = obj ? (obj.frontCamera ? obj.frontCamera : null) : null;
    this.backCamera = obj ? (obj.backCamera ? obj.backCamera : null) : null;
  }
}
