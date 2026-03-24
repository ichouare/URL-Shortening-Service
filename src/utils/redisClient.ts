import {createClient, type RedisClientType } from 'redis'


let client : RedisClientType | null = null


export async function initlializeRedisClient() {
  if(!client)
  {
    client =  createClient()


    // add  redis error listen
    client.on('error', err => console.log('Redis Client Error', err))

    // add redis connect listen

    client.on("connect", () => {
      console.log("redis is client is connect succesfully")
    })



    await client.connect()


    return client;
  }
}