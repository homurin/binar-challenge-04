import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
console.info(__fileName);
console.info(__dirName);
console.info(import.meta.url);
