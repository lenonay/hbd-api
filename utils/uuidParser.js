import {
  parse as uuidParse,
  stringify as uuidStringify,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

export class UUIDParser {
  static UUIDToBin(uuid) {
    return Buffer.from(uuidParse(uuid));
  }

  static binToUUID(bytesBuffer) {
    return uuidStringify(bytesBuffer);
  }

  static validateUUID(uuidString) {
    return uuidValidate(uuidString) && uuidVersion(uuidString) === 4;
  }
}
