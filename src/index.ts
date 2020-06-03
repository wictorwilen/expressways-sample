import express from "express";
import { expressways } from "expressways";
const app = express();
const port = 3000

app.use(express.json({
    verify: (req, res, buf: Buffer, encoding: string): void => {
        (req as any).rawBody = buf.toString();
    }
}));

app.get("/", (req, res) => res.send("Hello World!"))

app.use("/test", expressways({
    ways: require("./ways")
}));

import("./ways").then(ways => {
    app.use("/test2", expressways({
        ways: ways,
        handlers: [
            (req, res, next) => {
                res.setHeader("X-expressways", "true");
                next();
            }
        ]
    }));
});

const customRouter = () => {
    const router = express.Router();
    router.use((req, res, next) => {
        res.setHeader("X-expressways", "true");
        next();
    })
    expressways({
        ways: require("./ways"),
        log: console.debug,
        router: router
    })
    return router;
}
app.use("/custom", customRouter());

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))