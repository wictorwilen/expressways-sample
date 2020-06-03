import { way } from "expressways";

export const getMethod1 = way("get", "/", (req, res, next) => {
    res.send("Hello GET");
});

export const getMethod2 = way<{ param: string }, any, any, { query: string }>("get", "/:param", (req, res, next) => {
    res.send(`Parameter is ${req.params.param} and Query string is: ${req.query.query}`);
});

export const ThisIsAString = "This is a string";

export const ThisIsAFunction = () => {
    console.log("Hello world");
}

