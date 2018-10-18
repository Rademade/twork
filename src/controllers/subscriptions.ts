import { Response, Request }         from "express";
import { Subscription } from "../entity/Subscription";
import _ from "lodash";

export const create =  async (req: Request, res: Response) => {
  try {
    const subscriptionParams = {
      endpoint: req.body.endpoint,
      auth: req.body.keys.auth,
      p256dh: req.body.keys.p256dh
    };
    console.log("subscription create", subscriptionParams);

    const subscription = Object.assign(new Subscription(), subscriptionParams);
    await subscription.save();
    return res.json({});
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};