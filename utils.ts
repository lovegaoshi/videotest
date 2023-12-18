export const DEFAULT_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46";

export const parseBodyParams = (body: any) => {
  const formBody = [];
  for (const [key, value] of Object.entries(body)) {
    formBody.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );
  }
  return formBody.join("&");
};

export default async function BiliFetch(
  url: string,
  paramsProp: NoxNetwork.RequestInit | RequestInit = {
    method: "GET",
    headers: {},
    credentials: "omit",
  }
) {
  // BREAKING: does 2s timeout break stuff? does this work at all?
  const params = { timeout: 2000, ...paramsProp };
  if (Object.entries(params.headers).length === 0) {
    params.headers = customReqHeader(url, params.headers);
  }
  params.headers = new Headers({
    "User-Agent": DEFAULT_UA,
    ...params.headers,
  });
  // https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch

  if (
    params.body &&
    params.headers.get("Content-Type") === "application/x-www-form-urlencoded"
  ) {
    params.body = parseBodyParams(params.body);
  }
  return fetch(url, params);
}

/**
 *
 * @param url
 * @param reqHeader
 * @returns
 */
export const customReqHeader = (
  url: string,
  reqHeader: { [key: string]: any } = {}
) => {
  if (
    /bilibili/.exec(url) ||
    /bilivideo/.exec(url) ||
    /akamaized.net/.exec(url)
  ) {
    reqHeader.referer = "https://www.bilibili.com/";
  } else if (/y.qq.com/.exec(url)) {
    reqHeader.referer = "https://y.qq.com/";
  } else if (/u.qq.com/.exec(url)) {
    reqHeader.referer = "https://u.qq.com/";
  } else if (/i.qq.com/.exec(url)) {
    reqHeader.referer = "https://i.qq.com/";
  }
  reqHeader["User-Agent"] = DEFAULT_UA;
  return reqHeader;
};
