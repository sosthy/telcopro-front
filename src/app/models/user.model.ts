

export class User {
  username = '';
  password = '';

  constructor(obj?: any) {
    this.username = obj ? (obj.username ? obj.username : null) : null;
    this.password = obj ? (obj.password ? obj.password : null) : null;
  }
}
