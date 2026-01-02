import { createHash } from "node:crypto"

export function hashIp(ip: string): string {
  const salt = process.env.SALT_IP
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
} 
