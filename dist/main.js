"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://thepropertist-frontend.vercel.app",
            process.env.FRONTEND_URL,
        ].filter(Boolean),
        credentials: true,
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`Server is Running on PORT: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map