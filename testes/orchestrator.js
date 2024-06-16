import retry from "async-retry";

async function WaitForAllServices() {
  await waitForWebServer();
  async function waitForWebServer() {
    return retry(fetchStatusPage, { retires: 100 });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
    }
  }
}

export default {
  WaitForAllServices,
};
