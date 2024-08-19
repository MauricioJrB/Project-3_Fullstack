export default class UserNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFound';
  }
}
