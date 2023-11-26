export {};

declare global {
  var _mongo: Promis<MongoClient> | undefined
}