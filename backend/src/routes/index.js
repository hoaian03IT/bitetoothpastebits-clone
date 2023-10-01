import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js";
import adminRouter from "./adminRouter.js";

function routes(app) {
    app.use("/user", userRouter);
    app.use("/products", productRouter);
    app.use("/admin", adminRouter);
}

export { routes };
