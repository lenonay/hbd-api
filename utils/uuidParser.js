import { parse as uuidParse, stringify as uuidStringify } from "uuid";

export class UUIDParser {
  static UUIDToBin(uuid) {
    return uuidParse(uuid);
  }

  static binToUUID(bytesBuffer) {
    return uuidStringify(bytesBuffer);
  }
}
