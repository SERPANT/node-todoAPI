import bookshelf from '../db';

const TABLE_NAME = 'tokenTable';

class Token extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Token;
