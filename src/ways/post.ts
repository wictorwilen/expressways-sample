import { way } from "expressways";

export const postMethod = way("post", "/", async (req, res, next) => {
    res.send("Hello POST");
});

export const postMethod2 = way<{ param: string }, { data: string }, { result: string }, { query: string }>("post", "/:param", (req, res, next) => {
   console.log(req.body)
    res.send({ result: req.body.data });
});
