
export class Camera {
  id: number;
  frontCamera: number;
  backCamera: number;
// <<<<<<< HEAD

  /*constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.frontCamera = obj ? (obj.frontCamera ? obj.frontCamera : 0) : 0;
    this.backCamera = obj ? (obj.backCamera ? obj.backCamera : 0) : 0;*/
// =======
   constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.frontCamera = obj ? (obj.frontCamera ? obj.frontCamera : '') : '';
    this.backCamera = obj ? (obj.backCamera ? obj.backCamera : '') : '';
 // >>>>>>> 820d882cb7b5bf950e5dfcc7d1e80171ff1f4757
  }
}
