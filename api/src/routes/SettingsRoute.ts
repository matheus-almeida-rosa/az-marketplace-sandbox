import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";

import { RouteConfig, BaseRoute, RoutePrefix } from "./BaseRoute";
import { ISettingsService } from "../types";

@injectable()
@RoutePrefix("/settings")
export default class SettingsRoute extends BaseRoute {

    constructor(@inject("ISettingsService") private settingsService: ISettingsService) {
        super();
    }

    @RouteConfig("get", "/t")
    async t(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(200).json("hi");

    }
    @RouteConfig("get", "/")
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            var settings = await this.settingsService.getSettings();
            delete settings.__v;
            delete settings._id;
            res.status(200).json(settings);
        } catch (error) {
            next(error);
        }
    }

    @RouteConfig("post", "/")
    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.settingsService.updateSettings(req.body);
            res.status(200).json("OK");
        }
        catch (error) {
            next(error);
        }
    }
}