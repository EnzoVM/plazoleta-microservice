import { Router } from "express"
import { verifyHealth } from "../controllers/health.controller"

const healthRoutes = Router()

healthRoutes
    .get('/health', verifyHealth)

export default healthRoutes