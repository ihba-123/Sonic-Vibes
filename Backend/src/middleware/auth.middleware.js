import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  //This middleware check whether user is authenticate or not
  if (!req.auth.userId) {
    return res.status(401).json({ message: "You must be login" });
  }
  next();
};

//check admin or not
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL ===
      (await currentUser).primaryEmailAddress?.emailAddress; //Check whether current user is admin base on the email

    if (!isAdmin) {
      return res.status(403).json({ message: "You are not admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error)
  }
};
