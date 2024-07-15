import retry from "async-retry";

async function WaitForAllServices() {
  await waitForWebServer();
  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retires: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status != 200) {
        throw Error();
      }
    }
  }
}
const orchestrator = {
  WaitForAllServices,
};
export default orchestrator;
