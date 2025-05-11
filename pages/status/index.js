import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 200,
  });
  let UpdateAtText = "LOADING...";
  if (!isLoading && data) {
    UpdateAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Last update: {UpdateAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseStatusInformation = "Loading...";
  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Version: {data.dependencies.database.postgres_version}</div>
        <div>
          Opened Connections: {data.dependencies.database.connection_used}
        </div>
        <div>Max Connections: {data.dependencies.database.max_connections}</div>
      </>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
