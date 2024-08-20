export default class AnimeNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'AnimeNotFound';
  }
}
