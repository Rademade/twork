import { Response, Request }         from "express";
import Subscription from "../models/Subscription.model";
import _ from "lodash";

export const create =  async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log(await Subscription.findAll());

    const subscription = await Subscription.create({
      endpoint: req.body.endpoint,
      auth: req.body.keys.auth,
      p256dh: req.body.keys.p256dh
    });
    return res.json(subscription);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};