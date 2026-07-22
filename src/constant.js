import { config } from "dotenv";

config();
const ENV = (process?.env || {});

export {
    ENV
}