// get keys function
// delete keys funtion
// store key and value


import { initlializeRedisClient } from "./redisClient.js";


export async  function  setToJSon(key:string, data: Record<string, unknown>, ttl: Date | null = null){
  const client = await initlializeRedisClient()
  if(ttl)
  {
    return client.set(key, JSON.stringify(data), { PX :  ttl.getTime() - Date.now() } )
  }
  return client.set(key, JSON.stringify(data))
}

export async function getFromJson<T>(key : string){
  const client = await initlializeRedisClient()
  const exist  = await client.exists(key)
  if(!exist){
    return null
  }
  const data = await client.get(key)
  if(!data)
    return null
  return JSON.parse(data) as T
}


export async function deleteFromJson(key: string){
   const client = await initlializeRedisClient()
   const delItem = await client.del(key)
}