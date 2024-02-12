export class ErrEmptyRecord extends Error {
  constructor() {
    super('record is empty');
  }
}

export class ErrDuplicatedRecord extends Error {
  constructor() {
    super('duplicated record');
  }
}
