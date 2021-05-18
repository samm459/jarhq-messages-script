const axios = require("axios");

async function getJarRequestMessage(email, password, subdomain, request_id) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  const loginRes = await axios.post("https://app.jarhq.com/login.json", {
    user: {
      email,
      password,
    },
  });
  const Cookie = loginRes.headers["set-cookie"];

  let messageRes = await axios.get(`https://${subdomain}.jarhq.com/api/requests/${request_id}/messages.json?page=1&simple=true&totalPages=1`, {
    headers: {
      Cookie,
    },
  });

  return messageRes;
}

(async () => {
  const msg = await getJarRequestMessage(/** TRY WITH YOUR DETAILS */);
  console.log(msg.data);
})();
