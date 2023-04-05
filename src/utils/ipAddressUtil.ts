import axios from "axios";

/** Gets the IP address for the current user
 * @returns {Promise<string | null>}
 */
export const getUserIpAddress = async () => {
  try {
    const resp = await axios("https://www.cloudflare.com/cdn-cgi/trace");
    const data = resp.data;
    const result = data.trim().split("\n").reduce((obj, pair) => {
      const [key, value] = pair.split("=");
      obj[key] = value;
      return obj;
    }, {});

    return result.ip || null;
  } catch (e) {
    console.log("Error getting server IP address:", e);
    return null;
  }
}