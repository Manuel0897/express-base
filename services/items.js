const MongoLib = require('../lib/mongo');

class ItemsService {
  constructor() {
    this.collection = 'items';
    this.mongoDB = new MongoLib();
  }
  async getItems({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const items = await this.mongoDB.getAll(this.collection, query);
    return items || [];
  }

  async getItem({ itemId }) {
    const item = await this.mongoDB.get(this.collection, itemId);
    return item || {};
  }

  async createItem({ item }) {
    const createItemId = await this.mongoDB.create(this.collection, item)
    return createItemId || {};
  }

  async updateItem({ itemId, item } = {}) {
    const updateItem = await this.mongoDB.updated(this.collection, itemId, item);
    return updateItem;
  }

  async deletedItem({ itemId }) {
    const deletedItemId = await this.mongoDB.delete(this.collection, itemId);
    return deletedItemId;
  }


}

module.exports = ItemsService;

