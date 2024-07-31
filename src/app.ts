import { Server } from "./infrastructure/http/express/server";

(() => {
  main();
})();

function main() {
  Server.start();
}
