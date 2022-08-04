import { Venmo } from "venmo-typescript";

// Create a venmo client.
// Reference : https://github.com/austenstone/venmo-typescript

const v = new Venmo();
await v.easyLogin(process.env.EMAIL, process.env.PASSWORD);

const usernames = process.env.USERNAMES?.split(",") || [];
// For each recipient username
for (const username of usernames) {
  // Query user so we can get the id.
  const user = await v
    .userQuery(username)
    ?.find((user) => user.username.toLowerCase() === username.toLowerCase());
  if (user) {
    // Request payment with the user id.
    const paymentRes = await v.pay(
      user.id,
      -1,
      "Note for transaction.",
      "private"
    );
  }
}
