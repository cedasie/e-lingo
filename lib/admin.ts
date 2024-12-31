import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2g0mm3WOb4jrzS53Mw36jr01ZCP"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
