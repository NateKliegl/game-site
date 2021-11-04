import { useEffect, useState } from "react";
import axios from "axios";

function useAxios(score, method, body = null) {
  const [json, setJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      if (!score || (method === "post" && !body)) {
        return;
      }
      setLoading(true);
      setJson(null);
      setError(null);
      try {
        const response = await axios[method](score, body);
        setJson(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [score, body, method]);
  return { json, error, loading };
}

export default useAxios;
