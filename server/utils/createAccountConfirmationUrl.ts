import { v4 } from "uuid";
import { ONE_DAY_SECS, IS_PRODUCTION } from "../../config/constants";
import User from "../models/User";
import redis from "../redis";

export default (userId: string): string => {
  const token = v4();
  redis.set(`${token}`, userId, "ex", ONE_DAY_SECS, () => {
    setTimeout(async () => {
      const user = await User.findOne({ where: { id: userId } });
      if (!user?.confirmed) {
        user?.destroy();
      }
    }, ONE_DAY_SECS);
  });
  return IS_PRODUCTION
    ? `https://new-graphql-forum.herokuapp.com/user/confirm/${token}`
    : `http://localhost:4000/user/confirm/${token}`;
};
