import { Request, Response } from "express";

export const verifyHealth = (req: Request, res: Response) => {
    res.sendStatus(200)
}