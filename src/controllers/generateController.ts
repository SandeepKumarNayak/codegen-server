import { Request, Response, NextFunction } from 'express'
import { GenerateRequest } from '../types'
import { streamCodeGeneration } from '../services/geminiService'

export async function generateCode(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const body = req.body as GenerateRequest

        console.log(
            `[GenerateController] Generating code | framework: ${body.framework} | styling: ${body.styling}`
        )

        await streamCodeGeneration(body, res)
    } catch (error) {
        next(error)
    }
}