export const Terminals = () => {
  const refreshTerminals = async () => {
    const resp = await fetch("/api/get-terminals");
    const json = await resp.json();

    // setTerminals(json.terminal);
  };

  return <div></div>;
};
