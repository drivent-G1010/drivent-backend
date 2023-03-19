import { GetActivitiesDate } from "@/services/activities-service";
import Joi from "joi";

export const getActivitiesDateSchema = Joi.object<GetActivitiesDate>({
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}).required();
